import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import "@/styles/Home.module.css";
import Head from "next/head";
import Header from "@/components/Layout/Header.jsx";
import Footer from "@/components/Layout/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import AuthGuard from "@/components/AuthGuard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noHeaderFooter = ["/login", "/signin"];
  const hideHeaderFooter = noHeaderFooter.includes(router.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <AuthGuard>
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
        </AuthGuard>
      </SessionProvider>
    </QueryClientProvider>
  );
}
