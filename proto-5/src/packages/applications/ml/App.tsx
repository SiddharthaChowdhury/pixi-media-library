import { useEffect, useRef } from "react";
import { KeyManager } from "../../eventManager/KeyManager/KeyManager";
import { IPixiApp, PixiApp } from "../../pixi";
import { dimenstion } from "./config/dimension";
import HomePage from "./pages/homepage/HomePage";

const CANVAS_CONTAINER_DIV_ID = "canvas_root";

const App = () => {
  const pixiApp = useRef<IPixiApp>();

  useEffect(() => {
    if (pixiApp.current) return;

    pixiApp.current = new PixiApp({
      rootId: CANVAS_CONTAINER_DIV_ID,
      backgroundColor: "#09090B",
    });

    const homepageSprite = new HomePage({
      name: "Homepage",
      width: dimenstion.window.width,
      height: dimenstion.window.height,
      x: 0,
      y: 0,
    });

    pixiApp.current.application?.stage.addChild(homepageSprite);
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
