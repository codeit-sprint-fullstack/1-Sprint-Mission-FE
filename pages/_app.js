import React from "react";
import Navigation from "../src/components/Navigation";
import "@styles/globals.css";
import Footer from "../src/components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <main style={{ paddingBottom: "16rem" }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;
