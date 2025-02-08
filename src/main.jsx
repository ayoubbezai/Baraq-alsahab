import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Make sure you have <div id='root'></div> in your HTML.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
