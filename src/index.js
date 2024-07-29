import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/global.css";

import SecondhandMarket from "./pages/SecondhandMarket";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.StrictMode>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<SecondhandMarket />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter> */}
      <SecondhandMarket />
    </React.StrictMode>
  </>
);
