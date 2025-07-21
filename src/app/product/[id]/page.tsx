import { uniq } from 'lodash';

import { notFound } from 'next/navigation';

import ProductPage from '@/pages-components/product/[id]/page';

export default async function Page(props: { params: { id: string } }) {
  const params = await props.params;
  const slug = params.id;
  try {
    const product = await (
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/smartphones/slug/${slug}`)
    ).json();

    if (!product) {
      notFound();
    }

    const [similarByName, similarByCapacity] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/smartphones?name=${encodeURIComponent(product.name)}`
      ).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/smartphones?capacity=${product.capacity}`).then(
        (res) => res.json()
      ),
    ]);

    const allSimilar = [
      ...(Array.isArray(similarByName.items) ? similarByName.items : []),
      ...(Array.isArray(similarByCapacity.items) ? similarByCapacity.items : []),
    ];
    const filteredSimilar = uniq(allSimilar).filter(
      (p, idx, arr) => p.id !== product.id && arr.findIndex((x) => x.id === p.id) === idx
    );

    return <ProductPage product={product} similarProducts={filteredSimilar} />;
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}
