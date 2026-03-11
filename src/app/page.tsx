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
import API from "../lib/api";
import ProductCard from "../components/ProductCard";
import Hero from "./../components/Hero";
import Collections from "../components/Collections";

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
    <div className="min-h-screen bg-white">
      {/* Collections Section */}
      <Hero />
      <Collections />

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 py-1">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((p: any) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
