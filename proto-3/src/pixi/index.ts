import * as PIXI from "pixi.js";
import debounce from "lodash.debounce";
import { ILaneTableRecordItemInfo } from "./components/lane/types";
import log from "../logger/logger";
import chalk from "chalk";
import { BatchLoader } from "./asset-loader/batchLoader";

export interface IPixiCanvasProps {
  containerNodeId: string;
  width: number;
  height: number;
  antialias?: boolean;
  autoDensity?: boolean;
  backgroundColorHex?: number;
}

interface ILaneTableRecord {
  [laneId: string]: {
    items: ILaneTableRecordItemInfo[];
    elementsToShowCount?: number;
  };
}

export interface IPixiClass {
  application: PIXI.Application;
  viewPortContainer: PIXI.Container;
  canvasLaneTable: ILaneTableRecord;
  batchLoader: any;
}
class PixiClass implements IPixiClass {
  public canvasLaneTable: ILaneTableRecord = {};
  public application: PIXI.Application;
  public viewPortContainer = new PIXI.Container();
  public batchLoader = new BatchLoader(PIXI.Loader.shared, {
    enableLog: true,
  });

  private initPixi = (containerId: string) => {
    const conatainer = document.getElementById(containerId);
    if (!conatainer)
      throw new Error(
        "Root element not available yet. Make sure document root element is rendered"
      );

    // adding the canvas element to the passed domElement reference
    conatainer.appendChild(this.application.view);

    this.application.stage.addChild(this.viewPortContainer);
    console.log("[nav-h]: app created");
  };

  constructor(options: IPixiCanvasProps) {
    if (process.env.NODE_ENV !== "production") {
      // @ts-ignore
      window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
        // @ts-ignore
        window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
    }

    const canvasElem = document.createElement("canvas");
    canvasElem.setAttribute("id", "app-canvas");

    this.viewPortContainer.name = "ROOT_CONTAINER";

    this.application = new PIXI.Application({
      view: canvasElem as HTMLCanvasElement,
      width: options.width,
      height: options.height,
      antialias: options.antialias || false,
      autoDensity: options.autoDensity || true,
      backgroundColor: options.backgroundColorHex || 0xffffff,
      resolution: devicePixelRatio,
    });

    this.viewPortContainer.width = options.width;
    this.viewPortContainer.height = options.height;
    this.viewPortContainer.x = 0;
    this.viewPortContainer.y = 0;

    this.initPixi(options.containerNodeId);
  }
}

export default PixiClass;
