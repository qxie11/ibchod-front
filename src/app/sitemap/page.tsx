import type { Metadata } from 'next';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { GetProductsResponse } from '@/shared/lib/slices/productApi';
import Container from '@/shared/ui/container';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

export const metadata: Metadata = {
  title: 'Mapa stránek | IObchod',
  description:
    'Kompletní mapa stránek IObchod - najděte všechny produkty, kategorie a sekce našeho obchodu s repasovanými iPhony.',
  robots: {
    index: true,
    follow: true,
  },
};

export default async function SitemapPage() {
  try {
    // Fetch products for sitemap
    const productsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/smartphones?take=1000&skip=0`,
      {
        cache: 'no-store',
      }
    );

    if (!productsResponse.ok) {
      throw new Error('Failed to fetch products');
    }

    const productsData: GetProductsResponse = await productsResponse.json();
    const products = productsData.items || [];

    // Fetch blog articles
    const blogResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog?take=1000&skip=0`, {
      cache: 'no-store',
    });

    let blogArticles: any[] = [];
    if (blogResponse.ok) {
      const blogData = await blogResponse.json();
      blogArticles = blogData.items || [];
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://iobchod.shop';

    return (
      <>
        <Header />

        <Container className="py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <Title variant="h1" className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Mapa stránek
            </Title>

            <Text className="text-lg text-gray-600 mb-8">
              Kompletní přehled všech stránek na našem webu. Najděte snadno produkty, kategorie a
              další sekce.
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Main Pages */}
              <div className="space-y-4">
                <Title variant="h2" className="text-xl font-semibold text-gray-900 mb-4">
                  Hlavní stránky
                </Title>
                <div className="space-y-2">
                  <div>
                    <Link
                      href="/"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Domů
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/products"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Produkty
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/about"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      O nás
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/blog"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Blog
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/cart"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Košík
                    </Link>
                  </div>
                </div>
              </div>

              {/* Product Categories */}
              <div className="space-y-4">
                <Title variant="h2" className="text-xl font-semibold text-gray-900 mb-4">
                  Kategorie produktů
                </Title>
                <div className="space-y-2">
                  {products.length > 0 && (
                    <>
                      {Array.from(new Set(products.map((p) => p.name)))
                        .slice(0, 10)
                        .map((name) => (
                          <div key={name}>
                            <Link
                              href={`/products?model=${encodeURIComponent(name)}`}
                              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                            >
                              {name}
                            </Link>
                          </div>
                        ))}
                      {products.length > 10 && (
                        <div className="text-gray-500 text-sm">
                          ... a dalších {products.length - 10} modelů
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Individual Products */}
              <div className="space-y-4">
                <Title variant="h2" className="text-xl font-semibold text-gray-900 mb-4">
                  Produkty ({products.length})
                </Title>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {products.slice(0, 20).map((product) => (
                    <div key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors text-sm"
                      >
                        {product.name} {product.capacity}GB {product.color}
                      </Link>
                    </div>
                  ))}
                  {products.length > 20 && (
                    <div className="text-gray-500 text-sm">
                      ... a dalších {products.length - 20} produktů
                    </div>
                  )}
                </div>
              </div>

              {/* Blog Articles */}
              {blogArticles.length > 0 && (
                <div className="space-y-4">
                  <Title variant="h2" className="text-xl font-semibold text-gray-900 mb-4">
                    Blog články ({blogArticles.length})
                  </Title>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {blogArticles.slice(0, 15).map((article: any) => (
                      <div key={article.id}>
                        <Link
                          href={`/blog/${article.slug}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors text-sm"
                        >
                          {article.title}
                        </Link>
                      </div>
                    ))}
                    {blogArticles.length > 15 && (
                      <div className="text-gray-500 text-sm">
                        ... a dalších {blogArticles.length - 15} článků
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Legal Pages */}
              <div className="space-y-4">
                <Title variant="h2" className="text-xl font-semibold text-gray-900 mb-4">
                  Právní informace
                </Title>
                <div className="space-y-2">
                  <div>
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Obchodní podmínky
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Zásady ochrany osobních údajů
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/cookies"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Zásady cookies
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact & Support */}
              <div className="space-y-4">
                <Title variant="h2" className="text-xl font-semibold text-gray-900 mb-4">
                  Kontakt a podpora
                </Title>
                <div className="space-y-2">
                  <div>
                    <Link
                      href="/contact"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Kontakt
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/faq"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Často kladené otázky
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/shipping"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Doprava a platba
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/warranty"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Záruka
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* XML Sitemap Link */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <Title variant="h3" className="text-lg font-semibold mb-3">
                Pro vyhledávače
              </Title>
              <Text className="text-gray-600 mb-4">
                Pro lepší indexaci doporučujeme použít naši XML mapu stránek:
              </Text>
              <div>
                <Link
                  href="/sitemap.xml"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-mono text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {baseUrl}/sitemap.xml
                </Link>
              </div>
            </div>
          </div>
        </Container>

        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error loading sitemap:', error);
    notFound();
  }
}
