import NextTopLoader from 'nextjs-toploader';

import type { Metadata } from 'next';

import { Readex_Pro } from 'next/font/google';

import { StoreProvider } from '@/app/StoreProvider';
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
      <body className="font-sans">
        <NextTopLoader
          color="#000"
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
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
