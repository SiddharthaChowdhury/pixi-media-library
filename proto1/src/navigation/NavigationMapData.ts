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

export interface INavigationMapActiveState {
  vs: number;
  lane: number;
  item: number;
}

class NavigationMapData {
  public activeState: INavigationMapActiveState = {
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

  public navigate_Vertical = (direction: 'up' | 'down'): INavigationMapActiveState => {
    const activeVs = this.activeState.vs;
    const activeLane = this.activeState.lane;
    
    const targetLane = direction === 'up' ? activeLane - 1 : activeLane + 1;
    const targetVs = direction === 'up' ? activeVs - 1 : activeVs + 1;

    if(this.map[activeVs].lanes[targetLane]) {
      // if --- target lane exist
      this.map[activeVs].lastFocusedLaneIndex = targetLane;

      this.activeState = {
        vs: activeVs,
        lane: targetLane,
        item: this.map[activeVs].lanes[targetLane].lastFocusedItemIndex
      };
    } 
    // else if(this.map[targetVs]) {
    //   // or if target VirtualScroller exists 
    //   this.activeState = {
    //     vs: targetVs,
    //     lane: this.map[targetVs].lastFocusedLaneIndex,
    //     item: this.map[targetVs].lanes[this.map[targetVs].lastFocusedLaneIndex].lastFocusedItemIndex
    //   }
    // }

    return this.activeState;
  };

  public navigate_Horizontal = (direction: 'left' | 'right'): INavigationMapActiveState => {
    const activeVs = this.activeState.vs;
    const activeItem = this.activeState.item;
    const activeLane = this.activeState.lane
    
    const targetItem = direction === 'left' ? activeItem - 1 : activeItem + 1;
    const targetVs = direction === 'left' ? activeVs - 1 : activeVs + 1;

    if(this.map[activeVs].lanes[activeLane].items[targetItem]) {
      // if --- target Item exist
      try{
        this.map[activeVs].lanes[this.map[activeVs].lastFocusedLaneIndex].lastFocusedItemIndex = targetItem;
      }catch(e){
        console.warn('>>> changing ', activeItem, targetItem, this.map[activeVs])
      }

      this.activeState = {
        vs: activeVs,
        lane: activeLane,
        item: targetItem
      };
    } 
    // else if(this.map[targetVs]) {
    //   // or if target VirtualScroller exists 
    //   this.activeState = {
    //     vs: targetVs,
    //     lane: this.map[targetVs].lastFocusedLaneIndex,
    //     item: this.map[targetVs].lanes[this.map[targetVs].lastFocusedLaneIndex].lastFocusedItemIndex
    //   }
    // }

    return this.activeState;
  };
}

export default NavigationMapData;
