import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/authContext";
import React from "react";
import { createContext, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { OPTIONS } from "@/utils/queryClientOption";
import "@/styles/globals.css";

//무한 스크롤 에서 사용하는 IntersectionObserver REF
export const RefContext = createContext();

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: OPTIONS,
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RefContext.Provider>
  );
}
