import React from "react";
import Navigation from "./components/Navigation";
import BestProducts from "./components/BestProducts";
import SaleProducts from "./components/SaleProducts";
import "./App.css";

function App() {
  return (
    <div>
      <div className="main-header">
        <Navigation />
      </div>
      <div className="main-body">
        <BestProducts />
        <SaleProducts />
      </div>
    </div>
  );
}

export default App;
