"use client";

import React from "react";
import Link from "next/link";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";

export default function QuizPage() {
  return (
    <div className="min-h-screen py-8 sm:py-14 bg-[#FBF8F3] text-[#2B1B3D]">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635572] hover:text-[#7B4FC9] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Sanctuary</span>
          </Link>

          <span className="text-xs font-semibold text-[#8E6D24] flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#C9A24D]" />
            <span>Vedic Intention Engine</span>
          </span>
        </div>

        {/* 7-Step Quiz Engine */}
        <QuizEngine />

        {/* Bottom Trust Row */}
        <div className="mt-8 text-center text-xs text-[#635572] flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck size={14} className="text-[#C9A24D]" />
            <span>100% Authentically Sourced Natural Crystals</span>
          </span>
          <span>•</span>
          <span>108 Mantra Japa Prana Pratishtha</span>
        </div>

      </div>
    </div>
  );
}
