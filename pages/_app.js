import '@styles/reset.css';  // src/styles/reset.css 파일을 절대 경로로 import

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;