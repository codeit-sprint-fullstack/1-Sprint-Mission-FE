import Head from "next/head";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "@/styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
