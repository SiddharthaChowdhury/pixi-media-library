import { useState } from "react";
import { Sprite, useTick } from "@inlet/react-pixi/legacy";

interface ILoadingSpinnerProps {
  size?: number;
  x: number;
  y: number;
}

// const LoadingSpinner = ({ size = 30 }) => {
//   return <RP.Graphics draw={draw} />;
// };

const SPEED = 0.05;
const LoadingSpinner = ({ size = 30 }: ILoadingSpinnerProps) => {
  const [rotation, setRotation] = useState(0);

  useTick((delta) => delta && setRotation(rotation + SPEED * delta));

  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      anchor={0.5}
      scale={4}
      rotation={rotation}
    />
    // <Graphics draw={draw} rotation={rotation} />
  );
};

export default LoadingSpinner;
