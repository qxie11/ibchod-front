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

    return <ProductPage product={product} similarProducts={[]} />;
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}
