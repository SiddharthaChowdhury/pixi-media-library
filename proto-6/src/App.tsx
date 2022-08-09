import * as RP from "@inlet/react-pixi";
import {
  ERectBorderRadiusType,
  LoadingSpinner,
  Rect,
} from "./components/atoms";

const App = () => {
  return (
    <RP.Container>
      {/* <RP.Sprite image={logo} x={640} y={100} anchor={0.5} /> */}
      <Rect
        x={20}
        y={100}
        width={500}
        height={600}
        borderRadius={20}
        borderRadiusSide={ERectBorderRadiusType.BOTTOM_CORNERS}
        borderColor={"#fbfbfb"}
        borderWidth={3}
      />

      <LoadingSpinner x={50} y={50} />
    </RP.Container>
  );
};

export default App;
