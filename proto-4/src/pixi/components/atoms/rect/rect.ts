import {
  getRoundedHalfRectBottom,
  getRoundedHalfRectTop,
  getRoundedRect,
} from "./roundedRect";

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

export const getRect = (options: IRectProps) => {
  if (options.borderRadius) {
    if (options.borderRadiusSide === "only-top")
      return getRoundedHalfRectTop(options);
    else if (options.borderRadiusSide === "only-bottom") {
      return getRoundedHalfRectBottom(options);
    }
  }

  return getRoundedRect(options);
};
