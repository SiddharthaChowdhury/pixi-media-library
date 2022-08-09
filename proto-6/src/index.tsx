import React from 'react';
import ReactDOM from 'react-dom';
import * as PIXI from 'pixi.js-legacy';
import * as RP from '@inlet/react-pixi';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import appConfig from './config/config';

export const ROOT_ID = 'root';
ReactDOM.render(
  <React.StrictMode>
    <RP.Stage
      width={appConfig.window.width}
      height={appConfig.window.height}
      options={{
        backgroundColor: PIXI.utils.string2hex(appConfig.window.bgColor),
        antialias: false
      }}
    >
      <App />
    </RP.Stage>
  </React.StrictMode>,
  document.getElementById(ROOT_ID)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
