'use client';

import { Apple } from 'lucide-react';
import { CartButton } from '@/widgets/cart-button';
import { SearchDialog } from '@/features/search-products';
import Link from 'next/link';
import { LiquidGlass } from '@/shared/ui/liquid-glass';

export function Header() {
  return (
    <LiquidGlass
      as="header"
      className="sticky top-0 z-50 w-full border-b border-border/40"
    >
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Apple className="h-6 w-6" />
          <h1 className="text-xl font-semibold tracking-tight">iObchod</h1>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <SearchDialog />
          <CartButton />
        </div>
      </div>
    </LiquidGlass>
  );
}
