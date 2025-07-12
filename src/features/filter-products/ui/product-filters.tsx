'use client';

import { Button } from '@/shared/ui/button';
import FormField from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Slider } from '@/shared/ui/slider';

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
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="space-y-6">
        <div>
          <FormField
            className="mb-4"
            label="🍏 Search"
          >
            <Input
              className='py-2'
              placeholder="IPhone 16 Pro Max..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FormField>
        </div>
        <div>
          <label htmlFor="price" className="text-sm font-medium">
            Price
          </label>
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
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Model</label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              {models.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Storage</label>
          <Select value={selectedStorage} onValueChange={setSelectedStorage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Storages</SelectItem>
              {storages.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Color</label>
          <Select value={selectedColor} onValueChange={setSelectedColor}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colors</SelectItem>
              {colors.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={resetFilters} className="w-full">
          Reset Filters
        </Button>
      </div>
    </>
  );
}
