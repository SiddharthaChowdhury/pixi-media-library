import React from "react";
import { useEffect, useRef, useState } from "react";
import { Group, Rect } from "react-konva";
import { useSelector } from "react-redux";
import { helperImageLoad } from "../../../../helpers/helper-image-loader";
import Navigable from "../../../../navigation/Navigable";
import { navHomepageObj } from "../../../../pages/homepage/Homepage";
import { selectNavigationFocusedItem } from "../../../../redux/selectors/selectNavigation";
import teaserStructure from "../teaserStructure";

interface IFormatTeaser {
  x: number;
  y: number;
  id: string;
  imageUrl: string;
  renderable: boolean;
}

const FormatTeaser = ({ x, y, id, imageUrl, renderable }: IFormatTeaser) => {
  const [, setImg] = useState<string>();
  const imageref = useRef<HTMLImageElement>();
  const { current: formatTeaserStyle } = useRef(teaserStructure.formatTeaser);
  const focusedItemName = useSelector(
    selectNavigationFocusedItem,
    (valA, valB) => {
      return valB !== id && valA !== id;
    }
  );

  useEffect(() => {
    if (imageref.current) return;

    if (renderable)
      helperImageLoad(imageUrl).then((img) => {
        imageref.current = img;
        setImg("");
      });
  }, [imageUrl, renderable]);

  // console.log(">>>> Teser id = ", id);

  // TODO: Show spinner loading
  const isFocused = focusedItemName === id;

  return (
    <Navigable itemId={id} navObj={navHomepageObj}>
      {imageref.current && renderable && (
        <Group
          x={x}
          y={y}
          width={formatTeaserStyle.boxDiam.width}
          height={formatTeaserStyle.boxDiam.height}
        >
          <Rect
            width={formatTeaserStyle.parts[0].width}
            height={formatTeaserStyle.parts[0].height}
            // shadowBlur={10}
            fillPatternImage={imageref.current}
            cornerRadius={formatTeaserStyle.parts[0].borderRadius}
            stroke={
              isFocused ? "#ffffff" : formatTeaserStyle.boxDiam.borderColor
            }
            strokeWidth={isFocused ? 2 : 1} // is
          />
        </Group>
      )}
    </Navigable>
  );
};

export const FormatTeaserMemoized = React.memo(
  FormatTeaser,
  (prevProps, nextProps) => prevProps.renderable === nextProps.renderable
);
