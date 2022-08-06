import * as PIXI from "pixi.js-legacy";

interface ICircleButtonProps {
  radius: number;
  border: {
    width: number;
    color: string;
  };
  bgColor?: string;
  iconUrl?: string;
}

const circleButton = ({
  radius,
  border,
  iconUrl,
  bgColor,
}: ICircleButtonProps) => {
  const circle = new PIXI.Graphics();

  bgColor && circle.beginFill(PIXI.utils.string2hex(bgColor));
  circle.lineStyle(border.width, PIXI.utils.string2hex(border.color)); //(thickness, color)
  circle.drawCircle(0, 0, radius); //(x,y,radius)
  circle.endFill();

  return circle;
};

export default circleButton;
