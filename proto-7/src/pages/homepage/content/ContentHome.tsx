import { useCallback, useEffect, useRef, useState } from "react";
import { Group } from "react-konva";
import { tweens } from "../../../animations/tweens";
import { TeaserlaneMemoised } from "../../../components/molecules/lanes/teaserLane/TeaserLane";
import { boxDiam } from "../../../config/dimension";
import utilNavigation from "../../../navigation/utilNavigation";
import { data__dummy } from "../../../__dummy-data/homePageData_mock";
import { HOME_LAYER_ID, navHomepageObj } from "../Homepage";
import StageHomepageMemoized from "./stage/StageHomepage";

interface IContentProps {
  layerId: number;
}

interface IContentItemLayoutInfo {
  id: string;
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
  const [renderableChildren, setRenderableChildren] = useState<string[]>([]);

  const shouldRender = (id: string, y: number, y2: number) => {
    // First paint before focus occured
    if (renderableChildren.length === 0)
      return !(y > boxDiam.window.height || y2 < 0); // return FALSE, if item out of screen

    return renderableChildren.includes(id);
  };

  const getChildExisting = (id: string): IContentItemLayoutInfo | undefined => {
    return childrenMetaRef.current.find((child) => child.id === id);
  };

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
          const laneId = utilNavigation.generateLaneId(
            layerId,
            CONTENT_ID,
            laneIndex
          );

          const existingLaneRecord = getChildExisting(laneId);
          const laneLayoutInfo: IContentItemLayoutInfo = existingLaneRecord || {
            id: laneId,
            x: 80,
            y: nextY,
            height: boxDiam.formatTeaserLane.height,
            marginBottom: 50,
          };

          const laneY2 = laneLayoutInfo.y + boxDiam.formatTeaserLane.height;

          !existingLaneRecord && childrenMetaRef.current.push(laneLayoutInfo);

          return (
            <TeaserlaneMemoised
              id={laneLayoutInfo.id}
              x={laneLayoutInfo.x}
              y={laneLayoutInfo.y}
              width={boxDiam.formatTeaserLane.width}
              height={boxDiam.formatTeaserLane.height}
              teaserData={(row.data as any[]).map((item) => ({
                id: item.id,
                imageUrl: item.backgroundImageUrl,
              }))}
              key={key}
              renderable={shouldRender(
                laneLayoutInfo.id,
                laneLayoutInfo.y,
                laneY2
              )}
            />
          );

        case "stage":
          laneIndex += 1;
          const stageId = utilNavigation.generateLaneId(
            layerId,
            CONTENT_ID,
            laneIndex
          );
          const existingStageRecord = getChildExisting(stageId);
          const stageLayoutInfo: IContentItemLayoutInfo =
            existingStageRecord || {
              id: stageId,
              x: 80,
              y: nextY,
              height: boxDiam.homepage.stage.height,
              marginBottom: 50,
            };
          const stageY2 = stageLayoutInfo.y + boxDiam.formatTeaserLane.height;

          !existingStageRecord && childrenMetaRef.current.push(stageLayoutInfo);

          return (
            <StageHomepageMemoized
              id={stageLayoutInfo.id}
              x={stageLayoutInfo.x}
              y={stageLayoutInfo.y}
              height={boxDiam.homepage.stage.height}
              width={boxDiam.homepage.stage.width}
              cornerRadius={boxDiam.homepage.stage.borderRadius}
              // @ts-ignore
              imageUrl={row.data?.tvShowBackgroungImageUrl}
              key={key}
              renderable={shouldRender(
                stageLayoutInfo.id,
                stageLayoutInfo.y,
                stageY2
              )}
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
  const verticalScroll = useCallback((row: number) => {
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
      // col.y2 less than heigh of the screen; needs adjustment
      const paddingBottom = 50;
      const diff = boxDiam.window.height - nextY2 - paddingBottom;
      newFocusY -= diff;
    }

    // Always negative because (y can never go above 0),
    // contents in the column is always position downwards
    newFocusY = -Math.abs(newFocusY);

    // Tween animation
    tweens(containerRef.current).moveY(newFocusY);

    return idealFocusY;
  }, []);

  // Virtualise the lane;
  // For simplicity; taking 2 lanes above and 2 lanes below the focused row.
  // We can later enhance this by calculatng the lane's translated Y, if goes out of screen: dont-render
  const renderVisibleLanes = (focusedlaneIndex: number) => {
    const finalVisibleIds = [];

    // Two Lanes above
    const visibleFirst = childrenMetaRef.current[focusedlaneIndex - 2];
    if (visibleFirst) {
      finalVisibleIds.push(visibleFirst.id);
    }
    const visibleAbove = childrenMetaRef.current[focusedlaneIndex - 1];
    if (visibleAbove) {
      finalVisibleIds.push(visibleAbove.id);
    }

    const visibleFocusedMid = childrenMetaRef.current[focusedlaneIndex];
    if (visibleFocusedMid) {
      finalVisibleIds.push(visibleFocusedMid.id);
    }
    // To Lanes below
    const visibleBelow = childrenMetaRef.current[focusedlaneIndex + 1];
    if (visibleBelow) {
      finalVisibleIds.push(visibleBelow.id);
    }
    const visibleLast = childrenMetaRef.current[focusedlaneIndex + 2];
    if (visibleLast) {
      finalVisibleIds.push(visibleLast.id);
    }

    // Update the content
    setRenderableChildren(finalVisibleIds);
  };

  // 1. Subscribe to focus change
  // 2. Call vertalScroll
  // 3. Handle virtualisation of lanes to render
  useEffect(() => {
    // Using the Rxjs subscription here insteasd of Redux or NavHook is because We dont want to rerender
    // the entire content tree
    navSubscription.current = navHomepageObj.activeState$.subscribe(
      (activeFocus) => {
        const { row } = activeFocus;

        verticalScroll(row);
        renderVisibleLanes(row);
      }
    );

    return () => {
      navSubscription.current.unsubscribe();
    };
  }, [verticalScroll]);

  console.log(">>>> COL rerender", renderableChildren);

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
