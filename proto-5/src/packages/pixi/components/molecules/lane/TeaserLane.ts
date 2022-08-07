import { INavMeta, ITeaserData, teaserhelper } from "..";
import { IBounds_orig, PixiRow } from "../../..";
import utilNavigation from "../../../../navigation/utilNavigation";
import Teaser from "../teaser/Teaser";

interface ITeaserRecord extends IBounds_orig {
  itemId: string;
  spaceBetween: number;
}

interface ILaneOptions {
  boxStructure: IBounds_orig;
  navMeta: INavMeta;
  loader: any;
}

class TeaserLane extends PixiRow {
  private navMeta: INavMeta;
  public teaserRecord: ITeaserRecord[] = [];
  protected preLoader: any;

  public addTeaser = (teaserInfo: ITeaserData, spaceBetween: number = 10) => {
    const lastTeaser = this.teaserRecord[this.teaserRecord.length - 1];
    const currentTeaserRect = teaserhelper().getTeaserStructureData(
      teaserInfo.teaserType
    ).boxDiam;

    const teaserBound: IBounds_orig = {
      x: spaceBetween,
      y: 0,
      x2: spaceBetween + currentTeaserRect.width,
      y2: currentTeaserRect.height,
      width: currentTeaserRect.width,
      height: currentTeaserRect.height,
    };
    const teaserRecord: ITeaserRecord = {
      ...teaserBound,
      itemId: teaserInfo.teaserData.id.toString(),
      spaceBetween,
    };

    if (lastTeaser) {
      teaserRecord.x = lastTeaser.x2 + spaceBetween;
      teaserRecord.x2 = teaserRecord.x + teaserRecord.width;
    }

    // Registering current Teaser into teaserRecord
    this.teaserRecord.push(teaserRecord);

    // get Teaser component and put it into the lane
    const teaserComponent = new Teaser({
      teaserItem: teaserInfo,
      navMeta: this.navMeta,
      index: this.teaserRecord.length - 1,
      loader: this.preLoader,
      ...teaserBound,
    });

    teaserComponent.x = teaserRecord.x;
    teaserComponent.y = teaserRecord.y;

    this.addChild(teaserComponent);
  };

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

export default TeaserLane;
