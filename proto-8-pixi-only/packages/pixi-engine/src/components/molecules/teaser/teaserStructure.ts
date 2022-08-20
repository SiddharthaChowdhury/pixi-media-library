import {
  ETeaserPartname,
  ETeaserPartStructureType,
  ITeaserStructure,
} from "./types";

const EPISODE_TEASER_WIDTH = 380;
const EPISODE_TEASER_HEIGHT = 300;
const EPISODE_TEASER_IMAGE_HEIGHT = 200;
const EPISODE_TEASER_TITLE_HEIGHT = 30;
const EPISODE_TEASER_BORDER_RADIUS = 5;

const FORMAT_TEASER_WIDTH = 176;
const FORMAT_TEASER_HEIGHT = 265;
const FORMAT_TEASER_BORDER_RADIUS = 10;

const episodeTeaserStructureData: ITeaserStructure = {
  boxDiam: {
    name: ETeaserPartname.TEASER_FRAME,
    width: EPISODE_TEASER_WIDTH,
    height: EPISODE_TEASER_HEIGHT,
    borderWidth: 2,
    // borderColor: 0x5dade2,
    borderRadius: [
      EPISODE_TEASER_BORDER_RADIUS,
      EPISODE_TEASER_BORDER_RADIUS,
      EPISODE_TEASER_BORDER_RADIUS,
      EPISODE_TEASER_BORDER_RADIUS,
    ],
    // backgroundColor: 0x27ae60,
  },
  parts: [
    {
      structureType: ETeaserPartStructureType.ROUNDED_RECT__TOP_ONLY,
      name: ETeaserPartname.IMAGE,
      top: 0,
      left: 0,
      width: EPISODE_TEASER_WIDTH,
      height: EPISODE_TEASER_IMAGE_HEIGHT,
      backgroundColor: "#273746",
      borderRadius: [
        EPISODE_TEASER_BORDER_RADIUS,
        EPISODE_TEASER_BORDER_RADIUS,
        0,
        0,
      ],
    },
    {
      structureType: ETeaserPartStructureType.RECT,
      name: ETeaserPartname.TITLE,
      top: EPISODE_TEASER_IMAGE_HEIGHT,
      left: 0,
      width: EPISODE_TEASER_WIDTH,
      height: EPISODE_TEASER_TITLE_HEIGHT,
      backgroundColor: "#273746",
      fontSize: 18,
      fontFamily: "Arial",
      fontColor: "#ff1010",
      textAlign: "left",
      maxLineEllipsis: 1,
    },
    {
      structureType: ETeaserPartStructureType.ROUNDED_RECT__BOT_ONLY,
      name: ETeaserPartname.TITLE,
      top: EPISODE_TEASER_IMAGE_HEIGHT + EPISODE_TEASER_TITLE_HEIGHT,
      left: 0,
      width: EPISODE_TEASER_WIDTH,
      height:
        EPISODE_TEASER_HEIGHT -
        (EPISODE_TEASER_IMAGE_HEIGHT + EPISODE_TEASER_TITLE_HEIGHT),
      borderRadius: [
        0,
        0,
        EPISODE_TEASER_BORDER_RADIUS,
        EPISODE_TEASER_BORDER_RADIUS,
      ],
      backgroundColor: "#273746",
      fontSize: 12,
      fontColor: "#ffffff",
      textAlign: "left",
      maxLineEllipsis: 3,
    },
  ],
};

const formatTeaserStructureData: ITeaserStructure = {
  boxDiam: {
    name: ETeaserPartname.TEASER_FRAME,
    width: FORMAT_TEASER_WIDTH,
    height: FORMAT_TEASER_HEIGHT,
    borderWidth: 2,
    borderRadius: [
      FORMAT_TEASER_BORDER_RADIUS,
      FORMAT_TEASER_BORDER_RADIUS,
      FORMAT_TEASER_BORDER_RADIUS,
      FORMAT_TEASER_BORDER_RADIUS,
    ],
  },

  parts: [
    {
      structureType: ETeaserPartStructureType.ROUNDED_RECT,
      name: ETeaserPartname.IMAGE,
      top: 0,
      left: 0,
      width: FORMAT_TEASER_WIDTH,
      height: FORMAT_TEASER_HEIGHT,
      backgroundColor: "#273746",
      borderRadius: [
        FORMAT_TEASER_BORDER_RADIUS,
        FORMAT_TEASER_BORDER_RADIUS,
        FORMAT_TEASER_BORDER_RADIUS,
        FORMAT_TEASER_BORDER_RADIUS,
      ],
    },
  ],
};

interface ITeaserStructureData {
  formatTeaser: ITeaserStructure;
  episodeTeaser: ITeaserStructure;
}
const teaserStructure: ITeaserStructureData = {
  formatTeaser: formatTeaserStructureData,
  episodeTeaser: episodeTeaserStructureData,
};

export default teaserStructure;
