import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/userContext";
import "@/styles/globals.css";
import { createContext, useRef } from "react";

export const RefContext = createContext();

export default function App({ Component, pageProps }) {
  const globalDivRef = useRef(null);
  return (
    <RefContext.Provider value={globalDivRef}>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
        <div ref={globalDivRef}></div>
        <Footer />
      </AuthProvider>
    </RefContext.Provider>
  );
}
