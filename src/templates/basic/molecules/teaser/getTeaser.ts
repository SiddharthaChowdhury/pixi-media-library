import { Container, DisplayObject, Graphics, Sprite, Text, Ticker } from "pixi.js";
import { setSpriteSizeCover } from "../../../../pixi/helpers/__spriteHelper";
import pixiClass from "../../../../pixi/pixiClass";
import { ETeaserPartname, ITeaserMeta, ITeaserPartsStructure } from "../../../../types/teaser.types"
import { teaserDefault_structureData } from "../../../template_data/teasers.template_data";
import atoms from "../../atoms";
import { IRectProps } from "../../atoms/rect/rect";
import { getLoadingTeaser, ILoading } from "../loading/getLoading";

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

            const displayObj = getDataBlendedStructure(part, teaserData);
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

const getDataBlendedStructure = (part: ITeaserPartsStructure, teaserData: ITeaserMeta): DisplayObject => {
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

    switch(part.name) {
        case ETeaserPartname.IMAGE:
            const rect = atoms.getRect({
                ...commonRectProps,
                borderRadiusSide: 'only-top'
            });

            const loadingData: ILoading = getLoadingTeaser({
                ...commonRectProps,
                borderRadiusSide: 'only-top'
            });

            return getTeaserImage(rect, teaserData, loadingData);
        case ETeaserPartname.TITLE:
            return getTeaserText(part, teaserData.title, 2);
        case ETeaserPartname.DESC:
            return getTeaserText(part, teaserData.description, 2);
        default:
            return atoms.getRect({
                ...commonRectProps
            });
            
    }
}

const getTeaserImage = (partObj: Graphics, teaserData: ITeaserMeta, loadingData: ILoading): Container => {

    const teaserImgCont = new Container();
    
    teaserImgCont.width = partObj.width;
    teaserImgCont.height = partObj.height;
    teaserImgCont.name = `${partObj.name}_CONT`;
    
    const TEASER_ID = `${teaserData.id}_teaser`;
    teaserImgCont.addChild(loadingData.loadingCont);

    pixiClass.loadAsset([
        {uniqName: TEASER_ID, src: teaserData.imageUrl}
    ], pixiClass.pixiLoaderPool.teaserLoader)
    .then((loader) => {
        const teaserImgTexture = loader.resources[TEASER_ID].texture;

        const TeaserImgSprite = new Sprite(teaserImgTexture);
        const maskGraphic = setSpriteSizeCover(TeaserImgSprite, partObj.width, partObj.height, false, partObj);
        
        // TODO: IMPORTANT!! This delay is only for loading test
        setTimeout(() => {
            loadingData.stopLoading();
            teaserImgCont.removeChildAt(0); // removing loading spinner
            teaserImgCont.addChild(maskGraphic, TeaserImgSprite);
        }, 1000)
    })
    return teaserImgCont;
}

const getTeaserText = (part: ITeaserPartsStructure, text: string, maxLineEllipsis?: number) => {
    let backgroundRect = null;

    if(part.backgroundColor) {
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
            borderRadiusSide: part.structureType === 'roundedRect_bot' ? 'only-bottom' : part.structureType === 'roundedRect_top' ? 'only-top' : 'all-default'
        })
    }

    const partDisplayObjText = atoms.getText({
        text, 
        textStyle: {
            wordWrapWidth: backgroundRect ? part.width - 10 : part.width,
            wordWrap: true,
            fontFamily: part.fontFamily ||'Arial',
            align: part.textAlign,
            fill: part.fontColor,
            fontSize: part.fontSize || 18,
        }, 
        maxLineEllipsis
    });

    if(backgroundRect) {
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
}