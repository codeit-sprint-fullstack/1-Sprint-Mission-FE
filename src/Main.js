import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import App from "./components/App.js";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          {/* 추후 Route 페이지 추가 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
