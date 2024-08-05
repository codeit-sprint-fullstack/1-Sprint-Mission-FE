import FleaMarket from "./pages/FleaMarket";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useCheckWidth from "./components/hooks/useCheckWidth";

export const deviceContext = createContext();

function App() {
  const [device] = useCheckWidth();

  return (
    <BrowserRouter>
      <deviceContext.Provider value={device}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item" element={<FleaMarket />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/test" element={<h1>test</h1>} />
        </Routes>
      </deviceContext.Provider>
    </BrowserRouter>
  );
}

export default App;
