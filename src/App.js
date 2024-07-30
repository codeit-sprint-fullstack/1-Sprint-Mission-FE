import SecondhandMarket from "./pages/SecondhandMarket";
import "./App.css";
import { createContext } from "react";
import useCheckWidth from "./components/hooks/useCheckWidth";

export const deviceContext = createContext();

function App() {
  const [device] = useCheckWidth();

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<SecondhandMarket />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter> */}
      <deviceContext.Provider value={device}>
        <SecondhandMarket />
      </deviceContext.Provider>
    </>
  );
}

export default App;
