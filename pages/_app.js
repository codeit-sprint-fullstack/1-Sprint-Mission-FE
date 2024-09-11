// src/pages/_app.js
import GNB from "../components/GNB.jsx";
import Footer from "../components/Footer.jsx";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GNB />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
