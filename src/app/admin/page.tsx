'use client';

import { ListOrdered, Package } from 'lucide-react';

import Link from 'next/link';

import { useGetOrdersQuery } from '@/shared/lib/slices/orderApi';
import { useGetProductsQuery } from '@/shared/lib/slices/productApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { Title } from '@/shared/ui/title';

export default function AdminDashboardPage() {
  const { data: productsData, isLoading: productsLoading } = useGetProductsQuery({
    take: 10,
  });
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersQuery();

  const productCount = productsData?.items?.length ?? 0;
  const orderCount = ordersData?.length ?? 0;

  return (
    <div>
      <Title variant="h1" className="mb-6">
        Admin Dashboard
      </Title>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {productsLoading ? (
              <Skeleton className="h-8 w-1/4" />
            ) : (
              <div className="text-2xl font-bold">{productCount}</div>
            )}
            <Link
              href="/admin/smartphones"
              className="text-xs text-muted-foreground hover:underline"
            >
              View all products
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <Skeleton className="h-8 w-1/4" />
            ) : (
              <div className="text-2xl font-bold">{orderCount}</div>
            )}
            <Link href="/admin/orders" className="text-xs text-muted-foreground hover:underline">
              View all orders
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
