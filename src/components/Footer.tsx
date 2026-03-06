import React from "react";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#574656] text-white py-10">
      <div className="container mx-auto px-4">
        {/* Logo / Social Icons */}
        <div className="flex flex-row justify-center items-center gap-6 mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-purple-900 font-bold">
            <Facebook className="w-6 h-6" />
          </div>
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-purple-900 font-bold">
            <Instagram className="w-6 h-6" />
          </div>
        </div>

        {/* Business Name */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6"
          style={{ fontFamily: "Playfair_Display" }}
        >
          VENUS FASHION
        </h2>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-gray-200 mb-6">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-white" />
            <span className="text-sm sm:text-base">+91 7043865388</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-white" />
            <span className="text-sm sm:text-base">
              thedreamchapters.events@gmail.com
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-400 pt-4 text-center text-sm sm:text-base">
          <p>Copyright © Venus Fashion - {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
