import { INavMeta, utilNavigation } from "@mono/navigation";
import { TeaserLane, IBounds_orig } from "@mono/pixi-engine";
import { dimenstion } from "../../../config/dimension";

interface IFormatTeaserLane {
  x: number;
  y: number;
  navMeta: INavMeta;
  loader: any;
}

const formatTeaserLane = ({
  x,
  y,
  navMeta,
  loader,
}: IFormatTeaserLane): { laneItem: TeaserLane; bounds: IBounds_orig } => {
  const BOX_WIDTH = dimenstion.formatTeaserLane.width;
  const BOX_HEIGHT = dimenstion.formatTeaserLane.height;

  const laneBox: IBounds_orig = {
    x,
    y,
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    x2: x + BOX_WIDTH,
    y2: y + BOX_HEIGHT,
  };

  const laneItem = new TeaserLane({
    boxStructure: laneBox,
    loader,
    laneName: utilNavigation.generateLaneId(
      navMeta.layerId,
      navMeta.parentColId,
      navMeta.rowId
    ),
  });

  return {
    laneItem,
    bounds: laneBox,
  };
};

export default formatTeaserLane;
