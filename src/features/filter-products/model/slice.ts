import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/shared/lib/store';

interface FilterState {
  priceRange: number[] | null;
  selectedModel: string;
  selectedStorage: string;
  selectedColor: string;
}

const initialState: FilterState = {
  priceRange: null,
  selectedModel: 'all',
  selectedStorage: 'all',
  selectedColor: 'all',
};

export const filterSlice = createSlice({
  name: 'filterProducts',
  initialState,
  reducers: {
    setPriceRange(state, action: PayloadAction<number[]>) {
      state.priceRange = action.payload;
    },
    setSelectedModel(state, action: PayloadAction<string>) {
      state.selectedModel = action.payload;
    },
    setSelectedStorage(state, action: PayloadAction<string>) {
      state.selectedStorage = action.payload;
    },
    setSelectedColor(state, action: PayloadAction<string>) {
      state.selectedColor = action.payload;
    },

    resetFilters(state) {
      state.priceRange = null;
      state.selectedModel = 'all';
      state.selectedStorage = 'all';
      state.selectedColor = 'all';
    },
  },
});

export const {
  setPriceRange,
  setSelectedModel,
  setSelectedStorage,
  setSelectedColor,
  resetFilters,
} = filterSlice.actions;

export const selectPriceRange = (state: RootState) => state.filterProducts.priceRange;
export const selectSelectedModel = (state: RootState) => state.filterProducts.selectedModel;
export const selectSelectedStorage = (state: RootState) => state.filterProducts.selectedStorage;
export const selectSelectedColor = (state: RootState) => state.filterProducts.selectedColor;

export default filterSlice.reducer;
