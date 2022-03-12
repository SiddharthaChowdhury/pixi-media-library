import * as PIXI from "pixi.js";
import { Container, Graphics, Sprite, Texture } from "pixi.js";
import pixiClass from "../pixiClass";

// this will only when target is smaller than sprite, needs more test
export const setSpriteSizeCover = (
  sprite: PIXI.Sprite,
  targetWidth: number,
  targetHeight: number,
  isCover?: boolean,
  maskGraphic?: Graphics
) => {
  sprite.scale.set(
    Math.max(
      targetWidth / sprite.texture.width,
      targetHeight / sprite.texture.height
    )
  );

  sprite.width = targetWidth;
  sprite.height = (sprite.height / sprite.width) * targetWidth;

  let x = 1;
  if (isCover && sprite.height > targetHeight) {
    x = (sprite.height - targetHeight) / 2;
  }

  if (!maskGraphic) {
    const mask = new PIXI.Graphics();

    mask.beginFill(0x000000);
    mask.drawRoundedRect(x, 1, targetWidth, targetHeight + 10, 10);
    mask.endFill();
    sprite.mask = mask;

    return mask;
  }

  sprite.mask = maskGraphic;

  return maskGraphic;
};

// export const setSpriteSizeCover = (sprite: PIXI.Sprite, targetWidth: number, targetHeight: number) => {
// const texture = {
//     width: sprite.texture.width,
//     height: sprite.texture.height
// };
// const targetRatio = targetWidth / targetHeight;
// const textureRatio = texture.width / texture.height;
// let scale;

// if (targetRatio > textureRatio) {
//     scale = targetWidth / texture.width;
//     sprite.position.y = -((texture.height * scale) - targetHeight) / 2;
//     sprite.position.x = 0;
// } else {
//     scale = targetHeight / texture.height;
//     sprite.position.x = -((texture.width * scale) - targetWidth) / 2;
//     sprite.position.y = 0;
// }

// sprite.scale.set(scale);
// return sprite;
// }

export const containerToTextureSprite = (
  container: Container
): {
  texture: Texture;
  sprite: Sprite;
} | null => {
  if (!pixiClass.pixiApp) return null;
  const texture = pixiClass.pixiApp.renderer.generateTexture(container);
  const sprite = new Sprite(texture);

  return {
    texture,
    sprite,
  };
};
