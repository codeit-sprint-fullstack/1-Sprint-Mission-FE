import '../styles/globals.css';
import '../src/components/next/BestPosts.module.css';
import '../src/components/next/PostList.module.css';
import Navbar from '../src/components/next/Navbar';  // from 키워드 추가

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />  {/* 모든 페이지에 공통으로 표시될 Navbar */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

