export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  featured: boolean;
  is_available: boolean;
  discount?: number;
  category_id: number;
  category: {
    id: number;
    name: string;
  };
  created_at?: string;
  updated_at?: string;
  quantity?: number;
}
