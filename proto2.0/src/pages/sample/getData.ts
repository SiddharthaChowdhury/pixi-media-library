import { INavMapLane } from "../../navigation/NavigationMapData";
import { ILaneInfo } from "../../pixi/components/lane/ILaneInfo";
import { generateMapItemName } from "../../utils/utilStrings";
import { ISamplePageData } from "./types";
import { teaserHMockData } from "../../__mocks__/__mock__teaserH.data";

export const getPageLanes_withData = (vsId: number) => {
  const lanesWithTeaserMap: INavMapLane = {};

  const pushLane = (lanesInfo: ILaneInfo, laneIndex: number) => {
    lanesWithTeaserMap[laneIndex] = {
      lastFocusedItemIndex: 0,
      items: lanesInfo.episodes.meta.map((_, episodeIndex) => {
        return generateMapItemName(vsId, laneIndex, episodeIndex);
      }),
    };
  };

  /**
   * Consider this as -- we get page data (containing lanes and teaser)
   * from some remote service
   */
  const pageData: ISamplePageData = {
    lanes: [
      {
        label: "Highlights",
        episodes: teaserHMockData,
      },
      {
        label: "Top 10",
        episodes: teaserHMockData,
      },
      {
        label: "Trending",
        episodes: teaserHMockData,
      },
    ],
  };

  // Preparing
  pageData.lanes.forEach((laneData, laneIndex) => {
    pushLane(laneData, laneIndex);
  });

  return {
    lanesMapData: lanesWithTeaserMap,
    pageData,
  };
};
