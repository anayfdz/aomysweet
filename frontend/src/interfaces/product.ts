export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
  featured: boolean;
  discount?: number;
  rating?: {
    average: number;
    count: number;
  };
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
