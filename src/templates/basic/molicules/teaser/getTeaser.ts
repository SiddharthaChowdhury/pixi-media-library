import { Container } from "pixi.js";
import { ETeaserType, ITeaserInfo, ITeaserPartsStructure, ITeaserStructure } from "../../../../types/teaser.types"
import { teaserDefault_structureData } from "../../../template_data/teasers.template_data";
import atoms from "../../atoms";
import { IRectProps } from "../../atoms/rect/rect";

interface IGetTeaserProp {
    teaserData: ITeaserInfo;
    x: number;
    y: number;
    index: number;
}

export const getTeaser = ({teaserData, x, y, index}: IGetTeaserProp): Container => {
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

            switch(part.structureType) {
                case 'roundedRect_bot':
                    container.addChild(atoms.getRect({
                        ...commonRectProps,
                        borderRadiusSide: 'only-bottom'
                    }));
                    break;
                case 'roundedRect_top':
                    container.addChild(atoms.getRect({
                        ...commonRectProps,
                        borderRadiusSide: 'only-top'
                    }));
                    break;
                default:
                    container.addChild(atoms.getRect({
                        ...commonRectProps
                    }));
                    break;
            }

            if(part.parts && part.parts.length > 0) {
                drillParts(container, part.parts);
            }
        })
    }

    drillParts(teaserContainer, structure.parts);

    // -------------------------
    teaserContainer.x = x;
    teaserContainer.y = y;
    teaserContainer.name = `TEASER___#${index}`
    return teaserContainer;

}