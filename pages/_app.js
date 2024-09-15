import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "@/styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
