'use client';

import { Filter, Smartphone as SmartphoneIcon } from 'lucide-react';

import { useEffect } from 'react';

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
      minPrice: priceRange?.[0],
      maxPrice: priceRange?.[1],
      color: selectedColor !== 'all' ? selectedColor : undefined,
      capacity: selectedStorage !== 'all' ? selectedStorage : undefined,
    },
    {
      skip: !priceRange || priceRange[1] === 0,
    }
  );

  useEffect(() => {
    if (
      minPrice !== undefined &&
      maxPrice !== undefined &&
      minPrice > 0 &&
      maxPrice > 0 &&
      (!priceRange || priceRange[1] === 0)
    ) {
      dispatch(setPriceRange([minPrice, maxPrice]));
    }
  }, [dispatch, maxPrice, minPrice, priceRange]);

  const handleResetFilters = () => {
    dispatch(resetFilters());
    if (minPrice !== undefined && maxPrice !== undefined) {
      dispatch(setPriceRange([minPrice, maxPrice]));
    }
    onPageChange(1);
  };

  const products = phoneListState?.items ?? [];
  const totalProducts = phoneListState?.total ?? 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      {/* Hero Section */}
      <AnimatedHero>
        <Container className="relative py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <SmartphoneIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <Title variant="h1" className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Repasované iPhony
            </Title>
            <Text className="text-lg md:text-xl mb-6 text-blue-100 max-w-2xl mx-auto">
              Široký výběr kvalitních repasovaných iPhonů se zárukou. Ušetřete až 70% oproti novým
              zařízením.
            </Text>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {totalProducts} produktů k dispozici
            </Badge>
          </div>
        </Container>
      </AnimatedHero>

      {/* Products Section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] lg:gap-x-8 gap-y-8">
            <aside className="h-fit lg:sticky lg:top-24 w-full">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filtry
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
    </main>
  );
}
