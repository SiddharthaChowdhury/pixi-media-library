import * as PIXI from "pixi.js";
import { Container } from "pixi.js";
import { ILaneTableRecordItemInfo } from "./components/lane/types";

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
  loader: PIXI.Loader;
  viewPortContainer: PIXI.Container;
  canvasLaneTable: ILaneTableRecord;
}

class PixiClass implements IPixiClass {
  public canvasLaneTable: ILaneTableRecord = {};
  public application: PIXI.Application;
  public loader: PIXI.Loader = PIXI.Loader.shared;
  public viewPortContainer = new Container();

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
      antialias: options.antialias || true,
      autoDensity: options.autoDensity || true,
      backgroundColor: options.backgroundColorHex || 0xffffff,
    });

    this.viewPortContainer.width = options.width;
    this.viewPortContainer.height = options.height;
    this.viewPortContainer.x = 0;
    this.viewPortContainer.y = 0;

    this.initPixi(options.containerNodeId);
  }

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
}

export default PixiClass;
