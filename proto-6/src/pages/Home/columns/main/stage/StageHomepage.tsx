import { Container } from "@inlet/react-pixi/legacy";
import { useEffect } from "react";
import { ButtonCircle, Stage } from "../../../../../components/molecules";
import { boxDiam } from "../../../../../config/dimension";
import utilNavigation from "../../../../../navigation/utilNavigation";

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
  const BOOKMARK_BTN_INDEX = 2;
  const spaceBetween = 13;

  useEffect(() => {
    // letting VerticalScroller know about the height and pos.y of this Component
    props.onRegisterToVsRecord(boxDiam.stageHomepage.height, 0);

    // Not to be added manually like below, as there is a chance of index mismatch with navigationMap registry
    props.onRegisterFocusableChild(PLAY_BTN_INDEX); // Register focusable Item
    props.onRegisterFocusableChild(INFO_BTN_INDEX); // Register fucusable Button
    props.onRegisterFocusableChild(BOOKMARK_BTN_INDEX); // Register fucusable Button
  }, []);

  return (
    <Stage
      name={props.name}
      x={props.x}
      y={props.y}
      width={boxDiam.stageHomepage.width}
      height={boxDiam.stageHomepage.height}
      borderColor={"#ffffff"}
      borderWidth={1}
      borderRadius={boxDiam.stageHomepage.borderRadius}
      backgroundImage={props.bgImg}
    >
      <Container x={50} y={450}>
        <ButtonCircle
          x={0}
          y={0}
          radius={boxDiam.btnCircle.width / 2}
          border={{ color: "#ffffff", alpha: 1, width: 2 }}
          background={{ color: "#000", alpha: 0.5 }}
          name={utilNavigation.generateItemIdFromLane(
            props.name,
            PLAY_BTN_INDEX
          )}
        />

        <ButtonCircle
          x={boxDiam.btnCircle.width + spaceBetween}
          y={0}
          radius={boxDiam.btnCircle.width / 2}
          border={{ color: "#ffffff", alpha: 1, width: 2 }}
          background={{ color: "#000", alpha: 0.5 }}
          name={utilNavigation.generateItemIdFromLane(
            props.name,
            INFO_BTN_INDEX
          )}
        />

        <ButtonCircle
          x={(boxDiam.btnCircle.width + spaceBetween) * 2}
          y={0}
          radius={boxDiam.btnCircle.width / 2}
          border={{ color: "#ffffff", alpha: 1, width: 2 }}
          background={{ color: "#000", alpha: 0.5 }}
          name={utilNavigation.generateItemIdFromLane(
            props.name,
            BOOKMARK_BTN_INDEX
          )}
        />
      </Container>
    </Stage>
  );
};

export default StageHomepage;
