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
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    getOrders: build.query<Order[], void>({
      query: () => 'orders',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Orders' as const, id })),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateOrderMutation, useGetOrdersQuery } = orderApi;
