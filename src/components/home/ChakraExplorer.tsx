"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ChakraData {
  id: string;
  sanskritName: string;
  englishName: string;
  beejMantra: string;
  location: string;
  colorHex: string;
  bgTint: string;
  borderColor: string;
  gemstones: string[];
  intention: string;
  filterParam: string;
}

export const chakrasList: ChakraData[] = [
  {
    id: "root",
    sanskritName: "Muladhara",
    englishName: "Root Chakra",
    beejMantra: "LAM",
    location: "Base of Spine / Pelvic Floor",
    colorHex: "#C62828",
    bgTint: "rgba(198, 40, 40, 0.08)",
    borderColor: "rgba(198, 40, 40, 0.35)",
    gemstones: ["Black Tourmaline", "Red Jasper", "Black Obsidian", "Hematite"],
    intention: "Grounding, Physical Safety, Boundary Protection & Wealth Stability",
    filterParam: "Root",
  },
  {
    id: "sacral",
    sanskritName: "Svadhisthana",
    englishName: "Sacral Chakra",
    beejMantra: "VAM",
    location: "Lower Abdomen / Sacrum",
    colorHex: "#E65100",
    bgTint: "rgba(230, 81, 0, 0.08)",
    borderColor: "rgba(230, 81, 0, 0.35)",
    gemstones: ["Carnelian", "Peach Moonstone", "Orange Calcite"],
    intention: "Sensory Pleasure, Creative Fertility & Emotional Release",
    filterParam: "Sacral",
  },
  {
    id: "solar",
    sanskritName: "Manipura",
    englishName: "Solar Plexus",
    beejMantra: "RAM",
    location: "Upper Abdomen / Solar Plexus",
    colorHex: "#C9A24D",
    bgTint: "rgba(201, 162, 77, 0.12)",
    borderColor: "rgba(201, 162, 77, 0.45)",
    gemstones: ["Golden Citrine", "Iron Pyrite", "Tiger Eye"],
    intention: "Sovereign Willpower, Financial Magnetism & Executive Courage",
    filterParam: "Solar",
  },
  {
    id: "heart",
    sanskritName: "Anahata",
    englishName: "Heart Chakra",
    beejMantra: "YAM",
    location: "Center of Chest / Heart Center",
    colorHex: "#2E7D32",
    bgTint: "rgba(46, 125, 50, 0.08)",
    borderColor: "rgba(46, 125, 50, 0.35)",
    gemstones: ["Madagascar Rose Quartz", "Green Aventurine", "Rhodochrosite"],
    intention: "Unconditional Love, Compassionate Healing & Soulmate Attraction",
    filterParam: "Heart",
  },
  {
    id: "throat",
    sanskritName: "Vishuddha",
    englishName: "Throat Chakra",
    beejMantra: "HAM",
    location: "Throat Center / Thyroid",
    colorHex: "#1565C0",
    bgTint: "rgba(21, 101, 192, 0.08)",
    borderColor: "rgba(21, 101, 192, 0.35)",
    gemstones: ["Royal Lapis Lazuli", "Aquamarine", "Amazonite", "Sodalite"],
    intention: "Eloquent Truth, Public Speaking & Authentic Self-Expression",
    filterParam: "Throat",
  },
  {
    id: "thirdEye",
    sanskritName: "Ajna",
    englishName: "Third Eye",
    beejMantra: "AUM",
    location: "Brow Center / Pineal Gland",
    colorHex: "#7B4FC9",
    bgTint: "rgba(123, 79, 201, 0.10)",
    borderColor: "rgba(123, 79, 201, 0.40)",
    gemstones: ["Uruguayan Amethyst", "Fluorite", "Labradorite"],
    intention: "Psychic Vision, Intuitive Clairvoyance & Banishing Overthinking",
    filterParam: "Third Eye",
  },
  {
    id: "crown",
    sanskritName: "Sahasrara",
    englishName: "Crown Chakra",
    beejMantra: "SILENCE",
    location: "Crown of Head / Fontanelle",
    colorHex: "#5E37A1",
    bgTint: "rgba(94, 55, 161, 0.08)",
    borderColor: "rgba(94, 55, 161, 0.35)",
    gemstones: ["Clear Quartz Sphatik", "Selenite", "Chevron Amethyst"],
    intention: "Cosmic Consciousness, Divine Surrender & Higher Spiritual Peace",
    filterParam: "Crown",
  },
];

