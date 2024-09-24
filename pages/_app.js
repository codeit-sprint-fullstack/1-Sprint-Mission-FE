import Head from "next/head";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      <div id="page-container">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}
