import NextTopLoader from 'nextjs-toploader';

import type { Metadata } from 'next';

import { Readex_Pro } from 'next/font/google';

import { StoreProvider } from '@/app/StoreProvider';
import { Footer } from '@/shared/ui/footer';
import { Toaster } from '@/shared/ui/toaster';

import './globals.css';

const readex = Readex_Pro({ subsets: ['latin'], variable: '--font-readex' });

export const metadata: Metadata = {
  title: 'iStore Minimal',
  description: 'An elegant iPhone store built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={readex.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-sans">
        <NextTopLoader
          color="#2563eb"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <div className="flex flex-col min-h-screen bg-muted">
          <StoreProvider>
            {children}
            <Toaster />
            <Footer />
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
