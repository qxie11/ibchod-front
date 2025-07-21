import { Order } from '@/entities/order/model/types';

import { baseApi } from './baseApi';

interface OrderItem {
  smartphoneId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  email: string;
  phone: string;
  name: string;
  items: OrderItem[];
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<unknown, CreateOrderRequest>({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
    }),
    getOrders: build.query<Order[], void>({
      query: () => 'orders',
    }),
  }),
  overrideExisting: false,
});

export const { useCreateOrderMutation, useGetOrdersQuery } = orderApi;
