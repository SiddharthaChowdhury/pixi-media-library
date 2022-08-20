import * as PIXI from "pixi.js-legacy";
import { IRectGraphics, Rect } from "../components/atoms";
import teaserStructure from "../components/molecules/teaser/teaserStructure";
import { ETeaserPartname, ETeaserType, ITeaserStructure } from "../types";

const FOCUS_RECT_NAME_POSTFIX = "FOCUS_RECT";

export const teaserhelper = (teaser?: PIXI.Container) => {
  const focusTeaser = () => {
    if (!teaser) return;

    // Is Teaser is already focused
    if (
      teaser.getChildAt(0).name === `${teaser.name}_${FOCUS_RECT_NAME_POSTFIX}`
    )
      return;

    const wrapperGraphic = teaser.getChildByName(
      ETeaserPartname.TEASER_FRAME
    ) as IRectGraphics;

    const { width, height } = wrapperGraphic.getLocalBounds();

    const border = new Rect({
      x: width / 2,
      y: height / 2,
      height,
      width,
      border: wrapperGraphic.borderRadius
        ? {
            radius: [
              wrapperGraphic.borderRadius,
              wrapperGraphic.borderRadius,
              wrapperGraphic.borderRadius,
              wrapperGraphic.borderRadius,
            ],
            width: 8,
            color: "#ffffff",
          }
        : undefined,
    });

    border.pivot.x = width / 2;
    border.pivot.y = height / 2;
    border.name = `${teaser.name}_${FOCUS_RECT_NAME_POSTFIX}`;

    teaser.addChildAt(border, 0);
  };

  const unFocusteaser = () => {
    if (!teaser) return;
    const focusRect = teaser.getChildAt(0);

    // If teaser dont have focus
    if (focusRect.name !== `${teaser.name}_${FOCUS_RECT_NAME_POSTFIX}`) return;

    teaser.removeChildAt(0);

    teaser.scale.x = 1; // default no scale
    teaser.scale.y = 1; // default no scale
  };

  const getTeaserStructureData = (
    teaserType: ETeaserType
  ): ITeaserStructure => {
    switch (teaserType) {
      case ETeaserType.FORMAT:
        return teaserStructure.formatTeaser;
      case ETeaserType.EPISODE:
      default:
        return teaserStructure.episodeTeaser;
    }
  };

  return {
    focusTeaserVisual: focusTeaser,
    unFocusteaserVisual: unFocusteaser,
    getTeaserStructureData,
  };
};
