// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import API from "./../../lib/api";

// export default function ProductsPage() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await API.get("/products");
//         setProducts(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   if (loading) return <p className="text-center p-8">Loading...</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-12 pt-28">
//       {products.map((p) => (
//         <div
//           key={p._id}
//           className="border rounded-lg p-4 shadow hover:shadow-lg transition"
//         >
//           <Link href={`/products/${p._id}`}>
//             <Image
//               src={p.images?.[0]}
//               alt={p.name}
//               width={300}
//               height={300}
//               className="rounded mb-2 w-full h-64 object-cover"
//             />
//             <h2 className="text-lg font-semibold">{p.name}</h2>
//             <p className="text-blue-600 font-bold">₹{p.price}</p>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import API from "./../../lib/api";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products", {
          params: category ? { category } : {},
        });

        console.log("🟢 Products API response:", res.data);
        console.log("Products:", res.data);
        // ✅ Ensure it's always an array
        const productsData = res.data.data || res.data;

        const formattedProducts = (
          Array.isArray(productsData) ? productsData : []
        ).map((p) => ({
          ...p,
          images: Array.isArray(p.images) ? p.images.flat(Infinity) : [],
        }));
        setProducts(formattedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
        <p className="text-pink-600 text-xl font-semibold animate-pulse">
          Loading products...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 pt-28 pb-12">
      <h1 className="text-2xl font-bold mb-6 text-center text-pink-700">
        {category ? category.replace(/-/g, " ").toUpperCase() : "All PRODUCTS"}
      </h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ✅ Responsive Grid — 2x2 on mobile, 3x3 on tablet, 4x4 on large */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >
              <Link href={`/products/${p._id}`}>
                <Image
                  src={p.images?.[0] || "/placeholder.jpg"}
                  alt={p.name}
                  width={300}
                  height={300}
                  className="w-full h-56 sm:h-64 object-cover"
                />

                <div className="p-4 text-center">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                    {p.name}
                  </h2>
                  <p className="text-pink-600 font-bold mt-1">₹{p.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
