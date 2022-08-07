import * as PIXI from "pixi.js-legacy";
import { circleButton, INavMeta } from "..";
import { navMap } from "../../../../applications/ml/App";
import utilNavigation from "../../../../navigation/utilNavigation";
import PixiRow from "../../../containers/Row";
import { getImageBg } from "../../../pixi-utils/image-helper";
import { getRect } from "../../atoms";
import { IStageData, IStageStructure } from "./types";

// STAGE component

interface IStageOptions {
  navMeta: INavMeta;
  stageStructure: IStageStructure;
  stageData: IStageData;
  preloader: any;
}

class Stage extends PixiRow {
  private navMeta: INavMeta;
  private stageData: IStageData;

  private createStageBackground = (props: IStageOptions) => {
    const attr = props.stageStructure.boxStructure;
    const rectGraphics = getRect({
      x: 0,
      y: 0,
      width: this.width_orig,
      height: this.height_orig,
      borderRadius: attr.border ? attr.border.radius.size : undefined,
      borderRadiusSide: attr.border ? attr.border.radius.type : undefined,
      borderColor: attr.border
        ? PIXI.utils.string2hex(attr.border.color)
        : undefined,
      borderWidth: attr.border ? attr.border.width : undefined,
      fillColor: attr.fillColor
        ? PIXI.utils.string2hex(attr.fillColor)
        : undefined,
      name: "stage_rect_graphics",
    });

    if (this.getChildByName("stage_rect_graphics")) {
      this.removeChild(this.getChildByName("stage_rect_graphics"));
    }

    const imageContainer = getImageBg(
      rectGraphics,
      props.stageData.backgroundImgUrl,
      props.preloader,
      "STAGE_BG_IMG",
      true
    );

    this.addChildAt(imageContainer, 0);
  };

  private generateStageItems = (props: IStageOptions) => {
    let itemId = 0;
    const stageStructure = props.stageStructure.partials;

    stageStructure.forEach((item) => {
      switch (item.type) {
        case "circleBtn":
          const cb = circleButton({
            radius: item.radius || 30,
            border: {
              width: 2,
              color: "#f2f542",
            },
            bgColor: "#cfa95f",
          });

          cb.x = item.x;
          cb.y = item.y;

          // If focusable give Name and let update NavMap
          if (item.focusable) {
            cb.name = utilNavigation.generateItemId(
              this.navMeta.layerId,
              this.navMeta.parentColId,
              this.navMeta.rowId,
              itemId
            );

            // Register new Item to the navigation map
            navMap.addItemToRow(cb.name);
            itemId += 1;
          }

          this.addChild(cb);
          break;

        case "title":
        case "description":
        default:
          break;
      }
    });
  };

  constructor(props: IStageOptions) {
    const { stageStructure, navMeta } = props;

    super({
      width: stageStructure.boxStructure.width,
      height: stageStructure.boxStructure.height,
      name: utilNavigation.generateLaneId(
        navMeta.layerId,
        navMeta.parentColId,
        navMeta.rowId
      ),
      x2: stageStructure.boxStructure.width,
      y2: stageStructure.boxStructure.height,
    });

    // this.x = stageStructure.x;
    // this.y = stageStructure.y;

    this.navMeta = navMeta;
    this.stageData = props.stageData;

    this.createStageBackground(props);
    this.generateStageItems(props);
  }
}

export default Stage;
