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
}

export const FormatTeaser = ({ x, y, id, imageUrl }: IFormatTeaser) => {
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
    helperImageLoad(imageUrl).then((img) => {
      imageref.current = img;
      setImg("");
    });
  }, [imageUrl]);

  // TODO: Show spinner loading
  const isFocused = focusedItemName === id;

  return (
    <Navigable itemId={id} navObj={navHomepageObj}>
      {imageref.current && (
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
