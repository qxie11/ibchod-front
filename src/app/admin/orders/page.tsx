'use client';

import { format } from 'date-fns';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Order } from '@/entities/order/model/types';
import { useGetOrdersQuery } from '@/shared/lib/slices/orderApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import Loader from '@/shared/ui/loader';

export default function AdminOrdersPage() {
  const { data: orders, error, isLoading } = useGetOrdersQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error || !orders) {
    return <div>Error loading orders</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>
                  <div>{order.name}</div>
                  <div className="text-sm text-muted-foreground">{order.email}</div>
                </TableCell>
                <TableCell>{format(new Date(order.createdAt), 'dd.MM.yyyy')}</TableCell>
                <TableCell className="text-right">{order.total.toLocaleString()} Kč</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
