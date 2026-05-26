"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [occasionOpen, setOccasionOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen || cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen, cartOpen]);

  const categories = [
    { name: "CHANIYA CHOLI", slug: "chaniya-choli" },
    { name: "KURTI PAIR", slug: "kurti-pair" },
    { name: "GOWN SETS", slug: "gown-sets" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full overflow-x-hidden z-40 transition-all duration-300 ${
          pathname === "/"
            ? scrolled
              ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/50"
              : "bg-transparent"
            : "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/50"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* LEFT: Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`transition-colors p-1.5 rounded-full hover:bg-gray-150 ${
              pathname === "/" && !scrolled ? "text-white" : "text-black"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={24} />
          </button>

          {/* MIDDLE: Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/vflogo.png"
              alt="Venus Fashion"
              width={150}
              height={94}
              className={`h-8 md:h-10 w-auto transition duration-300 ${
                pathname === "/" && !scrolled ? "invert brightness-0" : ""
              }`}
              priority
            />
          </Link>

          {/* RIGHT: Actions (Cart) */}
          <div className="flex items-center gap-3">
            {/* Cart Icon Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 transition-colors rounded-full"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag
                className={`transition-colors ${
                  pathname === "/" && !scrolled ? "text-white" : "text-black"
                }`}
                size={22}
              />

              {totalItems > 0 && (
                <span
                  className={`absolute -top-1 -right-1 text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold tracking-tight shadow-sm transition
                    ${
                      pathname === "/" && !scrolled
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    }`}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* SIDEBAR NAVIGATION MENU */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
    w-[85vw] sm:w-[60vw] md:w-[24rem]`}
      >
        <div className="p-6 h-full flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="mb-8 text-black p-1 hover:bg-gray-50 rounded-full transition"
            >
              <X size={26} />
            </button>

            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
              className="flex flex-col gap-5 text-sm tracking-widest font-semibold text-gray-900"
            >
              {/* HOME */}
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gold transition border-b border-gray-50 pb-2"
              >
                HOME
              </Link>

              {/* PRODUCTS */}
              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gold transition border-b border-gray-50 pb-2"
              >
                PRODUCTS
              </Link>

              {/* NEW IN */}
              <Link
                href="/products?occasion=NEW IN"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gold transition border-b border-gray-50 pb-2"
              >
                NEW IN
              </Link>

              {/* BEST SELLER */}
              <Link
                href="/products?occasion=BEST SELLER"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gold transition border-b border-gray-50 pb-2"
              >
                BEST SELLER
              </Link>

              {/* SHOP BY CATEGORY Accordion */}
              <div className="border-b border-gray-50 pb-2">
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="flex justify-between items-center w-full hover:text-gold transition text-left"
                >
                  SHOP BY CATEGORY
                  <ChevronRight
                    className={`transition-transform duration-300 transform text-black ${
                      categoryOpen ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </button>
                {categoryOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="flex flex-col gap-3 ml-4 mt-3 text-xs text-gray-500 font-medium"
                  >
                    {categories.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/products?category=${item.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-black transition"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* SHOP BY OCCASION Accordion */}
              <div className="border-b border-gray-50 pb-2">
                <button
                  onClick={() => setOccasionOpen(!occasionOpen)}
                  className="flex justify-between items-center w-full hover:text-gold transition text-left"
                >
                  SHOP BY OCCASION
                  <ChevronRight
                    className={`transition-transform duration-300 transform text-black ${
                      occasionOpen ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </button>

                {occasionOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="flex flex-col gap-3 ml-4 mt-3 text-xs text-gray-500 font-medium"
                  >
                    {[
                      { name: "WORK WEAR", slug: "work-wear" },
                      { name: "SUMMER MOMENTS", slug: "summer-moments" },
                      { name: "EVERYDAY EASE", slug: "everyday-ease" },
                      { name: "COTTON DAYS", slug: "cotton-days" },
                      { name: "MEHENDI", slug: "mehendi" },
                      { name: "HALDI", slug: "haldi" },
                      { name: "SANGEET", slug: "sangeet" },
                      { name: "THE SHAADI EDIT", slug: "shaadi-edit" },
                      { name: "FESTIVE COLLECTION", slug: "festive-collection" },
                      { name: "GIFTING", slug: "gifting" },
                    ].map((item, i) => (
                      <Link
                        key={i}
                        href={`/products?occasion=${item.name}`}
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-black transition"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>

              <Link
                href="/my-orders"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gold transition border-b border-gray-50 pb-2"
              >
                TRACK YOUR ORDER
              </Link>

              <Link
                href="/contact-us"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gold transition border-b border-gray-50 pb-2"
              >
                CONTACT US
              </Link>
            </motion.nav>
          </div>

          <div className="pt-6 border-t border-gray-150">
            <p className="text-[10px] text-gray-400 font-semibold tracking-wider">
              VENUSFASHION BOUTIQUE
            </p>
            <p className="text-[9px] text-gray-300 mt-1">
              © {new Date().getFullYear()} VenusFashion. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* BACKDROP FOR SIDEBAR */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setMenuOpen(false)}
        />
      )}



      {/* Cart Slide-out Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
