export interface INavMapLane {
  [laneIndex: number]: {
    lastFocusedItemIndex: number;
    items: string[];
  };
}
export interface INavMap {
  [vsID: number]: {
    lastFocusedLaneIndex: number;
    lanes: INavMapLane;
  };
}

class NavigationMapData {
  public activeState = {
    vs: 0,
    lane: 0,
    item: 0,
  };

  /*
      map = {
          <Vc_number_0>: [
              <Row_number_0> [<Item_number_0> ,<Item_number_1>, ....<Item_number_N>],
              <Row_number_1> [<Item_number_0> ,<Item_number_1>, ....<Item_number_N>],
              .
              .
              <Row_number_N> [<Item_number_0> ,<Item_number_1>, ....<Item_number_N>],
          ],
      }
  */
  public map: INavMap;

  constructor(lanesDataObj: INavMapLane, vsID: number) {
    this.map = {
      [vsID]: {
        lanes: lanesDataObj,
        lastFocusedLaneIndex: 0,
      },
    };
  }

  public setNewVc_withLanes = (lanesDataObj: INavMapLane, vsID: number) => {
    if (!this.map[vsID]) {
      this.map[vsID] = {
        lanes: lanesDataObj,
        lastFocusedLaneIndex: 0,
      };
    }
  };

  public navigateTop = () => {
    // if --- previous lane exist
    // if (this.map[this.activeState.vs][this.activeState.lane - 1]) {
    //   this.activeState.item =
    //     this.map[this.activeState.vs][
    //       this.activeState.lane - 1
    //     ].lastFocusedItemIndex;
    //   this.activeState.lane -= 1;

    //   return this.activeState;
    // }

    // if(this.map[this.activeState.vs - 1])
    const activeVs = this.activeState.vs;
    const activeLane = this.activeState.lane;
    const activeItem = this.activeState.item;

    // if(this.map[activeVs])
  };
}

export default NavigationMapData;
