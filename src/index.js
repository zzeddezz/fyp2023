import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "bootstrap/dist/css/bootstrap.min.css";

// Material Dashboard 2 PRO React Context Provider
import { MaterialUIControllerProvider } from "context/md";

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
