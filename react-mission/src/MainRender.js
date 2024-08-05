import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import SecondHandMarket from "./pages/SecondHandMarket";
import Registration from "./pages/Registration";

function MainRender() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="items" element={<SecondHandMarket />} />
          <Route path="registration" element={<Registration />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default MainRender;
