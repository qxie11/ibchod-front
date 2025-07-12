'use client';

import { Button } from '@/shared/ui/button';
import { useAppDispatch } from '@/shared/lib/hooks';
import { addToCart } from '@/entities/cart/model/slice';
import type { Product } from '@/entities/product';

interface AddToCartButtonProps {
    product: Product;
    className?: string;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}

export const AddToCartButton = ({ product, className, size = "default" }: AddToCartButtonProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dispatch(addToCart(product));
  };

  return (
    <Button size={size || 'default'} className={className} onClick={handleAddToCart}>
      Přidat do košíku
    </Button>
  );
};
