import { MetadataRoute } from 'next';

// Revalidate robots.txt every 24 hours (86400 seconds)
export const revalidate = 86400;

export default function robots(): MetadataRoute.Robots {
  // Determine base URL based on environment
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://iphone-store-jet.vercel.app';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
