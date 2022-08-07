import * as PIXI from "pixi.js-legacy";
import { Container, DisplayObject, Graphics } from "pixi.js-legacy";

import {
  ETeaserPartname,
  ETeaserPartStructureType,
  ETeaserType,
  ITeaserData,
  ITeaserMeta,
  ITeaserPartsStructure,
  ITeaserStructure,
} from "./types";
import imageHelper from "../../../pixi-utils/image-helper";
import {
  ERectBorderRadiusType,
  getRect,
  getText,
  IRectProps,
  loadingSpinner,
} from "../../atoms";
import FocusableItem from "../../../containers/FocusableItem";
import { INavMeta, teaserhelper } from "..";
import { IBounds_orig } from "../../..";
import utilNavigation from "../../../../navigation/utilNavigation";

interface ITeaserOptions extends IBounds_orig {
  navMeta: INavMeta;
  teaserItem: ITeaserData;
  index: number;
  loader: any;
}

class Teaser extends FocusableItem {
  private loader: any;

  private structureTypeToRectBorderRadius = (
    structureType: ETeaserPartStructureType
  ): ERectBorderRadiusType => {
    if (structureType === ETeaserPartStructureType.ROUNDED_RECT__BOT_ONLY) {
      return ERectBorderRadiusType.BOTTOM_CORNERS;
    }

    if (structureType === ETeaserPartStructureType.ROUNDED_RECT__TOP_ONLY) {
      return ERectBorderRadiusType.TOP_CORNERS;
    }

    if (structureType === ETeaserPartStructureType.ROUNDED_RECT) {
      return ERectBorderRadiusType.ALL_CORNERS;
    }

    return ERectBorderRadiusType.NONE;
  };

  private getTeaserText = (
    part: ITeaserPartsStructure,
    text: string,
    maxLineEllipsis?: number
  ) => {
    let backgroundRect = null;

    if (part.backgroundColor) {
      backgroundRect = getRect({
        x: 0,
        y: 0,
        width: part.width,
        height: part.height,
        borderRadius: part.borderRadius,
        borderColor: part.borderColor,
        borderWidth: part.borderWidth,
        fillColor: part.backgroundColor,
        name: part.name,
        borderRadiusSide: part.borderRadius
          ? this.structureTypeToRectBorderRadius(part.structureType)
          : ERectBorderRadiusType.NONE,
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
    const imageContainer = new PIXI.Container();
    imageContainer.width = partObj.width;
    imageContainer.height = partObj.height;
    imageContainer.name = `${partObj.name}_CONT`;

    const { showSpinner, stopSpinner, putInsideContainer } = loadingSpinner(30); // 30px redius
    putInsideContainer(imageContainer, {
      x: partObj.width / 2,
      y: partObj.height / 2,
    });
    showSpinner();

    const id = `IMAGE_${teaserData.id}`;

    this.loader.add(
      { name: id, url: teaserData.imageUrl },
      (resource: PIXI.LoaderResource) => {
        const texture = PIXI.Texture.from(resource.url);
        const loadedSprite = PIXI.Sprite.from(texture);

        imageHelper(loadedSprite).cover(
          { width: partObj.width, height: partObj.height },
          partObj
        );

        stopSpinner();

        imageContainer.removeChildren();
        imageContainer.addChild(partObj, loadedSprite);
      }
    );

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
      borderRadius: part.borderRadius,
      borderColor: part.borderColor,
      borderWidth: part.borderWidth,
      fillColor: part.backgroundColor,
      name: part.name,
    };

    switch (part.name) {
      case ETeaserPartname.IMAGE:
        const rect = getRect({
          ...commonRectProps,
          borderRadiusSide: commonRectProps.borderRadius
            ? this.structureTypeToRectBorderRadius(part.structureType)
            : ERectBorderRadiusType.NONE,
        });

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
        return getRect({
          ...commonRectProps,
        });
    }
  };

  constructor(props: ITeaserOptions) {
    const { layerId, rowId, parentColId } = props.navMeta;
    super({
      width: props.width,
      height: props.height,
      name: utilNavigation.generateItemId(
        layerId,
        parentColId,
        rowId,
        props.index
      ),
      x2: props.x2,
      y2: props.y2,
    });

    this.x = props.x;
    this.y = props.y;

    this.loader = props.loader;

    const structure = teaserhelper().getTeaserStructureData(
      props.teaserItem.teaserType
    );
    const mainBox = getRect({
      ...structure.boxDiam,
      x: 0,
      y: 0,
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
