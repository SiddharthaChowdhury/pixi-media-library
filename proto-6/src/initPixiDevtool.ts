import * as PIXI from "pixi.js-legacy";

const initPixiDevtool = () => {
  //   //@ts-ignore
  //   window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  //     //@ts-ignore
  //     window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

  if (process.env.NODE_ENV !== "production") {
    // @ts-ignore
    window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
      // @ts-ignore
      window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
  }
};

export default initPixiDevtool;
