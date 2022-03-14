import { Action } from "redux";

export enum TypeActionApp {
    updateAppState = 'Update > App > Ready',
    updateInitialLoad = 'Update > Loader > Initial',
}

export interface IActionApp extends Action{
    type: TypeActionApp;
    state?: boolean;
}

export const actionUpdateIsAppReady = (state: boolean): IActionApp => ({
    type: TypeActionApp.updateAppState,
    state,
})

export const actionUpdateInitialAssetsLoaded = (state: boolean): IActionApp => ({
    type: TypeActionApp.updateInitialLoad,
    state,
})