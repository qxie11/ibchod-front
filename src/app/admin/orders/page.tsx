'use client';

import { format } from 'date-fns';
import { Eye } from 'lucide-react';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Order } from '@/entities/order/model/types';
import { useGetOrdersQuery } from '@/shared/lib/slices/orderApi';
import { Card, CardContent } from '@/shared/ui/card';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import Loader from '@/shared/ui/loader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

export default function AdminOrdersPage() {
  const { data: orders, error, isLoading } = useGetOrdersQuery();
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);
  const selectedOrder = orders?.find((o: Order) => o.id === openOrderId);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !orders) {
    return <div>Chyba při načítání objednávek</div>;
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Číslo objednávky</TableHead>
              <TableHead>Zákazník</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead className="text-right">Detaily</TableHead>
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
                <TableCell>{order.phone}</TableCell>
                <TableCell>{format(new Date(order.createdAt), 'dd.MM.yyyy')}</TableCell>
                <TableCell className="text-right">
                  <button onClick={() => setOpenOrderId(order.id)}>
                    <Eye className="w-5 h-5 hover:text-primary transition" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={!!openOrderId} onOpenChange={() => setOpenOrderId(null)}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Detaily objednávky</DialogTitle>
            </DialogHeader>
            {selectedOrder ? (
              <div className="space-y-4">
                <div>
                  <strong>Zákazník:</strong> {selectedOrder.name} ({selectedOrder.email})
                  <br />
                  <strong>Telefon:</strong> {selectedOrder.phone}
                </div>
                <div>
                  <strong>Položky:</strong>
                  <div className="mt-2 space-y-4">
                    {(selectedOrder.items as any[])?.map(({ smartphone: item, quantity }) => (
                      <Card key={item.id} className="flex items-center p-4">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image
                            src={item.gallery?.[0] ?? ''}
                            alt={item.name ?? 'iPhone'}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className="flex-1 ml-4">
                          <Title variant="h4" className="!text-lg font-semibold">
                            <Link href={`/product/${item.slug}`} className="hover:underline">
                              {item.name}
                            </Link>
                          </Title>
                          <Text className="text-sm text-muted-foreground">
                            {item.capacity}GB - {item.color}
                          </Text>
                          <div className="flex items-center gap-2 mb-2">
                            <Text className="font-medium text-green-600">
                              {(item.price ?? 0).toLocaleString()} Kč
                            </Text>
                          </div>
                        </div>
                        <div className="w-24 text-center font-medium">x{quantity}</div>
                        <div className="font-bold w-24 text-right">
                          {((item.price ?? 0) * quantity).toLocaleString()} Kč
                        </div>
                        <div className="ml-4 text-xs text-muted-foreground">
                          {item.active ? 'Aktivní' : 'Neaktivní'}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                <DialogClose asChild>
                  <button className="mt-4 btn btn-primary">Zavřít</button>
                </DialogClose>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
