import Link from 'next/link';
import FeaturedProducts from '@/components/FeaturedProducts';

export default function Home() {
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
      <section className="p-4">
        <div className="text-center mb-2">
          <h2 className="text-xl font-semibold text-pink-500">💝 Nuestros Favoritos 💝</h2>
          <p className="text-gray-500 text-sm">Los más pedidos por nuestros clientes</p>
        </div>
        <FeaturedProducts />
      </section>
    </div>
  );
}