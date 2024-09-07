import "./styles/reset.css";

// 컴포넌트
import PageNav from "@components/PageNav";
// import Footer from "@components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PageNav />
      <main>
        <Component {...pageProps} />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default MyApp;