export function ChakraExplorer() {
  const [selectedChakra, setSelectedChakra] = useState<ChakraData>(chakrasList[2]); // Default to Solar Plexus / Manipura

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FBF8F3] via-white to-[#FBF8F3] relative overflow-hidden">
      
      {/* Background Aura */}
      <div
        style={{ backgroundColor: selectedChakra.colorHex }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[130px] opacity-15 pointer-events-none transition-all duration-700"
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F0FD] text-[#7B4FC9] text-xs font-bold uppercase tracking-widest mb-3 border border-[#7B4FC9]/25">
            <Sparkles size={13} className="text-[#C9A24D]" />
            <span>Interactive Meridian Map</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B1B3D] font-bold tracking-tight mb-3">
            Explore Your 7 Sacred Chakras
          </h2>
          <p className="text-xs sm:text-sm text-[#635572] leading-relaxed max-w-xl mx-auto">
            Tap on any energy vortex to discover its traditional Sanskrit frequency, physical meridian location, and matching consecrated gemstones.
          </p>
        </div>

        {/* 7 Interactive Chakra Orbs Track */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto pb-6 mb-10 no-scrollbar px-2">
          {chakrasList.map((chakra, idx) => {
            const isSelected = selectedChakra.id === chakra.id;
            return (
              <button
                key={chakra.id}
                onClick={() => setSelectedChakra(chakra)}
                className="group flex flex-col items-center flex-shrink-0 cursor-pointer touch-press focus:outline-none"
              >
                {/* Chakra Orb */}
                <div
                  style={{
                    borderColor: isSelected ? chakra.colorHex : "rgba(201, 162, 77, 0.3)",
                    boxShadow: isSelected ? `0 0 24px ${chakra.colorHex}55` : "none",
                  }}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 relative border-2 ${
                    isSelected ? "scale-115" : "hover:scale-105 bg-white"
                  }`}
                >
                  {/* Glowing Core */}
                  <div
                    style={{ backgroundColor: chakra.colorHex }}
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full transition-transform duration-300 ${
                      isSelected ? "scale-110" : "opacity-80"
                    }`}
                  />
                  {/* Beej Mantra Label */}
                  <span className="absolute text-[8px] sm:text-[9px] font-bold text-white uppercase tracking-wider drop-shadow-xs pointer-events-none">
                    {chakra.beejMantra}
                  </span>
                </div>

                {/* Subtitle */}
                <span
                  style={{ color: isSelected ? chakra.colorHex : "#635572" }}
                  className="mt-2 text-[10px] sm:text-xs font-serif font-bold tracking-wide transition-colors whitespace-nowrap"
                >
                  {chakra.sanskritName}
                </span>
                <span className="text-[9px] text-[#9588A3] hidden sm:block">
                  {chakra.englishName.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Chakra Deep-Dive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedChakra.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            style={{
              borderColor: selectedChakra.borderColor,
              background: `linear-gradient(135deg, #FFFFFF 0%, ${selectedChakra.bgTint} 100%)`,
            }}
            className="rounded-3xl border-2 p-6 sm:p-10 shadow-[0_20px_50px_rgba(43,27,61,0.06)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            {/* Left 7 cols: Information */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-serif text-[#2B1B3D] font-bold">
                {selectedChakra.englishName}
              </h3>

              <p className="text-xs sm:text-sm text-[#635572] leading-relaxed">
                <strong>Anatomical Meridian:</strong> {selectedChakra.location}.
              </p>

              <p className="text-xs sm:text-sm text-[#2B1B3D] leading-relaxed">
                <strong>Spiritual Intention:</strong> {selectedChakra.intention}.
              </p>

              {/* Recommended Gemstones */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-[#8E6D24] tracking-widest block mb-2">
                  Matching Consecrated Gemstones:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedChakra.gemstones.map((gem) => (
                    <span
                      key={gem}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#EFE9E2] text-[#2B1B3D] shadow-2xs"
                    >
                      {gem}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Link to filtered shop */}
              <div className="pt-4">
                <Link
                  href={`/shop?category=Oils&chakra=${encodeURIComponent(selectedChakra.filterParam)}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white btn-amethyst shadow-md"
                >
                  <span>Explore {selectedChakra.englishName} Oils</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right 5 cols: Visual Sacred Symbol */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/80 border border-[#EFE9E2] text-center shadow-xs">
              <div
                style={{ backgroundColor: selectedChakra.colorHex }}
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-xl font-serif font-bold shadow-lg mb-3"
              >
                {selectedChakra.beejMantra}
              </div>
              <h4 className="font-serif text-base font-bold text-[#2B1B3D]">
                {selectedChakra.sanskritName} Mandala
              </h4>
              <p className="text-[11px] text-[#635572] mt-1 max-w-xs">
                Resonant sound frequency activates cellular nadis when chanted with focused contemplation.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
