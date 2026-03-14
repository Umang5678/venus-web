import { Star, Truck, Wallet, RefreshCcw, ShieldCheck } from "lucide-react";

export default function TrustFeatures() {
  const features = [
    { icon: Star, title: "BEST QUALITY" },
    { icon: Truck, title: "FREE DELIVERY" },
    { icon: Wallet, title: "CASH ON DELIVERY" },
    { icon: RefreshCcw, title: "EASY RETURN" },
    { icon: ShieldCheck, title: "SECURE PAYMENT" },
  ];

  return (
    <section className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center gap-2 text-gray-700"
              >
                <Icon size={28} strokeWidth={1.5} />

                <p className="text-xs tracking-widest font-medium">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
