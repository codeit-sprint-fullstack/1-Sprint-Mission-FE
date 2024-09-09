import '@/styles/globals.css';
import Header from '@/components/Header';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/panda.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        <style>{`html {font-family: pretendard ;}`}</style>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
