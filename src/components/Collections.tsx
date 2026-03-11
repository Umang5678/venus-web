"use client";
import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    name: "CO-ORDS",
    image: "/images/c1.png",
    link: "/products?category=Co-ords",
  },
  {
    name: "TOP & TUNICS",
    image: "/images/c2.png",
    link: "/products?category=Top Tunics",
  },
  {
    name: "KURTAS",
    image: "/images/c2.png",
    link: "/products?category=Kurtas",
  },
  {
    name: "SUIT SETS",
    image: "/images/c1.png",
    link: "/products?category=Suit Sets",
  },
  {
    name: "KURTA SETS",
    image: "/images/c1.png",
    link: "/products?category=Kurta Sets",
  },
  {
    name: "KURTAA",
    image: "/images/c2.png",
    link: "/products?category=Kurtaa",
  },
];

export default function Collections() {
  // Split categories into groups of 4
  const slides = [];
  for (let i = 0; i < collections.length; i += 4) {
    slides.push(collections.slice(i, i + 4));
  }

  return (
    <section className="py-8 bg-gray-50">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-center text-xl md:text-2xl tracking-widest font-medium mb-10">
          SHOP BY CATEGORY
        </h2>
      </div>

      {/* Mobile Slider */}
      <div className="flex overflow-x-auto gap-12 px-12 md:hidden">
        {slides.map((group, i) => (
          <div key={i} className="grid grid-cols-2 gap-4 min-w-full">
            {group.map((c, j) => (
              <Link
                key={j}
                href={c.link}
                className="relative h-[160px] rounded-xl overflow-hidden shadow-sm"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 
bg-white/30 backdrop-blur-md px-4 py-1 rounded-full 
text-white tracking-widest text-[10px] font-semibold 
whitespace-nowrap"
                >
                  {c.name}
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Desktop Slider */}
      <div className="hidden md:flex gap-6 overflow-x-auto px-6 max-w-7xl mx-auto scrollbar-hide">
        {collections.map((c, i) => (
          <Link
            key={i}
            href={c.link}
            className="
        relative
        min-w-[220px]
        h-[320px]
        rounded-xl
        overflow-hidden
        shadow-sm
        flex-shrink-0
      "
          >
            <Image src={c.image} alt={c.name} fill className="object-cover" />

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/30 backdrop-blur-md px-4 py-1 rounded-full text-white tracking-widest text-xs font-semibold whitespace-nowrap">
              {c.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
