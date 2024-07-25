import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/global.css";

import SecondhandMarket from "./pages/SecondhandMarket";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.StrictMode>
      <SecondhandMarket />
    </React.StrictMode>
  </>
);
