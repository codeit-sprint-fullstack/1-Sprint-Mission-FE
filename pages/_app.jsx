import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import GNB from "../components/ui/GNB.jsx";
import Footer from "../components/ui/Footer.jsx";
import { ModalProvider } from "@/contexts/ModalContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();

  const isAuthPage =
    router.pathname === "/login" || router.pathname === "/register";

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ModalProvider>
          <div className="flex">
            {!isAuthPage && <GNB />}
            <main className="flex-grow">
              <Component {...pageProps} />
            </main>
            {!isAuthPage && <Footer />}
          </div>
        </ModalProvider>
        {process.env.NODE_ENV !== "production" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </Hydrate>
    </QueryClientProvider>
  );
}
