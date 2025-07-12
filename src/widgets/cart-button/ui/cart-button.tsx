'use client';

import { ShoppingCart } from 'lucide-react';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { selectCartCount } from '@/entities/cart/model/slice';
import { useAppSelector } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';

export function CartButton() {
  const cartCount = useAppSelector(selectCartCount);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Button size="medium" className="relative">
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        <span className="sr-only">Otevřít košík</span>
        {isClient && cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-primary-foreground">
            {cartCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
