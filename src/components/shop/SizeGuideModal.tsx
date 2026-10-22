"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Ruler, CheckCircle2 } from "lucide-react";

export function SizeGuideModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Bracelet Wrist Size Guide" maxWidth="lg">
      <div className="space-y-6 text-[#2B1B3D]">
        {/* Intro */}
        <p className="text-xs sm:text-sm text-[#635572] leading-relaxed">
          Every Riya Tarot Crystal bracelet is hand-strung on sacred four-ply Japanese stretch elastic, pre-stretched and sealed for supreme durability.
        </p>

        {/* Wrist Size Table */}
        <div>
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#2B1B3D] mb-3 flex items-center gap-2">
            <Ruler size={16} className="text-[#C9A24D]" />
            <span>Wrist Circumference Recommendations</span>
          </h4>
          <div className="overflow-hidden rounded-2xl border border-[#EFE9E2] text-xs">
            <table className="w-full text-left">
              <thead className="bg-[#FAF8F3] text-[#8E6D24] uppercase text-[10px] tracking-wider border-b border-[#EFE9E2]">
                <tr>
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Inches</th>
                  <th className="py-2.5 px-3">Fit Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE9E2]">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#7B4FC9]">Small (Petite)</td>
                  <td className="py-2.5 px-3">6.0" – 6.5"</td>
                  <td className="py-2.5 px-3 text-[#635572]">Slender wrists; snug, stationary fit</td>
                </tr>
                <tr className="bg-[#FAF8F3]/40">
                  <td className="py-2.5 px-3 font-semibold text-[#7B4FC9]">Standard Elastic (Universal)</td>
                  <td className="py-2.5 px-3">6.5" – 7.5"</td>
                  <td className="py-2.5 px-3 text-[#635572]">Fits 90% of men and women comfortably</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#7B4FC9]">Large (Relaxed)</td>
                  <td className="py-2.5 px-3">7.5" – 8.5"</td>
                  <td className="py-2.5 px-3 text-[#635572]">Broad wrists or looser drape preference</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* How to measure */}
        <div className="p-4 rounded-2xl bg-[#EDF7ED] border border-[#A5D6A7] text-xs text-[#2E7D32] space-y-1">
          <span className="font-bold flex items-center gap-1.5">
            <CheckCircle2 size={15} /> How to Measure in 10 Seconds
          </span>
          <p className="text-[#2E7D32]/90 leading-relaxed">
            Wrap a string or strip of paper snugly around your wrist bone, mark the overlap with a pen, and measure against a ruler.
          </p>
        </div>
      </div>
    </Modal>
  );
}
