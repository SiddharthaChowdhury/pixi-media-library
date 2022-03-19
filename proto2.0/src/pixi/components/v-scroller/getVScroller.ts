import { Container } from "pixi.js";
import ContainerExtended from "../atoms/containerExtended/ContainerExtended";

interface IVScroller {
  lanes: Container[];
  nameId: string;
  x: number;
  y: number;
  gapBetweenLanesPx: number;
  heightVirtual?: number;
  widthVirtual?: number;
}

const getVScroller = (props: IVScroller) => {
  const vCont = new ContainerExtended();
  vCont.name = props.nameId;
  vCont.x = props.x;
  vCont.y = props.y;
  vCont.heightVirtual = props.heightVirtual;
  vCont.widthVirtual = props.widthVirtual;

  let nextLaneY = props.y;
  props.lanes.forEach((laneContainer) => {
    laneContainer.x = 0;
    laneContainer.y = nextLaneY;

    nextLaneY +=
      laneContainer.getBounds().height + (props.gapBetweenLanesPx || 10);

    vCont.addChild(laneContainer);
  });

  return vCont;
};

export default getVScroller;
