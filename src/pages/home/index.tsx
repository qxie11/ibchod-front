'use client';

import { useState, useEffect } from 'react';
import { mockProducts } from '@/entities/product/model/mock';
import type { Product } from '@/entities/product/model/types';
import { Header } from '@/widgets/header';
import { ProductCard } from '@/entities/product';
import { ProductFilters } from '@/features/filter-products';
import Link from 'next/link';

const models = Array.from(new Set(mockProducts.map(p => p.model)));
const storages = Array.from(new Set(mockProducts.map(p => p.storage))).sort((a, b) => parseInt(a) - parseInt(b));
const colors = Array.from(new Set(mockProducts.map(p => p.color)));
const maxPrice = Math.max(...mockProducts.map(p => p.price));

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);
  const [selectedModel, setSelectedModel] = useState<string>('all');
  const [selectedStorage, setSelectedStorage] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');

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
      filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
      
      // Filter by model
      if (selectedModel !== 'all') {
        filtered = filtered.filter(p => p.model === selectedModel);
      }

      // Filter by storage
      if (selectedStorage !== 'all') {
        filtered = filtered.filter(p => p.storage === selectedStorage);
      }
      
      // Filter by color
      if (selectedColor !== 'all') {
        filtered = filtered.filter(p => p.color === selectedColor);
      }

      setProducts(filtered);
    };

    const handler = setTimeout(() => {
        filterProducts();
    }, 300);

    return () => {
        clearTimeout(handler);
    };
  }, [searchQuery, priceRange, selectedModel, selectedStorage, selectedColor]);

  const resetFilters = () => {
    setSearchQuery('');
    setPriceRange([0, maxPrice]);
    setSelectedModel('all');
    setSelectedStorage('all');
    setSelectedColor('all');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1 bg-card p-6 rounded-lg shadow-sm h-fit sticky top-24">
             <ProductFilters 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                maxPrice={maxPrice}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                models={models}
                selectedStorage={selectedStorage}
                setSelectedStorage={setSelectedStorage}
                storages={storages}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                colors={colors}
                resetFilters={resetFilters}
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
                 <h2 className="text-2xl font-semibold text-foreground">Nebyly nalezeny žádné produkty</h2>
                 <p className="text-muted-foreground mt-2">Zkuste upravit podmínky vyhledávání.</p>
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
