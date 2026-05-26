"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import ProductCard from "./../../components/ProductCard";
import API from "./../../lib/api";
import { X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "CHANIYA CHOLI", value: "Chaniya Choli" },
  { name: "KURTI PAIR", value: "Kurti Pair" },
  { name: "GOWN SETS", value: "Gown Sets" },
];

const occasions = [
  { name: "NEW ARRIVALS", value: "NEW IN" },
  { name: "BEST SELLERS", value: "BEST SELLER" },
  { name: "FESTIVE COLLECTION", value: "FESTIVE COLLECTION" },
  { name: "WORK WEAR", value: "WORK WEAR" },
  { name: "SUMMER MOMENTS", value: "SUMMER MOMENTS" },
  { name: "EVERYDAY EASE", value: "EVERYDAY EASE" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const activeOccasion = searchParams.get("occasion");
  const activeSearch = searchParams.get("search");

  const pageParam = searchParams.get("page");
  const currentPage = parseInt(pageParam || "1") || 1;

  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/products?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const cacheKey = `products-v2-${activeCategory || "all"}-${activeOccasion || "none"}-${activeSearch || "none"}-page-${currentPage}`;

    let cached = null;
    if (typeof window !== "undefined") {
      cached = sessionStorage.getItem(cacheKey);
    }

    if (cached) {
      const parsed = JSON.parse(cached);
      setProducts(parsed.products || []);
      setTotalPages(parsed.totalPages || 1);
      setTotalProducts(parsed.totalProducts || 0);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await API.get("/products", {
          params: {
            ...(activeCategory && { category: activeCategory }),
            ...(activeOccasion && { occasion: activeOccasion }),
            ...(activeSearch && { search: activeSearch }),
            page: currentPage,
            limit: 8,
          },
        });

        console.log("➡️ FRONTEND FETCH: baseURL =", API.defaults.baseURL, "config params =", res.config.params);
        const responseData = res.data;
        console.log("➡️ FRONTEND FETCH: responseData =", responseData);
        const productsData = responseData.success && Array.isArray(responseData.data)
          ? responseData.data
          : (Array.isArray(responseData) ? responseData : []);

        let pageCount = 1;
        let totalCount = productsData.length;

        if (responseData.success && responseData.pagination) {
          pageCount = responseData.pagination.pages || 1;
          totalCount = responseData.pagination.total || 0;
        }

        setTotalPages(pageCount);
        setTotalProducts(totalCount);

        const formattedProducts = productsData.map((p: any) => ({
          ...p,
          images: Array.isArray(p.images) ? p.images.flat(Infinity) : [],
        }));

        setProducts(formattedProducts);

        if (typeof window !== "undefined") {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({
              products: formattedProducts,
              totalPages: pageCount,
              totalProducts: totalCount,
            })
          );
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
        setTotalPages(1);
        setTotalProducts(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, activeOccasion, activeSearch, currentPage]);

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("search");
    params.delete("page"); // Reset page when applying a new filter
    router.push(`/products?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/products");
  };

  const getPageTitle = () => {
    if (activeSearch) return `SEARCH RESULTS FOR "${activeSearch.toUpperCase()}"`;
    if (activeCategory) return activeCategory.toUpperCase();
    if (activeOccasion) return activeOccasion.toUpperCase();
    return "ALL STYLES";
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 font-sans text-gray-900">
      {/* Category Hero / Header */}
      <div className="bg-[#FAF9F6] border-b border-gray-100 py-10 md:py-16 text-center px-4">
        <h1 className="font-serif text-3xl md:text-5xl font-semibold tracking-widest text-primary uppercase leading-tight mb-4">
          {getPageTitle()}
        </h1>
        <div className="w-12 h-[1.5px] bg-gold mx-auto mb-4"></div>
        <p className="text-[11px] text-gray-400 font-semibold tracking-widest uppercase">
          Venus Fashion · Curated Luxury Boutique
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
            <div>
              <div className="flex items-center justify-between border-b border-gray-900 pb-3 mb-5">
                <span className="text-xs font-bold tracking-widest uppercase text-primary">Filters</span>
                {(activeCategory || activeOccasion || activeSearch) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[10px] text-gold hover:text-black font-semibold tracking-wider uppercase transition cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400">Collections</h3>
                  <div className="flex flex-col gap-2.5">
                    {categories.map((c) => {
                      const isActive = activeCategory === c.value;
                      return (
                        <button
                          key={c.value}
                          onClick={() => updateFilters("category", isActive ? null : c.value)}
                          className={`text-xs text-left tracking-wider transition font-medium flex items-center justify-between cursor-pointer ${
                            isActive ? "text-gold font-bold" : "text-gray-600 hover:text-black"
                          }`}
                        >
                          <span>{c.name}</span>
                          {isActive && <span className="text-[10px]">✕</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Occasion Filter */}
                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400">Occasion / Edits</h3>
                  <div className="flex flex-col gap-2.5">
                    {occasions.map((o) => {
                      const isActive = activeOccasion === o.value;
                      return (
                        <button
                          key={o.value}
                          onClick={() => updateFilters("occasion", isActive ? null : o.value)}
                          className={`text-xs text-left tracking-wider transition font-medium flex items-center justify-between cursor-pointer ${
                            isActive ? "text-gold font-bold" : "text-gray-600 hover:text-black"
                          }`}
                        >
                          <span>{o.name}</span>
                          {isActive && <span className="text-[10px]">✕</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* MOBILE FILTERS TOOLBAR */}
          <div className="lg:hidden flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary py-2 px-4 border border-gray-200 rounded-none cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
              {(activeCategory || activeOccasion || activeSearch) && (
                <span className="w-2 h-2 rounded-full bg-gold inline-block ml-1"></span>
              )}
            </button>

            <span className="text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
              {products.length} Products
            </span>
          </div>

          {/* MAIN PRODUCT CATALOG CONTAINER */}
          <div className="flex-1">
            {/* Active Filters Pill Row */}
            {(activeCategory || activeOccasion || activeSearch) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Active:</span>
                {activeSearch && (
                  <span className="bg-gray-50 border border-gray-200 text-xs px-3 py-1 font-semibold flex items-center gap-1.5 uppercase text-gray-800">
                    Search: "{activeSearch}"
                    <button onClick={() => updateFilters("search", null)}>✕</button>
                  </span>
                )}
                {activeCategory && (
                  <span className="bg-gray-50 border border-gray-200 text-xs px-3 py-1 font-semibold flex items-center gap-1.5 uppercase text-gray-800">
                    {activeCategory}
                    <button onClick={() => updateFilters("category", null)}>✕</button>
                  </span>
                )}
                {activeOccasion && (
                  <span className="bg-gray-50 border border-gray-200 text-xs px-3 py-1 font-semibold flex items-center gap-1.5 uppercase text-gray-800">
                    {activeOccasion}
                    <button onClick={() => updateFilters("occasion", null)}>✕</button>
                  </span>
                )}
              </div>
            )}

            {/* Catalog State Loader */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex flex-col space-y-3">
                    <div className="aspect-[3/4] bg-gray-150 shimmer rounded" />
                    <div className="h-4 bg-gray-150 shimmer w-3/4 rounded" />
                    <div className="h-3 bg-gray-150 shimmer w-1/4 rounded" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-full mb-6">
                  <SlidersHorizontal size={28} className="text-gray-300" />
                </div>
                <h2 className="font-serif text-xl font-medium text-gray-800">No Products Found</h2>
                <p className="text-xs text-gray-400 mt-2 max-w-sm leading-relaxed">
                  We couldn't find any products matching the selected criteria. Try adjusting your filters or search query.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 border border-primary bg-primary text-white text-xs tracking-widest px-6 py-3 font-semibold uppercase hover:bg-white hover:text-black transition cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>

                {/* PAGINATION CONTROLS */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-16 pt-8 border-t border-gray-100 font-sans">
                    {/* Previous Button */}
                    <button
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={`h-9 px-4 text-xs font-semibold tracking-wider uppercase border transition flex items-center justify-center cursor-pointer rounded-none
                        ${
                          currentPage === 1
                            ? "text-gray-300 border-gray-200 cursor-not-allowed"
                            : "text-gray-700 border-gray-200 hover:border-black hover:text-black"
                        }`}
                    >
                      Prev
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }, (_, idx) => {
                        const pageNum = idx + 1;
                        const isActive = pageNum === currentPage;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`h-9 w-9 text-xs font-semibold tracking-wider border transition flex items-center justify-center cursor-pointer rounded-none
                              ${
                                isActive
                                  ? "border-black bg-black text-white"
                                  : "border-gray-200 text-gray-600 hover:border-black hover:text-black"
                              }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={`h-9 px-4 text-xs font-semibold tracking-wider uppercase border transition flex items-center justify-center cursor-pointer rounded-none
                        ${
                          currentPage === totalPages
                            ? "text-gray-300 border-gray-200 cursor-not-allowed"
                            : "text-gray-700 border-gray-200 hover:border-black hover:text-black"
                        }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTERS SIDE PANEL DRAWER */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer lg:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed left-0 top-0 h-full w-[85vw] max-w-[320px] bg-white z-50 shadow-2xl flex flex-col font-sans text-gray-900 overflow-hidden lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-150">
                <span className="text-xs font-bold tracking-widest uppercase">Filters</span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded text-gray-500 hover:text-black"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Filters Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-8">
                {/* Category List */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400">Collections</h3>
                  <div className="flex flex-col gap-3">
                    {categories.map((c) => {
                      const isActive = activeCategory === c.value;
                      return (
                        <button
                          key={c.value}
                          onClick={() => {
                            updateFilters("category", isActive ? null : c.value);
                            setMobileFiltersOpen(false);
                          }}
                          className={`text-xs text-left tracking-wider font-semibold py-1.5 transition flex items-center justify-between cursor-pointer ${
                            isActive ? "text-gold" : "text-gray-700 hover:text-black"
                          }`}
                        >
                          <span>{c.name}</span>
                          {isActive && <span>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Occasion List */}
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400">Occasion / Edits</h3>
                  <div className="flex flex-col gap-3">
                    {occasions.map((o) => {
                      const isActive = activeOccasion === o.value;
                      return (
                        <button
                          key={o.value}
                          onClick={() => {
                            updateFilters("occasion", isActive ? null : o.value);
                            setMobileFiltersOpen(false);
                          }}
                          className={`text-xs text-left tracking-wider font-semibold py-1.5 transition flex items-center justify-between cursor-pointer ${
                            isActive ? "text-gold" : "text-gray-700 hover:text-black"
                          }`}
                        >
                          <span>{o.name}</span>
                          {isActive && <span>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="border-t border-gray-150 p-5 flex gap-3 bg-gray-50/50">
                <button
                  onClick={() => {
                    clearAllFilters();
                    setMobileFiltersOpen(false);
                  }}
                  className="flex-1 border border-gray-300 py-3 text-xs tracking-widest font-semibold uppercase hover:bg-gray-100 transition cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 bg-primary text-white py-3 text-xs tracking-widest font-semibold uppercase hover:bg-primary/95 transition cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
