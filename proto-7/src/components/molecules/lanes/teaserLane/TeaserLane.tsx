import React, { Fragment, useCallback, useState } from "react";
import { useEffect, useRef } from "react";
import { Group, Text } from "react-konva";
import { tweens } from "../../../../animations/tweens";
import { boxDiam } from "../../../../config/dimension";
import { ENavigationDirection } from "../../../../navigation/types";
import utilNavigation from "../../../../navigation/utilNavigation";
import { navHomepageObj } from "../../../../pages/homepage/Homepage";
import { FormatTeaserMemoized } from "../../teasers/formatTeaser/FormatTeaser";
import teaserStructure from "../../teasers/teaserStructure";
import { ITeaserMeta } from "../../teasers/types";

interface ITeaserlane {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
  laneIndex: number;
  renderable: boolean;
  teaserData: ITeaserMeta[];
  renderedIdsHistory: string[];
  displayName?: string;
  spaceBetween?: number;
  onNewItemsToShow: (index: number, childrenIds: string[]) => void;
}

interface IChildRecord extends ITeaserMeta {
  x: number;
  y: number;
  x2: number;
  childId: string;
}

const TeaserLane = ({
  x,
  y,
  width,
  height,
  id,
  teaserData,
  spaceBetween = 10,
  renderable = true,
  displayName,
  laneIndex,
  onNewItemsToShow,
  renderedIdsHistory,
}: ITeaserlane) => {
  const [itemsToRender, setItemsToRender] = useState<string[] | null>(null);
  const lanePosRef = useRef<{ x: number; y: number }>({ x, y });
  const containerRef = useRef<any>();
  const childRecordRef = useRef<IChildRecord[]>([]);
  const navSubscriptionRef = useRef<any>();

  // Get lane Width / x2
  const getLaneWidth = () => {
    const lastChild = childRecordRef.current[childRecordRef.current.length - 1];

    if (!lastChild) return 0;

    return lastChild.x2;
  };

  // Derives position.x of the Lane based on focused Item in such a way,
  // that focused item stays at the left most corner (idealFocusX) position
  const getNextPosX = useCallback((focusedItemIndex: number): number => {
    const laneWidth = getLaneWidth();
    const idealFocusX = boxDiam.mainContent.x; // of lane

    // If lane is smaller than screen width; no scroll
    if (laneWidth <= boxDiam.window.width) return idealFocusX;

    const itemMeta = childRecordRef.current[focusedItemIndex];
    let newFocusX = boxDiam.mainContent.x; // initial x of lane

    const teaser_x = itemMeta.x;

    if (teaser_x - idealFocusX > 0) {
      // Position of focusedItem adjusted to the idealFocusX position
      newFocusX = teaser_x - idealFocusX;
    }

    // lane.x2 should remain at the Right-end of the screen
    // Adjustments needed only when lane's width is larger than the screen's x2
    let laneNextX2 = laneWidth - newFocusX;
    if (laneNextX2 < boxDiam.window.width) {
      // lane.x2 is less than screen.width/x2; needs adjustment
      const paddingRight = 50;
      const diff = boxDiam.window.width - laneNextX2 - paddingRight;
      newFocusX -= diff;
    }

    // Always negative if needs to moved.
    // Content of the lane is always position right-wards
    if (newFocusX !== idealFocusX) newFocusX = -Math.abs(newFocusX);

    return newFocusX;
  }, []);

  // Responsible for scrolling of the Lane <- LEFT and RIGHT ->
  const horizontalScroll = useCallback(
    (newFocusX: number, animate: boolean = true) => {
      if (!renderable || !containerRef.current) return;

      // Finally make the move (with animation)
      lanePosRef.current.x = newFocusX;
      if (animate) {
        tweens(containerRef.current).moveX(newFocusX, 0.2, () => {});
        return;
      }

      containerRef.current.x(newFocusX);
    },
    [renderable]
  );

  // Virtualisation
  // Any child goes out of screen is culled
  const generateItemsToRender = (
    focusedItemIndex: number,
    currentLaneX: number
  ) => {
    const itemsToShow = [];
    const leftMostCorner = boxDiam.window.pos.x;
    const rightMostCorner = boxDiam.window.pos.x + boxDiam.window.width;

    // Items on the left
    let i = focusedItemIndex - 1;
    while (
      childRecordRef.current[i] &&
      currentLaneX + childRecordRef.current[i].x2 > leftMostCorner
    ) {
      itemsToShow.push(childRecordRef.current[i].childId);
      i -= 1;
    }

    // currently focused item also needs to render, so:
    itemsToShow.push(childRecordRef.current[focusedItemIndex].childId);

    // Items on the right
    let j = focusedItemIndex + 1;
    while (
      childRecordRef.current[j] &&
      childRecordRef.current[j].x + currentLaneX < rightMostCorner
    ) {
      itemsToShow.push(childRecordRef.current[j].childId);
      j += 1;
    }

    // Notify parent about new grand children list
    onNewItemsToShow(laneIndex, itemsToShow);
    // Update current list of renderable children
    setItemsToRender(itemsToShow);
  };

  // generate childRecord
  const generateChildRecord = () => {
    teaserData.forEach((teaserData, index) => {
      const childId =
        teaserData.navId || utilNavigation.generateItemIdFromLaneId(id, index);

      const pos = { x: 0, y: displayName ? 50 : 0 };

      const lastTeaserChild =
        childRecordRef.current[childRecordRef.current.length - 1];

      if (lastTeaserChild) {
        pos.x = lastTeaserChild.x2 + spaceBetween;
      }

      childRecordRef.current.push({
        ...teaserData,
        ...pos,
        x2: pos.x + teaserStructure.formatTeaser.boxDiam.width,
        childId,
      });
    });
  };

  // Listening to changes of focus state
  useEffect(() => {
    // Using the Rxjs subscription here insteasd of Redux or NavHook is because We dont want to rerender
    // the entire content tree

    if (!navSubscriptionRef.current && renderable) {
      // Trigger the initialFocus, settimeout to lower the priority
      const lastFocusedItemIndex = navHomepageObj.getLastFocusedRowItem(id);
      setTimeout(() => {
        const scrollToX = getNextPosX(lastFocusedItemIndex);
        horizontalScroll(scrollToX, false);
      }, 0);

      // Start listening for active state
      navSubscriptionRef.current = navHomepageObj.activeState$.subscribe(
        (activeFocus) => {
          const { item } = activeFocus;
          const focusedLaneId = utilNavigation.generateLaneId(
            activeFocus.layer,
            activeFocus.vs,
            activeFocus.row
          );

          if (focusedLaneId === id) {
            const nextLanePosX = getNextPosX(item);
            const shouldAnimate =
              activeFocus.direction === ENavigationDirection.RIGHT ||
              activeFocus.direction === ENavigationDirection.LEFT;

            generateItemsToRender(item, nextLanePosX);
            horizontalScroll(nextLanePosX, shouldAnimate);
          }
        }
      );
    }

    if (navSubscriptionRef.current && !renderable) {
      navSubscriptionRef.current.unsubscribe();
      navSubscriptionRef.current = null;
    }
  }, [getNextPosX, horizontalScroll, id, renderable]);

  // Component did mount
  useEffect(() => {
    // generate childRecord / teaserRecord
    generateChildRecord();

    // Derive teasers to render
    const lastFocusedItem = navHomepageObj.getLastFocusedRowItem(id);

    // Not first time mount: Resurrected lane!
    if (renderedIdsHistory[0]) {
      setItemsToRender(renderedIdsHistory);
      return;
    }

    // For first time mount
    generateItemsToRender(lastFocusedItem, lanePosRef.current.x);

    return () => {
      // console.log(">>>> LANE unMounting", id);
    };
  }, []);

  return (
    <>
      {displayName && (
        <Text
          x={x}
          y={y}
          width={600}
          height={55}
          text={displayName}
          fill={"#ffffff"}
          fontSize={25}
          fontStyle={"bold"}
          lineHeight={1.1}
        />
      )}
      <Group
        ref={containerRef}
        x={lanePosRef.current.x}
        y={lanePosRef.current.y}
        width={width}
        height={height}
        id={id}
      >
        {itemsToRender &&
          teaserData.map((teaserData, index) => {
            const existingChildRecord = childRecordRef.current[index]; // getChildExists(childId);

            if (!itemsToRender.includes(existingChildRecord.childId)) {
              return <Fragment key={index} />;
            }

            return (
              <FormatTeaserMemoized
                key={index}
                x={existingChildRecord.x}
                y={existingChildRecord.y}
                id={existingChildRecord.childId}
                imageUrl={teaserData.imageUrl}
                renderable
              />
            );
          })}
      </Group>
    </>
  );
};

export const TeaserlaneMemoised = React.memo(
  TeaserLane,
  (prevProps, nextProps) => {
    return prevProps.renderable === nextProps.renderable;
  }
);
