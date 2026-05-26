import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF6] pt-24 pb-28 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-10">
          <Link href="/" className="hover:text-gold transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-bold">Privacy Policy</span>
        </div>

        {/* Header */}
        <div className="border-b border-gray-150 pb-8 mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-primary leading-tight">
            Privacy Policy
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
            Last Updated: May 2026
          </p>
        </div>

        {/* Content */}
        <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-8">
          
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">1. Information Collection</h2>
            <p>
              We collect personal information when you use our website, place an order, or subscribe to our newsletter. This details may include your name, shipping/billing address, phone number, email address, and billing details.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">2. Use of Information</h2>
            <p>
              Your personal data is used to process transactions, manage shipments, customize your shopping experience, and inform you about promotions or website upgrades. We do not sell or trade your details to outside marketing agencies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">3. Checkout & Data Protection</h2>
            <p>
              We utilize secure socket layer (SSL) certificates and premium encrypted gateways to process your payments safely. Sensitive transactions (credit cards, NetBanking, UPI) are managed directly by certified payment processors, and we do not store your raw payment details on our servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">4. Cookies Policy</h2>
            <p>
              Cookies are small files stored on your hard drive that help us identify your browser and remember items in your shopping bag. You can disable cookies in your browser settings, though some key storefront functions may cease to function correctly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">5. Contacting Us</h2>
            <p>
              If you have queries regarding this privacy statement, please email us directly at{" "}
              <a href="mailto:patelhiren18624@gmail.com" className="text-gold font-semibold hover:underline">
                patelhiren18624@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
