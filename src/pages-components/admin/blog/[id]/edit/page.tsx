'use client';

import { ArrowLeft, Save } from 'lucide-react';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { AdminGuard } from '@/components/auth/admin-guard';
import { useUpdateBlogArticleMutation } from '@/shared/lib/slices/blogApi';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import Container from '@/shared/ui/container';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { RichTextEditor } from '@/shared/ui/rich-text-editor';
import { Textarea } from '@/shared/ui/textarea';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

interface EditBlogArticlePageProps {
  article: {
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
    createdAt: string;
    updatedAt: string;
  };
}

export default function EditBlogArticlePage({ article }: EditBlogArticlePageProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: '',
    tags: '',
    published: false,
  });

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [updateArticle, { isLoading: isSubmitting }] = useUpdateBlogArticleMutation();

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        slug: article.slug || '',
        content: article.content || '',
        excerpt: article.excerpt || '',
        author: article.author || '',
        tags: article.tags ? article.tags.join(', ') : '',
        published: article.published || false,
      });

      if (article.featuredImage) {
        setImagePreview(article.featuredImage);
      }
    }
  }, [article]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    handleInputChange('title', title);
    if (!formData.slug) {
      handleInputChange('slug', generateSlug(title));
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('Soubor je příliš velký. Maximální velikost je 5MB.');
        return;
      }

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        alert('Povolené jsou pouze obrázky ve formátu JPEG, PNG nebo WebP.');
        return;
      }

      setFeaturedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('published', formData.published ? 'true' : 'false');

      tags.forEach((tag) => {
        formDataToSend.append('tags', tag);
      });

      if (featuredImage) {
        formDataToSend.append('featuredImage', featuredImage);
      }

      await updateArticle({ id: article.id, body: formDataToSend }).unwrap();
      alert('Článek byl úspěšně upraven!');
      window.location.href = '/admin/blog';
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Chyba při úpravě článku');
    }
  };

  return (
    <AdminGuard>
      <Container className="py-8">
        <div className="mb-6">
          <Button variant="ghost" href="/admin/blog" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Zpět na blog
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upravit článek: {article.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Název článku *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Zadejte název článku"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="url-slug-clanku"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Krátký popis *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Krátký popis článku pro náhled"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="author">Autor *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="Jméno autora"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tagy (oddělené čárkami)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="iPhone, Technologie, Apple"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuredImage">Obrázek článku</Label>
                <Input
                  id="featuredImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:border-0 file:bg-transparent file:text-sm file:font-medium"
                />
                <p className="text-sm text-gray-500">
                  Povolené formáty: JPEG, PNG, WebP. Maximální velikost: 5MB.
                </p>
              </div>

              {imagePreview && (
                <div className="space-y-2">
                  <Label>Náhled obrázku</Label>
                  <div className="relative w-64 h-48 rounded-lg overflow-hidden border">
                    <Image src={imagePreview} alt="Náhled obrázku" fill className="object-cover" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => handleInputChange('content', value)}
                  placeholder="Zadejte obsah článku..."
                  label="Obsah článku"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => handleInputChange('published', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="published">Publikovat článek</Label>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => (window.location.href = '/admin/blog')}
                >
                  Zrušit
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {isSubmitting ? 'Ukládám...' : 'Uložit změny'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </AdminGuard>
  );
}
