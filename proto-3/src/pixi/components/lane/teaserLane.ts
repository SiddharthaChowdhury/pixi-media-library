import * as PIXI from "pixi.js";
import { IPixiClass } from "../..";
import log from "../../../logger/logger";
import Teaser, { getTeaserStructureData, ITeaserItem } from "../teaser/Teaser";
import { ILaneNavigationInfo, ILaneTableRecordItemInfo } from "./types";

const PREFIX = "[Pixi:Lane]";
export class TeaserLane {
  private pixiCore: IPixiClass;
  private laneDragCount = 0;
  private laneId: string;
  private laneElem: PIXI.Container | undefined;

  /**
   * This function returns necessary information required for Horizontal navigation in Lane especially for virtualisation
   * This function implementation considers hidden elements (items out of viewPort) is removed and
   * newly visible element is created and inserted into the lane
   * 
   * @param laneId
   * @returns {
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
    if (!this.laneElem) {
      log("Unable to get meta. Lane is not defined!").error(PREFIX);
      return;
    }

    const firstChildElem = this.laneElem.children[0] as PIXI.Container;
    const lastChildElem = this.laneElem.children[
      this.laneElem.children.length - 1
    ] as PIXI.Container;

    const finalData: ILaneNavigationInfo = {
      firstChildElem,
      lastChildElem,
      handleVirtualisation:
        this.laneElem.children.length <
        this.pixiCore.canvasLaneTable[laneId].items.length,
    };

    this.pixiCore.canvasLaneTable[laneId].items.forEach((item, index) => {
      if (item.id === firstChildElem.name) {
        finalData.firstChildData = item;
        finalData.nextLeftChildData =
          this.pixiCore.canvasLaneTable[laneId].items[index - 1];
      }
      if (item.id === lastChildElem.name) {
        finalData.lastChildData = item;
        finalData.nextRightChildData =
          this.pixiCore.canvasLaneTable[laneId].items[index + 1];
      }
    });

    return finalData;
  };

  // This adds teaser at the END of the Lane
  private addItemToLane_End = (
    teaserData: ILaneTableRecordItemInfo,
    handleRemoveEndItem: boolean // false when virtualisation is not needed
  ) => {
    if (!teaserData.teaserInfo || !this.laneElem) {
      log("Teaser info missing! Lane navigation will fail.").error(PREFIX);
      return;
    }

    // Remove right most item on the lane to maintain the correct count when virtualisation is ENABLED
    if (handleRemoveEndItem) {
      this.laneElem.removeChildAt(0);
    }

    // Add new item in the front of the lane
    const newTeaserElem = new Teaser(this.pixiCore).getTeaser(
      teaserData.teaserInfo
    );

    newTeaserElem.x = teaserData.x;
    newTeaserElem.y = teaserData.y;

    this.laneElem.addChildAt(newTeaserElem, this.laneElem.children.length);
  };

  // This adds teaser at the FRONT of the Lane
  private addItemToLane_Front = (
    teaserData: ILaneTableRecordItemInfo,
    handleRemoveEndItem: boolean // false when virtualisation is not needed
  ) => {
    if (!teaserData.teaserInfo || !this.laneElem) {
      log("Teaser info missing! Lane navigation will fail.").error(PREFIX);
      return;
    }

    // Remove right most item on the lane to maintain the correct count when virtualisation is ENABLED
    if (handleRemoveEndItem) {
      this.laneElem.removeChildAt(this.laneElem.children.length - 1);
    }

    // Add new item in the front of the lane
    const newTeaserElem = new Teaser(this.pixiCore).getTeaser(
      teaserData.teaserInfo
    );

    newTeaserElem.x = teaserData.x;
    newTeaserElem.y = teaserData.y;

    this.laneElem.addChildAt(newTeaserElem, 0);
  };

  /** Constructor */
  constructor(pixiCore: IPixiClass, laneId: string) {
    this.pixiCore = pixiCore;
    this.laneId = laneId;
  }

