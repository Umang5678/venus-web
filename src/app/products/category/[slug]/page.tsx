// "use client";

// import { useEffect, useState, use } from "react";
// import API from "./../../../../lib/api";
// import ProductCard from "@/src/components/ProductCard";

// type Params = {
//   slug: string;
// };

// export default function CategoryProducts({
//   params,
// }: {
//   params: Promise<Params>;
// }) {
//   const { slug } = use(params);

//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // convert slug to DB value
//   const categoryName = slug
//     .replace(/-/g, " ")
//     .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize words

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await API.get("/products", {
//           params: { category: categoryName },
//         });

//         setProducts(res.data.data || res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryName]);

//   if (loading) return <p className="pt-28 text-center">Loading...</p>;

//   return (
//     <div className="pt-28 max-w-7xl mx-auto px-4">
//       <h1 className="text-2xl font-bold text-center mb-6 uppercase text-purple-600">
//         {categoryName}
//       </h1>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//         {products.map((p) => (
//           <ProductCard key={p._id} product={p} />
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import API from "./../../../../lib/api";
import ProductCard from "@/src/components/ProductCard";

type Params = {
  slug: string;
};

export default function CategoryProducts({ params }: { params: Params }) {
  const { slug } = params;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // convert slug to DB value
  const categoryName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products", {
          params: { category: categoryName },
        });

        setProducts(res.data.data || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) return <p className="pt-28 text-center">Loading...</p>;

  return (
    <div className="pt-28 max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-6 uppercase text-purple-600">
        {categoryName}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
