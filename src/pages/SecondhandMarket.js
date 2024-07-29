import useCheckWidth from "../components/hooks/useCheckWidth";
import Header from "../components/Header";
import MarketBody from "../components/MarketBody";
import Footer from "../components/Footer";
import { createContext } from "react";

export const deviceContext = createContext(0);

export function SecondhandMarket() {
  const [device] = useCheckWidth();

  return (
    <deviceContext.Provider value={device}>
      <Header />
      <MarketBody />
      <Footer />
    </deviceContext.Provider>
  );
}

export default SecondhandMarket;
