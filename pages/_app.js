import "@/styles/globals.css";
import "@/styles/Home.module.css";
import Head from "next/head";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      <main>
        <div id="page-container">
          <div id="content-wrap">
            <Header />
            <ToastContainer position="top-right" autoClose={2000} />
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
