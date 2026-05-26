"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { getCachedProduct, setCachedProduct } from "@/src/lib/productCache";
import ProductCard from "@/src/components/ProductCard";
import SizeGuide from "@/src/components/SizeGuide";
import "swiper/css";
import { useRef } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  ShieldCheck,
  ChevronRight,
  Heart,
  Share2,
  X,
} from "lucide-react";
import API from "./../../../lib/api";
import { useCart } from "./../../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

type Product = {
  _id: string;
  name: string;
  price: number;
  category?: string;
  occasion?: string;
};

export default function ProductDetailsClient() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const { addToCart } = useCart();
  const swiperRef = useRef<any>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  // Fit Advisor states
  const [showFitAdvisor, setShowFitAdvisor] = useState(false);
  const [fitHeight, setFitHeight] = useState("");
  const [fitWeight, setFitWeight] = useState("");
  const [suggestedSize, setSuggestedSize] = useState("");

  const handleFitCalculate = (e: React.MouseEvent) => {
    e.preventDefault();
    const w = parseFloat(fitWeight);
    if (!w || isNaN(w)) return;

    let size = "M";
    if (w < 50) size = "XS";
    else if (w >= 50 && w < 60) size = "S";
    else if (w >= 60 && w < 70) size = "M";
    else if (w >= 70 && w < 80) size = "L";
    else size = "XL";

    setSuggestedSize(size);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };
  useEffect(() => {
    if (!id) return;

    const cached = getCachedProduct(id as string);

    // ✅ If product already prefetched
    if (cached) {
      setProduct(cached);
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);

        const productData = {
          ...res.data,
          images: Array.isArray(res.data.images)
            ? res.data.images.flat(Infinity)
            : [],
          size: Array.isArray(res.data.size)
            ? res.data.size.flat(Infinity)
            : [],
        };

        setProduct(productData);

        // ✅ Save to cache
        setCachedProduct(id as string, productData);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // ✅ If product has size options, ensure user selects one
    if (product.size && product.size.length > 0 && !selectedSize) {
      setErrorMsg("Please select a size to continue.");
      return;
    }
    setErrorMsg(null);

    // Double check stock
    if (selectedSize) {
      const selSizeObj = product.size.find((s: any) => {
        const label = typeof s === "string" ? s : (s.size || s.label || "");
        return label.toUpperCase() === selectedSize.toUpperCase();
      });
      const stock = typeof selSizeObj === "string" ? 10 : (typeof selSizeObj?.stock === "number" ? selSizeObj.stock : 10);
      if (stock <= 0) {
        setErrorMsg("This size is out of stock.");
        return;
      }
    }

    addToCart({
      _id: product._id,
      name: product.name,
      price: product.finalPrice,
      image: product.images?.[0],
      quantity: 1,
      size: selectedSize || "Default",
    });
  };

  const handleSizeSelect = (sizeLabel: string) => {
    setSelectedSize((prev) => (prev === sizeLabel ? null : sizeLabel));
    setErrorMsg(null);
  };

  useEffect(() => {
    if (!product) return;

    const fetchRelated = async () => {
      try {
        const res = await API.get("/products");
        const data = res.data.data || res.data;

        const products = Array.isArray(data) ? data : [];

        const related = products
          .filter((p: Product) => String(p._id) !== String(product._id))
          .filter((p: Product) => {
            const sameCategory = p.category === product.category;

            const sameOccasion =
              Array.isArray(p.occasion) &&
              product.occasion &&
              p.occasion.some((o: string) => product.occasion.includes(o));

            return sameCategory || sameOccasion;
          })
          .slice(0, 8);

        setRelatedProducts(related);
      } catch (err) {
        console.error("Related products error:", err);
      }
    };

    fetchRelated();
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image skeleton */}
          <div className="rounded-2xl bg-gray-200 aspect-[3/4] animate-pulse" />

          {/* Content skeleton */}
          <div className="space-y-6">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />

            <div className="flex gap-2">
              <div className="h-12 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 w-16 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="h-14 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product Not Found
        </h2>
        <button
          onClick={() => router.push("/products")}
          className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Go Back
        </button>
      </div>
    );
  }

  const hasSizes = product.size && product.size.length > 0;
  const isNewArrival = product?.occasion?.includes("NEW IN");
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Back Button */}
      <div className="pt-20 px-4 sm:px-6 max-w-7xl mx-auto mb-4">
        <button
          onClick={() => router.back()}
          className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <div className="p-2 bg-white rounded-full border border-gray-200 mr-3 group-hover:border-purple-400 transition-colors">
            <ArrowLeft size={16} className="text-purple-600" />
          </div>
          Back to Collection
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-5
         xl:gap-16"
        >
          {/* LEFT: IMAGE */}
          <div className="relative flex justify-center">
            <div className="lg:sticky lg:top-24 w-full max-w-md md:max-w-lg space-y-4">
              {/* Mobile Slider */}

              <div className=" md:hidden">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  onSlideChange={(swiper) =>
                    setSelectedImage(swiper.activeIndex)
                  }
                >
                  {product.images.map((img: string, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-md">
                        <Image
                          src={img}
                          loading="lazy"
                          alt="product"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Mobile Thumbnails */}
                <div className="flex gap-2 mt-3 overflow-x-auto">
                  {product.images.map((img: string, index: number) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedImage(index);
                        swiperRef.current?.slideTo(index);
                      }}
                      className={`relative w-16 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                        selectedImage === index
                          ? "border-gray-400"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={img}
                        loading="lazy"
                        alt="thumbnail"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Desktop Image */}
              <div className="hidden md:block">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-md group">
                  {/* Shimmer Loader */}
                  {imageLoading && (
                    <div className="absolute inset-0 shimmer rounded-2xl"></div>
                  )}

                  <Image
                    src={product.images?.[selectedImage] || "/placeholder.jpg"}
                    alt={product.name}
                    fill
                    priority
                    onLoadingComplete={() => setImageLoading(false)}
                    className={`object-cover transition-transform duration-500 group-hover:scale-125 ${
                      imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </div>

                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-3 mt-3">
                    {product.images.map((img: string, index: number) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-20 h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${
                          selectedImage === index
                            ? "border-gray-400"
                            : "border-gray-200 hover:border-black-400"
                        }`}
                      >
                        <Image
                          src={img}
                          alt="product"
                          fill
                          onLoadingComplete={() => setImageLoading(false)}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* RIGHT: DETAILS */}
          <div className="flex flex-col pt-1 lg:pt-8">
            {/* Header */}
            <div className="mb-6 border-b border-gray-100 pb-6">
              {isNewArrival && (
                <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-semibold uppercase rounded-full mb-2 inline-block">
                  New Arrival
                </span>
              )}
              <h1 className="font-sans text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-3 leading-snug tracking-tight line-clamp-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="text-2xl font-bold text-black">
                  ₹{product.finalPrice ?? product.price}
                </span>

                {product.discount > 0 && (
                  <>
                    <span className="text-gray-400 line-through text-sm">
                      ₹{product.price}
                    </span>

                    <span className="bg-red-100 text-red-500 text-xs font-semibold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* ✅ Show Size Selector ONLY if sizes exist */}
            {hasSizes && (
              <div className="mb-8 font-sans">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400">Select Size</h3>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs text-gold hover:text-black font-semibold tracking-wider uppercase transition cursor-pointer"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.size.map((s: any, i: number) => {
                    const sizeLabel =
                      typeof s === "string"
                        ? s.toUpperCase()
                        : s?.size?.toUpperCase?.() || s?.label?.toUpperCase?.() || String(s);
                    const stock =
                      typeof s === "string"
                        ? 10
                        : typeof s?.stock === "number"
                        ? s.stock
                        : 10;
                    const isOutOfStock = stock <= 0;
                    const isSelected = selectedSize === sizeLabel;

                    return (
                      <button
                        key={i}
                        onClick={() => handleSizeSelect(sizeLabel)}
                        className={`h-11 min-w-[2.75rem] px-3 font-semibold text-xs tracking-wider transition-all duration-200
                          flex items-center justify-center border rounded-none cursor-pointer
                          ${
                            isOutOfStock
                              ? isSelected
                                ? "border-red-500 bg-red-50 text-red-500 line-through"
                                : "bg-gray-50 border-gray-200 text-gray-400 line-through hover:border-red-300"
                              : isSelected
                              ? "border-primary bg-primary text-white"
                              : "bg-white border-gray-200 text-gray-800 hover:border-primary"
                          }`}
                      >
                        {sizeLabel}
                      </button>
                    );
                  })}
                </div>

                {/* Size Stock Info */}
                {selectedSize && (
                  <div className="mt-3 text-xs font-semibold uppercase tracking-wider">
                    {(() => {
                      const selSizeObj = product.size.find((s: any) => {
                        const label = typeof s === "string" ? s : (s.size || s.label || "");
                        return label.toUpperCase() === selectedSize.toUpperCase();
                      });
                      const stock = typeof selSizeObj === "string" ? 10 : (typeof selSizeObj?.stock === "number" ? selSizeObj.stock : 10);
                      if (stock <= 0) {
                        return <span className="text-red-600 font-bold">❌ {selectedSize} is out of stock (0 left)</span>;
                      } else if (stock <= 3) {
                        return <span className="text-amber-655 font-bold animate-pulse">🔥 Only {stock} left in stock! Buy soon.</span>;
                      } else {
                        return <span className="text-green-600 font-bold">✅ {selectedSize} is in stock ({stock} left)</span>;
                      }
                    })()}
                  </div>
                )}

                {/* Find Your Fit Tool */}
                <div className="mt-4">
                  <button
                    onClick={() => setShowFitAdvisor(!showFitAdvisor)}
                    className="text-[10px] text-gray-400 hover:text-black font-bold uppercase tracking-wider transition underline cursor-pointer"
                  >
                    Find Your Fit
                  </button>

                  <AnimatePresence>
                    {showFitAdvisor && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-4 bg-gray-50/50 border border-gray-105 rounded-none space-y-3 overflow-hidden text-left"
                      >
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">FIT SELECTOR</p>
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="text-[9px] text-gray-500 uppercase tracking-widest block mb-1">Height (cm)</label>
                            <input
                              type="number"
                              value={fitHeight}
                              onChange={(e) => setFitHeight(e.target.value)}
                              className="w-full bg-white border border-gray-200 h-9 px-2 text-xs outline-none focus:border-black rounded-none"
                              placeholder="e.g. 170"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-[9px] text-gray-500 uppercase tracking-widest block mb-1">Weight (kg)</label>
                            <input
                              type="number"
                              value={fitWeight}
                              onChange={(e) => setFitWeight(e.target.value)}
                              className="w-full bg-white border border-gray-200 h-9 px-2 text-xs outline-none focus:border-black rounded-none"
                              placeholder="e.g. 65"
                            />
                          </div>
                        </div>
                        <button
                          onClick={handleFitCalculate}
                          className="w-full bg-primary text-white h-9 text-[10px] tracking-widest font-semibold uppercase hover:bg-primary/95 transition rounded-none cursor-pointer"
                        >
                          Calculate Fit
                        </button>

                        {suggestedSize && (
                          <div className="mt-2 p-3 bg-white border border-gray-100 text-center">
                            <p className="text-xs font-medium text-gray-700">
                              Based on your entries, we suggest size: <span className="text-gold font-bold text-sm">{suggestedSize}</span>
                            </p>
                            <button
                              onClick={() => {
                                setSelectedSize(suggestedSize);
                                setShowFitAdvisor(false);
                                setSuggestedSize("");
                                setFitHeight("");
                                setFitWeight("");
                              }}
                              className="text-[9px] text-gold hover:text-black font-bold uppercase tracking-widest mt-1.5 underline cursor-pointer"
                            >
                              Select Size {suggestedSize}
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {errorMsg && (
                  <div className="mt-3 text-red-550 text-xs font-semibold uppercase tracking-wider">
                    {errorMsg}
                  </div>
                )}
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-2 mb-8">
              {(() => {
                let isOutOfStock = false;
                if (selectedSize) {
                  const selSizeObj = product.size.find((s: any) => {
                    const label = typeof s === "string" ? s : (s.size || s.label || "");
                    return label.toUpperCase() === selectedSize.toUpperCase();
                  });
                  const stock = typeof selSizeObj === "string" ? 10 : (typeof selSizeObj?.stock === "number" ? selSizeObj.stock : 10);
                  isOutOfStock = stock <= 0;
                }

                return (
                  <button
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                    className={`
                      w-full sm:flex-1
                      py-3.5 sm:py-4
                      px-4 sm:px-6
                      rounded-none
                      font-semibold
                      text-xs sm:text-sm tracking-widest uppercase
                      flex items-center justify-center gap-2
                      transition-all duration-300
                      shadow-sm cursor-pointer
                      ${
                        isOutOfStock
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
                          : "bg-primary text-white hover:bg-primary/95 active:scale-98"
                      }
                    `}
                  >
                    <ShoppingBag size={18} />
                    {isOutOfStock ? "Out of Stock" : "Add to Bag"}
                  </button>
                );
              })()}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-6 border-t border-gray-150 font-sans">
              {/* Free Shipping */}
              <div className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 bg-white hover:shadow-sm transition rounded-none">
                <div className="flex items-center justify-center w-10 h-10 rounded-none bg-gray-50 text-gold">
                  <Truck size={20} />
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 text-[10px] tracking-widest uppercase">
                    Free Shipping
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">
                    Orders over ₹2000
                  </p>
                </div>
              </div>

              {/* Secure Payment */}
              <div className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 bg-white hover:shadow-sm transition rounded-none">
                <div className="flex items-center justify-center w-10 h-10 rounded-none bg-gray-50 text-gold">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 text-[10px] tracking-widest uppercase">
                    Secure Payment
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">
                    100% Secure Checkout
                  </p>
                </div>
              </div>
            </div>

            {/* PRODUCT DETAILS ACCORDION */}

            <div className="border-t border-gray-200 mt-6">
              {/* SPECIFICATIONS */}
              <button
                onClick={() => toggleSection("spec")}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <span className="text-sm tracking-widest font-semibold text-gray-800">
                  SPECIFICATIONS
                </span>

                <ChevronRight
                  className={`transition-transform duration-300 transform  text-black ${
                    openSection === "spec" ? "rotate-90" : ""
                  }`}
                  size={18}
                />
              </button>
              {openSection === "spec" && (
                <div className="pb-4 text-gray-600 text-sm leading-relaxed animate-fadeIn">
                  {product.description}
                </div>
              )}
              <div className="border-t border-gray-200"></div>
              {/* SELLER INFORMATION */}
              <button
                onClick={() => toggleSection("seller")}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <span className="text-sm tracking-widest font-semibold text-gray-800">
                  SELLER INFORMATION
                </span>

                <ChevronRight
                  className={`transition-transform duration-300 transform text-black ${
                    openSection === "seller" ? "rotate-90" : ""
                  }`}
                  size={18}
                />
              </button>

              {openSection === "seller" && (
                <div className="pb-4 text-gray-600 text-sm leading-relaxed space-y-4 animate-fadeIn">
                  <div>
                    <p className="font-semibold">Manufactured & Marketed by</p>
                    <p>Zivore Apparel Private Limited</p>
                    <p>
                      Address: B 005, Sector 85, Noida, Gautam Buddha Nagar,
                      Uttar Pradesh, 201301
                    </p>
                    <p>Country Of Origin: India</p>
                  </div>

                  <div>
                    <p className="font-semibold">Consumer Care Details</p>
                    <p>Zivore Apparel Private Limited</p>
                    <p>
                      Address: B 005, Sector 85, Noida, Gautam Buddha Nagar,
                      Uttar Pradesh, 201301
                    </p>
                    <p>Email: care@libas.in</p>
                    <p>Call: +91 9899990772</p>
                    <p>WhatsApp: +91 9205222171</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* YOU MAY ALSO LIKE */}
        {relatedProducts.length > 0 && (
          <section className="max-w-7xl mx-auto pt-9 pb-8">
            <h2 className="text-2xl sm:text-xl font-semibold text-center mb-6">
              You May Also Like
            </h2>

            <div className="flex justify-center">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {relatedProducts.map((item) => (
                  <div
                    key={item._id}
                    className="min-w-[200px] sm:min-w-[220px] md:min-w-[240px]"
                  >
                    <ProductCard product={item} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      {/* SIZE GUIDE POPUP MODAL */}
      <AnimatePresence>
        {showSizeGuide && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeGuide(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            {/* Modal Wrapper */}
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-[500px] max-h-[90vh] flex flex-col p-6 overflow-y-auto relative font-sans text-gray-900 pointer-events-auto"
              >
                {/* Close Button in Top Right */}
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-black p-1 hover:bg-gray-105 rounded-full transition cursor-pointer z-10"
                >
                  <X size={22} />
                </button>

                {/* Size Guide Component */}
                <div className="mt-2">
                  <SizeGuide />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
