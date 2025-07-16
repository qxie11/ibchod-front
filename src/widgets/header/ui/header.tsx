'use client';

import { Apple } from 'lucide-react';

import Link from 'next/link';

import { SearchDialog } from '@/features/search-products';
import Container from '@/shared/ui/container';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import { Title } from '@/shared/ui/title';
import { CartButton } from '@/widgets/cart-button';

export function Header() {
  return (
    <LiquidGlass as="header" className="sticky top-0 z-50 w-full border-b border-border/40">
      <Container className="flex py-4 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Apple className="h-6 w-6" />
          <Title variant="h1" className="text-xl font-semibold tracking-tight">
            iStore
          </Title>
        </Link>
        <div className="flex flex-1 items-center justify-end ml-2 space-x-2 md:space-x-4">
          <SearchDialog />
          <CartButton />
        </div>
      </Container>
    </LiquidGlass>
  );
}
