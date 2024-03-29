import React from "react";
import { useEffect, useRef, useState } from "react";
import { Group, Rect, Text } from "react-konva";
import { CircleButton } from "../../../../components/molecules";
import { helperImageLoad } from "../../../../helpers/helper-image-loader";
export interface IHomepageStageData {
  ageRating: string;
  channelId: number;
  channelLogoUrl: string;
  description: string;
  episodeNumber: number;
  episodeTitle: string;
  isFavorite: boolean;
  numberOfSeasons: number;
  productionYear: number;
  seasonNumber: number;
  tvShowBackgroungImageUrl: string;
  tvShowDescription: string;
  tvShowId: string;
  tvShowTitle: string;
  videoId: string;
}
interface IStageHomepage {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  renderable: boolean;
  cornerRadius?: number;
  navIds: string[];
  stageData: IHomepageStageData;
}

const StageHomepage = ({
  x,
  y,
  width,
  height,
  cornerRadius = 20,
  stageData,
  id,
  navIds,
}: IStageHomepage) => {
  const [, setImg] = useState<string>();
  const imageref = useRef<HTMLImageElement>();

  useEffect(() => {
    if (imageref.current) return;
    helperImageLoad(stageData.tvShowBackgroungImageUrl).then((img) => {
      imageref.current = img;
      setImg("");
    });
  }, [stageData.tvShowBackgroungImageUrl]);

  return (
    <Group x={x} y={y} width={width} height={height} id={id}>
      {imageref.current && (
        <Rect
          width={width}
          height={height}
          fillPatternImage={imageref.current}
          cornerRadius={[0, 0, cornerRadius, cornerRadius]}
          // shadowBlur={10}
          shadowForStrokeEnabled={false} // performace optimization
          hitStrokeWidth={0} // performance optimisation
        />
      )}

      <Group x={40} y={135} width={600} height={365}>
        <Text
          x={0}
          y={50}
          width={600}
          // height={55}
          text={stageData.tvShowTitle}
          fill={"#ffffff"}
          fontSize={50}
          fontStyle={"bold"}
          lineHeight={1.1}
        />
        <Text
          x={0}
          y={200}
          width={600}
          height={55}
          text={stageData.description}
          fill={"#ffffff"}
          fontSize={16}
          fontStyle={"bold"}
          lineHeight={1.1}
        />
        <Group x={0} y={270}>
          {/* <Icon
            width={50}
            height={25}
            x={0}
            y={-5}
            svgName={}
            src={stageData.channelLogoUrl}
          /> */}
          <Text
            x={55}
            y={0}
            fill={"#ffffff"}
            fontSize={16}
            text={`S${stageData.seasonNumber} E${stageData.episodeNumber}: Einsatzbereit • ${stageData.numberOfSeasons} Staffel. • Ab ${stageData.ageRating}`}
          />
        </Group>
        {/* Buttons */}
        <Group x={25} y={340}>
          <CircleButton
            svgIconName={"play"}
            x={0}
            y={0}
            radius={30}
            id={navIds[0]}
          />
          <CircleButton
            svgIconName={"info"}
            x={45}
            y={0}
            radius={30}
            id={navIds[1]}
          />
          <CircleButton
            svgIconName={"bookmark"}
            x={90}
            y={0}
            radius={30}
            id={navIds[2]}
          />
        </Group>
      </Group>
    </Group>
  );
};

const StageHomepageMemoized = React.memo(
  StageHomepage,
  (prevProps, nextProps) => {
    return prevProps.renderable === nextProps.renderable;
  }
);
export default StageHomepageMemoized;
