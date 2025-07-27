import { notFound } from 'next/navigation';

import ProductPage from '@/pages-components/product/[id]/page';

export default async function Page(props: { params: { id: string } }) {
  const params = await props.params;
  const slug = params.id;
  try {
    const [product, relatedProducts] = await Promise.all([
      (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/smartphones/slug/${slug}`)).json(),
      (
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/smartphones/related-smartphones/${slug}`)
      ).json(),
    ]);

    if (!product) {
      notFound();
    }

    return <ProductPage product={product} similarProducts={relatedProducts} />;
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}
