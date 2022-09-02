import { combineReducers } from "redux";
import reducerNavigation from "../navigation/redux/reducerNavigation";
import { IState } from "./IState";

const rootReducer = combineReducers<IState>({
  nav: reducerNavigation,
} as any);

export default rootReducer;
