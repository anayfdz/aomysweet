export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
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
  quantity?: number;
  createdAt?: string;
  updatedAt?: string;
}
