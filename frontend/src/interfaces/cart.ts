import { Product } from './product';

export interface CartItem extends Omit<Product, 'id'> {
  id: number;
  productId: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}