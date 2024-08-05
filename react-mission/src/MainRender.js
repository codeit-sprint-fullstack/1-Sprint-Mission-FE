import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import MainMarket from "./pages/MainMarket";
import SecondHandMarket from './pages/SecondHandMarket'

function MainRender() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<MainMarket />} />
          <Route path="items" element={<SecondHandMarket />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default MainRender;
