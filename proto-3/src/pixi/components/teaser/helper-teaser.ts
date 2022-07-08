import { Container } from "pixi.js";
import { IRectGraphics } from "../atoms/rect/IRectGraphics";
import { getRect } from "../atoms/rect/rect";
import { ETeaserPartname } from "./types";

export const focusTeaser = (teaser: Container) => {
  const wrapperGraphic = teaser.getChildByName(
    ETeaserPartname.TEASER_FRAME
  ) as IRectGraphics;

  const { x, y, width, height } = wrapperGraphic.getLocalBounds();

  const border = getRect({
    x: width / 2,
    y: height / 2,
    height: height,
    width: width,
    borderRadius: wrapperGraphic.borderRadius || 0,
    borderColor: 0xff0000,
    borderWidth: 8,
  });

  border.pivot.x = width / 2;
  border.pivot.y = height / 2;

  teaser.addChildAt(border, 0);

  // anim_movement(teaser).scale(1.03, 1.03);
};

export const unFocusteaser = (teaser: Container) => {
  teaser.removeChildAt(0);

  teaser.scale.x = 1; // default no scale
  teaser.scale.y = 1; // default no scale
};
