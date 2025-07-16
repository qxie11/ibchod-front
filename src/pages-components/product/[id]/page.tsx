'use client';

import { Content } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import { ArrowLeft } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { addToCart } from '@/entities/cart';
import { AddToCartButton } from '@/features/add-to-cart';
import { Badge } from '@/shared/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import Container from '@/shared/ui/container';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { Header } from '@/widgets/header';

interface ProductDetailPageProps {
  product: Content.PhoneDocument;
  similarProducts: Content.PhoneDocument[];
}

export default function ProductDetailPage({ product, similarProducts }: ProductDetailPageProps) {
  const dispatch = useDispatch();

  console.log({ product });

  if (!product) {
    return (
      <>
        <Header />
        <Container className="flex-1 py-8">
          <div className="text-center py-20">
            <Title variant="h1" className="text-2xl font-bold mb-2">
              Product not found
            </Title>
            <Text className="text-muted-foreground">
              The product you are looking for doesnt exist.
            </Text>
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
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.data.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mb-6">
          <Button size="small" className="inline-block" href="/">
            <span className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to all products
            </span>
          </Button>
        </div>
        <LiquidGlass>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation={{
                    nextEl: '.product-swiper-next',
                    prevEl: '.product-swiper-prev',
                  }}
                  pagination={{ clickable: true }}
                  className="h-full w-full"
                >
                  {product.data.gallery?.[0]
                    ? Object.values(product.data.gallery[0])
                        .filter((img: any) => img?.url)
                        .map(({ url }: any, idx: number) => (
                          <SwiperSlide key={url + idx}>
                            <Image
                              src={url ?? ''}
                              alt={product.data.name + ' photo ' + (idx + 1)}
                              fill
                              className="object-cover"
                            />
                          </SwiperSlide>
                        ))
                    : null}
                  <button
                    className="product-swiper-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-accent border border-accent hover:bg-accent hover:text-white transition"
                    aria-label="Předchozí obrázek"
                    type="button"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    className="product-swiper-next absolute top-1/2 right-2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-accent border border-accent hover:bg-accent hover:text-white transition"
                    aria-label="Další obrázek"
                    type="button"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Swiper>
              </div>
            </div>
            <div>
              <Title className="mb-3" size="medium" variant="h1">
                Apple {product.data.name}
              </Title>
              <div className="mb-5 flex items-center gap-2">
                <Badge variant="secondary">{product.data.capacity}</Badge>
                <Badge variant="secondary">{product.data.color}</Badge>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <Text className="text-3xl font-bold text-green-600">
                  {product.data.price ?? 0} Kč
                </Text>
                <Text className="text-lg text-muted-foreground line-through">
                  {Math.round(+(product?.data?.price ?? 0) * 1.3)} Kč
                </Text>
              </div>
              <Text className=" text-muted-foreground mb-6">
                <PrismicRichText field={product.data.large_desc} />
              </Text>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-2xl">✔</span>
                  <span>12 měsíců oficiální záruka</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-2xl">🚚</span>
                  <span>Doprava zdarma po celé zemi</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-2xl">💬</span>
                  <span>Podpora 24/7 a konzultace</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-2xl">♻️</span>
                  <span>Možnost výkupu a upgradu</span>
                </div>
              </div>
              <div className="flex gap-2 flex-col">
                <AddToCartButton size="large" product={product} className="mb-1 font-black">
                  Do kosicu
                </AddToCartButton>
                <Button
                  onClick={() => dispatch(addToCart(product))}
                  size="large"
                  variant="ghost"
                  href="/cart"
                  className="font-black"
                >
                  Objednej teď
                </Button>
              </div>
            </div>
          </div>
        </LiquidGlass>

        <div className="mt-12">
          <LiquidGlass>
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
                      <span>{product.data.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Color:</span>
                      <span>{product.data.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Battery:</span>
                      <span>Up to 23 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LiquidGlass>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-12">
            <LiquidGlass>
              <div className="p-6">
                <Title variant="h2" className="mb-6">
                  Similar Models
                </Title>
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={24}
                  slidesPerView={1}
                  navigation={{
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev',
                  }}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                  }}
                  className="pb-12"
                >
                  {Array(5)
                    .fill(similarProducts[0])
                    .map((similarProduct) => (
                      <SwiperSlide key={similarProduct.id}>
                        <Card className="relative flex flex-row items-center bg-white rounded-xl border border-gray-200 transition-all h-full min-h-[120px]">
                          <Link className="absolute inset-0 z-10" href={similarProduct.uid}></Link>
                          <div className="w-20 h-20 flex-shrink-0 relative m-3 overflow-hidden rounded-xl shadow-2xl">
                            <Image
                              src={similarProduct.data.gallery[0]?.image1?.url as unknown as string}
                              alt={similarProduct.data.gallery[0]?.image1?.alt as unknown as string}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex flex-col flex-1 px-2 py-3">
                            <h3 className="font-bold text-base mb-1">
                              {similarProduct.data.name} {similarProduct.data.capacity}GB
                            </h3>

                            <div className="flex items-center gap-2">
                              <Text className="text-base font-bold text-green-600">
                                {product.data.price ?? 0} Kč
                              </Text>
                              <Text className="text-sm text-muted-foreground line-through">
                                {Math.round(+(product?.data?.price ?? 0) * 1.3)} Kč
                              </Text>
                            </div>
                          </div>
                        </Card>
                      </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="swiper-prev">
                    <button className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center bg-white text-accent hover:text-white hover:bg-accent transition">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className="swiper-next">
                    <button className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center bg-white text-accent hover:text-white hover:bg-accent transition">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </LiquidGlass>
          </div>
        )}
        <LiquidGlass className="mt-12">
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
        </LiquidGlass>
      </Container>
    </>
  );
}
