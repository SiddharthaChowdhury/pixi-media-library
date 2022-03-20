import { useEffect, useRef } from "react";
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
import { scrollRightLane } from "../../navigation/scrollRightLane";
import appConfig from "../../app-config/appConfig";
import { INavigationMapElements } from "../../navigation/types";
import NavigationMapData, {
  INavigationMapActiveState,
} from "../../navigation/NavigationMapData";
import { scrollLeftLane } from "../../navigation/scrollLeftLane";
import useUrlParams from "../../routes/hooks/hook-useUrlParams";
import { focusTargetItem } from "../../navigation/focusTargetItem";

export const Sample = () => {
  const mapObj = useRef<NavigationMapData | null>(null);
  const focusedItem = useRef<Container | null>(null);
  const urlQueryParams = useUrlParams();

  // ************ Member functions ************

  // Focuses a target item in the stage
  const setFocus = (targetTeaser: Container | null) => {
    if (targetTeaser) {
      if (focusedItem.current) {
        unFocusteaser(focusedItem.current);
      }

      focusTeaser(targetTeaser);

      focusedItem.current = targetTeaser;
    }
  };

  // Registers keyboard events
  const registerKeyEvents = () => {
    keyDown$.subscribe((e: any) => {
      let newState: INavigationMapActiveState = {
        ...mapObj.current!.activeState,
      };

      let targetTeaser: Container | null = null;
      let mapElementData: INavigationMapElements | null = null;
      const setTargetTeaser = () => {
        mapElementData = findContainerElem(
          `${newState.vs}`,
          `${newState.lane}`,
          undefined,
          newState.item
        );

        if (mapElementData) {
          targetTeaser = mapElementData.item;
        }
      };

      switch (e.keyCode) {
        case KEYS.ARROW_DOWN:
          newState = mapObj.current!.navigate_Vertical("down");
          setTargetTeaser();

          break;
        case KEYS.ARROW_UP:
          newState = mapObj.current!.navigate_Vertical("up");
          setTargetTeaser();
          break;
        case KEYS.ARROW_LEFT:
          newState = mapObj.current!.navigate_Horizontal("left");
          setTargetTeaser();
          mapElementData && scrollLeftLane(mapElementData);
          break;
        case KEYS.ARROW_RIGHT:
          newState = mapObj.current!.navigate_Horizontal("right");
          console.log("New state ", newState);
          setTargetTeaser();
          mapElementData && focusTargetItem(mapElementData);
          break;
      }

      setFocus(targetTeaser);
    });
  };

  const setInitialPageFocus = () => {
    const focusIndexMapStr = urlQueryParams.get("focus") || "";
    const [vsIndex, laneIndex, itemIndex] = focusIndexMapStr.split("-");

    if (!vsIndex || !laneIndex || !itemIndex) return;

    const itemIndexInt = parseInt(itemIndex);
    const focusMapData = findContainerElem(
      vsIndex,
      laneIndex,
      undefined,
      itemIndexInt
    );

    if (focusMapData) {
      console.log("Setting initial focus");

      // Adjust the lane position
      focusTargetItem(focusMapData);

      // Ui effect of focus
      setFocus(focusMapData.item);

      // Updating the map data structure
      mapObj.current?.updateMapOnFocus(
        parseInt(vsIndex),
        parseInt(laneIndex),
        itemIndexInt
      );
    }
  };

  // ************** Effects *******************

  // OnMount
  useEffect(() => {
    const { lanesMapData, pageData } = getPageLanes_withData(0);
    const vsId = 0;
    mapObj.current = new NavigationMapData(lanesMapData, vsId);

    const verticalScroller = getVScroller({
      x: 7.5,
      y: 7.5,
      heightVirtual: appConfig.viewport.height,
      widthVirtual: appConfig.viewport.width,
      nameId: `${vsId}`,
      gapBetweenLanesPx: 15,
      lanes: pageData.lanes.map((laneData, index) => {
        return generateLane({
          ...laneData,
          vsId,
          laneNameId: index,
          spaceBetweenItem: 15,
        });
      }),
    });

    pixiClass.application.stage.addChild(verticalScroller);

    registerKeyEvents();
    setInitialPageFocus();
    console.log("page rendered");
  }, []);

  return null;
};
