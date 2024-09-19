import "@/styles/globals.css";
import "@/styles/Home.module.css";
import Head from "next/head";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noHeaderFooter = ["/login", "/signin"];
  const hideHeaderFooter = noHeaderFooter.includes(router.pathname);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>판다마켓</title>
        </Head>
        <main>
          <div id="page-container">
            <div id="content-wrap">
              {!hideHeaderFooter && <Header />}
              <ToastContainer position="top-right" autoClose={2000} />
              <Component {...pageProps} />
            </div>
            {!hideHeaderFooter && <Footer />}
          </div>
        </main>
      </QueryClientProvider>
    </>
  );
}
