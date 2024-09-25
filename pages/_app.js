import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/reset.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </QueryClientProvider>
    </>
  );
}
