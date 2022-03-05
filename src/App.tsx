import { useEffect } from "react";
import { ROOT_DOCUMENT_ID } from ".";
import pixiClass from "./pixi/pixiClass";
import Templates from "./templates";

const App = () => {

  useEffect(() => {
    if(document.getElementById(ROOT_DOCUMENT_ID) && !pixiClass.isPixiReady) {
      // Initialize pixi and canvas in app
      pixiClass.initPixiCanvas();
    }
  }, [document.getElementById(ROOT_DOCUMENT_ID), pixiClass.isPixiReady])

  return (
    <>
      <Templates/>
    </>
  );
}

export default App;
