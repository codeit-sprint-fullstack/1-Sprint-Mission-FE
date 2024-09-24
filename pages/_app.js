import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/reset.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
