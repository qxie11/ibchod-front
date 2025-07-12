import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/shared/ui/toaster";
import { StoreProvider } from '@/app/StoreProvider';

export const metadata: Metadata = {
  title: 'iObchod Minimal',
  description: 'Elegantní obchod s iPhony postavený na Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
