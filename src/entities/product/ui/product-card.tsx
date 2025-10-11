'use client';

import { CheckCircle, Star, Truck, Zap } from 'lucide-react';

import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AddToCartButton } from '@/features/add-to-cart';
import { viewItem } from '@/lib/gtm';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { useMetrics } from '@/hooks/use-metrics';

import type { Smartphone } from '../model/types';

interface ProductCardProps {
  product: Smartphone;
}

export function ProductCard({ product }: ProductCardProps) {
  const savings = Math.round(+product.price * 0.2);
  const originalPrice = Math.round(+product.price * 1.2);
  const { trackProductView } = useMetrics();

  useEffect(() => {
    viewItem(product);
    trackProductView(product.id.toString(), product.categoryId?.toString());
  }, [product, trackProductView]);

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-full group border-0 shadow-md">
      <Link href={`/product/${product.slug}`}>
        <CardHeader className="p-0 border-b overflow-hidden relative">
          <div className="aspect-square relative">
            <Image
              src={product.gallery[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-ai-hint="iphone side"
              priority
            />
            {/* Overlay with savings badge */}
            <div className="absolute top-2 left-2 z-10">
              <Badge
                variant="secondary"
                className="bg-red-500 text-white border-red-500 font-semibold"
              >
                <Zap className="w-3 h-3 mr-1" />
                Ušetříte {savings.toLocaleString('cs-CZ')} Kč
              </Badge>
            </div>
            {/* Stock status */}
            <div className="absolute top-2 right-2 z-10">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Skladem
              </Badge>
            </div>
            {/* Quick delivery badge */}
            <div className="absolute bottom-2 left-2 z-10">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 border-blue-200 text-xs"
              >
                <Truck className="w-3 h-3 mr-1" />
                Doručení do 24h
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Link>

      <CardContent className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${product.slug}`} className="flex-grow">
          <div className="flex-grow">
            <Title
              className="mb-2 !text-base font-semibold text-gray-900"
              variant="h3"
              size="extra-small"
            >
              {product.name} {product.capacity}GB - {product.color}
            </Title>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                ))}
              </div>
              <Text className="text-xs text-gray-600">(4.8/5)</Text>
            </div>

            <Text className="text-sm text-gray-600 mb-3 line-clamp-2">{product.small_desc}</Text>

            {/* Price section */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <Text className="text-2xl font-bold text-blue-600">
                  {product.price.toLocaleString('cs-CZ')} Kč
                </Text>
                <Text className="text-sm text-gray-500 line-through">
                  {originalPrice.toLocaleString('cs-CZ')} Kč
                </Text>
              </div>
              <Text className="text-xs text-green-600 font-medium">
                Ušetříte {savings.toLocaleString('cs-CZ')} Kč (
                {Math.round((savings / originalPrice) * 100)}%)
              </Text>
            </div>

            {/* Trust signals */}
            <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>3 měsíců záruka</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-blue-500" />
                <span>Doručení do 24h</span>
              </div>
            </div>
          </div>
        </Link>

        {/* CTA Buttons */}
        <div className="space-y-2 mt-auto">
          <AddToCartButton size="sm" className="w-full" product={product}>
            <Zap className="w-4 h-4 mr-2" />
            Přidat do košíku
          </AddToCartButton>
          <Button
            href={`/product/${product.slug}`}
            variant="outline"
            size="sm"
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Zobrazit detail
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
