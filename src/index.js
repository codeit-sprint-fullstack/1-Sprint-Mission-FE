import ReactDOM from "react-dom";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./reset.css";
const root = createRoot(document.getElementById("root"));
root.render(<App />);
