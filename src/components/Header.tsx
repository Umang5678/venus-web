"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [occasionOpen, setOccasionOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);
  const categories = [
    { name: "CHANIYA CHOLI", slug: "chaniya-choli" },
    { name: "KURTI PAIR", slug: "kurti-pair" },
    { name: "GOWN SETS", slug: "gown-sets" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full overflow-x-hidden z-50 transition-all duration-300 ${
          pathname === "/"
            ? scrolled
              ? "bg-white shadow-md"
              : "bg-transparent"
            : "bg-white shadow-md"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`${
              pathname === "/" && !scrolled ? "text-white" : "text-black"
            }`}
          >
            <Menu size={28} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/vflogo.png"
              alt="Venus Fashion"
              width={160}
              height={100}
              className={`h-8 md:h-10 w-auto transition ${
                pathname === "/" && !scrolled ? "invert brightness-0" : ""
              }`}
              priority
            />
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingBag
              className={` transition ${
                pathname === "/" && !scrolled ? "text-white" : "text-black"
              }`}
              size={26}
            />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* SIDEBAR MENU */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
    w-[80vw] sm:w-[60vw] md:w-[24rem]`}
      >
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="mb-8 text-black"
          >
            <X size={28} />
          </button>

          <motion.nav
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="flex flex-col gap-5 text-lg font-medium text-gray-800"
          >
            {/* HOME */}
            <Link href="/" onClick={() => setMenuOpen(false)}>
              HOME
            </Link>

            {/* PRODUCTS */}
            <Link href="/products" onClick={() => setMenuOpen(false)}>
              PRODUCTS
            </Link>

            {/* NEW IN */}
            <Link
              href="/products/occasion/new-in"
              onClick={() => setMenuOpen(false)}
            >
              NEW IN
            </Link>

            {/* BEST SELLER */}
            <Link
              href="/products/occasion/best-seller"
              onClick={() => setMenuOpen(false)}
            >
              BEST SELLER
            </Link>

            {/* SHOP BY CATEGORY */}
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex justify-between items-center"
            >
              SHOP BY CATEGORY
              <ChevronRight
                className={`transition-transform duration-300 transform  text-black ${
                  categoryOpen ? "rotate-90" : ""
                }`}
                size={18}
              />
            </button>
            {categoryOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="flex flex-col gap-3 ml-4 text-base"
              >
                {categories.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/products/category/${item.slug}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </motion.div>
            )}
            {/* SHOP BY OCCASION */}
            <button
              onClick={() => setOccasionOpen(!occasionOpen)}
              className="flex justify-between items-center"
            >
              SHOP BY OCCASION
              <ChevronRight
                className={`transition-transform duration-300 transform  text-black ${
                  occasionOpen ? "rotate-90" : ""
                }`}
                size={18}
              />
            </button>

            {occasionOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="flex flex-col gap-3 ml-4 text-base"
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
                    href={`/products/occasion/${item.slug}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </motion.div>
            )}
            <Link href="/my-orders" onClick={() => setMenuOpen(false)}>
              TRACK YOUR ORDER
            </Link>
          </motion.nav>
        </div>
      </div>

      {/* BACKDROP */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
