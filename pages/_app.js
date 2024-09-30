import {
  HydrationBoundary,
  MutationCache,
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
import { AuthProvider } from "@/context/AuthProvider";
import { useGlobalModal } from "@/hooks/useModals";

export default function App({ Component, pageProps }) {
  const { onModalOpen, GlobalModal } = useGlobalModal();
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
        mutationCache: new MutationCache({
          onError: (error) => {
            console.error("Mutation Error", error.message);
            onModalOpen({ msg: error.message });
            console.log("글로벌에러 모달 열림");
          },
        }),
      })
  );

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState ?? {}}>
          <AuthProvider>
            <Header />
            <Main>
              <Component {...pageProps} />
            </Main>
            <GlobalModal />
          </AuthProvider>
        </HydrationBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Footer />
    </>
  );
}
