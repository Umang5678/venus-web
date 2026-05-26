import React from "react";
import Link from "next/link";

export default function ShippingAndDeliveryPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF6] pt-24 pb-28 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-10">
          <Link href="/" className="hover:text-gold transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-bold">Shipping & Delivery</span>
        </div>

        {/* Header */}
        <div className="border-b border-gray-150 pb-8 mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-primary leading-tight">
            Shipping & Delivery
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
            Last Updated: May 2026
          </p>
        </div>

        {/* Content */}
        <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-8">
          
          <section className="bg-amber-50/30 border border-amber-100/50 p-6 rounded-none space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber-800">Dispatch & Timeline</h2>
            <p className="font-medium text-amber-955">
              All orders are processed and shipped from our warehouse within **7 working days**. Once dispatched, standard shipping takes 3-5 business days depending on your delivery address.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Order Tracking</h2>
            <p>
              Once your shipment is dispatched, we will send an SMS and email notification containing your unique package tracking link. You can easily view shipment timelines on our tracking page:
            </p>
            <Link 
              href="/my-orders"
              className="inline-flex items-center gap-1 text-[10px] text-gold font-bold uppercase tracking-widest border border-gray-200 px-4 py-2 hover:border-black hover:text-black transition"
            >
              Track Your Order ➔
            </Link>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Shipping Charges</h2>
            <p>
              Free Standard Shipping is automatically applied to all domestic orders over **₹2000**. For orders below ₹2000, a flat shipping charge of ₹99 is added at checkout.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
