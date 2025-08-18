import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { Smartphone } from '@/entities/product/model/types';
import ProductPage from '@/pages-components/product/[id]/page';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const product: Smartphone = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/smartphones/slug/${id}`
    ).then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch product');
      }
      return res.json();
    });

    if (!product) {
      return {
        title: 'Produkt nenalezen',
        description: 'Požadovaný iPhone model nebyl nalezen v naší nabídce.',
      };
    }
    const title = `iPhone ${product.name} ${product.capacity}GB ${product.color} | IObchod`;
    const description = `Kupte si repasovaný iPhone ${product.name} s kapacitou ${product.capacity}GB v barvě ${product.color}. Záruka 12 měsíců a doprava zdarma. Ušetřete peníze i planetu.`;
    const canonicalUrl = `/product/${id}`;

    return {
      title,
      description,
      keywords: [
        'iPhone',
        product.name,
        `${product.capacity}GB`,
        product.color || '',
        'repasovaný iPhone',
        'použitý iPhone',
        'Apple',
        'smartphone',
        'mobilní telefon',
        'záruka',
        'doručení',
      ],
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: 'IObchod',
        images:
          product.gallery && product.gallery.length > 0
            ? product.gallery.map((img) => ({
                url: img,
                width: 600,
                height: 600,
                alt: `iPhone ${product.name} ${product.color}`,
              }))
            : [
                {
                  url: '/icons/icon-512x512.png',
                  width: 512,
                  height: 512,
                  alt: title,
                },
              ],
        locale: 'cs_CZ',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images:
          product.gallery && product.gallery.length > 0
            ? [product.gallery[0]]
            : ['/icons/icon-512x512.png'],
      },
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch {
    return {
      title: 'Produkt nenalezen',
      description: 'Požadovaný iPhone model nebyl nalezen v naší nabídce.',
      robots: {
        index: false,
      },
    };
  }
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
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
