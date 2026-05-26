import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#483747] text-white pt-16 pb-10 border-t border-gray-100/10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (5 columns) */}
          <div className="md:col-span-5 space-y-6">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-widest text-white"
              style={{ fontFamily: "Playfair_Display" }}
            >
              VENUS FASHION
            </h2>
            <p className="text-xs text-gray-300 max-w-sm leading-relaxed uppercase tracking-wider">
              Exquisite Indian Luxury Apparel & Contemporary Designer Styles. Handcrafted with love.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.facebook.com/venusfashion"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white hover:text-[#483747] transition-all"
                aria-label="Facebook Link"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/venusfashion2020"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white hover:text-[#483747] transition-all"
                aria-label="Instagram Link"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Menu Links (3 columns) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Navigation</h3>
            <ul className="space-y-2.5 text-xs font-medium text-gray-300 tracking-wider">
              <li>
                <Link href="/" className="hover:text-gold transition">HOME</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gold transition">PRODUCTS</Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-gold transition">CONTACT US</Link>
              </li>
            </ul>
          </div>

          {/* Policy Links (4 columns) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Customer Care</h3>
            <ul className="space-y-2.5 text-xs font-medium text-gray-300 tracking-wider">
              <li>
                <Link href="/privacy-policy" className="hover:text-gold transition">PRIVACY POLICY</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-gold transition">TERMS & CONDITIONS</Link>
              </li>
              <li>
                <Link href="/cancellation-and-refund" className="hover:text-gold transition">CANCELLATION & REFUND</Link>
              </li>
              <li>
                <Link href="/shipping-and-delivery" className="hover:text-gold transition">SHIPPING & DELIVERY</Link>
              </li>
              <li>
                <Link href="/return-and-exchange" className="hover:text-gold transition">RETURN & EXCHANGE</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Contacts & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold" />
              <span>+91 7043865388</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold" />
              <span>thedreamchapters.events@gmail.com</span>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 tracking-widest uppercase">
            Copyright © Venus Fashion - {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
