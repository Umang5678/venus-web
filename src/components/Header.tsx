"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-pink-600 tracking-wide"
        >
          Venus Fashion
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-pink-600 transition">
            Home
          </Link>

          <Link href="/products" className="hover:text-pink-600 transition">
            Products
          </Link>

          <Link href="/my-orders">My Orders</Link>
          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart
              className="text-pink-600 hover:text-pink-700 transition"
              size={26}
            />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-pink-600 focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <nav className="flex flex-col px-6 py-4 space-y-3 text-gray-700 font-medium">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link href="/products" onClick={() => setMenuOpen(false)}>
              Products
            </Link>

            <Link href="/my-orders">My Orders</Link>

            <Link href="/cart" onClick={() => setMenuOpen(false)}>
              🛒 Cart ({totalItems})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
