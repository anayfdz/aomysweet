'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ProductCard from './ProductCard';
import { Product } from '@/interfaces/product';

interface ProductListProps {
  category?: string;
}

export default function ProductList({ category = 'all' }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          ratings(*)
        `);

      if (category !== 'all') {
        query = query.eq('category.id', category);
      }

      const { data, error } = await query;

      if (error) throw error;

      const productsWithRating = data.map(product => {
        const ratings = product.ratings || [];
        const averageRating = ratings.length > 0
          ? ratings.reduce((acc: number, curr: { rating: number }) => acc + curr.rating, 0) / ratings.length
          : 0;

        return {
          ...product,
          rating: {
            average: averageRating,
            count: ratings.length
          }
        };
      });

      setProducts(productsWithRating);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
