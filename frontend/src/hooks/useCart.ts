import { useState, useEffect } from 'react';
import { Cart, CartItem } from '@/interfaces/cart';
import { Product } from '@/interfaces/product';

const CART_STORAGE_KEY = 'cart';

const initialCart: Cart = {
  items: [],
  total: 0
};

export const useCart = () => {
  const [cart, setCart] = useState<Cart>(initialCart);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.items.find(item => item.productId === product.id);

      let newItems: CartItem[];

      if (existingItem) {
        newItems = currentCart.items.map(item =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subtotal: (item.quantity + quantity) * item.price
              }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: Date.now(),
          category_id: product.category_id,
          productId: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image_url: product.image_url,
          is_available: product.is_available,
          category: product.category,
          featured: product.featured,
          quantity,
          subtotal: quantity * product.price
        };
        newItems = [...currentCart.items, newItem];
      }

      const total = newItems.reduce((sum, item) => sum + item.subtotal, 0);

      return {
        items: newItems,
        total
      };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(currentCart => {
      const newItems = currentCart.items.filter(item => item.productId !== productId);
      const total = newItems.reduce((sum, item) => sum + item.subtotal, 0);
      return {
        items: newItems,
        total
      };
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(currentCart => {
      const newItems = currentCart.items.map(item =>
        item.productId === productId
          ? {
              ...item,
              quantity,
              subtotal: quantity * item.price
            }
          : item
      );
      const total = newItems.reduce((sum, item) => sum + item.subtotal, 0);
      return {
        items: newItems,
        total
      };
    });
  };

  const clearCart = () => {
    setCart(initialCart);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
};