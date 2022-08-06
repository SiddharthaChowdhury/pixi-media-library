import { useEffect, useRef } from "react";
import NavigationMap from "../../navigation/NavigationMap";
import { IPixiApp, PixiApp } from "../../pixi";
import HomePage from "./pages/homepage/HomePage";

const CANVAS_CONTAINER_DIV_ID = "canvas_root";
export const navMap = new NavigationMap();

const App = () => {
  const pixiApp = useRef<IPixiApp>();

  useEffect(() => {
    if (pixiApp.current) return;

    pixiApp.current = new PixiApp({
      rootId: CANVAS_CONTAINER_DIV_ID,
      backgroundColor: "#c0c0c0",
    });

    const homepageSprite = new HomePage({
      name: "Homepage",
      width: 1280,
      height: 700,
      x: 0,
      y: 0,
    });

    pixiApp.current.application?.stage.addChild(homepageSprite);
  }, []);

  return (
    <div
      id={CANVAS_CONTAINER_DIV_ID}
      style={{
        width: `${1280}px`,
        height: `${720}px`,
      }}
    />
  );
};

export default App;
