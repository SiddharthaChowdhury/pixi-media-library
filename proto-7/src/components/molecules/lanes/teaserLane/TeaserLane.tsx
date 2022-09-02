import { useRef } from "react";
import { Group } from "react-konva";
import utilNavigation from "../../../../navigation/utilNavigation";
import { FormatTeaser } from "../../teasers/formatTeaser/FormatTeaser";
import teaserStructure from "../../teasers/teaserStructure";
import { ITeaserMeta } from "../../teasers/types";

interface ITeaserlane {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
  teaserData: ITeaserMeta[];
  spaceBetween?: number;
  //   teaserType: ETeaserType
}

interface IChildRecord extends ITeaserMeta {
  x: number;
  y: number;
  x2: number;
}

export const Teaserlane = ({
  x,
  y,
  width,
  height,
  id,
  teaserData,
  spaceBetween = 10,
}: ITeaserlane) => {
  const childRecord = useRef<IChildRecord[]>([]);

  return (
    <Group x={x} y={y} width={width} height={height} id={id}>
      {teaserData.map((teaserData, index) => {
        const lastTeaserChild =
          childRecord.current[childRecord.current.length - 1];

        const pos = { x: 0, y: 0 };
        if (lastTeaserChild) {
          pos.x = lastTeaserChild.x2 + spaceBetween;
        }

        childRecord.current.push({
          ...teaserData,
          ...pos,
          x2: pos.x + teaserStructure.formatTeaser.boxDiam.width,
        });

        return (
          <FormatTeaser
            key={index}
            x={pos.x}
            y={pos.y}
            id={utilNavigation.generateItemIdFromLaneId(id, index)}
            imageUrl={teaserData.imageUrl}
          />
        );
      })}
    </Group>
  );
};
