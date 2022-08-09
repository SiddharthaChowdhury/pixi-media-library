import NavigationMap from "./NavigationMap";
import { ENavigationDirection } from "./types";
import utilNavigation from "./utilNavigation";

const createNewDummVsData = (vsId: number[], noLanes: number) => {
  const dummyLane: any = {};

  for (let i = 0; i < noLanes; i++) {
    dummyLane[i] = {
      lastFocusedItemIndex: 0,
      items: [],
    };

    for (let j = 0; j < 2; j++) {
      dummyLane[i].items.push(utilNavigation.generateItemId(0, vsId, i, j));
    }
  }

  return dummyLane;
};

const navObj = new NavigationMap();
navObj.addNewVs(createNewDummVsData([0, 0], 2), [0, 0], 0);
navObj.addNewVs(createNewDummVsData([1, 0], 2), [1, 0], 0);

navObj.addNewVs(createNewDummVsData([0, 1], 2), [0, 1], 0);
navObj.addNewVs(createNewDummVsData([0, -1], 2), [0, -1], 0);

/*
    Demonstrating the LAYER and VS coordinates for our test
    Above Navigation-map will be following JSON below
    {
        Layer : "0": {
            "lastFocusedVs": [0, 0],
            "vss": {
                "0_0": {
                    "rows": {
                        "0": {
                            "lastFocusedItemIndex": 0,
                            "items": ["0-0_0-0-0", "0-0_0-0-1"]
                        },
                        "1": {
                            "lastFocusedItemIndex": 0,
                            "items": ["0-0_0-1-0", "0-0_0-1-1"]
                        }
                    },
                    "lastFocusedRowIndex": 0
                },
                "1_0": {
                    "rows": {
                        "0": {
                            "lastFocusedItemIndex": 0,
                            "items": ["0-1_0-0-0", "0-1_0-0-1"]
                        },
                        "1": {
                            "lastFocusedItemIndex": 0,
                            "items": ["0-1_0-1-0", "0-1_0-1-1"]
                        }
                    },
                    "lastFocusedRowIndex": 0
                },
                "0_1": {
                    "rows": {
                        "0": {
                            "lastFocusedItemIndex": 0,
                            "items": ["0-0_1-0-0", "0-0_1-0-1"]
                        },
                        "1": {
                            "lastFocusedItemIndex": 0,
                            "items": ["0-0_1-1-0", "0-0_1-1-1"]
                        }
                    },
                    "lastFocusedRowIndex": 0
                },
                "0_-1": {
                    "rows": {
                        "0": {
                            "lastFocusedItemIndex": 0,
                            "items": ["0-0_-1-0-0", "0-0_-1-0-1"]
                        },
                        "1": {
                            "lastFocusedItemIndex": 0,
                            "items": ["0-0_-1-1-0", "0-0_-1-1-1"]
                        }
                    },
                    "lastFocusedRowIndex": 0
                }
            }
        }
    }
*/

describe("Testing Navigation", () => {
  test("Navigation horizontal RIGHT", () => {
    const newState1 = navObj.navigate(ENavigationDirection.RIGHT);

    expect(newState1.vs).toEqual([0, 0]);
    expect(newState1.row).toEqual(0);
    expect(newState1.item).toEqual(1);

    const newState2 = navObj.navigate(ENavigationDirection.RIGHT);
    expect(newState2.vs).toEqual([1, 0]);
    expect(newState2.row).toEqual(0);
    expect(newState2.item).toEqual(0);

    navObj.navigate(ENavigationDirection.RIGHT);
    const newState3 = navObj.navigate(ENavigationDirection.RIGHT);
    expect(newState3.vs).toEqual([1, 0]);
    expect(newState3.row).toEqual(0);
    expect(newState3.item).toEqual(1);
  });

  test("Navigation horizontal LEFT", () => {
    const newState1 = navObj.navigate(ENavigationDirection.LEFT);

    expect(newState1.vs).toEqual([1, 0]);
    expect(newState1.row).toEqual(0);
    expect(newState1.item).toEqual(0);

    const newState2 = navObj.navigate(ENavigationDirection.LEFT);
    expect(newState2.vs).toEqual([0, 0]);
    expect(newState2.row).toEqual(0);
    expect(newState2.item).toEqual(1);

    navObj.navigate(ENavigationDirection.LEFT);
    const newState3 = navObj.navigate(ENavigationDirection.LEFT);
    expect(newState3.vs).toEqual([0, 0]);
    expect(newState3.row).toEqual(0);
    expect(newState3.item).toEqual(0);
  });

  test("Navigation vertical DOWN", () => {
    const newState1 = navObj.navigate(ENavigationDirection.DOWN);

    expect(newState1.vs).toEqual([0, 0]);
    expect(newState1.row).toEqual(1);
    expect(newState1.item).toEqual(0);

    const newState2 = navObj.navigate(ENavigationDirection.DOWN);
    expect(newState2.vs).toEqual([0, 1]);
    expect(newState2.row).toEqual(0);
    expect(newState2.item).toEqual(0);

    const newState3 = navObj.navigate(ENavigationDirection.DOWN);
    expect(newState3.vs).toEqual([0, 1]);
    expect(newState3.row).toEqual(1);
    expect(newState3.item).toEqual(0);
  });

  test("Navigation vertical UP", () => {
    const newState1 = navObj.navigate(ENavigationDirection.UP);
    expect(newState1.vs).toEqual([0, 1]);
    expect(newState1.row).toEqual(0);
    expect(newState1.item).toEqual(0);

    const newState2 = navObj.navigate(ENavigationDirection.UP);
    expect(newState2.vs).toEqual([0, 0]);
    expect(newState2.row).toEqual(1);
    expect(newState2.item).toEqual(0);

    const newState3 = navObj.navigate(ENavigationDirection.UP);
    expect(newState3.vs).toEqual([0, 0]);
    expect(newState3.row).toEqual(0);
    expect(newState3.item).toEqual(0);

    const newState4 = navObj.navigate(ENavigationDirection.UP);
    expect(newState4.vs).toEqual([0, -1]);
    expect(newState4.row).toEqual(0);
    expect(newState4.item).toEqual(0);

    const newState5 = navObj.navigate(ENavigationDirection.UP);
    expect(newState5.vs).toEqual([0, -1]);
    expect(newState5.row).toEqual(0);
    expect(newState5.item).toEqual(0);
  });
});
