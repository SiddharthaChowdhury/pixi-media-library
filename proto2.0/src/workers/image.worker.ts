import { imageToTexture } from "../pixi/pixi-utils/texture-helper";

// https://www.smashingmagazine.com/2020/10/tasks-react-app-web-workers/
// https://dev.to/trezy/loading-images-with-web-workers-49ap
onmessage = async (e) => {
  const { src } = e.data;

  const texture = imageToTexture(src);

  postMessage({
    src,
    texture,
  });
};
