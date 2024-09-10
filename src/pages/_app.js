import { useEffect, useState } from "react";
import Router from "next/router"; // Router import 추가
import Spinner from "../components/Spinner";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 페이지가 로딩 완료되면 스피너 숨기기
    const handleRouteChange = () => setLoading(true);
    const handleRouteComplete = () => setLoading(false);

    // Next.js의 라우터 이벤트를 통해 페이지 로딩 상태를 관리
    Router.events.on("routeChangeStart", handleRouteChange);
    Router.events.on("routeChangeComplete", handleRouteComplete);
    Router.events.on("routeChangeError", handleRouteComplete);

    // 초기 로딩 완료 시 스피너 숨기기
    setLoading(false);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
      Router.events.off("routeChangeComplete", handleRouteComplete);
      Router.events.off("routeChangeError", handleRouteComplete);
    };
  }, []);

  return (
    <>
      {loading && <Spinner />}
      <Component {...pageProps} onPageLoad={() => setLoading(false)} />{" "}
    </>
  );
}

export default MyApp;
