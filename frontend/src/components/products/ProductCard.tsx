import React from 'react';
import { Product } from "@/interfaces/product";
import { useCartContext } from '@/context/CartContext';
import toast from 'react-hot-toast';
interface ProductCardProps {
  product: Product;
  //onAddToCart: (productId: number) => void;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartContext();
  const { name, price, description, rating } = product;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${name} agregado al carrito`);
  };

  const renderStars = (rating?: { average: number; count: number }) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-2 text-yellow-400 text-sm">
        {"⭐".repeat(Math.round(rating.average))}
        <span className="text-gray-500">({rating.count} reseñas)</span>
      </div>
    );
  };

  const formattedPrice = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(price);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-pink-100 rounded-lg mb-4"></div>
      <h3 className="font-semibold text-gray-900">{name}</h3>
      {renderStars(rating)}
      <p className="text-pink-600 font-bold mt-2">{formattedPrice}</p>
      <button
        onClick={handleAddToCart}
        className="w-full bg-pink-600 text-white mt-4 py-2 rounded-full hover:bg-pink-700 transition-colors"
      >
        Agregar
      </button>
    </div>
  );
};

export default ProductCard;
