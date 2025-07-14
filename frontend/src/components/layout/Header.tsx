import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-pink-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link rel="stylesheet" href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-pink-600">AomySweet</span>
            {/* <img className="h-8 w-8" src="/logo.svg" alt="Aomy Sweet Logo" /> */}
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-pink-600"
          >
            Home
          </Link>
          <Link
            href="/cupcakes"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-pink-600"
          >
            Cupcakes
          </Link>
          <Link
            href="/cakes"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-pink-600"
          >
            Cakes
          </Link>
          <Link
            href="/postres"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-pink-600"
          >
            Postres
          </Link>
        </div>
        <div className="flex flex-1 justify-end"></div>
        <div className="hidden sm:ml-6 sm:flex">
          <a
            href="/"
            className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            About
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <Link href="/cart" className="relative group">
            <ShoppingCartIcon className="h-6 w-6 text-gray-900 group-hover:text-pink-600" />
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              3
            </span>
          </Link>
        </div>
      </nav>
      <div className="bg-pink-400 p-2 text-center text-white">
        <p className="text-sm flex items-center justify-center gap-2">
          <span role="img" aria-label="oferta">
            ⚡
          </span>
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
