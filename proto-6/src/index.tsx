import React from "react";
import ReactDOM from "react-dom";
import * as PIXI from "pixi.js-legacy";
import { Stage } from "@inlet/react-pixi/legacy";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import initPixiDevtool from "./initPixiDevtool";
import { boxDiam } from "./config/dimension";

export const ROOT_ID = "root";
ReactDOM.render(
  <React.StrictMode>
    <Stage // This stage is canvas stage
      width={boxDiam.window.width}
      height={boxDiam.window.height}
      options={{
        backgroundColor: PIXI.utils.string2hex("#012b30"),
        antialias: true,
      }}
    >
      <App />
    </Stage>
  </React.StrictMode>,
  document.getElementById(ROOT_ID)
);

// Chrome devtool initiated for development
initPixiDevtool();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
