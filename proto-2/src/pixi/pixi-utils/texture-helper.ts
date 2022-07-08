import { BaseTexture, Texture } from "pixi.js";

export const imageToTexture = async (src: string): Promise<Texture> => {
  // return new Promise((resolve, reject) => {
  //   let img = new Image();
  //   img.onload = () => {
  //     const base = new BaseTexture(img);
  //     resolve(new Texture(base));
  //   };
  //   img.onerror = reject;
  //   img.src = src;
  // });
  const base = new BaseTexture(src);
  return new Texture(base);
};
