import React from "react";
import { Star, Truck, Sparkles, ShieldCheck } from "lucide-react";

export default function TrustFeatures() {
  const features = [
    {
      icon: Star,
      title: "BEST QUALITY",
      desc: "Handcrafted Premium Apparel",
    },
    {
      icon: Truck,
      title: "FREE DELIVERY",
      desc: "On All Domestic Orders",
    },
    {
      icon: Sparkles,
      title: "EXCLUSIVE DESIGNS",
      desc: "Unique Curated Fashion",
    },
    {
      icon: ShieldCheck,
      title: "SECURE PAYMENT",
      desc: "100% Encrypted Transactions",
    },
  ];

  return (
    <section className="bg-[#FCFAF6] py-12 md:py-16 border-t border-b border-gray-100/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 text-center">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className={`flex flex-col items-center justify-center p-4 transition-transform duration-300 hover:-translate-y-1.5 relative group ${
                  i < 3 ? "lg:border-r lg:border-gray-200/60" : ""
                }`}
              >
                {/* Gold Styled Icon Wrapper */}
                <div className="mb-4 text-gold group-hover:scale-110 transition-transform duration-300">
                  <Icon size={32} strokeWidth={1.2} />
                </div>

                {/* Title */}
                <h3 className="text-[10px] sm:text-xs tracking-[0.25em] font-semibold text-gray-800 uppercase">
                  {item.title}
                </h3>

                {/* Subtitle description */}
                <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium tracking-wide uppercase mt-1">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
