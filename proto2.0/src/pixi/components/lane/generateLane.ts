import { Container } from "pixi.js";
import { generateMapItemName } from "../../../utils/utilStrings";
import { getTeaserStructureData, getTeaser } from "../teaser/getTeaser";
import { ETeaserType, ITeaserMeta, ITeaserStructure } from "../teaser/types";
import { ILaneInfo } from "./ILaneInfo";

interface ILaneProps extends ILaneInfo {
  vsId: number;
}

const generateLane = (props: ILaneProps) => {
  const { label, laneNameId, episodes, vsId } = props;

  const laneContainer = new Container();
  laneContainer.name = `${laneNameId}`;

  const teaserStructureData: ITeaserStructure = getTeaserStructureData(
    episodes.teaserType
  );
  const teaserWidth = teaserStructureData.boxDiam.width;

  const teaserCoord = {
    x: 0,
    y: 0,
    spaceBetweenPx: 10,
  };

  episodes.meta.forEach((showData: ITeaserMeta, teaserIndex: number) => {
    const teaser = getTeaser({
      teaserType: props.episodes.teaserType,
      teaserData: showData,
      x: teaserCoord.x,
      y: teaserCoord.y,
      name: generateMapItemName(vsId, laneNameId!, teaserIndex),
    });

    // const teaser = molicules.getTeaser();

    teaserCoord.x += teaserWidth + teaserCoord.spaceBetweenPx;
    laneContainer.addChild(teaser);
  });

  return laneContainer;
};

export default generateLane;
