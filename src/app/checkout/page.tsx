"use client";

import { useCart } from "../../context/CartContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import API from "@/src/lib/api";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    paymentMethod: "cod",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const orderData = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postal: form.postal,
        paymentMethod: form.paymentMethod,
        totalAmount: total,
        items: cart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
      };

      const res = await API.post("/orders/create", orderData);

      if (res.data.success) {
        // ✅ Save phone for tracking orders
        localStorage.setItem("customerPhone", form.phone);

        alert("✅ Order placed successfully!");

        clearCart();

        window.location.href = "/my-orders";
      } else {
        alert("❌ Something went wrong while placing the order");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to place order. Please try again.");
    }
  };

  if (cart.length === 0)
    return (
      <div className="text-center py-20 bg-gradient-to-b from-pink-50 to-white min-h-screen pt-28 text-black">
        <h2 className="text-3xl font-semibold mb-6">🛒 Your cart is empty</h2>
        <Link
          href="/products"
          className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-transform transform hover:scale-105 shadow-md"
        >
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen py-10 px-4 pt-28 text-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* === Left: Checkout Form === */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
          <h2 className="text-3xl font-bold mb-6 text-pink-600 text-center">
            Checkout Details
          </h2>

          <div className="space-y-5">
            <input
              name="name"
              placeholder="Full Name"
              className="w-full p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition text-black placeholder-gray-500"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone Number"
              className="w-full p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition text-black placeholder-gray-500"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              name="address"
              placeholder="Full Address"
              className="w-full p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition text-black placeholder-gray-500"
              value={form.address}
              onChange={handleChange}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                name="city"
                placeholder="City"
                className="w-full sm:w-1/2 p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition text-black placeholder-gray-500"
                value={form.city}
                onChange={handleChange}
              />
              <input
                name="postal"
                placeholder="Postal Code"
                className="w-full sm:w-1/2 p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition text-black placeholder-gray-500"
                value={form.postal}
                onChange={handleChange}
              />
            </div>
            <select
              name="paymentMethod"
              className="w-full p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition text-gray-500"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option value="cod">Cash on Delivery</option>
              <option value="razorpay">Razorpay (Online)</option>
            </select>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-8 bg-pink-600 hover:bg-pink-700 text-white w-full py-3 rounded-full font-semibold text-lg shadow-md transition-transform transform hover:scale-105"
          >
            Place Order
          </button>
        </div>

        {/* === Right: Order Summary === */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
          <h2 className="text-3xl font-bold mb-6 text-pink-600 text-center">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-50 pr-2">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded-lg border border-pink-100 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-black">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-pink-600 font-semibold text-lg">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-4">
            <div className="flex justify-between font-semibold text-xl">
              <p className="text-black">Total</p>
              <p className="text-pink-600">₹{total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
