'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Slider } from "@/shared/ui/slider";
import { Input } from "@/shared/ui/input";
import { Button } from '@/shared/ui/button';

interface ProductFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    priceRange: number[];
    setPriceRange: (range: number[]) => void;
    maxPrice: number;
    selectedModel: string;
    setSelectedModel: (model: string) => void;
    models: string[];
    selectedStorage: string;
    setSelectedStorage: (storage: string) => void;
    storages: string[];
    selectedColor: string;
    setSelectedColor: (color: string) => void;
    colors: string[];
    resetFilters: () => void;
}

export function ProductFilters({
    searchQuery, setSearchQuery, priceRange, setPriceRange, maxPrice,
    selectedModel, setSelectedModel, models,
    selectedStorage, setSelectedStorage, storages,
    selectedColor, setSelectedColor, colors,
    resetFilters
}: ProductFiltersProps) {
  return (
    <>
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
    </>
  );
}
