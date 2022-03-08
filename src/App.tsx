import { useEffect } from "react";
import { ROOT_DOCUMENT_ID } from ".";
import pixiClass from "./pixi/pixiClass";
import Playground from "./__playground__";

const App = () => {

  useEffect(() => {
    if(document.getElementById(ROOT_DOCUMENT_ID) && !pixiClass.isPixiReady) {
      // Initialize pixi and canvas in app
      pixiClass.initPixiCanvas();
    }
  }, [document.getElementById(ROOT_DOCUMENT_ID), pixiClass.isPixiReady])

  return (
    <>
      <Playground/>
    </>
  );
}

export default App;
