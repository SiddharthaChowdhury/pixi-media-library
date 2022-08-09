import * as PIXI from "pixi.js-legacy";
import * as RP from "@inlet/react-pixi";
import { useCallback, useRef, useState } from "react";
import React from "react";

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

  RP.useTick((delta) => delta && setRotation(rotation + SPEED * delta));

  const draw = React.useCallback((spinner) => {
    const percent = 0;
    spinner
      .clear()
      .lineStyle(4, 0xc0c0c0, 1)
      .moveTo(size, 0)
      .arc(0, 0, size, 0, Math.PI * 2 * percent, false);
  }, []);

  return (
    // <RP.Sprite
    //   image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
    //   anchor={0.5}
    //   scale={4}
    //   rotation={rotation}
    // />
    <RP.Graphics draw={draw} rotation={rotation} />
  );
};

export default LoadingSpinner;
