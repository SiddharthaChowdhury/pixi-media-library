import * as PIXI from "pixi.js-legacy";

export interface IExtendedContainerProps {
  index: number;
  name: string;
  width: number;
  height: number;
}

export interface IBounds_orig {
  x: number;
  x2: number;
  y: number;
  width: number;
  height: number;
}

export interface IFocusableItem extends PIXI.Container {
  getBounds_orig: () => IBounds_orig;
}
