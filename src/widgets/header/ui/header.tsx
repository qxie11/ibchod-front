'use client';

import { Shield } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { SearchDialog } from '@/features/search-products';
import Logo from '@/shared/assets/icons/logo.svg';
import Container from '@/shared/ui/container';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import { CartButton } from '@/widgets/cart-button';

export function Header() {
  return (
    <LiquidGlass as="header" className="sticky top-0 z-50 w-full border-b border-border/40">
      <Container className="flex py-4 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} width={68} height={61} alt="IObchod" />
        </Link>
        <div className="flex flex-1 items-center justify-end ml-2 space-x-2 md:space-x-4">
          <Link href="/admin">
            <Shield className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            <span className="sr-only">Admin Panel</span>
          </Link>
          <SearchDialog />
          <CartButton />
        </div>
      </Container>
    </LiquidGlass>
  );
}
