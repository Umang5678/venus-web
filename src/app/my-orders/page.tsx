"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle, Truck, Package, Clock, XCircle, Search, ArrowRight, RefreshCw } from "lucide-react";
import Image from "next/image";
import API from "../../lib/api";

interface Order {
  _id: string;
  name: string;
  phone: string;
  email: string;
  items: {
    name: string;
    image?: string;
    price: number;
    quantity: number;
    size?: string;
  }[];
  totalAmount: number;
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
}

export default function MyOrdersPage() {
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (searchVal: string) => {
    const trimmed = searchVal.trim();
    if (!trimmed) {
      toast.error("Please enter a phone number or email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await API.get(`/orders/track/${trimmed}`);
      const data = res.data;
      const orderList = data.orders || [];
      setOrders(orderList);
      setSearched(true);
      
      // Save search query in localStorage for auto-tracking next time
      localStorage.setItem("trackedQuery", trimmed);

      if (orderList.length === 0) {
        toast("No orders found for this search.", { icon: "🔍" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to find orders. Please check your spelling and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem("trackedQuery") || localStorage.getItem("customerPhone");
    if (savedQuery) {
      setQuery(savedQuery);
      handleSearch(savedQuery);
    }
  }, []);

  const getStatusStep = (status: string) => {
    const stages = ["Pending", "Processing", "Shipped", "Delivered"];
    return stages.indexOf(status);
  };

  const statusIcons = [Clock, Package, Truck, CheckCircle];

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Title Banner */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-widest text-gray-900 uppercase">
            Track Your Order
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-3">
            Real-time delivery status for your purchases
          </p>
        </div>

        {/* Search Panel - shown if no orders are found or searched yet */}
        {(!searched || orders.length === 0) && (
          <div className="max-w-md mx-auto bg-white border border-gray-200 p-8 rounded-none shadow-sm mb-12">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">
              Enter Purchase Details
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
                  Phone Number or Email Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. 9876543210 or care@venus.com"
                    className="w-full bg-white border border-gray-200 h-11 px-4 text-xs outline-none focus:border-black rounded-none transition-all duration-200"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch(query);
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => handleSearch(query)}
                disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white h-11 text-[10px] font-bold uppercase tracking-widest transition-all rounded-none flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <RefreshCw className="animate-spin" size={14} />
                ) : (
                  <>
                    <span>Search Orders</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Search Feedback and Results */}
        {searched && (
          <div className="space-y-8">
            
            {/* Header info showing the active query */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center border-b border-gray-200 pb-4 mb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Showing results for: <span className="text-gray-900 font-sans font-semibold normal-case tracking-normal">{query}</span>
              </p>
              <button
                onClick={() => {
                  setOrders([]);
                  setSearched(false);
                }}
                className="text-[9px] text-pink-600 hover:text-black font-bold uppercase tracking-widest underline cursor-pointer"
              >
                Track another order
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-10 bg-white border border-gray-200 p-8">
                <p className="text-sm text-gray-500 font-medium">
                  We couldn't find any orders matching this contact information.
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Please verify the phone number or email address and try again.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((o) => (
                  <div key={o._id} className="bg-white border border-gray-200 rounded-none p-6 md:p-8">
                    {/* Order Meta Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-100 pb-5">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ORDER REFERENCE</p>
                        <p className="font-sans text-sm font-semibold text-gray-900 mt-1">
                          #{o._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">DATE PLACED</p>
                        <p className="font-sans text-sm text-gray-600 mt-1">
                          {new Date(o.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">TOTAL VALUE</p>
                        <p className="font-sans text-lg font-bold text-gray-900 mt-0.5">
                          ₹{o.totalAmount}
                        </p>
                      </div>
                    </div>

                    {/* Ordered Items list */}
                    <div className="space-y-4 py-2">
                      {o.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0 last:pb-0">
                          <div className="relative w-16 h-20 bg-gray-50 border border-gray-100 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.jpg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">
                              Qty: {item.quantity} {item.size ? `· Size: ${item.size}` : ""}
                            </p>
                          </div>

                          <p className="text-xs font-bold text-gray-900">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>

                    {/* Order Progress Status Bar */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                        Delivery Status
                      </p>

                      {o.orderStatus === "Cancelled" ? (
                        <div className="flex items-center gap-3 bg-red-50/50 border border-red-200/50 p-4">
                          <XCircle className="text-red-500 flex-shrink-0" size={20} />
                          <div>
                            <p className="text-xs font-bold text-red-600 uppercase tracking-wider">ORDER CANCELLED</p>
                            <p className="text-[10px] text-red-500/80 mt-0.5">This order has been cancelled and will not be processed.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 gap-2 relative">
                          {/* Background line connecting steps */}
                          <div className="absolute left-[12.5%] right-[12.5%] top-4 h-[2px] bg-gray-200 z-0" />
                          
                          {/* Active line progress bar */}
                          {getStatusStep(o.orderStatus) > 0 && (
                            <div 
                              className="absolute left-[12.5%] top-4 h-[2px] bg-pink-600 z-0 transition-all duration-500"
                              style={{ 
                                width: `${(getStatusStep(o.orderStatus) / 3) * 75}%` 
                              }}
                            />
                          )}

                          {["Pending", "Processing", "Shipped", "Delivered"].map((stage, index) => {
                            const Icon = statusIcons[index];
                            const active = index <= getStatusStep(o.orderStatus);

                            return (
                              <div key={index} className="flex flex-col items-center relative z-10">
                                <div
                                  className={`w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all duration-300
                                    ${
                                      active
                                        ? "bg-pink-600 text-white border-pink-600"
                                        : "bg-white border-gray-250 text-gray-300"
                                    }`}
                                >
                                  <Icon size={15} />
                                </div>

                                <p
                                  className={`text-[9px] font-bold tracking-wider uppercase mt-3 transition-colors duration-300
                                    ${active ? "text-pink-600" : "text-gray-400"}`}
                                >
                                  {stage === "Pending" ? "Placed" : stage}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
