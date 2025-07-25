'use client';
import { useState } from 'react';
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, total } = useCartContext();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const formattedTotal = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(total);

  return (
    <header className="bg-pink-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-pink-600">AomySweet</span>
            {/* <img className="h-8 w-8" src="/logo.svg" alt="Aomy Sweet Logo" /> */}
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-pink-600"
          >
            Inicio
          </Link>
          <Link
            href="/cupcakes"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-pink-600"
          >
            Cuchareables
          </Link>
          <Link
            href="/cakes"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-pink-600"
          >
            Brownies
          </Link>
          <Link
            href="/postres"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-pink-600"
          >
            Desayunos
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-pink-100"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCartIcon className="h-6 w-6 text-gray-900" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </motion.button>

            <AnimatePresence>
              {isCartOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50"
                >
                  <div className="p-4">
                    <h3 className="font-medium mb-4">🛒 Tu Carrito Mágico</h3>
                    {items.length === 0 ? (
                      <p className="text-gray-500 text-sm text-center py-4">
                        Tu carrito está vacío
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {items.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex justify-between items-center text-sm"
                          >
                            <span>{item.quantity}x {item.name}</span>
                            <span className="text-pink-500 font-medium">
                              {new Intl.NumberFormat("es-CL", {
                                style: "currency",
                                currency: "CLP",
                              }).format(item.price * item.quantity)}
                            </span>
                          </motion.div>
                        ))}

                        {total >= 50000 && (
                          <div className="text-xs text-green-600 bg-green-50 p-2 rounded-lg">
                            ✨ ¡Descuento aplicado!
                            <br />
                            20% OFF en compra superior a s/100
                          </div>
                        )}

                        <div className="pt-3 border-t mt-3">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm">Total:</span>
                            <span className="text-pink-500 font-bold">{formattedTotal}</span>
                          </div>
                          <Link href="/checkout">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full bg-pink-500 text-white py-2 rounded-full text-sm hover:bg-pink-600 transition-colors"
                            >
                              Pagar Ahora - ¡Es súper fácil!
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
      <div className="bg-pink-400 p-2 text-center text-white">
        <p className="text-sm flex items-center justify-center gap-2">
          <span role="img" aria-label="oferta">⚡</span>
          ¡OFERTA ESPECIAL! 20% OFF en pedidos superiores a $50.000
          <button className="ml-2 text-xs bg-white text-pink-600 px-2 py-1 rounded-full hover:bg-pink-100">
            ¡Aprovechar!
          </button>
        </p>
      </div>
    </header>
  );
};

export default Header;
