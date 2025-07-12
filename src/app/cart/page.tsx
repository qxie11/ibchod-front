'use client';

import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import {
  removeFromCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from '@/entities/cart';
import type { CartItem } from '@/entities/product';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import Container from '@/shared/ui/container';
import { Separator } from '@/shared/ui/separator';
import { Header } from '@/widgets/header';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartCount = useAppSelector(selectCartCount);
  const cartTotal = useAppSelector(selectCartTotal);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <Container className="flex-1 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item: CartItem) => (
                <Card key={item.id} className="flex items-center p-4">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      data-ai-hint="iphone side"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.storage} - {item.color}
                    </p>
                    <p className="font-medium mt-2">${item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2 mx-4">
                    <Button

                      className="h-8 w-8"
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
                      
                      className="h-8 w-8"
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
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                  <Button
                    variant="ghost"
                    
                    className="ml-4"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                  </Button>
                </Card>
              ))}
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>${cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${cartTotal.toLocaleString()}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" >
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center border-2 border-dashed rounded-lg py-20">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-xl font-semibold">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-4">Add some iPhones to get started.</p>
            <Button>
              <Link href="/">Back to Shop</Link>
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
