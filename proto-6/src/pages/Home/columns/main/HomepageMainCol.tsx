import { Container } from "@inlet/react-pixi/legacy";
import { useRef } from "react";
import { boxDiam } from "../../../../config/dimension";
import { INavigationMapInst } from "../../../../navigation/NavigationMap";
import utilNavigation from "../../../../navigation/utilNavigation";
import { data__dummy } from "../../data_dummy";
import { HomepageColID } from "../types";
import Lane from "./laneRow/Lane";

interface IProps {
  layerId: number;
  navMapObj: INavigationMapInst;
}

interface IVsLaneRecordData {
  height: number;
  y: number;
  name: string;
}

type TVslanerecord = { [laneId: string]: IVsLaneRecordData };
/**
 * Responsibility of a Column or VS
 * 1. Pass down the props a way to register the focusable Item (to do so: layerIndex, ColumnIndex, rowIndex and focusableItemIndex is required)
 * 2. Record the height of each row for VerticalScrolling (VS)
 */

const COL_VS_ID = HomepageColID.MAIN;
const HomepageMainCol = ({ layerId, navMapObj }: IProps) => {
  const vsLaneRecord = useRef<TVslanerecord>({});

  // 2. Record height of each Lane/Row
  const addVsLaneRecord = (laneName: string, laneRecord: IVsLaneRecordData) => {
    vsLaneRecord.current[laneName] = laneRecord;
  };

  // 1. Register Lane and Item to Navigation
  const registerFocusableChild = (laneIndex: number, itemIndex: number) => {
    const itemNameId = utilNavigation.generateItemId(
      layerId,
      COL_VS_ID,
      laneIndex,
      itemIndex
    );
    navMapObj.addItemToRow(itemNameId);
  };

  // Derives the next item's pos.Y in VS
  const getNextLanePosY = (): number => {
    const rowRecordArr: IVsLaneRecordData[] = Object.values(
      vsLaneRecord.current
    );

    if (rowRecordArr.length) {
      const lastItem = rowRecordArr[rowRecordArr.length - 1];
      return lastItem.height + lastItem.y;
    }

    return 0;
  };

  const pageRows = [data__dummy.items[0]];
  return (
    <Container
      x={boxDiam.mainContent.x}
      y={boxDiam.mainContent.y}
      name={utilNavigation.generateVsId(layerId, COL_VS_ID)}
    >
      {pageRows.map((row, index) => {
        const rowIndex = index;
        const laneName = utilNavigation.generateLaneId(
          layerId,
          COL_VS_ID,
          rowIndex
        );
        return (
          <Lane
            key={laneName}
            x={0}
            y={getNextLanePosY()}
            name={laneName}
            laneData={row.data}
            onRegisterFocusableItem={(itemIndex: number) =>
              registerFocusableChild(rowIndex, itemIndex)
            }
            onRegisterToVsRecord={(laneHeight: number, posY: number) =>
              addVsLaneRecord(laneName, {
                name: laneName,
                y: posY,
                height: laneHeight,
              })
            }
          />
        );
      })}
    </Container>
  );
};

export default HomepageMainCol;
