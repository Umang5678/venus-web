import React from "react";
import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF6] pt-24 pb-28 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-10">
          <Link href="/" className="hover:text-gold transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-bold">Terms & Conditions</span>
        </div>

        {/* Header */}
        <div className="border-b border-gray-150 pb-8 mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-primary leading-tight">
            Terms & Conditions
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
            Last Updated: May 2026
          </p>
        </div>

        {/* Content */}
        <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-8">
          
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">1. Website Use</h2>
            <p>
              By accessing and purchasing from VenusFashion, you agree to comply with our commercial terms and use guidelines. You represent that you are of legal age in your jurisdiction to utilize online payment methods.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">2. Pricing & Orders</h2>
            <p>
              We reserves the right to change prices and cancel orders at our discretion due to pricing errors, stock discrepancies, or suspected fraudulent activity. If an order is canceled after charge, a full reversal will be processed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">3. Intellectual Property</h2>
            <p>
              All graphics, custom designs, text, brand names, and source scripts on this site are the intellectual property of VenusFashion and Zivore Apparel Private Limited. Unauthorized duplication is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">4. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by and construed in accordance with the laws of India, under the jurisdiction of Uttar Pradesh courts.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
