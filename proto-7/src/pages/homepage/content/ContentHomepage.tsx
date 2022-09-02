import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Group } from "react-konva";
import { tweens } from "../../../animations/tweens";
import { Teaserlane } from "../../../components/molecules/lanes/teaserLane/TeaserLane";
import { boxDiam } from "../../../config/dimension";
import utilNavigation from "../../../navigation/utilNavigation";
import { data__dummy } from "../../../__dummy-data/homePageData_mock";
import { HOME_LAYER_ID, navHomepageObj } from "../Homepage";
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
  const containerRef = useRef<any>();
  const navSubscription = useRef<any>();
  const childrenMetaRef = useRef<IContentItemLayoutInfo[]>([]);
  // const activeFocus = useSelector(selectNavigation);

  // This function generated the lanes, stages and whatever needs to be shown in the page
  const generateContent = () => {
    let laneIndex = -1;

    return data__dummy.items.map((row, key) => {
      const lastChild =
        childrenMetaRef.current[childrenMetaRef.current.length - 1];
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

          childrenMetaRef.current.push(laneLayoutInfo);
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

          childrenMetaRef.current.push(stageLayoutInfo);

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

  // Returns the heigh of current Content container (which grows with more and more rows in it)
  const getContainerHeight = () => {
    const lastChildMeta =
      childrenMetaRef.current[childrenMetaRef.current.length - 1];
    if (!lastChildMeta) return 0;

    return lastChildMeta.y + lastChildMeta.height;
  };

  // Derives the suitable scroll position of the entire content as a whole.
  // The entire content is moved up or down based on focused row
  const verticalScroll = (row: number) => {
    const laneLayoutInfo = childrenMetaRef.current[row];
    let newFocusY = 0;
    const idealFocusY = 250;
    const lanePos_y = laneLayoutInfo.y;
    const containerHeight = getContainerHeight();

    if (lanePos_y - idealFocusY > 0) {
      // Position the focused lane in somewhat centre
      newFocusY = lanePos_y - idealFocusY;
    }

    // col.Y2 should remain at the bottom of the lane
    let nextY2 = containerHeight - newFocusY;
    if (nextY2 < boxDiam.window.height) {
      const paddingBottom = 50;
      const diff = boxDiam.window.height - nextY2 - paddingBottom;
      newFocusY -= diff;
    }

    // Always negative because (y can never go above 0),
    // contents in the column is always position downwards
    newFocusY = -Math.abs(newFocusY);

    // Tween animation
    tweens(containerRef.current).moveY(newFocusY, 0.35);
  };

  useEffect(() => {
    // Using the Rxjs subscription here insteasd of Redux or NavHook is because We dont want to rerender
    // the entire content tree
    navSubscription.current = navHomepageObj.activeState$.subscribe(
      (activeFocus) => {
        const { row } = activeFocus;
        console.log(">> ", activeFocus);
        verticalScroll(row);
      }
    );

    return () => {
      navSubscription.current.unsubscribe();
    };
  }, []);

  console.log(">>>>> RERENDER COntent");
  return (
    <Group
      ref={containerRef}
      id={utilNavigation.generateVsId(HOME_LAYER_ID, CONTENT_ID)}
    >
      {generateContent()}
    </Group>
  );
};

export default Content;
