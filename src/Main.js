import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Faq from "./pages/Faq.js";
import Privacy from "./pages/Privacy.js";
import App from "./components/App.js";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* 추후 Route 페이지 추가 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
