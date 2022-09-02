import { useEffect, useRef } from "react";
import { Group } from "react-konva";
import { Teaserlane } from "../../../components/molecules/lanes/teaserLane/TeaserLane";
import { boxDiam } from "../../../config/dimension";
import utilNavigation from "../../../navigation/utilNavigation";
import { data__dummy } from "../../../__dummy-data/homePageData_mock";
import { HOME_LAYER_ID } from "../Homepage";
import StageHomepage from "./stage/StageHomepage";

interface IContentProps {
  layerId: number;
}

interface IContentItemLayoutInfo {
  x: number;
  y: number;
  height: number;
  marginBottom: number;
}
const CONTENT_ID = [0, 0];

const Content = ({ layerId }: IContentProps) => {
  const layoutrRef = useRef<IContentItemLayoutInfo[]>([]);

  const generateContent = () => {
    let laneIndex = -1;

    return data__dummy.items.map((row, key) => {
      const lastChild = layoutrRef.current[layoutrRef.current.length - 1];
      let nextY = 0;

      if (lastChild) {
        nextY = lastChild.y + lastChild.height + lastChild.marginBottom;
      }

      switch (row.type) {
        case "lane_format":
        case "lane_favorites":
          laneIndex += 1;
          const laneLayoutInfo: IContentItemLayoutInfo = {
            x: 80,
            y: nextY,
            height: boxDiam.formatTeaserLane.height,
            marginBottom: 50,
          };

          layoutrRef.current.push(laneLayoutInfo);
          return (
            <Teaserlane
              id={utilNavigation.generateLaneId(layerId, CONTENT_ID, laneIndex)}
              x={laneLayoutInfo.x}
              y={laneLayoutInfo.y}
              width={boxDiam.formatTeaserLane.width}
              height={boxDiam.formatTeaserLane.height}
              teaserData={(row.data as any[]).map((item) => ({
                id: item.id,
                imageUrl: item.backgroundImageUrl,
              }))}
              key={key}
            />
          );

        case "stage":
          laneIndex += 1;
          const stageLayoutInfo: IContentItemLayoutInfo = {
            x: 80,
            y: nextY,
            height: boxDiam.homepage.stage.height,
            marginBottom: 50,
          };

          layoutrRef.current.push(stageLayoutInfo);

          return (
            <StageHomepage
              id={utilNavigation.generateLaneId(layerId, CONTENT_ID, laneIndex)}
              x={stageLayoutInfo.x}
              y={stageLayoutInfo.y}
              height={boxDiam.homepage.stage.height}
              width={boxDiam.homepage.stage.width}
              cornerRadius={boxDiam.homepage.stage.borderRadius}
              // @ts-ignore
              imageUrl={row.data?.tvShowBackgroungImageUrl}
              key={key}
            />
          );

        default:
          return <></>;
      }
    });
  };
  useEffect(() => {}, []);
  console.log(">>>>> RERENDER COntent");
  return (
    <Group id={utilNavigation.generateVsId(HOME_LAYER_ID, CONTENT_ID)}>
      {generateContent()}
    </Group>
  );
};

export default Content;
