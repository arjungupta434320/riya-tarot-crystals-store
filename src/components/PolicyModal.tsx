"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { X, ShieldCheck, Truck, RotateCcw, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PolicyModal() {
  const { activePolicyModal, closePolicyModal } = useStore();

  if (!activePolicyModal) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#2C2A29]/30 backdrop-blur-sm"
          onClick={closePolicyModal}
        />

        {/* Modal Window: Native Bottom Sheet on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 35 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-t-[28px] sm:rounded-3xl shadow-[0_20px_50px_rgba(212,175,55,0.18)] border-t sm:border border-[#EAE5DF] z-10 max-h-[88dvh] sm:max-h-[85vh] flex flex-col overflow-hidden pb-safe sm:pb-0"
        >
          {/* Mobile Sheet Drag Pill Handle */}
          <div className="w-12 h-1.5 bg-[#EAE5DF] rounded-full mx-auto mt-3 mb-1 sm:hidden flex-shrink-0" />
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EAE5DF] bg-[#FAF9F6] flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FFFFFF] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-xs">
                {activePolicyModal === "privacy" && <ShieldCheck size={18} />}
                {activePolicyModal === "shipping" && <Truck size={18} />}
                {activePolicyModal === "refunds" && <RotateCcw size={18} />}
                {activePolicyModal === "terms" && <FileText size={18} />}
              </div>
              <div>
                <h3 id="policy-modal-title" className="font-serif text-lg font-semibold text-[#2C2A29]">
                  {activePolicyModal === "privacy" && "Privacy & Data Protection Policy"}
                  {activePolicyModal === "shipping" && "Shipping & Insured Delivery Policy"}
                  {activePolicyModal === "refunds" && "7-Day Replacement & Refund Policy"}
                  {activePolicyModal === "terms" && "Terms of Service & Authenticity"}
                </h3>
                <p className="text-[11px] text-[#6E6A64]">
                  Official Customer Guidelines • Riya Tarot Crystals
                </p>
              </div>
            </div>

            <button
              onClick={closePolicyModal}
              className="w-8 h-8 rounded-full bg-white border border-[#EAE5DF] flex items-center justify-center text-[#6E6A64] hover:text-[#2C2A29] hover:bg-[#FAF9F6] transition-colors"
              aria-label="Close policy modal"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable Policy Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs text-[#2C2A29] leading-relaxed">
            {activePolicyModal === "privacy" && (
              <>
                <section className="space-y-2">
                  <h4 className="font-serif text-sm font-semibold text-[#2C2A29] flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#D4AF37]" />
                    1. Confidentiality of Birth Chart & Intention Data
                  </h4>
                  <p className="text-[#6E6A64]">
                    At Riya Tarot Crystals, we hold personal energy curation in the highest sanctity. Any Name, Date of Birth, Time of Birth, or life intention shared during checkout or the Bracelet Quiz is strictly utilized by our master astrologer for personalized mantra consecration. We never sell, lease, or monetize your metaphysical or personal data.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-sm font-semibold text-[#2C2A29] flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#D4AF37]" />
                    2. Payment Security & Encryption
                  </h4>
                  <p className="text-[#6E6A64]">
                    All online financial transactions are routed through bank-grade 256-bit SSL encrypted payment gateways (Razorpay, UPI, PhonePe, Cards). We do not store credit card numbers, CVVs, or UPI PINs on our servers.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-sm font-semibold text-[#2C2A29] flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#D4AF37]" />
                    3. Cookies & Session Storage
                  </h4>
                  <p className="text-[#6E6A64]">
                    We use strictly essential local storage and cookie tokens to maintain your active cart state, saved wishlist items, and applied promotional discounts. No invasive third-party telemetry is executed.
                  </p>
                </section>
              </>
            )}

            {activePolicyModal === "shipping" && (
              <>
                <section className="space-y-2">
                  <h4 className="font-serif text-sm font-semibold text-[#2C2A29] flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#D4AF37]" />
                    1. Order Cleansing & Consecration Window (24–48 Hours)
                  </h4>
                  <p className="text-[#6E6A64]">
                    Because every authentic crystal bracelet and gemstone undergoes individual cleansing, Full Moon recharging, and 108 Vedic Beej Mantra consecration before dispatch, orders are carefully prepared within 24 to 48 business hours.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-sm font-semibold text-[#2C2A29] flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#D4AF37]" />
                    2. Courier Partners & Pan-India Timelines
                  </h4>
                  <p className="text-[#6E6A64]">
                    We dispatch via premium air-cargo logistics partners (BlueDart, Delhivery Air, DTDC). 
                    <br />• <strong>Standard Insured Delivery:</strong> 3–5 Business Days (Complimentary on orders above ₹1,499).
                    <br />• <strong>Express Priority Air Delivery:</strong> 1–2 Business Days (Flat ₹99 surcharge).
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-sm font-semibold text-[#2C2A29] flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#D4AF37]" />
                    3. Live SMS & WhatsApp Tracking
                  </h4>
                  <p className="text-[#6E6A64]">
                    Once dispatched from our studio, you will receive an automated WhatsApp and SMS notification with a real-time Air Waybill (AWB) tracking link. Every shipment is 100% transit-insured against breakage or loss.
                  </p>
                </section>
              </>
            )}

            {activePolicyModal === "refunds" && (
              <>
                <section className="space-y-2">
                  <h4 className="font-serif text-sm font-semibold text-[#2C2A29] flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#D4AF37]" />
                    1. 7-Day Hassle-Free Replacement Policy
                  </h4>
                  <p className="text-[#6E6A64]">
                    Your satisfaction and energetic comfort are paramount. If your bracelet or gemstone arrives damaged in transit or differs from your order, we provide a replacement within 7 days of package delivery.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-sm font-semibold text-[#2C2A29] flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#D4AF37]" />
                    2. Unboxing Video Requirement for Transit Claims
                  </h4>
                  <p className="text-[#6E6A64]">
                    To maintain mutual trust with our insured courier partners, transit damage claims require a continuous, uncut unboxing video recorded while breaking the tamper-proof seal. Please WhatsApp the clip to +91 78890 01587 within 48 hours of delivery.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-sm font-semibold text-[#2C2A29] flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#D4AF37]" />
                    3. Refund Processing Timelines
                  </h4>
                  <p className="text-[#6E6A64]">
                    Approved monetary refunds are processed directly back to the original payment source (UPI account or Card) within 3 to 5 business days after inspection.
                  </p>
                </section>
              </>
            )}

            {activePolicyModal === "terms" && (
              <>
                <section className="space-y-2">
                  <h4 className="font-serif text-sm font-semibold text-[#2C2A29] flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#D4AF37]" />
                    1. 100% Natural Stone Authenticity Guarantee
                  </h4>
                  <p className="text-[#6E6A64]">
                    Riya Tarot Crystals guarantees that every piece of crystal jewelry and loose gemstone is genuine earth-mined material. We strictly forbid artificial glass beads, dyed resin replicas, or synthetic lookalikes. Because authentic stones are natural geological creations, minor inclusions, internal veining, and slight color variations are signatures of authentic authenticity.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-sm font-semibold text-[#2C2A29] flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#D4AF37]" />
                    2. Metaphysical & Lifestyle Disclaimer
                  </h4>
                  <p className="text-[#6E6A64]">
                    Our energized crystal jewelry, gemstones, and astrological curation are designed as sacred lifestyle talismans for personal mindfulness, intentional alignment, and spiritual balance. They are not intended as substitutes for professional legal, medical, or clinical psychological care.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-serif text-sm font-semibold text-[#2C2A29] flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#D4AF37]" />
                    3. Governing Law & Jurisdiction
                  </h4>
                  <p className="text-[#6E6A64]">
                    All commercial interactions and policies are subject to the laws of India, with exclusive jurisdiction in the courts of New Delhi, India.
                  </p>
                </section>
              </>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-4 sm:p-5 border-t border-[#EAE5DF] bg-[#FAF9F6] flex justify-end flex-shrink-0">
            <button
              onClick={closePolicyModal}
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2C2A29] btn-pearl-gold"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
