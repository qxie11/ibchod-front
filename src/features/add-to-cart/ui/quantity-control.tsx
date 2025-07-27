'use client';

import { Minus, Plus } from 'lucide-react';

import React from 'react';

import { updateQuantity } from '@/entities/cart/model/slice';
import { useCartItem } from '@/shared/lib/hooks';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button, ButtonSize } from '@/shared/ui/button';

interface QuantityControlProps {
  productId: number;
  size?: ButtonSize;
  className?: string;
}

export function QuantityControl({ productId, size, className }: QuantityControlProps) {
  const dispatch = useAppDispatch();
  const cartItem = useCartItem(productId);
  const quantity = cartItem?.quantity || 0;

  const handleUpdateQuantity = (newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  return (
    <div className={`flex items-center gap-2 justify-center ${className}`}>
      <Button
        size={size}
        className="px-3"
        variant="ghost"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleUpdateQuantity(quantity - 1);
        }}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="font-bold text-lg w-8 text-center">{quantity}</span>
      <Button
        size={size}
        className="px-3"
        variant="ghost"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleUpdateQuantity(quantity + 1);
        }}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
