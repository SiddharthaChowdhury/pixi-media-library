import React from "react";
import ReactDOM from "react-dom";
import PreApp from "./PreApp";
import reportWebVitals from "./reportWebVitals";

export const ROOT_ID = "root";

ReactDOM.render(
  <React.StrictMode>
    <PreApp />
  </React.StrictMode>,
  document.getElementById(ROOT_ID)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
