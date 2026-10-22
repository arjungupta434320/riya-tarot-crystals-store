"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  BookOpen,
  Compass, 
  Tag, 
  Truck,
  ChevronDown
} from "lucide-react";
import { useStore, Product } from "@/store/useStore";
import { fetchProducts } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBraceletsOpen, setIsBraceletsOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { cart, wishlist, toggleCart, setDrawerTab } = useStore();
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    fetchProducts().then(setAllProducts);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const searchResults = searchQuery.trim().length > 1
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortIntention.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.chakra && p.chakra.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.rashi && p.rashi.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT MARQUEE */}
      <div className="w-full max-w-full bg-[#F7EFE2] text-[#2B1B3D] py-2 px-2 sm:px-4 border-b border-[#EFE9E2] overflow-hidden relative z-50 min-w-0">
        <div className="w-full max-w-full overflow-hidden min-w-0 flex">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-10 text-[11px] sm:text-xs font-medium tracking-wide">
            <span className="flex items-center gap-2">
              <Sparkles size={12} className="text-[#C9A24D]" />
              <span>Complimentary Vedic Energization & Sacred Thread with Every Order</span>
              <span className="text-[#8E6D24] font-bold">| Free Shipping above ₹999</span>
              <span className="text-[#C9A24D]">| Use Code: DIVINE10 for 10% Off</span>
              <Sparkles size={12} className="text-[#C9A24D]" />
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={12} className="text-[#C9A24D]" />
              <span>108 Mantra Japa Prana Pratishtha by Vedic Priests</span>
              <span className="text-[#8E6D24] font-bold">| 100% Authentic Lab Certified Gemstones</span>
              <span className="text-[#C9A24D]">| Pan-India Express Delivery</span>
              <Sparkles size={12} className="text-[#C9A24D]" />
            </span>
          </div>
        </div>
      </div>

      {/* 2. STICKY GLASSMORPHIC NAVBAR */}
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FBF8F3]/92 backdrop-blur-xl shadow-[0_4px_20px_rgba(43,27,61,0.06)] py-3 border-b border-[#C9A24D]/20"
            : "bg-[#FBF8F3]/95 backdrop-blur-md py-4 border-b border-[#EFE9E2]"
        }`}
      >
        <div className="container mx-auto px-2 sm:px-6 flex items-center justify-between min-w-0 gap-2">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
            <button
              type="button"
              className="lg:hidden w-11 h-11 rounded-xl text-[#2B1B3D] hover:bg-[#F6F2EA] transition-colors cursor-pointer flex items-center justify-center flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Bespoke Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#FBF8F3] via-[#F6F2EA] to-white border border-[#C9A24D]/50 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                <svg viewBox="0 0 44 44" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 3L24.5 14.5L36 17L24.5 19.5L22 31L19.5 19.5L8 17L19.5 14.5L22 3Z" fill="#FBF8F3" stroke="#C9A24D" strokeWidth="1.3" />
                  <polygon points="22,12 26.5,17 22,22 17.5,17" fill="#CDB9F5" fillOpacity="0.4" stroke="#7B4FC9" strokeWidth="1.2" />
                  <line x1="22" y1="12" x2="22" y2="22" stroke="#C9A24D" strokeWidth="1" />
                </svg>
              </div>

              <div className="flex flex-col min-w-0 overflow-hidden">
                <span className="font-serif text-sm sm:text-lg tracking-wider text-[#2B1B3D] font-bold leading-none uppercase group-hover:text-[#7B4FC9] transition-colors truncate">
                  RIYA TAROT CRYSTALS
                </span>
                <span className="text-[8px] sm:text-[10px] tracking-[0.15em] uppercase text-[#8E6D24] font-semibold mt-0.5 truncate hidden xs:block">
                  HEALED • ENERGIZED • AUTHENTIC
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold tracking-wider uppercase text-[#2B1B3D]">
            <Link
              href="/shop"
              className="hover:text-[#7B4FC9] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7B4FC9] hover:after:w-full after:transition-all"
            >
              Shop All
            </Link>
            <Link
              href="/shop?category=Heal+Energized+Bracelets"
              className="hover:text-[#7B4FC9] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7B4FC9] hover:after:w-full after:transition-all"
            >
              Bracelets
            </Link>
            <Link
              href="/quiz"
              className="hover:text-[#7B4FC9] transition-colors relative py-1 flex items-center gap-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7B4FC9] hover:after:w-full after:transition-all text-[#7B4FC9]"
            >
              <Sparkles size={13} className="text-[#C9A24D]" />
              <span>Crystal Quiz</span>
            </Link>
            <Link
              href="/blog"
              className="hover:text-[#7B4FC9] transition-colors relative py-1 flex items-center gap-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7B4FC9] hover:after:w-full after:transition-all"
            >
              <BookOpen size={13} className="text-[#C9A24D]" />
              <span>Blog</span>
            </Link>
            <Link
              href="/about"
              className="hover:text-[#7B4FC9] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7B4FC9] hover:after:w-full after:transition-all"
            >
              Our Story
            </Link>
            <Link
              href="/track"
              className="hover:text-[#7B4FC9] transition-colors relative py-1 flex items-center gap-1 text-[#635572] hover:text-[#2B1B3D]"
            >
              <Truck size={13} />
              <span>Track</span>
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setTimeout(() => searchInputRef.current?.focus(), 100);
              }}
              className="w-11 h-11 rounded-full hover:bg-[#F6F2EA] text-[#2B1B3D] transition-colors cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Search crystals"
            >
              <Search size={19} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => {
                setDrawerTab("wishlist");
                toggleCart();
              }}
              className="w-11 h-11 rounded-full hover:bg-[#F6F2EA] text-[#2B1B3D] transition-colors relative cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Open wishlist"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#FDF2F4] text-[#7B4FC9] text-[10px] font-bold border border-[#F4C6D0] flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer */}
            <button
              onClick={() => {
                setDrawerTab("cart");
                toggleCart();
              }}
              className="w-11 h-11 rounded-full hover:bg-[#F6F2EA] text-[#2B1B3D] transition-colors relative cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Open cart"
            >
              <ShoppingBag size={19} />
              {totalCartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#7B4FC9] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="border-t border-[#EFE9E2] bg-white shadow-lg py-4 px-4 sm:px-6"
            >
              <div className="container mx-auto max-w-2xl">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <Search size={18} className="absolute left-3.5 text-[#635572]" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by crystal name, intention (Wealth, Love, Evil Eye), Chakra or Rashi..."
                    className="w-full pl-10 pr-24 py-2.5 text-xs sm:text-sm rounded-full bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white btn-amethyst cursor-pointer"
                  >
                    Search
                  </button>
                </form>

                {/* Instant Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-3 divide-y divide-[#EFE9E2] border border-[#EFE9E2] rounded-2xl bg-white overflow-hidden shadow-xs">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/product?id=${item.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-3 flex items-center justify-between hover:bg-[#FBF8F3] cursor-pointer transition-colors block"
                      >
                        <div className="min-w-0 pr-3">
                          <h4 className="text-xs font-semibold text-[#2B1B3D] truncate">{item.name}</h4>
                          <span className="text-[10px] text-[#635572] truncate block">{item.shortIntention}</span>
                        </div>
                        <span className="text-xs font-bold text-[#7B4FC9] flex-shrink-0">
                          ₹{(item.salePrice || item.price).toLocaleString("en-IN")}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. SLIDE-OVER MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-[#2B1B3D]/40 backdrop-blur-xs z-[70]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-[84%] max-w-sm bg-white z-[80] shadow-2xl flex flex-col border-r border-[#EFE9E2]"
            >
              <div className="p-5 border-b border-[#EFE9E2] bg-[#FAF8F3] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#C9A24D]/50 flex items-center justify-center text-[#7B4FC9]">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className="font-serif text-sm font-bold text-[#2B1B3D] tracking-wider block">
                      RIYA TAROT CRYSTALS
                    </span>
                    <span className="text-[9px] text-[#8E6D24] font-semibold tracking-wider">
                      HEALED & ENERGIZED GEMS
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-[#635572] hover:text-[#2B1B3D]"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Quiz Callout Card */}
              <div className="p-4 bg-[#F5F0FD] border-b border-[#EFE9E2]">
                <div className="p-3 rounded-2xl bg-white border border-[#7B4FC9]/30 text-xs text-[#2B1B3D] space-y-1 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B4FC9] flex items-center gap-1">
                    <Sparkles size={11} /> 60-Second Energy Match
                  </span>
                  <p className="font-semibold text-xs leading-snug">
                    Unsure which crystal your aura needs?
                  </p>
                  <Link
                    href="/quiz"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7B4FC9] hover:underline pt-1"
                  >
                    <span>Take the Aura Quiz</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Navigation Links with Category Accordions */}
              <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E6D24] block mb-2 px-1">
                  Sacred Collections & Navigation
                </span>

                {/* All Collections Link */}
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 min-h-[48px] rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] hover:border-[#C9A24D] active:scale-[0.99] transition-all"
                >
                  <span className="font-semibold text-xs">All Collections</span>
                  <ArrowRight size={14} className="text-[#C9A24D]" />
                </Link>

                {/* Bracelets Accordion */}
                <div className="rounded-2xl border border-[#EFE9E2] bg-[#FAF8F3] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setIsBraceletsOpen(!isBraceletsOpen)}
                    className="w-full flex items-center justify-between p-3.5 min-h-[48px] text-left text-[#2B1B3D] font-semibold text-xs cursor-pointer select-none"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles size={14} className="text-[#C9A24D]" />
                      <span>Healed Bracelets</span>
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#635572] transition-transform duration-200 ${
                        isBraceletsOpen ? "rotate-180 text-[#7B4FC9]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isBraceletsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-[#EFE9E2] bg-white px-3 py-2 space-y-1"
                      >
                        <Link
                          href="/shop?category=Heal+Energized+Bracelets"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between py-2.5 px-3 rounded-xl text-xs text-[#2B1B3D] hover:bg-[#F5F0FD] hover:text-[#7B4FC9] transition-colors"
                        >
                          <span className="font-semibold">All Healed Bracelets</span>
                          <span className="text-[10px] text-[#8E6D24]">View all →</span>
                        </Link>
                        <Link
                          href="/shop?category=Heal+Energized+Bracelets&subCategory=Love+and+relationship"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between py-2 px-3 rounded-xl text-xs text-[#635572] hover:bg-[#F5F0FD] hover:text-[#7B4FC9] transition-colors"
                        >
                          <span>• Love & Relationship</span>
                        </Link>
                        <Link
                          href="/shop?category=Heal+Energized+Bracelets&subCategory=Job+and+business"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between py-2 px-3 rounded-xl text-xs text-[#635572] hover:bg-[#F5F0FD] hover:text-[#7B4FC9] transition-colors"
                        >
                          <span>• Job & Business</span>
                        </Link>
                        <Link
                          href="/shop?category=Heal+Energized+Bracelets&subCategory=Wealth+and+prosperity"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between py-2 px-3 rounded-xl text-xs text-[#635572] hover:bg-[#F5F0FD] hover:text-[#7B4FC9] transition-colors"
                        >
                          <span>• Wealth & Prosperity</span>
                        </Link>
                        <Link
                          href="/shop?category=Heal+Energized+Bracelets&subCategory=Overall+wellness"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between py-2 px-3 rounded-xl text-xs text-[#635572] hover:bg-[#F5F0FD] hover:text-[#7B4FC9] transition-colors"
                        >
                          <span>• Overall Wellness</span>
                        </Link>
                        <Link
                          href="/shop?category=Heal+Energized+Bracelets&subCategory=Negativity+protection"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between py-2 px-3 rounded-xl text-xs text-[#635572] hover:bg-[#F5F0FD] hover:text-[#7B4FC9] transition-colors"
                        >
                          <span>• Negativity Protection</span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Clusters */}
                <Link
                  href="/shop?category=Clusters"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 min-h-[48px] rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] hover:border-[#C9A24D] active:scale-[0.99] transition-all"
                >
                  <span className="font-semibold text-xs">Raw Clusters & Geodes</span>
                  <ArrowRight size={14} className="text-[#C9A24D]" />
                </Link>

                {/* Pendants */}
                <Link
                  href="/shop?category=Pendants"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 min-h-[48px] rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] hover:border-[#C9A24D] active:scale-[0.99] transition-all"
                >
                  <span className="font-semibold text-xs">Sacred Point Pendants</span>
                  <ArrowRight size={14} className="text-[#C9A24D]" />
                </Link>

                {/* Gemstones */}
                <Link
                  href="/shop?category=Gemstones"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 min-h-[48px] rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] hover:border-[#C9A24D] active:scale-[0.99] transition-all"
                >
                  <span className="font-semibold text-xs">Loose Gemstones</span>
                  <ArrowRight size={14} className="text-[#C9A24D]" />
                </Link>

                {/* Crystal Quiz Highlight */}
                <Link
                  href="/quiz"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 min-h-[48px] rounded-2xl bg-[#F5F0FD] border border-[#7B4FC9]/30 text-[#7B4FC9] active:scale-[0.99] transition-all"
                >
                  <span className="font-semibold text-xs flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#C9A24D]" />
                    <span>Crystal Energy Quiz ✨</span>
                  </span>
                  <ArrowRight size={14} className="text-[#7B4FC9]" />
                </Link>

                {/* Blog & Journal */}
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 min-h-[48px] rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] hover:border-[#C9A24D] active:scale-[0.99] transition-all"
                >
                  <span className="font-semibold text-xs flex items-center gap-1.5">
                    <BookOpen size={13} className="text-[#C9A24D]" />
                    <span>Blog & Crystal Library</span>
                  </span>
                  <ArrowRight size={14} className="text-[#C9A24D]" />
                </Link>

                {/* About & Sourcing */}
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 min-h-[48px] rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] hover:border-[#C9A24D] active:scale-[0.99] transition-all"
                >
                  <span className="font-semibold text-xs">About Riya & Sourcing</span>
                  <ArrowRight size={14} className="text-[#C9A24D]" />
                </Link>

                {/* Track Order */}
                <Link
                  href="/track"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 min-h-[48px] rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] hover:border-[#C9A24D] active:scale-[0.99] transition-all"
                >
                  <span className="font-semibold text-xs flex items-center gap-1.5">
                    <Truck size={13} />
                    <span>Track Your Order</span>
                  </span>
                  <ArrowRight size={14} className="text-[#C9A24D]" />
                </Link>
              </div>

              <div className="p-4 border-t border-[#EFE9E2] bg-[#FBF8F3] text-center text-[11px] text-[#635572]">
                100% Lab-Certified Natural Stones • Free Shipping Above ₹999
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
