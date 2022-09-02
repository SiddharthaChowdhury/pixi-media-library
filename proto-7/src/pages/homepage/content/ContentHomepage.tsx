import { useEffect } from "react";
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

const CONTENT_ID = [0, 0];

const Content = ({ layerId }: IContentProps) => {
  // const generateContent = () => {
  //   return data__dummy.items.filter(() => {})
  // };
  useEffect(() => {}, []);
  console.log(">>>>> RERENDER COntent");
  return (
    <Group id={utilNavigation.generateVsId(HOME_LAYER_ID, CONTENT_ID)}>
      <StageHomepage
        id={utilNavigation.generateLaneId(layerId, CONTENT_ID, 0)}
        x={80}
        y={0}
        height={boxDiam.homepage.stage.height}
        width={boxDiam.homepage.stage.width}
        cornerRadius={boxDiam.homepage.stage.borderRadius}
        // @ts-ignore
        imageUrl={data__dummy.items[0].data?.tvShowBackgroungImageUrl}
      />

      <Teaserlane
        id={utilNavigation.generateLaneId(layerId, CONTENT_ID, 1)}
        x={80}
        y={boxDiam.homepage.stage.height + 50}
        width={boxDiam.formatTeaserLane.width}
        height={boxDiam.formatTeaserLane.height}
        teaserData={(data__dummy.items[1].data as any[])
          .slice(0, 3)
          .map((item) => ({
            id: item.id,
            imageUrl: item.backgroundImageUrl,
          }))}
      />
    </Group>
  );
};

export default Content;
