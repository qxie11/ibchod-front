'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import type { Product } from '../model/types';
import { AddToCartButton } from '@/features/add-to-cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent event propagation for AddToCartButton inside the card
    if ((e.target as HTMLElement).closest('button')) {
      e.preventDefault();
    }
  };

  return (
    <Card 
        onClick={handleCardClick} 
        className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-full cursor-pointer"
    >
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
          <p className="text-xl font-bold">{product.price} Kč</p>
          <AddToCartButton product={product} />
        </div>
      </CardContent>
    </Card>
  );
}
