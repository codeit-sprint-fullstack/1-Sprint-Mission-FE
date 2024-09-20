import Footer from "@/components/public/Footer";
import "../styles/globals.css";
import Header from "@/components/public/Header";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const mainOnly =
    router.asPath === "/signin" || router.asPath === "/signup" ? true : false;

  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      {mainOnly || <Header />}
      <main>
        <Component {...pageProps} />
      </main>
      {mainOnly || <Footer />}
    </>
  );
}
