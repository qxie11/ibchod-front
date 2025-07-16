import * as prismic from '@prismicio/client';

import { notFound } from 'next/navigation';

import ProductPage from '@/pages-components/product/[id]/page';
import { createClient } from '@/prismicio';

export default async function Page(props: { params: { id: string } }) {
  const params = await props.params;
  const id = params.id;
  const client = createClient();
  try {
    const product = await client.getByUID('phone', id);
    if (!product) {
      notFound();
    }

    const modelTag = product.tags.find((tag: string) => tag.includes('model')) ?? '';
    const [_, numberType] = modelTag.split(' ');

    const similarProducts = await client.getAllByType('phone', {
      filters: [
        prismic.filter.not('my.phone.uid', id),
        prismic.filter.any('document.tags', [
          modelTag as string,
          `model ${+numberType + 1}`,
          `model ${+numberType - 1}`,
        ]),
      ].filter(Boolean) as string[],
      pageSize: 6,
    });
    return <ProductPage product={product} similarProducts={similarProducts} />;
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}
