import Header from "../components/Header";
import FreeboardBody from "../components/FreeboardBody";
import Footer from "../components/Footer";
import { useContext } from "react";
import { deviceContext } from "../App";

export function Freeboard() {
  const device = useContext(deviceContext);

  return (
    <>
      <Header />
      <FreeboardBody />
      <Footer />
    </>
  );
}

export default Freeboard;
