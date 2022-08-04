import { Container } from "pixi.js-legacy";
import { IRectGraphics } from "../atoms/rect/IRectGraphics";
import { getRect } from "../atoms/rect/rect";
import { ETeaserPartname } from "./types";

const FOCUS_RECT_NAME_POSTFIX = "FOCUS_RECT";

export const focusTeaser = (teaser: Container) => {
  if (!teaser) return;

  // Is Teaser is already focused
  if (teaser.getChildAt(0).name === `${teaser.name}_${FOCUS_RECT_NAME_POSTFIX}`)
    return;

  const wrapperGraphic = teaser.getChildByName(
    ETeaserPartname.TEASER_FRAME
  ) as IRectGraphics;

  const { width, height } = wrapperGraphic.getLocalBounds();
  const border = getRect({
    x: width / 2,
    y: height / 2,
    height,
    width,
    borderRadius: wrapperGraphic.borderRadius || 0,
    borderColor: 0xff0000,
    borderWidth: 8,
  });

  border.pivot.x = width / 2;
  border.pivot.y = height / 2;
  border.name = `${teaser.name}_${FOCUS_RECT_NAME_POSTFIX}`;

  teaser.addChildAt(border, 0);
};

export const unFocusteaser = (teaser: Container) => {
  if (!teaser) return;
  const focusRect = teaser.getChildAt(0);

  // If teaser dont have focus
  if (focusRect.name !== `${teaser.name}_${FOCUS_RECT_NAME_POSTFIX}`) return;

  teaser.removeChildAt(0);

  teaser.scale.x = 1; // default no scale
  teaser.scale.y = 1; // default no scale
};
