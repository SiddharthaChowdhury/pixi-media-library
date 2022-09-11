import { rejects } from "assert";
import { useEffect, useState } from "react";
import { Image } from "react-konva";
import { svgPromise, TypeSvgName } from "./svg";

interface IIconProps {
  svgName: TypeSvgName;
  color?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Icon = (props: IIconProps) => {
  const [img, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    svgPromise(props.svgName, props.color || "#ffffff").then((base64) => {
      const image = new window.Image();
      image.src = base64;
      image.onload = () => {
        setImage(image);
      };
    });
  }, [props.color, props.svgName]);

  if (!img) return null;

  return (
    <Image
      offsetX={props.width * 0.5}
      offsetY={props.height * 0.5}
      x={props.x}
      y={props.y}
      image={img}
      width={props.width}
      height={props.height}
    />
  );
};
