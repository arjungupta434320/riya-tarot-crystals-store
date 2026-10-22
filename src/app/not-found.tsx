"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function NotFound() {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      if (
        pathname.startsWith("/blog/") &&
        !pathname.startsWith("/blog/article") &&
        !pathname.startsWith("/blog/post")
      ) {
        const slug = pathname.replace(/^\/blog\//, "").replace(/\/$/, "").trim();
        if (slug) {
          setRedirecting(true);
          window.location.replace(`/blog/article?slug=${encodeURIComponent(slug)}`);
        }
      }
    }
  }, []);

  if (redirecting) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-[#FBF8F3] text-[#2B1B3D]">
        <Sparkles className="w-8 h-8 text-[#C9A24D] animate-spin mb-4" />
        <p className="font-serif text-lg text-[#2B1B3D]">Aligning crystal frequency...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-[#FBF8F3] text-[#2B1B3D] relative overflow-hidden">
      
      {/* Background Cosmic Glows */}
      <div className="absolute w-96 h-96 rounded-full bg-[#CDB9F5]/25 blur-3xl pointer-events-none" />
      <div className="absolute w-80 h-80 rounded-full bg-[#F4C6D0]/20 blur-3xl pointer-events-none -bottom-10" />

      {/* Floating Gem Icon */}
      <div className="relative w-20 h-20 rounded-full bg-white border border-[#C9A24D]/50 flex items-center justify-center text-[#7B4FC9] mb-6 shadow-md animate-float">
        <svg
          className="w-10 h-10 text-[#7B4FC9]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
          <line x1="12" y1="22" x2="12" y2="15.5" />
          <polyline points="22 8.5 12 15.5 2 8.5" />
          <polyline points="2 15.5 12 8.5 22 15.5" />
        </svg>
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-[#8E6D24] mb-2 block">
        404 • Energy Frequency Divergence
      </span>

      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1B3D] mb-4 tracking-tight">
        Lost in the Cosmic Ether
      </h1>

      <p className="text-xs sm:text-sm text-[#635572] mb-8 max-w-md mx-auto leading-relaxed">
        The crystal frequency you seek has dissolved into the ether or shifted its dimensional coordinate. Let us realign your path.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link 
          href="/" 
          className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white btn-amethyst inline-flex items-center gap-2 shadow-md"
        >
          <span>Return to Alignment (Home)</span>
          <ArrowRight size={14} />
        </Link>
        <Link 
          href="/shop" 
          className="px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2B1B3D] btn-pearl-gold"
        >
          Browse Sacred Crystals
        </Link>
      </div>
    </div>
  );
}
