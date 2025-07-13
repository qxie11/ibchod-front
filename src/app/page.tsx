'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { mockProducts } from '@/entities/product';
import { ProductCard } from '@/entities/product';
import { AddToCartButton } from '@/features/add-to-cart';
import { ProductFilters } from '@/features/filter-products';
import {
  resetFilters,
  selectPriceRange,
  selectProducts,
  selectSearchQuery,
  selectSelectedColor,
  selectSelectedModel,
  selectSelectedStorage,
  setPriceRange,
  setProducts,
  setSearchQuery,
  setSelectedColor,
  setSelectedModel,
  setSelectedStorage,
} from '@/features/filter-products';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import Container from '@/shared/ui/container';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { Header } from '@/widgets/header';

const models = Array.from(new Set(mockProducts.map((p) => p.model)));
const storages = Array.from(new Set(mockProducts.map((p) => p.storage))).sort(
  (a, b) => parseInt(a) - parseInt(b)
);
const colors = Array.from(new Set(mockProducts.map((p) => p.color)));
const maxPrice = Math.max(...mockProducts.map((p) => p.price));

export default function HomePage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const searchQuery = useAppSelector(selectSearchQuery);
  const priceRange = useAppSelector(selectPriceRange);
  const selectedModel = useAppSelector(selectSelectedModel);
  const selectedStorage = useAppSelector(selectSelectedStorage);
  const selectedColor = useAppSelector(selectSelectedColor);

  useEffect(() => {
    const filterProducts = () => {
      let filtered = mockProducts;

      // Text search
      if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(lowercasedQuery) ||
            product.description.toLowerCase().includes(lowercasedQuery)
        );
      }

      // Filter by price
      filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

      // Filter by model
      if (selectedModel !== 'all') {
        filtered = filtered.filter((p) => p.model === selectedModel);
      }

      // Filter by storage
      if (selectedStorage !== 'all') {
        filtered = filtered.filter((p) => p.storage === selectedStorage);
      }

      // Filter by color
      if (selectedColor !== 'all') {
        filtered = filtered.filter((p) => p.color === selectedColor);
      }

      dispatch(setProducts(filtered));
    };

    const handler = setTimeout(() => {
      filterProducts();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, priceRange, selectedModel, selectedStorage, selectedColor, dispatch]);

  const resetFil = () => {
    dispatch(setSearchQuery(''));
    dispatch(setPriceRange([0, maxPrice]));
    dispatch(setSelectedModel('all'));
    dispatch(setSelectedStorage('all'));
    dispatch(setSelectedColor('all'));
    dispatch(resetFilters());
  };

  return (
    <main>
      <Header />
      <Container className="flex-1 py-8 w-full">
        <Title variant="h1" className="mb-2">
          IPhony:
        </Title>
        <Text className="mb-8">
          Vysoce kvalitní repasované iPhony za skvělou cenu. Tvoje udržitelnější volba s minimálně
          12měsíční zárukou.
        </Text>
        <Title variant="h3" size="small" className="mb-2">
          Filtrovat podle: Cena
        </Title>
        <div className="flex gap-2 flex-wrap mb-4">
          <Button
            className="border-gray-300 hover:bg-transparent hover:border-black hover:text-black text-black"
            size="small"
            variant="ghost"
          >
            1700 - 5000
          </Button>
          <Button
            className="border-gray-300 hover:bg-transparent hover:border-black hover:text-black text-black"
            size="small"
            variant="ghost"
          >
            1700 - 5000
          </Button>
          <Button
            className="border-gray-300 hover:bg-transparent hover:border-black hover:text-black text-black"
            size="small"
            variant="ghost"
          >
            1700 - 5000
          </Button>
          <Button
            className="border-gray-300 hover:bg-transparent hover:border-black hover:text-black text-black"
            size="small"
            variant="ghost"
          >
            1700 - 5000
          </Button>
          <Button
            className="border-gray-300 hover:bg-transparent hover:border-black hover:text-black text-black"
            size="small"
            variant="ghost"
          >
            1700 - 5000
          </Button>
          <Button
            className="border-gray-300 hover:bg-transparent hover:border-black hover:text-black text-black"
            size="small"
            variant="ghost"
          >
            1700 - 5000
          </Button>
        </div>
        <Title variant="h3" size="small" className="mb-2">
          Filtrovat podle: Úložiště
        </Title>
        <div className="flex gap-2 flex-wrap mb-10">
          <Button
            className="border-gray-300 hover:bg-transparent hover:border-black hover:text-black text-black"
            size="small"
            variant="ghost"
          >
            1700 - 5000
          </Button>
          <Button
            className="border-gray-300 hover:bg-transparent hover:border-black hover:text-black text-black"
            size="small"
            variant="ghost"
          >
            1700 - 5000
          </Button>
          <Button
            className="border-gray-300 hover:bg-transparent hover:border-black hover:text-black text-black"
            size="small"
            variant="ghost"
          >
            1700 - 5000
          </Button>
          <Button
            className="border-gray-300 hover:bg-transparent hover:border-black hover:text-black text-black"
            size="small"
            variant="ghost"
          >
            1700 - 5000
          </Button>
          <Button
            className="border-gray-300 hover:bg-transparent hover:border-black hover:text-black text-black"
            size="small"
            variant="ghost"
          >
            1700 - 5000
          </Button>
          <Button
            className="border-gray-300 hover:bg-transparent hover:border-black hover:text-black text-black"
            size="small"
            variant="ghost"
          >
            1700 - 5000
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <LiquidGlass
            as="aside"
            className="md:col-span-2 rounded-lg shadow-sm h-fit sticky top-24 w-full"
          >
            <ProductFilters
              searchQuery={searchQuery}
              setSearchQuery={(v) => dispatch(setSearchQuery(v))}
              priceRange={priceRange}
              setPriceRange={(v) => dispatch(setPriceRange(v))}
              maxPrice={maxPrice}
              selectedModel={selectedModel}
              setSelectedModel={(v) => dispatch(setSelectedModel(v))}
              models={models}
              selectedStorage={selectedStorage}
              setSelectedStorage={(v) => dispatch(setSelectedStorage(v))}
              storages={storages}
              selectedColor={selectedColor}
              setSelectedColor={(v) => dispatch(setSelectedColor(v))}
              colors={colors}
              resetFilters={resetFil}
            />
          </LiquidGlass>
          <div className="md:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {products.map((product) => (
                <div key={product.id} className="relative group">
                  <Link href={`/product/${product.id}`} className="block">
                    <ProductCard product={product} />
                  </Link>
                  <div className="absolute bottom-4 right-4 z-10">
                    <AddToCartButton size="small" product={product} />
                  </div>
                </div>
              ))}
            </div>
            {products.length === 0 && (
              <div className="text-center py-20 col-span-3">
                <Title variant="h2" className="text-2xl font-semibold text-foreground mb-2">
                  No products found
                </Title>
                <Text className="text-muted-foreground">Try adjusting your search filters.</Text>
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
