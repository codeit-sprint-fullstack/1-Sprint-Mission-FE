import Header from "../components/Header";
import ItemBody from "../components/ItemBody";
import Footer from "../components/Footer";
import { useContext } from "react";
import { deviceContext } from "../App";

export function Registration() {
  const device = useContext(deviceContext);

  return (
    <>
      <Header />
      <ItemBody />
      <Footer />
    </>
  );
}

export default Registration;
