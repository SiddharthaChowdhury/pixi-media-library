import { Rect } from "react-konva";
import { boxDiam } from "../../../config/dimension";

interface ISideNavExpandedProps {}

const SideNavExpanded = ({}: ISideNavExpandedProps) => {
  return (
    <>
      <Rect
        x={0}
        y={0}
        width={boxDiam.sideNav_exapnded.width}
        height={boxDiam.sideNav_exapnded.height}
        fill={"#19191E"}
      />
    </>
  );
};

export default SideNavExpanded;
