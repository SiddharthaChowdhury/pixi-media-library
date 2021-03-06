import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PreApp from "./PreApp";
import reportWebVitals from "./reportWebVitals";
import "./workers/workerRegister";

export const ROOT_ID = "root";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PreApp />
    </Router>
  </React.StrictMode>,
  document.getElementById(ROOT_ID)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
