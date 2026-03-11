"use client";

import { useCart } from "../../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h2 className="text-2xl font-bold mb-6 text-black">
          Your cart is empty
        </h2>

        <Link
          href="/products"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-28 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-black">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-5">
            {cart.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-4 border shadow-sm"
              >
                <div className="flex gap-4 relative">
                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="absolute -right-2 -top-1 text-gray-400 hover:text-red-500"
                  >
                    {" "}
                    <Trash2 size={18} />
                  </button>

                  {/* IMAGE */}
                  <Image
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    width={90}
                    height={90}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex flex-col flex-1 min-w-0">
                    <h2 className="font-semibold text-sm sm:text-base text-black">
                      {item.name}
                    </h2>

                    <p className="text-xs text-gray-500">Size: {item.size}</p>

                    <p className="text-pink-600 font-semibold mt-1 text-sm sm:text-base">
                      ₹{item.price}
                    </p>

                    {/* QUANTITY + TOTAL */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
                      {/* Quantity stepper */}

                      <div className="flex items-center border border-gray-400 rounded-full overflow-hidden w-fit">
                        <button
                          className="px-3 py-1 text-lg text-black hover:bg-gray-200 transition"
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                        >
                          −
                        </button>

                        <span className="px-4 text-sm font-semibold text-black">
                          {item.quantity}
                        </span>

                        <button
                          className="px-3 py-1 text-lg text-black hover:bg-gray-200 transition"
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      {/* Total */}
                      <p className="text-sm font-semibold text-black sm:text-right">
                        Total: ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-gray-500 hover:text-red-500"
            >
              Clear Cart
            </button>
          </div>
          {/* DESKTOP ORDER SUMMARY */}
          <div className="hidden lg:block bg-white border rounded-xl p-6 h-fit sticky top-28">
            <h2 className="text-xl font-semibold mb-6 text-black">
              Order Summary
            </h2>

            <div className="space-y-4 text-black">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Link href="/checkout">
              <button className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800">
                Proceed to Checkout
              </button>
            </Link>
          </div>

          <div className="mt-6 border-t pt-4 space-y-3 lg:hidden">
            <div className="flex justify-between text-black">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-black">
              <span>Shipping</span>
              <span className="text-green-600">
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>

            <div className="flex justify-between font-bold text-lg text-black">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Link href="/checkout">
              <button className="w-full bg-black text-white py-3 rounded-lg mt-2">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
