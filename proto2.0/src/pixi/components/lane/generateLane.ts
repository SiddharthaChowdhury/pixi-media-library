import { generateMapItemName } from "../../../utils/utilStrings";
import { getTeaserStructureData, getTeaser } from "../teaser/getTeaser";
import { ETeaserType, ITeaserMeta, ITeaserStructure } from "../teaser/types";
import ZContainer from "../z-container/ZComponent";
import { ILaneInfo } from "./ILaneInfo";

interface ILaneProps extends ILaneInfo {
  vsId: number;
  z: number;
}

const generateLane = (props: ILaneProps) => {
  const { label, laneNameId, episodes, vsId, z } = props;

  const laneContainer = new ZContainer();
  laneContainer.name = `${laneNameId}`;
  laneContainer.zOrder = z;

  const teaserStructureData: ITeaserStructure = getTeaserStructureData(
    episodes.teaserType
  );
  const teaserWidth = teaserStructureData.boxDiam.width;

  const teaserCoord = {
    x: 0,
    y: 0,
    z,
    spaceBetweenPx: 10,
  };

  episodes.meta.forEach((showData: ITeaserMeta, teaserIndex: number) => {
    const teaser = getTeaser({
      teaserType: props.episodes.teaserType,
      teaserData: showData,
      x: teaserCoord.x,
      y: teaserCoord.y,
      z: teaserCoord.z,
      name: generateMapItemName(vsId, laneNameId!, teaserIndex),
    });

    teaserCoord.x += teaserWidth + teaserCoord.spaceBetweenPx;
    laneContainer.addChild(teaser);
  });

  return laneContainer;
};

export default generateLane;
