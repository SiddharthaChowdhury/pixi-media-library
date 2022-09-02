export interface ITeaserData {
  teaserName: string;
  teaserType: ETeaserType;
  teaserData: ITeaserMeta;
}
interface IStructure {
  name: ETeaserPartname;
  top: number;
  left: number;
  width: number;
  height: number;
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number[];
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  textAlign?: "left" | "right" | "center";
}

export interface ITeaserPartsStructure extends IStructure {
  isContainer?: boolean; // if this Part has children-pars, this its 'true
  borderRadius?: number[];
  backgroundColor?: string; // Fill-color
  zIndex?: string;
  maxLineEllipsis?: number;
  parts?: ITeaserPartsStructure[];
}

export interface ITeaserStructure {
  boxDiam: {
    width: number;
    height: number;
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number[];
    backgroundColor?: string; // Fill-color
    name?: ETeaserPartname;
  };
  parts: ITeaserPartsStructure[];
}

export enum ETeaserPartname {
  TEASER_FRAME = "TEASER_FRAME",
  IMAGE = "IMAGE",
  TITLE = "TITLE",
  DESC = "DESCRIPTION",
}

export enum ETeaserType {
  FORMAT = "FORMAT",
  EPISODE = "EPISODE",
  DEFAULT = "DEFAULT",
}

export interface ITeaserInfo {
  teaserType: ETeaserType;
  meta: ITeaserMeta[];
}

export interface ITeaserMeta {
  id: number;
  pageMapId?: string; // ID used in navidation map
  title?: string;
  description?: string;
  fsk?: string;
  duration?: string;
  imageUrl: string;
}
