import * as PIXI from "pixi.js-legacy";
import { circleButton } from "..";
import { navMap } from "../../../../applications/ml/App";
import utilNavigation from "../../../../navigation/utilNavigation";
import PixiRow from "../../../containers/Row";
import { ERectBorderRadiusType, getRect } from "../../atoms";

// STAGE component

export interface INavMeta {
  parentColId: number[];
  rowId: number;
  layerId: number;
}
interface IStageOptions {
  x: number;
  y: number;
  width: number;
  height: number;

  border?: {
    radius: { size: number; type: ERectBorderRadiusType };
    color: string;
    width: number;
  };
  fillColor?: string;
  navMeta: INavMeta;
}

interface IStageStructure {
  type: "circleBtn" | "title" | "description";
  radius?: number; // only if type === 'circleBtn'
  bgColor?: string;
  width?: number; // for title | desc
  height?: number; // for title | desc
  focusable?: boolean;
  x: number;
  y: number;
}

const stageStructure: IStageStructure[] = [
  {
    type: "circleBtn",
    radius: 30,
    bgColor: "#fbfbfb",
    focusable: true,
    x: 60,
    y: 475,
  },
  {
    type: "circleBtn",
    radius: 30,
    bgColor: "#fbfbfb",
    focusable: true,
    x: 140,
    y: 475,
  },
  {
    type: "circleBtn",
    radius: 30,
    bgColor: "#fbfbfb",
    focusable: true,
    x: 220,
    y: 475,
  },
  {
    type: "title",
    width: 500,
    height: 20,
    x: 30,
    y: 30,
  },
  {
    type: "description",
    width: 500,
    height: 200,
    x: 30,
    y: 35,
  },
];

class Stage extends PixiRow {
  private navMeta: INavMeta;

  private setAttribute = (attr: IStageOptions) => {
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

  private generateStageItems = (stageStructure: IStageStructure[]) => {
    let itemId = 0;

    stageStructure.forEach((item: IStageStructure) => {
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

  constructor(options: IStageOptions) {
    super({
      width: options.width,
      height: options.height,
      name: utilNavigation.generateLaneId(
        options.navMeta.layerId,
        options.navMeta.parentColId,
        options.navMeta.rowId
      ),
    });

    this.navMeta = options.navMeta;

    this.setAttribute(options);
    this.generateStageItems(stageStructure);
  }
}

export default Stage;
