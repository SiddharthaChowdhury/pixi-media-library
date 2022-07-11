import * as PIXI from "pixi.js";
import { Container } from "pixi.js";
import Teaser, {
  getTeaserStructureData,
  IGetTeaserProp,
} from "./components/teaser/Teaser";

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
    items: { id: string; x: number; y: number; width: number }[];
    elementsToShowCount?: number;
  };
}

class PixiClass {
  private canvasLaneTable: ILaneTableRecord = {};
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
    elementsToShowCount?: number
  ): boolean => {
    if (this.canvasLaneTable[laneId]) return false;

    this.canvasLaneTable[laneId] = { items: [], elementsToShowCount };

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

    // If teaser already recorded once, then return;
    if (
      this.canvasLaneTable[laneId].items.find(
        ({ id }) => teaserInfo.id === id
      ) ||
      !laneElem
    )
      return;

    const [lastItemInLane] = this.canvasLaneTable[laneId].items.slice(-1);
    const newTeaserStructure = getTeaserStructureData(teaserInfo.teaserType);
    const newTeaserCoordMeta = {
      x: 0,
      y: 0,
      width: newTeaserStructure.boxDiam.width,
    };

    if (lastItemInLane) {
      // get bounds of last Item
      const { x, width, y } = lastItemInLane;

      newTeaserCoordMeta.x = x + width + spaceBetween;
      newTeaserCoordMeta.y = y;
    }

    const shouldRenderCurrentTeaser = (): boolean => {
      const laneData = this.canvasLaneTable[laneId];
      return !!(
        laneData.elementsToShowCount === undefined ||
        (laneData.elementsToShowCount &&
          laneData.items.length < laneData.elementsToShowCount)
      );
    };

    if (shouldRenderCurrentTeaser()) {
      const teaserElem = new Teaser().getTeaser(teaserInfo);

      teaserElem.x = newTeaserCoordMeta.x;
      teaserElem.y = newTeaserCoordMeta.y;

      // triggering render of Teaser in Lane
      laneElem.addChild(teaserElem);
    }

    // Registering newly created Teaser into table
    this.canvasLaneTable[laneId].items.push({
      id,
      ...newTeaserCoordMeta,
    });

    // console.log("Items in the lane ", this.canvasLaneTable[laneId]);
    return this.canvasLaneTable[laneId];
  };
}

export default PixiClass;
