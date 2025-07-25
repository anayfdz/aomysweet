'use client';

import { useState } from 'react';
import ProductList from '@/components/products/ProductList';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'cupcakes', name: 'Cupcakes' },
    { id: 'cakes', name: 'Tortas' },
    { id: 'postres', name: 'Postres' },
    { id: 'galletas', name: 'Galletas' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-500 text-center mb-8">
        Nuestro Menú 🍰
      </h1>

      {/* Categorías */}
      <div className="flex justify-center gap-4 mb-8 overflow-x-auto pb-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
              ${selectedCategory === category.id
                ? 'bg-pink-500 text-white'
                : 'bg-pink-100 text-pink-500 hover:bg-pink-200'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Lista de Productos */}
      <ProductList category={selectedCategory} />
    </div>
  );
} 