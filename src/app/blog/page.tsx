import type { Metadata } from 'next';

import BlogPage from '@/pages-components/blog';

export const metadata: Metadata = {
  title: 'Blog - Nejnovější články o iPhonech a technologiích | IObchod',
  description:
    'Objevte nejnovější články o iPhonech, technologiích a udržitelnosti. Tipy, recenze, porovnání a novinky ze světa Apple a repasovaných zařízení. Expertní rady pro výběr a používání iPhone.',
  keywords: [
    'blog iPhone',
    'články o technologiích',
    'Apple novinky',
    'repasované telefony',
    'udržitelnost',
    'technologie',
    'IObchod blog',
    'iPhone recenze',
    'Apple tipy',
    'mobilní technologie',
    'smartphone porovnání',
    'iOS novinky',
    'iPhone nákup',
    'Apple ekosystém',
    'mobilní aplikace',
    'iPhone příslušenství',
    'Apple bezpečnost',
    'iPhone baterie',
    'Apple udržitelnost',
    'technologické novinky',
  ],
  authors: [{ name: 'IObchod Team' }],
  openGraph: {
    title: 'Blog - Nejnovější články o iPhonech a technologiích | IObchod',
    description:
      'Objevte nejnovější články o iPhonech, technologiích a udržitelnosti. Tipy, recenze a novinky ze světa Apple.',
    url: '/blog',
    siteName: 'IObchod',
    images: [
      {
        url: '/blog-og-image.png',
        width: 1200,
        height: 630,
        alt: 'IObchod Blog - Články o technologiích a iPhonech',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Nejnovější články o iPhonech a technologiích | IObchod',
    description:
      'Objevte nejnovější články o iPhonech, technologiích a udržitelnosti. Tipy, recenze a novinky ze světa Apple.',
    images: ['/blog-twitter-image.png'],
  },
  alternates: {
    canonical: '/blog',
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
  other: {
    'article:publisher': 'https://iobchod.cz',
    'article:section': 'Technologie',
    'article:tag': 'iPhone, Apple, Technologie, Udržitelnost',
  },
};

export default async function Page() {
  try {
    const articles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
      cache: 'no-store',
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch articles');
      }
      return res.json();
    });

    return <BlogPage articles={articles.items || []} />;
  } catch (error) {
    console.error('Error loading blog articles:', error);
    return <BlogPage articles={[]} />;
  }
}
