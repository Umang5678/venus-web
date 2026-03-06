"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
  {
    name: "Chaniya Choli",
    image: "/images/2.png",
    link: "/products?category=Chaniya Choli",
  },
  {
    name: "Kurti Pair",
    image: "/images/3.png",
    link: "/products?category=Kurti Pair",
  },
  {
    name: "gown Sets",
    image: "/images/4.png",
    link: "/products?category=Gown Sets",
  },
];

export default function Collections() {
  return (
    <section className="py-18 bg-white relative z-10 ">
      <div
        className="
          flex gap-5 px-4 sm:px-6
          overflow-x-auto sm:flex-wrap sm:justify-center
          scroll-smooth scrollbar-hide pt-4
        "
      >
        {collections.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex-shrink-0 flex flex-col items-center text-center cursor-pointer"
          >
            <Link href={c.link}>
              <div className="w-20 h-20 sm:w-28 sm:h-28 border-2 border-pink-300 rounded-full overflow-hidden flex items-center justify-center shadow-md hover:border-pink-500 transition">
                <Image
                  src={c.image}
                  alt={c.name}
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-pink-600 whitespace-nowrap">
                {c.name}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
