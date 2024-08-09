import React from "react";
import SellingMarketplace from "./sellingProducts";
import BestMarketPlace from "./bestSellingProducts";

function MainItemPlace() {
  return (
    <div className="container">
      <BestMarketPlace />
      <SellingMarketplace />
    </div>
  );
}

export default MainItemPlace;
