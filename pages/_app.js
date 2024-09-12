import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import GNB from "../components/GNB.jsx";
import Footer from "../components/Footer.jsx";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className="flex">
          <GNB />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
        {process.env.NODE_ENV !== "production" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </Hydrate>
    </QueryClientProvider>
  );
}
