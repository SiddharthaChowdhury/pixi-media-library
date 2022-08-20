import * as PIXI from "pixi.js-legacy";
import { IRectProps } from "./types";

const defaultVal: IRectProps = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  border: {
    width: 1,
    color: "#FF2E00",
    radius: [0, 0, 0, 0],
  },
};

export class Rect extends PIXI.Graphics {
  constructor(props: IRectProps) {
    super();
    const pr: IRectProps = {
      ...defaultVal,
      ...props,
    };

    const g = this;
    g.clear();

    const { x, y, width, height, background, border } = pr;

    g.lineStyle(border.width, PIXI.utils.string2hex(border.color));

    if (background)
      g.beginFill(PIXI.utils.string2hex(background.fill), background.opacity);

    const brTop = border.radius[0] || 1;
    const brRig = border.radius[1] || 1;
    const brBot = border.radius[2] || 1;
    const brLef = border.radius[3] || 1;

    // pen down at TOP-LEFT corner
    g.moveTo(x + brTop, y);

    // Top line
    g.lineTo(x + width - brRig, y); // drawn LINE to TOP-RIGHT
    g.quadraticCurveTo(x + width, y, x + width, y + brRig); // Drawing the border-radius TOP-RIGHT and then, turtle facing down.

    // Right line
    g.lineTo(x + width, y + height - brBot); // drawn LINE to BOTTOM-RIGHT from TOP-RIGHT
    g.quadraticCurveTo(x + width, y + height, x + width - brBot, y + height); // Drawing the border-radius BOTTOM-RIGHT and then, turtle facing left.

    // Bottom line
    g.lineTo(x + brLef, y + height); // Drawn LINE to BOTTOM-LEFT from BOTTOM-RIGHT
    g.quadraticCurveTo(x, y + height, x, y + height - brLef); // Drawing the border-radius BOTTOM-LEFT and then, turtle facing up.

    // Left line
    g.lineTo(x, y + brTop); // drawn LINE from top TOP-LEFT from BOTTOM-LEFT
    g.quadraticCurveTo(x, y, x + brTop, y); // Drawing the border-radius TOP-LEFT and then, turtle facing right.

    g.closePath(); // Finish drawing

    this.name = props.name;
  }
}
