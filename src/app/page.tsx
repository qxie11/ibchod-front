'use client';

import { useState, useEffect } from 'react';
import { mockProducts } from '@/lib/mock-data';
import type { Product } from '@/types';
import Header from '@/components/header';
import ProductCard from '@/components/product-card';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        setFilteredProducts(
          mockProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(lowercasedQuery) ||
              product.description.toLowerCase().includes(lowercasedQuery) ||
              product.color.toLowerCase().includes(lowercasedQuery) ||
              product.storage.toLowerCase().includes(lowercasedQuery)
          )
        );
      } else {
        setFilteredProducts(mockProducts);
      }
    }, 300); // Debounce search input

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
           <div className="text-center py-20">
             <h2 className="text-2xl font-semibold text-foreground">No Products Found</h2>
             <p className="text-muted-foreground mt-2">Try adjusting your search terms.</p>
           </div>
        )}
      </main>
    </div>
  );
}
