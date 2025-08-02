import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import HomePage from '@/pages-components';
import { GetProductsResponse } from '@/shared/lib/slices/productApi';

export const metadata: Metadata = {
  title: 'Hlavní stránka',
  description:
    'Objevte nejnovější modely iPhone v IObchod. Široký výběr iPhone s garantovanou zárukou, rychlým doručením a profesionálním servisem. Nakupujte bezpečně online.',
  keywords: [
    'iPhone',
    'Apple',
    'smartphone',
    'mobilní telefon',
    'online prodej',
    'záruka',
    'doručení',
  ],
  openGraph: {
    title: 'IObchod - Nejnovější iPhone modely',
    description: 'Objevte nejnovější modely iPhone v IObchod. Široký výběr s garantovanou zárukou.',
    url: 'https://iphone-store-jet.vercel.app',
    siteName: 'IObchod',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'IObchod - Nejnovější iPhone modely',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IObchod - Nejnovější iPhone modely',
    description: 'Objevte nejnovější modely iPhone v IObchod. Široký výběr s garantovanou zárukou.',
    images: ['/icons/icon-512x512.png'],
  },
  alternates: {
    canonical: '/',
  },
};

const ITEMS_PER_PAGE = 10;

export default async function Page() {
  try {
    const [phonesList, filters] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/smartphones?take=${ITEMS_PER_PAGE}&skip=0`).then(
        (res) => res.json() as Promise<GetProductsResponse>
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/smartphones/filters`).then((res) => res.json()),
    ]);

    return (
      <HomePage
        phoneListInit={phonesList}
        uniqueBrands={filters.names}
        uniqueCapacities={filters.capacities}
        uniqueColors={filters.colors}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
      />
    );
  } catch (error) {
    console.error('Error data loading', error);
    notFound();
  }
}
