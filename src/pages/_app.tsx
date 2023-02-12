import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider baseUrl={process.env.NEXTAUTH_URL}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}