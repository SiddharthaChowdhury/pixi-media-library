import { ITeaserInfo } from "../teaser/types";

export interface ILaneInfo {
  laneNameId?: number;
  label: string;
  episodes: ITeaserInfo;
}
