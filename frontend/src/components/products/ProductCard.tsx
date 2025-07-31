'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from "@/interfaces/product";
import { useCartContext } from '@/context/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const { addToCart } = useCartContext();
  const { id, name, price, description, image_url } = product;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success(`${name} agregado al carrito`);
    setQuantity(1);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const formattedPrice = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(price);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Imagen del producto */}
      <div className="relative aspect-square">
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-pink-50 transition-colors"
        >
          {showDetails ? '✕' : 'ℹ️'}
        </button>
      </div>

      {/* Información del producto */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <p className="text-pink-500 font-bold mt-1">{formattedPrice}</p>
        
        {/* Descripción expandible */}
        {showDetails && (
          <p className="text-gray-600 text-sm mt-2 mb-3">{description}</p>
        )}

        {/* Contador de cantidad */}
        <div className="flex items-center justify-center gap-3 my-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors"
          >
            -
          </button>
          <span className="font-medium w-8 text-center">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors"
          >
            +
          </button>
        </div>

        {/* Botones de acción */}
        <div className="space-y-2">
          <button
            onClick={handleAddToCart}
            className="w-full bg-pink-500 text-white py-2 rounded-full text-sm hover:bg-pink-600 transition-colors"
          >
            Agregar al Carrito
          </button>
          <Link
            href={`/products/${id}`}
            className="block w-full bg-pink-100 text-pink-500 py-2 rounded-full text-sm text-center hover:bg-pink-200 transition-colors"
          >
            Ver Detalles
          </Link>
          <button
            onClick={() => {
              handleAddToCart();
              window.location.href = '/checkout';
            }}
            className="w-full border border-pink-500 text-pink-500 py-2 rounded-full text-sm hover:bg-pink-50 transition-colors"
          >
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
