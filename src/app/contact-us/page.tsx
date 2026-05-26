"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Instagram, Facebook, ChevronDown, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      toast.success("Thank you! Your message has been received.");
      setFormData({ name: "", email: "", message: "" });
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FCFAF6] pt-24 pb-28 font-sans text-gray-900 overflow-x-hidden">
      
      {/* Visual Background Accent Blurs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-purple-100/20 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Breadcrumbs */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.25em] mb-12"
        >
          <Link href="/" className="hover:text-gold transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-bold">Contact Us</span>
        </motion.div>

        {/* Dynamic Entry Animation Wrapper */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] text-gold font-bold uppercase tracking-[0.3em]">Connect With Us</span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-primary leading-tight">
              Get in Touch
            </h1>
            <p className="text-xs text-gray-400 font-medium tracking-widest leading-relaxed uppercase">
              We would love to hear from you. Reach out for styling advice, order details, or just to say hello.
            </p>
            <div className="w-12 h-[1px] bg-gold/50 mx-auto pt-2"></div>
          </motion.div>

          {/* Core Interactive Layout Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Contact Info (5 columns) */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
              <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400 mb-6">
                Customer Services
              </h2>

              {/* Email Card */}
              <motion.a 
                href="mailto:patelhiren18624@gmail.com"
                whileHover={{ y: -4 }}
                className="block p-6 bg-white/60 backdrop-blur-md border border-gray-100/50 shadow-sm hover:shadow-md transition-all duration-300 relative group cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-[2px] h-full bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/5 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h3 className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Email Address</h3>
                    <p className="text-xs font-semibold text-gray-900 mt-1 break-all">venusfashion@gmail.com</p>
                  </div>
                </div>
              </motion.a>

              {/* Phone Card */}
              <motion.a 
                href="tel:+918460221739"
                whileHover={{ y: -4 }}
                className="block p-6 bg-white/60 backdrop-blur-md border border-gray-100/50 shadow-sm hover:shadow-md transition-all duration-300 relative group cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-[2px] h-full bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/5 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h3 className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Call or Whatsapp</h3>
                    <p className="text-xs font-semibold text-gray-900 mt-1">+91 7043 865 388</p>
                  </div>
                </div>
              </motion.a>

              {/* Hours Card */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="p-6 bg-white/60 backdrop-blur-md border border-gray-100/50 shadow-sm transition-all duration-300 relative group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/5 text-gold flex items-center justify-center">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h3 className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Operational Hours</h3>
                    <p className="text-xs font-semibold text-gray-900 mt-1">Mon - Sun: 09:00 AM – 08:00 PM</p>
                  </div>
                </div>
              </motion.div>

              {/* Social Channels */}
              <div className="pt-4 space-y-4">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Social Channels</h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/venusfashion2020"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 bg-white border border-gray-100 hover:border-gold hover:bg-gold hover:text-white text-gray-800 transition shadow-sm"
                  >
                    <Instagram size={18} />
                  </a>
              
                </div>
              </div>

            </motion.div>

            {/* Right: Modern Form (7 columns) */}
            <motion.div 
              variants={itemVariants} 
              className="lg:col-span-7 bg-white border border-gray-100/80 p-8 sm:p-10 shadow-sm relative"
            >
              <h2 className="font-serif text-2xl font-light tracking-wide text-primary mb-8">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Name Input */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={`absolute left-0 transition-all duration-300 text-[10px] uppercase tracking-widest ${
                      focusedField === "name" || formData.name
                        ? "-top-4 text-gold font-bold"
                        : "top-2 text-gray-400 font-medium"
                    }`}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-250 py-2.5 text-xs font-semibold text-black outline-none focus:border-gold transition-colors"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className={`absolute left-0 transition-all duration-300 text-[10px] uppercase tracking-widest ${
                      focusedField === "email" || formData.email
                        ? "-top-4 text-gold font-bold"
                        : "top-2 text-gray-400 font-medium"
                    }`}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-255 py-2.5 text-xs font-semibold text-black outline-none focus:border-gold transition-colors"
                  />
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`absolute left-0 transition-all duration-300 text-[10px] uppercase tracking-widest ${
                      focusedField === "message" || formData.message
                        ? "-top-4 text-gold font-bold"
                        : "top-2 text-gray-400 font-medium"
                    }`}
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-255 py-2.5 text-xs font-semibold text-black outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                {/* Luxury Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto min-w-[160px] bg-black hover:bg-gold hover:text-white text-white py-4 px-8 text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-500 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>{submitting ? "Sending..." : "Submit Message"}</span>
                  {!submitting && <ArrowRight size={14} />}
                </button>

              </form>
            </motion.div>

          </div>

          {/* Interactive Expandable Google Map Section */}
          <motion.div variants={itemVariants} className="pt-4">
            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setShowMap(!showMap)}
                className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-[#FCFAF6] transition-colors cursor-pointer text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/5 text-gold flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-light tracking-wide text-primary">Shop Location</h3>
                    <p className="text-[10px] text-gray-400 font-semibold tracking-wider mt-0.5 uppercase">
                    101 Saket Tower, Nikol, Ahmedabad - 380049
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] text-gold font-bold uppercase tracking-widest hidden sm:inline">
                    {showMap ? "Hide Map" : "Reveal Map"}
                  </span>
                  <motion.div
                    animate={{ rotate: showMap ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-500"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {showMap && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-gray-100"
                  >
                    <div className="p-6 md:p-8 bg-[#FCFAF6] flex flex-col md:flex-row gap-6 items-start">
                      
                      {/* Map info description */}
                      <div className="w-full md:w-1/3 space-y-4">
                        <h4 className="font-serif text-md font-normal text-primary">Address Details</h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                          101 Saket Tower nr. Pani ni tanki, opp. Bhojaldham Residency, Nikol, Ahmedabad, Gujarat 380049
                        </p>
                        <a
                          href="https://maps.google.com/?q=style+in+budget+shop,+nr.+Pani+ni+tanki,+opp.+Bhojaldham+Residency,+Nikol,+Ahmedabad,+Gujarat+380049"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[9px] text-gold hover:text-black font-bold uppercase tracking-widest border border-gray-200 px-4 py-2 hover:border-black transition-colors"
                        >
                          Get Directions ↗
                        </a>
                      </div>

                      {/* Map iframe */}
                      <div className="w-full md:w-2/3 h-[300px] border border-gray-150 relative bg-gray-100">
                        <iframe
                          src="https://maps.google.com/maps?q=style%20in%20budget%20shop,%20opp.%20Bhojaldham%20Residency,%20Nikol,%20Ahmedabad,%20Gujarat%20380049&t=&z=16&ie=UTF8&iwloc=&output=embed"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="VenusFashion Shop Map Location"
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
