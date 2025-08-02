import type { Metadata } from 'next';

import CheckoutPage from '@/pages-components/checkout/page';

export const metadata: Metadata = {
  title: 'Dokončení objednávky',
  description:
    'Dokončete svou objednávku iPhone v IObchod. Bezpečné platby, rychlé doručení a garantovaná záruka na všechny produkty.',
  keywords: ['objednávka', 'platba', 'doručení', 'iPhone', 'checkout', 'finalizace'],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Dokončení objednávky - IObchod',
    description: 'Dokončete svou objednávku iPhone v IObchod. Bezpečné platby a rychlé doručení.',
    url: '/checkout',
    siteName: 'IObchod',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Dokončení objednávky - IObchod',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dokončení objednávky - IObchod',
    description: 'Dokončete svou objednávku iPhone v IObchod. Bezpečné platby a rychlé doručení.',
    images: ['/icons/icon-512x512.png'],
  },
  alternates: {
    canonical: '/checkout',
  },
};

export default function Page() {
  return <CheckoutPage />;
}
