import '../styles/globals.module.css';
import '../components/BestPosts.module.css';
import '../components/PostList.module.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />  {/* 모든 페이지에 공통으로 표시될 Navbar */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

