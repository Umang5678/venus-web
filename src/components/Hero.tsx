import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full relative">
      {/* Mobile Image */}
      <div className="block md:hidden">
        <Image
          src="/images/herom.jpg"
          alt="Hero Mobile"
          width={1080}
          height={1600}
          quality={100}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Desktop Image */}
      <div className="hidden md:block">
        <Image
          src="/images/herod1.png"
          alt="Hero"
          width={3840}
          height={1600}
          quality={100}
          priority
          className="w-full h-auto"
        />
      </div>

      {/* Vertical Text */}
      <div className="absolute -right-4 md:right-0 lg:-right-10 top-1/2 -translate-y-1/2">
        {/* Desktop Vertical */}
        <p className="hidden md:block text-white tracking-[10px] text-lg rotate-90">
          SEASONS · STYLE · SIGNATURES
        </p>

        {/* Mobile Horizontal */}
        <p className="md:hidden text-white text-xs tracking-[4px] rotate-90">
          SEASONS · STYLE · SIGNATURES
        </p>
      </div>
    </section>
  );
}
