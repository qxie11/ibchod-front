import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import HomePage from '@/pages-components';
import { GetProductsResponse } from '@/shared/lib/slices/productApi';

export const metadata: Metadata = {
  title: 'Dev | IObchod',
  description:
    'Objevte široký výběr repasovaných iPhonů v IObchod. Všechny modely se zárukou 3 měsíců, rychlým doručením a za skvělé ceny. Udržitelná volba pro vás i planetu.',
  keywords: [
    'repasované iPhone',
    'použité iPhone',
    'iPhone se zárukou',
    'levný iPhone',
    'IObchod',
    'Apple',
    'smartphone',
    'mobilní telefon',
    'udržitelnost',
  ],
  openGraph: {
    title: 'Repasované iPhony se zárukou | IObchod',
    description:
      'Široký výběr repasovaných iPhonů se zárukou. Udržitelná volba, skvělé ceny a rychlé doručení.',
    url: '/',
    siteName: 'IObchod',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Repasované iPhony se zárukou od IObchod',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Repasované iPhony se zárukou | IObchod',
    description:
      'Nakupujte kvalitní repasované iPhony se zárukou. Rychlé doručení a skvělé ceny. Udržitelná volba pro chytřejší nákup.',
    images: ['/twitter-image.png'],
  },
  alternates: {
    canonical: '/',
  },
};

const ITEMS_PER_PAGE = 10;

export default async function Page() {
  try {
    const [phonesList, filters] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/smartphones?take=${ITEMS_PER_PAGE}&skip=0`, {
        cache: 'no-store',
      }).then((res) => res.json() as Promise<GetProductsResponse>),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/smartphones/filters`, { cache: 'no-store' }).then(
        (res) => res.json()
      ),
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
