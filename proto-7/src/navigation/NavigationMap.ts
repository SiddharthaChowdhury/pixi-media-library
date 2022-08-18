import { Subject } from "rxjs";
import {
  ENavigationDirection,
  INavigationMap,
  INavigationMapMeta,
  INavigationRow,
} from "./types";
import utilNavigation from "./utilNavigation";

/*

    { layer:0

        vs:0,0 {Sidenav}                      vs:1,0 {body} 
        [                                   [
            row:0 [ 0, 1, 2, 3, 4, 5]           row:0 [ 0, 1, 2, 3, 4, 5] 
            row:1 [ 0, 1, 2, 3, 4, 5]           row:1 [ 0, 1, 2, 3, 4, 5]
            row:2 [ 0, 1, 2, 3, 4, 5]           row:2 [ 0, 1, 2, 3, 4, 5]
            row:3 [ 0, 1, 2, 3, 4, 5]           row:3 [ 0, 1, 2, 3, 4, 5]
        ],                                  ]
    }
*/
export interface INavigationMapState extends INavigationMapMeta {}

export interface INavigationMapInst {
  map: INavigationMap;
  addNewVs: (
    rowsDataObj: INavigationRow,
    vsXYId: number[], // like ["-1,0"] ,["0,0"], ["0,1"],
    layerId: number
  ) => void;
  createMapFromItemId: (itemId: string) => void;
  updateMapData: (mapMeta: INavigationMapMeta) => void;
  navigate: (direction: ENavigationDirection) => INavigationMapMeta;
  getNextNavigate: (
    direction: ENavigationDirection
  ) => INavigationMapMeta | undefined;
  setInitialFocus: (initial: INavigationMapState) => void;
  activeState$: Subject<INavigationMapState>; // Subscription to listen for change in focus state
  getActiveState: () => INavigationMapState; // Returns current activeState
}
class NavigationMap implements INavigationMapInst {
  public map: INavigationMap = {
    activeLayer: 0,
    layers: {},
  };
  private activeState: INavigationMapState = {
    layer: 0,
    vs: [0, 0],
    row: 0,
    item: 0,
  };
  public activeState$ = new Subject<INavigationMapState>();

  // ----------------------
  //     PRIVATE FNs
  // ----------------------

  private checkToNavigateNextVs = (
    activeLayer: number,
    targetVs: number[],
    skipCommit?: boolean
  ) => {
    const targetVsStr = utilNavigation.vsNumberArrToStr(targetVs);

    if (!this.map.layers[activeLayer].vss[targetVsStr]) return;

    const lastRecordedRowId =
      this.map.layers[activeLayer].vss[targetVsStr].lastFocusedRowIndex;

    if (skipCommit) {
      return {
        layer: this.activeState.layer,
        vs: targetVs,
        row: lastRecordedRowId,
        item: this.map.layers[activeLayer].vss[targetVsStr].rows[
          lastRecordedRowId
        ].lastFocusedItemIndex,
      };
    }

    this.activeState = {
      layer: this.activeState.layer,
      vs: targetVs,
      row: lastRecordedRowId,
      item: this.map.layers[activeLayer].vss[targetVsStr].rows[
        lastRecordedRowId
      ].lastFocusedItemIndex,
    };

    this.map.layers[activeLayer].lastFocusedVs = targetVs;
  };

  private navigateVertical = (
    direction: ENavigationDirection,
    skipCommit?: boolean
  ) => {
    const activeLayer = this.activeState.layer;
    const [activeVsX, activeVsY] = this.activeState.vs;
    const activeVsStr = utilNavigation.vsNumberArrToStr(this.activeState.vs);
    const activeRow = this.activeState.row;

    let targetRow = activeRow + 1;
    let targetVs = [activeVsX, activeVsY + 1];

    if (direction === ENavigationDirection.UP) {
      targetRow = activeRow - 1;
      targetVs = [activeVsX, activeVsY - 1];
    }

    // if target row exist
    if (this.map.layers[activeLayer].vss[activeVsStr].rows[targetRow]) {
      if (skipCommit) {
        return {
          ...this.activeState,
          row: targetRow,
          item: this.map.layers[activeLayer].vss[activeVsStr].rows[targetRow]
            .lastFocusedItemIndex,
        };
      }

      // Update activeState
      this.activeState = {
        ...this.activeState,
        row: targetRow,
        item: this.map.layers[activeLayer].vss[activeVsStr].rows[targetRow]
          .lastFocusedItemIndex,
      };

      // Update map record
      this.map.layers[activeLayer].vss[activeVsStr].lastFocusedRowIndex =
        targetRow;

      return;
    }
    // check if target VS is next
    return this.checkToNavigateNextVs(activeLayer, targetVs, skipCommit);
  };

  private navigateHorizntal(
    direction: ENavigationDirection,
    skipCommit?: boolean
  ) {
    const activeLayer = this.activeState.layer;
    const [activeVsX, activeVsY] = this.activeState.vs;
    const activeVsStr = utilNavigation.vsNumberArrToStr(this.activeState.vs);
    const activeRow = this.activeState.row;
    const activeItem = this.activeState.item;

    let targetItem = activeItem + 1;
    let targetVs = [activeVsX + 1, activeVsY];

    if (direction === ENavigationDirection.LEFT) {
      targetItem = activeItem - 1;
      targetVs = [activeVsX - 1, activeVsY];
    }

    // if target Item exist
    if (
      this.map.layers[activeLayer].vss[activeVsStr].rows[activeRow].items[
        targetItem
      ]
    ) {
      if (skipCommit) {
        return {
          ...this.activeState,
          row: activeRow,
          item: targetItem,
        };
      }

      // update active state
      this.activeState = {
        ...this.activeState,
        row: activeRow,
        item: targetItem,
      };

      // Update map record
      this.map.layers[activeLayer].vss[activeVsStr].rows[
        activeRow
      ].lastFocusedItemIndex = targetItem;

      return;
    }
    // check if target VS is next
    return this.checkToNavigateNextVs(activeLayer, targetVs, skipCommit);
  }

