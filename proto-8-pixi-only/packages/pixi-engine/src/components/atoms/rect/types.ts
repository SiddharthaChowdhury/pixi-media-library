import { Graphics } from "pixi.js-legacy";

export interface IRectGraphics extends Graphics {
  borderRadius?: number;
  borderRadiusSide?: string;
}
export interface IRectProps {
  x?: number;
  y?: number;

  name?: string;
  width: number;
  height: number;
  border?: {
    width: number;
    color: string;
    radius: number[];
  };
  background?: {
    fill: string;
    opacity?: number;
  };
}
