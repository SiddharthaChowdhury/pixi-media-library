import { ITeaserItem } from "../teaser/Teaser";
import * as PIXI from "pixi.js";

export interface ILaneTableRecordItemInfo {
  id: string;
  x: number;
  y: number;
  width: number;
  spaceBetween: number;
  teaserInfo?: ITeaserItem;
}

export interface ILaneNavigationInfo {
  laneElem: PIXI.Container;
  firstChildElem: PIXI.Container;
  lastChildElem: PIXI.Container;
  handleVirtualisation: boolean;

  lastChildData?: ILaneTableRecordItemInfo;
  firstChildData?: ILaneTableRecordItemInfo;
  nextLeftChildData?: ILaneTableRecordItemInfo;
  nextRightChildData?: ILaneTableRecordItemInfo;
}
