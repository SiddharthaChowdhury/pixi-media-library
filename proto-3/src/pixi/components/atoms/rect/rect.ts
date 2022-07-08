import {
  getRoundedHalfRectBottom,
  getRoundedHalfRectTop,
  getRoundedRect,
} from "./roundedRect";

export interface IRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius?: number;
  borderRadiusSide?: "only-top" | "only-bottom" | "all-default";
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
