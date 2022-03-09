import { TextStyleAlign } from "pixi.js";

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

export interface ITeaserPartsStructure extends IStructure {
  structureType:
    | "rect"
    | "roundedRect"
    | "roundedRect_top"
    | "roundedRect_bot"
    | "text"; // if 'roundedRect' then 'borderRadius' needs to be passed
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
  TEASER_H = "TEASER_H",
  TEASER_V = "TEASER_V",
  DEFAULT = "DEFAULT",
}

export interface ITeaserInfo {
  teaserType: ETeaserType;
  meta: ITeaserMeta[];
}

export interface ITeaserMeta {
  id: number;
  title: string;
  description: string;
  fsk?: string;
  duration?: string;
  imageUrl: string;
}
