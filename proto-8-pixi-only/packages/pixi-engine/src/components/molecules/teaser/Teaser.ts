import * as PIXI from "pixi.js-legacy";
import { Container, DisplayObject, Graphics } from "pixi.js-legacy";

import {
  ETeaserPartname,
  ITeaserData,
  ITeaserMeta,
  ITeaserPartsStructure,
} from "./types";
import { getText, IRectProps, Rect } from "../../atoms";
import { FocusableItem } from "../../containers";
import { IBounds_orig } from "../../containers/types";
import { getImageBg } from "../../../utils/image-helper";
import { teaserhelper } from "../../../utils/teaser-helper";

interface ITeaserOptions extends IBounds_orig {
  teaserItem: ITeaserData;
  index: number;
  preloader: any;
}

/// NOTE: it is important to implement onFocus function
class Teaser extends FocusableItem {
  private preloader: any;

  private getTeaserText = (
    part: ITeaserPartsStructure,
    text: string,
    maxLineEllipsis?: number
  ) => {
    let backgroundRect = null;

    if (part.backgroundColor) {
      backgroundRect = new Rect({
        x: 0,
        y: 0,
        width: part.width,
        height: part.height,
        border: {
          width: part.borderWidth,
          color: part.borderColor,
          radius: part.borderRadius,
        },
        background: {
          fill: part.backgroundColor,
        },
        name: part.name,
      });
    }

    const partDisplayObjText = getText({
      text,
      textStyle: {
        wordWrapWidth: backgroundRect ? part.width - 10 : part.width,
        wordWrap: true,
        fontFamily: part.fontFamily || "Arial",
        align: part.textAlign,
        fill: part.fontColor,
        fontSize: part.fontSize || 18,
      },
      maxLineEllipsis,
    });

    if (backgroundRect) {
      const container = new Container();
      container.name = part.name;

      partDisplayObjText.x = 5;
      partDisplayObjText.y = 5;

      container.addChild(backgroundRect, partDisplayObjText);
      container.x = part.left;
      container.y = part.top;

      return container;
    }

    partDisplayObjText.name = part.name;
    partDisplayObjText.x = part.left;
    partDisplayObjText.y = part.top;

    return partDisplayObjText;
  };

  private getTeaserImage = (
    partObj: Graphics, // A rect graphics that defines the size boundary of the teaser
    teaserData: ITeaserMeta
  ): PIXI.Container => {
    const id = `IMAGE_${teaserData.id}`;
    const imageContainer = getImageBg(
      partObj,
      teaserData.imageUrl,
      this.preloader,
      id,
      true
    );
    imageContainer.name = `${partObj.name}_CONT`;

    return imageContainer;
  };

  // This function puts respecive data into teaser parts (like Part.TITLE should shou the title of the teaser and so on...)
  private getDataBlendedStructure = (
    part: ITeaserPartsStructure,
    teaserData: ITeaserMeta
  ): DisplayObject => {
    const commonRectProps: IRectProps = {
      x: part.left,
      y: part.top,
      width: part.width,
      height: part.height,
      border: {
        radius: part.borderRadius,
        color: part.borderColor,
        width: part.borderWidth,
      },
      background: {
        fill: part.backgroundColor,
      },
      name: part.name,
    };

    switch (part.name) {
      case ETeaserPartname.IMAGE:
        const rect = new Rect({ ...commonRectProps });

        return this.getTeaserImage(rect, teaserData);
      case ETeaserPartname.TITLE:
        return this.getTeaserText(
          part,
          teaserData.title!,
          part.maxLineEllipsis
        );
      case ETeaserPartname.DESC:
        return this.getTeaserText(
          part,
          teaserData.description!,
          part.maxLineEllipsis
        );
      default:
        return new Rect({ ...commonRectProps });
    }
  };

  // PUBLIC methods

  public onFocus = () => {
    teaserhelper(this).focusTeaserVisual();
  };

  public onUnFocus = () => {
    teaserhelper(this).unFocusteaserVisual();
  };

  constructor(props: ITeaserOptions) {
    super({
      width: props.width,
      height: props.height,
      name: props.teaserItem.teaserName,
      x2: props.x2,
      y2: props.y2,
    });

    this.x = props.x;
    this.y = props.y;

    this.preloader = props.preloader;

    const structure = teaserhelper().getTeaserStructureData(
      props.teaserItem.teaserType
    );

    const mainBox = new Rect({
      x: 0,
      y: 0,
      width: structure.boxDiam.width,
      height: structure.boxDiam.height,
      border:
        structure.boxDiam.borderRadius || structure.boxDiam.borderWidth
          ? {
              width: structure.boxDiam.borderWidth,
              color: structure.boxDiam.borderColor,
              radius: structure.boxDiam.borderRadius,
            }
          : undefined,
      background: structure.boxDiam.backgroundColor
        ? {
            fill: structure.boxDiam.backgroundColor,
          }
        : undefined,
    });

    // Add the frame graphics to the container;
    this.addChild(mainBox);

    // This is used to recursively look through the teaser template (where teaser parts are defined)
    // and assemble the parts to form a complete Teaser structure
    const assembleTeaserParts = (
      container: FocusableItem,
      parts: ITeaserPartsStructure[]
    ) => {
      parts.forEach((part) => {
        const displayObj = this.getDataBlendedStructure(
          part,
          props.teaserItem.teaserData
        );
        container.addChild(displayObj);

        if (part.parts && part.parts.length > 0) {
          assembleTeaserParts(container, part.parts);
        }
      });
    };
    assembleTeaserParts(this, structure.parts); // 'this' is a FocusableItem container
  }
}

export default Teaser;
