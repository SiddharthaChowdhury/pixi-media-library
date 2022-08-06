import * as PIXI from "pixi.js-legacy";
import { IBounds_orig, IExtendedContainerProps } from "./types";

interface IPixiRowOptions extends IExtendedContainerProps {}

class PixiRow extends PIXI.Container {
  protected width_orig = 0;
  protected height_orig = 0;
  //   private x2 = 0;
  //   private focusableItems: any[] = []; //

  public index = 0;

  constructor(options: IPixiRowOptions) {
    super();
    this.width_orig = options.width;
    this.height_orig = options.height;
    this.name = options.name;
    this.index = options.index;
  }

  public getBounds_orig = (): IBounds_orig => {
    const actualBound = this.getBounds();
    return {
      ...actualBound,
      width: this.width_orig,
      height: this.height_orig,
      x2: actualBound.x + this.width_orig,
    };
  };
}

export default PixiRow;