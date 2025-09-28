import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getAuthToken } from '../utils/auth';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    const token = await getAuthToken();

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQuery,
  tagTypes: ['Smartphones', 'Orders', 'Blog'],
  endpoints: () => ({}),
});
