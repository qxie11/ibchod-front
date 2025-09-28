import { Api } from '@/generated/generated';

console.log('process.env.NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);
export const api = new Api({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});