  // ----------------------
  //     PUBLIC FNs
  // ----------------------

  // This is helpful when you have already gathered all the data (lanes and item)
  // To do setp by step, i.e. to gegister Vs first then, rows/lanes then the items, use the functions below
  // Also: it can be used to add empty Vs/ column with empty rows initially
  public addNewVs = (
    rowsDataObj: INavigationRow,
    vsXYId: number[], // like ["-1,0"] ,["0,0"], ["0,1"],
    layerId: number
  ) => {
    if (!this.map.layers[layerId]) {
      this.map.layers[layerId] = {
        lastFocusedVs: vsXYId,
        vss: {},
      };
    }

    const vsXYIdStr = utilNavigation.vsNumberArrToStr(vsXYId);

    if (this.map.layers[layerId] && !this.map.layers[layerId].vss[vsXYIdStr]) {
      this.map.layers[layerId].vss[vsXYIdStr] = {
        rows: rowsDataObj,
        lastFocusedRowIndex: 0,
      };
    }
  };

  // To add new Item to a Row of the map, if Row dont exist, this function wil create the row and then add the item
  // Make sure if you are calling this function "addNewVs()" is not called, otherwise redundant call
  public createMapFromItemId = (itemId: string) => {
    const { vsIdStr, layer, row, item } =
      utilNavigation.itemIdToMapMeta(itemId);

    let isLevelCreatedHere = false;
    // If layer dont exist: Create layer;
    if (!this.map.layers[layer]) {
      this.map.layers[layer] = {
        lastFocusedVs: [0, 0], // Setting to default
        vss: {},
      };
      isLevelCreatedHere = true;
    }

    // If Vs/ col dont exist = Create Vs;
    if (!this.map.layers[layer].vss[vsIdStr!]) {
      this.map.layers[layer].vss[vsIdStr!] = {
        rows: {},
        lastFocusedRowIndex: 0,
      };

      if (isLevelCreatedHere) {
        this.map.layers[layer].lastFocusedVs = utilNavigation.vsStrToNumberArr(
          vsIdStr!
        );
      }
    }

    // If row dont already exists = create it;
    if (!this.map.layers[layer].vss[vsIdStr!].rows[row]) {
      this.map.layers[layer].vss[vsIdStr!].rows[row] = {
        lastFocusedItemIndex: item,
        items: [itemId],
      };

      return;
    }

    this.map.layers[layer].vss[vsIdStr!].rows[row].items.push(itemId);
  };

  // Every time focus changes on the Map, this method helps keeping the map up-to-date with the new change
  // To be used for manual "setFocus()" purpose when needed
  public updateMapData = (mapMeta: INavigationMapMeta) => {
    const { layer, vs, row, item } = mapMeta;
    const vsIndex = utilNavigation.vsNumberArrToStr(vs);

    if (!this.map.layers[layer]?.vss[vsIndex]?.rows[row]?.items[item]) {
      console.log("Violation map focus update");
      return;
    }

    const vsIdArr = utilNavigation.vsStrToNumberArr(vsIndex);

    this.activeState.layer = layer;
    this.activeState.vs = vsIdArr;
    this.activeState.row = row;
    this.activeState.item = item;

    this.map.layers[layer].lastFocusedVs = vsIdArr;
    this.map.layers[layer].vss[vsIndex].lastFocusedRowIndex = row;
    this.map.layers[layer].vss[vsIndex].rows[row].lastFocusedItemIndex = item;

    this.activeState$.next(this.activeState);
  };

  // This method triggers the navigation and the resultant data-structure is updated
  public navigate = (direction: ENavigationDirection): INavigationMapMeta => {
    let mapMeta: INavigationMapMeta | undefined;
    if (
      direction === ENavigationDirection.UP ||
      direction === ENavigationDirection.DOWN
    ) {
      mapMeta = this.navigateVertical(direction);
    } else {
      mapMeta = this.navigateHorizntal(direction);
    }

    const newActiveState = mapMeta || this.activeState;
    this.activeState$.next(newActiveState);

    return newActiveState;
  };

  // This Mehod returns -- the next focus Item but DOES NOT commit to the map data-structure
  // helpful for intercepting the navigation move, and if make any changes if needed
  // The output of this function can then be passed to "updateMapData()" method to trigger the navigation update
  public getNextNavigate = (
    direction: ENavigationDirection
  ): INavigationMapMeta | undefined => {
    if (
      direction === ENavigationDirection.UP ||
      direction === ENavigationDirection.DOWN
    ) {
      return this.navigateVertical(direction, true);
    } else return this.navigateHorizntal(direction, true);
  };

  public setInitialFocus = (initial: INavigationMapState) => {
    this.activeState = { ...initial };
  };

  public getActiveState = () => {
    return this.activeState;
  };
}

export default NavigationMap;
