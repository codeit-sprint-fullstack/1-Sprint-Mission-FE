import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import SecondHandMarket from "./pages/SecondHandMarket";
import Registration from "./pages/Registration";
import ParticularPage from "./pages/ParticularPage";

function MainRender() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="items" element={<SecondHandMarket />} />
            <Route path="registration" element={<Registration />} />
            <Route path=":particularId" element={<ParticularPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default MainRender;
