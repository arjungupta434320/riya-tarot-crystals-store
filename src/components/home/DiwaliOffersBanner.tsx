"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  Tag, 
  Copy, 
  Check, 
  Flame, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Gift, 
  Coins, 
  ShieldCheck,
  Clock
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";

interface DiwaliSlide {
  id: string;
  badge: string;
  badgeIcon: React.ReactNode;
  title: string;
  highlight: string;
  description: string;
  code: string;
  discount: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export function DiwaliOffersBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { applyCoupon, showToast } = useStore();

  // Festive countdown timer (Hours : Minutes : Seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 9,
    minutes: 48,
    seconds: 24,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const slides: DiwaliSlide[] = [
    {
      id: "dhanteras-wealth",
      badge: "DHANTERAS & LAKSHMI PUJA SPECIAL",
      badgeIcon: <Coins size={13} className="text-[#D4AF37]" />,
      title: "Flat 20% OFF",
      highlight: "Wealth & Prosperity Stones",
      description: "Natural Pyrite & Citrine bracelets pre-energized with 108 Kuber Beej Mantras to invite Maa Lakshmi's blessings.",
      code: "DIWALI20",
      discount: "20% OFF",
      image: "/images/diwali-wealth-banner.jpg",
      ctaText: "Shop Wealth Curations",
      ctaLink: "/shop?category=Money+and+abundance",
    },
    {
      id: "shubh-diwali-free-gift",
      badge: "SHUBH DEEPAVALI MAHA PRASAD",
      badgeIcon: <Gift size={13} className="text-[#E07A5F]" />,
      title: "FREE Selenite Charging Plate",
      highlight: "+ Holy Raksha Sutra (Worth ₹699)",
      description: "Auto-unlocked with free express shipping on all sacred Diwali orders above ₹999.",
      code: "DIVINE10",
      discount: "10% EXTRA",
      image: "/images/diwali-banner.jpg",
      ctaText: "Claim Free Selenite Gift",
      ctaLink: "/shop",
    },
    {
      id: "diwali-protection",
      badge: "FESTIVE PROTECTION COMBO",
      badgeIcon: <ShieldCheck size={13} className="text-[#7B4FC9]" />,
      title: "Buy 2 Get Extra 15% OFF",
      highlight: "Aura Cleansing & Evil Eye Shield",
      description: "Purify festive gatherings with authentic Black Tourmaline, Amethyst & Himalayan Raw Clusters.",
      code: "LUXURY15",
      discount: "15% OFF",
      image: "/images/products/amethyst-new.jpg",
      ctaText: "Shop Protection Stones",
      ctaLink: "/shop?category=Protection",
    },
  ];

  // Auto-play slideshow every 5.5s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    showToast(`🪔 Coupon ${code} copied & applied to checkout!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const slide = slides[currentSlide];

  return (
    <div 
      className="relative w-full rounded-3xl overflow-hidden border border-[#C9A24D]/50 bg-gradient-to-b from-[#FFFDF9] via-white to-[#FBF7F0] shadow-[0_16px_50px_rgba(201,162,77,0.18)] transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Auspicious Festive Announcement Ribbon */}
      <div className="bg-gradient-to-r from-[#8E2800] via-[#C9A24D] to-[#8E2800] text-white px-4 py-2 flex items-center justify-between text-xs font-semibold shadow-xs">
        <div className="flex items-center gap-1.5 tracking-wider uppercase text-[10px] sm:text-xs">
          <span className="text-sm">🪔</span>
          <span>Shubh Diwali Mahotsav Sale</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] sm:text-xs font-mono bg-black/25 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
          <Clock size={11} className="text-[#FFD700]" />
          <span>Ends in: {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s</span>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="relative p-5 sm:p-7 flex flex-col justify-between min-h-[360px] sm:min-h-[390px]">
        {/* Soft Decorative Ambient Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24D]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F4C6D0]/20 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="space-y-4 relative z-10"
          >
            {/* Slide Category Badge */}
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#C9A24D]/40 text-[#8E6D24] text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                {slide.badgeIcon}
                <span>{slide.badge}</span>
              </span>

              {/* Discount Tag */}
              <span className="px-2.5 py-0.5 rounded-full bg-[#8E2800] text-[#FFD700] text-[10px] sm:text-xs font-extrabold tracking-wider uppercase shadow-xs">
                {slide.discount}
              </span>
            </div>

            {/* Slide Image with Luxury Beveled Frame */}
            <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-[#EFE9E2] shadow-md group">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating In-Image Price & Offer Overlay */}
              <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white pointer-events-none">
                <div>
                  <span className="text-[10px] font-semibold text-[#FFD700] uppercase tracking-wider block">
                    Vedic Cleansed & Energized
                  </span>
                  <span className="text-xs sm:text-sm font-bold font-serif drop-shadow-md">
                    100% Certified Natural Stones
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                  <Sparkles size={14} className="text-[#FFD700]" />
                </div>
              </div>
            </div>

            {/* Title & Copy */}
            <div className="space-y-1 text-left">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2B1B3D] leading-snug">
                {slide.title}{" "}
                <span className="text-[#8E2800] italic font-serif">
                  — {slide.highlight}
                </span>
              </h3>
              <p className="text-xs text-[#635572] leading-relaxed line-clamp-2">
                {slide.description}
              </p>
            </div>

            {/* Coupon Code Strip + Action Button */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {/* Click-to-Copy Coupon Button */}
              <button
                type="button"
                onClick={() => handleCopyCode(slide.code)}
                className="flex-1 py-2.5 px-3.5 rounded-xl border-2 border-dashed border-[#C9A24D] bg-[#FFFBF2] hover:bg-[#FAF3E0] transition-colors flex items-center justify-between gap-2 text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-[#C9A24D]" />
                  <span className="text-xs font-mono font-bold text-[#8E6D24]">
                    Code: <strong className="text-[#8E2800]">{slide.code}</strong>
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#7B4FC9] group-hover:text-[#5B32A3]">
                  {copiedCode === slide.code ? (
                    <>
                      <Check size={12} className="text-emerald-600" />
                      <span className="text-emerald-600">Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Tap to Apply</span>
                    </>
                  )}
                </span>
              </button>

              {/* Direct Shop CTA */}
              <Link
                href={slide.ctaLink}
                className="py-2.5 px-5 rounded-xl text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#8E2800] via-[#C9A24D] to-[#8E2800] hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-md text-center"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls & Dots */}
        <div className="pt-4 flex items-center justify-between border-t border-[#EFE9E2]/70 mt-3 relative z-10">
          {/* Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((s, index) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all rounded-full cursor-pointer ${
                  currentSlide === index
                    ? "w-6 h-2 bg-[#8E2800]"
                    : "w-2 h-2 bg-[#D4AF37]/40 hover:bg-[#D4AF37]"
                }`}
              />
            ))}
          </div>

          {/* Left/Right Slide Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              aria-label="Previous slide"
              className="w-7 h-7 rounded-full bg-white border border-[#EFE9E2] hover:border-[#C9A24D] text-[#635572] hover:text-[#2B1B3D] flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              aria-label="Next slide"
              className="w-7 h-7 rounded-full bg-white border border-[#EFE9E2] hover:border-[#C9A24D] text-[#635572] hover:text-[#2B1B3D] flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
