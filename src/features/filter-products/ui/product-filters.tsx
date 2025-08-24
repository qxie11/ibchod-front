'use client';

import { Filter, RotateCcw, X } from 'lucide-react';
import { useDebounce } from 'react-use';

import { useState } from 'react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import FormField from '@/shared/ui/form-field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Separator } from '@/shared/ui/separator';
import { Slider } from '@/shared/ui/slider';

interface ProductFiltersProps {
  priceRange: number[];
  setPriceRange: (_range: number[]) => void;
  maxPrice: number;
  minPrice: number;
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
  minPrice,
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
  const [localPriceRange, setLocalPriceRange] = useState([minPrice, maxPrice]);

  useDebounce(
    () => {
      setPriceRange(localPriceRange);
    },
    300,
    [localPriceRange]
  );

  const activeFiltersCount = [
    selectedModel !== 'all',
    selectedStorage !== 'all',
    selectedColor !== 'all',
    priceRange[0] !== minPrice || priceRange[1] !== maxPrice,
  ].filter(Boolean).length;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with active filters count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-gray-900 dark:text-gray-100">Filtry</span>
          {activeFiltersCount > 0 && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            onClick={resetFilters}
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <FormField label="💰 Cenové rozpětí" className="mb-0">
          {maxPrice !== 0 && (
            <Slider
              id="price"
              min={minPrice}
              max={maxPrice}
              step={100}
              value={localPriceRange}
              onValueChange={setLocalPriceRange}
              className="mb-3"
            />
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {formatPrice(localPriceRange[0])}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {formatPrice(localPriceRange[1])}
            </span>
          </div>
        </FormField>
      </div>

      <Separator />

      {/* Model Filter */}
      <div className="space-y-3">
        <FormField label="📱 Model iPhone" className="mb-0">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Vyberte model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="font-medium">
                🍎 Všechny modely
              </SelectItem>
              {models.filter(Boolean).map((model) => (
                <SelectItem key={model} value={model} className="flex items-center gap-2">
                  <span>📱</span>
                  <span>{model}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <Separator />

      {/* Storage Filter */}
      <div className="space-y-3">
        <FormField label="💾 Kapacita úložiště" className="mb-0">
          <Select value={selectedStorage} onValueChange={setSelectedStorage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Vyberte kapacitu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="font-medium">
                💾 Všechny kapacity
              </SelectItem>
              {storages
                .filter(Boolean)
                .sort((a, b) => a - b)
                .map((storage) => (
                  <SelectItem
                    key={storage}
                    value={storage.toString()}
                    className="flex items-center gap-2"
                  >
                    <span>💾</span>
                    <span>{storage} GB</span>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <Separator />

      {/* Color Filter */}
      <div className="space-y-3">
        <FormField label="🎨 Barva" className="mb-0">
          <Select value={selectedColor} onValueChange={setSelectedColor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Vyberte barvu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="font-medium">
                🎨 Všechny barvy
              </SelectItem>
              {colors.filter(Boolean).map((color) => (
                <SelectItem key={color} value={color} className="flex items-center gap-2">
                  <span>🎨</span>
                  <span className="capitalize">{color}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Aktivní filtry:
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedModel !== 'all' && (
                <Badge variant="outline" className="text-xs">
                  📱 {selectedModel}
                  <button
                    onClick={() => setSelectedModel('all')}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedStorage !== 'all' && (
                <Badge variant="outline" className="text-xs">
                  💾 {selectedStorage} GB
                  <button
                    onClick={() => setSelectedStorage('all')}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedColor !== 'all' && (
                <Badge variant="outline" className="text-xs">
                  🎨 {selectedColor}
                  <button
                    onClick={() => setSelectedColor('all')}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {(priceRange[0] !== minPrice || priceRange[1] !== maxPrice) && (
                <Badge variant="outline" className="text-xs">
                  💰 {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  <button
                    onClick={() => setLocalPriceRange([minPrice, maxPrice])}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
