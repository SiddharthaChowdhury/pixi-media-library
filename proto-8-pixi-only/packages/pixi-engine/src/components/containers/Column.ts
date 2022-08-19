import * as PIXI from "pixi.js-legacy";
import { IBounds_orig, IExtendedContainerProps } from "./types";

interface IPixiColumnOptions extends IExtendedContainerProps {}

class PixiColumn extends PIXI.Container {
  protected width_orig = 0;
  protected height_orig = 0;
  protected x2 = 0;
  protected y2 = 0;
  public childRecord: IBounds_orig[] = [];

  public index = 0;

  constructor(options: IPixiColumnOptions) {
    super();
    this.width_orig = options.width;
    this.height_orig = options.height;
    this.name = options.name;
    this.x2 = options.x2;
    this.y2 = options.y2;
  }

  public getBounds_orig = (): IBounds_orig => {
    const actualBound = this.getLocalBounds();
    return {
      ...actualBound,
      width: this.width_orig,
      height: this.height_orig,
      x2: actualBound.x + this.width_orig,
      y2: actualBound.y + this.height_orig,
    };
  };

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
  };
}

export default PixiColumn;
