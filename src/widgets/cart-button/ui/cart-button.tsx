'use client';

import { ShoppingCart } from 'lucide-react';

import Link from 'next/link';

import { selectCartCount } from '@/entities/cart/model/slice';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { useIsClient } from '@/shared/lib/hooks/useIsClient';
import { Button } from '@/shared/ui/button';

export function CartButton() {
  const cartCount = useAppSelector(selectCartCount);
  const isClient = useIsClient();

  return (
    <Button size="medium" className="relative py-3 px-3 md:py-3 md:px-4">
      <Link className="absolute inset-0" href="/cart"></Link>
      <ShoppingCart className="h-5 w-5" />
      <span className="sr-only">Otevřít košík</span>
      {isClient && cartCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-primary-foreground">
          {cartCount}
        </span>
      )}
    </Button>
  );
}
