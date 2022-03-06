import * as PIXI from "pixi.js";
import { IRectProps } from "./rect";

export const getRoundedRect = (options: IRectProps) => {
  const { x, y, width, height, borderRadius, borderRadiusSide } = options;
  const rect = new PIXI.Graphics();
  
  if (options.fillColor) rect.beginFill(options.fillColor); // black color: ;
  
  if (options.borderWidth && options.borderColor)
    rect.lineStyle(options.borderWidth, options.borderColor);
  
  if(borderRadius && (!borderRadiusSide || (borderRadiusSide && borderRadiusSide === 'all-default'))) {
    rect.drawRoundedRect(x, y, width, height, borderRadius);
  } else {
    rect.drawRect(x, y, width, height);
  }
  
  rect.endFill();
  
  if(options.name) rect.name = `${options.name}_GR`

  return rect;
};

export const getRoundedHalfRectBottom = (options: IRectProps) => {
  const {
    width,
    height,
    x,
    y,
    borderRadius,
    borderColor,
    borderWidth = 0,
  } = options;

  const curve = borderRadius!;
  const g = new PIXI.Graphics();

  if (borderWidth && borderColor) {
    g.lineStyle(borderWidth, borderColor);
  }

  g.beginFill(options.fillColor,  options.fillColor ? 1: 0);

  g.lineTo(width, 0); //[top-line] to direction [x-changeToWidth, y-noChange]
  g.lineTo(width, height - curve); //[right-line] to direction [x-noChange, y-changeToHeight]
  g.arcTo(width, height, width - curve, height, curve);
  g.lineTo(curve, height);
  g.arcTo(0, height, 0, height - curve, curve)
  g.lineTo(0,0);
  g.closePath();

  g.endFill();
  g.x = x;
  g.y = y;

  return g;
}

export const getRoundedHalfRectTop = (options: IRectProps) => {
  const {
    width,
    height,
    x,
    y,
    borderRadius,
    borderColor,
    borderWidth = 0,
  } = options;

  const curve = borderRadius!;
  const g = new PIXI.Graphics();

  if (borderWidth && borderColor) {
    g.lineStyle(borderWidth, borderColor);
  }

  g.beginFill(options.fillColor, options.fillColor ? 1: 0);

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
}

