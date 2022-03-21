import anim_movement from "../pixi/animation/anim_movement";
import { INavigationMapElements } from "./types";

export const focusTargetItem = ({ vs, lane, item }: INavigationMapElements) => {
  /**
   * lane's ideal scroll.x position of items (such that when item is horizontally scrolled, little right portion of item on the left can be seen)
   * lets call it lanes Item sweetspot_x (LSP_x)
   * default LSP_x = 0
   */

  const LSP_x = 45;

  const padding = lane.spaceBetweenItems || 0;
  const vs_x2 = vs.x + (vs.widthVirtual || vs.width);
  const lane_x2 = lane.getBounds().x + lane.width;
  const itm = item.getBounds();
  const spaceBetweenItems = lane.spaceBetweenItems || 0;

  if (itm.x > LSP_x) {
    // item on the right
    const diffPos = itm.x - LSP_x;
    const laneX2ToBePos = lane_x2 - diffPos;

    if (laneX2ToBePos > vs_x2) {
      const laneXNow = lane.x - diffPos - padding - spaceBetweenItems;
      // lane.x -= diffPos - padding - spaceBetweenItems;
      anim_movement.moveX(lane, laneXNow);
      return;
    }
    if (lane_x2 > vs_x2) {
      const newDiffPos = lane_x2 - vs_x2;
      const laneXNow = lane.x - newDiffPos - padding - spaceBetweenItems;
      // lane.x -= newDiffPos + padding;
      anim_movement.moveX(lane, laneXNow);
      return;
    }
  }

  if (itm.x < LSP_x) {
    // item on the left
    const diffPos = LSP_x - itm.x;
    const laneX1ToBePos = lane.x + diffPos;

    if (laneX1ToBePos <= vs.x) {
      // lane.x += diffPos + padding + spaceBetweenItems;
      const laneXNow = lane.x + diffPos + padding + spaceBetweenItems;
      anim_movement.moveX(lane, laneXNow);
      return;
    }
    if (lane.x < vs.x) {
      anim_movement.moveX(lane, 0);
      // lane.x = 0;
    }
  }
};
