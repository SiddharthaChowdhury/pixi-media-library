import * as PIXI from "pixi.js";
import { ease } from "pixi-ease";

/**
    EASE animations:
    https://www.npmjs.com/package/penner#included-easing-functions
 */
const animation = (object: PIXI.DisplayObject) => {
  return {
    moveX: (x: number) => {
      ease.add(object, { x }, { duration: 100, ease: "easeOutQuad" });
    },
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
//   moveX: (x: number) => {
//     if (appConfig.animation.power && appConfig.animation.movement)
//       ease.add(object, { x }, { duration: 100, ease: "easeOutQuad" });
//     else object.x = x;
//   },
//   moveY: (y: number) => {
//     if (appConfig.animation.power && appConfig.animation.movement)
//       ease.add(object, { y }, { duration: 100, ease: "easeOutQuad" });
//     else object.y = y;
//   },
//   scale: (scaleX: number, scaleY: number) => {
//     if (appConfig.animation.power && appConfig.animation.scale)
//       ease.add(
//         object,
//         { scaleX, scaleY },
//         { duration: 100, ease: "easeOutQuad" }
//       );
//     else {
//       object.scale.x = 1.03;
//       object.scale.y = 1.03;
//     }
//   },

export default animation;
