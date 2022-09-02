import { INavigationMapState } from "../NavigationMap";
import utilNavigation from "../utilNavigation";
import { EActionNavigation, IActionNavigation } from "./actionNavigation";

export interface IStateNavigation {
  focusState: INavigationMapState;
  focusedItemName: string;
}

const initialState: IStateNavigation = {
  focusState: {
    layer: 0,
    vs: [0, 0],
    row: 0,
    item: 0,
  },
  focusedItemName: "",
};

const reducerNavigation = (
  state: IStateNavigation = initialState,
  action: IActionNavigation
): IStateNavigation => {
  switch (action.type) {
    case EActionNavigation.CHANGE:
      return {
        ...state,
        focusState: action.focusState!,
        focusedItemName: utilNavigation.generateItemId(
          action.focusState!.layer,
          action.focusState!.vs,
          action.focusState!.row,
          action.focusState!.item
        ),
      };
    default:
      return state;
  }
};

export default reducerNavigation;
