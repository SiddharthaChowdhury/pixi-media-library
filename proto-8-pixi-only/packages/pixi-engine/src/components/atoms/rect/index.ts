import * as PIXI from "pixi.js-legacy";
import { IRectProps, IRectGraphics } from "./types";

const getRect = (options: IRectProps) => {
  const getRoundedRect = (): IRectGraphics => {
    const { x, y, name, width, height, borderRadius, borderRadiusSide } =
      options;
    const rect = new PIXI.Graphics() as IRectGraphics;

    rect.clear();
    rect.beginFill(options.fillColor || 0x000000); // black color: ;

    if (options.borderWidth && options.borderColor)
      rect.lineStyle(options.borderWidth, options.borderColor);

    if (
      borderRadius &&
      (!borderRadiusSide ||
        (borderRadiusSide && borderRadiusSide === "all-default"))
    ) {
      rect.drawRoundedRect(x, y, width, height, borderRadius);
    } else {
      rect.drawRect(x, y, width, height);
    }

    // has no impact on shape just information for later use
    rect.borderRadius = borderRadius;
    rect.borderRadiusSide = borderRadiusSide;

    rect.endFill();
    if (name) rect.name = name;

    if (options.name) rect.name = options.name;

    return rect;
  };

  const getRoundedHalfRectBottom = (): IRectGraphics => {
    const {
      width,
      height,
      x,
      y,
      borderRadius,
      borderColor,
      borderWidth = 0,
      name,
    } = options;

    const curve = borderRadius!;
    const g = new PIXI.Graphics() as IRectGraphics;

    // has no impact on shape just information for later use
    g.borderRadius = borderRadius;

    if (name) g.name = name;

    if (borderWidth && borderColor) {
      g.lineStyle(borderWidth, borderColor);
    }

    g.beginFill(options.fillColor, options.fillColor ? 1 : 0);

    g.lineTo(width, 0); //[top-line] to direction [x-changeToWidth, y-noChange]
    g.lineTo(width, height - curve); //[right-line] to direction [x-noChange, y-changeToHeight]
    g.arcTo(width, height, width - curve, height, curve);
    g.lineTo(curve, height);
    g.arcTo(0, height, 0, height - curve, curve);
    g.lineTo(0, 0);
    g.closePath();

    g.endFill();
    g.x = x;
    g.y = y;

    return g;
  };

  const getRoundedHalfRectTop = (): IRectGraphics => {
    const {
      width,
      height,
      x,
      y,
      borderRadius,
      borderColor,
      borderWidth = 0,
      name,
    } = options;

    const curve = borderRadius!;
    const g = new PIXI.Graphics() as IRectGraphics;

    // has no impact on shape just information for later use
    g.borderRadius = borderRadius;

    if (name) g.name = name;

    if (borderWidth && borderColor) {
      g.lineStyle(borderWidth, borderColor);
    }

    g.beginFill(options.fillColor, options.fillColor ? 1 : 0);

    g.moveTo(curve, 0);
    g.lineTo(width - curve, 0);
    g.arcTo(width, 0, width, curve, curve);
    g.lineTo(width, height);
    g.lineTo(0, height);
    g.lineTo(0, curve);
    g.arcTo(0, 0, curve, 0, curve);

    g.closePath();

    g.endFill();
    g.x = x;
    g.y = y;

    return g;
  };

  if (options.borderRadius) {
    if (options.borderRadiusSide === "only-top") return getRoundedHalfRectTop();
    else if (options.borderRadiusSide === "only-bottom") {
      return getRoundedHalfRectBottom();
    }
  }

  return getRoundedRect();
};

export default getRect;
