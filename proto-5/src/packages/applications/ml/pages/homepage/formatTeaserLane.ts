import { IBounds_orig } from "../../../../pixi";
import { INavMeta, TeaserLane } from "../../../../pixi/components/molecules";

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
  const BOX_WIDTH = 1295;
  const BOX_HEIGHT = 400;

  const laneBox: IBounds_orig = {
    x,
    y,
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    x2: x + BOX_WIDTH,
    y2: y + BOX_HEIGHT,
  };

  return {
    laneItem: new TeaserLane({
      boxStructure: laneBox,
      navMeta,
      loader,
    }),
    bounds: laneBox,
  };

  //   teaserLane.addTeaser(teaserInfo, 10);
};

export default formatTeaserLane;
