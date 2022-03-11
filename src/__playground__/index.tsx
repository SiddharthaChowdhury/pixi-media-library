import { Container, DisplayObject } from "pixi.js";
import { useEffect, useRef } from "react";
import NavigationMapData, {
  INavigationMapActiveState,
  INavMapLane,
} from "../navigation/NavigationMapData";
import pixiClass from "../pixi/pixiClass";
import { keyDown$, KEYS } from "../rxjs/keyEvent$";
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
  const mapObj = useRef<NavigationMapData | null>(null);
  const focusedItem = useRef<Container | null>(null);

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
      mapObj.current = new NavigationMapData(lanesMapData, vsId);

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
    }, 500);

    keyDown$.subscribe((e: any) => {
      let newState: INavigationMapActiveState = {
        ...mapObj.current!.activeState
      };

      switch(e.keyCode) {
        case KEYS.ARROW_DOWN:
          newState = mapObj.current!.navigate_Vertical('down');
          break;
        case KEYS.ARROW_UP:
          newState = mapObj.current!.navigate_Vertical('up');
          break;
        case KEYS.ARROW_LEFT:
          newState = mapObj.current!.navigate_Horizontal('left')
          break;
        case KEYS.ARROW_RIGHT:
          newState = mapObj.current!.navigate_Horizontal('right')
          break;
      };

      const stage = pixiClass.pixiApp?.stage!;

      const targetVs: Container = stage.getChildByName(`${newState.vs}`) as Container;
      
      if(targetVs) {
        const targetLane = targetVs.getChildByName(`${newState.lane}`) as Container;

        if(targetLane) {
          const targetItem = targetLane.getChildAt(newState.item) as Container;

          if(targetItem) {
            console.log(">>> new state ", targetItem);

            if(focusedItem.current) {
              focusedItem.current.scale.x = 1;
              focusedItem.current.scale.y = 1;
              focusedItem.current.zIndex = 0;
            }
            

            targetItem.scale.x = 1.2;
            targetItem.scale.y = 1.2;
            targetItem.zIndex = 10;

            focusedItem.current = targetItem;

          }
        }
      }      
    })
  }, []);

  return null;
};

export default Playground2;
