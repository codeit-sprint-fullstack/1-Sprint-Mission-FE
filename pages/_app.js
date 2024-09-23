import "../styles/global.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
