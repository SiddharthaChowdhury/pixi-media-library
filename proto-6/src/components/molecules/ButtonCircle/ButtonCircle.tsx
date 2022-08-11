import { Circle } from "../../atoms";

interface IButtonCircleProps {
  x?: number;
  y?: number;
  name: string;
  radius: number;
  border: {
    width: number;
    color: string;
    alpha?: number;
  };
  background: {
    color: string;
    alpha?: number;
  };
  isFocused?: boolean;
}

const ButtonCircle = (props: IButtonCircleProps) => {
  return (
    <Circle
      name={props.name}
      radius={props.radius}
      border={props.border}
      background={props.background}
      x={props.x || 0}
      y={props.y || 0}
    />
  );
};

export default ButtonCircle;
