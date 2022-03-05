import * as PIXI from 'pixi.js';

export const setSpriteSizeCover = (sprite: PIXI.Sprite, targetWidth: number, targetHeight: number) => {
    sprite.scale.set(Math.max(targetWidth / sprite.texture.width, targetHeight / sprite.texture.height));
    sprite.width = targetWidth;
    sprite.height = (sprite.height / sprite.width) * targetWidth;

    const mask = new PIXI.Graphics();

    mask.beginFill(0x000000);
    mask.drawRoundedRect(1, 1, targetWidth, targetHeight + 10, 10)
    mask.endFill();
    sprite.mask = mask

    return mask;

}

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