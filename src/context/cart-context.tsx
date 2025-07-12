'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import type { Product, CartItem } from '@/entities/product';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback(
    (product: Product) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevItems, { ...product, quantity: 1 }];
      });
      toast({
        title: 'Přidáno do košíku',
        description: `${product.name} je nyní ve vašem košíku.`,
      });
    },
    [toast]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
      toast({
        title: 'Odebráno z košíku',
        variant: 'destructive',
        description: `Položka byla odebrána z vašeho košíku.`,
      });
    },
    [toast]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setCartItems((prevItems) => {
        if (quantity <= 0) {
          toast({
            title: 'Odebráno z košíku',
            variant: 'destructive',
            description: `Položka byla odebrána z vašeho košíku.`,
          });
          return prevItems.filter((item) => item.id !== productId);
        }
        return prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );
      });
    },
    [toast]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
