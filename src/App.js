import React from "react";
import Navigation from "./components/Navigation";
import BestProducts from "./components/BestProducts";
import SaleProducts from "./components/SaleProducts";

function App() {
  return (
    <div>
      <Navigation />
      <BestProducts />
      <SaleProducts />
    </div>
  );
}

export default App;
