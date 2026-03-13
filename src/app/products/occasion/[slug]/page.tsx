// "use client";

// import { useEffect, useState, use } from "react";
// import API from "../../../../lib/api";
// import ProductCard from "@/src/components/ProductCard";

// type Params = {
//   slug: string;
// };

// export default function OccasionProducts({
//   params,
// }: {
//   params: Promise<Params>;
// }) {
//   const { slug } = use(params); // now TypeScript knows slug exists

//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await API.get("/products", {
//           params: {
//             occasion: slug.replace(/-/g, " ").toUpperCase(),
//           },
//         });

//         setProducts(res.data.data || res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [slug]);

//   if (loading) {
//     return <div className="pt-28 text-center text-lg">Loading products...</div>;
//   }

//   return (
//     <div className="pt-28 max-w-7xl mx-auto px-4 bg-white">
//       <h1 className="text-2xl font-bold text-center mb-6 text-purple-600">
//         {slug.replace(/-/g, " ").toUpperCase()}
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
import API from "../../../../lib/api";
import ProductCard from "@/src/components/ProductCard";

type Params = {
  slug: string;
};

export default function OccasionProducts({ params }: { params: Params }) {
  const { slug } = params;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products", {
          params: {
            occasion: slug.replace(/-/g, " ").toUpperCase(),
          },
        });

        setProducts(res.data.data || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) {
    return <div className="pt-28 text-center text-lg">Loading products...</div>;
  }

  return (
    <div className="pt-28 max-w-7xl mx-auto px-4 bg-white">
      <h1 className="text-2xl font-bold text-center mb-6 text-purple-600">
        {slug.replace(/-/g, " ").toUpperCase()}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
