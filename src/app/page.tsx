import { notFound } from 'next/navigation';

import HomePage from '@/pages-components';
import { createClient } from '@/prismicio';

export default async function Page() {
  const client = createClient();
  try {
    const [phones, docs] = await Promise.all([
      client.getAllByType('phone', { pageSize: 10 }),
      client.getAllByType('phone', { pageSize: 100 }),
    ]);
    const uniqueBrands = [...new Set(docs.map((doc) => doc.data.name).filter(Boolean))];
    const uniqueCapacities = [...new Set(docs.map((doc) => doc.data.capacity).filter(Boolean))];
    const uniqueColors = [...new Set(docs.map((doc) => doc.data.color).filter(Boolean))];

    return (
      <HomePage
        phoneList={phones}
        uniqueBrands={uniqueBrands as string[]}
        uniqueCapacities={uniqueCapacities as number[]}
        uniqueColors={uniqueColors as string[]}
      />
    );
  } catch (error) {
    console.error('Error data loading', error);
    notFound();
  }
}
