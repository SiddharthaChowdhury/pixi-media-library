import { useEffect } from "react";
import { Circle } from "react-konva";

interface IBasicStyle {
  stroke: {
    color: string;
    width?: number;
  };
  bg?: {
    fillColor?: string;
    opacity?: number;
  };
}

interface ICircleButtonProps {
  id?: string;
  radius: number;
  defaultStyle?: IBasicStyle;
  focusStyle?: IBasicStyle;
  isFocused?: boolean;
  x: number;
  y: number;
}

const systemDefaultStyle: IBasicStyle = {
  stroke: {
    color: "#COCOCO",
    width: 1,
  },
  bg: {
    fillColor: "#000000",
    opacity: 0.5,
  },
};

const systemFocusedStyle: IBasicStyle = {
  stroke: {
    color: "#FFFFFF",
    width: 1,
  },
  bg: {
    fillColor: "#000000",
    opacity: 1,
  },
};

const CircleButton = ({
  radius,
  defaultStyle,
  focusStyle,
  isFocused,
  x,
  y,
  id,
}: ICircleButtonProps) => {
  const style = isFocused
    ? focusStyle || systemFocusedStyle
    : defaultStyle || systemDefaultStyle;
  return (
    <Circle
      id={id}
      radius={radius}
      x={x}
      y={y}
      fill={style?.bg?.fillColor || "#000000"}
      opacity={style?.bg?.opacity}
      stroke={style?.stroke.color || "#C0C0C0"}
      strokeWidth={style?.stroke.width || 1}
      // shadowBlur={isFocused ? 10 : 0}
    ></Circle>
  );
};

export default CircleButton;
