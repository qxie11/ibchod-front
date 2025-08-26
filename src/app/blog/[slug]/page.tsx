import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import BlogArticlePage from '@/pages-components/blog/[slug]/page';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/slug/${slug}`).then(
      (res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch article');
        }
        return res.json();
      }
    );

    if (!article) {
      return {
        title: 'Článek nenalezen | IObchod Blog',
        description: 'Požadovaný článek nebyl nalezen.',
      };
    }

    const textContent = article.content.replace(/<[^>]*>/g, '').substring(0, 160);

    return {
      title: `${article.title} | IObchod Blog`,
      description: article.excerpt || textContent,
      keywords: [...article.tags, 'iPhone', 'Apple', 'technologie', 'blog', 'články', 'IObchod'],
      authors: [{ name: article.author }],
      openGraph: {
        title: article.title,
        description: article.excerpt || textContent,
        url: `/blog/${article.slug}`,
        siteName: 'IObchod Blog',
        images: [
          {
            url: article.featuredImage || '/blog-og-image.png',
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        locale: 'cs_CZ',
        type: 'article',
        publishedTime: article.publishedAt,
        modifiedTime: article.updatedAt,
        authors: [article.author],
        tags: article.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt || textContent,
        images: [article.featuredImage || '/blog-twitter-image.png'],
      },
      alternates: {
        canonical: `/blog/${article.slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (_error) {
    return {
      title: 'Článek | IObchod Blog',
      description: 'Článek z blogu o iPhonech a technologiích.',
    };
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const article = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/slug/${slug}`).then(
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

    let relatedArticles = [];
    try {
      const allArticles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch articles');
        }
        return res.json();
      });
      relatedArticles = allArticles.items || [];
    } catch (error) {
      console.error('Error loading related articles:', error);
    }

    return <BlogArticlePage article={article} relatedArticles={relatedArticles} />;
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}
