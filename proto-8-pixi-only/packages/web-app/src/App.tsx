import { Rect, IPixiApp, PixiApp } from "@mono/pixi-engine";
import { useEffect, useRef } from "react";
import "./App.css";
import { dimenstion } from "./config/dimension";
import { KeyManager } from "./eventManager/KeyManager/KeyManager";
import Homepage from "./pages/Home/Homepage";

const CANVAS_CONTAINER_DIV_ID = "canvas_root";

const App = () => {
  const pixiApp = useRef<IPixiApp>();

  useEffect(() => {
    if (pixiApp.current) return;

    pixiApp.current = new PixiApp({
      rootId: CANVAS_CONTAINER_DIV_ID,
      backgroundColor: "#09090B",
      devtool: true,
      antialias: true,
    });

    pixiApp.current.application?.stage.addChild(new Homepage());
    KeyManager.init();
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
