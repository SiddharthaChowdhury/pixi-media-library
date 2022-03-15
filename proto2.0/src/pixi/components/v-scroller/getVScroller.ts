import { Container } from "pixi.js";

interface IVScroller {
  lanes: Container[];
  nameId: string;
  x: number;
  y: number;
  gapBetweenLanesPx: number;
}

const getVScroller = (props: IVScroller) => {
  const zVCont = new Container();
  zVCont.name = props.nameId;
  zVCont.x = props.x;
  zVCont.y = props.y;

  let nextLaneY = props.y;
  props.lanes.forEach((laneContainer) => {
    laneContainer.x = props.x;
    laneContainer.y = nextLaneY;

    nextLaneY +=
      laneContainer.getBounds().height + (props.gapBetweenLanesPx || 10);

    zVCont.addChild(laneContainer);
  });

  return zVCont;
};

export default getVScroller;
