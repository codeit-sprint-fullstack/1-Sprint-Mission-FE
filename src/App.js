import React from "react";
import Navigation from "./components/Navigation";
import BestProducts from "./components/BestProducts";
import SaleProducts from "./components/SaleProducts";
import Registration from "./components/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="main-header">
        <Navigation />
      </div>
      <Routes>
        <Route
          index
          element={
            <div className="main-body">
              <BestProducts />
              <SaleProducts />
            </div>
          }
        />
        <Route
          path="/items"
          element={
            <div className="main-body">
              <SaleProducts />
            </div>
          }
        />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
