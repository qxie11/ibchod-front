'use client';

import { CheckCircle, Clock, Shield, Star, Truck, Users, Zap } from 'lucide-react';

import { useEffect } from 'react';

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
import { Card, CardContent } from '@/shared/ui/card';
import Container from '@/shared/ui/container';
import Loader from '@/shared/ui/loader';
import { Pagination, PaginationContent } from '@/shared/ui/pagination';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { Header } from '@/widgets/header';

interface ProductsPageProps {
  phoneListInit: GetProductsResponse;
  uniqueBrands: string[];
  uniqueCapacities: number[];
  uniqueColors: string[];
  maxPrice: number;
  minPrice: number;
}

const ITEMS_PER_PAGE = 12;

export default function ProductsPage({
  phoneListInit,
  uniqueBrands,
  uniqueCapacities,
  uniqueColors,
  maxPrice,
  minPrice,
}: ProductsPageProps) {
  const dispatch = useAppDispatch();
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
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
          <Container>
            <div className="text-center mb-8">
              <Badge
                variant="secondary"
                className="mb-4 bg-red-100 text-red-800 border-red-200 animate-pulse"
              >
                <Clock className="w-3 h-3 mr-1" />
                Omezená nabídka - Do vyprodání!
              </Badge>
              <Title variant="h1" className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                Repasované{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  iPhony
                </span>{' '}
                se zárukou
              </Title>
              <Text className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Ušetřete až 40% na originálních iPhone s plnou zárukou 12 měsíců. Rychlé doručení a
                30denní možnost vrácení.
              </Text>

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>4.8/5 (500+ recenzí)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>12 měsíců záruka</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span>Doručení do 24h</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Trust Signals */}
        <section className="py-8 bg-white border-b">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <Text className="font-semibold text-gray-900">12 měsíců záruka</Text>
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

        {/* Products Section */}
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-1/3">
                <div className="sticky top-24">
                  <Card className="shadow-sm border">
                    <CardContent className="w-full max-w-[85%] py-4 px-0 mx-auto">
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
                    </CardContent>
                  </Card>
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
                      href="/checkout"
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Rychlý nákup
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
                  href="/checkout"
                  variant="secondary"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Rychlý nákup
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
