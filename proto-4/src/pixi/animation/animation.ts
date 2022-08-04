import * as PIXI from "pixi.js-legacy";
import { ease } from "pixi-ease";

/**
    EASE animations:
    https://www.npmjs.com/package/penner#included-easing-functions
    DOCS: https://davidfig.github.io/pixi-ease/jsdoc/Ease.html
 */
const animation = (object: PIXI.DisplayObject) => {
  const EASE_ANIM_DELAY = 30;

  const moveX = (x: number, onAnimationComplete?: () => void) => {
    const move = ease.add(
      object,
      { x },
      { duration: EASE_ANIM_DELAY, ease: "easeOutQuad" }
    );
    if (onAnimationComplete) move.once("complete", onAnimationComplete);
  };

  const scale = (xy: number, onAnimationComplete?: () => void) => {
    const scaleXY = ease.add(
      object,
      { scaleX: xy, scaleY: xy },
      { duration: EASE_ANIM_DELAY, ease: "easeOutQuad" }
    );

    if (onAnimationComplete) scaleXY.once("complete", onAnimationComplete);
  };

  return {
    moveX,
    scale,
  };
};

//   appear: (x: number, y: number) => {
//     if (appConfig.animation.power && appConfig.animation.appear) {
//       ease.add(object, { x, y }, { duration: 400 });
//     } else {
//       object.x = x;
//       object.y = y;
//     }
//   },

export default animation;
