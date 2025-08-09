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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
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
                >
                  {product.gallery.map((url: string, idx: number) => (
                    <SwiperSlide key={url + idx}>
                      <Image
                        src={url ?? ''}
                        alt={product.name + ' photo ' + (idx + 1)}
                        fill
                        className="object-cover"
                        priority={idx === 1}
                      />
                    </SwiperSlide>
                  ))}
                  <button
                    className="product-swiper-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-accent border border-accent hover:bg-accent hover:text-white transition"
                    aria-label="Předchozí obrázek"
                    type="button"
                  >
                    <ChevronLeft className="w-4 h-4 text-primary" />
                  </button>
                  <button
                    className="product-swiper-next absolute top-1/2 right-2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-accent border border-accent hover:bg-accent hover:text-white transition"
                    aria-label="Další obrázek"
                    type="button"
                  >
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </button>
                </Swiper>
              </div>
            </div>
            <div>
              <Title className="mb-3" size="medium" variant="h1">
                Apple {product.name} {product.capacity}GB {product.color}
              </Title>

              <Text
                dangerouslySetInnerHTML={{ __html: product.large_desc }}
                className="text-muted-foreground mb-6 whitespace-pre-line"
              />
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
                  <span>1 měsíc záruka</span>
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

        <div className="mt-4 md:mt-8 bg-card p-8 rounded-lg">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Title variant="h3" className="mb-4">
                  Key Features
                </Title>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• A17 Pro chip with 6-core GPU</li>
                  <li>• Pro camera system with 48MP Main</li>
                  <li>• 6.1 Super Retina XDR display</li>
                  <li>• All-day battery life</li>
                  <li>• Ceramic Shield front</li>
                  <li>• Water and dust resistant</li>
                </ul>
              </div>
              <div>
                <Title variant="h3" className="mb-4">
                  Technical Specifications
                </Title>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Display:</span>
                    <span>6.1 Super Retina XDR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chip:</span>
                    <span>A17 Pro</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage:</span>
                    <span>{product.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Color:</span>
                    <span>{product.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Battery:</span>
                    <span>Up to 23 hours</span>
                  </div>
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

        <div className="mt-4 md:mt-8">
          <div className="p-6">
            <Title variant="h2" className="mb-6 text-center">
              Často kladené dotazy
            </Title>
            <Accordion type="single" collapsible className="w-full mx-auto">
              <AccordionItem value="q1">
                <AccordionTrigger>Jak funguje záruka?</AccordionTrigger>
                <AccordionContent>
                  Na všechny naše iPhony poskytujeme 12 měsíců oficiální záruky. Pokud se v tomto
                  období objeví jakýkoli problém, zdarma jej opravíme nebo vyměníme zařízení.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Mohu zboží vrátit?</AccordionTrigger>
                <AccordionContent>
                  Ano, zboží můžete vrátit do 14 dnů bez udání důvodu. Stačí nás kontaktovat a my
                  vám zašleme instrukce k vrácení.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Jak rychle probíhá doručení?</AccordionTrigger>
                <AccordionContent>
                  Objednávky odesíláme do 24 hodin od potvrzení. Doručení obvykle trvá 1–2 pracovní
                  dny po celé ČR.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger>Je možné využít trade-in?</AccordionTrigger>
                <AccordionContent>
                  Ano, nabízíme možnost výkupu vašeho starého zařízení na protiúčet. Kontaktujte nás
                  pro individuální nabídku.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Container>
    </>
  );
}
