import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import SaleProducts from "./components/SaleProducts";
import Registration from "./components/Registration";
import ProductDetail from "./components/ProductDetail";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [activePath, setActivePath] = useState("");

  return (
    <BrowserRouter>
      <div className="main-header">
        <Navigation activePath={activePath} setActivePath={setActivePath} />
      </div>
      <Routes>
        <Route index element={<NavigateToItems />} />
        <Route
          path="/items"
          element={
            <div className="main-body">
              <SaleProducts
                activePath={activePath}
                setActivePath={setActivePath}
              />
            </div>
          }
        />
        <Route
          path="/registration"
          element={
            <div className="main-body">
              <Registration />
            </div>
          }
        />
        <Route
          path="/items/detail"
          element={
            <div className="main-body">
              <ProductDetail />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function NavigateToItems() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/items");
  }, [navigate]);

  return;
}

export default App;
