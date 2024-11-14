import Head from "next/head";
import { Footer } from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { AuthProvider } from "@/context/authContext";

export default function App({ Component, pageProps }) {
  // const queryClient = new QueryClient();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <div id="page-container">
          <AuthProvider>
            <Header />
            <Component {...pageProps} />
          </AuthProvider>
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </QueryClientProvider>
    </>
  );
}
