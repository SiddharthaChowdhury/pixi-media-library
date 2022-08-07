import { ERectBorderRadiusType } from "../../../../pixi/components/atoms";
import { IStageStructure, Stage } from "../../../../pixi/components/molecules";
import { IHomePageStructure } from "./types";

// The stage component of the Homepage
const stageStructure: IStageStructure = {
  x: 0,
  y: 0,
  boxStructure: {
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
  },
  partials: [
    {
      type: "title",
      width: 500,
      height: 20,
      x: 30,
      y: 30,
    },
    {
      type: "description",
      width: 500,
      height: 200,
      x: 30,
      y: 35,
    },
  ],
};

export const getStageHomePage = (
  parentColId: number[],
  layerId: number,
  data: IHomePageStructure
) => {
  const rowId = 0;

  const Buttons: any = [
    {
      type: "circleBtn",
      radius: 30,
      bgColor: "#fbfbfb",
      focusable: true,
      x: 60,
      y: 475,
    },
    {
      type: "circleBtn",
      radius: 30,
      bgColor: "#fbfbfb",
      focusable: true,
      x: 140,
      y: 475,
    },
    {
      type: "circleBtn",
      radius: 30,
      bgColor: "#fbfbfb",
      focusable: true,
      x: 220,
      y: 475,
    },
  ];

  return new Stage({
    navMeta: {
      layerId: layerId,
      parentColId,
      rowId,
    },
    stageStructure: {
      ...stageStructure,
      partials: [...Buttons, ...stageStructure.partials],
    },
  });
};
