"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { ShoppingBag } from "lucide-react";
import API from "../lib/api";
import { setCachedProduct } from "../lib/productCache";
import { useCart } from "../context/CartContext";

interface ProductProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    discount?: number;
    finalPrice?: number;
    images?: string[];
    occasion?: string[];
    size?: any[];
  };
}

export default function ProductCard({ product }: ProductProps) {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = async () => {
    setHovered(true);
    try {
      const res = await API.get(`/products/${product._id}`);
      setCachedProduct(product._id, res.data);
    } catch (err) {
      console.error("Prefetch product failed");
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const isNew = product.occasion?.includes("NEW IN");
  const sizes = Array.isArray(product.size) ? product.size.flat(Infinity) : [];

  const handleQuickAdd = (e: React.MouseEvent, selectedSize: string) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      _id: product._id,
      name: product.name,
      price: product.finalPrice ?? product.price,
      image: product.images?.[0],
      quantity: 1,
      size: selectedSize,
    });

    toast.success(`Added ${product.name} (Size: ${selectedSize}) to Bag!`, {
      style: {
        background: "#121212",
        color: "#ffffff",
        fontSize: "12px",
        borderRadius: "0px",
        letterSpacing: "0.05em",
      },
    });
  };

  return (
    <Link
      href={`/products/${product._id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      prefetch
      className="group flex flex-col h-full bg-white overflow-hidden transition-all duration-300 border border-gray-100 hover:shadow-lg"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50">
        {/* Primary Image */}
        <Image
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
          priority={isNew}
        />

        {/* Secondary Hover Image */}
        {product.images && product.images.length > 1 && (
          <Image
            src={product.images[1]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-103"
          />
        )}

        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {isNew && (
            <span className="bg-primary text-white text-[9px] tracking-widest font-semibold px-2.5 py-1 uppercase shadow-xs">
              NEW
            </span>
          )}
          {product.discount && product.discount > 0 && (
            <span className="bg-gold text-primary text-[9px] tracking-widest font-bold px-2.5 py-1 uppercase shadow-xs">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Quick Add Sliding Drawer */}
        {sizes.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-xs border-t border-gray-100 p-2.5 z-10 flex flex-col items-center">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <ShoppingBag size={10} /> QUICK ADD
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 w-full">
              {sizes.map((s, idx) => {
                const sizeLabel =
                  typeof s === "string"
                    ? s.toUpperCase()
                    : s?.size?.toUpperCase?.() || s?.label?.toUpperCase?.() || String(s).toUpperCase();
                const stock =
                  typeof s === "string"
                    ? 10
                    : typeof s?.stock === "number"
                    ? s.stock
                    : 10;
                const isOutOfStock = stock <= 0;

                return (
                  <button
                    key={idx}
                    disabled={isOutOfStock}
                    onClick={(e) => handleQuickAdd(e, sizeLabel)}
                    className={`h-7 min-w-7 px-1.5 text-[10px] font-bold border flex items-center justify-center cursor-pointer transition
                      ${
                        isOutOfStock
                          ? "border-gray-100 bg-gray-50 text-gray-300 line-through cursor-not-allowed"
                          : "border-gray-200 hover:border-black hover:bg-black hover:text-white"
                      }`}
                  >
                    {sizeLabel}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3.5 flex flex-col flex-1 bg-white">
        {/* Product Occasion/Category Label */}
        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-1">
          {product.occasion?.[0] || "COLLECTION"}
        </p>

        {/* Product Name */}
        <h3 className="text-xs sm:text-sm font-medium text-gray-900 tracking-wide line-clamp-2 leading-relaxed min-h-[40px]">
          {product.name}
        </h3>

        {/* Product Price */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-50">
          <span className="text-sm font-bold text-gray-950">
            ₹{(product.finalPrice ?? product.price).toFixed(2)}
          </span>
          {product.discount && product.discount > 0 && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
