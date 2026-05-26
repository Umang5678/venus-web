"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingThreshold = 2000;
  const progressPercent = Math.min((subtotal / shippingThreshold) * 100, 100);
  const remainingForFreeShipping = shippingThreshold - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 h-full w-[100vw] sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col font-sans text-gray-900 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-gray-900" />
                <span className="font-serif text-lg tracking-wider font-semibold">YOUR BAG</span>
                <span className="bg-gray-100 text-xs px-2 py-0.5 rounded-full font-medium">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-gray-500 hover:text-black hover:bg-gray-50 transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="p-5 bg-gray-50/50 border-b border-gray-100">
              {remainingForFreeShipping > 0 ? (
                <p className="text-xs text-gray-600 mb-2 font-medium tracking-wide">
                  Add <span className="font-bold text-gray-900">₹{remainingForFreeShipping}</span> more for <span className="text-gold font-bold">FREE SHIPPING</span>
                </p>
              ) : (
                <p className="text-xs text-green-700 mb-2 font-medium tracking-wide flex items-center gap-1.5">
                  ✨ Congratulations! You qualify for <span className="font-bold">FREE SHIPPING</span>
                </p>
              )}
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="h-full bg-gold transition-all duration-500 rounded-full"
                />
              </div>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                    <ShoppingBag size={24} className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-gray-700">Your bag is empty</h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-[200px] mx-auto">
                      Explore our collections and add styles to your bag.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="border border-gray-900 text-gray-900 text-xs tracking-widest px-6 py-2.5 hover:bg-gray-900 hover:text-white transition uppercase font-semibold"
                  >
                    Shop New Arrivals
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item._id}-${item.size}`}
                    className="flex gap-4 pb-4 border-b border-gray-100 relative group"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-28 flex-shrink-0 bg-gray-50 overflow-hidden rounded">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item details */}
                    <div className="flex-1 flex flex-col min-w-0 pr-6">
                      <h4 className="font-medium text-xs sm:text-sm text-gray-900 truncate tracking-wide">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Size: {item.size}</p>
                      
                      <p className="text-sm font-semibold text-gray-950 mt-1.5">
                        ₹{item.price}
                      </p>

                      {/* Stepper */}
                      <div className="flex items-center border border-gray-200 rounded-full w-fit mt-3 h-8">
                        <button
                          className="px-2.5 h-full text-gray-500 hover:text-black hover:bg-gray-50 transition rounded-l-full"
                          onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-semibold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          className="px-2.5 h-full text-gray-500 hover:text-black hover:bg-gray-50 transition rounded-r-full"
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Delete Icon */}
                    <button
                      onClick={() => removeFromCart(item._id, item.size)}
                      className="absolute right-0 bottom-4 text-gray-400 hover:text-red-600 transition p-1 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & CTA */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-5 space-y-4 bg-gray-50/30">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500 font-medium">
                    <span>Shipping</span>
                    <span className="text-green-700 font-semibold">
                      {subtotal >= 2000 ? "FREE" : "₹99"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-950">
                    <span className="font-serif tracking-wider font-semibold">SUBTOTAL</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    Tax and shipping calculated at checkout.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Link href="/checkout" onClick={onClose}>
                    <button className="w-full bg-primary hover:bg-primary/95 text-white py-3 px-4 text-xs sm:text-sm tracking-widest font-semibold uppercase flex items-center justify-center gap-2 group transition">
                      Proceed to Checkout
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <button
                    onClick={onClose}
                    className="w-full text-center text-xs tracking-wider text-gray-500 hover:text-black transition uppercase py-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
