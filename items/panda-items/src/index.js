import React from "react";
import ReactDOM from "react-dom/client";
import SellingMarketplace from "./pages/sellingProducts";
import BestMarketPlace from "./pages/bestSellingProducts";
import GNB from "./components/GNB";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GNB />
    <div className="container">
      <BestMarketPlace />
      <SellingMarketplace />
    </div>
  </React.StrictMode>
);
