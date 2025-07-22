'use client';

import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';

import Image from 'next/image';

import {
  removeFromCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from '@/entities/cart';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import Container from '@/shared/ui/container';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import { Separator } from '@/shared/ui/separator';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { Header } from '@/widgets/header';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartCount = useAppSelector(selectCartCount);
  const cartTotal = useAppSelector(selectCartTotal);

  return (
    <>
      <Header />
      <Container className="flex-1 py-8 w-full">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <LiquidGlass>
          <div className="p-6">
            <Title variant="h1" className="text-3xl font-bold mb-6">
              Váš košík
            </Title>
            {cartItems.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="flex items-center p-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src={item.gallery?.[0] ?? ''}
                          alt={item.name ?? 'iPhone'}
                          fill
                          style={{ objectFit: 'cover' }}
                          data-ai-hint="iphone side"
                        />
                      </div>
                      <div className="flex-1 ml-4">
                        <Title variant="h4" className="!text-lg font-semibold">
                          {item.name}
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
                      <div className="flex items-center gap-2 mx-4">
                        <Button
                          size="small"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                productId: item.id,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          size="small"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                productId: item.id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="font-bold w-24 text-right">
                        {((item.price ?? 0) * item.quantity).toLocaleString()} Kč
                      </div>
                      <Button
                        size="small"
                        variant="ghost"
                        className="ml-4 group"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <Trash2 className="group-hover:text-white h-3 w-3 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </Card>
                  ))}
                </div>
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Shrnutí objednávky</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Mezisoučet ({cartCount} položek)</span>
                        <span>{cartTotal?.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Doprava</span>
                        <span>Zdarma</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Celkem</span>
                        <span>{cartTotal?.toLocaleString()} Kč</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button href="/checkout" className="w-full">
                        Pokračovat k pokladně
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-center border-2 border-dashed rounded-lg py-20">
                <ShoppingCart className="h-16 w-16 text-muted-foreground/50" />
                <Title variant="h3" className="mb-4 text-xl font-semibold">
                  Váš košík je prázdný
                </Title>
                <Text className="text-muted-foreground mb-2">
                  Přidejte si produkty do košíku a začněte nakupovat.
                </Text>
                <Button size="small" href="/">
                  Zpět do obchodu
                </Button>
              </div>
            )}
          </div>
        </LiquidGlass>
      </Container>
    </>
  );
}
