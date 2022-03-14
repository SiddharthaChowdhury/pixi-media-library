import React, { useEffect, useRef, useState } from "react";
import { ROOT_ID } from ".";
import { Sample } from "./pages/sample/Sample";
import pixiClass from "./pixi";

const PreApp = () => {
  const root = document.getElementById(ROOT_ID);
  const [appReady, serAppReady] = useState<boolean>(false);

  useEffect(() => {
    if (!root) return;

    pixiClass.initPixi();
    serAppReady(true);
  }, [root]);

  if (appReady) {
    return (
      <>
        <Sample />
      </>
    );
  }

  return null;
};

export default PreApp;
