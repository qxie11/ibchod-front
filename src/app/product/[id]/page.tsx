import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import ProductPage from '@/pages-components/product/[id]/page';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/smartphones/slug/${id}`).then(
      (res) => res.json()
    );

    if (!product) {
      return {
        title: 'Produkt nenalezen',
        description: 'Požadovaný iPhone model nebyl nalezen v naší nabídce.',
      };
    }

    return {
      title: `${product.name} - IObchod`,
      description: `${product.name} - ${product.small_desc || 'Kvalitní iPhone s garantovanou zárukou'}. Cena: ${product.price} Kč. Rychlé doručení po celé České republice.`,
      keywords: [
        'iPhone',
        product.name,
        'Apple',
        'smartphone',
        'mobilní telefon',
        'záruka',
        'doručení',
      ],
      openGraph: {
        title: `${product.name} - IObchod`,
        description: `${product.name} - ${product.small_desc || 'Kvalitní iPhone s garantovanou zárukou'}. Cena: ${product.price} Kč.`,
        url: `https://iphone-store-jet.vercel.app/product/${id}`,
        siteName: 'IObchod',
        images:
          product.gallery && product.gallery.length > 0
            ? [
                {
                  url: product.gallery[0],
                  width: 800,
                  height: 600,
                  alt: product.name,
                },
              ]
            : [
                {
                  url: '/icons/icon-512x512.png',
                  width: 512,
                  height: 512,
                  alt: product.name,
                },
              ],
        locale: 'cs_CZ',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} - IObchod`,
        description: `${product.name} - ${product.small_desc || 'Kvalitní iPhone s garantovanou zárukou'}.`,
        images:
          product.gallery && product.gallery.length > 0
            ? [product.gallery[0]]
            : ['/icons/icon-512x512.png'],
      },
      alternates: {
        canonical: `/product/${id}`,
      },
    };
  } catch {
    return {
      title: 'Produkt nenalezen',
      description: 'Požadovaný iPhone model nebyl nalezen v naší nabídce.',
    };
  }
}

export default async function Page(props: { params: { id: string } }) {
  const params = await props.params;
  const slug = params.id;
  try {
    const [product, relatedProducts] = await Promise.all([
      (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/smartphones/slug/${slug}`)).json(),
      (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/smartphones/related-smartphones/${slug}`)
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
