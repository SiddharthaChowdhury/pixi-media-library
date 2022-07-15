import * as PIXI from "pixi.js";
import debounce from "lodash.debounce";
import log from "../../logger/logger";
import { assert } from "console";

interface ILoaderAssetInfo {
  name: string;
  url: string;
}
interface IPendingAssetQueue extends ILoaderAssetInfo {
  ackCallback?: (resource: PIXI.LoaderResource) => void;
}

const PREFIX = "[Pixi:Loader]";

export class BatchLoader {
  private isLoaderBusy = false;
  private loader: PIXI.Loader = PIXI.Loader.shared;
  private sourceQueue: IPendingAssetQueue[] = [];
  private logEnabled = true;

  private debounceAddResource = debounce(() => {
    this.logEnabled &&
      log(
        "Step-1: Starting new batch: Assets pending ",
        this.sourceQueue
      ).print(PREFIX);

    this.loader
      .add([
        ...this.sourceQueue.filter(
          (asset) => !this.loader.resources[asset.name]
        ),
      ])
      .load((_, res) => {
        this.logEnabled &&
          log("Step-3: Batch load complete", res).print(PREFIX);
      });
    // once all pending assets are added = CLEAR the queue
  }, 200);

  constructor(loader: PIXI.Loader, options: { enableLog: boolean }) {
    this.loader = loader;
    this.logEnabled = !!options.enableLog;

    this.loader.onLoad.add((_, loadedResource) => {
      const { name, url } = loadedResource;
      this.logEnabled &&
        log("Step-2r: Asset loaded: ", { name, url }).print(PREFIX);

      const pendingAssetIndex = this.sourceQueue.findIndex(
        (assetInfo) => assetInfo.name === loadedResource.name
      );

      // Send acknowledgement to the source if ack exists
      if (pendingAssetIndex !== -1) {
        this.sourceQueue[pendingAssetIndex].ackCallback &&
          this.sourceQueue[pendingAssetIndex].ackCallback!(loadedResource);

        this.sourceQueue.splice(pendingAssetIndex, 1);
      }
    });
    this.loader.onError.add((err) => {
      this.logEnabled && log("ERR! ", err).error(PREFIX);
    });
    this.loader.onComplete.add(() => {
      this.logEnabled &&
        log("Step-4: Finishing batch ", this.sourceQueue).print(PREFIX);

      // If there is pending sources start the loading again
      if (this.sourceQueue.length) {
        this.logEnabled &&
          log(
            "Starting fresh pending batch ",
            JSON.stringify(this.sourceQueue)
          ).highlight(PREFIX);
        // this.loader.reset();
        this.debounceAddResource();
      } else {
        this.isLoaderBusy = false;
      }
    });
  }

  // Public api
  public add = (
    asset: ILoaderAssetInfo,
    callback: (resource?: PIXI.LoaderResource) => void,
    force?: boolean
  ) => {
    // Is asset already loaded before : return
    const existResource = this.loader.resources[asset.name];
    if (existResource) {
      if (!force) {
        callback(existResource);
        return;
      } else {
        // delete record
        delete this.loader.resources[asset.name];
      }
    }

    this.sourceQueue.push({ ...asset, ackCallback: callback });

    // If Loader is busy, it will pickup resources in "sourceQueue" once current process is complete
    if (this.isLoaderBusy) {
      this.logEnabled &&
        log(
          "Loader is busy defering add, This asset will be loaded once current batch is finished!"
        ).highlight(PREFIX);
      return;
    }

    // debounce sources, if add is called in a loop
    this.debounceAddResource();
  };
}

/**
 * CONCERNS:
 *
 * 1. Texture is always undefined for a loaded resource
 */
