import { IActionApp, TypeActionApp } from "./actionApp";

export interface IStateApp {
    isAppReady: boolean;
    isInialAssetsLoaded: boolean;
}

const initialState: IStateApp = {
    isAppReady: false,
    isInialAssetsLoaded: false
}

export const reducerApp = (state: IStateApp = initialState, action: IActionApp):IStateApp => {
    switch(action.type) {
        case TypeActionApp.updateAppState:
            return {
                ...state,
                isAppReady: action.state!
            };
        case TypeActionApp.updateInitialLoad: 
            return {
                ...state,
                isInialAssetsLoaded: action.state!
            };
        default: 
            return state;
    }
}