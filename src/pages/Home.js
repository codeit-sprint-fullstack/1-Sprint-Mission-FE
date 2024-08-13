import Header from "../components/Header";
import HomeBody from "../components/Homebody";
import Footer from "../components/Footer";
import { useContext } from "react";
import { deviceContext } from "../App";

export function Registration() {
  const device = useContext(deviceContext);

  return (
    <>
      <Header />
      <HomeBody />
      <Footer />
    </>
  );
}

export default Registration;
