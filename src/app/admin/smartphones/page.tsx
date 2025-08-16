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
import { Pagination, PaginationContent } from '@/shared/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { SmartphoneFormDialog } from './smartphone-form-dialog';

const ITEMS_PER_PAGE = 10;
export default function AdminSmartphonesPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');

  const activePagination = usePagination();
  const inactivePagination = usePagination();

  const currentPagination = activeTab === 'active' ? activePagination : inactivePagination;
  const { currentPage, onPageChange } = currentPagination;

  const {
    data: activeData,
    error: activeError,
    isLoading: activeLoading,
  } = useGetProductsQuery({
    take: ITEMS_PER_PAGE,
    skip: activePagination.skip,
    active: true,
  });

  const {
    data: inactiveData,
    error: inactiveError,
    isLoading: inactiveLoading,
  } = useGetProductsQuery({
    take: ITEMS_PER_PAGE,
    skip: inactivePagination.skip,
    active: false,
  });

  const [deleteSmartphone] = useDeleteSmartphoneMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSmartphone, setSelectedSmartphone] = useState<Smartphone | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [smartphoneToDelete, setSmartphoneToDelete] = useState<Smartphone | null>(null);

  const error =
    (activeTab === 'active' && activeError) || (activeTab === 'inactive' && inactiveError);

  if (error) {
    return <div>Chyba při načítání produktů</div>;
  }

  const activeProducts = activeData?.items ?? [];
  const inactiveProducts = inactiveData?.items ?? [];
  const totalActiveProducts = activeData?.total ?? 0;
  const totalInactiveProducts = inactiveData?.total ?? 0;

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
          <TableHead className="hidden w-[100px] sm:table-cell">Obrázek</TableHead>
          <TableHead>Název</TableHead>
          <TableHead>Cena</TableHead>
          <TableHead>Stav</TableHead>
          <TableHead>
            <span className="sr-only">Akce</span>
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
                {product.active ? 'Aktivní' : 'Neaktivní'}
              </Badge>
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
                  <DropdownMenuItem onSelect={() => handleEdit(product)}>Upravit</DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleDeleteClick(product)}
                    className="text-red-600"
                  >
                    Smazat
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
              <CardTitle>Smartphony</CardTitle>
              <CardDescription>Spravujte své produkty zde.</CardDescription>
            </div>
            <Button size="sm" onClick={handleAddNew}>
              Přidat nový
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value as 'active' | 'inactive');
              // Сброс пагинации при переключении вкладок
              if (value === 'active') {
                activePagination.onPageChange(1);
              } else {
                inactivePagination.onPageChange(1);
              }
            }}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Aktivní ({totalActiveProducts})
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Neaktivní ({totalInactiveProducts})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              {activeLoading ? (
                <div className="flex justify-center p-8">
                  <Loader />
                </div>
              ) : (
                <ProductTable products={activeProducts} />
              )}
            </TabsContent>
            <TabsContent value="inactive">
              {inactiveLoading ? (
                <div className="flex justify-center p-8">
                  <Loader />
                </div>
              ) : (
                <ProductTable products={inactiveProducts} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <div className="flex justify-center p-4">
          <Pagination>
            <PaginationContent
              currentPage={currentPage}
              totalItems={activeTab === 'active' ? totalActiveProducts : totalInactiveProducts}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={onPageChange}
            />
          </Pagination>
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
            <AlertDialogTitle>Jste si jisti?</AlertDialogTitle>
            <AlertDialogDescription>
              Tuto akci nelze vrátit zpět. Tímto trvale smažete smartphone &quot;
              {smartphoneToDelete?.name}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušit</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Smazat</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
