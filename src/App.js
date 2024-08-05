import React, { useEffect } from "react";
import Navigation from "./components/Navigation";
import SaleProducts from "./components/SaleProducts";
import Registration from "./components/Registration";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="main-header">
        <Navigation />
      </div>
      <Routes>
        <Route index element={<NavigateToItems />} />
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

function NavigateToItems() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/items");
  }, [navigate]);

  return;
}

export default App;
