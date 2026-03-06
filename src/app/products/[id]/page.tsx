"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Heart,
  Share2,
} from "lucide-react";
import API from "./../../../lib/api";
import { useCart } from "./../../../context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const swiperRef = useRef<any>(null);
  useEffect(() => {
    if (!id) return;
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
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      quantity: 1,
      size: selectedSize || "Default",
    });
  };

  const handleSizeSelect = (sizeLabel: string) => {
    setSelectedSize((prev) => (prev === sizeLabel ? null : sizeLabel));
    setErrorMsg(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-100 rounded-3xl aspect-[3/4] animate-pulse" />
          <div className="space-y-6 pt-8">
            <div className="h-8 bg-gray-100 rounded w-1/3 animate-pulse" />
            <div className="h-12 bg-gray-100 rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-100 rounded w-full animate-pulse" />
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
          onClick={() => router.back()}
          className="text-pink-600 hover:text-pink-700 font-medium flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Go Back
        </button>
      </div>
    );
  }

  const hasSizes = product.size && product.size.length > 0;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Back Button */}
      <div className="pt-20 px-4 sm:px-6 max-w-7xl mx-auto mb-4">
        <button
          onClick={() => router.back()}
          className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <div className="p-2 bg-white rounded-full border border-gray-200 mr-3 group-hover:border-pink-400 transition-colors">
            <ArrowLeft size={16} className="text-pink-600" />
          </div>
          Back to Collection
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* LEFT: IMAGE */}
          <div className="relative flex justify-center">
            <div className="lg:sticky lg:top-24 w-full max-w-md md:max-w-lg space-y-4">
              {/* Mobile Slider */}
              {/* Mobile Slider */}
              <div className="block md:hidden">
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
                          ? "border-pink-600"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={img}
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
                  <Image
                    src={product.images?.[selectedImage] || "/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-125"
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
                            ? "border-pink-600"
                            : "border-gray-200 hover:border-pink-400"
                        }`}
                      >
                        <Image
                          src={img}
                          alt="product"
                          fill
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
          <div className="flex flex-col pt-4 lg:pt-8">
            {/* Header */}
            <div className="mb-6 border-b border-gray-100 pb-6">
              <span className="px-3 py-1 bg-pink-100 text-pink-600 text-xs font-semibold uppercase rounded-full mb-2 inline-block">
                New Arrival
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 leading-snug">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-baseline gap-3">
                <p className="text-3xl sm:text-4xl font-semibold text-gray-900">
                  ₹{product.price}
                </p>
                <p className="text-lg sm:text-xl text-gray-400 line-through">
                  ₹{Math.round(product.price * 1.2)}
                </p>
                <span className="text-pink-600 text-sm font-semibold">
                  20% OFF
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
              {product.description ||
                "Beautifully designed outfit, crafted for elegance and comfort. This piece combines modern aesthetics with timeless style."}
            </p>

            {/* ✅ Show Size Selector ONLY if sizes exist */}
            {hasSizes && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900">Select Size</h3>
                  <button className="text-sm text-pink-600 hover:underline">
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.size.map((s: any, i: number) => {
                    const sizeLabel =
                      typeof s === "string"
                        ? s.toUpperCase()
                        : s?.label?.toUpperCase?.() || String(s);
                    const isSelected = selectedSize === sizeLabel;

                    return (
                      <button
                        key={i}
                        onClick={() => handleSizeSelect(sizeLabel)}
                        className={`min-w-[3rem] h-12 px-3 rounded-xl border-2 font-semibold text-sm sm:text-base transition-all duration-200
                          flex items-center justify-center
                          ${
                            isSelected
                              ? "border-pink-600 bg-pink-600 text-white shadow-lg scale-95"
                              : "bg-white border-gray-200 text-gray-600 hover:border-pink-400 hover:text-pink-600"
                          }`}
                      >
                        {sizeLabel}
                      </button>
                    );
                  })}
                </div>

                {errorMsg && (
                  <div className="mt-3 text-red-500 text-sm font-medium">
                    {errorMsg}
                  </div>
                )}
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-pink-600 text-white h-14 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-pink-700 active:scale-95 transition-all shadow-lg"
              >
                <ShoppingBag size={20} />
                Add to Cart
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Free Shipping
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    On all orders over ₹999
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Secure Payment
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    100% secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
