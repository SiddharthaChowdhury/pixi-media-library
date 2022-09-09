import { Text } from "react-konva";
// import LoadingGif from "./rhombus-loading.gif";

const WIDTH = 70;
const HEIGHT = 20;

export const LoadingIcon = ({ x, y }: { x: number; y: number }) => (
  <Text
    x={x}
    y={y}
    width={WIDTH}
    height={HEIGHT}
    offsetX={WIDTH * 0.5}
    offsetY={HEIGHT * 0.5}
    text="Loading..."
    fill={"#C0C0C0"}
    fontSize={15}
  />
);
