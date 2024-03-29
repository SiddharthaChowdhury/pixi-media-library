import * as PIXI from "pixi.js-legacy";
import { circleButton } from "..";
import PixiRow from "../../../containers/Row";
import { getImageBg } from "../../../pixi-utils/image-helper";
import { getRect } from "../../atoms";
import CircleButton from "../buttons/CircleButton/CircleBtn";
import { IStageData, IStageStructure } from "./types";

// STAGE component

interface IStageOptions {
  stageName: string;
  stageStructure: IStageStructure;
  stageData: IStageData;
  preloader: any;
}

class Stage extends PixiRow {
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
    const stageStructure = props.stageStructure.partials;

    stageStructure.forEach((item) => {
      switch (item.type) {
        case "circleBtn":
          const circleBtn = new CircleButton({
            radius: item.radius || 30,
            defaultStyle: {
              border: {
                width: 2,
                color: "#f2f542",
              },
              background: {
                color: "#000000",
                opacity: 0.5,
              },
            },
            focusStyle: {
              border: {
                width: 2,
                color: "#f2f542",
              },
              background: {
                color: "#000000",
                opacity: 1,
              },
            },
            x: item.x,
            y: item.y,
            name: item.name,
            preloader: props.preloader,
          });

          this.addChild(circleBtn);
          break;

        case "title":
        case "description":
        default:
          break;
      }
    });
  };

  constructor(props: IStageOptions) {
    const { stageStructure, stageName } = props;

    super({
      width: stageStructure.boxStructure.width,
      height: stageStructure.boxStructure.height,
      name: stageName,
      x2: stageStructure.boxStructure.width,
      y2: stageStructure.boxStructure.height,
    });

    this.stageData = props.stageData;

    this.createStageBackground(props);
    this.generateStageItems(props);
  }
}

export default Stage;
