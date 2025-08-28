'use client';

import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Shield,
  Star,
  Truck,
  Users,
  Zap,
} from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination as SwiperPagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useEffect, useRef } from 'react';

import { AnimatedHero } from '@/components/animated-hero';
import { ProductCard } from '@/entities/product';
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

  const topProducts = products.slice(0, 3);

  return (
    <>
      <Header />

      <main>
        {/* Hero Section с CTA */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
          <Container>
            <div className="text-center mb-8">
              <Badge
                variant="secondary"
                className="mb-4 bg-red-100 text-red-800 border-red-200 animate-pulse"
              >
                <Clock className="w-3 h-3 mr-1" />
                Omezená nabídka - Do vyprodání!
              </Badge>
              <Title variant="h1" className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
                Repasované{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  iPhony
                </span>{' '}
                se zárukou
              </Title>
              <Text className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                Ušetřete až 40% na originálních iPhone s plnou zárukou 3měsíců. Rychlé doručení a
                30denní možnost vrácení.
              </Text>

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>4.8/5 (500+ recenzí)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>3měsíců záruka</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span>Doručení do 24h</span>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  href="/products"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Prohlédnout nabídku
                </Button>
              </div>
            </div>

            {/* Top Products Preview */}
            {topProducts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {topProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300 py-4"
                  >
                    <div className="absolute top-2 left-2 z-10">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 border-green-200"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Skladem
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {product.price.toLocaleString('cs-CZ')} Kč
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        <span className="line-through">
                          {(product.price * 1.4).toLocaleString('cs-CZ')} Kč
                        </span>{' '}
                        ušetříte {(product.price * 0.4).toLocaleString('cs-CZ')} Kč
                      </div>
                      <Button href={`/product/${product.slug}`} className="w-full">
                        Zobrazit detail
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* Trust Signals Section */}
        <section className="py-12 bg-white border-b">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <Text className="font-semibold text-gray-900">3měsíců záruka</Text>
                <Text className="text-sm text-gray-600">Plná záruka</Text>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <Text className="font-semibold text-gray-900">Doručení do 24h</Text>
                <Text className="text-sm text-gray-600">Rychlé dodání</Text>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <Text className="font-semibold text-gray-900">500+ spokojených</Text>
                <Text className="text-sm text-gray-600">Zákazníků</Text>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <Text className="font-semibold text-gray-900">30 dní vrácení</Text>
                <Text className="text-sm text-gray-600">Bez rizika</Text>
              </div>
            </div>
          </Container>
        </section>

        {/* Animated Hero */}
        <AnimatedHero>
          <div></div>
        </AnimatedHero>

        {/* Products Section */}
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-1/3">
                <div className="sticky top-24">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Title variant="h3" className="text-lg font-semibold">
                        Filtry
                      </Title>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResetFilters}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Vymazat
                      </Button>
                    </div>
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
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="lg:w-2/3">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Title variant="h2" className="text-2xl font-bold text-gray-900">
                      Repasované iPhony
                    </Title>
                    <Text className="text-gray-600">Nalezeno {totalProducts} produktů</Text>
                  </div>

                  {/* Quick CTA */}
                  <div className="hidden md:block">
                    <Button
                      href="/products"
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      Zobrazit všechny
                    </Button>
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader />
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-12">
                    <Title variant="h3" className="text-xl font-semibold mb-2">
                      Žádné produkty nenalezeny
                    </Title>
                    <Text className="text-gray-600 mb-4">
                      Zkuste upravit filtry nebo se podívejte na všechny produkty.
                    </Text>
                    <Button href="/products" variant="default">
                      Zobrazit všechny produkty
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalProducts > ITEMS_PER_PAGE && (
                      <div className="flex justify-center">
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
                  </>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Reviews Section */}
        <section className="py-16 bg-white">
          <Container>
            <div className="text-center mb-12">
              <Title variant="h2" className="text-3xl font-bold mb-4 text-gray-900">
                Co říkají naši zákazníci
              </Title>
              <Text className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                  <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl">👨‍💼</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Petr Novák</div>
                        <div className="text-sm text-gray-600">iPhone 13 Pro</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
                    <Text
                      tagName="blockquote"
                      className="text-gray-700 text-sm leading-relaxed flex-grow"
                    >
                      &ldquo;Koupil jsem si iPhone 13 Pro a jsem nadšený! Telefon vypadá jako nový,
                      funguje perfektně a ušetřil jsem skoro 15 tisíc korun. Doporučuji všem!&rdquo;
                    </Text>
                  </Card>
                </SwiperSlide>

                {/* Review 2 */}
                <SwiperSlide>
                  <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl">👩‍💻</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Anna Svobodová</div>
                        <div className="text-sm text-gray-600">iPhone 12</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
                    <Text
                      tagName="blockquote"
                      className="text-gray-700 text-sm leading-relaxed flex-grow"
                    >
                      &ldquo;Rychlé doručení a telefon v perfektním stavu. Záruka 3měsíců mě
                      uklidňuje a cena byla opravdu výhodná. Určitě si tu koupím i další
                      iPhone!&rdquo;
                    </Text>
                  </Card>
                </SwiperSlide>

                {/* Review 3 */}
                <SwiperSlide>
                  <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl">👨‍🎓</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Martin Dvořák</div>
                        <div className="text-sm text-gray-600">iPhone 14</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
                    <Text
                      tagName="blockquote"
                      className="text-gray-700 text-sm leading-relaxed flex-grow"
                    >
                      &ldquo;Jako student ocením, že můžu mít kvalitní iPhone za rozumnou cenu.
                      Telefon funguje bez problémů a vypadá skvěle. Skvělá volba pro
                      rozpočet!&rdquo;
                    </Text>
                  </Card>
                </SwiperSlide>

                {/* Review 4 */}
                <SwiperSlide>
                  <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl">👩‍🏫</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Jana Černá</div>
                        <div className="text-sm text-gray-600">iPhone 13</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
                    <Text
                      tagName="blockquote"
                      className="text-gray-700 text-sm leading-relaxed flex-grow"
                    >
                      &ldquo;Profesionální přístup a kvalitní zboží. Telefon přišel v krásném balení
                      s veškerými příslušenstvími. Určitě budu doporučovat přátelům!&rdquo;
                    </Text>
                  </Card>
                </SwiperSlide>

                {/* Review 5 */}
                <SwiperSlide>
                  <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-teal-50 to-cyan-50 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl">👨‍💼</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Tomáš Veselý</div>
                        <div className="text-sm text-gray-600">iPhone 12 Pro</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
                    <Text
                      tagName="blockquote"
                      className="text-gray-700 text-sm leading-relaxed flex-grow"
                    >
                      &ldquo;Koupil jsem si iPhone 12 Pro pro firmu. Kvalita je výborná, cena
                      příznivá a dodání rychlé. Ideální pro firemní použití!&rdquo;
                    </Text>
                  </Card>
                </SwiperSlide>

                {/* Review 6 */}
                <SwiperSlide>
                  <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-blue-50 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl">👩‍🎨</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Lucie Malá</div>
                        <div className="text-sm text-gray-600">iPhone 14 Pro</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
                    <Text
                      tagName="blockquote"
                      className="text-gray-700 text-sm leading-relaxed flex-grow"
                    >
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
          </Container>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <Container>
            <div className="text-center text-white">
              <Title variant="h2" className="text-3xl font-bold mb-4">
                Neváhejte a ušetřete!
              </Title>
              <Text className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                Repasované iPhony jsou stejně kvalitní jako nové, ale za mnohem lepší cenu. Navíc
                pomáháte životnímu prostředí.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/products"
                  variant="secondary"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Prohlédnout všechny produkty
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
