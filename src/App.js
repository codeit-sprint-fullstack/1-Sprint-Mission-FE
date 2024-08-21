import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import "styles/reset.css";

import Default from "./pages/Default";
// import Marketpage from "./pages/Marketpage.js";
import Registration from "./pages/Registration.js";
import Login from "./pages/Login.js";
import FreeBoard from "./pages/FreeBoard";
import FreeBoardWrite from "./pages/FreeBoardWrite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Default />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/items" element={<Marketpage />} /> */}
        <Route path="/register" element={<Registration />} />
        <Route path="/freeboard" element={<FreeBoard />} />
        <Route path="/write" element={<FreeBoardWrite />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
