import { useEffect, useState } from "react";
import Router from "next/router";
import Spinner from "../components/Spinner";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

// 핸들러 함수들을 useEffect 외부에서 정의
const handleRouteChange = (setLoading) => () => setLoading(true);
const handleRouteComplete = (setLoading) => () => setLoading(false);

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // useEffect 내부에서 핸들러 함수를 호출
    const onRouteChange = handleRouteChange(setLoading);
    const onRouteComplete = handleRouteComplete(setLoading);

    // Next.js의 라우터 이벤트를 통해 페이지 로딩 상태를 관리
    Router.events.on("routeChangeStart", onRouteChange);
    Router.events.on("routeChangeComplete", onRouteComplete);
    Router.events.on("routeChangeError", onRouteComplete);

    // 초기 로딩 완료 시 스피너 숨기기
    setLoading(false);

    return () => {
      Router.events.off("routeChangeStart", onRouteChange);
      Router.events.off("routeChangeComplete", onRouteComplete);
      Router.events.off("routeChangeError", onRouteComplete);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {loading && <Spinner />}
      <Component {...pageProps} onPageLoad={() => setLoading(false)} />
    </QueryClientProvider>
  );
}

export default MyApp;
