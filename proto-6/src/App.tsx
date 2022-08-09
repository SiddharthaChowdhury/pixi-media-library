import { Container, Sprite } from "@inlet/react-pixi/legacy";
import { useEffect, useRef, useState } from "react";
import {
  ERectBorderRadiusType,
  LoadingSpinner,
  Rect,
} from "./components/atoms";
import { FocusableContainer } from "./components/containers";

const App = () => {
  const [_, setX] = useState(75);
  const xx = useRef(75);

  useEffect(() => {
    setInterval(() => {
      xx.current += 10;
      setX(xx.current);
    }, 500);
  }, []);

  return (
    <Container>
      {/* <Sprite image={logo} x={640} y={100} anchor={0.5} /> */}

      <FocusableContainer
        width_orig={1200}
        height_orig={720}
        x={xx.current}
        y={0}
        x2={1275}
        y2={720}
        name={"test"}
      >
        <Rect
          x={20}
          y={100}
          width={100}
          height={100}
          borderRadius={20}
          borderRadiusSide={ERectBorderRadiusType.BOTTOM_CORNERS}
          borderColor={"#fbfbfb"}
          borderWidth={3}
        />
      </FocusableContainer>
    </Container>
  );
};

export default App;
