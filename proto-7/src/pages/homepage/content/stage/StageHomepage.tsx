import { useEffect, useRef, useState } from "react";
import { Group, Rect } from "react-konva";
import { CircleButton } from "../../../../components/molecules";
import { helperImageLoad } from "../../../../helpers/helper-image-loader";
import Navigable from "../../../../navigation/Navigable";
import utilNavigation from "../../../../navigation/utilNavigation";
import { navHomepageObj } from "../../Homepage";

interface IStageHomepage {
  id: string;
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
  id,
}: IStageHomepage) => {
  const [, setImg] = useState<string>();
  const imageref = useRef<HTMLImageElement>();
  const btn1ID = utilNavigation.generateItemIdFromLaneId(id, 0);
  const btn2ID = utilNavigation.generateItemIdFromLaneId(id, 1);

  useEffect(() => {
    if (imageref.current) return;
    helperImageLoad(imageUrl).then((img) => {
      imageref.current = img;
      setImg("");
    });
  }, [imageUrl]);

  return (
    <Group x={x} y={y} width={width} height={height} id={id}>
      {imageref.current && (
        <Rect
          width={width}
          height={height}
          // shadowBlur={10}
          fillPatternImage={imageref.current}
          cornerRadius={[0, 0, cornerRadius, cornerRadius]}
        />
      )}

      <Navigable itemId={btn1ID} navObj={navHomepageObj}>
        <CircleButton x={75} y={450} radius={30} id={btn1ID} />
      </Navigable>

      <Navigable navObj={navHomepageObj} itemId={btn2ID}>
        <CircleButton x={175} y={450} radius={30} id={btn2ID} />
      </Navigable>
    </Group>
  );
};

export default StageHomepage;
