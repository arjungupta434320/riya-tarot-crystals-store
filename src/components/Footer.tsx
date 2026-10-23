"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Compass, 
  Mail, 
  Phone, 
  Clock, 
  ArrowRight, 
  Heart,
  CheckCircle2,
  BookOpen
} from "lucide-react";
import { useStore } from "@/store/useStore";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      showToast("✨ Welcome to Riya Tarot Crystals Circle! 10% coupon DIVINE10 applied.");
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#F6F2EA] text-[#2B1B3D] border-t border-[#EFE9E2] pt-16 pb-14 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Soft Aura Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#CDB9F5]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F4C6D0]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-14">
          
          {/* Brand Narrative (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white border border-[#C9A24D]/50 flex items-center justify-center text-[#7B4FC9] shadow-xs">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold tracking-wider text-[#2B1B3D] uppercase">
                  RIYA TAROT CRYSTALS
                </h4>
                <span className="text-[9px] tracking-widest uppercase text-[#8E6D24] font-semibold block">
                  AUTHENTIC SPIRITUAL BOUTIQUE
                </span>
              </div>
            </div>

            <p className="text-xs text-[#635572] leading-relaxed max-w-sm">
              We handcraft authentic, energetically charged gemstone bracelets, sacred raw clusters, and consecrated talisman jewelry. Consecrated with holy Himalayan sage and blessed with 108 Vedic Beej Mantras before reaching your sanctuary.
            </p>

            {/* Newsletter Box */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-[#2B1B3D] block mb-2">
                Join the Sacred Energy Circle (Get 10% Off)
              </span>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#2E7D32] bg-[#EDF7ED] p-2.5 rounded-xl border border-[#A5D6A7]">
                  <CheckCircle2 size={16} />
                  <span>Blessings received! Use code <strong>DIVINE10</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email for aura updates..."
                    className="flex-1 px-3.5 py-2 text-xs rounded-full bg-white border border-[#EFE9E2] text-[#2B1B3D] placeholder-[#9588A3] focus:outline-none focus:border-[#C9A24D]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full text-xs font-semibold text-white btn-amethyst cursor-pointer flex-shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-[#2B1B3D]">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-[#635572]">
              <li>
                <Link href="/shop?category=Love+and+relationship" className="hover:text-[#7B4FC9] transition-colors">
                  Love & Relationship
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Job+and+business" className="hover:text-[#7B4FC9] transition-colors">
                  Job & Business
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Wealth+and+prosperity" className="hover:text-[#7B4FC9] transition-colors">
                  Wealth & Prosperity
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Overall+wellness" className="hover:text-[#7B4FC9] transition-colors">
                  Overall Wellness
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Negativity+protection" className="hover:text-[#7B4FC9] transition-colors">
                  Negativity Protection
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Oils" className="hover:text-[#7B4FC9] transition-colors font-medium text-[#8E6D24]">
                  Sacred Chakra Oils 🪔
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-[#7B4FC9] transition-colors font-medium text-[#7B4FC9] flex items-center gap-1 pt-1">
                  <Sparkles size={11} className="text-[#C9A24D]" />
                  <span>Crystal Energy Quiz ✨</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Crystal Journal & Guides */}
          <div>
            <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-[#2B1B3D]">
              Sacred Knowledge
            </h5>
            <ul className="space-y-2.5 text-xs text-[#635572]">
              <li>
                <Link href="/blog" className="hover:text-[#7B4FC9] transition-colors">
                  Crystal Library Index
                </Link>
              </li>
              <li>
                <Link href="/blog/complete-guide-to-7-chakras" className="hover:text-[#7B4FC9] transition-colors">
                  Guide to 7 Chakras
                </Link>
              </li>
              <li>
                <Link href="/blog/how-to-cleanse-and-charge-crystals" className="hover:text-[#7B4FC9] transition-colors">
                  Cleansing & Charging
                </Link>
              </li>
              <li>
                <Link href="/blog/amethyst-master-healing-properties" className="hover:text-[#7B4FC9] transition-colors">
                  Amethyst Master Healer
                </Link>
              </li>
              <li>
                <Link href="/blog/pyrite-citrine-wealth-magnetism" className="hover:text-[#7B4FC9] transition-colors">
                  Wealth Stones (Citrine & Pyrite)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#7B4FC9] transition-colors">
                  Our Sacred Energizing Process
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Policies */}
          <div>
            <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-[#2B1B3D]">
              Concierge & Trust
            </h5>
            <ul className="space-y-2.5 text-xs text-[#635572]">
              <li className="flex items-center gap-1.5 text-[#2B1B3D] font-medium">
                <Phone size={13} className="text-[#C9A24D]" />
                <a
                  href="https://wa.me/917889001587"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7B4FC9] transition-colors"
                >
                  WhatsApp: +91 78890 01587
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail size={13} className="text-[#C9A24D]" />
                <span>blessings@riyatarotcrystals.com</span>
              </li>
              <li className="pt-1">
                <Link href="/track" className="hover:text-[#7B4FC9] transition-colors flex items-center gap-1 text-[#2B1B3D] font-medium">
                  <Truck size={13} className="text-[#7B4FC9]" />
                  <span>Track Your Order</span>
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/policies/shipping" className="hover:text-[#7B4FC9] transition-colors block">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/policies/refunds" className="hover:text-[#7B4FC9] transition-colors block">
                  Returns & Cancellations
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-[#7B4FC9] transition-colors block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-[#7B4FC9] transition-colors block">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. BOTTOM COPYRIGHT & LEGAL NOTICE */}
        <div className="border-t border-[#EFE9E2] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#635572]">
          <p>© {new Date().getFullYear()} Riya Tarot Crystals. Handcrafted with reverence in India.</p>
          <p className="text-[10px] text-[#9588A3] max-w-lg text-center sm:text-right">
            Traditional beliefs statement: Gemstone properties are based on spiritual, cultural, and metaphysical traditions. Crystals complement, but do not replace, professional medical or psychiatric advice.
          </p>
        </div>

      </div>
    </footer>
  );
}
