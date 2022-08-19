import * as PIXI from "pixi.js-legacy";
import { IBounds_orig, IExtendedContainerProps } from "./types";

interface IPixiRowOptions extends IExtendedContainerProps {}

class PixiRow extends PIXI.Container {
  protected width_orig = 0;
  protected height_orig = 0;
  protected x2 = 0;
  protected y2 = 0;
  // public childRecord: IBounds_orig[] = [];

  constructor(options: IPixiRowOptions) {
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
}

export default PixiRow;
