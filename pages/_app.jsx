import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { createContext, useRef } from "react";

export const RefContext = createContext();

export default function App({ Component, pageProps }) {
  const globalDivRef = useRef(null);
  return (
    <RefContext.Provider value={globalDivRef}>
      <>
        <Header />
        <Component {...pageProps} />
        <div ref={globalDivRef}></div>
        <Footer />
      </>
    </RefContext.Provider>
  );
}
