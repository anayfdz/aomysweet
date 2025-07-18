export interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    name: string;
    price: number;
    subtotal: number;
  }
  
  export interface Cart {
    items: CartItem[];
    total: number;
  }