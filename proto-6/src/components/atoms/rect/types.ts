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
  borderColor?: string;
  borderWidth?: number;
  fillColor?: string;
  name?: string;
}
