
import generateLane from "./lane/generateLane";
import { getLoadingTeaser } from "./loading/getLoading";
import Loading from "./loading/Loading";
import { getTeaser, getTeaserStructureData } from "./teaser/getTeaser";

const molicules = {
  getTeaser,
  getTeaserStructureData,
  generateLane,
  getLoadingTeaser,

  Loading,
};

export default molicules;
