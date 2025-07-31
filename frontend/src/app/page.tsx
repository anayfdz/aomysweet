'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FeaturedProducts from '@/components/FeaturedProducts';
import { getProducts } from '@/services/products';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/interfaces/product';

const categories = [
  { id: 'all', name: 'Todos', emoji: '🍰' },
  { id: '1', name: 'Cupcakes', emoji: '🧁' },
  { id: '2', name: 'Tortas', emoji: '🎂' },
  { id: '3', name: 'Postres', emoji: '🍮' },
  { id: '4', name: 'Galletas', emoji: '🍪' }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(selectedCategory === 'all' 
        ? data 
        : data.filter(p => p.category.id.toString() === selectedCategory)
      );
    } catch (error) {
      console.error('Error loading products:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-pink-50/30">
      {/* Hero Section */}
      <section className="text-center py-8 px-4">
        <h1 className="text-3xl font-bold text-pink-500 mb-2">¡Endulza tu día con amor! 💝</h1>
        <p className="text-gray-600 text-sm mb-4">
          Postres artesanales hechos con cariño especialmente para ti
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/menu#featured"
            className="bg-pink-500 text-white px-6 py-2 rounded-full text-sm hover:bg-pink-600 transition-colors"
          >
            Comprar Ahora
          </Link>
          <Link 
            href="/menu"
            className="border border-pink-500 text-pink-500 px-6 py-2 rounded-full text-sm hover:bg-pink-50 transition-colors"
          >
            Ver Menú
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="p-4 mb-8">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-pink-500">💝 Nuestros Favoritos 💝</h2>
          <p className="text-gray-500 text-sm">Los más pedidos por nuestros clientes</p>
        </div>
        <FeaturedProducts />
      </section>

      {/* Categories and Products */}
      <section className="p-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-pink-500">🍰 Nuestro Catálogo 🍰</h2>
          <p className="text-gray-500 text-sm">Explora nuestras deliciosas categorías</p>
        </div>

        {/* Category Selector */}
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
              {category.emoji} {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No hay productos disponibles en esta categoría
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}