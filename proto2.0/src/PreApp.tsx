import React, { useEffect } from "react";
import { ROOT_ID } from ".";
import pixiClass from "./pixi";

const PreApp = () => {
  const root = document.getElementById(ROOT_ID);
  useEffect(() => {
    if (!root) return;

    pixiClass.initPixi();
  }, [root]);
  return null;
};

export default PreApp;
