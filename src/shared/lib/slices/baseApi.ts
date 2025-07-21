import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

console.log(process.env.NEXT_PUBLIC_BASE_URL);
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: () => ({}),
});
