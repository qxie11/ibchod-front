'use client';

import { Content } from '@prismicio/client';
import { ShoppingCart } from 'lucide-react';

import React, { HTMLAttributes } from 'react';

import { addToCart } from '@/entities/cart/model/slice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/button';

interface AddToCartButtonProps extends HTMLAttributes<HTMLButtonElement> {
  product: Content.PhoneDocument;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  children?: React.ReactNode;
}

export const AddToCartButton = ({
  product,
  className,
  size = 'medium',
  children,
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
      {children || <ShoppingCart size={17} />}
    </Button>
  );
};