  // ------------------------
  // Public Methods
  // ------------------------
  public addLane = (
    x: number,
    y: number,
    laneId: string,
    elementsToShowCount?: number
  ): boolean => {
    if (this.pixiCore.canvasLaneTable[laneId]) return false;

    this.pixiCore.canvasLaneTable[laneId] = { items: [], elementsToShowCount };

    const laneElem = new PIXI.Container();
    const viewPortBound = this.pixiCore.application.stage.getBounds();
    laneElem.name = laneId;
    laneElem.x = x;
    laneElem.y = y;
    laneElem.width = viewPortBound.width;
    laneElem.width = viewPortBound.height;

    this.pixiCore.viewPortContainer.addChild(laneElem);
    this.laneElem = laneElem;

    return true;
  };

  public registerNewTeaser = (teaserInfo: ITeaserItem, spaceBetween = 10) => {
    const laneData = this.pixiCore.canvasLaneTable[this.laneId];
    if (!this.laneElem || !laneData) {
      log("Lane is not defined").error(PREFIX);
      return;
    }

    const { id } = teaserInfo;
    const newTeaserStructure = getTeaserStructureData(teaserInfo.teaserType);
    const newTeaserMeta: ILaneTableRecordItemInfo = {
      id,
      x: 10,
      y: 0,
      width: newTeaserStructure.boxDiam.width,
      spaceBetween,
      teaserInfo,
    };

    // evaluating coordinate where to show the teaser
    const lastItemInLane = laneData.items[laneData.items.length - 1];
    if (lastItemInLane) {
      // get bounds of last Item
      const { x, width, y } = lastItemInLane;

      newTeaserMeta.x = x + width + spaceBetween;
      newTeaserMeta.y = y;
    }

    const shouldRenderCurrentTeaser = !!(
      laneData.elementsToShowCount === undefined ||
      (laneData.elementsToShowCount &&
        laneData.items.length < laneData.elementsToShowCount)
    );

    if (shouldRenderCurrentTeaser) {
      const teaserElem = new Teaser(this.pixiCore).getTeaser(teaserInfo);

      teaserElem.x = newTeaserMeta.x;
      teaserElem.y = newTeaserMeta.y;

      // triggering render of Teaser in Lane
      this.laneElem.addChild(teaserElem);
    }

    // Registering newly created Teaser into table if not exist
    if (!laneData.items.find(({ id }) => teaserInfo.id === id)) {
      laneData.items.push(newTeaserMeta);
    }

    return laneData;
  };

  public navRight = () => {
    // this function handles movement of the lane
    console.log(">>>> ", this.laneDragCount, this.laneElem!.getBounds());
    const dragLaneLeft = ({ firstChildData }: any) => {
      if (!this.laneElem) return;

      if (this.laneDragCount === 0) {
        this.laneElem.x =
          this.laneElem.x -
          (firstChildData.width + firstChildData.spaceBetween) / 2;
      } else {
        this.laneElem.x =
          this.laneElem.x -
          (firstChildData.width + firstChildData.spaceBetween);
      }

      this.laneDragCount += 1;
    };

    const navigationData = this.getLaneNavigationMeta(this.laneId);
    if (!navigationData) return;
    // When virtualisation not required then directly trigger the lane move
    if (!navigationData.handleVirtualisation || this.laneDragCount === 0) {
      dragLaneLeft(navigationData);
      return;
    }

    const { nextRightChildData } = navigationData;
    if (nextRightChildData && nextRightChildData.teaserInfo) {
      this.addItemToLane_End(
        nextRightChildData,
        navigationData.handleVirtualisation
      );

      dragLaneLeft(navigationData);
    }
  };

  public navLeft = () => {
    // this function handles movement of the lane
    const dragLaneRight = ({ laneElem, firstChildData }: any) => {
      if (this.laneDragCount === 0) {
        laneElem.x =
          laneElem.x + (firstChildData.width + firstChildData.spaceBetween);
      } else {
        laneElem.x =
          laneElem.x + (firstChildData.width + firstChildData.spaceBetween);
      }

      this.laneDragCount -= 1;
    };

    const navigationData = this.getLaneNavigationMeta(this.laneId);
    if (!navigationData) return;
    // When virtualisation not required then directly trigger the lane move
    if (!navigationData.handleVirtualisation) {
      dragLaneRight(navigationData);
      return;
    }

    const { nextLeftChildData } = navigationData;
    if (nextLeftChildData && nextLeftChildData.teaserInfo) {
      this.addItemToLane_Front(
        nextLeftChildData,
        navigationData.handleVirtualisation
      );

      dragLaneRight(navigationData);
    }
  };
}
