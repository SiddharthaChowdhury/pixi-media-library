import * as PIXI from "pixi.js";
import { Container, DisplayObject } from "pixi.js";
import Teaser, {
  getTeaserStructureData,
  ITeaserInfo,
  ITeaserInfoWithBounds,
} from "./components/teaser/Teaser";

export interface IPixiCanvasProps {
  containerNodeId: string;
  width: number;
  height: number;
  antialias?: boolean;
  autoDensity?: boolean;
  backgroundColorHex?: number;
}

interface ILaneTableRecordItemInfo {
  id: string;
  x: number;
  y: number;
  width: number;
  spaceBetween: number;
  teaserInfo?: ITeaserInfo;
}

interface ILaneTableRecord {
  [laneId: string]: {
    items: ILaneTableRecordItemInfo[];
    elementsToShowCount?: number;
  };
}

interface ILaneNavigationInfo {
  laneElem: Container;
  firstChildElem: Container;
  lastChildElem: Container;
  handleVirtualisation: boolean;

  lastChildData?: ILaneTableRecordItemInfo;
  firstChildData?: ILaneTableRecordItemInfo;
  nextLeftChildData?: ILaneTableRecordItemInfo;
  nextRightChildData?: ILaneTableRecordItemInfo;
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
    console.log("[nav-h]: app created");
  };

  /**
   * This function returns necessary information required for Horizontal navigation in Lane especially for virtualisation
   * This function implementation considers hidden elements (items out of viewPort) is removed and
   * newly visible element is created and inserted into the lane
   * 
   * @param laneId
   * @returns {
      laneElem: Container,
      firstChildElem: Container,
      firstChildData: ILaneTableRecordItemInfo,
      lastChildElem: Container,
      lastChildData: ILaneTableRecordItemInfo,
      handleVirtualisation: boolean,
      nextLeftChildData?: ILaneTableRecordItemInfo
      nextRightChildData?: ILaneTableRecordItemInfo
    } or undefined
   */
  private getLaneNavigationMeta = (
    laneId: string
  ): ILaneNavigationInfo | undefined => {
    const laneElem = this.viewPortContainer.getChildByName(laneId) as Container;

    const firstChildElem = laneElem.children[0] as Container;
    const lastChildElem = laneElem.children[
      laneElem.children.length - 1
    ] as Container;

    const finalData: ILaneNavigationInfo = {
      laneElem,
      firstChildElem,
      lastChildElem,
      handleVirtualisation:
        laneElem.children.length < this.canvasLaneTable[laneId].items.length,
    };

    this.canvasLaneTable[laneId].items.forEach((item, index) => {
      if (item.id === firstChildElem.name) {
        finalData.firstChildData = item;
        finalData.nextLeftChildData =
          this.canvasLaneTable[laneId].items[index - 1];
      }
      if (item.id === lastChildElem.name) {
        finalData.lastChildData = item;
        finalData.nextRightChildData =
          this.canvasLaneTable[laneId].items[index + 1];
      }
    });

    return finalData;
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
    teaserInfo: ITeaserInfoWithBounds,
    spaceBetween = 10,
    forceRenderTeaser = false
  ) => {
    if (!this.canvasLaneTable[laneId]) return;

    const { id } = teaserInfo;
    const laneElem = this.viewPortContainer.getChildByName(
      laneId
    ) as PIXI.Container;

    if (!laneElem) return;

    const newTeaserStructure = getTeaserStructureData(teaserInfo.teaserType);
    const newTeaserMeta = {
      x: 0,
      y: 0,
      width: newTeaserStructure.boxDiam.width,
      spaceBetween,
      teaserInfo,
    };

    // evaluating coordinate where to show the teaser
    const [lastItemInLane] = this.canvasLaneTable[laneId].items.slice(-1);
    if (teaserInfo.bounds) {
      newTeaserMeta.x = teaserInfo.bounds.x;
      newTeaserMeta.y = teaserInfo.bounds.y;
    } else if (lastItemInLane) {
      // get bounds of last Item
      const { x, width, y } = lastItemInLane;

      newTeaserMeta.x = x + width + spaceBetween;
      newTeaserMeta.y = y;
    }

    const shouldRenderCurrentTeaser = (): boolean => {
      const laneData = this.canvasLaneTable[laneId];
      return !!(
        laneData.elementsToShowCount === undefined ||
        (laneData.elementsToShowCount &&
          laneData.items.length < laneData.elementsToShowCount)
      );
    };

    if (shouldRenderCurrentTeaser() || forceRenderTeaser) {
      const teaserElem = new Teaser().getTeaser(teaserInfo);

      teaserElem.x = newTeaserMeta.x;
      teaserElem.y = newTeaserMeta.y;

      // triggering render of Teaser in Lane
      laneElem.addChild(teaserElem);
    }

    // Registering newly created Teaser into table if not exist
    if (
      !this.canvasLaneTable[laneId].items.find(({ id }) => teaserInfo.id === id)
    ) {
      this.canvasLaneTable[laneId].items.push({
        id,
        ...newTeaserMeta,
      });
    }

    console.log("Items in the lane ", this.canvasLaneTable[laneId]);
    return this.canvasLaneTable[laneId];
  };

  public navRight = (laneId: string) => {
    // this function handles movement of the lane
    const dragLaneLeft = ({ laneElem, firstChildData }: any) => {
      laneElem.x =
        laneElem.x - (firstChildData.width + firstChildData.spaceBetween);
    };

    const navigationData = this.getLaneNavigationMeta(laneId);
    if (!navigationData) return;
    // When virtualisation not required then directly trigger the lane move
    if (!navigationData.handleVirtualisation) {
      dragLaneLeft(navigationData);
      return;
    }

    const { firstChildElem, nextRightChildData, laneElem } = navigationData;
    if (nextRightChildData && nextRightChildData.teaserInfo) {
      // remove the hidden/invisible item from the lane
      laneElem.removeChild(firstChildElem);

      // Add new visible item into the lane
      this.addTeaserToLane(
        laneId,
        {
          ...nextRightChildData.teaserInfo,
          bounds: {
            x: nextRightChildData.x,
            y: nextRightChildData.y,
            width: nextRightChildData.width,
            spaceBetween: nextRightChildData.spaceBetween,
          },
        },
        nextRightChildData.spaceBetween,
        true // force render the teaser
      );

      dragLaneLeft(navigationData);
    }
  };

  private addItemToLane_Front = (
    laneElem: Container,
    teaserData: ILaneTableRecordItemInfo,
    handleRemoveEndItem: boolean // false when virtualisation is not needed
  ) => {
    if (!teaserData.teaserInfo) {
      console.warn("[nav-h]: Teaser info missing! Lane navigation will fail.");
      return;
    }
    console.log(":: bound check", teaserData);

    // Remove right most item on the lane to maintain the correct count when virtualisation is ENABLED
    if (handleRemoveEndItem) {
      laneElem.removeChildAt(laneElem.children.length - 1);
    }

    // Add new item in the front of the lane
    const newTeaserElem = new Teaser().getTeaser(teaserData.teaserInfo);

    newTeaserElem.x = teaserData.x;
    newTeaserElem.y = teaserData.y;

    laneElem.addChildAt(newTeaserElem, 0);
  };

  public navLeft = (laneId: string) => {
    // this function handles movement of the lane
    const dragLaneRight = ({ laneElem, firstChildData }: any) => {
      laneElem.x =
        laneElem.x + (firstChildData.width + firstChildData.spaceBetween);
    };

    const navigationData = this.getLaneNavigationMeta(laneId);
    if (!navigationData) return;
    // When virtualisation not required then directly trigger the lane move
    if (!navigationData.handleVirtualisation) {
      dragLaneRight(navigationData);
      return;
    }

    const { nextLeftChildData, laneElem } = navigationData;
    if (nextLeftChildData && nextLeftChildData.teaserInfo) {
      this.addItemToLane_Front(
        laneElem,
        nextLeftChildData,
        navigationData.handleVirtualisation
      );

      dragLaneRight(navigationData);
    }
  };
}

export default PixiClass;
