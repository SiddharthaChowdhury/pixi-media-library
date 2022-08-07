import { INavMeta } from "..";
import { IBounds_orig, PixiRow } from "../../..";
import utilNavigation from "../../../../navigation/utilNavigation";

interface ITeaserInfo extends IBounds_orig {
  itemId: string;
  spaceBetween: number;
  parentColId: number[];
  parentLayerId: number;
}

interface ILaneOptions {
  boxStructure: IBounds_orig;
  navMeta: INavMeta;
  loader: any;
}

class Lane extends PixiRow {
  private navMeta: INavMeta;
  private itemRecord: ITeaserInfo[] = [];
  private itemFocusIndex: number = 0;
  protected preLoader: any;

  public addTeaser = () => {};

  constructor(props: ILaneOptions) {
    super({
      width: props.boxStructure.width,
      height: props.boxStructure.height,
      x2: props.boxStructure.x2,
      y2: props.boxStructure.y2,
      name: utilNavigation.generateLaneId(
        props.navMeta.layerId,
        props.navMeta.parentColId,
        props.navMeta.rowId
      ),
    });

    this.navMeta = props.navMeta;
    this.preLoader = props.loader;
    this.x = props.boxStructure.x;
    this.y = props.boxStructure.y;
  }
}

export default Lane;
