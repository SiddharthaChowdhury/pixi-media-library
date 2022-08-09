import { Stage } from "../../../../components/molecules";

export enum ELaneType {
  STAGE = "stage",
  LANE_FORMAT = "lane_format",
}

interface ILaneProps {
  laneData: any;
  width: number;
}

const Lane = ({ laneData, width }: ILaneProps) => {
  const getLaneContainer = () => {
    switch (laneData.type) {
      case ELaneType.STAGE:
      case ELaneType.LANE_FORMAT:
    }
  };

  return (
    <Stage
      x={0}
      y={0}
      width={width}
      height={LaneHeight[ELaneType.STAGE]}
      borderColor={"#ffffff"}
      borderWidth={1}
      borderRadius={30}
      backgroundImage={laneData.data.tvShowBackgroungImageUrl}
    />
  );
};

export const LaneHeight = {
  [ELaneType.STAGE]: 540,
  [ELaneType.LANE_FORMAT]: 400,
};
export default Lane;
