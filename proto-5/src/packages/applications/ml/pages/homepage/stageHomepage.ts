import { INavMeta } from "../../../../navigation/types";
import utilNavigation from "../../../../navigation/utilNavigation";
import { ERectBorderRadiusType } from "../../../../pixi/components/atoms";
import {
  IStageData,
  IStageStructure,
  Stage,
} from "../../../../pixi/components/molecules";
import { homepageNavMap } from "./HomePage";

// The stage component of the Homepage
const stageStructure: IStageStructure = {
  boxStructure: {
    width: 1200,
    height: 544,
    border: {
      radius: {
        size: 50,
        type: ERectBorderRadiusType.BOTTOM_CORNERS,
      },
      color: "#eb4034",
      width: 3,
    },
    fillColor: "#abf5d9",
  },
  partials: [
    {
      name: "Stage-Title",
      type: "title",
      width: 500,
      height: 20,
      x: 30,
      y: 30,
    },
    {
      name: "Stage-Desc",
      type: "description",
      width: 500,
      height: 200,
      x: 30,
      y: 35,
    },
  ],
};

export const getStageHomePage = (
  navMeta: INavMeta,
  data: any,
  preloader: any
) => {
  const Buttons: any = [
    {
      name: utilNavigation.generateItemId(
        navMeta.layerId,
        navMeta.parentColId,
        navMeta.rowId,
        0
      ),
      type: "circleBtn",
      radius: 30,
      bgColor: "#fbfbfb",
      focusable: true,
      x: 60,
      y: 475,
    },
    {
      name: utilNavigation.generateItemId(
        navMeta.layerId,
        navMeta.parentColId,
        navMeta.rowId,
        1
      ),
      type: "circleBtn",
      radius: 30,
      bgColor: "#fbfbfb",
      focusable: true,
      x: 140,
      y: 475,
    },
    {
      name: utilNavigation.generateItemId(
        navMeta.layerId,
        navMeta.parentColId,
        navMeta.rowId,
        2
      ),
      type: "circleBtn",
      radius: 30,
      bgColor: "#fbfbfb",
      focusable: true,
      x: 220,
      y: 475,
    },
  ];

  // Register new Item to the navigation map
  // Because here we have 3 focusable buttons in stage homePage, we register each focusable buttons below
  homepageNavMap.addItemToRow(Buttons[0].name);
  homepageNavMap.addItemToRow(Buttons[1].name);
  homepageNavMap.addItemToRow(Buttons[2].name);

  const stageData: IStageData = {
    title: data.tvShowTitle || "",
    subtitle: `S${data.seasonNumber} E${data.episodeNumber}: ${data.episodeTitle} • ${data.numberOfSeasons} • Ab ${data.ageRating}`,
    description: data.tvShowDescription || "",
    backgroundImgUrl: data.tvShowBackgroungImageUrl || "",
  };

  return new Stage({
    stageName: utilNavigation.generateLaneId(
      navMeta.layerId,
      navMeta.parentColId,
      navMeta.rowId
    ),
    stageStructure: {
      ...stageStructure,
      partials: [...Buttons, ...stageStructure.partials],
    },
    stageData,
    preloader,
  });
};
