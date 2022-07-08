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
  private canvasLanes: { [laneId: string]: string[] /* teaserId */ } = {};
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
  public addLane = (x: number, y: number, laneId: string): boolean => {
    if (this.canvasLanes[laneId]) return false;

    this.canvasLanes[laneId] = [];

    const laneContainer = new Container();
    laneContainer.name = laneId;
    laneContainer.x = x;
    laneContainer.y = y;

    this.viewPortContainer.addChild(laneContainer);

    return true;
  };

  public addTeaserToLane = (
    laneName: string,
    teaserInfo: IGetTeaserProp,
    spaceBetween = 10
  ) => {
    if (!this.canvasLanes[laneName]) return;

    const { id } = teaserInfo;
    const laneContainer = this.viewPortContainer.getChildByName(
      laneName
    ) as PIXI.Container;

    if (this.canvasLanes[laneName].includes(id) || !laneContainer) return;

    const teaserContainerObj = new Teaser().getTeaser(teaserInfo);
    const lanesLastElemName =
      this.canvasLanes[laneName][this.canvasLanes[laneName].length - 1];

    if (lanesLastElemName !== undefined) {
      const lastItemCont = laneContainer.getChildByName(
        lanesLastElemName
      ) as PIXI.Container;

      const { x, width } = lastItemCont.getBounds();

      teaserContainerObj.x = x + width + spaceBetween;
      teaserContainerObj.y = 0;
    } else {
      teaserContainerObj.x = 0;
      teaserContainerObj.y = 0;
    }

    laneContainer.addChild(teaserContainerObj);
    this.canvasLanes[laneName].push(id);

    console.log("Items in the lane ", this.canvasLanes[laneName]);
    return this.canvasLanes[laneName];
  };
}

export default PixiClass;
