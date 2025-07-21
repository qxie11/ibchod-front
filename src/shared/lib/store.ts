import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '@/entities/cart/model/slice';
import filterProductsReducer from '@/features/filter-products/model/slice';

import { baseApi } from './slices/baseApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      filterProducts: filterProductsReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
