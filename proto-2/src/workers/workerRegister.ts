import pixiClass from "../pixi";
import { imageToTexture } from "../pixi/pixi-utils/texture-helper";
import { IWorkerLoaderResp } from "./IWorkerLoaderResp";

export const imageWorker = new Worker(new URL("./worker", import.meta.url));

imageWorker.onmessage = (e: MessageEvent<IWorkerLoaderResp>) => {
  const { loadedSrc, name } = e.data;

  imageToTexture(loadedSrc).then((texture) => {
    const callback = pixiClass.pendingFromWorker[name];
    callback(texture);
  });
};
