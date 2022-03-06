import * as PIXI from "pixi.js";

interface ITeaserProps {
  x: number;
  y: number;
  title: string;
  backgroundTexture: PIXI.Texture;
  fillColor?: number;
  borderWidth?: number;
  borderColor?: number;
  borderRadius?: number;
}

// const getTeaser = ({
//   x,
//   y,
//   fillColor,
//   title,
//   backgroundTexture,
//   borderWidth,
//   borderColor,
//   borderRadius = 15,
// }: ITeaserProps) => {
//   const width = teaserConst.generalTeaser.width;
//   const height = teaserConst.generalTeaser.height;

//   const getMainContainer = () => {
//     const container = new PIXI.Container();
//     const backgroundRectProps = {
//       x,
//       y,
//       width,
//       height,
//       borderWidth,
//       borderColor,
//       fillColor,
//       borderRadius: borderRadius || 15,
//     };
//     const backGroundRect = atoms.getRoundedRect(backgroundRectProps);
//     container.addChild(backGroundRect);

//     return container;
//   };

//   const getImageContainer = () => {
//     return atoms.getTeaserImg({
//       x: 0,
//       y: 0,
//       width: teaserConst.generalTeaser.image.width,
//       height: teaserConst.generalTeaser.image.height,
//       borderRadius,
//       borderWidth: 2,
//       borderColor: 0xA52A2A,
//       texture: backgroundTexture,
//     });
//   }

//   const getInfoContainer = () => {
//     const infoContainer = new PIXI.Container();
//     const titlePadding = 5;
//     const heading = atoms.getLabel({
//       text: title,
//       textStyle: {
//         fontFamily: "Arial",
//         fontSize: 16,
//         fill: "white",
//         align: "left",
//         breakWords: true,
//         wordWrap: true,
//         wordWrapWidth: width - titlePadding * 2,
//       },
//       maxLineEllipsis: 1,
//     });

//     infoContainer.addChild(heading);

//     infoContainer.x = 10;
//     infoContainer.y = teaserConst.generalTeaser.image.height;

//     return infoContainer;
//   };

//   const mainContainer = getMainContainer();
//   const imageContainer = getImageContainer();
//   const infoContainer = getInfoContainer();

//   mainContainer.addChild(imageContainer);
//   mainContainer.addChild(infoContainer);

//   return mainContainer;
// };

// export default getTeaser;
