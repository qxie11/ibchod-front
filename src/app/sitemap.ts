import { MetadataRoute } from 'next';

import { Smartphone } from '@/entities/product/model/types';
import { GetProductsResponse } from '@/shared/lib/slices/productApi';

// Revalidate sitemap every 24 hours (86400 seconds)
export const revalidate = 86400;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://iphone-store-jet.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/smartphones?take=1000&skip=0`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000), // 10-second timeout
        next: { revalidate: 86400 }, // Revalidate every 24 hours
      }
    );

    if (!response.ok) {
      console.error(`Sitemap: Failed to fetch products, status: ${response.status}`);
      return staticRoutes;
    }

    const productsResponse: GetProductsResponse = await response.json();

    if (!productsResponse || !Array.isArray(productsResponse.items)) {
      console.error('Sitemap: Invalid products data structure');
      return staticRoutes;
    }

    const productRoutes: MetadataRoute.Sitemap = productsResponse.items.map(
      (product: Smartphone) => ({
        url: `${baseUrl}/product/${product.slug}`,
        lastModified: new Date(product.updatedAt || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    );

    return [...staticRoutes, ...productRoutes];
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortSignal') {
      console.error('Sitemap: Product fetch timed out');
    } else {
      console.error('Sitemap: Error generating sitemap:', error);
    }
    // Return only static routes if product fetch fails
    return staticRoutes;
  }
}
