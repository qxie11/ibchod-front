import { notFound } from 'next/navigation';

import HomePage from '@/pages-components';

export default async function Page() {
  try {
    const [phonesList, filters] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/smartphones`).then((res) => res.json()),
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
