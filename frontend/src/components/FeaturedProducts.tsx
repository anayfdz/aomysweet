'use client';

import React from 'react';
import ProductCard from './products/ProductCard';
import { Product } from '@/interfaces/product';

interface Props {
  products: Product[];
}

export default function FeaturedProducts({ products }: Props) {
  const handleAddToCart = (productId: number) => {
    console.log('Agregar al carrito:', productId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
