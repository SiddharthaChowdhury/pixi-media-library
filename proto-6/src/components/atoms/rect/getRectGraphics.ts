import * as PIXI from "pixi.js-legacy";
import { IRectProps } from "./types";

const getRect = (options: IRectProps) => {
  const getRoundedRect = (): PIXI.Graphics => {
    const {
      x,
      y,
      name,
      width,
      height,
      borderRadius,
      borderRadiusSide,
      fillColor,
    } = options;
    const rect = new PIXI.Graphics() as PIXI.Graphics;

    rect.clear();
    rect.beginFill(PIXI.utils.string2hex(fillColor || "#ffffff")); // black color: ;

    if (options.borderWidth && options.borderColor)
      rect.lineStyle(
        options.borderWidth,
        PIXI.utils.string2hex(options.borderColor)
      );

    if (
      borderRadius &&
      (!borderRadiusSide ||
        (borderRadiusSide && borderRadiusSide === "all-default"))
    ) {
      rect.drawRoundedRect(x, y, width, height, borderRadius);
    } else {
      rect.drawRect(x, y, width, height);
    }

    rect.endFill();
    if (name) rect.name = name;

    if (options.name) rect.name = options.name;

    return rect;
  };

  const getRoundedHalfRectBottom = (): PIXI.Graphics => {
    const {
      width,
      height,
      x,
      y,
      borderRadius,
      borderColor,
      borderWidth = 0,
      name,
      fillColor,
    } = options;

    const curve = borderRadius!;
    const g = new PIXI.Graphics() as PIXI.Graphics;

    if (name) g.name = name;

    if (borderWidth && borderColor) {
      g.lineStyle(borderWidth, PIXI.utils.string2hex(borderColor));
    }

    g.beginFill(
      PIXI.utils.string2hex(fillColor || "#ffffff"),
      options.fillColor ? 1 : 0
    );

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

  const getRoundedHalfRectTop = (): PIXI.Graphics => {
    const {
      width,
      height,
      x,
      y,
      borderRadius,
      borderColor,
      borderWidth = 0,
      name,
      fillColor,
    } = options;

    const curve = borderRadius!;
    const g = new PIXI.Graphics() as PIXI.Graphics;

    if (name) g.name = name;

    if (borderWidth && borderColor) {
      g.lineStyle(borderWidth, PIXI.utils.string2hex(borderColor));
    }

    g.beginFill(
      PIXI.utils.string2hex(fillColor || "#ffffff"),
      options.fillColor ? 1 : 0
    );

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
