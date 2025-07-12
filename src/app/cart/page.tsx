'use client';

import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/header';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export default function CartPage() {
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Váš košík</h1>
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
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
                    <p className="font-medium mt-2">
                      {item.price.toLocaleString()} Kč
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mx-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                   <div className="font-bold w-24 text-right">
                      {(item.price * item.quantity).toLocaleString()} Kč
                   </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-4"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                  </Button>
                </Card>
              ))}
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Souhrn objednávky</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Mezisoučet ({cartCount} položek)</span>
                    <span>{cartTotal.toLocaleString()} Kč</span>
                  </div>
                   <div className="flex justify-between">
                    <span>Doprava</span>
                    <span>Zdarma</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Celkem</span>
                    <span>{cartTotal.toLocaleString()} Kč</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Pokračovat k pokladně
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center border-2 border-dashed rounded-lg py-20">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-xl font-semibold">Váš košík je prázdný</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Přidejte si nějaké iPhony, abyste mohli začít.
            </p>
            <Button asChild>
                <Link href="/">Zpět do obchodu</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
