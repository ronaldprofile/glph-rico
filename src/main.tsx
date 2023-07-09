import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <>
      <App />
      <ToastContainer theme="colored" />
    </>
  </React.StrictMode>
);
