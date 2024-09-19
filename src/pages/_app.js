import '../globals/global.css';
import Navbar from '../components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // React Query import 추가
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  // QueryClient를 상태로 관리
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>  {/* QueryClientProvider로 앱을 감쌈 */}
      <Navbar />  {/* 모든 페이지에 공통으로 표시될 Navbar */}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;

