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
import { findContainerElem } from "../../pixi/pixi-utils/find-container-elem-helper";

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

      const targetTeaser = findContainerElem(
        `${newState.vs}`,
        `${newState.lane}`,
        undefined,
        newState.item
      );

      if (targetTeaser) {
        if (focusedItem.current) {
          unFocusteaser(focusedItem.current);
        }

        focusTeaser(targetTeaser);

        focusedItem.current = targetTeaser;
      }
    });
  }, []);

  return null;
};
