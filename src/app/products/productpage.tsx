"use client";
import { useEffect, useState } from "react";
import API from "./../../lib/api";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/src/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const occasion = searchParams.get("occasion");

  useEffect(() => {
    const cacheKey = `products-${category || "all"}-${occasion || "none"}`;

    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      setProducts(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await API.get("/products", {
          params: {
            ...(category && { category }),
            ...(occasion && { occasion }),
          },
        });

        const productsData = res.data.data || res.data;

        const formattedProducts = (
          Array.isArray(productsData) ? productsData : []
        ).map((p) => ({
          ...p,
          images: Array.isArray(p.images) ? p.images.flat(Infinity) : [],
        }));

        setProducts(formattedProducts);

        // save to cache
        sessionStorage.setItem(cacheKey, JSON.stringify(formattedProducts));
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, occasion]);
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
        {category
          ? category.replace(/-/g, " ").toUpperCase()
          : occasion
            ? occasion.replace(/-/g, " ").toUpperCase()
            : "All PRODUCTS"}
      </h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ✅ Responsive Grid — 2x2 on mobile, 3x3 on tablet, 4x4 on large */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xs shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
