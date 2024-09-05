import Head from "next/head";
import Header from "../components/Header/Header";
import "../styles/reset.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
