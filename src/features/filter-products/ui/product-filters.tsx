'use client';

import { useDebounce } from 'react-use';

import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import FormField from '@/shared/ui/form-field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Slider } from '@/shared/ui/slider';
import { Title } from '@/shared/ui/title';

interface ProductFiltersProps {
  priceRange: number[];
  setPriceRange: (_range: number[]) => void;
  maxPrice: number;
  selectedModel: string;
  setSelectedModel: (_model: string) => void;
  models: string[];
  selectedStorage: string;
  setSelectedStorage: (_storage: string) => void;
  storages: number[];
  selectedColor: string;
  setSelectedColor: (_color: string) => void;
  colors: string[];
  resetFilters: () => void;
}

export function ProductFilters({
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
        Filtry
      </Title>

      <div className="space-y-4">
        <div>
          <FormField className="mb-3" label="💵 Cena">
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
            <span>{priceRange[0]} Kč</span>
            <span>{priceRange[1]} Kč</span>
          </div>
        </div>
        <div>
          <FormField className="mb-3" label="📱 Model">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="py-1.5 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechny modely</SelectItem>
                {models.filter(Boolean).map((m) => (
                  <SelectItem key={m} value={m}>
                    📱 {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <div>
          <FormField className="mb-3" label="💾 Úložiště">
            <Select value={selectedStorage} onValueChange={setSelectedStorage}>
              <SelectTrigger className="py-1.5 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechna úložiště</SelectItem>
                {storages.filter(Boolean).map((s) => (
                  <SelectItem key={s} value={s.toString()}>
                    💾 {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <div>
          <FormField className="mb-3" label="🎨 Barva">
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="py-1.5 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechny barvy</SelectItem>
                {colors.filter(Boolean).map((c) => (
                  <SelectItem key={c} value={c}>
                    🎨 {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
        <Button onClick={resetFilters} className="w-full" size="small">
          Resetovat filtry
        </Button>
      </div>
    </div>
  );
}
