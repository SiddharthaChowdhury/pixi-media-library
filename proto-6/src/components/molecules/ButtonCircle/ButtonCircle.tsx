import { Container, Sprite } from "@inlet/react-pixi/legacy";
import { Circle } from "../../atoms";
import GreyPlay from "../../../assets/icn_play-grey.png";
import WhitePlay from "../../../assets/icn_play-white.png";
import { isFocusable } from "@testing-library/user-event/dist/utils";

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
    <Container x={props.x || 0} y={props.y || 0} name={props.name}>
      <Container visible={!props.isFocused}>
        <Circle
          radius={props.radius}
          border={props.border}
          background={props.background}
          x={0}
          y={0}
        />
        <Sprite
          image={GreyPlay}
          width={props.radius}
          height={props.radius}
          x={0}
          y={0}
          anchor={0.5}
        />
      </Container>
      <Container visible={props.isFocused}>
        <Circle
          radius={props.radius}
          border={props.border}
          background={props.background}
          x={0}
          y={0}
        />
        <Sprite
          image={WhitePlay}
          width={props.radius}
          height={props.radius}
          x={0}
          y={0}
          anchor={0.5}
        />
      </Container>
    </Container>
  );
};

export default ButtonCircle;
