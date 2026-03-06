"use client";
import { useCart } from "./../../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-pink-50 to-white pt-24 px-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          🛒 Your cart is empty
        </h2>
        <Link
          href="/products"
          className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition font-medium shadow-md"
        >
          Browse Products
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-28 pb-12 px-6">
      {/* 👆 pt-28 = navbar space */}

      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-800">
          Your Cart 🛍️
        </h1>

        {/* === Cart Items === */}
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center justify-between border-b pb-4"
            >
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <Image
                  src={item.image || "/placeholder.jpg"}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover w-24 h-24 sm:w-28 sm:h-28 shadow"
                />
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-pink-600 font-medium text-lg">
                    ₹{item.price}
                  </p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 font-medium transition"
              >
                ✕ Remove
              </button>
            </div>
          ))}
        </div>

        {/* === Total & Actions === */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10">
          <button
            onClick={clearCart}
            className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-300 transition mb-4 sm:mb-0 font-medium shadow-sm"
          >
            Clear Cart
          </button>

          <div className="text-center sm:text-right">
            <h2 className="text-2xl font-semibold text-gray-800">
              Total: <span className="text-pink-600 font-bold">₹{total}</span>
            </h2>
            <Link href="/checkout">
              <button className="bg-pink-600 text-white px-8 py-3 mt-3 rounded-lg hover:bg-pink-700 transition font-medium shadow-md">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
