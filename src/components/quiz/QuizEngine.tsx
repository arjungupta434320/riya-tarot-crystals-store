"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  ShoppingBag, 
  Eye, 
  Share2,
  Mail,
  Phone,
  Flame,
  Droplet,
  Compass,
  Star,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import quizData from "@/data/quiz-scoring.json";
import { fallbackProducts } from "@/data/products";
import { Product, useStore } from "@/store/useStore";

export function QuizEngine({ isModal = false, onClose }: { isModal?: boolean; onClose?: () => void }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Optional lead capture before result reveal
  const [leadName, setLeadName] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadCaptured, setLeadCaptured] = useState(false);

  const [matchedProducts, setMatchedProducts] = useState<{ product: Product; matchScore: number; reason: string }[]>([]);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const { addToCart, showToast } = useStore();

  const totalSteps = quizData.questions.length;
  const currentQuestion = quizData.questions[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updated = { ...answers, [questionId]: optionId };
    setAnswers(updated);

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Finished all 7 questions! Trigger energy scanning sequence
      triggerEnergyScan(updated);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const triggerEnergyScan = (finalAnswers: Record<string, string>) => {
    setIsScanning(true);

    // Compute top 3 recommendations based on scoring matrix
    const goalOption = quizData.questions[0].options.find((o) => o.id === finalAnswers["goal"]) as any;
    const challengeOption = quizData.questions[1].options.find((o) => o.id === finalAnswers["challenge"]) as any;
    const zodiacOption = quizData.questions[2].options.find((o) => o.id === finalAnswers["zodiac"]) as any;

    const targetIds = [
      ...(goalOption?.recommendedIds || []),
      ...(challengeOption?.recommendedIds || []),
      ...(zodiacOption?.recommendedIds || []),
    ];

    // Score all available products
    const scored = fallbackProducts.map((p) => {
      let score = 70;
      if (targetIds.includes(p.id)) score += 25;
      if (goalOption && p.chakra?.toLowerCase().includes((goalOption.chakra || "").toLowerCase())) score += 10;
      if (zodiacOption && p.zodiac?.toLowerCase().includes(zodiacOption.id.split("-")[0])) score += 10;
      score = Math.min(score, 99);

      let reason = `Harmonizes your ${goalOption?.chakra || "Heart"} chakra to unblock ${challengeOption?.label.split(",")[0] || "vitality"}.`;
      if (p.planet) reason += ` Aligns with ${p.planet} to ground and protect your aura.`;

      return { product: p, matchScore: score, reason };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    const top3 = scored.slice(0, 3);
    setMatchedProducts(top3);

    // 1.8s energetic transition
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 1800);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1, "8mm", 'Standard Elastic (6.5" - 7.5")');
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    showToast(`✨ Added ${product.name} to your sacred bag!`);
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentStepIndex(0);
    setShowResults(false);
    setIsScanning(false);
  };

  // 1. Energy Scanner Loading State
  if (isScanning) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center px-4">
        {/* Animated Sacred Mandala */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#C9A24D]/40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-3 rounded-full border-2 border-[#7B4FC9]/40"
          />
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#CDB9F5] to-[#F4C6D0] animate-pulse flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-[#7B4FC9]" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-2 max-w-md"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#8E6D24]">
            Channeling Vibrational Frequencies
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B3D]">
            Consulting Gemstone Synergies...
          </h3>
          <p className="text-xs sm:text-sm text-[#635572] leading-relaxed">
            Aligning your chakra meridians, planetary rulers, and elemental intentions with consecrated gemstone lattices.
          </p>
        </motion.div>
      </div>
    );
  }

  // 2. Results Screen
  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        
        {/* Result Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EDF7ED] text-[#2E7D32] border border-[#A5D6A7] text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle2 size={14} />
            <span>Aura Analysis Complete</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif text-[#2B1B3D] font-bold tracking-tight mb-2">
            Your Divine Gemstone Alignments
          </h2>
          <p className="text-xs sm:text-sm text-[#635572] leading-relaxed">
            Based on your spiritual intention, astrological rashi, and elemental balance, these 3 consecrated bracelets resonate with the exact frequency your field requires:
          </p>
        </div>

        {/* Top 3 Product Recommendation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {matchedProducts.map(({ product, matchScore, reason }, idx) => {
            const isAdded = addedIds[product.id];
            return (
              <div
                key={product.id}
                className={`rounded-3xl bg-white border p-5 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden ${
                  idx === 0
                    ? "border-[#7B4FC9] ring-2 ring-[#7B4FC9]/20"
                    : "border-[#EFE9E2] hover:border-[#C9A24D]/50"
                }`}
              >
                {/* Match Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    idx === 0 ? "bg-[#7B4FC9] text-white" : "bg-[#F5F0FD] text-[#7B4FC9]"
                  }`}>
                    {idx === 0 ? "★ Supreme Soul Match" : `Synergy #${idx + 1}`}
                  </span>
                  <span className="font-serif font-bold text-xs text-[#8E6D24]">
                    {matchScore}% Resonance
                  </span>
                </div>

                {/* Product Image */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF8F3] mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Title & Spiritual Rationale */}
                <div className="space-y-2 flex-grow mb-4">
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#2B1B3D] line-clamp-2">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-[#635572] leading-relaxed">
                    {reason}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-[#EFE9E2] space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-base text-[#2B1B3D]">
                      ₹{(product.salePrice || product.price).toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-[#2E7D32] font-semibold bg-[#EDF7ED] px-2 py-0.5 rounded-full">
                      Vedic Energized
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    disabled={isAdded}
                    className={`w-full py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all ${
                      isAdded
                        ? "bg-[#EDF7ED] text-[#2E7D32] border border-[#A5D6A7]"
                        : idx === 0
                        ? "btn-amethyst"
                        : "btn-gold-shimmer text-[#2B1B3D]"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={14} />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/product?id=${product.id}`}
                    className="block text-center text-[11px] text-[#7B4FC9] hover:underline font-semibold pt-1"
                  >
                    View 360° Inspection & Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Retake & Consultation Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#EFE9E2] text-xs">
          <button
            onClick={handleRetake}
            className="flex items-center gap-1.5 text-[#635572] hover:text-[#2B1B3D] font-semibold cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Retake Energy Questionnaire</span>
          </button>

          <a
            href={`https://wa.me/917889001587?text=Hello%20Riya,%20I%20just%20completed%20the%20crystal%20quiz%20for%20${encodeURIComponent(answers['goal'] || 'spiritual balance')}.%20Can%20you%20verify%20my%20top%20recommendation?`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#2B1B3D] font-semibold hover:text-[#7B4FC9]"
          >
            <Sparkles size={14} className="text-[#C9A24D]" />
            <span>Consult Tarot Reader Riya on WhatsApp</span>
          </a>
        </div>

      </div>
    );
  }

  // 3. Question Step View
  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-10 px-4">
      
      {/* Top Progress Indicator with Circular Progress Ring */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#635572] hover:text-[#2B1B3D] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        {/* Circular Progress Ring */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#EFE9E2"
                strokeWidth="2.5"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#7B4FC9"
                strokeWidth="2.5"
                strokeDasharray="94.2"
                strokeDashoffset={94.2 - (94.2 * progressPercent) / 100}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
              />
            </svg>
            <span className="absolute text-[10px] font-bold text-[#2B1B3D]">
              {currentStepIndex + 1}/{totalSteps}
            </span>
          </div>
          <span className="text-xs font-semibold text-[#8E6D24]">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#7B4FC9] block mb-1.5">
              Question {currentStepIndex + 1}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#2B1B3D] font-bold leading-tight">
              {currentQuestion.question}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#635572] leading-relaxed">
              {currentQuestion.subtitle}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2 sm:space-y-2.5">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left min-h-[48px] transition-all duration-200 flex items-center justify-between cursor-pointer touch-press active:scale-[0.99] ${
                    isSelected
                      ? "bg-[#F5F0FD] border-[#7B4FC9] shadow-sm text-[#7B4FC9] font-bold"
                      : "bg-white border-[#EFE9E2] hover:border-[#C9A24D]/50 hover:bg-[#FBF8F3] text-[#2B1B3D]"
                  }`}
                >
                  <span className="text-xs sm:text-sm font-medium">
                    {option.label}
                  </span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ml-3 transition-colors ${
                    isSelected ? "bg-[#7B4FC9] border-[#7B4FC9] text-white" : "border-[#EFE9E2]"
                  }`}>
                    {isSelected && <Check size={11} />}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
