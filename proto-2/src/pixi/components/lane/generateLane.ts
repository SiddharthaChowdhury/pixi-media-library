import { Container } from "pixi.js";
import { generateMapItemName } from "../../../utils/util-string";
import ContainerExtended from "../atoms/containerExtended/ContainerExtended";
import Teaser, { getTeaserStructureData } from "../teaser/Teaser";
import { ITeaserMeta, ITeaserStructure } from "../teaser/types";
import { ILaneInfo } from "./ILaneInfo";

interface ILaneProps extends ILaneInfo {
  vsId: number;
  spaceBetweenItem?: number;
}

const generateLane = (props: ILaneProps) => {
  const { label, laneNameId, episodes, vsId, spaceBetweenItem } = props;

  const laneContainer = new ContainerExtended();
  laneContainer.name = `${laneNameId}`;
  laneContainer.spaceBetweenItems = spaceBetweenItem || 15;

  const teaserStructureData: ITeaserStructure = getTeaserStructureData(
    episodes.teaserType
  );
  const teaserWidth = teaserStructureData.boxDiam.width;

  const teaserCoord = {
    x: spaceBetweenItem || 0,
    y: 0,
    spaceBetweenPx: spaceBetweenItem || 15,
  };

  episodes.meta.forEach((showData: ITeaserMeta, teaserIndex: number) => {
    const tsrObj = new Teaser();
    const tsr = tsrObj.getTeaser({
      teaserType: props.episodes.teaserType,
      teaserData: showData,
      x: teaserCoord.x,
      y: teaserCoord.y,
      name: generateMapItemName(vsId, laneNameId!, teaserIndex),
    });

    teaserCoord.x += teaserWidth + teaserCoord.spaceBetweenPx;
    laneContainer.addChild(tsr);
  });

  return laneContainer;
};

export default generateLane;
