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

    return {
      item: currentLaneContainer.getChildByName(currentFocusName),
      lane: currentLaneContainer,
      colContainer: currentVsContainer,
    };
  };

  const focusItem = (
    nextMapMeta: INavigationMapMeta,
    currentMapMeta: INavigationMapMeta
  ) => {
    const currentElem = getItemFromNavMeta(currentMapMeta)
      .item as unknown as IFocusableItemOptions;

    const targetTree = getItemFromNavMeta(nextMapMeta);
    const targetElem = targetTree.item as unknown as IFocusableItemOptions;

    // Adjust the vertical scroller
    const col = targetTree.colContainer;
    // @ts-ignore;
    col.adjustScroll(nextMapMeta.row);

    // Change the focus
    if (currentElem.onUnFocus) {
      currentElem.onUnFocus();
    }
    if (targetElem.onFocus) {
      targetElem.onFocus();
    }
  };

  const initFocus = (currentMapMeta: INavigationMapMeta) => {
    const currentElem = getItemFromNavMeta(currentMapMeta);
    if (currentElem?.item) {
      const focusableItem =
        currentElem.item as unknown as IFocusableItemOptions;
      focusableItem.onFocus();
    }
  };

  return {
    focusItem,
    initFocus,
  };
};
