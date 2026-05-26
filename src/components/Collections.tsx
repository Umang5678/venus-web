"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
  {
    name: "CHANIYA CHOLI",
    image: "/images/c1.png",
    link: "/products?category=Chaniya Choli",
  },
  {
    name: "KURTI PAIR",
    image: "/images/c2.png",
    link: "/products?category=Kurti Pair",
  },
  {
    name: "GOWN SETS",
    image: "/images/c1.png", // Or c2.png if preferred
    link: "/products?category=Gown Sets",
  },
  {
    name: "FESTIVE COLLECTION",
    image: "/images/c2.png",
    link: "/products?occasion=FESTIVE COLLECTION",
  },
  {
    name: "NEW ARRIVALS",
    image: "/images/c1.png",
    link: "/products?occasion=NEW IN",
  },
  {
    name: "BEST SELLERS",
    image: "/images/c2.png",
    link: "/products?occasion=BEST SELLER",
  },
];

export default function Collections() {
  return (
    <section className="py-16 md:py-24 bg-ivory/30">
      {/* Title */}
      <div className="text-center mb-12 px-4">
        <h2 className="font-serif text-3xl md:text-4xl tracking-widest font-semibold text-primary mb-3">
          SHOP BY COLLECTION
        </h2>
        <div className="w-12 h-[1.5px] bg-gold mx-auto"></div>
        <p className="text-xs text-gray-500 font-medium tracking-[0.15em] mt-3 uppercase">
          Curated styles for every celebration
        </p>
      </div>

      {/* Categories Grid/Scroller */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {collections.map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="min-w-[260px] sm:min-w-[300px] md:min-w-[340px] flex-shrink-0 snap-start"
            >
              <Link
                href={c.link}
                className="relative block h-[380px] sm:h-[420px] rounded-lg overflow-hidden group border border-gray-100 shadow-sm"
              >
                {/* Image */}
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark shading overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                {/* Glassmorphic label pill at bottom */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 px-6 py-2.5 rounded-none text-white tracking-[0.2em] text-xs font-semibold whitespace-nowrap uppercase shadow-sm group-hover:bg-white group-hover:text-black transition-all duration-300">
                  {c.name}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
