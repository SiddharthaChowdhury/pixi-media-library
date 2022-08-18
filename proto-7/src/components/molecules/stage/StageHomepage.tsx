import { useEffect, useRef, useState } from "react";
import { Rect } from "react-konva";
import { helperImageLoad } from "../../helpers/helper-image-loader";

interface IStageHomepage {
  x: number;
  y: number;
  width: number;
  height: number;
  cornerRadius?: number;
  imageUrl: string;
}

const StageHomepage = ({
  x,
  y,
  width,
  height,
  cornerRadius = 20,
  imageUrl,
}: IStageHomepage) => {
  const [, setImg] = useState<string>();
  const imageref = useRef<HTMLImageElement>();

  useEffect(() => {
    if (imageref.current) return;
    helperImageLoad(imageUrl).then((img) => {
      imageref.current = img;
      setImg("");
    });
  }, [imageUrl]);

  if (!imageref.current) return null;

  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      shadowBlur={10}
      fillPatternImage={imageref.current}
      cornerRadius={[0, 0, cornerRadius, cornerRadius]}
    />
  );
};

export default StageHomepage;
