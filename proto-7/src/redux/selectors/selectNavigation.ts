import { IState } from "../IState";

export const selectNavigation = (state: IState) => state.nav;
export const selectNavigationFocusedItem = (state: IState) =>
  selectNavigation(state).focusedItemName;
