import { ERectBorderRadiusType } from "../../atoms";
export interface IStageStructure {
  boxStructure: {
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

export interface IStageData {
  backgroundImgUrl: string;
  title: string;
  description: string;
  subtitle: string;
  channelLogo?: string;
}
