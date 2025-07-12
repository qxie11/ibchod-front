'use client';

import { useState, useEffect } from 'react';
import { mockProducts } from '@/lib/mock-data';
import type { Product } from '@/types';
import Header from '@/components/header';
import ProductCard from '@/components/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const models = Array.from(new Set(mockProducts.map(p => p.model)));
const storages = Array.from(new Set(mockProducts.map(p => p.storage))).sort((a, b) => parseInt(a) - parseInt(b));
const colors = Array.from(new Set(mockProducts.map(p => p.color)));
const maxPrice = Math.max(...mockProducts.map(p => p.price));

export default function Home() {
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
            <h2 className="text-xl font-semibold mb-4">Filtry</h2>
            <div className="space-y-6">
               <div>
                <label className="text-sm font-medium">Hledat</label>
                <Input 
                  placeholder="Hledat iPhony..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="price" className="text-sm font-medium">Cena</label>
                <Slider
                  id="price"
                  min={0}
                  max={maxPrice}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>{priceRange[0]} Kč</span>
                  <span>{priceRange[1]} Kč</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Všechny modely</SelectItem>
                    {models.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Úložiště</label>
                <Select value={selectedStorage} onValueChange={setSelectedStorage}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Všechna úložiště</SelectItem>
                    {storages.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Barva</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Všechny barvy</SelectItem>
                    {colors.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={resetFilters} variant="outline" className="w-full">Resetovat filtry</Button>
            </div>
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
