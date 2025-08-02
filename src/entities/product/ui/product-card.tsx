'use client';

import Image from 'next/image';
import Link from 'next/link';

import { AddToCartButton } from '@/features/add-to-cart';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

import type { Smartphone } from '../model/types';

interface ProductCardProps {
  product: Smartphone;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <LiquidGlass
      as={Card}
      className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-full cursor-pointer group"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <CardHeader className="p-0 border-b overflow-hidden">
          <div className="aspect-square relative">
            <Image
              src={product.gallery[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-ai-hint="iphone side"
              priority
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 pb-0 flex flex-col flex-grow">
          <div className="flex-grow">
            <Title className="mb-1 !text-base" variant="h3" size="extra-small">
              {product.name} {product.capacity}GB - {product.color}
            </Title>
            <Text className="text-sm text-muted-foreground mb-3">{product.small_desc}</Text>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Text className="text-lg font-bold text-green-600">{product.price} Kč</Text>
              <Text className="text-sm text-muted-foreground line-through">
                {Math.round(+product.price * 1.3)} Kč
              </Text>
            </div>
          </div>
        </CardContent>
      </Link>

      <div className="p-4">
        <AddToCartButton size="sm" className="w-full" product={product}>
          Přidat do košíku
        </AddToCartButton>
      </div>
    </LiquidGlass>
  );
}
