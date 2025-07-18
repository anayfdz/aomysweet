import { useState, useEffect } from 'react';
import { Cart, CartItem } from '@/interfaces/cart';
import { Product } from '@/interfaces/product';

const CART_STORAGE_KEY = 'sweet_dreams_cart';

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.items.find(item => item.productId === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = currentCart.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity, subtotal: (item.quantity + quantity) * item.price }
            : item
        );
      } else {
        newItems = [...currentCart.items, {
          id: Date.now(),
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          subtotal: product.price * quantity
        }];
      }

      const total = newItems.reduce((sum, item) => sum + item.subtotal, 0);

      return { items: newItems, total };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(currentCart => {
      const newItems = currentCart.items.filter(item => item.productId !== productId);
      const total = newItems.reduce((sum, item) => sum + item.subtotal, 0);
      return { items: newItems, total };
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;

    setCart(currentCart => {
      const newItems = currentCart.items.map(item =>
        item.productId === productId
          ? { ...item, quantity, subtotal: quantity * item.price }
          : item
      );
      const total = newItems.reduce((sum, item) => sum + item.subtotal, 0);
      return { items: newItems, total };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
};