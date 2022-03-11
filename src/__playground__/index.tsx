import { useEffect } from "react";
import NavigationMapData from "../navigation/NavigationMapData";
import pixiClass from "../pixi/pixiClass";
import molecules from "../templates/basic/molecules";
import { ILaneInfo } from "../templates/basic/molecules/lane/ILaneInfo";
import organisms from "../templates/basic/organisms";
import { teaserHMockData } from "../__mocks__/__mock__teaserH.data";
interface IPageData {
  lanes: ILaneInfo[];
}

export const Playground2 = () => {
  const getPageLanes_withData = (vcId: number) => {
    const lanesWithTeaserNameArr: Array<Array<string>> = [];
    let lanesArrLength = 0;

    const pushLane = (lanessInfo: ILaneInfo) => {
      const episodeLane = [];
      const episodeLaneData: string[] = [];

      episodeLane.push(lanessInfo);
      lanessInfo.episodes.meta.forEach((_, index) => {
        episodeLaneData.push(`${vcId}-${lanesArrLength}-${index}`); // gonna be episode_name
      });

      lanesArrLength++;
      lanesWithTeaserNameArr.push(episodeLaneData);
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
    pageData.lanes.forEach((laneData) => {
      pushLane(laneData);
    });

    return {
      lanesDataArr: lanesWithTeaserNameArr,
      pageData,
    };
  };

  useEffect(() => {
    setTimeout(() => {
      const { lanesDataArr, pageData } = getPageLanes_withData(0);

      const vsId = 0;

      const navObj = new NavigationMapData(lanesDataArr, vsId);

      const verticalScroller = organisms.getVerticalScroller({
        x: 0,
        y: 0,
        name: `${vsId}`, // should be the IndexId of Vs
        lanes: pageData.lanes.map((laneData) =>
          molecules.generateLane(laneData)
        ),
      });

      pixiClass.pixiApp?.stage.addChild(verticalScroller);

      console.log("TESTTT >>>> ", navObj.map);
    }, 500);
  }, []);

  return null;
};

export default Playground2;
