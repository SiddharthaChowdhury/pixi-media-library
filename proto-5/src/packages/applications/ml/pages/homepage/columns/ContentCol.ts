import { homepageStructure } from "../../../../../../service__mock/ui_builder_mock/homePageData_mock";
import utilNavigation from "../../../../../navigation/utilNavigation";
import { IBounds_orig, PixiColumn } from "../../../../../pixi";
import { ETeaserType } from "../../../../../pixi/components/molecules";
import formatTeaserLane from "../formatTeaserLane";
import { getStageHomePage } from "../stageHomepage";
import { IHomePageStructure } from "../types";

interface IColOptions {
  boxStructure: IBounds_orig;
  layerId: number;
  loader: any;
}
const colId = [1, 0]; // Useful for navigation

class ContentCol extends PixiColumn {
  private layerId: number;
  protected preLoader: any;

  private createHomePageContent = () => {
    const spaceBetweenRows = 2;

    // Populate the column with homepage data
    homepageStructure.forEach((partial: IHomePageStructure, index) => {
      const lastChildRecorded = this.childRecord[this.childRecord.length - 1];
      const nextChild_X = 0; // 1st element pos.x
      let nextChild_Y = 0; // 1st element pos.y

      if (lastChildRecorded) {
        // if not first elemtent
        // only because we are adding new row under existing old row
        nextChild_Y =
          lastChildRecorded.y + lastChildRecorded.height + spaceBetweenRows;
      }

      switch (partial.type) {
        case "stage":
          const stage = getStageHomePage(
            colId,
            this.layerId,
            partial,
            this.preLoader
          );
          const stageBounds = stage.getBounds_orig();
          this.addChildItem(stage, {
            ...stageBounds,
            x: nextChild_X,
            y: nextChild_Y,
            x2: nextChild_X + stageBounds.width,
            y2: nextChild_Y + stageBounds.height,
          });
          break;

        case "formatlane":
          if (!partial.teasers) return;
          const { laneItem, bounds: formatTeaserLaneBounds } = formatTeaserLane(
            {
              x: nextChild_X,
              y: nextChild_Y,
              navMeta: {
                layerId: this.layerId,
                parentColId: colId,
                rowId: index,
              },
              loader: this.preLoader,
            }
          );

          partial.teasers.forEach((teaserData) => {
            laneItem.addTeaser({
              teaserType: ETeaserType.FORMAT,
              teaserData,
            });
          });

          console.log(">>>>>> ", laneItem.teaserRecord);

          this.addChildItem(laneItem, formatTeaserLaneBounds);
          break;

        default:
          break;
      }
    });
  };

  constructor(props: IColOptions) {
    super({
      width: props.boxStructure.width,
      height: props.boxStructure.height,
      x2: props.boxStructure.x2,
      y2: props.boxStructure.y2,
      name: utilNavigation.generateVsId(props.layerId, colId),
    });

    this.preLoader = props.loader;
    this.layerId = props.layerId;
    this.x = props.boxStructure.x;
    this.y = props.boxStructure.y;

    this.createHomePageContent();
  }
}

export default ContentCol;
