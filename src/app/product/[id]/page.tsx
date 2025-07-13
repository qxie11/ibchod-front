'use client';

import { ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { addToCart } from '@/entities/cart';
import { mockProducts } from '@/entities/product';
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
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import Container from '@/shared/ui/container';
import { Footer } from '@/shared/ui/footer';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { Header } from '@/widgets/header';

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const params = useParams<{ id?: string }>();
  const id = params?.id;

  const product = mockProducts.find((p) => p.id === id);

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
        <Footer />
      </>
    );
  }

  const similarProducts = mockProducts
    .filter((p) => p.model === product.model && p.id !== product.id)
    .slice(0, 3);

  const comparisonProducts = mockProducts.filter((p) => p.model !== product.model).slice(0, 2);

  const allSimilarProducts = mockProducts.filter((p) => p.id !== product.id);

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
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mb-6">
          <Button className="inline-block" href="/">
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
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
            </div>
            <div>
              <Title className="mb-5" size="medium" variant="h1">
                Apple {product.name}
              </Title>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="secondary">{product.storage}</Badge>
                <Badge variant="secondary">{product.color}</Badge>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <Text className="text-3xl font-bold text-green-600">${product.price}</Text>
                <Text className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </Text>
              </div>
              <Text className=" text-muted-foreground mb-6">
                iPhone 15 Pro je kombinací výkonu, elegance a inovací. Díky nejnovějšímu čipu A17
                Pro, vylepšenému fotoaparátu a úžasnému displeji je tento smartphone ideální pro
                práci, kreativitu i zábavu. Užijte si vysoký výkon, dlouhou výdrž baterie a prémiový
                design, který podtrhne váš styl.
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
                      <span>{product.storage}</span>
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
          </LiquidGlass>
        </div>

        {/* Similar Products Slider */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <LiquidGlass>
              <div className="p-6">
                <Title variant="h2" className="mb-6">
                  Similar {product.model} Models
                </Title>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {similarProducts.map((similarProduct) => (
                    <Card
                      key={similarProduct.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <CardHeader className="p-0">
                        <div className="aspect-square relative">
                          <Image
                            src={similarProduct.image}
                            alt={similarProduct.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <Title variant="h4" className="mb-2">
                          {similarProduct.name}
                        </Title>
                        <Text className="text-sm text-muted-foreground mb-2">
                          {similarProduct.storage} - {similarProduct.color}
                        </Text>
                        <div className="flex items-center gap-2 mb-3">
                          <Text className="font-bold text-green-600">${similarProduct.price}</Text>
                          <Text className="text-sm text-muted-foreground line-through">
                            ${similarProduct.originalPrice}
                          </Text>
                        </div>
                        <Button
                          href={`/product/${similarProduct.id}`}
                          size="small"
                          className="w-full"
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </LiquidGlass>
          </div>
        )}

        <div className="mt-12">
          <LiquidGlass className="bg-[#fafaf9]">
            <div className="p-6">
              <Title variant="h2" className="mb-6">
                Explore Other iPhone Models
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
                  1280: {
                    slidesPerView: 4,
                  },
                }}
                className="pb-12"
              >
                {allSimilarProducts.map((similarProduct) => (
                  <SwiperSlide key={similarProduct.id}>
                    <Card className="flex flex-row items-center bg-white rounded-xl border border-gray-200 transition-all h-full min-h-[120px]">
                      <div className="w-20 h-20 flex-shrink-0 relative m-3">
                        <Image
                          src={similarProduct.image}
                          alt={similarProduct.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-col flex-1 px-2 py-3">
                        <span className="font-bold text-base mb-1">{similarProduct.color}</span>
                        <span className="text-sm">{similarProduct.storage}</span>
                        <span className="text-sm">Velmi dobrý</span>
                        <span className="text-sm mb-2">12 měsíců</span>
                        <span className="text-green-600 font-bold text-lg mt-auto">
                          {similarProduct.price} Kč
                        </span>
                      </div>
                    </Card>
                  </SwiperSlide>
                ))}
                <div className="swiper-prev absolute right-16 top-1/2 -translate-y-1/2 z-10">
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
                <div className="swiper-next absolute right-2 top-1/2 -translate-y-1/2 z-10">
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
              </Swiper>
            </div>
          </LiquidGlass>
        </div>

        {/* Comparison Table */}
        {comparisonProducts.length > 0 && (
          <div className="mt-12">
            <LiquidGlass>
              <div className="p-6">
                <Title variant="h2" className="mb-6">
                  Compare with Other Models
                </Title>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Feature</th>
                        <th className="text-left p-3 font-medium">
                          <div className="flex flex-col">
                            <div className="w-16 h-16 relative mb-2 rounded-lg overflow-hidden">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-xs">{product.name}</span>
                          </div>
                        </th>
                        {comparisonProducts.map((compProduct) => (
                          <th key={compProduct.id} className="text-left p-3 font-medium">
                            <div className="flex flex-col">
                              <div className="w-16 h-16 relative mb-2 rounded-lg overflow-hidden">
                                <Image
                                  src={compProduct.image}
                                  alt={compProduct.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-sx">{compProduct.name}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Price</td>
                        <td className="p-3">
                          <span className="text-green-600 font-bold">${product.price}</span>
                          <div className="text-xs text-muted-foreground line-through">
                            ${product.originalPrice}
                          </div>
                        </td>
                        {comparisonProducts.map((compProduct) => (
                          <td key={compProduct.id} className="p-3">
                            <span className="text-green-600 font-bold">${compProduct.price}</span>
                            <div className="text-xs text-muted-foreground line-through">
                              ${compProduct.originalPrice}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Storage</td>
                        <td className="p-3">{product.storage}</td>
                        {comparisonProducts.map((compProduct) => (
                          <td key={compProduct.id} className="p-3">
                            {compProduct.storage}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Color</td>
                        <td className="p-3">{product.color}</td>
                        {comparisonProducts.map((compProduct) => (
                          <td key={compProduct.id} className="p-3">
                            {compProduct.color}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Model</td>
                        <td className="p-3">{product.model}</td>
                        {comparisonProducts.map((compProduct) => (
                          <td key={compProduct.id} className="p-3">
                            {compProduct.model}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
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
