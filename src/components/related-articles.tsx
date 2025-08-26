'use client';

import { ArrowRight, Calendar } from 'lucide-react';

import Image from 'next/image';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

interface RelatedArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  featuredImage: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  currentArticleId: number;
  currentTags: string[];
}

export function RelatedArticles({ articles, currentArticleId, currentTags }: RelatedArticlesProps) {
  // Фильтруем статьи, исключая текущую и выбирая по тегам
  const relatedArticles = articles
    .filter((article) => article.id !== currentArticleId)
    .filter((article) => article.tags.some((tag) => currentTags.includes(tag)))
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-200" aria-labelledby="related-articles">
      <Title variant="h2" id="related-articles" className="text-2xl font-bold mb-6 text-gray-900">
        Související články
      </Title>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedArticles.map((article) => (
          <article
            key={article.id}
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <meta itemProp="datePublished" content={article.publishedAt} />
            <meta itemProp="author" content="IObchod Team" />
            <meta itemProp="publisher" content="IObchod" />

            <div className="relative h-48 overflow-hidden">
              <Image
                src={article.featuredImage || 'https://placehold.co/400x300.png?text=Blog'}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                itemProp="image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 left-3">
                <Badge
                  variant="secondary"
                  className="bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 shadow-sm border border-gray-200"
                >
                  {article.tags[0]}
                </Badge>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <time
                  className="flex items-center gap-1.5 font-medium"
                  dateTime={article.publishedAt}
                >
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{new Date(article.publishedAt).toLocaleDateString('cs-CZ')}</span>
                </time>
              </div>

              <Title
                variant="h3"
                className="text-lg font-bold mb-3 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-200"
                itemProp="headline"
              >
                {article.title}
              </Title>

              <Text
                className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed"
                itemProp="description"
              >
                {article.excerpt}
              </Text>

              <Button
                variant="ghost"
                size="sm"
                href={`/blog/${article.slug}`}
                className="flex items-center gap-2 text-sm w-full justify-center py-2.5 px-4 rounded-lg bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 group-hover:bg-blue-50 group-hover:text-blue-600"
                aria-label={`Přečíst článek: ${article.title}`}
              >
                <span className="font-medium">Číst článek</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
