import * as PIXI from "pixi.js-legacy";
import { gsapAnimation } from "../animation/gsapAnimation";
import { IPixiApp } from "./types";

interface IPixiAppOptions {
  rootId: string; // Div | Span elementId
  antialias?: boolean;
  autoDensity?: boolean;
  backgroundColor?: string;
  devtool?: boolean;
}

export class PixiApp implements IPixiApp {
  public application: PIXI.Application | undefined;

  private enableDevtool;
  private initChromePlugin = () => {
    // if (this.enableDevtool) {
    console.log(">> PIXI Devtool enabled");
    // @ts-ignore
    window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
      // @ts-ignore
      window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
    // }
  };

  constructor(options: IPixiAppOptions) {
    if (document.getElementById("app-canvas")) return;

    this.initChromePlugin();
    this.enableDevtool = options.devtool || true;

    const htmlCanvasContainer = document.getElementById(options.rootId);
    if (!htmlCanvasContainer)
      throw new Error(
        "Root element not available yet. Make sure document root element is rendered"
      );

    const canvasElem = document.createElement("canvas");
    canvasElem.setAttribute("id", "app-canvas");

    const applicationOptions = {
      view: canvasElem as HTMLCanvasElement,
      width: htmlCanvasContainer.offsetWidth,
      height: htmlCanvasContainer.offsetHeight,
      antialias: options.antialias || false,
      autoDensity: options.autoDensity || true,
      backgroundColor: PIXI.utils.string2hex(options.backgroundColor || "#000"),
      backgroundAlpha: options.backgroundColor ? undefined : 0,
      resolution: window.devicePixelRatio,
    };

    // Initiating GSAP animation (Green sock)
    // gsapAnimation().init();

    console.log("PIXI: Application options ", applicationOptions);
    this.application = new PIXI.Application(applicationOptions);
    htmlCanvasContainer.appendChild(this.application.view);
  }
}
