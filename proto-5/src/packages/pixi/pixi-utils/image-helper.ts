import * as PIXI from "pixi.js-legacy";
import { loadingSpinner } from "../components/atoms";

const imageHelper = (inputSprite: PIXI.Sprite) => {
  const cover = (
    size: { width: number; height: number },
    maskGraphic: PIXI.Graphics
  ) => {
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
  };

  const maskOnly = (maskGraphic: PIXI.Graphics) => {
    inputSprite.mask = maskGraphic;
  };

  return {
    cover,
    maskOnly,
  };
};

export const getImageBg = (
  maskGraphic: PIXI.Graphics,
  imageUrl: string,
  preloader: any,
  id: string,
  showLoading?: boolean
): PIXI.Container => {
  const imageContainer = new PIXI.Container();
  imageContainer.width = maskGraphic.width;
  imageContainer.height = maskGraphic.height;
  imageContainer.name = `${maskGraphic.name}_CONT`;

  const { showSpinner, stopSpinner, putInsideContainer } = loadingSpinner(30); // 30px redius
  putInsideContainer(imageContainer, {
    x: maskGraphic.width / 2,
    y: maskGraphic.height / 2,
  });
  if (showLoading) showSpinner();

  preloader.add(
    { name: id, url: imageUrl },
    (resource: PIXI.LoaderResource) => {
      const loadedSprite = PIXI.Sprite.from(resource.url);

      imageHelper(loadedSprite).maskOnly(maskGraphic);

      if (showLoading) stopSpinner();

      imageContainer.removeChildren();
      imageContainer.addChild(maskGraphic, loadedSprite);
    }
  );

  return imageContainer;
};

export default imageHelper;
