import * as PIXI from "pixi.js-legacy";
import { INavigationMapMeta } from "../../../navigation/types";
import utilNavigation from "../../../navigation/utilNavigation";

export const focusHelper = (layerContainer: PIXI.Container) => {
  const getItemFromNavMeta = (navMeta: INavigationMapMeta) => {
    const currentFocusName = utilNavigation.getElementIdFromNavMapMeta(navMeta);
    const currentVsName = utilNavigation.generateVsId(
      navMeta.layer,
      navMeta.vs
    );
    const currentVsContainer = layerContainer.getChildByName(
      currentVsName
    ) as PIXI.Container;

    const currentLaneContainer = currentVsContainer.getChildByName(
      utilNavigation.generateLaneId(navMeta.layer, navMeta.vs, navMeta.row)
    ) as PIXI.Container;

    return currentLaneContainer.getChildByName(currentFocusName);
  };

  const focusItem = (
    nextMapMeta: INavigationMapMeta,
    currentMapMeta: INavigationMapMeta
  ) => {
    const currentElem = getItemFromNavMeta(currentMapMeta) as any;
    const targetElem = getItemFromNavMeta(nextMapMeta) as any;

    if (currentElem.onUnFocus) {
      currentElem.onUnFocus();
    }
    if (targetElem.onFocus) {
      targetElem.onFocus();
    }
  };

  const initFocus = (currentMapMeta: INavigationMapMeta) => {
    const currentElem = getItemFromNavMeta(currentMapMeta) as any;
    if (currentElem.onFocus) {
      currentElem.onFocus();
    }
  };

  return {
    focusItem,
    initFocus,
  };
};
