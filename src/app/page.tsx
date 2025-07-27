import { notFound } from 'next/navigation';

import HomePage from '@/pages-components';
import { GetProductsResponse } from '@/shared/lib/slices/productApi';

const ITEMS_PER_PAGE = 10;

export default async function Page() {
  try {
    const [phonesList, filters] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/smartphones?take=${ITEMS_PER_PAGE}&skip=0`).then(
        (res) => res.json() as Promise<GetProductsResponse>
      ),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/smartphones/filters`).then((res) => res.json()),
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
