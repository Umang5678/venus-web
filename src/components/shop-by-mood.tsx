"use client";

import Image from "next/image";
import Link from "next/link";

const moods = [
  {
    title: "EVERYDAY",
    subtitle: "EASE",
    slug: "everyday-ease",
    image: "/images/herom.jpg",
  },
  {
    title: "WORK",
    subtitle: "FLOW",
    slug: "work-wear",
    image: "/images/c1.png",
  },
  {
    title: "SUMMER",
    subtitle: "WARE",
    slug: "summer-moments",
    image: "/images/c2.png",
  },
];

export default function ShopByMood() {
  return (
    <section className="bg-gray-100 py-8 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-xl md:text-2xl tracking-widest font-medium mb-10">
          SHOP BY MOOD
        </h2>

        <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible scrollbar-hide">
          {moods.map((mood) => (
            <Link
              key={mood.slug}
              href={`/products/occasion/${mood.slug}`}
              className="relative rounded-2xl overflow-hidden group min-w-[260px] md:min-w-0"
            >
              <div className="relative w-full h-[500px]">
                <Image
                  src={mood.image}
                  alt={mood.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <div className="bg-white/40 backdrop-blur-md border border-white/40 text-white px-6 py-2 rounded-lg text-center">
                  <p className="font-semibold tracking-widest text-sm">
                    {mood.title}
                  </p>
                  <p className="text-xs tracking-widest opacity-80">
                    · {mood.subtitle} ·
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
