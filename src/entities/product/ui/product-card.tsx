'use client';

import { Content } from '@prismicio/client';

import Image from 'next/image';

import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

interface ProductCardProps {
  product: Content.PhoneDocument;
}

export function ProductCard({ product }: ProductCardProps) {
  const data = {
    id: product.uid,
    name: product.data.name || '',
    large_desc: product.data.large_desc || '',
    small_desc: product.data.small_desc || '',
    price: product.data.price || 0,
    image: product.data.gallery[0]?.image1.url || '',
    color: product.data.color,
    capacity: product.data.capacity,
  };
  return (
    <LiquidGlass
      as={Card}
      className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-full cursor-pointer group"
    >
      <CardHeader className="p-0 border-b overflow-hidden">
        <div className="aspect-square relative">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            data-ai-hint="iphone side"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <Title className="mb-1" variant="h3" size="small">
            {data.name}
          </Title>
          <Text className="text-sm text-muted-foreground mb-1">
            {data.capacity}GB - {data.color}
          </Text>
          <Text className="text-sm text-muted-foreground mb-3">{data.small_desc}</Text>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Text className="text-lg font-bold text-green-600">{data.price} Kč</Text>
            <Text className="text-sm text-muted-foreground line-through">
              {Math.round(+data.price * 1.3)} Kč
            </Text>
          </div>
        </div>
      </CardContent>
    </LiquidGlass>
  );
}
