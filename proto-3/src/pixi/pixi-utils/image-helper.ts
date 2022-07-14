import * as PIXI from "pixi.js";
import { Graphics } from "pixi.js";

const imageHelper = (inputSprite: PIXI.Sprite) => {
  return {
    cover: (size: { width: number; height: number }, maskGraphic: Graphics) => {
      const { width, height } = size;
      var imageRatio = inputSprite.width / inputSprite.height;
      var containerRatio = width / height;

      if (containerRatio > imageRatio) {
        inputSprite.height = inputSprite.height / (inputSprite.width / width);
        inputSprite.width = width;
        inputSprite.position.x = 0;
        inputSprite.position.y = (height - inputSprite.height) / 2;
      } else {
        inputSprite.width = inputSprite.width / (inputSprite.height / height);
        inputSprite.height = height;
        inputSprite.position.y = 0;
        inputSprite.position.x = (width - inputSprite.width) / 2;
      }

      inputSprite.mask = maskGraphic;
    },
  };
};

export default imageHelper;
