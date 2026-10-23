"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  Tag, 
  Copy, 
  Check, 
  ShoppingBag, 
  Clock, 
  ArrowRight,
  ShieldCheck 
} from "lucide-react";
import { luxuryBundles } from "@/data/products";
import { useStore, Bundle } from "@/store/useStore";

export default function OffersSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { addBundleToCart, showToast, applyCoupon } = useStore();

  // Interactive Countdown Timer (Hours : Minutes : Seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyPromoCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    showToast(`✨ Promo code ${code} copied & applied to checkout!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleAddBundle = (bundle: Bundle) => {
    addBundleToCart(bundle);
    showToast(`✨ ${bundle.name} added to your cart with ₹${bundle.savings.toLocaleString("en-IN")} savings!`);
  };

  const promoCodes = [
    { code: "RIYA10", desc: "10% Off Any Order", min: "No Minimum" },
    { code: "LUXURY15", desc: "15% Off Cart Above ₹1,499", min: "Cart ₹1,499+" },
    { code: "DIVINE20", desc: "20% Off Orders Above ₹2,499", min: "Cart ₹2,499+" },
  ];

  return (
    <section id="bundles" className="py-14 sm:py-20 bg-[#F8F4EC] border-b border-[#EAE5DF] relative overflow-hidden">
      
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#F4E1D2]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#FFFFFF]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header with Countdown Timer */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#D4AF37]/50 shadow-xs mb-3">
            <Sparkles size={13} className="text-[#D4AF37]" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#9A7B2C]">
              Limited-Time Consecration Window
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#2C2A29] tracking-wide mb-3">
            Curated Luxury Bundles & Tiered Offers
          </h2>

          <p className="text-xs sm:text-sm text-[#6E6A64] max-w-xl mx-auto leading-relaxed">
            Harness complementary gemstone frequencies. Each bundled set is synergistically energized with Vedic Mantras and includes our complimentary lab certification.
          </p>

          {/* Interactive Countdown Timer in Pearl-White Glass Boxes with Gold Borders */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6">
            <div className="flex flex-col items-center">
              <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#FFFFFF] border-2 border-[#D4AF37] shadow-[0_4px_16px_rgba(212,175,55,0.18)] flex items-center justify-center font-serif text-lg sm:text-2xl font-bold text-[#2C2A29]">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-[#6E6A64] tracking-wider mt-1">
                Hours
              </span>
            </div>

            <span className="font-serif text-xl sm:text-2xl font-bold text-[#D4AF37] -mt-4">:</span>

            <div className="flex flex-col items-center">
              <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#FFFFFF] border-2 border-[#D4AF37] shadow-[0_4px_16px_rgba(212,175,55,0.18)] flex items-center justify-center font-serif text-lg sm:text-2xl font-bold text-[#2C2A29]">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-[#6E6A64] tracking-wider mt-1">
                Minutes
              </span>
            </div>

            <span className="font-serif text-xl sm:text-2xl font-bold text-[#D4AF37] -mt-4">:</span>

            <div className="flex flex-col items-center">
              <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#FFFFFF] border-2 border-[#D4AF37] shadow-[0_4px_16px_rgba(212,175,55,0.18)] flex items-center justify-center font-serif text-lg sm:text-2xl font-bold text-[#2C2A29]">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-[#6E6A64] tracking-wider mt-1">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Click-to-Copy Promo Code Pills */}
        <div className="mb-10 sm:mb-12">
          <div className="p-4 sm:p-5 rounded-3xl bg-[#FFFFFF] border border-[#EAE5DF] shadow-xs max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F8F4EC] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                <Tag size={16} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-[#2C2A29]">
                  Instant Promo Coupons
                </h4>
                <p className="text-[11px] text-[#6E6A64]">
                  Tap any coupon to copy & auto-apply discount to your bag:
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {promoCodes.map((p) => {
                const isCopied = copiedCode === p.code;
                return (
                  <button
                    key={p.code}
                    onClick={() => copyPromoCode(p.code)}
                    className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer touch-press ${
                      isCopied
                        ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                        : "bg-[#FAF9F6] border-[#D4AF37]/50 text-[#2C2A29] hover:bg-[#F8F4EC] hover:border-[#D4AF37]"
                    }`}
                  >
                    {isCopied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} className="text-[#9A7B2C]" />}
                    <span className="font-bold tracking-wider">{p.code}</span>
                    <span className="text-[10px] text-[#6E6A64]">({p.desc.split(" ")[0]})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Curated Bundle Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {luxuryBundles.map((bundle) => {
            return (
              <div
                key={bundle.id}
                className="rounded-3xl bg-[#FFFFFF] border border-[#EAE5DF] hover:border-[#D4AF37]/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail & Badges */}
                  <div className="relative aspect-[4/3] w-full bg-[#FAF9F6] overflow-hidden">
                    <Image
                      src={bundle.image}
                      alt={bundle.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Savings Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F8F4EC]/95 backdrop-blur-md text-[#9A7B2C] border border-[#D4AF37]/50 shadow-xs">
                        {bundle.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 z-10">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
                        Save ₹{bundle.savings.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="font-serif text-base sm:text-lg font-semibold text-[#2C2A29] leading-snug">
                      {bundle.name}
                    </h3>

                    <p className="text-xs text-[#6E6A64] leading-relaxed">
                      {bundle.tagline}
                    </p>

                    {/* Included Items Checklist */}
                    <div className="p-3 rounded-2xl bg-[#FAF9F6] border border-[#EAE5DF] space-y-1.5 text-[11px] text-[#2C2A29]">
                      <span className="font-semibold text-[#9A7B2C] block uppercase text-[10px] tracking-wider mb-0.5">
                        Bundle Inclusions:
                      </span>
                      {bundle.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 truncate">
                          <Check size={12} className="text-[#D4AF37] flex-shrink-0" />
                          <span className="truncate">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing & 1-Click CTA */}
                <div className="p-5 sm:p-6 pt-0 space-y-3">
                  <div className="flex items-baseline justify-between pt-3 border-t border-[#EAE5DF]">
                    <div>
                      <span className="text-xs text-[#6E6A64] block">Bundle Price:</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg sm:text-xl font-bold text-[#2C2A29]">
                          ₹{bundle.bundlePrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-[#6E6A64] line-through">
                          ₹{bundle.comparePrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                      100% Insured Shipping
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddBundle(bundle)}
                    className="w-full py-3 px-4 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2C2A29] btn-gold-shimmer flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <ShoppingBag size={14} className="text-[#2C2A29]" />
                    <span>Add Bundle to Bag</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
