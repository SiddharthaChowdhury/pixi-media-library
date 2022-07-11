import { Container, DisplayObject, Graphics, Sprite } from "pixi.js";

import {
  ETeaserPartname,
  ETeaserType,
  ITeaserMeta,
  ITeaserPartsStructure,
  ITeaserStructure,
} from "./types";
import atoms from "../atoms";
import { setSpriteSizeCover } from "../../pixi-utils/sprite-helper";
import { IRectProps } from "../atoms/rect/rect";
import {
  episodeTeaser_StructureData,
  formatTeaser_StructureData,
} from "./teaser_template";

export interface IGetTeaserProp {
  teaserType: ETeaserType;
  teaserData: ITeaserMeta;
  id: string;
}

export const getTeaserStructureData = (
  teaserType: ETeaserType
): ITeaserStructure => {
  switch (teaserType) {
    case ETeaserType.FORMAT:
      return formatTeaser_StructureData;
    case ETeaserType.EPISODE:
    default:
      return episodeTeaser_StructureData;
  }
};

class Teaser {
  private getTeaserText = (
    part: ITeaserPartsStructure,
    text: string,
    maxLineEllipsis?: number
  ) => {
    let backgroundRect = null;

    if (part.backgroundColor) {
      backgroundRect = atoms.getRect({
        x: 0,
        y: 0,
        width: part.width,
        height: part.height,
        borderRadius: part.borderRadius,
        borderColor: part.borderColor,
        borderWidth: part.borderWidth,
        fillColor: part.backgroundColor,
        name: part.name,
        borderRadiusSide:
          part.structureType === "roundedRect_bot"
            ? "only-bottom"
            : part.structureType === "roundedRect_top"
            ? "only-top"
            : "all-default",
      });
    }

    const partDisplayObjText = atoms.getText({
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
    partObj: Graphics,
    teaserData: ITeaserMeta
  ): Container => {
    const teaserImgCont = new Container();

    teaserImgCont.width = partObj.width;
    teaserImgCont.height = partObj.height;
    teaserImgCont.name = `${partObj.name}_CONT`;

    let sprite = Sprite.from(teaserData.imageUrl);
    const maskGraphic = setSpriteSizeCover(
      sprite,
      partObj.width,
      partObj.height,
      false,
      partObj
    );
    teaserImgCont.addChild(maskGraphic, sprite);

    return teaserImgCont;
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
        const rect = atoms.getRect({
          ...commonRectProps,
          borderRadiusSide: "only-top",
        });

        // const loading = new Loading({
        //   ...commonRectProps,
        //   borderRadiusSide: "only-top",
        // });

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
        return atoms.getRect({
          ...commonRectProps,
        });
    }
  };

  public getTeaser = ({
    teaserType,
    teaserData,
    id,
  }: IGetTeaserProp): Container => {
    const structure = getTeaserStructureData(teaserType);
    const teaserContainer = new Container();
    const mainBox = atoms.getRect({
      ...structure.boxDiam,
      x: 0,
      y: 0,
    });

    teaserContainer.addChild(mainBox);

    // This is used to recursively look through the teaser template (where teaser parts are defined)
    // and assemble the parts to form a complete Teaser structure
    const assembleTeaserParts = (
      container: Container,
      parts: ITeaserPartsStructure[]
    ) => {
      parts.forEach((part) => {
        const displayObj = this.getDataBlendedStructure(part, teaserData);
        container.addChild(displayObj);

        if (part.parts && part.parts.length > 0) {
          assembleTeaserParts(container, part.parts);
        }
      });
    };

    assembleTeaserParts(teaserContainer, structure.parts);

    // -------------------------
    teaserContainer.name = id;
    // teaserContainer.pivot.x = teaserContainer.width / 2;
    // teaserContainer.pivot.y = teaserContainer.height / 2;

    // anim_movement(teaserContainer).appear(
    //   x + teaserContainer.width / 2,
    //   y + teaserContainer.height / 2
    // );

    // teaserContainer.x = x + teaserContainer.width / 2;
    // teaserContainer.y = y + teaserContainer.height / 2;
    return teaserContainer;
  };
}

export default Teaser;
