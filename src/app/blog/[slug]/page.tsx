import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import BlogArticlePage from '@/pages-components/blog/[slug]/page';

export const metadata: Metadata = {
  title: 'Článek | Blog',
  description: 'Článek z blogu',
};

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const article = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/slug/${params.slug}`).then(
      (res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch article');
        }
        return res.json();
      }
    );

    if (!article) {
      notFound();
    }

    return <BlogArticlePage article={article} />;
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}
