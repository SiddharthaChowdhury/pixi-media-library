import { combineReducers } from "redux";
import { IState } from "./IState";
import { reducerApp } from "./src/app/reducerApp";

const rootReducer = combineReducers<IState>({
    app: reducerApp
});

export default rootReducer;