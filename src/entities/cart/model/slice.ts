'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/shared/lib/store';
import type { Product, CartItem } from '@/entities/product/model/types';
import { toast } from '@/shared/hooks/use-toast';

interface CartState {
  items: CartItem[];
}

const getInitialState = (): CartState => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          return { items: parsedCart };
        }
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
        return { items: [] };
      }
    }
  }
  return { items: [] };
};

const initialState: CartState = getInitialState();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      toast({
        title: 'Přidáno do košíku',
        description: `${product.name} je nyní ve vašem košíku.`,
      });
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      toast({
        title: 'Odebráno z košíku',
        variant: 'destructive',
        description: `Položka byla odebrána z vašeho košíku.`,
      });
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== productId);
        toast({
          title: 'Odebráno z košíku',
          variant: 'destructive',
          description: `Položka byla odebrána z vašeho košíku.`,
        });
      } else {
        const item = state.items.find((item) => item.id === productId);
        if (item) {
          item.quantity = quantity;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
