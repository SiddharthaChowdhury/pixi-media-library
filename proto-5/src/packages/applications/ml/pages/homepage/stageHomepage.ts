import { ERectBorderRadiusType } from "../../../../pixi/components/atoms";
import { Stage } from "../../../../pixi/components/molecules";

// The stage component of the Homepage
export const getStageHomePage = (parentColId: number[], layerId: number) => {
  const rowId = 0;
  return new Stage({
    navMeta: {
      layerId: layerId,
      parentColId,
      rowId,
    },
    x: 0,
    y: 0,
    width: 1200,
    height: 544,

    border: {
      radius: {
        size: 30,
        type: ERectBorderRadiusType.BOTTOM_CORNERS,
      },
      color: "#eb4034",
      width: 3,
    },
    fillColor: "#abf5d9",
  });
};
