import { ETeaserPartname, ITeaserStructure } from "../../types/teaser.types";

const TEASER_WIDTH = 380;
const TEASER_HEIGHT = 300;
const IMAGE_HEIGHT = 200;
const TITLE_HEIGHT = 30;
const BORDER_RADIUS = 5;

export const teaserGeneral_structureData: ITeaserStructure = {
  boxDiam: {
    name: ETeaserPartname.TEASER_FRAME,
    width: TEASER_WIDTH,
    height: TEASER_HEIGHT,
    borderWidth: 2,
    // borderColor: 0x5dade2,
    borderRadius: BORDER_RADIUS,
    // backgroundColor: 0x27ae60,
  },
  parts: [
    {
      structureType: "roundedRect_top",
      name: ETeaserPartname.IMAGE,
      top: 0,
      left: 0,
      width: TEASER_WIDTH,
      height: IMAGE_HEIGHT,
      backgroundColor: 0x273746,
      borderRadius: BORDER_RADIUS,
    },
    {
      structureType: "rect",
      name: ETeaserPartname.TITLE,
      top: IMAGE_HEIGHT,
      left: 0,
      width: TEASER_WIDTH,
      height: TITLE_HEIGHT,
      backgroundColor: 0x273746,
      fontSize: 18,
      fontFamily: "Arial",
      fontColor: 0xff1010,
      textAlign: "left",
      maxLineEllipsis: 1,
    },
    {
      structureType: "roundedRect_bot",
      name: ETeaserPartname.TITLE,
      top: IMAGE_HEIGHT + TITLE_HEIGHT,
      left: 0,
      width: TEASER_WIDTH,
      height: TEASER_HEIGHT - (IMAGE_HEIGHT + TITLE_HEIGHT),
      borderRadius: BORDER_RADIUS,
      backgroundColor: 0x273746,
      fontSize: 12,
      fontColor: 0xffffff,
      textAlign: "left",
      maxLineEllipsis: 3,
    },
  ],
};
