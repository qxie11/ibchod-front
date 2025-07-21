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
  }),
  overrideExisting: false,
});

export const { useCreateOrderMutation } = orderApi;
