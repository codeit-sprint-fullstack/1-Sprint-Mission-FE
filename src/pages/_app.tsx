import '../globals/global.css';
import Navbar from '../components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,  // 자동 재시도 비활성화
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
