import * as PIXI from "pixi.js-legacy";

export interface IExtendedContainerProps extends PIXI.Container {
  name: string;
  width: number;
  height: number;
  x2: number;
  y2: number;
}

export interface IBounds_orig {
  x: number;
  x2: number;
  y: number;
  y2: number;
  width: number;
  height: number;
}
