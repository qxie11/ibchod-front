import { Smartphone } from '@/entities/product/model/types';

import { baseApi } from './baseApi';

interface GetProductsParams {
  take?: number;
  skip?: number;
  maxPrice?: number;
  minPrice?: number;
  name?: string;
  color?: string;
  capacity?: string;
  search?: string;
}

export interface GetProductsResponse {
  items: Smartphone[];
  total: number;
}

export type CreateSmartphoneDto = Omit<Smartphone, 'id' | 'slug'>;
export type UpdateSmartphoneDto = Partial<CreateSmartphoneDto>;

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<GetProductsResponse, GetProductsParams>({
      query: ({ take = 10, skip = 0, maxPrice, minPrice, name, color, capacity, search }) => {
        const params = new URLSearchParams();
        params.set('take', String(take));
        params.set('skip', String(skip));
        if (maxPrice !== undefined) params.set('maxPrice', String(maxPrice));
        if (minPrice !== undefined) params.set('minPrice', String(minPrice));
        if (name !== undefined) params.set('name', name);
        if (color !== undefined) params.set('color', color);
        if (capacity !== undefined) params.set('capacity', capacity);
        if (search !== undefined) params.set('search', search);
        return `smartphones?${params.toString()}`;
      },
      providesTags: (result) =>
        result && result.items
          ? [
              ...result.items.map(({ id }: { id: number }) => ({
                type: 'Smartphones' as const,
                id,
              })),
              { type: 'Smartphones', id: 'LIST' },
            ]
          : [{ type: 'Smartphones', id: 'LIST' }],
    }),
    createSmartphone: build.mutation<Smartphone, CreateSmartphoneDto | FormData>({
      query: (body) => ({
        url: 'smartphones',
        method: 'POST',
        body,
        ...(body instanceof FormData && {
          headers: {},
        }),
      }),
      invalidatesTags: [{ type: 'Smartphones', id: 'LIST' }],
    }),
    updateSmartphone: build.mutation<
      Smartphone,
      { id: number; body: UpdateSmartphoneDto | FormData }
    >({
      query: ({ id, body }) => ({
        url: `smartphones/${id}`,
        method: 'PATCH',
        body,
        ...(body instanceof FormData && {
          headers: {},
        }),
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Smartphones', id },
        { type: 'Smartphones', id: 'LIST' },
      ],
    }),
    deleteSmartphone: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `smartphones/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: 'Smartphones', id },
        { type: 'Smartphones', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useCreateSmartphoneMutation,
  useUpdateSmartphoneMutation,
  useDeleteSmartphoneMutation,
} = productApi;
