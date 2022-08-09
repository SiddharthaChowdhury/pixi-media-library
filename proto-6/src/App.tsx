import logo from "./logo.svg";
import * as RP from "@inlet/react-pixi";
import Rect from "./components/atoms/rect/Rect";
import { ERectBorderRadiusType } from "./components/atoms/rect/types";

const App = () => {
  return (
    <RP.Container>
      {/* <RP.Sprite image={logo} x={640} y={100} anchor={0.5} /> */}
      <Rect
        x={640}
        y={100}
        width={500}
        height={600}
        borderRadius={20}
        borderRadiusSide={ERectBorderRadiusType.BOTTOM_CORNERS}
        borderColor={"#fbfbfb"}
        borderWidth={3}
      />
    </RP.Container>
  );
};

export default App;
