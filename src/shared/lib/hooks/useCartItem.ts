'use client';

import { useMemo } from 'react';

import { selectCartItems } from '@/entities/cart';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';

export function useCartItem(productId: number) {
  const cartItems = useAppSelector(selectCartItems);

  const cartItem = useMemo(
    () => cartItems.find((item) => item.id === productId),
    [cartItems, productId]
  );

  return cartItem;
}
