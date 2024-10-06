'use client';
import Nav from '@features/Nav';
import { useAuthStore } from '@shared/store/auth/auth';
import '@shared/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <html lang="ko">
          <body>
            <Nav />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </body>
        </html>
      </QueryClientProvider>
    </>
  );
}
