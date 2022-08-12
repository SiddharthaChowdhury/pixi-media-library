import { Graphics } from "@inlet/react-pixi/legacy";
import { forwardRef, useCallback } from "react";
import * as PIXI from "pixi.js-legacy";

interface ICircleProps {
  x: number;
  y: number;
  name?: string;
  radius: number;
  border: {
    width: number;
    color: string;
    alpha?: number;
  };
  background?: {
    color: string;
    alpha?: number;
  };
}

const Circle = forwardRef((props: ICircleProps, ref: any) => {
  const draw = useCallback(
    (g) => {
      const { border, background } = props;

      background &&
        g.beginFill(
          PIXI.utils.string2hex(background.color),
          background.alpha || 1
        );

      g.lineStyle(
        border.width,
        PIXI.utils.string2hex(border.color),
        border.alpha || 1
      ); //(thickness, color)
      g.drawCircle(0, 0, props.radius); //(x,y,radius)
      g.endFill();
    },
    [props]
  );

  return <Graphics ref={ref} draw={draw} x={props.x} y={props.y} />;
});

export default Circle;
