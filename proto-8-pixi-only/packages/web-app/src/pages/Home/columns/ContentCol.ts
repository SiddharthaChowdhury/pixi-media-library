import { utilNavigation } from "@mono/navigation";
import { ETeaserType, PixiColumn } from "@mono/pixi-engine";
import { dimenstion } from "../../../config/dimension";
import { homepageNavMap } from "../Homepage";
import { data__dummy } from "../homePageData_mock";
import formatTeaserLane from "../rows/formatTeaserLane";
import { getStageHomePage } from "../stage/stageHomepage";

interface IColOptions {
  x: number;
  y: number;
  layerId: number;
  loader: any;
}
const COLUMN_VS_ID = [1, 0]; // Useful for navigation

class ContentCol extends PixiColumn {
  private layerId: number;
  protected preLoader: any;

  private createHomePageContent = () => {
    const spaceBetweenRows = 2;

    let index = 0;
    // Populate the column with homepage data
    data__dummy.items.forEach((partial) => {
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
      const navMeta = {
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

          index++;
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
            homepageNavMap.registerNavItem(teaserName);
          });

          // Adding current Lane/Row container into the Column/Vs container
          this.addChildItem(laneItem, formatTeaserLaneBounds);
          index++;
          break;
        default:
          break;
      }
    });
  };

  constructor(props: IColOptions) {
    super({
      name: utilNavigation.generateVsId(props.layerId, COLUMN_VS_ID),
      screenHeight: dimenstion.window.height,
    });

    this.preLoader = props.loader;
    this.layerId = props.layerId;
    this.x = props.x;
    this.y = props.y;

    this.createHomePageContent();
  }
}

export default ContentCol;
