import React from "react";
import Link from "next/link";

export default function ReturnAndExchangePage() {
  return (
    <div className="min-h-screen bg-[#FCFAF6] pt-24 pb-28 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-10">
          <Link href="/" className="hover:text-gold transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-bold">Return & Exchange Policy</span>
        </div>

        {/* Header */}
        <div className="border-b border-gray-150 pb-8 mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-primary leading-tight">
            Return & Exchange
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
            Last Updated: May 2026
          </p>
        </div>

        {/* Content */}
        <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-8">
          
          <section className="bg-red-50/50 border border-red-100 p-6 rounded-none space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-red-700">No Return & No Exchange Policy</h2>
            <p className="text-red-900 font-medium">
              We maintain a strict **No Return – No Exchange** policy. All sales finalized on our store are final and cannot be returned, exchanged, or replaced.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Why All Sales are Final</h2>
            <p>
              VenusFashion delivers handcrafted designer wear, luxury Indian apparel, and unique boutique items. Due to the high-end nature of the materials, tailored cuts, and hygiene standards of premium apparel, we are unable to accept returns or process exchanges once items leave our facility.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Need Help with Sizes?</h2>
            <p>
              To prevent issues with fits, please review our interactive **Find Your Fit** calculator and size metrics shown on every product page prior to checkouts. If you have questions before ordering, feel free to contact us:
            </p>
            <Link 
              href="/contact-us"
              className="inline-flex items-center gap-1 text-[10px] text-gold font-bold uppercase tracking-widest border border-gray-200 px-4 py-2 hover:border-black hover:text-black transition"
            >
              Contact Support ➔
            </Link>
          </section>

        </div>
      </div>
    </div>
  );
}
