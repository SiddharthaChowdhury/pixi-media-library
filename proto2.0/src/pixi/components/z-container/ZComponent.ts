import { Container } from "pixi.js";

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
 * https://github.com/pixijs/layers/wiki#fast-container-sort;
 * 
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
    const children = this.children;

    let len = children.length;
    for (let i = 0; i < len; i++) {
      const elem: any = children[i];

      if (elem.zOrder !== elem.oldZOrder) {
        tmpChanged.push(elem);
      } else {
        tmpOld.push(elem);
      }
      elem.oldZOrder = elem.zOrder;
    }

    if (tmpChanged.length === 0) {
      tmpOld.length = 0;
      return;
    }
    if (tmpChanged.length > 1) {
      tmpChanged.sort(awesomeCompare);
    }

    let j = 0,
      a = 0,
      b = 0;
    while (a < tmpChanged.length && b < tmpOld.length) {
      if (awesomeCompare(tmpChanged[a], tmpOld[b]) < 0) {
        children[j++] = tmpChanged[a++];
      } else {
        children[j++] = tmpOld[b++];
      }
    }
    while (a < tmpChanged.length) {
      children[j++] = tmpChanged[a++];
    }
    while (b < tmpOld.length) {
      children[j++] = tmpOld[b++];
    }

    tmpChanged.length = 0;
    tmpOld.length = 0;
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
