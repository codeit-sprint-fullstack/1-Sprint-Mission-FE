import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/Homepage.js";
import Marketpage from "./pages/Marketpage.js";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/items" element={<Marketpage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
