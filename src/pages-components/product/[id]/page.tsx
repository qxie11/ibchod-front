'use client';

import {
  ArrowLeft,
  Battery,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Star,
  Truck,
  X,
  Zap,
} from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useState } from 'react';

import Image from 'next/image';

import { addToCart } from '@/entities/cart/model/slice';
import { Smartphone } from '@/entities/product/model/types';
import { ProductCard } from '@/entities/product/ui/product-card';
import { AddToCartButton } from '@/features/add-to-cart';
import { useAppDispatch } from '@/shared/lib/hooks';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
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
import Container from '@/shared/ui/container';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { Header } from '@/widgets/header';

interface ProductDetailPageProps {
  product: Smartphone;
  similarProducts: Smartphone[];
}

export default function ProductDetailPage({ product, similarProducts }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

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
              <BreadcrumbLink href="/" className="text-gray-600 hover:text-gray-900">
                Domů
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-400" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900">{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-6">
          <Button
            size="sm"
            variant="ghost"
            href="/"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Zpět na všechny produkty
          </Button>
        </div>

        {/* Main Product Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-xl border border-gray-200 shadow-lg">
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
                      <div
                        className="relative w-full h-full cursor-pointer group"
                        onClick={() => setSelectedImage(url)}
                      >
                        <Image
                          src={url ?? ''}
                          alt={product.name + ' photo ' + (idx + 1)}
                          fill
                          className="object-cover transition-transform duration-200 group-hover:scale-105"
                          priority={idx === 0}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white bg-black/50 rounded-full p-2">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                  <button
                    className="product-swiper-prev absolute top-1/2 left-4 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-700 border border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-200"
                    aria-label="Předchozí obrázek"
                    type="button"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    className="product-swiper-next absolute top-1/2 right-4 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-700 border border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-200"
                    aria-label="Další obrázek"
                    type="button"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </Swiper>
              </div>

              {/* Image Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.gallery.slice(0, 4).map((url: string, idx: number) => (
                  <div
                    key={url + idx}
                    className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:border-blue-400 transition-colors duration-200"
                    onClick={() => setSelectedImage(url)}
                  >
                    <Image
                      src={url ?? ''}
                      alt={`Thumbnail ${idx + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Repasovaný
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  <Shield className="w-3 h-3 mr-1" />3 měsíců záruka
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 border-purple-200"
                >
                  <Truck className="w-3 h-3 mr-1" />
                  Doprava zdarma
                </Badge>
              </div>

              {/* Title */}
              <div>
                <Title
                  className="mb-2 text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                  size="large"
                  variant="h1"
                >
                  Apple {product.name}
                </Title>
                <Text className="text-lg text-muted-foreground">
                  {product.capacity}GB • {product.color}
                </Text>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <Text className="text-4xl font-bold text-foreground">
                    {product.price.toLocaleString('cs-CZ')} Kč
                  </Text>
                  <Text className="text-xl text-muted-foreground line-through">
                    {Math.round(+(product?.price ?? 0) * 1.3).toLocaleString('cs-CZ')} Kč
                  </Text>
                </div>
                <Text className="text-sm text-green-600 font-medium">
                  Ušetříte {Math.round(+(product?.price ?? 0) * 0.3).toLocaleString('cs-CZ')} Kč
                </Text>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <AddToCartButton size="lg" product={product} className="w-full">
                  Přidat do košíku
                </AddToCartButton>

                <Button
                  onClick={() => {
                    dispatch(addToCart(product));
                    window.location.href = '/cart';
                  }}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Koupit nyní
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">1 měsíc záruka</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Doprava zdarma</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">Vrácení do 14 dnů</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Star className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-gray-700">Kvalita ověřena</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8 mb-8">
          <Title
            variant="h2"
            className="mb-6 text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          >
            Popis produktu
          </Title>
          <Text
            dangerouslySetInnerHTML={{ __html: product.large_desc }}
            className="text-gray-700 leading-relaxed whitespace-pre-line"
          />
        </div>

        {/* Specifications */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8 mb-8">
          <Title
            variant="h2"
            className="mb-8 text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center"
          >
            Technické specifikace
          </Title>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Key Features */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <Title variant="h3" className="text-xl font-semibold">
                  Klíčové funkce
                </Title>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">A17 Pro chip s 6-jádrovým GPU</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Pro kamera s 48MP hlavním objektivem</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">6.1&quot; Super Retina XDR displej</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Celodenní výdrž baterie</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Ceramic Shield přední sklo</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Voděodolné a prachotěsné</span>
                </li>
              </ul>
            </div>

            {/* Technical Specs */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                  <Battery className="w-5 h-5 text-white" />
                </div>
                <Title variant="h3" className="text-xl font-semibold">
                  Technické údaje
                </Title>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Displej:</span>
                  <span className="text-gray-900 font-semibold">6.1&quot; Super Retina XDR</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Procesor:</span>
                  <span className="text-gray-900 font-semibold">A17 Pro</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Úložiště:</span>
                  <span className="text-gray-900 font-semibold">{product.capacity} GB</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Barva:</span>
                  <span className="text-gray-900 font-semibold">{product.color}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Baterie:</span>
                  <span className="text-gray-900 font-semibold">Až 23 hodin</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Kamera:</span>
                  <span className="text-gray-900 font-semibold">48MP + 12MP + 12MP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8 mb-8">
            <Title
              variant="h2"
              className="mb-8 text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center"
            >
              Podobné modely
            </Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <ProductCard key={similarProduct.id} product={similarProduct} />
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8">
          <Title
            variant="h2"
            className="mb-8 text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center"
          >
            Často kladené dotazy
          </Title>
          <Accordion type="single" collapsible className="w-full mx-auto">
            <AccordionItem value="q1" className="border border-gray-200 rounded-lg mb-4">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 rounded-lg transition-colors">
                Jak funguje záruka?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700">
                Na všechny naše iPhony poskytujeme 3 měsíců oficiální záruky. Pokud se v tomto
                období objeví jakýkoli problém, zdarma jej opravíme nebo vyměníme zařízení.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="border border-gray-200 rounded-lg mb-4">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 rounded-lg transition-colors">
                Mohu zboží vrátit?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700">
                Ano, zboží můžete vrátit do 14 dnů bez udání důvodu. Stačí nás kontaktovat a my vám
                zašleme instrukce k vrácení.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="border border-gray-200 rounded-lg mb-4">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 rounded-lg transition-colors">
                Jak rychle probíhá doručení?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700">
                Objednávky odesíláme do 24 hodin od potvrzení. Doručení obvykle trvá 1–2 pracovní
                dny po celé ČR.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4" className="border border-gray-200 rounded-lg">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 rounded-lg transition-colors">
                Je možné využít trade-in?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700">
                Ano, nabízíme možnost výkupu vašeho starého zařízení na protiúčet. Kontaktujte nás
                pro individuální nabídku.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <Image
              src={selectedImage}
              alt="Product full size"
              width={800}
              height={800}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
