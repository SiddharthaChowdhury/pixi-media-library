import { INavigationMapMeta, utilNavigation } from "@mono/navigation";
import { IFocusableItemOptions } from "@mono/pixi-engine";
import * as PIXI from "pixi.js-legacy";

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
    const currentElem = getItemFromNavMeta(
      currentMapMeta
    ) as unknown as IFocusableItemOptions;
    const targetElem = getItemFromNavMeta(
      nextMapMeta
    ) as unknown as IFocusableItemOptions;

    console.log(">> ", currentElem, targetElem.onFocus);

    if (currentElem.onUnFocus) {
      currentElem.onUnFocus();
    }
    if (targetElem.onFocus) {
      targetElem.onFocus();
    }
  };

  const initFocus = (currentMapMeta: INavigationMapMeta) => {
    const currentElem = getItemFromNavMeta(
      currentMapMeta
    ) as unknown as IFocusableItemOptions;
    if (currentElem.onFocus) {
      currentElem.onFocus();
    }
  };

  return {
    focusItem,
    initFocus,
  };
};
