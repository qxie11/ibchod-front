import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import EditBlogArticlePage from '@/pages-components/admin/blog/[id]/edit/page';

export const metadata: Metadata = {
  title: 'Upravit článek | Admin Panel',
  description: 'Úprava článku blogu',
};

export default async function Page({ params }: { params: { id: string } }) {
  try {
    // Сначала получаем список всех статей
    const articlesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
      cache: 'no-store',
    });

    if (!articlesResponse.ok) {
      throw new Error('Failed to fetch articles');
    }

    const articlesData = await articlesResponse.json();
    const article = articlesData.items?.find((item: any) => item.id.toString() === params.id);

    if (!article) {
      notFound();
    }

    return <EditBlogArticlePage article={article} />;
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}
