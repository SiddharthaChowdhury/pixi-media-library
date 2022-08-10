import StageHomepage from "../stage/StageHomepage";

export enum ELaneType {
  STAGE = "stage",
  LANE_FORMAT = "lane_format",
}

interface ILaneProps {
  onRegisterFocusableItem: (itemIndex: number) => void;
  onRegisterToVsRecord: (laneHeight: number, posY: number) => void;
  name: string;
  laneData: any;
  x: number;
  y: number;
}

const Lane = ({
  laneData,
  onRegisterFocusableItem,
  onRegisterToVsRecord,
  name,
  x,
  y,
}: ILaneProps) => {
  const getLaneContainer = () => {
    switch (laneData.type) {
      case ELaneType.STAGE:
      case ELaneType.LANE_FORMAT:
      default:
        return null;
    }
  };

  return (
    <StageHomepage
      bgImg={laneData.tvShowBackgroungImageUrl}
      onRegisterFocusableChild={onRegisterFocusableItem}
      onRegisterToVsRecord={onRegisterToVsRecord}
      name={name}
      x={x}
      y={y}
    />
  );
};

export default Lane;
