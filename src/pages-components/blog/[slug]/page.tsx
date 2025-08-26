'use client';

import { Calendar, Eye, Share2, Tag, User } from 'lucide-react';

import { useState } from 'react';

import Image from 'next/image';

import { RelatedArticles } from '@/components/related-articles';
import { ShareModal } from '@/components/share-modal';
import { Badge } from '@/shared/ui/badge';
import { Breadcrumb } from '@/shared/ui/breadcrumb';
import { Button } from '@/shared/ui/button';
import Container from '@/shared/ui/container';
import { HtmlContent } from '@/shared/ui/html-content';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { Header } from '@/widgets/header';

interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  published: boolean;
  publishedAt: string;
  tags: string[];
  featuredImage: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface BlogArticlePageProps {
  article?: BlogArticle;
  relatedArticles?: BlogArticle[];
}

export default function BlogArticlePage({ article, relatedArticles = [] }: BlogArticlePageProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  if (!article) {
    return (
      <>
        <Header />
        <main>
          <Container className="py-8 w-full">
            <div className="text-center">
              <Title variant="h1" className="text-2xl font-bold mb-4">
                Článek nebyl nalezen
              </Title>
              <Text className="text-gray-600 mb-6">
                Požadovaný článek neexistuje nebo byl odstraněn.
              </Text>
              <Button href="/blog" variant="default">
                Zpět na blog
              </Button>
            </div>
          </Container>
        </main>
      </>
    );
  }

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage || 'https://iobchod.cz/blog-og-image.png',
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'IObchod',
      url: 'https://iobchod.cz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://iobchod.cz/logo.png',
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://iobchod.cz/blog/${article.slug}`,
    },
    keywords: article.tags.join(', '),
    articleSection: 'Technologie',
    inLanguage: 'cs-CZ',
    isAccessibleForFree: true,
    wordCount: article.content.replace(/<[^>]*>/g, '').split(' ').length,
  };

  // Извлекаем время чтения из контента
  const wordCount = article.content.replace(/<[^>]*>/g, '').split(' ').length;
  const readingTime = Math.ceil(wordCount / 200); // 200 слов в минуту

  return (
    <>
      <Header />

      {/* Структурированные данные */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main>
        <Container className="py-8 w-full">
          <div className="mb-6">
            <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: article.title }]} />
          </div>

          {/* Article Header */}
          <article
            className="max-w-4xl mx-auto"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <meta itemProp="datePublished" content={article.publishedAt} />
            <meta itemProp="dateModified" content={article.updatedAt} />
            <meta itemProp="author" content={article.author} />
            <meta itemProp="publisher" content="IObchod" />
            <meta itemProp="inLanguage" content="cs-CZ" />
            <meta itemProp="isAccessibleForFree" content="true" />

            <header className="mb-8">
              {/* Tags */}
              <nav aria-label="Kategorie článku" className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 border-blue-200"
                      itemProp="keywords"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </nav>

              {/* Title */}
              <Title
                variant="h1"
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
                itemProp="headline"
              >
                {article.title}
              </Title>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span itemProp="author">{article.author}</span>
                </div>
                <time
                  className="flex items-center gap-2"
                  dateTime={article.publishedAt}
                  itemProp="datePublished"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.publishedAt).toLocaleDateString('cs-CZ')}</span>
                </time>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{article.viewCount} zobrazení</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{readingTime} min čtení</span>
                </div>
              </div>

              {/* Excerpt */}
              <Text className="text-xl text-gray-600 leading-relaxed mb-8" itemProp="description">
                {article.excerpt}
              </Text>
            </header>

            {/* Featured Image */}
            {article.featuredImage && (
              <figure className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  itemProp="image"
                />
                <figcaption className="sr-only">{article.title}</figcaption>
              </figure>
            )}

            {/* Article Content */}
            <div itemProp="articleBody">
              <HtmlContent content={article.content} />
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Text className="text-gray-600">Sdílet článek:</Text>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-gray-600 hover:text-gray-900"
                    aria-label="Sdílet článek na sociálních sítích"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Sdílet
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  <time dateTime={article.updatedAt}>
                    Poslední aktualizace: {new Date(article.updatedAt).toLocaleDateString('cs-CZ')}
                  </time>
                </div>
              </div>
            </footer>
          </article>

          {/* Related Articles */}
          <RelatedArticles
            articles={relatedArticles}
            currentArticleId={article.id}
            currentTags={article.tags}
          />
        </Container>
      </main>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={article.title}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        excerpt={article.excerpt}
      />
    </>
  );
}
