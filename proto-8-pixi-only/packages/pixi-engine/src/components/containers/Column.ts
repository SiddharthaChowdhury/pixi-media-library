import * as PIXI from "pixi.js-legacy";
import { animation } from "../../animation/animation";
import { gsapAnimation } from "../../animation/gsapAnimation";
import { IBounds_orig, IExtendedContainerProps } from "./types";

interface IPixiColumnOptions {
  name: string;
  screenHeight: number;
}

export class PixiColumn extends PIXI.Container {
  protected y2 = 0;
  public childRecord: IBounds_orig[] = [];
  protected screenHeight = 0;

  public index = 0;

  public addChildItem = (item: PIXI.DisplayObject, bounds: IBounds_orig) => {
    const lastItemBound = this.childRecord[this.childRecord.length - 1];
    if (lastItemBound) {
      item.x = 0;
      item.y = lastItemBound.y2 + 15;
    } else {
      item.x = 0;
      item.y = 0;
    }

    const boundsUpdate = {
      ...bounds,
      x: item.x,
      x2: item.x + bounds.width,
      y: item.y,
      y2: item.y + bounds.height,
    };

    this.childRecord.push(boundsUpdate);
    this.addChild(item);

    // with new Lane/Row added to the column , this.y2 increases
    this.y2 += boundsUpdate.y2;
  };

  // This function is responsible for vertical scroll (not the focus itself).
  // The Focus needs to happen before scroll is triggered.
  public adjustScroll = (focusedLaneIndex: number) => {
    let newFocusY = 0;
    const idealFocusY = 250;
    const lanePos_y = this.childRecord[focusedLaneIndex].y;

    if (lanePos_y - idealFocusY > 0) {
      // Position the focused lane in somewhat centre
      newFocusY = lanePos_y - idealFocusY;
    }

    // col.Y2 should remain at the bottom of the lane
    let nextY2 = this.height - newFocusY;
    if (nextY2 < this.screenHeight) {
      const paddingBottom = 50;
      const diff = this.screenHeight - nextY2 - paddingBottom;
      newFocusY -= diff;
    }

    // Always negative because (y can never go above 0),
    // contents in the column is always position downwards
    newFocusY = -Math.abs(newFocusY);

    // this.y = -Math.abs(newFocusY);
    animation(this).moveY(newFocusY);
    // gsapAnimation().moveY(this, newFocusY);
    this.y2 = nextY2;
  };

  constructor(options: IPixiColumnOptions) {
    super();
    this.name = options.name;
    this.screenHeight = options.screenHeight;
  }
}
