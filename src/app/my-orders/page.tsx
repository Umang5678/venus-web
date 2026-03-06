"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle, Truck, Package, Clock, XCircle } from "lucide-react";
import Image from "next/image";
import API from "../../lib/api";
interface Order {
  _id: string;
  name: string;
  phone: string;
  items: {
    name: string;
    image?: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const phone = localStorage.getItem("customerPhone");

    if (!phone) {
      toast.error("⚠️ No orders found for this device.");
      return;
    }
    API.get(`/orders/track/${phone}`)
      .then((res) => {
        const data = res.data;
        setOrders(data.orders || []);

        if (!data.orders || data.orders.length === 0) {
          toast("No orders found yet 🛍️", { icon: "📦" });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const getStatusStep = (status: string) => {
    const stages = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    return stages.indexOf(status);
  };

  const statusIcons = [Clock, Package, Truck, CheckCircle, XCircle];

  return (
    <div className="bg-pink-50 min-h-screen pt-28 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-600 mb-10">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            You have not placed any orders yet.
          </p>
        ) : (
          <div className="space-y-8">
            {orders.map((o) => (
              <div key={o._id} className="bg-white rounded-xl shadow-md p-6">
                {/* Header */}
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="font-semibold">
                      Order #{o._id.slice(-6).toUpperCase()}
                    </p>

                    <p className="text-sm text-gray-500">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="text-xl font-bold text-pink-600">
                    ₹{o.totalAmount}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-3 border-t pt-4">
                  {o.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />

                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">₹{item.price}</p>
                    </div>
                  ))}
                </div>

                {/* Order Progress */}
                <div className="mt-6">
                  <p className="text-sm font-semibold mb-3">Order Progress</p>

                  <div className="flex justify-between items-center">
                    {[
                      "Pending",
                      "Processing",
                      "Shipped",
                      "Delivered",
                      "Cancelled",
                    ].map((stage, index) => {
                      const Icon = statusIcons[index];
                      const active = index <= getStatusStep(o.orderStatus);

                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center flex-1"
                        >
                          <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full border-4
                                ${
                                  active
                                    ? "bg-pink-600 text-white border-pink-600"
                                    : "border-gray-300 text-gray-400"
                                }`}
                          >
                            <Icon size={18} />
                          </div>

                          <p
                            className={`text-xs mt-2
                                ${active ? "text-pink-600" : "text-gray-400"}`}
                          >
                            {stage}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
