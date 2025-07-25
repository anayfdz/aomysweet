'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/interfaces/product';
import { useCartContext } from '@/context/CartContext';
import toast from 'react-hot-toast';

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: PageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) throw new Error('Producto no encontrado');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Error al cargar el producto');
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity });
    toast.success(`${product.name} agregado al carrito`);
    setQuantity(1);
  };

  if (!product) {
    return <div className="container mx-auto p-6">Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-pink-600 text-2xl font-bold mt-4">
            {new Intl.NumberFormat("es-CL", {
              style: "currency",
              currency: "CLP",
            }).format(product.price)}
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Descripción</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200"
            >
              -
            </button>
            <span className="font-medium text-xl">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200"
            >
              +
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              className="w-full bg-pink-600 text-white py-3 rounded-full hover:bg-pink-700 transition-colors text-lg"
            >
              Agregar al Carrito
            </button>

            <Link
              href="/menu"
              className="w-full bg-white text-pink-600 border border-pink-600 py-3 rounded-full text-center hover:bg-pink-50 transition-colors text-lg"
            >
              Volver al Menú
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 