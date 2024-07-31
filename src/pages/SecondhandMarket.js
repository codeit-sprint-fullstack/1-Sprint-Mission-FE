import Header from "../components/Header";
import MarketBody from "../components/MarketBody";
import Footer from "../components/Footer";
import { useContext } from "react";
import { deviceContext } from "../App";

export function SecondhandMarket() {
  const device = useContext(deviceContext);

  console.log("SecondhandMarket : " + device);
  return (
    <>
      <Header />
      <MarketBody />
      <Footer />
    </>
  );
}

export default SecondhandMarket;
