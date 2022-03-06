import * as PIXI from "pixi.js";

interface ITeaserImgProps {
  width: number;
  height: number;
  x: number;
  y: number;
  borderRadius: number;
  borderColor?: number;
  borderWidth?: number;
  texture: PIXI.Texture;
}

export const getTeaserImg = (options: ITeaserImgProps) => {
  const {
    width,
    height,
    x,
    y,
    borderRadius,
    borderColor,
    borderWidth = 0,
    texture,
  } = options;
  const curve = borderRadius;
  const g = new PIXI.Graphics();
  const graphicsX = 0;
  const graphicsY = 0;

  const topWidth = width - curve;
  if (borderWidth && borderColor) {
    g.lineStyle(borderWidth, borderColor);
  }
  g.beginFill();

  g.moveTo(graphicsX + curve, graphicsY);
  g.lineTo(graphicsX + topWidth, graphicsY);
  g.arcTo(
    graphicsX + topWidth + curve,
    graphicsY,
    graphicsX + topWidth + curve,
    graphicsY + curve,
    curve
  );
  g.lineTo(graphicsX + topWidth + curve, graphicsY + height - curve);
  g.lineTo(graphicsX, graphicsY + height - curve);
  g.lineTo(graphicsX, graphicsY + curve);
  g.arcTo(graphicsX, graphicsY, graphicsX + curve, graphicsY, curve);

  g.endFill();

  const sprite = new PIXI.Sprite(texture);
  sprite.position.x = graphicsX;
  sprite.position.y = graphicsY;

  // setSpriteSizeCover(sprite, width, height);

  const container = new PIXI.Container();
  container.position.x = x;
  container.position.y = y;
  container.width = width;
  container.height = height;
  container.addChild(sprite);

  container.mask = g;
  container.addChild(g);

  return container;
};
