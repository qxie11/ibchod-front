'use client';

import { Apple } from 'lucide-react';

import Link from 'next/link';

import { SearchDialog } from '@/features/search-products';
import Container from '@/shared/ui/container';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import { CartButton } from '@/widgets/cart-button';

export function Header() {
  return (
    <LiquidGlass className="sticky top-0 z-50 w-full border-b border-border/40">
      <Container className="flex py-4 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Apple className="h-6 w-6" />
          <h1 className="text-xl font-semibold tracking-tight">iStore</h1>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <SearchDialog />
          <CartButton />
        </div>
      </Container>
    </LiquidGlass>
  );
}
