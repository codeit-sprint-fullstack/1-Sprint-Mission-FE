import "@/styles/globals.css";
import "@/styles/Home.module.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
