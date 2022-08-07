import { TextStyleAlign } from "pixi.js-legacy";

interface IStructure {
  name: ETeaserPartname;
  top: number;
  left: number;
  width: number;
  height: number;
  borderWidth?: number;
  borderColor?: number;
  borderRadius?: number;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: number;
  textAlign?: TextStyleAlign;
}

export enum ETeaserPartStructureType {
  RECT = "rect",
  ROUNDED_RECT = "roundedRect",
  ROUNDED_RECT__TOP_ONLY = "roundedRect_top",
  ROUNDED_RECT__BOT_ONLY = "roundedRect_bot",
  TEXT_RECT = "text",
}

export interface ITeaserPartsStructure extends IStructure {
  structureType: ETeaserPartStructureType;
  isContainer?: boolean; // if this Part has children-pars, this its 'true
  borderRadius?: number;
  backgroundColor?: number; // Fill-color
  zIndex?: string;
  maxLineEllipsis?: number;
  parts?: ITeaserPartsStructure[];
}

export interface ITeaserStructure {
  boxDiam: {
    width: number;
    height: number;
    borderWidth?: number;
    borderColor?: number;
    borderRadius?: number;
    backgroundColor?: number; // Fill-color
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
