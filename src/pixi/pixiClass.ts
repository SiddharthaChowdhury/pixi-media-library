import * as PIXI from "pixi.js";
import { Loader, LoaderResource } from "pixi.js";
import { ROOT_DOCUMENT_ID } from "..";
import appConfig from "../config/appConfig";

class PixiClass {
    private canvasID = "app-canvas";
    public pixiApp: PIXI.Application | null = null;
    public pixiLoader: PIXI.Loader = PIXI.Loader.shared;
    public pixiLoaderPool = {
        teaserLoader: new Loader(),
        stageLoader: new Loader()
    }
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

    public loadAsset = (data: {uniqName: string, src: string}[], loader?: Loader) => {
        const targetLoader = loader || this.pixiLoader;
        
        return new Promise((resolve: (loader: Loader) => void, reject: any) => {
            targetLoader.onComplete.add(
                (_, resource) => {
                    console.log("LOADER COMPLETE: (all assets loaded)", resource);
                    resolve(targetLoader);
                }
            );

            targetLoader.onError.add(() => {
                console.log("Asset ERRORED:");
                reject();
            });

            data.forEach(({ uniqName, src }) => {
                if(!targetLoader){
                    console.log('failed to iterate load assets')
                    return;
                } 
                targetLoader.add(uniqName, src, {
                    loadType: LoaderResource.LOAD_TYPE.IMAGE,
                    xhrType: LoaderResource.XHR_RESPONSE_TYPE.BLOB
                });
            });

            targetLoader.load();
        });
    };
}

const pixiClass = new PixiClass();
export default pixiClass;