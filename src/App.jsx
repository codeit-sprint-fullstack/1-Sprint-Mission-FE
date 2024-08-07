import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import SellList from "./Sell/SellList";
import Registration from "./Registration/Registration";
import Product from "./Product/Product";
import "./App.css";

const App = () => {
  return (
    <Router>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/items" element={<SellList />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
