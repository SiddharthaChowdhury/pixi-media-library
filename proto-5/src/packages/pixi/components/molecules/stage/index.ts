import * as PIXI from "pixi.js-legacy";
import PixiColumn from "../../../containers/Column";
import PixiRow from "../../../containers/Row";
import { ERectBorderRadiusType, getRect } from "../../atoms";

// STAGE component

interface IStageOptions {
  name: string;
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
  index: number;
}

interface IStageStructureRowItems {
  type: "circleBtn" | "title" | "description";
  radius?: number; // only if type === 'circleBtn'
  bgColor?: string;
  width?: number; // for title | desc
  height?: number; // for title | desc
}

interface IStageStructure {
  focusIndex?: number; // if the row contains focusable items
  items: IStageStructureRowItems[];
  x: number;
  y: number;
}

const stageStructure: IStageStructure[] = [
  {
    focusIndex: 0,
    items: [
      {
        type: "circleBtn",
        radius: 100,
        bgColor: "#fbfbfb",
      },
      {
        type: "circleBtn",
        radius: 100,
        bgColor: "#fbfbfb",
      },
    ],
    x: 30,
    y: 350,
  },
  {
    items: [
      {
        type: "title",
        width: 500,
        height: 20,
      },
      {
        type: "description",
        width: 500,
        height: 200,
      },
    ],
    x: 30,
    y: 10,
  },
];

class Stage extends PixiRow {
  private setAttribute = (attr: IStageOptions) => {
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

    this.addChildAt(rectGraphics, 0);
  };

  private generateStageItems = (stageStructure: IStageStructure[]) => {};

  constructor(options: IStageOptions) {
    super({
      width: options.width,
      height: options.height,
      name: options.name,
      index: options.index,
    });

    this.setAttribute(options);
    this.generateStageItems(stageStructure);
  }
}

export default Stage;
