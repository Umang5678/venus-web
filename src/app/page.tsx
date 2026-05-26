// "use client";

// import { useEffect, useState } from "react";
// import API from "../lib/api";
// import ProductCard from "../components/ProductCard";
// import Hero from "./../components/Hero";
// import Collections from "../components/Collections";

// export default function Home() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     API.get("/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="">
//       {/* <Hero /> */}
//       <Collections />

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((p: any) => (
//           <ProductCard key={p._id} product={p} />
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API from "../lib/api";
import ProductCard from "../components/ProductCard";
import Hero from "./../components/Hero";
import Collections from "../components/Collections";
import ShopByMood from "../components/shop-by-mood";
import TrustFeatures from "../components/TrustFeatures";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        const productsData = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        setProducts(productsData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Banner Slideshow */}
      <Hero />

      {/* Categories / Collections Slider */}
      <Collections />

      {/* Brand Story Editorial Section */}


      {/* Trending Now Curated Products Grid */}
      {products.length > 0 && (
        <section className="py-2 md:py-4 bg-white max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl tracking-widest font-semibold text-primary mb-3">
              TRENDING NOW
            </h2>
            <div className="w-12 h-[1.5px] bg-gold mx-auto"></div>
            <p className="text-xs text-gray-500 font-medium tracking-[0.15em] mt-3 uppercase">
              Our most coveted styles, selected for you
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <button className="border border-primary bg-transparent text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold px-8 py-3.5 tracking-widest text-xs uppercase cursor-pointer">
                View All Styles
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* Shop By Mood Grid */}
      <ShopByMood />

      {/* Brand Trust Badges */}
      <TrustFeatures />
    </div>
  );
}
