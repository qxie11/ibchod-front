'use client';

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import Link from 'next/link';

import { Smartphone } from '@/entities/product/model/types';
import { ProductCard } from '@/entities/product/ui/product-card';
import { AddToCartButton } from '@/features/add-to-cart';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import { Button } from '@/shared/ui/button';
import Container from '@/shared/ui/container';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { Header } from '@/widgets/header';

interface ProductDetailPageProps {
  product: Smartphone;
  similarProducts: Smartphone[];
}

export default function ProductDetailPage({ product, similarProducts }: ProductDetailPageProps) {
  if (!product) {
    return (
      <>
        <Header />
        <Container className="flex-1 py-8">
          <div className="text-center py-20">
            <Title variant="h1" className="text-2xl font-bold mb-2">
              Produkt nenalezen
            </Title>
            <Text className="text-muted-foreground">Produkt, který hledáte, neexistuje.</Text>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container className="py-8 w-full">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Domů</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mb-6">
          <Button size="sm" variant="ghost" asChild>
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Zpět na všechny produkty
            </Link>
          </Button>
        </div>

        <div className="bg-card p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg border">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    nextEl: '.product-swiper-next',
                    prevEl: '.product-swiper-prev',
                  }}
                  className="h-full w-full"
                  loop
                >
                  {product.gallery.map((url: string, idx: number) => (
                    <SwiperSlide key={url + idx}>
                      <Image
                        src={url ?? ''}
                        alt={product.name + ' photo ' + (idx + 1)}
                        fill
                        className="object-contain"
                        priority={idx === 0}
                      />
                    </SwiperSlide>
                  ))}
                  <button
                    className="product-swiper-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-foreground border border-border hover:bg-white transition"
                    aria-label="Předchozí obrázek"
                    type="button"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    className="product-swiper-next absolute top-1/2 right-2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-foreground border border-border hover:bg-white transition"
                    aria-label="Další obrázek"
                    type="button"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </Swiper>
              </div>
            </div>
            <div>
              <Title className="mb-3" size="medium" variant="h1">
                Apple {product.name} {product.capacity}GB {product.color}
              </Title>

              <Text className="text-muted-foreground mb-6">{product.large_desc}</Text>
              <div className="flex items-baseline gap-3 mb-6">
                <Text className="text-3xl font-bold text-foreground">
                  {product.price.toLocaleString('cs-CZ')} Kč
                </Text>
                <Text className="text-lg text-muted-foreground line-through">
                  {Math.round(+(product?.price ?? 0) * 1.3).toLocaleString('cs-CZ')} Kč
                </Text>
              </div>
              <AddToCartButton size="lg" product={product} className="w-full">
                Přidat do košíku
              </AddToCartButton>

              <div className="mt-8 space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="text-green-600">✔</span>
                  <span>12 měsíců záruka</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">✔</span>
                  <span>Doprava zdarma po celé ČR</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600">✔</span>
                  <span>Možnost vrácení do 14 dnů</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-12">
            <Title variant="h2" className="mb-6">
              Podobné modely
            </Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <ProductCard key={similarProduct.id} product={similarProduct} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
