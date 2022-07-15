import * as PIXI from "pixi.js";
import { IPixiClass } from "../..";
import Teaser, { getTeaserStructureData, ITeaserItem } from "../teaser/Teaser";
import { ILaneNavigationInfo, ILaneTableRecordItemInfo } from "./types";

const teaserLane = (pixiCore: IPixiClass) => {
  const log = (message: string, params: any = {}) =>
    console.warn(`[pixi:lane:error] ${message} `, ...params);

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
  const getLaneNavigationMeta = (
    laneId: string
  ): ILaneNavigationInfo | undefined => {
    const laneElem = pixiCore.viewPortContainer.getChildByName(
      laneId
    ) as PIXI.Container;

    const firstChildElem = laneElem.children[0] as PIXI.Container;
    const lastChildElem = laneElem.children[
      laneElem.children.length - 1
    ] as PIXI.Container;

    const finalData: ILaneNavigationInfo = {
      laneElem,
      firstChildElem,
      lastChildElem,
      handleVirtualisation:
        laneElem.children.length <
        pixiCore.canvasLaneTable[laneId].items.length,
    };

    pixiCore.canvasLaneTable[laneId].items.forEach((item, index) => {
      if (item.id === firstChildElem.name) {
        finalData.firstChildData = item;
        finalData.nextLeftChildData =
          pixiCore.canvasLaneTable[laneId].items[index - 1];
      }
      if (item.id === lastChildElem.name) {
        finalData.lastChildData = item;
        finalData.nextRightChildData =
          pixiCore.canvasLaneTable[laneId].items[index + 1];
      }
    });

    return finalData;
  };

  // This adds teaser at the END of the Lane
  const addItemToLane_End = (
    laneElem: PIXI.Container,
    teaserData: ILaneTableRecordItemInfo,
    handleRemoveEndItem: boolean // false when virtualisation is not needed
  ) => {
    if (!teaserData.teaserInfo) {
      log("Teaser info missing! Lane navigation will fail.");
      return;
    }

    // Remove right most item on the lane to maintain the correct count when virtualisation is ENABLED
    if (handleRemoveEndItem) {
      laneElem.removeChildAt(0);
    }

    // Add new item in the front of the lane
    const newTeaserElem = new Teaser(pixiCore).getTeaser(teaserData.teaserInfo);

    newTeaserElem.x = teaserData.x;
    newTeaserElem.y = teaserData.y;

    laneElem.addChildAt(newTeaserElem, laneElem.children.length);
  };

  // This adds teaser at the FRONT of the Lane
  const addItemToLane_Front = (
    laneElem: PIXI.Container,
    teaserData: ILaneTableRecordItemInfo,
    handleRemoveEndItem: boolean // false when virtualisation is not needed
  ) => {
    if (!teaserData.teaserInfo) {
      log("Teaser info missing! Lane navigation will fail.");
      return;
    }

    // Remove right most item on the lane to maintain the correct count when virtualisation is ENABLED
    if (handleRemoveEndItem) {
      laneElem.removeChildAt(laneElem.children.length - 1);
    }

    // Add new item in the front of the lane
    const newTeaserElem = new Teaser(pixiCore).getTeaser(teaserData.teaserInfo);

    newTeaserElem.x = teaserData.x;
    newTeaserElem.y = teaserData.y;

    laneElem.addChildAt(newTeaserElem, 0);
  };

  // Public functions
  return {
    addLane: (
      x: number,
      y: number,
      laneId: string,
      elementsToShowCount?: number
    ): boolean => {
      if (pixiCore.canvasLaneTable[laneId]) return false;

      pixiCore.canvasLaneTable[laneId] = { items: [], elementsToShowCount };

      const laneElem = new PIXI.Container();
      laneElem.name = laneId;
      laneElem.x = x;
      laneElem.y = y;

      pixiCore.viewPortContainer.addChild(laneElem);

      return true;
    },

    registerNewTeaser: (
      laneId: string,
      teaserInfo: ITeaserItem,
      spaceBetween = 10
    ) => {
      const laneData = pixiCore.canvasLaneTable[laneId];
      const laneElem = pixiCore.viewPortContainer.getChildByName(
        laneId
      ) as PIXI.Container;

      if (!laneData || !laneElem) return;

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
        const teaserElem = new Teaser(pixiCore).getTeaser(teaserInfo);

        teaserElem.x = newTeaserMeta.x;
        teaserElem.y = newTeaserMeta.y;

        // triggering render of Teaser in Lane
        laneElem.addChild(teaserElem);
      }

      // Registering newly created Teaser into table if not exist
      if (!laneData.items.find(({ id }) => teaserInfo.id === id)) {
        laneData.items.push(newTeaserMeta);
      }

      return laneData;
    },

    navRight: (laneId: string) => {
      // this function handles movement of the lane
      const dragLaneLeft = ({ laneElem, firstChildData }: any) => {
        laneElem.x =
          laneElem.x - (firstChildData.width + firstChildData.spaceBetween);
      };

      const navigationData = getLaneNavigationMeta(laneId);
      if (!navigationData) return;
      // When virtualisation not required then directly trigger the lane move
      if (!navigationData.handleVirtualisation) {
        dragLaneLeft(navigationData);
        return;
      }

      const { nextRightChildData, laneElem } = navigationData;
      if (nextRightChildData && nextRightChildData.teaserInfo) {
        addItemToLane_End(
          laneElem,
          nextRightChildData,
          navigationData.handleVirtualisation
        );

        dragLaneLeft(navigationData);
      }
    },

    navLeft: (laneId: string) => {
      // this function handles movement of the lane
      const dragLaneRight = ({ laneElem, firstChildData }: any) => {
        laneElem.x =
          laneElem.x + (firstChildData.width + firstChildData.spaceBetween);
      };

      const navigationData = getLaneNavigationMeta(laneId);
      if (!navigationData) return;
      // When virtualisation not required then directly trigger the lane move
      if (!navigationData.handleVirtualisation) {
        dragLaneRight(navigationData);
        return;
      }

      const { nextLeftChildData, laneElem } = navigationData;
      if (nextLeftChildData && nextLeftChildData.teaserInfo) {
        addItemToLane_Front(
          laneElem,
          nextLeftChildData,
          navigationData.handleVirtualisation
        );

        dragLaneRight(navigationData);
      }
    },
  };
};

export default teaserLane;
