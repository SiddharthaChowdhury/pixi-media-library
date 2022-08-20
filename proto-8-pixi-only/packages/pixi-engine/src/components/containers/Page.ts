import * as PIXI from "pixi.js-legacy";

interface IPageContainerProps {
  layerId: number; // Useful for navigation! This acts as grandParentIndex (usually always = 0)
}

export class PixiPage extends PIXI.Container {
  protected layerId: number;

  constructor(props: IPageContainerProps) {
    super();
    this.layerId = props.layerId;
  }
}
