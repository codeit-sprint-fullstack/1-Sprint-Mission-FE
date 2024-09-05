import Footer from "@/components/public/Footer";
import "../styles/globals.css";
import Header from "@/components/public/Header";
import Head from "next/head";


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
