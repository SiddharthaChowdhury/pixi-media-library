import { ERectBorderRadiusType } from "../../../../pixi/components/atoms";
import {
  IStageData,
  IStageStructure,
  Stage,
} from "../../../../pixi/components/molecules";
import { IHomePageStructure } from "./types";

// The stage component of the Homepage
const stageStructure: IStageStructure = {
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
  data: IHomePageStructure,
  preloader: any
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

  const stageData: IStageData = {
    title: data.title || "",
    subtitle: data.stageSubtitle || "",
    description: data.description || "",
    backgroundImgUrl: data.backgroundImgUrl || "",
  };

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
    stageData,
    preloader,
  });
};