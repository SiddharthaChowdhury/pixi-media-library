import { ERectBorderRadiusType } from "../../atoms";

export interface INavMeta {
  parentColId: number[];
  rowId: number;
  layerId: number;
}
export interface IStageStructure {
  boxStructure: {
    x: number;
    y: number;
    width: number;
    height: number;
    border?: {
      radius: { size: number; type: ERectBorderRadiusType };
      color: string;
      width: number;
    };
    fillColor?: string;
  };
  partials: {
    type: "circleBtn" | "title" | "description";
    radius?: number; // only if type === 'circleBtn'
    bgColor?: string;
    width?: number; // for title | desc
    height?: number; // for title | desc
    focusable?: boolean;
    x: number;
    y: number;
  }[];
}
