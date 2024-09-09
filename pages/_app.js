import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "@/components/Header/Header";
import "@/styles/main.scss";
import Head from "next/head";
import Footer from "@/components/Footer/Footer";
import Main from "@/components/Main/Main";
import React from "react";

export default function App({ Component, pageProps }) {
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
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <Main>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState ?? {}}>
            <Component {...pageProps} />
          </HydrationBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Main>
      <Footer />
    </>
  );
}
