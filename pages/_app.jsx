import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/authContext";
import "@/styles/globals.css";
import { createContext, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const RefContext = createContext();

export default function App({ Component, pageProps }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 보통 SSR에서는 staleTime을 0 이상으로 해줌으로써
            // 클라이언트 사이드에서 바로 다시 데이터를 refetch 하는 것을 피한다.
            staleTime: 60 * 1000,
          },
        },
      })
  );
  const globalDivRef = useRef(null);
  return (
    <RefContext.Provider value={globalDivRef}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Header />
          <Component {...pageProps} />
          <div ref={globalDivRef}></div>
          <Footer />
        </AuthProvider>
      </QueryClientProvider>
    </RefContext.Provider>
  );
}
