import Header from "../components/Header";
import MarketBody from "../components/MarketBody";
import Footer from "../components/Footer";
import { useContext } from "react";
import { deviceContext } from "../App";

export function FleaMarket() {
  const device = useContext(deviceContext);

  return (
    <>
      <Header />
      <MarketBody />
      <Footer />
    </>
  );
}

export default FleaMarket;
