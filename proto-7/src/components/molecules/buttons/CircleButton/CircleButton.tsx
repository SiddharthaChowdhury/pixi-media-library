import { Circle, Group } from "react-konva";
import { useSelector } from "react-redux";
import { selectNavigationFocusedItem } from "../../../../redux/selectors/selectNavigation";
import { Icon } from "../../../atoms/icon/Icon";

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
  iconSrc?: string;
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

const CircleButton = ({
  radius,
  defaultStyle,
  focusStyle,
  x,
  y,
  id,
  iconSrc,
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
        opacity={style?.bg?.opacity}
        stroke={style?.stroke.color || "#C0C0C0"}
        strokeWidth={style?.stroke.width || 1}
        // shadowBlur={isFocused ? 10 : 0}
      />
      {iconSrc && <Icon width={20} height={20} src={iconSrc} x={0} y={0} />}
    </Group>
  );
};

export default CircleButton;
