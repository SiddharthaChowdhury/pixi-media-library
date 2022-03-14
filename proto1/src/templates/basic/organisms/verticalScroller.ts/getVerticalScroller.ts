import { Container } from "pixi.js";

interface IVerticalScroller {
  name: string;
  x: number;
  y: number;
  lanes: Container[];
}

const getVerticalScroller = (props: IVerticalScroller) => {
  const vc = new Container();
  vc.name = `${props.name}`;
  vc.x = props.x;
  vc.y = props.y;

  let nextLaneY = props.y;
  props.lanes.forEach((laneContainer) => {
    laneContainer.x = props.x;
    laneContainer.y = nextLaneY;

    nextLaneY += laneContainer.getBounds().height + 10;

    vc.addChild(laneContainer);
  });

  return vc;
};

export default getVerticalScroller;
