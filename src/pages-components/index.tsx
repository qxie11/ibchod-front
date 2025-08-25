'use client';

import { CheckCircle, ChevronLeft, ChevronRight, Shield, Truck, Users } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination as SwiperPagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useEffect, useRef } from 'react';

import Link from 'next/link';

import { AnimatedHero } from '@/components/animated-hero';
import { ProductCard } from '@/entities/product';
import type { Smartphone } from '@/entities/product/model/types';
import {
  resetFilters,
  selectPriceRange,
  selectSelectedColor,
  selectSelectedModel,
  selectSelectedStorage,
  setPriceRange,
  setSelectedColor,
  setSelectedModel,
  setSelectedStorage,
} from '@/features/filter-products';
import { ProductFilters } from '@/features/filter-products';
import { usePagination } from '@/hooks/use-pagination';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { GetProductsResponse, useGetProductsQuery } from '@/shared/lib/slices/productApi';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import Container from '@/shared/ui/container';
import Loader from '@/shared/ui/loader';
import { Pagination, PaginationContent } from '@/shared/ui/pagination';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { Header } from '@/widgets/header';

interface HomePageProps {
  phoneListInit: GetProductsResponse;
  uniqueBrands: string[];
  uniqueCapacities: number[];
  uniqueColors: string[];
  maxPrice: number;
  minPrice: number;
}

const ITEMS_PER_PAGE = 10;

