import { Container } from "@inlet/react-pixi/legacy";
import { useEffect, useRef } from "react";
import { ERectBorderRadiusType, Rect } from "../../../components/atoms";
import { INavigationMapInst } from "../../../navigation/NavigationMap";
import utilNavigation from "../../../navigation/utilNavigation";
import { data__dummy } from "../../Home/data_dummy";
import { HomepageColID } from "../types";
import Lane from "./laneRow/Lane";

interface IProps {
  layerId: number;
  navMapObj: INavigationMapInst;
}

const COL_VS_ID = HomepageColID.MAIN;
const HomepageMainCol = ({ layerId, navMapObj }: IProps) => {
  const { current: boxSize } = useRef({
    x: 80,
    y: 0,
    width: 1200,
    height: 720,
  });

  // Register Column to Navigation
  useEffect(() => {
    if (!navMapObj) return;
    navMapObj.addNewVs({}, COL_VS_ID, layerId!);
  }, [layerId, navMapObj]);

  return (
    <Container
      x={boxSize.x}
      y={boxSize.y}
      name={utilNavigation.generateVsId(layerId, COL_VS_ID)}
    >
      {/* <Rect
        x={0}
        y={0}
        width={100}
        height={100}
        borderRadius={20}
        borderRadiusSide={ERectBorderRadiusType.BOTTOM_CORNERS}
        borderColor={"#fbfbfb"}
        borderWidth={3}
      /> */}
      <Lane laneData={data__dummy.items[0]} width={boxSize.width} />
    </Container>
  );
};

export default HomepageMainCol;
