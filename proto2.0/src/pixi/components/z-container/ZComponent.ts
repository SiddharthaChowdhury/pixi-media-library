import { Container } from "pixi.js";

/**
  We need to look at this in future how to properly use the zIndex/zOrder
  This component could be handly .

   https://github.com/pixijs/layers/wiki#fast-container-sort;

   WHY? : If we want to make a focus zoom effect of teaser which will
   bring itself in the foreground, overlaping the sibling teasers and teasers of other affected lanes

   Problem: ATM: after sorting the elements, the order of the elements are changing on the stage 
   Which we definately dont want
 */

const INF = 1e100;
let tmpChanged: any[] = [],
  tmpOld: any[] = [];
let tmpArrivalCounter = 0;

function awesomeCompare(
  a: { zOrder: number; arrivalOrder: number },
  b: { zOrder: number; arrivalOrder: number }
) {
  if (a.zOrder > b.zOrder) return 1;
  if (a.zOrder < b.zOrder) return -1;
  if (a.arrivalOrder > b.arrivalOrder) return 1;
  if (a.arrivalOrder < b.arrivalOrder) return -1;
  return 0;
}

/**

    Class ZContainer is to be used instead of PIXI.Container 
    for any and all general purpose item Wrapper
*/

class ZContainer extends Container {
  public zOrder?: number;
  private oldZOrder?: number;
  private arrivalOrder?: number;

  addChildZ(child: any, zOrder: number) {
    child.zOrder = zOrder || 0;

    // assign those vars whenever new element joins

    child.oldZOrder = INF;
    child.arrivalOrder = ++tmpArrivalCounter;

    super.addChild(child);
  }

  // you can call it every tick - its not heavy

  sortChildren() {
    const _children = this.children as any;
    let len = _children.length,
      i,
      j,
      tmp;
    for (i = 1; i < len; i++) {
      tmp = _children[i] as any;
      j = i - 1;
      while (j >= 0) {
        if (tmp.zOrder < _children[j].zOrder) {
          _children[j + 1] = _children[j];
        } else if (
          tmp.zOrder === _children[j].zOrder &&
          tmp.arrivalOrder < _children[j].arrivalOrder
        ) {
          _children[j + 1] = _children[j];
        } else {
          break;
        }
        j--;
      }
      _children[j + 1] = tmp;
    }
  }
}

export const changeZOrder = (zOrder: number, item: any) => {
  item.zOrder = zOrder;

  /* 
    Basically changing the zOrder of item is not enough 
    when we are dealing with lanes and teasers
    so we .. changing zorder of item and parent, and then sorting the children
    for updating
  */

  if (item.parent && !!item.parent.sortChildren) {
    const parent = item.parent;
    parent.zOrder = zOrder;
    parent.sortChildren();

    if (parent.parent && !!parent.parent.sortChildren) {
      parent.parent.sortChildren();
    }
  }
};

export default ZContainer;
