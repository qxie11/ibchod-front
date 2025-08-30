'use client';

import { ArrowLeft, Home, Search, Smartphone } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { useGetProductsQuery } from '@/shared/lib/slices/productApi';
import { Button } from '@/shared/ui/button';
import Container from '@/shared/ui/container';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

export default function NotFound() {
  const { data: productsData } = useGetProductsQuery({
    take: 6,
    active: true,
  });

  const popularProducts = productsData?.items?.slice(0, 6) || [];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Container className="flex flex-col items-center justify-center min-h-screen py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          {/* 404 Number */}
          <div className="relative mb-8">
            <div className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              404
            </div>
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-gray-100 -z-10 blur-sm">
              404
            </div>
          </div>

          {/* Main Title */}
          <Title className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Stránka nebyla nalezena
          </Title>

          {/* Description */}
          <Text className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Omlouváme se, ale stránka kterou hledáte neexistuje nebo byla přesunuta. Možná jste
            zadali špatnou adresu nebo se stránka přesunula.
          </Text>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              href="/"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Zpět na hlavní stránku
            </Button>

            <Button
              href="/products"
              variant="outline"
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-200 group"
            >
              <Smartphone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Prohlédnout produkty
            </Button>
          </div>

          {/* Search Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Search className="w-6 h-6 text-gray-400 mr-2" />
              <Text className="text-lg font-semibold text-gray-700">Hledáte něco konkrétního?</Text>
            </div>

            {popularProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200 hover:border-blue-300"
                  >
                    <div className="text-center">
                      <div className="relative w-16 h-16 mx-auto mb-3">
                        <Image
                          src={product.gallery?.[0] || '/placeholder-phone.png'}
                          alt={product.name || 'Smartphone'}
                          fill
                          className="object-cover rounded-lg group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <Text className="font-semibold text-blue-800 text-sm mb-1">
                        {product.name}
                      </Text>
                      <Text className="text-blue-600 text-xs">
                        {product.capacity}GB • {product.color}
                      </Text>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/products?name=iPhone"
                  className="group p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200 hover:border-blue-300"
                >
                  <div className="text-center">
                    <Smartphone className="w-8 h-8 mx-auto mb-2 text-blue-600 group-hover:scale-110 transition-transform" />
                    <Text className="font-semibold text-blue-800">iPhone</Text>
                  </div>
                </Link>

                <Link
                  href="/products?name=Samsung"
                  className="group p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 border border-purple-200 hover:border-purple-300"
                >
                  <div className="text-center">
                    <Smartphone className="w-8 h-8 mx-auto mb-2 text-purple-600 group-hover:scale-110 transition-transform" />
                    <Text className="font-semibold text-purple-800">Samsung</Text>
                  </div>
                </Link>

                <Link
                  href="/products?name=Xiaomi"
                  className="group p-4 rounded-xl bg-gradient-to-r from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 transition-all duration-200 border border-pink-200 hover:border-pink-300"
                >
                  <div className="text-center">
                    <Smartphone className="w-8 h-8 mx-auto mb-2 text-pink-600 group-hover:scale-110 transition-transform" />
                    <Text className="font-semibold text-pink-800">Xiaomi</Text>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="mt-12">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.history.back()}
              className="text-gray-500 hover:text-gray-700 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Zpět na předchozí stránku
            </Button>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-20 blur-2xl animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>
      </Container>
    </div>
  );
}
