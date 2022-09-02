import * as PIXI from "pixi.js-legacy";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

export const gsapAnimation = () => {
  const init = () => {
    // register the plugin
    gsap.registerPlugin(PixiPlugin);

    // give the plugin a reference to the PIXI object
    PixiPlugin.registerPIXI(PIXI);
  };

  const moveY = (pixiObject: any, newY: number) => {
    gsap.to(pixiObject, { pixi: { y: newY }, duration: 1 });
  };

  return {
    moveY,
    init,
  };
};
