import { useEffect, useRef } from "react";
import ZContainer, {
  changeZOrder,
} from "../../pixi/components/z-container/ZComponent";
import NavigationMapData, {
  INavigationMapActiveState,
} from "../../navigation/NavigationMapData";
import { getPageLanes_withData } from "./getData";
import getVScroller from "../../pixi/components/v-scroller/getVScroller";
import generateLane from "../../pixi/components/lane/generateLane";
import pixiClass from "../../pixi";
import { Container } from "react-dom";
import { keyDown$, KEYS } from "../../rxjs/keyEvent$";

const LO_ZORDER = 1;
const HI_ZORDER = 5;

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
      z: LO_ZORDER,
      nameId: `${vsId}`,
      gapBetweenLanesPx: 10,
      lanes: pageData.lanes.map((laneData, index) => {
        return generateLane({
          ...laneData,
          vsId,
          z: LO_ZORDER,
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

      const targetVs: ZContainer = stage.getChildByName(
        `${newState.vs}`
      ) as ZContainer;

      if (targetVs) {
        const targetLane = targetVs.getChildByName(
          `${newState.lane}`
        ) as ZContainer;

        if (targetLane) {
          const targetItem = targetLane.getChildAt(newState.item) as ZContainer;

          if (targetItem) {
            console.log(">>> new state ", targetItem);

            if (focusedItem.current) {
              focusedItem.current.scale.x = 1;
              focusedItem.current.scale.y = 1;
              changeZOrder(LO_ZORDER, focusedItem);
            }

            targetItem.scale.x = 1.2;
            targetItem.scale.y = 1.2;
            changeZOrder(HI_ZORDER, targetItem);

            focusedItem.current = targetItem;
          }
        }
      }
    });
  }, []);

  return null;
};
