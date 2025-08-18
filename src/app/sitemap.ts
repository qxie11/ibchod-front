import { MetadataRoute } from 'next';

import { SitemapGenerator } from '@/lib/sitemap-generator';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const generator = new SitemapGenerator();

  return await generator.generateSitemapWithProducts();
}
