'use client';

import Image from 'next/image';
import Link from 'next/link';

import { AddToCartButton } from '@/features/add-to-cart';
import { Card, CardContent } from '@/shared/ui/card';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

import type { Smartphone } from '../model/types';

interface ProductCardProps {
  product: Smartphone;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg h-full group">
      <Link href={`/product/${product.slug}`} className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="aspect-square relative">
            <Image
              src={product.gallery[0]}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint="iphone"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <Title className="mb-2 !text-base font-normal" variant="h3" size="extra-small">
              {product.name} {product.capacity}GB - {product.color}
            </Title>
            <div className="flex items-center gap-2 mb-3">
              <Text className="text-lg font-bold text-foreground">
                {product.price.toLocaleString('cs-CZ')} Kč
              </Text>
              <Text className="text-sm text-muted-foreground line-through">
                {Math.round(+product.price * 1.3).toLocaleString('cs-CZ')} Kč
              </Text>
            </div>
          </div>
          <AddToCartButton size="sm" className="w-full mt-auto" product={product}>
            Přidat do košíku
          </AddToCartButton>
        </CardContent>
      </Link>
    </Card>
  );
}
