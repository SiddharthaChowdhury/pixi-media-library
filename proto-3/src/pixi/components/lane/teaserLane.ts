import * as PIXI from "pixi.js";
import { IPixiClass } from "../..";
import log from "../../../logger/logger";
import animation from "../../animation/animation";
import { focusTeaser, unFocusteaser } from "../teaser/helper-teaser";
import Teaser, { getTeaserStructureData, ITeaserItem } from "../teaser/Teaser";
import { ILaneNavigationInfo, ILaneTableRecordItemInfo } from "./types";

const PREFIX = "[Pixi:Lane]";
export class TeaserLane {
  private pixiCore: IPixiClass;
  public laneDragCount = 0;
  private laneId: string;
  private laneElem: PIXI.Container | undefined;
  private itemFocusIndex: number | undefined;
  // TODO: Check HOW to set fixed  width and height of the lane;
  // TODO: Also HOW to set fixed width and height of the viewPort container
  private size = { width: 0, height: 0, x: 0, y: 0, x2: 0 };

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
  private getLaneNavigationMeta = (): ILaneNavigationInfo | undefined => {
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
        this.pixiCore.canvasLaneTable[this.laneId].items.length,
    };

    this.pixiCore.canvasLaneTable[this.laneId].items.forEach((item, index) => {
      if (item.id === firstChildElem.name) {
        finalData.firstChildData = item;
        finalData.nextLeftChildData =
          this.pixiCore.canvasLaneTable[this.laneId].items[index - 1];
      }
      if (item.id === lastChildElem.name) {
        finalData.lastChildData = item;
        finalData.nextRightChildData =
          this.pixiCore.canvasLaneTable[this.laneId].items[index + 1];
      }
    });

