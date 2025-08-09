'use client';

import Image from 'next/image';
import Link from 'next/link';

import { AddToCartButton } from '@/features/add-to-cart';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

import type { Smartphone } from '../model/types';

interface ProductCardProps {
  product: Smartphone;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg h-full group">
      <Link href={`/product/${product.slug}`}>
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
      </Link>
      <CardContent className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${product.slug}`} className="flex-grow">
          <div className="flex-grow">
            <Title className="mb-2 !text-base font-normal" variant="h3" size="extra-small">
              {product.name} {product.capacity}GB - {product.color}
            </Title>
            <Text className="text-sm text-muted-foreground mb-3">{product.small_desc}</Text>
            <div className="flex items-center gap-2 mb-3">
              <Text className="text-lg font-bold text-foreground text-green-500">
                {product.price.toLocaleString('cs-CZ')} Kč
              </Text>
              <Text className="text-sm text-muted-foreground line-through">
                {Math.round(+product.price * 1.3).toLocaleString('cs-CZ')} Kč
              </Text>
            </div>
          </div>
        </Link>
        <AddToCartButton size="sm" className="w-full mt-auto" product={product}>
          Přidat do košíku
        </AddToCartButton>
      </CardContent>
    </Card>
  );
}
