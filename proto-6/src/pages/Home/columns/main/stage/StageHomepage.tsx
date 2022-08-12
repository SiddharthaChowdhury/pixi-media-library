import { Container } from "@inlet/react-pixi/legacy";
import { useContext, useEffect } from "react";
import { ButtonCircle, Stage } from "../../../../../components/molecules";
import { boxDiam } from "../../../../../config/dimension";
import useNavigation from "../../../../../navigation/useNavigation";
import utilNavigation from "../../../../../navigation/utilNavigation";
import { HomePageCtx } from "../../../HomePage";

interface IStageHomepageProps {
  x: number;
  y: number;
  name: string;
  bgImg: string;
  onRegisterFocusableChild: (itemIndex: number) => void;
  onRegisterToVsRecord: (laneHeight: number, posY: number) => void;
}

const StageHomepage = (props: IStageHomepageProps) => {
  const PLAY_BTN_INDEX = 0;
  const INFO_BTN_INDEX = 1;
  const spaceBetween = 13;

  const homePageCtx = useContext(HomePageCtx);
  const { focusedItemName } = useNavigation(homePageCtx.navObj);

  useEffect(() => {
    // letting VerticalScroller know about the height and pos.y of this Component
    props.onRegisterToVsRecord(boxDiam.stageHomepage.height, 0);

    // Not to be added manually like below, as there is a chance of index mismatch with navigationMap registry
    props.onRegisterFocusableChild(PLAY_BTN_INDEX); // Register focusable Item
    props.onRegisterFocusableChild(INFO_BTN_INDEX); // Register fucusable Button
  }, []);

  useEffect(() => {
    console.log(">>>>>> staGE ", focusedItemName);
  }, [focusedItemName]);

  const playBtnName = utilNavigation.generateItemIdFromLane(
    props.name,
    PLAY_BTN_INDEX
  );
  const infoBtnName = utilNavigation.generateItemIdFromLane(
    props.name,
    INFO_BTN_INDEX
  );

  return (
    <Stage
      name={props.name}
      x={props.x}
      y={props.y}
      width={boxDiam.stageHomepage.width}
      height={boxDiam.stageHomepage.height}
      borderColor={"#C8C3C3"}
      borderWidth={1}
      borderRadius={boxDiam.stageHomepage.borderRadius}
      backgroundImage={props.bgImg}
    >
      <Container x={50} y={450}>
        <ButtonCircle
          x={0}
          y={0}
          radius={boxDiam.btnCircle.width / 2}
          border={{ color: "#C8C3C3", alpha: 1, width: 2 }}
          background={{ color: "#000", alpha: 0.2 }}
          name={playBtnName}
          isFocused={focusedItemName === playBtnName}
        />

        <ButtonCircle
          x={boxDiam.btnCircle.width + spaceBetween}
          y={0}
          radius={boxDiam.btnCircle.width / 2}
          border={{ color: "#C8C3C3", alpha: 1, width: 2 }}
          background={{ color: "#000", alpha: 0.2 }}
          name={infoBtnName}
          isFocused={focusedItemName === infoBtnName}
        />
      </Container>
    </Stage>
  );
};

export default StageHomepage;
