'use client';

import {
  ArrowLeft,
  Battery,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Heart,
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

import { useEffect, useState } from 'react';

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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useAppDispatch();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  if (!product) {
    return (
      <>
        <Header />
        <Container className="flex-1 py-12">
          <div className="text-center py-20">
            <Title variant="h1" className="text-3xl font-bold mb-4">
              Produkt nenalezen
            </Title>
            <Text className="text-muted-foreground text-lg">
              Produkt, který hledáte, neexistuje.
            </Text>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />

      <Container className="py-8 md:py-12 w-full max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Domů
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-400" />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/products"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Produkty
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-400" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900 font-medium">{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button */}
        <div className="mb-8">
          <Button
            size="sm"
            variant="ghost"
            href="/products"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 inline-flex items-center gap-2 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Zpět na všechny produkty
          </Button>
        </div>

        {/* Main Product Card */}
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 md:p-8 mb-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-6">
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
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
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
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.gallery.slice(0, 4).map((url: string, idx: number) => (
                  <div
                    key={url + idx}
                    className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-all duration-200 hover:shadow-md"
                    onClick={() => setSelectedImage(url)}
                  >
                    <Image
                      src={url ?? ''}
                      alt={`Thumbnail ${idx + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 border-green-200 px-3 py-1"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Repasovaný
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1"
                >
                  <Shield className="w-3 h-3 mr-1" />3 měsíců záruka
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1"
                >
                  <Truck className="w-3 h-3 mr-1" />
                  Doprava zdarma
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-800 border-orange-200 px-3 py-1"
                >
                  <Star className="w-3 h-3 mr-1" />
                  Kvalita ověřena
                </Badge>
              </div>

              {/* Title and Rating */}
              <div>
                <Title
                  className="mb-3 text-3xl md:text-4xl font-bold text-gray-900"
                  size="large"
                  variant="h1"
                >
                  Apple {product.name}
                </Title>
                <Text className="text-lg text-gray-600 mb-4">
                  {product.capacity}GB • {product.color}
                </Text>
              </div>

              {/* Price Section */}
              <div className="space-y-3 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-baseline gap-4">
                  <Text className="text-4xl md:text-5xl font-bold text-gray-900">
                    {product.price.toLocaleString('cs-CZ')} Kč
                  </Text>
                  <Text className="text-xl text-gray-500 line-through">
                    {Math.round(+(product?.price ?? 0) * 1.3).toLocaleString('cs-CZ')} Kč
                  </Text>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500 text-white px-3 py-1">
                    Ušetříte {Math.round(+(product?.price ?? 0) * 0.3).toLocaleString('cs-CZ')} Kč
                  </Badge>
                  <Text className="text-sm text-gray-600">(30% sleva z původní ceny)</Text>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <AddToCartButton size="lg" product={product} className="flex-1">
                    <Truck className="w-5 h-5 mr-2" />
                    Přidat do košíku
                  </AddToCartButton>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`px-4 ${isWishlisted ? 'text-red-500 border-red-500' : ''}`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                <Button
                  onClick={() => {
                    dispatch(addToCart(product));
                    window.location.href = '/cart';
                  }}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 text-lg font-semibold py-4"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Koupit nyní - Doručení do 24h
                </Button>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">3 měsíců záruka</div>
                    <div className="text-gray-600">Oficiální záruka</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Doprava zdarma</div>
                    <div className="text-gray-600">Po celé ČR</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Vrácení 14 dnů</div>
                    <div className="text-gray-600">Bez udání důvodu</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Star className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Kvalita ověřena</div>
                    <div className="text-gray-600">Profesionální test</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 md:p-8 mb-12">
          <div className="text-center mb-6">
            <Title variant="h2" className="text-2xl font-bold text-gray-900 mb-2">
              Proč si zákazníci vybírají naše repasované iPhony?
            </Title>
            <Text className="text-gray-600">Přes 1,000+ spokojených zákazníků</Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <Title variant="h3" className="text-lg font-semibold mb-2">
                Ověřená kvalita
              </Title>
              <Text className="text-gray-600">
                Všechny telefony procházejí důkladnou kontrolou a testováním funkčnosti
              </Text>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <Title variant="h3" className="text-lg font-semibold mb-2">
                Rychlé doručení
              </Title>
              <Text className="text-gray-600">Doručení do 24 hodin po celé České republice</Text>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <Title variant="h3" className="text-lg font-semibold mb-2">
                Záruka a podpora
              </Title>
              <Text className="text-gray-600">
                3 měsíce záruky a profesionální zákaznická podpora
              </Text>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 md:p-8 mb-12">
          <Title variant="h2" className="mb-6 text-2xl font-bold text-gray-900">
            Popis produktu
          </Title>
          <div className="prose prose-lg max-w-none">
            <Text
              dangerouslySetInnerHTML={{ __html: product.large_desc }}
              className="text-gray-700 leading-relaxed whitespace-pre-line"
            />
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 md:p-8 mb-12">
          <Title variant="h2" className="mb-8 text-2xl font-bold text-gray-900 text-center">
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
          <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 md:p-8 mb-12">
            <Title variant="h2" className="mb-8 text-2xl font-bold text-gray-900 text-center">
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
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 md:p-8 mb-12">
          <Title variant="h2" className="mb-8 text-2xl font-bold text-gray-900 text-center">
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

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <Title variant="h2" className="text-3xl font-bold mb-4">
            Neváhejte a ušetřete!
          </Title>
          <Text className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Repasované iPhony nabízí skvělý poměr cena/výkon. Funkční zařízení za výrazně nižší cenu
            s ověřenou kvalitou a zárukou.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/products"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 drop-shadow-lg"
            >
              Prohlédnout všechny produkty
            </Button>
            <Button
              onClick={() => {
                dispatch(addToCart(product));
                window.location.href = '/cart';
              }}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Zap className="w-5 h-5 mr-2" />
              Koupit nyní
            </Button>
          </div>
        </div>
      </Container>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full h-full flex items-center justify-center overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = product.gallery.indexOf(selectedImage);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : product.gallery.length - 1;
                setSelectedImage(product.gallery[prevIndex]);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = product.gallery.indexOf(selectedImage);
                const nextIndex = currentIndex < product.gallery.length - 1 ? currentIndex + 1 : 0;
                setSelectedImage(product.gallery[nextIndex]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 rounded-full px-4 py-2 text-sm">
              {product.gallery.indexOf(selectedImage) + 1} / {product.gallery.length}
            </div>

            <Image
              src={selectedImage}
              alt="Product full size"
              width={1200}
              height={1200}
              className="max-w-full max-h-full object-contain rounded-lg cursor-zoom-in"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
