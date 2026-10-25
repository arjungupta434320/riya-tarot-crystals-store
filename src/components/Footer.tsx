"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useStore();

  // Do not display the footer on the checkout page
  if (pathname === "/checkout" || pathname?.startsWith("/checkout")) {
    return null;
  }

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
              <li>
                <a
                  href="https://wa.me/917889001587"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#2B1B3D] font-medium hover:text-[#7B4FC9] transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    className="text-[#25D366] flex-shrink-0"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp: +91 78890 01587</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:blessings@riyatarotcrystals.com"
                  className="inline-flex items-center gap-2 hover:text-[#7B4FC9] transition-colors"
                >
                  <Mail size={14} className="text-[#C9A24D] flex-shrink-0" />
                  <span>blessings@riyatarotcrystals.com</span>
                </a>
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
