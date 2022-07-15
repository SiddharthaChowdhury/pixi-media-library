import * as PIXI from "pixi.js";
import debounce from "lodash.debounce";
import log from "../../logger/logger";

interface IPendingAssetQueue {
  name: string;
  url: string;
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

    this.loader.add([...this.sourceQueue]).load((_, res) => {
      this.logEnabled && log("Step-3: Batch load complete", res).print(PREFIX);
    });
    // once all pending assets are added = CLEAR the queue
    this.sourceQueue = [];
  }, 200);

  constructor(loader: PIXI.Loader, options: { enableLog: boolean }) {
    this.loader = loader;
    this.logEnabled = !!options.enableLog;

    this.loader.onLoad.add((_, { name, url }) => {
      this.logEnabled &&
        log("Step-2r: Asset loaded: ", { name, url }).print(PREFIX);
    });
    this.loader.onError.add((err) => {
      this.logEnabled && log("ERR! ", err).error(PREFIX);
    });
    this.loader.onComplete.add(() => {
      this.logEnabled && log("Step-4: Finishing batch").print(PREFIX);

      // If there is pending sources start the loading again
      if (this.sourceQueue.length) {
        this.logEnabled &&
          log("Starting fresh pending batch ", this.sourceQueue).highlight(
            PREFIX
          );
        this.loader.reset();
        this.debounceAddResource();
      } else {
        this.isLoaderBusy = false;
      }
    });
  }

  // Public api
  public add = (asset: IPendingAssetQueue) => {
    // Is asset already loaded before : Quit!
    if (this.loader.resources[asset.name]) return;

    this.sourceQueue.push(asset);

    // If Loader is busy, it will pickup resources in "sourceQueue" once current process is complete
    if (this.isLoaderBusy) {
      this.logEnabled && log("Loader is busy defering add").highlight(PREFIX);
      return;
    }

    // debounce sources, if add is called in a loop
    this.debounceAddResource();
  };
}
