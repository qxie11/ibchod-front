import NextTopLoader from 'nextjs-toploader';

import type { Metadata } from 'next';

import { Readex_Pro } from 'next/font/google';

import { StoreProvider } from '@/app/StoreProvider';
import { Toaster } from '@/shared/ui/toaster';
import { Footer } from '@/widgets/footer/ui/footer';

import './globals.css';

const readex = Readex_Pro({ subsets: ['latin'], variable: '--font-readex' });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://iphone-store-jet.vercel.app';

export const metadata: Metadata = {
  title: {
    default: 'IObchod - Oficiální prodej iPhone v České republice',
    template: '%s | IObchod',
  },
  description:
    'Oficiální prodej iPhone v České republice. Nejnovější modely iPhone s garantovanou zárukou, rychlým doručením a profesionálním servisem. Nakupujte bezpečně online.',
  keywords: [
    'iPhone',
    'Apple',
    'smartphone',
    'mobilní telefon',
    'Česká republika',
    'online prodej',
    'záruka',
  ],
  authors: [{ name: 'IObchod Team' }],
  creator: 'IObchod',
  publisher: 'IObchod',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: baseUrl,
    siteName: 'IObchod',
    title: 'IObchod - Oficiální prodej iPhone v České republice',
    description:
      'Oficiální prodej iPhone v České republice. Nejnovější modely iPhone s garantovanou zárukou, rychlým doručením a profesionálním servisem.',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'IObchod - Oficiální prodej iPhone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IObchod - Oficiální prodej iPhone v České republice',
    description:
      'Oficiální prodej iPhone v České republice. Nejnovější modely iPhone s garantovanou zárukou.',
    images: ['/icons/icon-512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={readex.variable}>
      <head>
        <meta name="theme-color" content="#2563eb" />
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
