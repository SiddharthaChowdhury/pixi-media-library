import { imageToTexture } from "../pixi/pixi-utils/imageToTexture";

onmessage = async (e) => {
  const { src } = e.data;

  const texture = imageToTexture(src);

  postMessage({
    src,
    texture,
  });
};
