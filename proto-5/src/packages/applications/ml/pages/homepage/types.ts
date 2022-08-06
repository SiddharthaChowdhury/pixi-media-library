export interface IHomePageStructure {
  type: "stage" | "formatlane";
  title?: string;
  description?: string;
  backgroundImgUrl?: string;
  stageSubtitle?: string;
  channelLogo?: string;

  teasers?: { id: number; imageUrl: string }[];
}
