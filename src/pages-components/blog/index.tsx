'use client';

import { ArrowRight, Calendar, Clock, Tag, User } from 'lucide-react';

import Image from 'next/image';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import Container from '@/shared/ui/container';
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

interface BlogPageProps {
  articles: BlogArticle[];
}

export default function BlogPage({ articles }: BlogPageProps) {
  const featuredArticles = articles.slice(0, 3);
  const regularArticles = articles.slice(3);

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <Title variant="h1" className="text-4xl md:text-6xl font-bold mb-6">
              IObchod Blog
            </Title>
            <Text className="text-xl md:text-2xl text-blue-100 mb-8">
              Nejnovější články o iPhonech, technologiích a udržitelnosti
            </Text>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Tag className="w-3 h-3 mr-1" />
                iPhone
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Tag className="w-3 h-3 mr-1" />
                Technologie
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Tag className="w-3 h-3 mr-1" />
                Udržitelnost
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Tag className="w-3 h-3 mr-1" />
                Apple
              </Badge>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-16">
            <Title variant="h2" className="text-3xl font-bold mb-8 text-center">
              Doporučené články
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={article.featuredImage || 'https://placehold.co/400x300.png?text=Blog'}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {article.tags[0]}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.publishedAt).toLocaleDateString('cs-CZ')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>5 min čtení</span>
                      </div>
                    </div>
                    <Title variant="h3" className="text-xl font-bold mb-3 line-clamp-2">
                      {article.title}
                    </Title>
                    <Text className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</Text>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        href={`/blog/${article.slug}`}
                        className="flex items-center gap-1"
                      >
                        Číst více
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Articles */}
        <section>
          <Title variant="h2" className="text-3xl font-bold mb-8 text-center">
            Všechny články
          </Title>
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <Text className="text-xl text-gray-600 mb-4">Zatím zde nejsou žádné články</Text>
              <Text className="text-gray-500">
                Brzy přidáme zajímavé články o technologiích a iPhonech
              </Text>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-40">
                    <Image
                      src={article.featuredImage || 'https://placehold.co/400x300.png?text=Blog'}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800 text-xs">
                        {article.tags[0]}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(article.publishedAt).toLocaleDateString('cs-CZ')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>5 min</span>
                      </div>
                    </div>
                    <Title variant="h4" className="text-lg font-bold mb-2 line-clamp-2">
                      {article.title}
                    </Title>
                    <Text className="text-gray-600 mb-3 line-clamp-2 text-sm">
                      {article.excerpt}
                    </Text>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        href={`/blog/${article.slug}`}
                        className="flex items-center gap-1 text-sm"
                      >
                        Číst
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </Container>
    </>
  );
}
