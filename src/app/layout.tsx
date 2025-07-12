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
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
