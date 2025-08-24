'use client';

import { Edit, MoreHorizontal, Plus, Trash2 } from 'lucide-react';

import { useState } from 'react';

import Image from 'next/image';

import { AdminGuard } from '@/components/auth/admin-guard';
import { useDeleteBlogArticleMutation, useGetBlogArticlesQuery } from '@/shared/lib/slices/blogApi';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import Container from '@/shared/ui/container';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import Loader from '@/shared/ui/loader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Title } from '@/shared/ui/title';

export default function AdminBlogPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);

  const { data: blogData, isLoading, error } = useGetBlogArticlesQuery({ limit: 100 });
  const [deleteArticle] = useDeleteBlogArticleMutation();

  const articles = blogData?.items || [];

  const handleDeleteClick = (articleId: number) => {
    setArticleToDelete(articleId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (articleToDelete) {
      try {
        await deleteArticle(articleToDelete).unwrap();
        setIsDeleteDialogOpen(false);
        setArticleToDelete(null);
      } catch (error) {
        console.error('Error deleting article:', error);
        alert('Chyba při mazání článku');
      }
    }
  };

  if (isLoading) {
    return (
      <AdminGuard>
        <Container className="py-8">
          <div className="text-center py-20">
            <Loader />
          </div>
        </Container>
      </AdminGuard>
    );
  }

  if (error) {
    return (
      <AdminGuard>
        <Container className="py-8">
          <div className="text-center py-20">
            <Title variant="h1" className="text-2xl font-bold mb-2">
              Chyba při načítání
            </Title>
            <p className="text-muted-foreground">
              Nepodařilo se načíst články. Zkuste to prosím později.
            </p>
          </div>
        </Container>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <Container className="py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Blog články</CardTitle>
                <CardDescription>Spravujte články blogu zde.</CardDescription>
              </div>
              <Button size="sm" href="/admin/blog/new">
                <Plus className="w-4 h-4 mr-2" />
                Přidat nový
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">Obrázek</TableHead>
                  <TableHead>Název</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Stav</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>
                    <span className="sr-only">Akce</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={article.title}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={article.featuredImage || 'https://placehold.co/64x64.png?text=Blog'}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{article.title}</div>
                        <div className="text-sm text-gray-500">{article.slug}</div>
                      </div>
                    </TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>
                      <Badge variant={article.published ? 'default' : 'destructive'}>
                        {article.published ? 'Publikován' : 'Koncept'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(article.publishedAt || article.createdAt).toLocaleDateString(
                        'cs-CZ'
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Akce</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              href={`/admin/blog/${article.id}/edit`}
                              className="w-full justify-start"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Upravit
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => handleDeleteClick(article.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Smazat
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {articles.length === 0 && (
              <div className="text-center py-12">
                <Title variant="h3" className="text-lg font-semibold mb-2">
                  Žádné články
                </Title>
                <p className="text-muted-foreground mb-4">Zatím nejsou k dispozici žádné články.</p>
                <Button href="/admin/blog/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Vytvořit první článek
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        {isDeleteDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <Title variant="h3" className="text-lg font-semibold mb-4">
                Smazat článek
              </Title>
              <p className="text-gray-600 mb-6">
                Jste si jisti, že chcete smazat tento článek? Tuto akci nelze vrátit zpět.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDeleteDialogOpen(false);
                    setArticleToDelete(null);
                  }}
                >
                  Zrušit
                </Button>
                <Button variant="destructive" onClick={handleDeleteConfirm}>
                  Smazat
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </AdminGuard>
  );
}
