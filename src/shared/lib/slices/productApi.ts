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

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<any, GetProductsParams>({
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
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery } = productApi;
