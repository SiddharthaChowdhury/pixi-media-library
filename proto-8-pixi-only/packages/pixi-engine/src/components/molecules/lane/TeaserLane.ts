import { teaserhelper } from "../../../utils/teaser-helper";
import { PixiRow } from "../../containers";
import { IBounds_orig } from "../../containers/types";
import { Teaser } from "../teaser/Teaser";
import { ITeaserData } from "../types";

interface ITeaserRecord extends IBounds_orig {
  itemId: string;
  spaceBetween: number;
}

interface ILaneOptions {
  boxStructure: IBounds_orig;
  laneName: string;
  loader: any;
}

export class TeaserLane extends PixiRow {
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
      index: this.teaserRecord.length - 1,
      preloader: this.preLoader,
      ...teaserBound,
    });

    teaserComponent.x = teaserRecord.x;
    teaserComponent.y = teaserRecord.y;

    // Adding teaser into the lane
    this.addChild(teaserComponent);
  };

  constructor(props: ILaneOptions) {
    super({
      width: props.boxStructure.width,
      height: props.boxStructure.height,
      x2: props.boxStructure.x2,
      y2: props.boxStructure.y2,
      name: props.laneName,
    });

    this.preLoader = props.loader;
    this.x = props.boxStructure.x;
    this.y = props.boxStructure.y;
  }
}
