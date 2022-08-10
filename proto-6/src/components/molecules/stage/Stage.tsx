import { Container, Sprite } from "@inlet/react-pixi/legacy";
import { FC, useState } from "react";
import { ERectBorderRadiusType, Rect } from "../../atoms";

interface IStageProps {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  backgroundImage: string;
  fillColor?: string;
}

const Stage: FC<IStageProps> = (props) => {
  const [mask, setMask] = useState<any>(null);

  return (
    <Container x={props.x} y={props.y} name={props.name}>
      <Sprite image={props.backgroundImage} mask={mask} />
      <Rect
        x={0}
        y={0}
        width={props.width}
        height={props.height}
        borderRadius={props.borderRadius}
        borderRadiusSide={ERectBorderRadiusType.BOTTOM_CORNERS}
        borderColor={props.borderColor}
        borderWidth={props.borderWidth}
        ref={(ref) => setMask(ref)}
      />
      {props.children}
    </Container>
  );
};

export default Stage;
