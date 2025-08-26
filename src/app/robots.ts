import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/checkout/',
        '/cart/',
        '/auth/',
        '/test/',
        '/test-api/',
        '/test-session/',
        '/test-toast/',
      ],
    },
    sitemap: 'https://iobchod.shop/sitemap.xml',
    host: 'https://iobchod.shop',
  };
}
