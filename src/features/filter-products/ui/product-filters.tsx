'use client';

import { useDebounce } from 'react-use';

import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import FormField from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Slider } from '@/shared/ui/slider';
import { Title } from '@/shared/ui/title';

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (_query: string) => void;
  priceRange: number[];
  setPriceRange: (_range: number[]) => void;
  maxPrice: number;
  selectedModel: string;
  setSelectedModel: (_model: string) => void;
  models: string[];
  selectedStorage: string;
  setSelectedStorage: (_storage: string) => void;
  storages: string[];
  selectedColor: string;
  setSelectedColor: (_color: string) => void;
  colors: string[];
  resetFilters: () => void;
}

export function ProductFilters({
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  maxPrice,
  selectedModel,
  setSelectedModel,
  models,
  selectedStorage,
  setSelectedStorage,
  storages,
  selectedColor,
  setSelectedColor,
  colors,
  resetFilters,
}: ProductFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  useDebounce(
    () => {
      setPriceRange(localPriceRange);
    },
    300,
    [localPriceRange]
  );

  return (
    <div className="p-4">
      <Title variant="h2" size="small" className="mb-3">
        Filters
      </Title>

      <div className="space-y-4">
        <div>
          <FormField className="mb-3" label="🍏 Search">
            <Input
              className="py-1.5 text-sm"
              placeholder="IPhone 16 Pro Max..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FormField>
        </div>
        <div>
          <FormField className="mb-3" label="💵 Price">
            <Slider
              id="price"
              min={0}
              max={maxPrice}
              step={10}
              value={localPriceRange}
              onValueChange={setLocalPriceRange}
              className="mb-2"
            />
          </FormField>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
        <div>
          <FormField className="mb-3" label="📱 Model">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="py-1.5 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                {models.map((m) => (
                  <SelectItem key={m} value={m}>
                    📱 {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <div>
          <FormField className="mb-3" label="💾 Storage">
            <Select value={selectedStorage} onValueChange={setSelectedStorage}>
              <SelectTrigger className="py-1.5 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Storages</SelectItem>
                {storages.map((s) => (
                  <SelectItem key={s} value={s}>
                    💾 {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <div>
          <FormField className="mb-3" label="🎨 Color">
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="py-1.5 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colors</SelectItem>
                {colors.map((c) => (
                  <SelectItem key={c} value={c}>
                    🎨 {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <Button onClick={resetFilters} className="w-full" size="small">
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
