'use client';

import { ShoppingCart, Star } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { SearchDialog } from '@/features/search-products';
import Logo from '@/shared/assets/icons/logo.svg';
import { Button } from '@/shared/ui/button';
import Container from '@/shared/ui/container';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import { CartButton } from '@/widgets/cart-button';

export function Header() {
  return (
    <LiquidGlass as="header" className="sticky top-0 z-50 w-full border-b">
      <Container className="flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src={Logo}
            width={68}
            height={61}
            alt="IObchod"
            className="transition-transform group-hover:scale-105"
          />
          <div className="hidden sm:block">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">4.8/5</span>
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/products"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Produkty
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            O nás
          </Link>
          <Link
            href="/blog"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Blog
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          {/* WhatsApp link */}
          <div className="hidden lg:flex items-center gap-2 text-sm">
            <a
              href="https://wa.me/420722179379"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              <span>+420 722 179 379</span>
            </a>
          </div>

          {/* Search */}
          <div className="relative">
            <SearchDialog />
          </div>

          {/* Cart with badge */}
          <CartButton />

          {/* CTA Button */}
          <Button
            href="/products"
            size="sm"
            className="hidden sm:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Nakupovat
          </Button>
        </div>
      </Container>

      {/* Promo banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-2">
        <Container>
          <div className="flex items-center justify-center text-sm font-medium">
            <span className="animate-pulse mr-2">🔥</span>
            Omezená nabídka: Repasované iPhony se slevou až 60% | Doručení do 24h
            <span className="animate-pulse ml-2">🔥</span>
          </div>
        </Container>
      </div>
    </LiquidGlass>
  );
}
