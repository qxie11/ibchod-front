'use client';

import { useEffect } from 'react';

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
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      color: selectedColor !== 'all' ? selectedColor : undefined,
      capacity: selectedStorage !== 'all' ? selectedStorage : undefined,
    },
    {
      skip: priceRange[1] === 0,
    }
  );

  useEffect(() => {
    if (minPrice !== undefined && maxPrice !== undefined && priceRange[1] === 0) {
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
    <main>
      <Header />
      <Container className="flex-1 py-8 w-full">
        <Title variant="h1" className="mb-2">
          IPhony
        </Title>
        <Text className="mb-8 max-w-2xl">
          Vysoce kvalitní repasované iPhony za skvělou cenu. Tvoje udržitelnější volba s minimálně
          12měsíční zárukou.
        </Text>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr_1fr_1fr] lg:gap-x-8 gap-y-8">
          <aside className="md:col-span-1 h-fit lg:sticky md:top-24 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Filtry</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductFilters
                  priceRange={priceRange}
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
          <div className="md:col-span-3">
            <div className="relative">
              {isLoading && (
                <div className="absolute z-10 inset-0 bg-white/50 flex items-center justify-center">
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
              <div className="text-center py-20 col-span-3">
                <Title variant="h2" className="text-2xl font-semibold text-foreground mb-2">
                  Nebyly nalezeny žádné produkty
                </Title>
                <Text className="text-muted-foreground">Zkuste upravit filtry vyhledávání.</Text>
              </div>
            )}
            <div className="flex justify-center mt-8">
              <Pagination>
                <PaginationContent
                  currentPage={currentPage}
                  totalItems={totalProducts}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={onPageChange}
                />
              </Pagination>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
