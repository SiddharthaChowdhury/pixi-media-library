class NavigationMapData {
  private activeVs: number = 0;
  private activeRow: number = 0;
  private activeItem: number = 0;
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
  public map: Record<number, Array<Array<string>>>;

  constructor(lanesDataArr: Array<Array<string>>, vsID: number) {
    this.map = {
      [vsID]: lanesDataArr,
    };
  }

  public setNewVc_withLanes = (
    lanesDataArr: Array<Array<string>>,
    vsID: number
  ) => {
    if (!this.map[vsID]) {
      this.map[vsID] = lanesDataArr;
    }
  };
}

export default NavigationMapData;
