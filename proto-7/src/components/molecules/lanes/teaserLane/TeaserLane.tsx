import React, { useCallback } from "react";
import { useEffect, useRef } from "react";
import { Group } from "react-konva";
import { tweens } from "../../../../animations/tweens";
import { boxDiam } from "../../../../config/dimension";
import utilNavigation from "../../../../navigation/utilNavigation";
import { navHomepageObj } from "../../../../pages/homepage/Homepage";
import { FormatTeaser } from "../../teasers/formatTeaser/FormatTeaser";
import teaserStructure from "../../teasers/teaserStructure";
import { ITeaserMeta } from "../../teasers/types";

interface ITeaserlane {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
  renderable: boolean;
  teaserData: ITeaserMeta[];
  spaceBetween?: number;
  //   teaserType: ETeaserType
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
}: ITeaserlane) => {
  const containerRef = useRef<any>();
  const childRecordRef = useRef<IChildRecord[]>([]);
  const navSubscriptionRef = useRef<any>();

  // Get lane Width / x2
  const getLaneWidth = () => {
    const lastChild = childRecordRef.current[childRecordRef.current.length - 1];

    if (!lastChild) return 0;

    return lastChild.x2;
  };

  const horizontalScroll = useCallback(
    (itemIndex: number) => {
      if (!renderable) return;
      const laneWidth = getLaneWidth();

      // If lane is smaller than screen width; no scroll
      if (laneWidth <= boxDiam.window.width) return;

      const itemMeta = childRecordRef.current[itemIndex];
      let newFocusX = boxDiam.mainContent.x; // initial x of lane
      const idealFocusX = boxDiam.mainContent.x; // of lane
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

      // Finally make the move (with animation)
      tweens(containerRef.current).moveX(newFocusX);
    },
    [renderable]
  );

  const getChildExists = (id: string) => {
    return childRecordRef.current.find((child) => child.childId === id);
  };

  useEffect(() => {
    // Using the Rxjs subscription here insteasd of Redux or NavHook is because We dont want to rerender
    // the entire content tree
    navSubscriptionRef.current = navHomepageObj.activeState$.subscribe(
      (activeFocus) => {
        const { item } = activeFocus;
        const focusedLaneId = utilNavigation.generateLaneId(
          activeFocus.layer,
          activeFocus.vs,
          activeFocus.row
        );

        focusedLaneId === id && horizontalScroll(item);
      }
    );

    return () => {
      navSubscriptionRef.current.unsubscribe();
    };
  }, [horizontalScroll, id, renderable]);

  console.log(">> Render status laneId=", id, renderable);

  if (!renderable) return null;

  return (
    <Group ref={containerRef} x={x} y={y} width={width} height={height} id={id}>
      {teaserData.map((teaserData, index) => {
        const childId = utilNavigation.generateItemIdFromLaneId(id, index);
        const existingChildRecord = getChildExists(childId);

        const pos = { x: 0, y: 0 };
        if (!existingChildRecord) {
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
        } else {
          pos.x = existingChildRecord.x;
          pos.y = existingChildRecord.y;
        }

        return (
          <FormatTeaser
            key={index}
            x={pos.x}
            y={pos.y}
            id={childId}
            imageUrl={teaserData.imageUrl}
          />
        );
      })}
    </Group>
  );
};

export const TeaserlaneMemoised = React.memo(
  TeaserLane,
  (prevProps, nextProps) => {
    return prevProps.renderable === nextProps.renderable;
  }
);