export default function HomePage({
  phoneListInit,
  uniqueBrands,
  uniqueCapacities,
  uniqueColors,
  maxPrice,
  minPrice,
}: HomePageProps) {
  const dispatch = useAppDispatch();
  const swiperRef = useRef<any>(null);
  const { currentPage, onPageChange, skip } = usePagination();

  const priceRange = useAppSelector(selectPriceRange);
  const selectedModel = useAppSelector(selectSelectedModel);
  const selectedStorage = useAppSelector(selectSelectedStorage);
  const selectedColor = useAppSelector(selectSelectedColor);

  const { data: phoneListState = phoneListInit, isFetching: isLoading } = useGetProductsQuery(
    {
      take: ITEMS_PER_PAGE,
      skip,
      name: selectedModel !== 'all' ? selectedModel : undefined,
      minPrice: priceRange?.[0] || minPrice,
      maxPrice: priceRange?.[1] || maxPrice,
      color: selectedColor !== 'all' ? selectedColor : undefined,
      capacity: selectedStorage !== 'all' ? selectedStorage : undefined,
    },
    {
      skip: !priceRange || JSON.stringify(priceRange) === JSON.stringify([minPrice, maxPrice]),
    }
  );

  useEffect(() => {
    if (minPrice !== undefined && maxPrice !== undefined && priceRange?.[1] === 0) {
      dispatch(setPriceRange([minPrice, maxPrice]));
    }
  }, [dispatch, maxPrice, minPrice, priceRange]);

  const handleResetFilters = () => {
    dispatch(resetFilters());
    dispatch(setPriceRange([minPrice, maxPrice]));
    onPageChange(1);
  };

  const products = phoneListState?.items ?? [];
  const totalProducts = phoneListState?.total ?? 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      {/* Hero Section */}
      <AnimatedHero>
        <Container className="relative py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              🍎 Repasované iPhony
            </Badge>
            <Title variant="h1" className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Najděte svůj dokonalý iPhone
            </Title>
            <Text className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Vysoce kvalitní repasované iPhony za skvělou cenu. Udržitelná volba s 12měsíční
              zárukou a rychlým doručením.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold text-lg px-8 py-4"
                >
                  🍎 Procházet produkty
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </AnimatedHero>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <Text className="text-gray-600 dark:text-gray-400">Spokojených zákazníků</Text>
            </div>
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600">12</div>
              <Text className="text-gray-600 dark:text-gray-400">Měsíců záruky</Text>
            </div>
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Truck className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-600">24h</div>
              <Text className="text-gray-600 dark:text-gray-400">Rychlé doručení</Text>
            </div>
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-orange-600">100%</div>
              <Text className="text-gray-600 dark:text-gray-400">Kontrola kvality</Text>
            </div>
          </div>
        </Container>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-16">
        <Container>
          <div className="text-center mb-12">
            <Title variant="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Naše produkty
            </Title>
            <Text className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Vyberte si z široké nabídky repasovaných iPhonů. Všechny telefony procházejí důkladnou
              kontrolou a jsou dodávány s plnou zárukou.
            </Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] lg:gap-x-8 gap-y-8">
            <aside className="h-fit lg:sticky lg:top-24 w-full">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <CardTitle className="flex items-center gap-2">
                    🔍 Filtry
                    <Badge variant="secondary" className="ml-auto">
                      {products.length} z {totalProducts}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ProductFilters
                    priceRange={priceRange || [minPrice, maxPrice]}
                    setPriceRange={(v) => dispatch(setPriceRange(v))}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    selectedModel={selectedModel}
                    setSelectedModel={(v) => dispatch(setSelectedModel(v))}
                    models={uniqueBrands}
                    selectedStorage={selectedStorage}
                    setSelectedStorage={(v) => dispatch(setSelectedStorage(v))}
                    storages={uniqueCapacities}
                    selectedColor={selectedColor}
                    setSelectedColor={(v) => dispatch(setSelectedColor(v))}
                    colors={uniqueColors}
                    resetFilters={handleResetFilters}
                  />
                </CardContent>
              </Card>
            </aside>

            <div>
              <div className="relative">
                {isLoading && (
                  <div className="absolute z-10 inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                    <Loader />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product: Smartphone) => (
                    <div key={product.id} className="relative group">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>

              {products.length === 0 && !isLoading && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📱</div>
                  <Title variant="h3" className="text-2xl font-semibold text-foreground mb-2">
                    Nebyly nalezeny žádné produkty
                  </Title>
                  <Text className="text-muted-foreground mb-6">
                    Zkuste upravit filtry vyhledávání nebo se podívejte na naši kompletní nabídku.
                  </Text>
                  <Button onClick={handleResetFilters} variant="outline">
                    Zobrazit všechny produkty
                  </Button>
                </div>
              )}

              {products.length > 0 && (
                <div className="flex justify-center mt-12">
                  <Pagination>
                    <PaginationContent
                      currentPage={currentPage}
                      totalItems={totalProducts}
                      itemsPerPage={ITEMS_PER_PAGE}
                      onPageChange={onPageChange}
                    />
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="text-center mb-12">
            <Title variant="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Co říkají naši zákazníci
            </Title>
            <Text className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Přečtěte si autentické recenze od spokojených zákazníků, kteří si vybrali naše
              repasované iPhony.
            </Text>
          </div>

          <div className="relative">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, SwiperPagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="reviews-swiper"
              style={{ paddingLeft: '48px', paddingRight: '48px' }}
            >
              {/* Review 1 */}
              <SwiperSlide>
                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xl">👨‍💼</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        Petr Novák
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">iPhone 13 Pro</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
                  <Text className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    &ldquo;Koupil jsem si iPhone 13 Pro a jsem nadšený! Telefon vypadá jako nový,
                    funguje perfektně a ušetřil jsem skoro 15 tisíc korun. Doporučuji všem!&rdquo;
                  </Text>
                </Card>
              </SwiperSlide>

              {/* Review 2 */}
              <SwiperSlide>
                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xl">👩‍💻</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        Anna Svobodová
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">iPhone 12</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
                  <Text className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    &ldquo;Rychlé doručení a telefon v perfektním stavu. Záruka 12 měsíců mě
                    uklidňuje a cena byla opravdu výhodná. Určitě si tu koupím i další
                    iPhone!&rdquo;
                  </Text>
                </Card>
              </SwiperSlide>

              {/* Review 3 */}
              <SwiperSlide>
                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xl">👨‍🎓</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        Martin Dvořák
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">iPhone 14</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
                  <Text className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    &ldquo;Jako student ocením, že můžu mít kvalitní iPhone za rozumnou cenu.
                    Telefon funguje bez problémů a vypadá skvěle. Skvělá volba pro rozpočet!&rdquo;
                  </Text>
                </Card>
              </SwiperSlide>

              {/* Review 4 */}
              <SwiperSlide>
                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xl">👩‍🏫</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        Jana Černá
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">iPhone 13</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
                  <Text className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    &ldquo;Profesionální přístup a kvalitní zboží. Telefon přišel v krásném balení s
                    veškerými příslušenstvími. Určitě budu doporučovat přátelům!&rdquo;
                  </Text>
                </Card>
              </SwiperSlide>

              {/* Review 5 */}
              <SwiperSlide>
                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xl">👨‍💼</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        Tomáš Veselý
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">iPhone 12 Pro</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
                  <Text className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    &ldquo;Koupil jsem si iPhone 12 Pro pro firmu. Kvalita je výborná, cena příznivá
                    a dodání rychlé. Ideální pro firemní použití!&rdquo;
                  </Text>
                </Card>
              </SwiperSlide>

              {/* Review 6 */}
              <SwiperSlide>
                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xl">👩‍🎨</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        Lucie Malá
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">iPhone 14 Pro</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
                  <Text className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    &ldquo;iPhone 14 Pro je úžasný! Kamera je fantastická, výkon skvělý a ušetřila
                    jsem spoustu peněz. Repasované telefony jsou budoucnost!&rdquo;
                  </Text>
                </Card>
              </SwiperSlide>
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
              <button
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group transform hover:scale-110 active:scale-95"
                onClick={() => swiperRef.current?.swiper.slidePrev()}
              >
                <ChevronLeft className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
              <button
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group transform hover:scale-110 active:scale-95"
                onClick={() => swiperRef.current?.swiper.slideNext()}
              >
                <ChevronRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Pagination */}
            <div className="swiper-pagination mt-8 flex justify-center"></div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <Card className="p-8 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Title variant="h3" className="text-2xl font-bold mb-4 text-white">
                Připojte se k našim spokojeným zákazníkům
              </Title>
              <Text className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Objevte kvalitu repasovaných iPhonů a ušetřete až 70% oproti novým zařízením. Plná
                záruka a rychlé doručení zaručeny.
              </Text>
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold text-lg px-8 py-4"
                >
                  🍎 Procházet produkty
                </Button>
              </Link>
            </Card>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-16 bg-gray-50 dark:bg-gray-800">
        <Container>
          <div className="text-center mb-12">
            <Title variant="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Proč si vybrat repasované iPhony?
            </Title>
            <Text className="text-lg text-gray-600 dark:text-gray-400">
              Udržitelná volba, která šetří vaši peněženku i planetu
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg bg-white">
              <div className="text-4xl mb-4">💰</div>
              <Title variant="h3" className="text-xl font-semibold mb-2">
                Ušetříte až 70%
              </Title>
              <Text className="text-gray-600 dark:text-gray-400">
                Repasované iPhony nabízí stejnou kvalitu za zlomek ceny nového zařízení.
              </Text>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-white">
              <div className="text-4xl mb-4">🌱</div>
              <Title variant="h3" className="text-xl font-semibold mb-2">
                Šetříte planetu
              </Title>
              <Text className="text-gray-600 dark:text-gray-400">
                Každý repasovaný telefon pomáhá snižovat elektronický odpad a uhlíkovou stopu.
              </Text>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-white">
              <div className="text-4xl mb-4">✅</div>
              <Title variant="h3" className="text-xl font-semibold mb-2">
                Plná záruka
              </Title>
              <Text className="text-gray-600 dark:text-gray-400">
                12měsíční záruka na všechny repasované telefony s možností vrácení.
              </Text>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}
