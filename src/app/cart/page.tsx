import type { Metadata } from 'next';

import CartPage from '@/pages-components/cart/page';

export const metadata: Metadata = {
  title: 'Nákupní košík',
  description:
    'Váš nákupní košík v IObchod. Zkontrolujte vybrané iPhone modely a pokračujte k objednávce. Bezpečné nakupování s garantovanou zárukou.',
  keywords: ['nákupní košík', 'iPhone', 'objednávka', 'nakupování', 'košík'],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Nákupní košík - IObchod',
    description: 'Váš nákupní košík v IObchod. Zkontrolujte vybrané iPhone modely.',
    url: '/cart',
    siteName: 'IObchod',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Nákupní košík - IObchod',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nákupní košík - IObchod',
    description: 'Váš nákupní košík v IObchod. Zkontrolujte vybrané iPhone modely.',
    images: ['/icons/icon-512x512.png'],
  },
  alternates: {
    canonical: '/cart',
  },
};

export default function Page() {
  return <CartPage />;
}
