'use client';
import React, { createContext, useContext } from 'react';
import { useCart } from '@/hooks/useCart';
import { Cart, CartItem } from '@/interfaces/cart';
import { Product } from '@/interfaces/product';

export interface CartContextType {
  cart: Cart;
  items: CartItem[];
  total: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cartHook = useCart();

  const value: CartContextType = {
    ...cartHook,
    items: cartHook.cart.items,
    total: cartHook.cart.total
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};