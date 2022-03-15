import { useEffect, useRef } from "react";

import NavigationMapData, {
  INavigationMapActiveState,
} from "../../navigation/NavigationMapData";
import { getPageLanes_withData } from "./getData";
import getVScroller from "../../pixi/components/v-scroller/getVScroller";
import generateLane from "../../pixi/components/lane/generateLane";
import pixiClass from "../../pixi";
import { keyDown$, KEYS } from "../../rxjs/keyEvent$";
import { Container } from "pixi.js";
import {
  focusTeaser,
  unFocusteaser,
} from "../../pixi/components/teaser/helper-teaser";

export const Sample = () => {
  const mapObj = useRef<NavigationMapData | null>(null);
  const focusedItem = useRef<Container | null>(null);

  useEffect(() => {
    const { lanesMapData, pageData } = getPageLanes_withData(0);
    const vsId = 0;
    mapObj.current = new NavigationMapData(lanesMapData, vsId);

    const verticalScroller = getVScroller({
      x: 7.5,
      y: 7.5,
      nameId: `${vsId}`,
      gapBetweenLanesPx: 15,
      lanes: pageData.lanes.map((laneData, index) => {
        return generateLane({
          ...laneData,
          vsId,
          laneNameId: index,
        });
      }),
    });

    pixiClass.application.stage.addChild(verticalScroller);

    // =======================
    //  key event
    // =======================
    keyDown$.subscribe((e: any) => {
      let newState: INavigationMapActiveState = {
        ...mapObj.current!.activeState,
      };

      switch (e.keyCode) {
        case KEYS.ARROW_DOWN:
          newState = mapObj.current!.navigate_Vertical("down");
          break;
        case KEYS.ARROW_UP:
          newState = mapObj.current!.navigate_Vertical("up");
          break;
        case KEYS.ARROW_LEFT:
          newState = mapObj.current!.navigate_Horizontal("left");
          break;
        case KEYS.ARROW_RIGHT:
          newState = mapObj.current!.navigate_Horizontal("right");
          break;
      }

      const stage = pixiClass.application?.stage!;

      const targetVs: Container = stage.getChildByName(
        `${newState.vs}`
      ) as Container;

      if (targetVs) {
        const targetLane = targetVs.getChildByName(
          `${newState.lane}`
        ) as Container;

        if (targetLane) {
          const targetItem = targetLane.getChildAt(newState.item) as Container;

          if (targetItem) {
            if (focusedItem.current) {
              unFocusteaser(focusedItem.current);
            }

            focusTeaser(targetItem);

            focusedItem.current = targetItem;
          }
        }
      }
    });
  }, []);

  return null;
};
