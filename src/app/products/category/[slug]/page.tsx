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
import Image from "next/image";
import { useEffect, useState } from "react";
import API from "./../../../../lib/api";
import ProductCard from "@/src/components/ProductCard";
import Link from "next/dist/client/link";

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
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  if (loading) {
    return (
      <div className="pt-28 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-sm overflow-hidden animate-pulse"
            >
              {/* Image */}
              <div className="bg-gray-200 w-full aspect-[3/4]"></div>

              {/* Content */}
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="pt-28 max-w-7xl mx-auto px-4 min-h-[70vh]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-purple-600 transition">
          Home
        </Link>

        <span>/</span>

        <span className="text-gray-800 font-medium">{title}</span>
      </div>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Image
            src="/images/no-items.png"
            alt="No products found"
            width={320}
            height={320}
            className="opacity-90"
          />

          <h2 className="text-xl font-semibold text-gray-700 mt-6">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            New styles will be available in this category soon.
          </p>

          <a
            href="/products"
            className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Browse All Products
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
