import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { mockProducts } from '@/entities/product';
import type { Product } from '@/entities/product';
import type { RootState } from '@/shared/lib/store';

interface FilterState {
  products: Product[];
  searchQuery: string;
  priceRange: number[];
  selectedModel: string;
  selectedStorage: string;
  selectedColor: string;
}

const maxPrice = Math.max(...mockProducts.map((p) => p.price));

const initialState: FilterState = {
  products: mockProducts,
  searchQuery: '',
  priceRange: [0, maxPrice],
  selectedModel: 'all',
  selectedStorage: 'all',
  selectedColor: 'all',
};

const filterProducts = (state: FilterState) => {
  let filtered = mockProducts;
  if (state.searchQuery) {
    const lowercasedQuery = state.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery)
    );
  }
  filtered = filtered.filter(
    (p) => p.price >= state.priceRange[0] && p.price <= state.priceRange[1]
  );
  if (state.selectedModel !== 'all') {
    filtered = filtered.filter((p) => p.model === state.selectedModel);
  }
  if (state.selectedStorage !== 'all') {
    filtered = filtered.filter((p) => p.storage === state.selectedStorage);
  }
  if (state.selectedColor !== 'all') {
    filtered = filtered.filter((p) => p.color === state.selectedColor);
  }
  return filtered;
};

export const filterSlice = createSlice({
  name: 'filterProducts',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.products = filterProducts(state);
    },
    setPriceRange(state, action: PayloadAction<number[]>) {
      state.priceRange = action.payload;
      state.products = filterProducts(state);
    },
    setSelectedModel(state, action: PayloadAction<string>) {
      state.selectedModel = action.payload;
      state.products = filterProducts(state);
    },
    setSelectedStorage(state, action: PayloadAction<string>) {
      state.selectedStorage = action.payload;
      state.products = filterProducts(state);
    },
    setSelectedColor(state, action: PayloadAction<string>) {
      state.selectedColor = action.payload;
      state.products = filterProducts(state);
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    resetFilters(state) {
      state.searchQuery = '';
      state.priceRange = [0, maxPrice];
      state.selectedModel = 'all';
      state.selectedStorage = 'all';
      state.selectedColor = 'all';
      state.products = filterProducts(state);
    },
  },
});

export const {
  setSearchQuery,
  setPriceRange,
  setSelectedModel,
  setSelectedStorage,
  setSelectedColor,
  setProducts,
  resetFilters,
} = filterSlice.actions;

export const selectProducts = (state: RootState) => state.filterProducts.products;
export const selectSearchQuery = (state: RootState) => state.filterProducts.searchQuery;
export const selectPriceRange = (state: RootState) => state.filterProducts.priceRange;
export const selectSelectedModel = (state: RootState) => state.filterProducts.selectedModel;
export const selectSelectedStorage = (state: RootState) => state.filterProducts.selectedStorage;
export const selectSelectedColor = (state: RootState) => state.filterProducts.selectedColor;

export default filterSlice.reducer;
