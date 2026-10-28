"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Heart, 
  ShoppingBag, 
  Eye, 
  Search, 
  Check, 
  ArrowRight, 
  Award,
  Compass, 
  Moon,
  Flame,
  Droplet,
  CheckCircle2,
  Clock,
  Briefcase,
  Coins,
  Flower2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProducts } from "@/data/products";
import { Product, useStore } from "@/store/useStore";
import { ChakraExplorer } from "@/components/home/ChakraExplorer";
import { TiltCard } from "@/components/animations/TiltCard";
import { Magnetic } from "@/components/animations/Magnetic";

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const { addToCart, wishlist, toggleWishlist, showToast } = useStore();

  useEffect(() => {
    fetchProducts().then(setAllProducts);
  }, []);

  const bestSellers = allProducts
    .filter((p) => p.badge?.toLowerCase().includes("bestseller") || p.rating >= 4.96)
    .slice(0, 6);

  const handleProductAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    addToCart(product, 1, "8mm");
    setJustAddedId(product.id);
    showToast(`✨ Added ${product.name} to sacred bag!`);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  const faqs = [
    {
      q: "Which wrist should I wear my energized crystal bracelet on?",
      a: "In Vedic and metaphysical tradition: wear on your Left Wrist for receptive internal healing, emotional calm, love, and intuitive absorption. Wear on your Right Wrist for proactive outward manifestation, sales confidence, executive willpower, and shielding against negative evil eye."
    },
    {
      q: "How are your bracelets energized and consecrated?",
      a: "Every bracelet undergoes our 4-stage ritual: 1. Ultrasonic Himalayan rock salt cleansing, 2. Sunlight / Full Moon cosmic charging, 3. 108 Vedic Mantra Japa & Prana Pratishtha by certified temple priests, and 4. Sealed in holy airtight packaging with consecrated Raksha Sutra thread."
    },
    {
      q: "Can I wear multiple crystal bracelets together?",
      a: "Yes! Crystals harmoniously synergize when their energetic intentions align. For example, pairing Rose Quartz (Heart Love) with Black Tourmaline (Root Protection) or Citrine (Wealth) with Pyrite (Grounding) creates a balanced, multi-dimensional circuit."
    },
    {
      q: "What does it mean if my bracelet breaks unexpectedly?",
      a: "A suddenly broken crystal is never bad luck; it signifies that the stone took a heavy energetic blow, psychic envy, or karmic impediment on your behalf. Thank the crystal silently, return the beads to nature in garden soil, and acquire a fresh talisman."
    },
    {
      q: "Are all stones guaranteed 100% natural and untreated?",
      a: "Yes, 100%. We source exclusively Grade-A raw minerals directly from certified mines in Brazil, Madagascar, Sri Lanka, and Rajasthan. We never use dyed glass, synthetic resin, or heat-altered plastic."
    }
  ];

  return (
    <div className="bg-[#FBF8F3] text-[#2B1B3D] overflow-x-hidden selection:bg-[#F4C6D0] selection:text-[#2B1B3D]">
      
      {/* 1. HERO SECTION: 3D HERO CRYSTAL + DUAL CTAs */}
      <section className="relative min-h-[92vh] flex items-center pt-6 pb-16 sm:py-20 border-b border-[#EFE9E2] overflow-hidden bg-gradient-to-b from-[#FBF8F3] via-white to-[#FBF8F3]">
        
        {/* Soft Ambient Aurora Gradient Blobs */}
        <div className="absolute top-10 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-[#CDB9F5]/25 rounded-full blur-3xl pointer-events-none animate-aurora" />
        <div className="absolute bottom-10 right-10 w-80 sm:w-96 h-80 sm:h-96 bg-[#F4C6D0]/20 rounded-full blur-3xl pointer-events-none animate-aurora" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C9A24D]/40 shadow-xs">
              <Sparkles size={13} className="text-[#C9A24D]" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#8E6D24]">
                Certified Vedic Astrologer & Tarot Reader Curation
              </span>
            </div>

            {/* Accessible SEO Heading */}
            <h1 className="sr-only">
              The Vedic Studio | Authentic Healing Crystals & Sacred Bracelets Energized for Wealth, Peace & Protection
            </h1>

            {/* HERO IMAGE CONTAINER: Space left blank for adding custom hero images / banner */}
            <div 
              id="hero-images-container" 
              className="w-full min-h-[260px] sm:min-h-[380px] md:min-h-[460px] rounded-3xl flex items-center justify-center relative my-4 transition-all"
            >
              {/* Space left blank for hero images */}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto pt-1">
              <div className="p-3 rounded-2xl bg-white border border-[#EFE9E2] text-center shadow-xs">
                <Award size={18} className="mx-auto text-[#C9A24D] mb-1" />
                <span className="block text-xs sm:text-sm font-bold text-[#2B1B3D]">100% Natural</span>
                <span className="text-[9px] sm:text-[10px] text-[#635572] uppercase tracking-wider block">Authentically Sourced</span>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-[#EFE9E2] text-center shadow-xs">
                <Compass size={18} className="mx-auto text-[#7B4FC9] mb-1" />
                <span className="block text-xs sm:text-sm font-bold text-[#2B1B3D]">Bespoke</span>
                <span className="text-[9px] sm:text-[10px] text-[#635572] uppercase tracking-wider block">Vedic Energized</span>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-[#EFE9E2] text-center shadow-xs">
                <div className="flex items-center justify-center text-[#C9A24D] gap-0.5 mb-1 font-bold text-xs sm:text-sm">
                  <Star size={14} className="fill-[#C9A24D] text-[#C9A24D]" />
                  <span>4.9★</span>
                </div>
                <span className="block text-xs sm:text-sm font-bold text-[#2B1B3D]">14,000+</span>
                <span className="text-[9px] sm:text-[10px] text-[#635572] uppercase tracking-wider block">Blessed Souls</span>
              </div>
            </div>

            {/* Dual CTAs with Magnetic Effect */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
              <Magnetic strength={0.25}>
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white btn-amethyst flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Shop All Bracelets</span>
                  <ArrowRight size={14} />
                </Link>
              </Magnetic>

              <Magnetic strength={0.25}>
                <Link
                  href="/quiz"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2B1B3D] btn-pearl-gold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Sparkles size={14} className="text-[#C9A24D]" />
                  <span>Find My Crystal — Take Quiz</span>
                </Link>
              </Magnetic>
            </div>

            {/* Bestseller Floating Strip */}
            <div className="pt-2 flex items-center justify-center">
              <Link
                href="/shop"
                className="p-2.5 pr-4 rounded-2xl bg-white border border-[#C9A24D]/40 shadow-[0_8px_25px_rgba(201,162,77,0.12)] flex items-center gap-3 max-w-sm hover:border-[#C9A24D] transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden relative flex-shrink-0 bg-[#FAF8F3]">
                  <Image
                    src="/images/products/money-maker.jpg"
                    alt="Triple Synergy Mixed Abundance"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#F5F0FD] text-[#7B4FC9] font-bold border border-[#7B4FC9]/30">
                      Top Bestseller
                    </span>
                    <span className="text-[9px] text-[#2E7D32] font-semibold truncate">Vedic Cleansed</span>
                  </div>
                  <span className="text-xs font-bold text-[#2B1B3D] block truncate">Triple Synergy Mixed Abundance</span>
                  <span className="text-[11px] text-[#635572]">₹1,499 <del className="text-[#9588A3]">₹2,999</del></span>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MARQUEE TICKER STRIP */}
      <div className="w-full max-w-full bg-[#FAF8F3] py-3 border-b border-[#EFE9E2] overflow-hidden min-w-0">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-xs font-semibold uppercase tracking-widest text-[#2B1B3D]">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-6">
              <span>Healed</span>
              <Sparkles size={12} className="text-[#C9A24D]" />
              <span>Energized</span>
              <Sparkles size={12} className="text-[#C9A24D]" />
              <span>Authentic</span>
              <Sparkles size={12} className="text-[#C9A24D]" />
              <span>Handcrafted</span>
              <Sparkles size={12} className="text-[#C9A24D]" />
              <span>108 Mantra Japa</span>
              <Sparkles size={12} className="text-[#C9A24D]" />
            </span>
          ))}
        </div>
      </div>

      {/* 3. CATEGORY COLLECTION TILES (LOGOS & COMPACT MOBILE GRID) */}
      <section className="py-12 sm:py-20 bg-white border-b border-[#EFE9E2]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8E6D24] mb-2 block">
              Sacred Collections
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#2B1B3D] font-bold tracking-tight mb-2 sm:mb-3">
              Curated by Sacred Intention
            </h2>
            <p className="text-xs sm:text-sm text-[#635572] leading-relaxed">
              Explore our authentically sourced gemstone bracelets consecrated with 108 Vedic mantras for specific life transformations.
            </p>
          </div>

          {/* Compact 2-column mobile & 3-column desktop grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            
            {/* 1. Love & Relationship */}
            <TiltCard>
              <Link
                href="/shop?category=Love+and+relationship"
                className="group h-full p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#EFE9E2] bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF8F3] hover:border-[#F4C6D0] hover:shadow-xl transition-all flex flex-col justify-between block cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#D45D79] shadow-2xs group-hover:scale-110 transition-transform">
                    <Heart size={20} className="sm:w-6 sm:h-6 fill-rose-500/20" />
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#D45D79] block mt-3 mb-1 line-clamp-1">
                    Heart Chakra • Venus
                  </span>
                  <h3 className="font-serif text-sm sm:text-xl font-bold text-[#2B1B3D] leading-snug group-hover:text-[#7B4FC9] transition-colors">
                    Love & Relationship
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#635572] leading-relaxed line-clamp-2 mt-1.5 hidden sm:block">
                    Soulmate alignment, unconditional compassion, inner child healing, and partner trust.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#7B4FC9] group-hover:text-[#C9A24D] transition-colors mt-3">
                  <span>Explore Collection</span>
                  <ArrowRight size={11} className="sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </TiltCard>

            {/* 2. Job & Business */}
            <TiltCard>
              <Link
                href="/shop?category=Job+and+business"
                className="group h-full p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#EFE9E2] bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF8F3] hover:border-[#F5E2AC] hover:shadow-xl transition-all flex flex-col justify-between block cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#B8860B] shadow-2xs group-hover:scale-110 transition-transform">
                    <Briefcase size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#B8860B] block mt-3 mb-1 line-clamp-1">
                    Solar Plexus • Mercury
                  </span>
                  <h3 className="font-serif text-sm sm:text-xl font-bold text-[#2B1B3D] leading-snug group-hover:text-[#7B4FC9] transition-colors">
                    Job & Business
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#635572] leading-relaxed line-clamp-2 mt-1.5 hidden sm:block">
                    Executive courage, trading acumen, salary promotions, and persuasive communication.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#7B4FC9] group-hover:text-[#C9A24D] transition-colors mt-3">
                  <span>Explore Collection</span>
                  <ArrowRight size={11} className="sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </TiltCard>

            {/* 3. Wealth & Prosperity */}
            <TiltCard>
              <Link
                href="/shop?category=Wealth+and+prosperity"
                className="group h-full p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#EFE9E2] bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF8F3] hover:border-[#EADBAC] hover:shadow-xl transition-all flex flex-col justify-between block cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-yellow-50 border border-[#EADBAC] flex items-center justify-center text-[#9E7A1C] shadow-2xs group-hover:scale-110 transition-transform">
                    <Coins size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#9E7A1C] block mt-3 mb-1 line-clamp-1">
                    Lakshmi Gayatri • Jupiter
                  </span>
                  <h3 className="font-serif text-sm sm:text-xl font-bold text-[#2B1B3D] leading-snug group-hover:text-[#7B4FC9] transition-colors">
                    Wealth & Prosperity
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#635572] leading-relaxed line-clamp-2 mt-1.5 hidden sm:block">
                    Triple synergy cashflow magnet, financial breakthroughs, and lasting generational luck.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#7B4FC9] group-hover:text-[#C9A24D] transition-colors mt-3">
                  <span>Explore Collection</span>
                  <ArrowRight size={11} className="sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </TiltCard>

            {/* 4. Overall Wellness */}
            <TiltCard>
              <Link
                href="/shop?category=Overall+wellness"
                className="group h-full p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#EFE9E2] bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF8F3] hover:border-[#DED0F8] hover:shadow-xl transition-all flex flex-col justify-between block cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#7B4FC9] shadow-2xs group-hover:scale-110 transition-transform">
                    <Flower2 size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#7B4FC9] block mt-3 mb-1 line-clamp-1">
                    7-Chakra Equilibrium
                  </span>
                  <h3 className="font-serif text-sm sm:text-xl font-bold text-[#2B1B3D] leading-snug group-hover:text-[#7B4FC9] transition-colors">
                    Overall Wellness
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#635572] leading-relaxed line-clamp-2 mt-1.5 hidden sm:block">
                    Cooling mental stress relief, tranquil sleep cycles, and revitalized physical Prana energy.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#7B4FC9] group-hover:text-[#C9A24D] transition-colors mt-3">
                  <span>Explore Collection</span>
                  <ArrowRight size={11} className="sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </TiltCard>

            {/* 5. Negativity Protection */}
            <TiltCard>
              <Link
                href="/shop?category=Negativity+protection"
                className="group h-full p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#EFE9E2] bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF8F3] hover:border-[#D5CFDE] hover:shadow-xl transition-all flex flex-col justify-between block cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#F6F5F8] border border-[#DCD7E4] flex items-center justify-center text-[#2B1B3D] shadow-2xs group-hover:scale-110 transition-transform">
                    <ShieldCheck size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#8E6D24] block mt-3 mb-1 line-clamp-1">
                    Root Chakra Defense
                  </span>
                  <h3 className="font-serif text-sm sm:text-xl font-bold text-[#2B1B3D] leading-snug group-hover:text-[#7B4FC9] transition-colors">
                    Negativity Protection
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#635572] leading-relaxed line-clamp-2 mt-1.5 hidden sm:block">
                    Psychic body armor, Buri Nazar evil-eye deflection, and grounding against toxic environments.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#7B4FC9] group-hover:text-[#C9A24D] transition-colors mt-3">
                  <span>Explore Collection</span>
                  <ArrowRight size={11} className="sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </TiltCard>

            {/* 6. Sacred Chakra Oils */}
            <TiltCard>
              <Link
                href="/shop?category=Oils"
                className="group h-full p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#C9A24D]/50 bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF6EE] hover:border-[#C9A24D] hover:shadow-xl transition-all flex flex-col justify-between block cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-[#8E6D24] shadow-2xs group-hover:scale-110 transition-transform">
                    <Droplet size={20} className="sm:w-6 sm:h-6 fill-amber-500/20 text-[#C9A24D]" />
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#8E6D24] block mt-3 mb-1 line-clamp-1">
                    7 Chakras • Botanical Infusions
                  </span>
                  <h3 className="font-serif text-sm sm:text-xl font-bold text-[#2B1B3D] leading-snug group-hover:text-[#7B4FC9] transition-colors">
                    Sacred Chakra Oils
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#635572] leading-relaxed line-clamp-2 mt-1.5 hidden sm:block">
                    Pure therapeutic essential oils infused with real crushed gemstones and sealed with 108 Vedic mantras.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#7B4FC9] group-hover:text-[#C9A24D] transition-colors mt-3">
                  <span>Explore Sacred Oils</span>
                  <ArrowRight size={11} className="sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </TiltCard>

          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE 7-CHAKRA EXPLORER */}
      <ChakraExplorer />

      {/* 5. BEST SELLERS CAROUSEL / GRID */}
      <section className="py-16 sm:py-24 bg-[#FBF8F3] border-b border-[#EFE9E2]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8E6D24] mb-1.5 block">
                Most Revered by Clients
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#2B1B3D] font-bold tracking-tight">
                Tarot Reader's Bestsellers
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B4FC9] hover:underline"
            >
              <span>View All 20+ Sacred Gems</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <Link
                key={product.id}
                href={`/product?id=${product.id}`}
                className="group rounded-3xl bg-white border border-[#EFE9E2] hover:border-[#C9A24D] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 cursor-pointer block"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF8F3] mb-3.5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#7B4FC9] border border-[#7B4FC9]/30 shadow-2xs">
                        {product.badge || "Bestseller"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-[#635572]">
                      <div className="flex items-center gap-1 font-bold text-[#2B1B3D]">
                        <Star size={12} className="fill-[#C9A24D] text-[#C9A24D]" />
                        <span>{product.rating}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#8E6D24]">
                        {product.chakra || "Vedic"}
                      </span>
                    </div>

                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#2B1B3D] group-hover:text-[#7B4FC9] transition-colors line-clamp-2">
                      {product.name}
                    </h4>

                    <p className="text-[11px] text-[#635572] line-clamp-1 italic">
                      "{product.shortIntention}"
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#EFE9E2] flex items-center justify-between">
                  <div>
                    <span className="text-sm sm:text-base font-bold text-[#2B1B3D]">
                      ₹{(product.salePrice || product.price).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleProductAddToCart(product, e);
                    }}
                    className="p-2 rounded-full text-white btn-amethyst shadow-xs cursor-pointer hover:scale-110 active:scale-95 transition-all"
                    aria-label="Add to bag"
                  >
                    <ShoppingBag size={14} />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* 7. CLIENT FAQ ACCORDION */}
      <section className="py-16 sm:py-24 bg-[#FBF8F3] border-b border-[#EFE9E2]">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8E6D24] mb-2 block">
              Spiritual Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#2B1B3D] font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#EFE9E2] overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-sm sm:text-base font-semibold text-[#2B1B3D]">
                      {faq.q}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#FAF8F3] border border-[#EFE9E2] flex items-center justify-center text-[#7B4FC9] text-sm flex-shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#635572] leading-relaxed border-t border-[#EFE9E2]/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. INSTAGRAM FEED SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#7B4FC9] mb-2">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>@RiyaTarotCrystals</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B3D] mb-8">
            Follow Our Sacred Energy Journal
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              "/images/products/money-maker.jpg",
              "/images/products/rose-quartz-new.jpg",
              "/images/products/amethyst-new.jpg",
              "/images/products/dhan-yog-main.jpg",
            ].map((img, i) => (
              <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FAF8F3] border border-[#EFE9E2]">
                <Image src={img} alt="Instagram Crystal post" fill className="object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-[#2B1B3D]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
