import fs from 'fs';
import path from 'path';

import { MetadataRoute } from 'next';

interface SitemapConfig {
  baseUrl: string;
  excludePaths: string[];
  excludePatterns: RegExp[];
  includeAuthPages: boolean;
  includeCartPages: boolean;
  includeAdminPages: boolean;
  includeTestPages: boolean;
}

interface PageInfo {
  path: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastModified?: Date;
}

interface PriorityRule {
  pattern: string | RegExp;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export class SitemapGenerator {
  private config: SitemapConfig;
  private appDir: string;
  private priorityRules: PriorityRule[];

  constructor(config: Partial<SitemapConfig> = {}) {
    this.config = {
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://iphone-store-jet.vercel.app',
      excludePaths: [
        '/api',
        '/_next',
        '/admin',
        '/test',
        '/test-toast',
        '/simple',
        '/payment/cancel',
        '/payment/status',
        '/payment/success',
      ],
      excludePatterns: [
        /\[.*\]/,
        /\.tsx?$/,
        /\.jsx?$/,
        /\.css$/,
        /\.json$/,
        /\.md$/,
        /\.(png|jpg|jpeg|gif|svg|ico)$/,
      ],
      includeAuthPages: process.env.INCLUDE_AUTH_IN_SITEMAP === 'true',
      includeCartPages: process.env.INCLUDE_CART_IN_SITEMAP !== 'false',
      includeAdminPages: process.env.INCLUDE_ADMIN_IN_SITEMAP === 'true',
      includeTestPages: process.env.INCLUDE_TEST_IN_SITEMAP === 'true',
      ...config,
    };

    this.appDir = path.join(process.cwd(), 'src', 'app');

    this.priorityRules = [
      {
        pattern: '^/$',
        priority: 1.0,
        changeFrequency: 'daily',
      },
      {
        pattern: '^/product/',
        priority: 0.9,
        changeFrequency: 'weekly',
      },
      {
        pattern: '^/blog$',
        priority: 0.8,
        changeFrequency: 'weekly',
      },
      {
        pattern: '^/blog/',
        priority: 0.7,
        changeFrequency: 'monthly',
      },
      {
        pattern: '^/category/',
        priority: 0.8,
        changeFrequency: 'weekly',
      },
      {
        pattern: '^/cart$',
        priority: 0.7,
        changeFrequency: 'daily',
      },
      {
        pattern: '^/checkout$',
        priority: 0.7,
        changeFrequency: 'daily',
      },
      {
        pattern: '^/about$',
        priority: 0.6,
        changeFrequency: 'monthly',
      },
      {
        pattern: '^/contact$',
        priority: 0.6,
        changeFrequency: 'monthly',
      },
      {
        pattern: '^/auth/',
        priority: 0.3,
        changeFrequency: 'monthly',
      },
      {
        pattern: '^/terms$',
        priority: 0.2,
        changeFrequency: 'yearly',
      },
      {
        pattern: '^/privacy$',
        priority: 0.2,
        changeFrequency: 'yearly',
      },
      {
        pattern: '^/policy$',
        priority: 0.2,
        changeFrequency: 'yearly',
      },
    ];
  }

  /**
   * Сканирует директорию приложения и находит все страницы
   */
  private scanPages(dir: string, basePath: string = ''): string[] {
    const pages: string[] = [];

    try {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(basePath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          if (item.startsWith('.') || item === 'node_modules') {
            continue;
          }

          if (this.shouldExcludePath('/' + relativePath)) {
            continue;
          }

          const subPages = this.scanPages(fullPath, relativePath);
          pages.push(...subPages);
        } else if (this.isPageFile(item)) {
          const pagePath = this.getPagePath(relativePath, item);
          if (pagePath && !this.shouldExcludePath(pagePath)) {
            if (pagePath === '/page') {
              pages.push('/');
            } else {
              pages.push(pagePath);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }

    return pages;
  }

  /**
   * Проверяет, является ли файл страницей
   */
  private isPageFile(filename: string): boolean {
    return (
      filename === 'page.tsx' ||
      filename === 'page.ts' ||
      filename === 'page.jsx' ||
      filename === 'page.js'
    );
  }

  /**
   * Преобразует путь файла в URL страницы
   */
  private getPagePath(relativePath: string, _filename: string): string | null {
    const pathWithoutExt = relativePath.replace(/\.(tsx?|jsx?)$/, '');
    const cleanPath = pathWithoutExt.replace(/\/page$/, '');
    const urlPath = cleanPath ? '/' + cleanPath.replace(/\\/g, '/') : '/';

    if (!cleanPath || cleanPath === '') {
      return '/';
    }

    return urlPath;
  }

  /**
   * Проверяет, нужно ли исключить путь
   */
  private shouldExcludePath(path: string): boolean {
    if (this.config.excludePaths.some((excludePath) => path.startsWith(excludePath))) {
      return true;
    }

    if (this.config.excludePatterns.some((pattern) => pattern.test(path))) {
      return true;
    }

    if (!this.config.includeAuthPages && path.startsWith('/auth')) {
      return true;
    }

    if (
      !this.config.includeCartPages &&
      (path.startsWith('/cart') || path.startsWith('/checkout'))
    ) {
      return true;
    }

    if (!this.config.includeAdminPages && path.startsWith('/admin')) {
      return true;
    }

    if (!this.config.includeTestPages && (path.startsWith('/test') || path.startsWith('/simple'))) {
      return true;
    }

    return false;
  }

  /**
   * Получает информацию о странице (приоритет, частота обновления)
   */
  private getPageInfo(pagePath: string): PageInfo {
    for (const rule of this.priorityRules) {
      const pattern = typeof rule.pattern === 'string' ? new RegExp(rule.pattern) : rule.pattern;
      if (pattern.test(pagePath)) {
        return {
          path: pagePath,
          priority: rule.priority,
          changeFrequency: rule.changeFrequency,
        };
      }
    }

    return {
      path: pagePath,
      priority: 0.5,
      changeFrequency: 'weekly',
    };
  }

  public generateSitemap(): MetadataRoute.Sitemap {
    const discoveredPages = this.scanPages(this.appDir);

    const sitemapEntries: MetadataRoute.Sitemap = [];

    for (const pagePath of discoveredPages) {
      const pageInfo = this.getPageInfo(pagePath);

      sitemapEntries.push({
        url: `${this.config.baseUrl}${pageInfo.path}`,
        lastModified: pageInfo.lastModified || new Date(),
        changeFrequency: pageInfo.changeFrequency,
        priority: pageInfo.priority,
      });
    }

    return sitemapEntries;
  }

  /**
   * Генерирует sitemap с продуктами из API
   */
  public async generateSitemapWithProducts(): Promise<MetadataRoute.Sitemap> {
    const staticEntries = this.generateSitemap();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/smartphones?take=1000&skip=0`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(10000),
          next: { revalidate: 86400 },
        }
      );

      if (!response.ok) {
        console.error(`Sitemap: Failed to fetch products, status: ${response.status}`);
        return staticEntries;
      }

      const productsResponse = await response.json();

      if (!productsResponse || !Array.isArray(productsResponse.items)) {
        console.error('Sitemap: Invalid products data structure');
        return staticEntries;
      }

      const productEntries: MetadataRoute.Sitemap = productsResponse.items
        .filter((product: any) => product.slug && product.slug.trim() !== '')
        .map((product: any) => ({
          url: `${this.config.baseUrl}/product/${product.slug}`,
          lastModified: new Date(product.updatedAt || Date.now()),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        }))
        .filter(
          (route: any, index: number, self: any[]) =>
            index === self.findIndex((r: any) => r.url === route.url)
        );

      const blogResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog?take=1000&skip=0`, {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
        next: { revalidate: 86400 },
      });

      let blogEntries: MetadataRoute.Sitemap = [];

      if (blogResponse.ok) {
        const blogData = await blogResponse.json();

        if (blogData && Array.isArray(blogData.items)) {
          blogEntries = blogData.items
            .filter((article: any) => article.slug && article.published)
            .map((article: any) => ({
              url: `${this.config.baseUrl}/blog/${article.slug}`,
              lastModified: new Date(article.updatedAt || article.publishedAt || Date.now()),
              changeFrequency: 'monthly' as const,
              priority: 0.7,
            }))
            .filter(
              (route: any, index: number, self: any[]) =>
                index === self.findIndex((r: any) => r.url === route.url)
            );
        }
      } else {
        console.error(`Sitemap: Failed to fetch blog articles, status: ${blogResponse.status}`);
      }

      const allEntries = [...staticEntries, ...productEntries, ...blogEntries];

      return allEntries;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortSignal') {
        console.error('Sitemap: Product fetch timed out');
      } else {
        console.error('Sitemap: Error generating sitemap:', error);
      }
      return staticEntries;
    }
  }
}
