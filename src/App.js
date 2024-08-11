import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/Homepage.js";
import Marketpage from "./pages/Marketpage.js";
import Registration from "./pages/Registration.js";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/items" element={<Marketpage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
