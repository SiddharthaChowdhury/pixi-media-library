import { Circle, Group } from "react-konva";
import { useSelector } from "react-redux";
import { selectNavigationFocusedItem } from "../../../../redux/selectors/selectNavigation";
import { Icon } from "../../../../assets/Icon";
import { TypeSvgName } from "../../../../assets/svg";
import React from "react";

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
  x: number;
  y: number;
  svgIconName?: TypeSvgName;
}

const systemDefaultStyle: IBasicStyle = {
  stroke: {
    color: "#FAFAFA",
    width: 1,
  },
  bg: {
    fillColor: "#C0C0C0",
    opacity: 0.5,
  },
};

const systemFocusedStyle: IBasicStyle = {
  stroke: {
    color: "#FFFFFF",
    width: 1,
  },
  bg: {
    fillColor: "#FFFFFF",
    opacity: 1,
  },
};

const CircleBtn = ({
  radius,
  defaultStyle,
  focusStyle,
  x,
  y,
  id,
  svgIconName,
}: ICircleButtonProps) => {
  const focusedItemName = useSelector(
    selectNavigationFocusedItem,
    (valA, valB) => {
      return valB !== id && valA !== id;
    }
  );
  const isFocused = focusedItemName === id;
  const style = isFocused
    ? focusStyle || systemFocusedStyle
    : defaultStyle || systemDefaultStyle;

  const WIDTH = radius * 2;
  const HEIGHT = WIDTH;

  return (
    <Group x={x} y={y} width={WIDTH} height={HEIGHT}>
      <Circle
        id={id}
        radius={radius}
        x={0}
        y={0}
        fill={style?.bg?.fillColor || "#C0C0C0"}
        stroke={style?.stroke.color || "#C0C0C0"}
        strokeWidth={style?.stroke.width || 1}
        // opacity={style?.bg?.opacity}
        // shadowBlur={isFocused ? 10 : 0}
        shadowForStrokeEnabled={false} // performance optimisation
        hitStrokeWidth={0} // performance optimisation
      />
      {svgIconName && (
        <Icon
          width={20}
          height={20}
          svgName={svgIconName}
          x={0}
          y={0}
          color={"#000000"}
        />
      )}
    </Group>
  );
};
const CircleButton = React.memo(CircleBtn);
export default CircleButton;