    return finalData;
  };

  // This adds teaser at the END of the Lane
  private addItemToLane_End = (teaserData: ILaneTableRecordItemInfo) => {
    if (!teaserData.teaserInfo || !this.laneElem) {
      log("Teaser info missing! Lane navigation will fail.").error(PREFIX);
      return;
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
  private addItemToLane_Front = (teaserData: ILaneTableRecordItemInfo) => {
    if (!teaserData.teaserInfo || !this.laneElem) {
      log("Teaser info missing! Lane navigation will fail.").error(PREFIX);
      return;
    }

    // Add new item in the front of the lane
    const newTeaserElem = new Teaser(this.pixiCore).getTeaser(
      teaserData.teaserInfo
    );

    newTeaserElem.x = teaserData.x;
    newTeaserElem.y = teaserData.y;

    this.laneElem.addChildAt(newTeaserElem, 0);
  };

  /** Check if last child is out of lane, then remove/cull it */
  private cullLastChild = (force?: boolean) => {
    if (!this.laneElem) return;

    const lastChildIndex = this.laneElem.children.length - 1;
    if (force) {
      this.laneElem.removeChildAt(lastChildIndex);
      return;
    }

    const lastChildX = this.laneElem.getChildAt(lastChildIndex).getBounds().x;

    // If last item totally out of lane boundary = we can cull it
    if (lastChildX > this.size.x2) {
      this.laneElem.removeChildAt(lastChildIndex);
    }
  };

  /** Check if First child is out of lane, then remove/cull it */
  private cullFirststChild = (force?: boolean) => {
    if (!this.laneElem) return;

    if (force) {
      this.laneElem.removeChildAt(0);
      return;
    }

    const firstChildBound = this.laneElem.getChildAt(0).getBounds();
    const firstChildX2 = firstChildBound.x + firstChildBound.width;

    // too left
    if (firstChildX2 < 0) {
      this.laneElem.removeChildAt(0);
    }
  };

  private getCurrentFocusedItem = ():
    | {
        data: ILaneTableRecordItemInfo;
        elem: PIXI.Container;
      }
    | undefined => {
    if (!this.laneElem || this.itemFocusIndex === undefined) return;

    const currentItemData =
      this.pixiCore.canvasLaneTable[this.laneId].items[this.itemFocusIndex];
    const currentFocusedElem = this.laneElem.getChildByName(
      currentItemData.id
    ) as PIXI.Container;

    return {
      data: currentItemData,
      elem: currentFocusedElem,
    };
  };

  /** Constructor */
  constructor(pixiCore: IPixiClass, laneId: string) {
    this.pixiCore = pixiCore;
    this.laneId = laneId;
  }

  // ------------------------
  // Public Methods
  // ------------------------

  public updateFocus = (direction: "next" | "prev" | "current" = "current") => {
    if (this.itemFocusIndex === undefined) this.itemFocusIndex = 0;

    let targetIndex = this.itemFocusIndex;

    if (direction === "next") targetIndex = this.itemFocusIndex + 1;
    if (direction === "prev") targetIndex = this.itemFocusIndex - 1;

    const currentFocusedItem = this.getCurrentFocusedItem();
    const targetItemData =
      this.pixiCore.canvasLaneTable[this.laneId].items[targetIndex];

    if (!targetItemData || !this.laneElem) {
      return;
    }

    const targetElem = this.laneElem.getChildByName(targetItemData.id);

    if (!targetElem) {
      return;
    }

    this.itemFocusIndex = targetIndex;

    if (direction !== "current")
      unFocusteaser(currentFocusedItem!.elem as PIXI.Container);
    focusTeaser(targetElem as PIXI.Container);
  };

  public addLane = (
    bound: { x: number; y: number; width?: number; height?: number },
    laneId: string,
    elementsToShowCount?: number
  ): boolean => {
    if (this.pixiCore.canvasLaneTable[laneId]) return false;

    this.pixiCore.canvasLaneTable[laneId] = { items: [], elementsToShowCount };

    const laneElem = new PIXI.Container();
    // Taking canvas width and height as default
    const viewPortBound = this.pixiCore.application.view;
    this.size.width = bound.width || viewPortBound.width - bound.x;
    this.size.height = bound.height || viewPortBound.height;
    this.size.x = bound.x;
    this.size.y = bound.y;
    this.size.x2 = bound.x + this.size.width;

    laneElem.name = laneId;
    laneElem.x = bound.x;
    laneElem.y = bound.y;
    laneElem.width = laneElem.width =
      bound.height || viewPortBound.height - bound.y;

    this.pixiCore.viewPortContainer.addChild(laneElem);
    this.laneElem = laneElem;

    return true;
  };

  // This is useful for adding teaser to the lane
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

  public navRight = (animate?: boolean) => {
    // First update the focus
    this.updateFocus("next");

    // Next start moving lane or/and virtually add new item to the lane
    const focusedItem = this.getCurrentFocusedItem();
    if (!focusedItem) return;

    const focusedItemBound = focusedItem.elem.getBounds();

    const laneX2 = this.size.x2;
    const focusedItemX2 = focusedItemBound.x + focusedItemBound.width;

    if (focusedItemX2 < laneX2 || !this.laneElem) {
      return;
    }

    const isFocusedLastItem =
      this.itemFocusIndex ===
      this.pixiCore.canvasLaneTable[this.laneId].items.length - 1;

    // Margin is important visually + calculation for the next move
    // When the last-Item of the lane is selected we dont want to add margin
    const marginRight = isFocusedLastItem
      ? 0
      : focusedItem.data.spaceBetween * 2;
    const diffAway = focusedItemX2 - laneX2 + marginRight;
    const newX = this.laneElem.x - diffAway;

    // Move the lane
    if (animate) {
      animation(this.laneElem).moveX(newX);
    } else this.laneElem.x = newX;
    this.laneDragCount += 1;

    // Try virtualisation
    const navData = this.getLaneNavigationMeta();
    if (
      navData &&
      navData.handleVirtualisation &&
      navData.nextRightChildData &&
      navData.nextRightChildData.teaserInfo
    ) {
      this.addItemToLane_End(navData.nextRightChildData);
      this.cullFirststChild();
    }
  };

  public navLeft = (animate?: boolean) => {
    // First update the focus
    this.updateFocus("prev");

    // Next start moving lane or/and virtually add new item to the lane
    const focusedItem = this.getCurrentFocusedItem();
    if (!focusedItem) return;

    const focusedItemBound = focusedItem.elem.getBounds();
    const laneBound = this.size;

    if (focusedItemBound.x > 0 || !this.laneElem) {
      return;
    }

    // When the first-Item of the lane is selected we dont
    // want to add a margin as it will look odd with a space in front of the first teaser
    const marginLeft =
      (this.itemFocusIndex || 0) === 0 ? 0 : focusedItem.data.spaceBetween;
    const diffAway = laneBound.x - focusedItemBound.x + marginLeft; // - focusedItem.data.spaceBetween;
    const newX = this.laneElem.x + diffAway;

    // Move the lane
    if (animate) {
      animation(this.laneElem).moveX(newX);
    } else this.laneElem.x = newX;
    this.laneDragCount -= 1;

    // Try virtualisation
    const navData = this.getLaneNavigationMeta();
    if (
      navData &&
      navData.handleVirtualisation &&
      navData.nextLeftChildData &&
      navData.nextLeftChildData.teaserInfo
    ) {
      this.addItemToLane_Front(navData.nextLeftChildData);
      this.cullLastChild();
    }
  };
}

/**
 * KNOWN ISSUE/BUG:
 * 1. With Continious navigating through the lane (from biginning to the end) back and forth, the lane will continue to persist one item each traversal. In the end with enough traversal/navigation all items will be persist
 * 2.
 */
