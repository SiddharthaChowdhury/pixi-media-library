import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Group } from "react-konva";
import { tweens } from "../../../animations/tweens";
import { TeaserlaneMemoised } from "../../../components/molecules/lanes/teaserLane/TeaserLane";
import { boxDiam } from "../../../config/dimension";
import { INavigationRow } from "../../../navigation/types";
import utilNavigation from "../../../navigation/utilNavigation";
import { data__dummy } from "../../../__dummy-data/homePageData_mock";
import { HOME_LAYER_ID, navHomepageObj } from "../Homepage";
import StageHomepageMemoized, {
  IHomepageStageData,
} from "./stage/StageHomepage";

interface IContentProps {
  layerId: number;
}

interface IContentItemLayoutInfo {
  id: string;
  x: number;
  y: number;
  height: number;
  marginBottom: number;
  renderedChildren: string[]; // This keeps track of item ids that was last rendered in this particular lane. Useful for virtualisation
}
const CONTENT_ID = [0, 0];

const Content = ({ layerId }: IContentProps) => {
  const containerRef = useRef<any>();
  const navSubscription = useRef<any>();
  const navFocusRowsMapRef = useRef<INavigationRow>({});
  const childrenMetaRef = useRef<IContentItemLayoutInfo[]>([]);
  const [renderableChildren, setRenderableChildren] = useState<string[]>([]);

  const shouldRender = (id: string, y: number, y2: number) => {
    // First paint before focus occured
    if (renderableChildren.length === 0)
      return !(y > boxDiam.window.height || y2 < 0); // return FALSE, if item out of screen

    return renderableChildren.includes(id);
  };

  // This updates the list of last rendered item ids in a particular lane.
  const updateLanesChildren = (laneIndex: number, childrenIds: string[]) => {
    childrenMetaRef.current[laneIndex].renderedChildren = childrenIds;
  };

  // This function generated the lanes, stages and whatever needs to be shown in the page
  const generateContent = () => {
    return data__dummy.items.map((row, laneIndex) => {
      const existingLaneRecord = childrenMetaRef.current[laneIndex];

      if (!renderableChildren.includes(existingLaneRecord.id)) {
        return <Fragment key={laneIndex}></Fragment>;
      }

      switch (row.type) {
        case "lane_format":
        case "lane_favorites":
          const laneY2 = existingLaneRecord.y + boxDiam.formatTeaserLane.height;

          return (
            <TeaserlaneMemoised
              laneIndex={laneIndex}
              id={existingLaneRecord.id}
              x={existingLaneRecord.x}
              y={existingLaneRecord.y}
              width={boxDiam.formatTeaserLane.width}
              height={boxDiam.formatTeaserLane.height}
              teaserData={(row.data as any[]).map((item, teaserIndex) => ({
                id: item.id,
                imageUrl: item.backgroundImageUrl,
                navId: navFocusRowsMapRef.current[laneIndex].items[teaserIndex],
              }))}
              key={laneIndex}
              onNewItemsToShow={updateLanesChildren}
              renderedIdsHistory={existingLaneRecord.renderedChildren}
              renderable={shouldRender(
                existingLaneRecord.id,
                existingLaneRecord.y,
                laneY2
              )}
            />
          );

        case "stage":
          const stageY2 =
            existingLaneRecord.y + boxDiam.formatTeaserLane.height;

          return (
            <StageHomepageMemoized
              id={existingLaneRecord.id}
              x={existingLaneRecord.x}
              y={existingLaneRecord.y}
              height={boxDiam.homepage.stage.height}
              width={boxDiam.homepage.stage.width}
              cornerRadius={boxDiam.homepage.stage.borderRadius}
              navIds={navFocusRowsMapRef.current[laneIndex].items}
              stageData={row.data as IHomepageStageData}
              key={laneIndex}
              renderable={shouldRender(
                existingLaneRecord.id,
                existingLaneRecord.y,
                stageY2
              )}
            />
          );

        default:
          return <Fragment key={laneIndex}></Fragment>;
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

  const dataToMapMapper = (): INavigationRow => {
    const rowsData: INavigationRow = {};

    data__dummy.items.forEach((dataItem, laneIndex) => {
      let items = [];
      const lastChild =
        childrenMetaRef.current[childrenMetaRef.current.length - 1];
      let nextY = 0;

      if (lastChild) {
        nextY = lastChild.y + lastChild.height + lastChild.marginBottom;
      }

      switch (dataItem.type) {
        case "stage":
          // 1. generate the map items
          items = [
            // Considering stage has only 2 buttons
            utilNavigation.generateItemId(
              HOME_LAYER_ID,
              CONTENT_ID,
              laneIndex,
              0
            ),
            utilNavigation.generateItemId(
              HOME_LAYER_ID,
              CONTENT_ID,
              laneIndex,
              1
            ),
            utilNavigation.generateItemId(
              HOME_LAYER_ID,
              CONTENT_ID,
              laneIndex,
              2
            ),
          ];

          // 2. generate childrenMeta pos
          const stageId = utilNavigation.generateLaneId(
            layerId,
            CONTENT_ID,
            laneIndex
          );
          const stageLayoutInfo: IContentItemLayoutInfo = {
            id: stageId,
            x: boxDiam.mainContent.x,
            y: nextY,
            height: boxDiam.homepage.stage.height,
            marginBottom: 50,
            renderedChildren: [],
          };

          childrenMetaRef.current.push(stageLayoutInfo);
          break;

        case "lane_format":
        case "lane_favorites":
          // 1. generate the map items
          // @ts-ignore
          items = dataItem.data.map((_, fItemIndex) =>
            utilNavigation.generateItemId(
              HOME_LAYER_ID,
              CONTENT_ID,
              laneIndex,
              fItemIndex
            )
          );

          // 2. generate childrenMeta pos
          const laneId = utilNavigation.generateLaneId(
            layerId,
            CONTENT_ID,
            laneIndex
          );

          const laneLayoutInfo: IContentItemLayoutInfo = {
            id: laneId,
            x: 80,
            y: nextY,
            height: boxDiam.formatTeaserLane.height,
            marginBottom: 50,
            renderedChildren: [],
          };

          childrenMetaRef.current.push(laneLayoutInfo);
      }

      rowsData[laneIndex] = {
        lastFocusedItemIndex: 0,
        items,
      };
    });

    return rowsData;
  };

  // 1. Subscribe to focus change
  // 2. Call vertalScroll
  // 3. Handle virtualisation of lanes to render
  useEffect(() => {
    // Using the Rxjs subscription here insteasd of Redux or NavHook is because We dont want to rerender
    // the entire content tree

    // Generate map row and items
    const rowsData: INavigationRow = dataToMapMapper();

    // Locally save the rows and respective item's focus IDs
    navFocusRowsMapRef.current = rowsData;
    // Generate the navigation map
    navHomepageObj.addNewVs(rowsData, CONTENT_ID, HOME_LAYER_ID);

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
  }, []);

  // console.log(">>>> COL rerender", renderableChildren);

  return (
    <Group
      ref={containerRef}
      id={utilNavigation.generateVsId(HOME_LAYER_ID, CONTENT_ID)}
    >
      {renderableChildren[0] && generateContent()}
    </Group>
  );
};

export default Content;
