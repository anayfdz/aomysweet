'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ProductCard from './products/ProductCard';
import { Product } from '@/interfaces/product';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          ratings(*)
        `)
        .eq('featured', true)
        .limit(4);

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
      console.error('Error fetching featured products:', error);
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

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        No hay productos destacados disponibles
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
