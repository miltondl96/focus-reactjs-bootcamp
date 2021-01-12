import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/tailwind.css";
import App from "./App";
import { ProvideAuth } from "./use-auth";

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById("root")
);
