import { Image } from "react-konva";
import useImage from "use-image";

interface IIconProps {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Icon = (props: IIconProps) => {
  const [image] = useImage(props.src);

  return (
    <Image
      offsetX={props.width * 0.5}
      offsetY={props.height * 0.5}
      x={props.x}
      y={props.y}
      image={image}
      width={props.width}
      height={props.height}
    />
  );
};
