import Header from "../components/Header";
import RegistrationBody from "../components/RegistrationBody";
import Footer from "../components/Footer";
import { useContext } from "react";
import { deviceContext } from "../App";

export function Registration() {
  const device = useContext(deviceContext);

  console.log("SecondhandMarket : " + device);
  return (
    <>
      <Header />
      <RegistrationBody />
      <Footer />
    </>
  );
}

export default Registration;
