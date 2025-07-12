import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '@/entities/cart/model/slice';
import filterProductsReducer from '@/features/filter-products/model/slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      filterProducts: filterProductsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
