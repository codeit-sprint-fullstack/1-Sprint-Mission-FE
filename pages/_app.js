import Header from "@/components/Header/Header";
import "@/styles/main.scss";
import Head from "next/head";
import Footer from "@/components/Footer/Footer";
import Main from "@/components/Main/Main";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <Main>
        <Component {...pageProps} />
      </Main>
      <Footer />
    </>
  );
}
