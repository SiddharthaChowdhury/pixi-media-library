import * as PIXI from "pixi.js-legacy";
import { circleButton } from "..";
import { navMap } from "../../../../applications/ml/App";
import utilNavigation from "../../../../navigation/utilNavigation";
import PixiRow from "../../../containers/Row";
import { ERectBorderRadiusType, getRect } from "../../atoms";
import { INavMeta, IStageStructure } from "./types";

// STAGE component

interface IStageOptions {
  navMeta: INavMeta;
  stageStructure: IStageStructure;
}

class Stage extends PixiRow {
  private navMeta: INavMeta;

  private setAttribute = (props: IStageOptions) => {
    const attr = props.stageStructure.boxStructure;
    const rectGraphics = getRect({
      x: attr.x,
      y: attr.y,
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

    this.addChildAt(rectGraphics, 0);
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
    });

    this.navMeta = navMeta;

    this.setAttribute(props);
    this.generateStageItems(props);
  }
}

export default Stage;
