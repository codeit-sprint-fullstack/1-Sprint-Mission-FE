import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "@/components/layout/Header";
import "@/styles/main.scss";
import Head from "next/head";
import Footer from "@/components/layout/Footer";
import Main from "@/components/layout/Main";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

export default function App({ Component, pageProps }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
          mutation: {
            retry: 1,
          },
        },
      })
  );

  const methods = useForm();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <Main>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState ?? {}}>
            <FormProvider {...methods}>
              <Component {...pageProps} />
            </FormProvider>
          </HydrationBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Main>
      <Footer />
    </>
  );
}
