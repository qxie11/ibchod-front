'use client';

import { ArrowLeft } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { mockProducts } from '@/entities/product';
import { AddToCartButton } from '@/features/add-to-cart';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import Container from '@/shared/ui/container';
import { Header } from '@/widgets/header';

export default function ProductDetailPage() {
  const params = useParams<{ id?: string }>();
  const id = params?.id;

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <Header />
        <Container className="text-center py-20">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Button   className="mt-4">
            <Link href="/">Back to Shop</Link>
          </Button>
        </Container>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <Container className="py-8">
        <div className="mb-6">
          <Button  >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to all products
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square relative w-full bg-card rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint="iphone front back"
              />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary">{product.storage}</Badge>
              <Badge variant="secondary">{product.color}</Badge>
            </div>
            <p className="text-3xl font-bold my-4">${product.price.toLocaleString()}</p>
            <p className="text-muted-foreground leading-relaxed">
              {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <AddToCartButton product={product} className="mt-6" />
          </div>
        </div>
      </Container>
    </div>
  );
}
