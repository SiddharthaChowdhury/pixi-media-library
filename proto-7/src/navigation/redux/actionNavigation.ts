import { Action } from "redux";
import { INavigationMapState } from "../NavigationMap";

export enum EActionNavigation {
  CHANGE = "NAV > Change",
}

export interface IActionNavigation extends Action {
  focusState?: INavigationMapState;
  type: EActionNavigation;
}

export const actionNavFocusChange = (
  focusState: INavigationMapState
): IActionNavigation => ({
  type: EActionNavigation.CHANGE,
  focusState,
});
