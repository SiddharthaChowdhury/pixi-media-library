import * as PIXI from "pixi.js";
import { Texture } from "pixi.js";
import { ROOT_ID } from "..";
import appConfig from "../app-config/appConfig";
interface IPendingFromWorker {
  [itemName: string]: (texture: Texture) => void;
}
class PixiClass {
  private canvasElem: HTMLCanvasElement;
  public application: PIXI.Application;
  public loader: PIXI.Loader = PIXI.Loader.shared;
  public pendingFromWorker: IPendingFromWorker = {};

  constructor() {
    if (process.env.NODE_ENV !== "production") {
      // @ts-ignore
      window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
        // @ts-ignore
        window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
    }

    this.canvasElem = document.createElement("canvas");
    this.canvasElem.setAttribute("id", "app-canvas");

    this.application = new PIXI.Application({
      view: this.canvasElem as HTMLCanvasElement,
      width: appConfig.viewport.width || window.innerWidth,
      height: appConfig.viewport.height || window.innerHeight,
      antialias: appConfig.viewport.antialias || true,
      autoDensity: appConfig.viewport.autoDensity || true,
      backgroundColor: appConfig.theme.backgroundColor,
    });

    console.log("TESTT PIXI app created");
  }

  public initPixi = () => {
    const root = document.getElementById(ROOT_ID);
    if (!root)
      throw new Error(
        "Root element not available yet. Make sure document root element is rendered"
      );

    root.appendChild(this.canvasElem);
  };

  public clearPendingWorkerCallbacks = (doneCallbackName: string) => {
    delete this.pendingFromWorker[doneCallbackName];
  };
}

const pixiClass = new PixiClass();
export default pixiClass;
