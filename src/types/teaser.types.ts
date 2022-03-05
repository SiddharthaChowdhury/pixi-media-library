interface IStructureBorderRadius {
    borderRadius?: string;
    borderBottomLeftRadius?: string;
    borderBottomRightRadius?: string;
    borderTopLeftRadius?: string;
    borderTopRightRadius?: string;
}

interface IStructure{
    name: string;
    top: string;
    left: string;
    width: string;
    height: string;
    border?: string; // example - "1px solid #000"
    borderRadius?: IStructureBorderRadius;
}


interface ITeaserPartsStructure extends IStructure{
    backgroundColor?: string;
    zIndex?: string;
}

export interface ITeaserStructure {
    boxDiam: {
        width: string;
        height: string;
        border?: string; // example - "1px solid #000"
        borderRadius?: IStructureBorderRadius;
    };
    parts: ITeaserPartsStructure[];
}

export enum ETeaserType {
    TEASER_H = 'TEASER_H',
    TEASER_V = 'TEASER_V',
}

export interface ITeaserInfo {
    title: string;
    teaserType: ETeaserType;
    description: string;
    fsk?: string;
    duration?: string;
    imageUrl: string;
}