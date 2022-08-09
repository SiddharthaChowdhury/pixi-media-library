import * as PIXI from "pixi.js-legacy";
import { IBounds_orig, IExtendedContainerProps } from "../types";

export interface IFocusableContainerProps extends IExtendedContainerProps {
  x2: number;
  y2: number;
}

export interface IFocusableContainerOverride {
  width_orig: number;
  height_orig: number;
  x2: number;
  y2: number;
  getBounds_orig: () => IBounds_orig;
}

class FocusableContainerOverride extends PIXI.Container {
  public width_orig = 0;
  public height_orig = 0;
  public x2 = 0;
  public y2 = 0;

  constructor(options: IFocusableContainerProps) {
    super();
    this.width_orig = options.width;
    this.height_orig = options.height;
    this.name = options.name;
    this.x2 = options.x2;
    this.y2 = options.y2;
  }

  public getBounds_orig = (): IBounds_orig => {
    const actualBound = this.getBounds();
    return {
      ...actualBound,
      x2: actualBound.x + this.width_orig,
      width: this.width_orig,
      height: this.height_orig,
      y2: actualBound.y + this.height_orig,
    };
  };
}

export default FocusableContainerOverride;
