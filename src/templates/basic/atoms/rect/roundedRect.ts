import * as PIXI from "pixi.js";

interface IRectRoundedCornerProps {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
  borderColor?: number;
  borderWidth?: number;
  fillColor?: number;
  name?: string;
}

export const getRoundedRect = (options: IRectRoundedCornerProps) => {
  const { x, y, width, height, borderRadius } = options;
  const rect = new PIXI.Graphics();
  if (options.fillColor) rect.beginFill(options.fillColor); // black color: ;
  if (options.borderWidth && options.borderColor)
    rect.lineStyle(options.borderWidth, options.borderColor);
  rect.drawRoundedRect(x, y, width, height, borderRadius);
  rect.endFill();
  if(options.name) rect.name = `${options.name}_GR`

  return rect;
};
