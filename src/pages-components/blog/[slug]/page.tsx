'use client';

import { ArrowLeft, Calendar, Eye, Share2, Tag, User } from 'lucide-react';

import Image from 'next/image';

import { useGetBlogArticleBySlugQuery } from '@/shared/lib/slices/blogApi';
import { Badge } from '@/shared/ui/badge';
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
  article: BlogArticle;
}

export default function BlogArticlePage({ article: initialArticle }: BlogArticlePageProps) {
  const {
    data: article,
    isLoading,
    error,
  } = useGetBlogArticleBySlugQuery(initialArticle.slug, {
    initialData: initialArticle,
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: article?.title,
          text: article?.excerpt,
          url: window.location.href,
        })
        .catch((error) => {
          console.log('Error sharing:', error);
          copyToClipboard();
        });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert('Odkaz byl zkopírován do schránky!');
      })
      .catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Odkaz byl zkopírován do schránky!');
      });
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <Container className="py-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <Text className="mt-4">Načítání článku...</Text>
          </div>
        </Container>
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Header />
        <Container className="flex-1 py-8">
          <div className="text-center py-20">
            <Title variant="h1" className="text-2xl font-bold mb-2">
              Článek nenalezen
            </Title>
            <Text className="text-muted-foreground">Článek, který hledáte, neexistuje.</Text>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />

      <Container className="py-8 w-full">
        <div className="mb-6">
          <Button
            size="sm"
            variant="ghost"
            href="/blog"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Zpět na blog
          </Button>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 border-blue-200"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <Title variant="h1" className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {article.title}
            </Title>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishedAt).toLocaleDateString('cs-CZ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{article.viewCount} zobrazení</span>
              </div>
              <div className="flex items-center gap-2">
                <span>5 min čtení</span>
              </div>
            </div>

            {/* Excerpt */}
            <Text className="text-xl text-gray-600 leading-relaxed mb-8">{article.excerpt}</Text>
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
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
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Sdílet
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                Poslední aktualizace: {new Date(article.updatedAt).toLocaleDateString('cs-CZ')}
              </div>
            </div>
          </footer>
        </article>
      </Container>
    </>
  );
}
