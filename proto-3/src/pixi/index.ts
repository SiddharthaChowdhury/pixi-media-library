import * as PIXI from "pixi.js";
import { Container } from "pixi.js";
import Teaser, { IGetTeaserProp } from "./components/teaser/Teaser";

export interface IPixiCanvasProps {
  containerNodeId: string;
  width: number;
  height: number;
  antialias?: boolean;
  autoDensity?: boolean;
  backgroundColorHex?: number;
}

class PixiClass {
  private canvasLaneTable: {
    [laneId: string]: {
      itemIds: string[];
      bufferElemsCount?: number;
    };
  } = {};
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
    console.log("[PIXI]: app created");
  };

  // Public methods
  public addLane = (
    x: number,
    y: number,
    laneId: string,
    bufferElemsCount?: number
  ): boolean => {
    if (this.canvasLaneTable[laneId]) return false;

    this.canvasLaneTable[laneId] = { itemIds: [], bufferElemsCount };

    const laneElem = new Container();
    laneElem.name = laneId;
    laneElem.x = x;
    laneElem.y = y;

    this.viewPortContainer.addChild(laneElem);

    return true;
  };

  public addTeaserToLane = (
    laneId: string,
    teaserInfo: IGetTeaserProp,
    spaceBetween = 10
  ) => {
    if (!this.canvasLaneTable[laneId]) return;

    const { id } = teaserInfo;
    const laneElem = this.viewPortContainer.getChildByName(
      laneId
    ) as PIXI.Container;

    if (this.canvasLaneTable[laneId].itemIds.includes(id) || !laneElem) return;

    const currentLaneData = this.canvasLaneTable[laneId];
    const lanesLastElemId =
      currentLaneData.itemIds[currentLaneData.itemIds.length - 1];
    const teaserGr = new Teaser().getTeaser(teaserInfo);

    if (lanesLastElemId !== undefined) {
      const lastTeaserElem = laneElem.getChildByName(
        lanesLastElemId
      ) as PIXI.Container;

      const { x, width } = lastTeaserElem.getBounds();

      console.log("### last elem b", { x, width }, laneElem.getBounds());

      teaserGr.x = x + width + spaceBetween;
      teaserGr.y = 0;
    } else {
      teaserGr.x = 0;
      teaserGr.y = 0;
    }

    // triggering render of Teaser in Lane
    laneElem.addChild(teaserGr);

    // Registering newly created Teaser into table
    this.canvasLaneTable[laneId].itemIds.push(id);

    // console.log("Items in the lane ", this.canvasLaneTable[laneId]);
    return this.canvasLaneTable[laneId];
  };
}

export default PixiClass;
