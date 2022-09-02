import { useEffect, useRef, useState } from "react";
import { Subscription } from "rxjs";
import { INavigationMapInst, INavigationMapState } from "./NavigationMap";
import utilNavigation from "./utilNavigation";

const useNavigation = (navObj?: INavigationMapInst, itemId?: string) => {
  const navSubscription$ = useRef<Subscription>();
  const [activeState, updateLocalActiveState] = useState<
    INavigationMapState | undefined
  >();

  // Subscription to echo change in activeState
  useEffect(() => {
    if (!navObj) return;

    updateLocalActiveState(navObj.getActiveState());
    navSubscription$.current = navObj.activeState$.subscribe((activeState) => {
      updateLocalActiveState(activeState);
    });
  }, [navObj]);

  useEffect(
    () => () => {
      if (navSubscription$.current) navSubscription$.current.unsubscribe();
    },
    []
  );

  const focusedItemName =
    activeState &&
    utilNavigation.generateItemId(
      activeState.layer,
      activeState.vs,
      activeState.row,
      activeState.item
    );

  return {
    activeState,
    focusedLayer: activeState?.layer,
    focusedVsName:
      activeState &&
      utilNavigation.generateVsId(activeState.layer, activeState.vs),
    focusedLaneName:
      activeState &&
      utilNavigation.generateLaneId(
        activeState.layer,
        activeState.vs,
        activeState.row
      ),
    focusedItemName,
    isItemFocused: itemId === focusedItemName,
  };
};

export default useNavigation;
