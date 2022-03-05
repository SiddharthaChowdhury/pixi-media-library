import * as PIXI from "pixi.js";
import { ROOT_DOCUMENT_ID } from "..";
import appConfig from "../config/appConfig";

class PixiClass {
    private canvasID = "app-canvas";
    public pixiApp: PIXI.Application | null = null;
    public pixiLoader: PIXI.Loader | null = null;
    public isPixiReady: boolean = false;

    constructor() {
        // @ts-ignore
        window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
        // @ts-ignore
        window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
    }

    private createCanvas = (): HTMLCanvasElement => {
        const root = document.getElementById(ROOT_DOCUMENT_ID);
        const canvas = document.createElement("canvas");
        canvas.setAttribute("id", this.canvasID);

        root!.appendChild(canvas);

        return canvas;
    }

    public initPixiCanvas = () => {
        if(document.getElementById(this.canvasID)) {
            return;
        }

        const canvasElem = this.createCanvas();

        this.pixiApp = new PIXI.Application({
            view: canvasElem as HTMLCanvasElement,
            width: appConfig.viewport.width || window.innerWidth,
            height: appConfig.viewport.height || window.innerHeight,
            antialias: appConfig.viewport.antialias || true,
            autoDensity: appConfig.viewport.autoDensity || true,
            backgroundColor: appConfig.theme.backgroundColor
        });

        this.pixiLoader = PIXI.Loader.shared;

        this.pixiLoader.onStart.add(() => {
            console.log("LOADER START: ");
        });
        
        this.pixiLoader.onProgress.add((loader, resource) => {
            console.log("PROGRESS : " + loader.progress + "% ", resource);
        });

        this.pixiLoader.onLoad.add((_, resource) => {
            console.log("Asset LOAD: ", resource);
        });

        this.isPixiReady = true;
    }

    public loadAsset = (data: {uniqName: string, src: string}[]) => {
        const self = this;
        
        return new Promise((resolve: any, reject: any) => {
            if(!self.pixiLoader) {
                reject('Loader not ready yet!');

                return;
            }

            self.pixiLoader.onComplete.add(
                (_, resource) => {
                console.log("LOADER COMPLETE: (all assets loaded)", resource);
                resolve();
                // renderInCanvas(loader.resources[ASSET_NAME_LOGO].texture!)
                }
            );

            self.pixiLoader.onError.add(() => {
                console.log("Asset ERRORED:");
                // reject();
            });

            data.forEach(({ uniqName, src }) => {
                if(!self.pixiLoader){
                    console.log('failed to iterate load assets')
                    return;
                } 
                self.pixiLoader.add(uniqName, src);
            });

            self.pixiLoader.load();
        });
    };
}

const pixiClass = new PixiClass();
export default pixiClass;