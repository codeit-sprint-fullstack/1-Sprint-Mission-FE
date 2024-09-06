import "@/styles/globals.css";
import "@/styles/Home.module.css";
import Head from "next/head";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

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
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
