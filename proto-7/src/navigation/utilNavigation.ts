import { INavigationMapMeta } from "./types";

const utilNavigation = {
  vsStrToNumberArr: (vsIdString: string) => {
    const [x, y] = vsIdString.split("_");
    return [parseInt(x), parseInt(y)];
  },

  vsNumberArrToStr: (vsNumberArr: number[]) => {
    const [x, y] = vsNumberArr;
    return `${x}_${y}`;
  },

  generateVsId: (layer: number, vsNumberArr: number[]) => {
    return `${layer}-${utilNavigation.vsNumberArrToStr(vsNumberArr)}`;
  },

  generateLaneId: (layer: number, vs: number[], row: number) => {
    return `${layer}-${utilNavigation.vsNumberArrToStr(vs)}-${row}`;
  },

  generateItemId: (layer: number, vs: number[], row: number, item: number) => {
    return `${utilNavigation.generateLaneId(layer, vs, row)}-${item}`;
  },

  generateLaneIdFromVsId: (vsId: string, laneIndex: number) =>
    `${vsId}-${laneIndex}`,

  generateItemIdFromLaneId: (laneId: string, itemIndex: number) => {
    return `${laneId}-${itemIndex}`;
  },

  getElementIdFromNavMapMeta: (navMapMeta: INavigationMapMeta) => {
    const { vs, layer, row, item } = navMapMeta;
    return utilNavigation.generateItemId(layer, vs, row, item);
  },

  itemIdToMapMeta: (itemIdStr: string): INavigationMapMeta => {
    const [layerId, vsIdStr, rowId, itemId] = itemIdStr.split("-");
    const vsId = utilNavigation.vsStrToNumberArr(vsIdStr);

    return {
      layer: parseInt(layerId),
      vs: vsId,
      vsIdStr,
      row: parseInt(rowId),
      item: parseInt(itemId),
    };
  },
};

export default utilNavigation;
