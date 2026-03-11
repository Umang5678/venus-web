// "use client";

// import { useCart } from "../../context/CartContext";
// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import API from "@/src/lib/api";

// export default function CheckoutPage() {
//   const { cart, clearCart } = useCart();
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     postal: "",
//     paymentMethod: "cod",
//   });

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handlePlaceOrder = async () => {
//     if (!form.name || !form.phone || !form.address) {
//       alert("Please fill all required fields");
//       return;
//     }

//     try {
//       const orderData = {
//         name: form.name,
//         phone: form.phone,
//         address: form.address,
//         city: form.city,
//         postal: form.postal,
//         paymentMethod: form.paymentMethod,
//         totalAmount: total,
//         items: cart.map((item) => ({
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//           image: item.image,
//           size: item.size,
//         })),
//       };

//       const res = await API.post("/orders/create", orderData);

//       if (res.data.success) {
//         // ✅ Save phone for tracking orders
//         localStorage.setItem("customerPhone", form.phone);

//         alert("✅ Order placed successfully!");

//         clearCart();

//         window.location.href = "/my-orders";
//       } else {
//         alert("❌ Something went wrong while placing the order");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("❌ Failed to place order. Please try again.");
//     }
//   };

//   if (cart.length === 0)
//     return (
//       <div className="text-center py-20 bg-gradient-to-b from-pink-50 to-white min-h-screen pt-28 text-black">
//         <h2 className="text-3xl font-semibold mb-6">🛒 Your cart is empty</h2>
//         <Link
//           href="/products"
//           className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-transform transform hover:scale-105 shadow-md"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     );

//   return (
//     <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen py-10 px-4 pt-28 text-black">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* === Left: Checkout Form === */}
//         <div className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
//           <h2 className="text-3xl font-bold mb-6 text-pink-600 text-center">
//             Checkout Details
//           </h2>

//           <div className="space-y-5">
//             <input
//               name="name"
//               placeholder="Full Name"
//               className="w-full p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition text-black placeholder-gray-500"
//               value={form.name}
//               onChange={handleChange}
//             />
//             <input
//               name="phone"
//               placeholder="Phone Number"
//               className="w-full p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition text-black placeholder-gray-500"
//               value={form.phone}
//               onChange={handleChange}
//             />
//             <input
//               name="address"
//               placeholder="Full Address"
//               className="w-full p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition text-black placeholder-gray-500"
//               value={form.address}
//               onChange={handleChange}
//             />
//             <div className="flex flex-col sm:flex-row gap-4">
//               <input
//                 name="city"
//                 placeholder="City"
//                 className="w-full sm:w-1/2 p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition text-black placeholder-gray-500"
//                 value={form.city}
//                 onChange={handleChange}
//               />
//               <input
//                 name="postal"
//                 placeholder="Postal Code"
//                 className="w-full sm:w-1/2 p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition text-black placeholder-gray-500"
//                 value={form.postal}
//                 onChange={handleChange}
//               />
//             </div>
//             <select
//               name="paymentMethod"
//               className="w-full p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition text-gray-500"
//               value={form.paymentMethod}
//               onChange={handleChange}
//             >
//               <option value="cod">Cash on Delivery</option>
//               <option value="razorpay">Razorpay (Online)</option>
//             </select>
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             className="mt-8 bg-pink-600 hover:bg-pink-700 text-white w-full py-3 rounded-full font-semibold text-lg shadow-md transition-transform transform hover:scale-105"
//           >
//             Place Order
//           </button>
//         </div>

//         {/* === Right: Order Summary === */}
//         <div className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
//           <h2 className="text-3xl font-bold mb-6 text-pink-600 text-center">
//             Order Summary
//           </h2>

//           <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-50 pr-2">
//             {cart.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex items-center justify-between border-b pb-3"
//               >
//                 <div className="flex items-center space-x-3">
//                   <Image
//                     src={item.image || "/placeholder.jpg"}
//                     alt={item.name}
//                     width={70}
//                     height={70}
//                     className="rounded-lg border border-pink-100 object-cover"
//                   />
//                   <div>
//                     <p className="font-semibold text-black">{item.name}</p>
//                     <p className="text-sm text-gray-600">
//                       Qty: {item.quantity}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-pink-600 font-semibold text-lg">
//                   ₹{item.price * item.quantity}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="border-t mt-6 pt-4">
//             <div className="flex justify-between font-semibold text-xl">
//               <p className="text-black">Total</p>
//               <p className="text-pink-600">₹{total}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import API from "@/src/lib/api";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postal: "",
    paymentMethod: "cod",
  });
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers
    return phoneRegex.test(phone);
  };
  const router = useRouter();
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.phone || !form.email || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!validatePhone(form.phone)) {
      toast.error("Enter valid 10 digit mobile number");
      return;
    }

    if (!validateEmail(form.email)) {
      toast.error("Enter valid email address");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        ...form,
        totalAmount: total,
        items: cart,
      };

      const res = await API.post("/orders/create", orderData);

      if (res.data.success) {
        // save phone for order tracking
        localStorage.setItem("customerPhone", form.phone);

        toast.success("Order placed successfully!");

        clearCart();

        // wait so user can see toast
        setTimeout(() => {
          router.push("/my-orders");
        }, 1500);
      } else {
        toast.error("Something went wrong while placing order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white pt-24 px-6">
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

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-black">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* SHIPPING FORM */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-black">
              Shipping Details
            </h2>

            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>

                <input
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    placeholder="Enter your phone number"
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });

                      if (!validatePhone(e.target.value)) {
                        setErrors((prev) => ({
                          ...prev,
                          phone: "Enter valid 10 digit mobile number",
                        }));
                      } else {
                        setErrors((prev) => ({ ...prev, phone: "" }));
                      }
                    }}
                    className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />

                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>

                  <input
                    name="email"
                    value={form.email}
                    placeholder="Enter your email"
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });

                      if (!validateEmail(e.target.value)) {
                        setErrors((prev) => ({
                          ...prev,
                          email: "Enter valid email address",
                        }));
                      } else {
                        setErrors((prev) => ({ ...prev, email: "" }));
                      }
                    }}
                    className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />

                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>

                <input
                  name="address"
                  placeholder="Street address, house number"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>

              {/* City + Postal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>

                  <input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>

                  <input
                    name="postal"
                    placeholder="Postal Code"
                    value={form.postal}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              {/* Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>

                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="razorpay">Online Payment (Razorpay)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="mt-8 w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white border rounded-xl p-6 shadow-sm h-fit lg:sticky lg:top-28">
            <h2 className="text-xl font-semibold mb-6 text-black">
              Order Summary
            </h2>

            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      width={70}
                      height={70}
                      className="rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-medium text-black">{item.name}</p>

                      <p className="text-xs text-gray-500">Size: {item.size}</p>

                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold text-black">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t mt-6 pt-4 space-y-3 text-black">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
