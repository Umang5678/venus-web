import React from "react";
import Link from "next/link";

export default function CancellationAndRefundPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF6] pt-24 pb-28 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-10">
          <Link href="/" className="hover:text-gold transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-bold">Cancellation & Refund Policy</span>
        </div>

        {/* Header */}
        <div className="border-b border-gray-150 pb-8 mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-primary leading-tight">
            Cancellation & Refund Policy
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
            Last Updated: May 2026
          </p>
        </div>

        {/* Content */}
        <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-8">
          
          <section className="bg-red-50/50 border border-red-100 p-6 rounded-none space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-red-700">Strict Non-Cancellation Policy</h2>
            <p className="text-red-900 font-medium">
              We do not accept cancellations once an order has been placed. All checkouts are final. Please review your cart details, sizes, and quantities carefully before making payments.
            </p>
          </section>

          <section className="bg-amber-50/30 border border-amber-100/50 p-6 rounded-none space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber-800">Refund Terms</h2>
            <p className="text-amber-900 font-medium">
              No refunds will be issued for any products. Due to the limited nature and handcrafted quality of our designer apparel, we maintain a strict NO-REFUND policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Exceptions</h2>
            <p>
              In rare circumstances where an incorrect or severely damaged item is received, contact our service team at{" "}
              <a href="mailto:patelhiren18624@gmail.com" className="text-gold font-semibold hover:underline">
                patelhiren18624@gmail.com
              </a> within 24 hours of delivery. All claims must be accompanied by photos of the package and an uncut unpacking video.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
