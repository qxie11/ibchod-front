'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { useCart } from '@/context/cart-context';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0 border-b">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint="iphone side"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {product.storage} - {product.color}
          </p>
          <p className="text-sm text-muted-foreground mt-1 h-10">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold">${product.price}</p>
          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  );
}
