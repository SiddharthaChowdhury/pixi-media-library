import appConfig from "../app-config/appConfig";
import anim_movement from "../pixi/animation/anim_movement";
import { INavigationMapElements } from "./types";

export const verticalScrollDown = ({
  vs,
  lane,
  item,
}: INavigationMapElements) => {
  /* On scroll down page goes up */

  const IDEAL_FOCUS_y = 360; // somewhat mid of screen
  const lanePadding = vs.spaceBetweenItems;
  const screenHeight = appConfig.viewport.height;

  const laneMidY = lane.y + lane.height / 2;
  const vs_y2 = vs.height + vs.y;

  if (laneMidY >= IDEAL_FOCUS_y) {
    const diff = laneMidY - IDEAL_FOCUS_y;
    const toBeVs_y2 = vs_y2 - diff;

    if (toBeVs_y2 > screenHeight) {
      console.log("***** > ", toBeVs_y2);
      anim_movement(vs).moveY(vs.y - diff);
    } else {
      const newDiff = screenHeight - vs_y2;
      console.log("#### > ", screenHeight, toBeVs_y2, vs.y, newDiff);
      anim_movement(vs).moveY(vs.y + newDiff + (lanePadding || 0));
    }
  }
};
