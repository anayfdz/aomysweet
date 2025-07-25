import React from 'react';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/interfaces/product';
import FeaturedProducts from '@/components/FeaturedProducts';

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Cupcakes Unicornio',
    description: 'Deliciosos cupcakes decorados con motivos de unicornio',
    price: 15000,
    category: {
      id: 1,
      name: 'Cupcakes'
    },
    featured: true,
    discount: 0,
    rating: {
      average: 5,
      count: 127
    }
  },
  {
    id: 2,
    name: 'Cake Princess',
    description: 'Pastel decorado con temática de princesas',
    price: 45000,
    category: {
      id: 2,
      name: 'Cakes'
    },
    featured: true,
    discount: 0,
    rating: {
      average: 4.5,
      count: 89
    }
  },
  {
    id: 3,
    name: 'Mastrons Rové',
    description: 'Postre especial de la casa',
    price: 25000,
    category: {
      id: 3,
      name: 'Postres'
    },
    featured: true,
    discount: 0,
    rating: {
      average: 4.8,
      count: 45
    }
  }
];

export default function Home() {
  const handleAddToCart = (productId: number) => {
    console.log('Agregar al carrito:', productId);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-pink-600">¡Endulza tu día con amor! 💝</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Postres artesanales hechos con cariño especialmente para ti.
          Cada bocado es una experiencia mágica ✨
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700">
            Comprar Ahora
          </button>
          <button className="border border-pink-600 text-pink-600 px-6 py-2 rounded-full hover:bg-pink-50">
            Ver Menú
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl text-pink-800 font-semibold text-center mb-8">💖 Nuestros Favoritos 💖 </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <FeaturedProducts products={featuredProducts} />
        </div>
      </section>
    </div>
  );
}