import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainItemPlace from "pages/Product/productMainPage.js";
import GNB from "./components/GNB";
import SecondHandMainPage from "pages/SecondHand/SecondHandMainPage"
import RegistrationPage from "pages/ProductRegstration/registration"

function App() {
  return (
    <Router>
      <GNB />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainItemPlace />} />
          <Route path="/items" element={<SecondHandMainPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
