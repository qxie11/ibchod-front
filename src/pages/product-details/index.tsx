'use client';

import { useParams } from 'next/navigation';
import { mockProducts } from '@/entities/product/model/mock';
import { Header } from '@/widgets/header';
import { Button } from '@/shared/ui/button';
import { AddToCartButton } from '@/features/add-to-cart';
import Image from 'next/image';
import { Badge } from '@/shared/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <Header />
        <div className="container mx-auto text-center py-20">
          <h1 className="text-2xl font-bold">Produkt nenalezen</h1>
          <Button asChild className="mt-4">
            <Link href="/">Zpět na hlavní stranu</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Zpět na všechny produkty
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
            <p className="text-3xl font-bold my-4">{product.price.toLocaleString()} Kč</p>
            <p className="text-muted-foreground leading-relaxed">
              {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <AddToCartButton product={product} />
          </div>
        </div>
      </main>
    </div>
  );
}
