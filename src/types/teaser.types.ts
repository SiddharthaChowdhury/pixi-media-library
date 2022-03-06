interface IStructure{
    name: string;
    top: number;
    left: number;
    width: number;
    height: number;
    borderWidth?: number;
    borderColor?: number;
    borderRadius?: number | number[]; // [tL, tR, bR, bL]
}

interface ITeaserPartsStructure extends IStructure{
    structureType: 'rect' | 'roundedRect'; // if 'roundedRect' then 'borderRadius' needs to be passed
    isContainer?: boolean; // if this Part has children-pars, this its 'true
    borderRadius?: number | number[]; // [tL, tR, bR, bL]
    backgroundColor?: number; // Fill-color
    zIndex?: string;
    parts?: ITeaserPartsStructure[];
}

export interface ITeaserStructure {
    boxDiam: {
        width: number;
        height: number;
        borderWidth?: number;
        borderColor?: number;
        borderRadius?: number | number[]; // [tL, tR, bR, bL]
        backgroundColor?: number; // Fill-color
        name?: string;
    };
    parts: ITeaserPartsStructure[];
}

export enum ETeaserType {
    TEASER_H = 'TEASER_H',
    TEASER_V = 'TEASER_V',
}

export interface ITeaserInfo {
    id: number;
    title: string;
    teaserType: ETeaserType;
    description: string;
    fsk?: string;
    duration?: string;
    imageUrl: string;
}