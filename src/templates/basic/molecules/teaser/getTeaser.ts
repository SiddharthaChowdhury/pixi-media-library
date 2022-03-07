import { Container, DisplayObject, Graphics, Sprite, Text } from "pixi.js";
import { setSpriteSizeCover } from "../../../../pixi/helpers/__spriteHelper";
import pixiClass from "../../../../pixi/pixiClass";
import { ETeaserPartname, ITeaserMeta, ITeaserPartsStructure } from "../../../../types/teaser.types"
import { teaserDefault_structureData } from "../../../template_data/teasers.template_data";
import atoms from "../../atoms";
import { IRectProps } from "../../atoms/rect/rect";

interface IGetTeaserProp {
    teaserData: ITeaserMeta;
    index: number;
    x: number;
    y: number;
}

export const getTeaser = ({teaserData, index, x, y}: IGetTeaserProp): Container => {
    // if(teaserData.teaserType === ETeaserType.DEFAULT) teaserDefault_structureData
    const structure = teaserDefault_structureData;
    const teaserContainer = new Container();
    const mainBox = atoms.getRect({
        ...structure.boxDiam,
        x: 0,
        y: 0
    });

    teaserContainer.addChild(mainBox);

    const drillParts = (container: Container, parts:ITeaserPartsStructure[]) => {
        parts.forEach((part) => {

            const displayObj = getRectByStructureType(part, teaserData);
            container.addChild(displayObj);
            

            if(part.parts && part.parts.length > 0) {
                drillParts(container, part.parts);
            }
        })
    }

    drillParts(teaserContainer, structure.parts);

    // -------------------------
    teaserContainer.name = `TEASER___#${index}`
    teaserContainer.pivot.x = teaserContainer.width / 2;
    teaserContainer.pivot.y = teaserContainer.height / 2;

    teaserContainer.x = x + teaserContainer.width / 2;
    teaserContainer.y = y +  teaserContainer.height / 2;
    return teaserContainer;
};

const getRectByStructureType = (part: ITeaserPartsStructure, teaserData: ITeaserMeta): DisplayObject => {
    const commonRectProps: IRectProps = {
        x: part.left,
        y: part.top,
        width: part.width,
        height: part.height,
        borderRadius: part.borderRadius,
        borderColor: part.borderColor,
        borderWidth: part.borderWidth,
        fillColor: part.backgroundColor,
        name: part.name
    }
    let partDisplayObj: DisplayObject | null = null;
    
    switch(part.structureType) {
        case 'roundedRect_bot':
            partDisplayObj = atoms.getRect({
                ...commonRectProps,
                borderRadiusSide: 'only-bottom'
            });
            break;
        case 'roundedRect_top':
            const rect = atoms.getRect({
                ...commonRectProps,
                borderRadiusSide: 'only-top'
            });

            if(part.name === ETeaserPartname.IMAGE) {
                const img = getTeaserImage(rect, part.name, teaserData);
                partDisplayObj = img
            } else {
                partDisplayObj = rect;
            }
            
            break;
        case 'text': 
            const partDisplayObjText = atoms.getText({
                text: teaserData.title, 
                textStyle: {
                    wordWrapWidth: part.width,
                    wordWrap: true,
                    fontFamily: part.fontFamily,
                    align: part.textAlign,
                    fill: part.fontColor,
                    fontSize: part.fontSize || 18,
                }, 
                maxLineEllipsis: 2
            })
            
            partDisplayObjText.x = part.left;
            partDisplayObjText.y = part.top;
            partDisplayObjText.name = part.name;

            partDisplayObj = partDisplayObjText;
            break;
        default:
            partDisplayObj = atoms.getRect({
                ...commonRectProps
            });
            break;
    };

    return partDisplayObj;
}

const getTeaserImage = (partObj: Graphics, partName: ETeaserPartname, teaserData: ITeaserMeta): Container => {
    const teaserImgCont = new Container();
    
    teaserImgCont.width = partObj.width;
    teaserImgCont.height = partObj.height;
    teaserImgCont.name = `${partObj.name}_CONT`;
    
    // if(partName === ETeaserPartname.IMAGE) {
        const TEASER_ID = `${teaserData.id}_teaser`;

        pixiClass.loadAsset([
            {uniqName: TEASER_ID, src: teaserData.imageUrl}
        ], pixiClass.pixiLoaderPool.teaserLoader)
        .then((loader) => {
            const teaserImgTexture = loader.resources[TEASER_ID].texture;
            console.log("TEST loader ", loader.resources[TEASER_ID]);

            const TeaserImgSprite = new Sprite(teaserImgTexture);
            const maskGraphic = setSpriteSizeCover(TeaserImgSprite, partObj.width, partObj.height, false, partObj);
            

            
            teaserImgCont.addChild(maskGraphic, TeaserImgSprite);
        })
    // }
    return teaserImgCont;
}