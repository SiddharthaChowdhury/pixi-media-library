import { useEffect } from "react";
import NavigationMapData, {
  INavMapLane,
} from "../navigation/NavigationMapData";
import pixiClass from "../pixi/pixiClass";
import molecules from "../templates/basic/molecules";
import { ILaneInfo } from "../templates/basic/molecules/lane/ILaneInfo";
import organisms from "../templates/basic/organisms";
import { generateMapItemName } from "../utils/utilStrings";
import { teaserHMockData } from "../__mocks__/__mock__teaserH.data";
interface IPageData {
  lanes: ILaneInfo[];
}

export const Playground2 = () => {
  // Member functions
  const getPageLanes_withData = (vsId: number) => {
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
    const pageData: IPageData = {
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

  useEffect(() => {
    setTimeout(() => {
      const { lanesMapData, pageData } = getPageLanes_withData(0);
      const vsId = 0;
      const navObj = new NavigationMapData(lanesMapData, vsId);

      const verticalScroller = organisms.getVerticalScroller({
        x: 0,
        y: 0,
        name: `${vsId}`, // should be the IndexId of Vs
        lanes: pageData.lanes.map((laneData, index) =>
          molecules.generateLane({
            ...laneData,
            vsId,
            laneNameId: index,
          })
        ),
      });

      pixiClass.pixiApp?.stage.addChild(verticalScroller);

      console.log("TESTTT >>>> ", navObj.map);
    }, 500);
  }, []);

  return null;
};

export default Playground2;
