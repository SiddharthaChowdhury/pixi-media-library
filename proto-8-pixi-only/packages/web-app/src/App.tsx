import { Rect, IPixiApp, PixiApp } from "@mono/pixi-engine";
import { useEffect, useRef } from "react";
import "./App.css";
import { dimenstion } from "./config/dimension";

const CANVAS_CONTAINER_DIV_ID = "canvas_root";

const App = () => {
  const pixiApp = useRef<IPixiApp>();

  useEffect(() => {
    if (pixiApp.current) return;

    const rect = new Rect({
      x: 50,
      y: 50,
      width: 500,
      height: 400,
      // border: {
      //   width: 2,
      //   color: "#FF2E00",
      //   radius: [1, 1, 1, 1],
      // },
      // background: {
      //   fill: "#ffffff",
      // },
    });

    pixiApp.current = new PixiApp({
      rootId: CANVAS_CONTAINER_DIV_ID,
      backgroundColor: "#09090B",
      devtool: true,
    });

    pixiApp.current.application?.stage.addChild(rect);
  }, []);

  return (
    <div
      id={CANVAS_CONTAINER_DIV_ID}
      style={{
        width: `${dimenstion.window.width}px`,
        height: `${dimenstion.window.height}px`,
      }}
    />
  );
};

export default App;
