import { data__dummy } from "../../../../../../service__mock/ui_builder_mock/homePageData_mock";
import { INavMeta } from "../../../../../navigation/types";
import utilNavigation from "../../../../../navigation/utilNavigation";
import { IBounds_orig, PixiColumn } from "../../../../../pixi";
import { ETeaserType } from "../../../../../pixi/components/molecules";
import formatTeaserLane from "../formatTeaserLane";
import { homepageNavMap } from "../HomePage";
import { getStageHomePage } from "../stageHomepage";

interface IColOptions {
  boxStructure: IBounds_orig;
  layerId: number;
  loader: any;
}
const COLUMN_VS_ID = [1, 0]; // Useful for navigation

class ContentCol extends PixiColumn {
  private layerId: number;
  protected preLoader: any;

  private createHomePageContent = () => {
    const spaceBetweenRows = 2;

    // Populate the column with homepage data
    data__dummy.items.forEach((partial, index) => {
      // Preparing render position of current item ROW
      const lastChildRecorded = this.childRecord[this.childRecord.length - 1];
      const nextChild_X = 0; // 1st element pos.x
      let nextChild_Y = 0; // 1st element pos.y
      if (lastChildRecorded) {
        // if not first elemtent
        // only because we are adding new row under existing old row
        nextChild_Y =
          lastChildRecorded.y + lastChildRecorded.height + spaceBetweenRows;
      }
      const navMeta: INavMeta = {
        parentColId: COLUMN_VS_ID,
        rowId: index,
        layerId: this.layerId,
      };

      switch (partial.type) {
        case "stage":
          const stage = getStageHomePage(navMeta, partial.data, this.preLoader);
          const stageBounds = stage.getBounds_orig();
          this.addChildItem(stage, {
            ...stageBounds,
            x: nextChild_X,
            y: nextChild_Y,
            x2: nextChild_X + stageBounds.width,
            y2: nextChild_Y + stageBounds.height,
          });
          break;
        case "lane_format":
          if (!partial.data) return;
          const { laneItem, bounds: formatTeaserLaneBounds } = formatTeaserLane(
            {
              x: nextChild_X,
              y: nextChild_Y,
              navMeta,
              loader: this.preLoader,
            }
          );
          // @ts-ignore
          partial.data.forEach((teaserData, teaserIndex) => {
            const teaserName = utilNavigation.generateItemId(
              navMeta.layerId,
              navMeta.parentColId,
              navMeta.rowId,
              teaserIndex
            );
            laneItem.addTeaser({
              teaserName,
              teaserType: ETeaserType.FORMAT,
              teaserData: {
                id: teaserData.id,
                imageUrl: teaserData.backgroundImageUrl,
              },
            });

            // registering Teaser to navigation map
            homepageNavMap.addItemToRow(teaserName);
          });

          // Adding current Lane/Row container into the Column/Vs container
          this.addChildItem(laneItem, formatTeaserLaneBounds);
          break;
        //     default:
        //       break;
      }
    });
  };

  constructor(props: IColOptions) {
    super({
      width: props.boxStructure.width,
      height: props.boxStructure.height,
      x2: props.boxStructure.x2,
      y2: props.boxStructure.y2,
      name: utilNavigation.generateVsId(props.layerId, COLUMN_VS_ID),
    });

    this.preLoader = props.loader;
    this.layerId = props.layerId;
    this.x = props.boxStructure.x;
    this.y = props.boxStructure.y;

    this.createHomePageContent();
  }
}

export default ContentCol;
