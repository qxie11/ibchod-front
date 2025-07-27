'use client';

import { MoreHorizontal } from 'lucide-react';

import { useState } from 'react';

import Image from 'next/image';

import { Smartphone } from '@/entities/product/model/types';
import { usePagination } from '@/hooks/use-pagination';
import { useDeleteSmartphoneMutation, useGetProductsQuery } from '@/shared/lib/slices/productApi';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import Loader from '@/shared/ui/loader';
import { Pagination } from '@/shared/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { SmartphoneFormDialog } from './smartphone-form-dialog';

const ITEMS_PER_PAGE = 10;
export default function AdminSmartphonesPage() {
  const { currentPage, onPageChange, skip } = usePagination();
  const { data, error, isLoading } = useGetProductsQuery({
    take: ITEMS_PER_PAGE,
    skip,
  });
  const [deleteSmartphone] = useDeleteSmartphoneMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSmartphone, setSelectedSmartphone] = useState<Smartphone | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [smartphoneToDelete, setSmartphoneToDelete] = useState<Smartphone | null>(null);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading products</div>;
  }
  const products = data?.items ?? [];
  const totalProducts = data?.total ?? 0;
  const activeProducts = products.filter((product: Smartphone) => product.active);
  const inactiveProducts = products.filter((product: Smartphone) => !product.active);

  const handleEdit = (product: Smartphone) => {
    setSelectedSmartphone(product);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setSelectedSmartphone(undefined);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (product: Smartphone) => {
    setSmartphoneToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (smartphoneToDelete) {
      await deleteSmartphone(smartphoneToDelete.id).unwrap();
      setSmartphoneToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const onDialogClose = () => {
    setIsFormOpen(false);
    setSelectedSmartphone(undefined);
  };

  const ProductTable = ({ products }: { products: Smartphone[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product: Smartphone) => (
          <TableRow key={product.id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                alt={product.name}
                className="aspect-square rounded-md object-cover"
                height="64"
                src={product.gallery?.[0] ?? 'https://placehold.co/64x64.png'}
                width="64"
                data-ai-hint="iphone"
              />
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.price.toLocaleString()} Kč</TableCell>
            <TableCell>
              <Badge variant={product.active ? 'default' : 'destructive'}>
                {product.active ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" className="px-2 py-1" size="small" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onSelect={() => handleEdit(product)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleDeleteClick(product)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Smartphones</CardTitle>
              <CardDescription>Manage your products here.</CardDescription>
            </div>
            <Button size="small" onClick={handleAddNew}>
              Add New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Active ({activeProducts.length})
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Inactive ({inactiveProducts.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <ProductTable products={activeProducts} />
            </TabsContent>
            <TabsContent value="inactive">
              <ProductTable products={inactiveProducts} />
            </TabsContent>
          </Tabs>
        </CardContent>
        <div className="flex justify-center p-4">
          <Pagination
            currentPage={currentPage}
            totalItems={totalProducts}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={onPageChange}
          />
        </div>
      </Card>
      <SmartphoneFormDialog
        open={isFormOpen}
        onOpenChange={onDialogClose}
        smartphone={selectedSmartphone}
      />
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the smartphone &quot;
              {smartphoneToDelete?.name}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
