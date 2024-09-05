import Footer from "@/components/public/Footer";
import "../styles/globals.css";
import Header from "@/components/public/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
