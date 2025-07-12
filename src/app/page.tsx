'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { mockProducts } from '@/entities/product';
import { ProductCard } from '@/entities/product';
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
import Container from '@/shared/ui/container';
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
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <Container className="flex-1 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1 p-6 rounded-lg shadow-sm h-fit sticky top-24 bg-card">
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
          </aside>
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} passHref>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
            {products.length === 0 && (
              <div className="text-center py-20 col-span-full">
                <h2 className="text-2xl font-semibold text-foreground">No products found</h2>
                <p className="text-muted-foreground mt-2">Try adjusting your search filters.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
