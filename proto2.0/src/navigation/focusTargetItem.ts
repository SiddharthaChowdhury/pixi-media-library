import { INavigationMapElements } from "./types";

export const focusTargetItem = ({ vs, lane, item }: INavigationMapElements) => {
  /**
     * lane's ideal scroll.x position of items (such that when item is horizontally scrolled, little right portion of item on the left can be seen) 
     * lets call it lanes Item sweetspot_x (LSP_x)
     * default LSP_x = 0
     
     // For item 0 is focused 
    1. check - if item === 0
        1.1 yes : lane.x = vs.x
            return;
        
    // For Item on the right is focused
    2. check? if item.x1 > LSP_x
        2.1 yes : diffPos = item.x1 - LSP_x, laneX2ToBePos = lane.x2 - diffPos
            2.1.1 check? if laneX2ToBePos > vs.x2
                2.1.1.1 yes : lane.x -= diffPos
                    return;
                2.1.1.2 No : newDiffPos = vS.x2 - laneX2ToBePos
                    lane.x -= newDiffPos
                

     */

  const LSP_x = 0;

  const padding = lane.spaceBetweenItems || 0;
  const vs_x2 = vs.x + (vs.widthVirtual || vs.width);
  const lane_x2 = lane.getBounds().x + lane.width;
  const itm = item.getBounds();

  if (itm.x > LSP_x) {
    // item on the right
    const diffPos = itm.x - LSP_x;
    const laneX2ToBePos = lane_x2 - diffPos;

    if (laneX2ToBePos > vs_x2) {
      lane.x -= diffPos - padding;
      return;
    }
    if (lane_x2 > vs_x2) {
      const newDiffPos = lane_x2 - vs_x2;
      lane.x -= newDiffPos + padding;
      return;
    }
  }
};
