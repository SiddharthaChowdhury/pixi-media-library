import { useEffect, useRef } from "react";
import ZContainer from "../../pixi/components/z-container/ZComponent";
import NavigationMapData from "../../navigation/NavigationMapData";
import { getPageLanes_withData } from "./getData";
import getVScroller from "../../pixi/components/v-scroller/getVScroller";
import generateLane from "../../pixi/components/lane/generateLane";
import pixiClass from "../../pixi";

export const Sample = () => {
  const mapObj = useRef<NavigationMapData | null>(null);
  const focusedItem = useRef<ZContainer | null>(null);

  useEffect(() => {
    const { lanesMapData, pageData } = getPageLanes_withData(0);
    const vsId = 0;
    mapObj.current = new NavigationMapData(lanesMapData, vsId);

    const verticalScroller = getVScroller({
      x: 0,
      y: 0,
      z: 0,
      nameId: `${vsId}`,
      gapBetweenLanesPx: 10,
      lanes: pageData.lanes.map((laneData, index) => {
        return generateLane({
          ...laneData,
          vsId,
          z: 0,
          laneNameId: index,
        });
      }),
    });

    console.log("TESTT vScroller ", verticalScroller);

    pixiClass.application.stage.addChild(verticalScroller);
  }, []);

  return null;
};
