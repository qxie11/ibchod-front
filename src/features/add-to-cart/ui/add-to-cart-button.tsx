'use client';

import { HTMLAttributes } from 'react';

import { addToCart } from '@/entities/cart/model/slice';
import type { Product } from '@/entities/product';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/button';

interface AddToCartButtonProps extends HTMLAttributes<HTMLButtonElement> {
  product: Product;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const AddToCartButton = ({
  product,
  className,
  size = 'medium',
  ...rest
}: AddToCartButtonProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dispatch(addToCart(product));
  };

  return (
    <Button size={size} className={className} onClick={handleAddToCart} {...rest}>
      Add to Cart
    </Button>
  );
};
