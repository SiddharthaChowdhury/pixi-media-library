import * as PIXI from "pixi.js-legacy";
import { IBounds_orig, IExtendedContainerProps } from "./types";

interface IPixiColumnOptions extends IExtendedContainerProps {}

class PixiColumn extends PIXI.Container {
  protected width_orig = 0;
  protected height_orig = 0;

  public index = 0;

  constructor(options: IPixiColumnOptions) {
    super();
    this.width_orig = options.width;
    this.height_orig = options.height;
    this.name = options.name;
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
}

export default PixiColumn;
