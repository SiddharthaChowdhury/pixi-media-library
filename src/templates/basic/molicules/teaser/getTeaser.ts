import { Container } from "pixi.js";
import { ITeaserInfo, ITeaserStructure } from "../../../../types/teaser.types"
import atoms from "../../atoms";

interface IGetTeaserProp {
    teaserData: ITeaserInfo;
    structure: ITeaserStructure;
    x: number;
    y: number;
}

export const getTeaserFrame = ({teaserData, structure, x, y}: IGetTeaserProp) => {
    const Wrapper = new Container();
    const WrapperRect = atoms.getRect({
        x,
        y,
        width: structure.boxDiam.width,
        height: structure.boxDiam.height,
        borderWidth: structure.boxDiam.borderWidth,
        borderColor: structure.boxDiam.borderColor,
        borderRadius: structure.boxDiam.borderRadius as number,
        fillColor: structure.boxDiam.backgroundColor,
        name: structure.boxDiam.name,
        borderRadiusSide: 'only-top'
    });
    const WrapperRectCurve = atoms.getRect({
        x,
        y: 400,
        width: structure.boxDiam.width,
        height: structure.boxDiam.height,
        borderWidth: structure.boxDiam.borderWidth,
        borderColor: structure.boxDiam.borderColor,
        borderRadius: structure.boxDiam.borderRadius as number,
        borderRadiusSide: 'only-bottom',
        fillColor: structure.boxDiam.backgroundColor,
        name: structure.boxDiam.name || "",
    })

    if(structure.boxDiam.name) Wrapper.name = `${structure.boxDiam.name}`
    Wrapper.addChild(WrapperRect, WrapperRectCurve);

    return Wrapper;
}