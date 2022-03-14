import ZContainer from "../z-container/ZComponent";

interface IVScroller {
  lanes: ZContainer[];
  nameId: string;
  x: number;
  y: number;
  z?: number;
  gapBetweenLanesPx: number;
}

const getVScroller = (props: IVScroller) => {
  const zVCont = new ZContainer();
  zVCont.name = props.nameId;
  zVCont.x = props.x;
  zVCont.y = props.y;
  zVCont.zOrder = props.z;

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
