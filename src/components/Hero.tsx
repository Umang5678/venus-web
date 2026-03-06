"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  { image: "/images/hero1.jpg", text: "Elegant Lehengas for Every Occasion" },
  { image: "/images/hero2.jpg", text: "Graceful Sarees, Crafted with Love" },
  { image: "/images/hero3.jpg", text: "Trendy Gowns for Modern Queens" },
  { image: "/images/hero4.jpg", text: "Beautiful Chaniya Cholis to Shine" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text + Button */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {slides[current].text}
        </h1>
        <Link
          href="/products"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
