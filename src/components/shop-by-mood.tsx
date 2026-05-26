"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const moods = [
  {
    title: "EVERYDAY EASE",
    subtitle: "Effortless casual styles",
    slug: "everyday-ease",
    image: "/images/herom.jpg",
  },
  {
    title: "WORK FLOW",
    subtitle: "Sharp, elegant formal coordinates",
    slug: "work-wear",
    image: "/images/c1.png",
  },
  {
    title: "SUMMER MOMENTS",
    subtitle: "Lighter fabrics for sunny days",
    slug: "summer-moments",
    image: "/images/c2.png",
  },
];

export default function ShopByMood() {
  return (
    <section className="bg-ivory/20 py-4 md:py-6 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl tracking-widest font-semibold text-primary mb-3">
            SHOP BY MOOD
          </h2>
          <div className="w-12 h-[1.5px] bg-gold mx-auto"></div>
          <p className="text-xs text-gray-500 font-medium tracking-[0.15em] mt-3 uppercase">
            Match your style to the occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {moods.map((mood) => (
            <motion.div
              key={mood.slug}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-lg overflow-hidden group border border-gray-100 shadow-sm"
            >
              <Link href={`/products?occasion=${mood.title}`} className="block relative w-full h-[450px] md:h-[500px]">
                {/* Image */}
                <Image
                  src={mood.image}
                  alt={mood.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient shading overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:via-black/20 transition-all duration-300" />

                {/* Badge Overlay */}
                <div className="absolute bottom-8 inset-x-4 flex justify-center">
                  <div className="w-full max-w-[280px] bg-black/30 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-none text-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <p className="font-serif text-sm font-semibold tracking-[0.15em] uppercase">
                      {mood.title}
                    </p>
                    <div className="w-8 h-[1px] bg-white/50 group-hover:bg-black/50 mx-auto my-2 transition-all"></div>
                    <p className="text-[10px] tracking-widest text-white/80 group-hover:text-black/80 font-medium uppercase">
                      {mood.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
