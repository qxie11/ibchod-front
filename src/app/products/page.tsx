import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import ProductsPage from '@/pages-components/products';
import { GetProductsResponse } from '@/shared/lib/slices/productApi';

export const metadata: Metadata = {
  title: 'Repasované iPhony | IObchod',
  description:
    'Široký výběr repasovaných iPhonů se zárukou. iPhone 12, 13, 14 a další modely za skvělé ceny. Rychlé doručení a 12měsíční záruka.',
  keywords: [
    'repasované iPhone',
    'použité iPhone',
    'iPhone se zárukou',
    'levný iPhone',
    'iPhone 13',
    'iPhone 14',
    'iPhone 15',
    'IObchod',
  ],
  openGraph: {
    title: 'Repasované iPhony | IObchod',
    description: 'Široký výběr repasovaných iPhonů se zárukou. Kvalitní telefony za skvělé ceny.',
    url: '/products',
    siteName: 'IObchod',
  },
};

const ITEMS_PER_PAGE = 12;

export default async function ProduktyPage() {
  try {
    const [phonesList, filters] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/smartphones?take=${ITEMS_PER_PAGE}&skip=0`).then(
        (res) => res.json() as Promise<GetProductsResponse>
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/smartphones/filters`).then((res) => res.json()),
    ]);

    return (
      <ProductsPage
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
