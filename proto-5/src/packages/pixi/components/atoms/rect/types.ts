import { Graphics } from "pixi.js-legacy";

export interface IRectGraphics extends Graphics {
  borderRadius?: number;
  borderRadiusSide?: string;
}

export enum ERectBorderRadiusType {
  TOP_CORNERS = "only-top",
  BOTTOM_CORNERS = "only-bottom",
  ALL_CORNERS = "all-default",
  NONE = "none",
}

export interface IRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius?: number;
  borderRadiusSide?: ERectBorderRadiusType;
  borderColor?: number;
  borderWidth?: number;
  fillColor?: number;
  name?: string;
}
