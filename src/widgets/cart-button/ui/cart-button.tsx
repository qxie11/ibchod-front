'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectCartCount } from '@/entities/cart/model/slice';
import Link from 'next/link';

export function CartButton() {
  const cartCount = useAppSelector(selectCartCount);

  return (
    <Button variant="outline" size="icon" className="relative" asChild>
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        <span className="sr-only">Otevřít košík</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {cartCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
