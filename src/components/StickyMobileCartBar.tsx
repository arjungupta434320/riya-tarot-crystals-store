"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";
import { ShoppingBag, ArrowRight, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyMobileCartBar() {
  const pathname = usePathname();
  const { cart, toggleCart, appliedCoupon } = useStore();
  const [dismissed, setDismissed] = useState(false);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  );

  // Reset dismissed state whenever totalQuantity changes
  useEffect(() => {
    if (totalQuantity > 0) {
      setDismissed(false);
    }
  }, [totalQuantity]);

  // ONLY allow on the product page (/product). Strictly removed from the home page and all other routes.
  if (!pathname?.startsWith("/product")) return null;

  // Hide if cart is empty or user dismissed the floating bar
  if (totalQuantity === 0 || dismissed) return null;

  // Automatic tiered discount (15% when 2 or more items)
  const isTieredQualified = totalQuantity >= 2;
  const tieredDiscount = isTieredQualified ? Math.round(rawSubtotal * 0.15) : 0;

  // Coupon discount
  let couponDiscount = 0;
  if (appliedCoupon === "RIYA10") couponDiscount = Math.round(rawSubtotal * 0.10);
  else if (appliedCoupon === "LUXURY15" || appliedCoupon === "RIYA15") couponDiscount = Math.round(rawSubtotal * 0.15);
  else if (appliedCoupon === "DIVINE20" || appliedCoupon === "KUNDALI20") couponDiscount = Math.round(rawSubtotal * 0.20);

  const totalSavings = tieredDiscount + couponDiscount;
  const finalSubtotal = Math.max(0, rawSubtotal - totalSavings);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="md:hidden fixed left-3 right-3 z-45 bg-white/98 backdrop-blur-xl border border-[#C9A24D]/40 rounded-2xl shadow-[0_8px_30px_rgba(43,27,61,0.18)] px-3.5 py-2.5"
        style={{ bottom: "max(env(safe-area-inset-bottom, 0px), 12px)" }}
      >
        <div className="flex items-center justify-between gap-2.5">
          {/* Left: Item Count & Live Subtotal & Savings Badge */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-[#6E6A64] uppercase tracking-wider">
                {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
              </span>
              {totalSavings > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#F4E1D2] text-[#9A7B2C] border border-[#D4AF37]/30 flex items-center gap-0.5">
                  <Sparkles size={9} />
                  Save ₹{totalSavings}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-sm font-bold text-[#2C2A29]">
                ₹{finalSubtotal.toLocaleString("en-IN")}
              </span>
              {totalSavings > 0 && (
                <span className="text-[11px] text-[#6E6A64] line-through">
                  ₹{rawSubtotal.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>

          {/* Right: Instant View Cart Button + Dismiss X */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleCart}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase text-[#2C2A29] btn-gold-shimmer flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-xs"
            >
              <ShoppingBag size={13} className="text-[#2C2A29]" />
              <span>View Cart</span>
              <ArrowRight size={12} />
            </button>

            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss cart bar"
              className="w-7 h-7 rounded-lg bg-[#FAF8F3] hover:bg-[#F3EFEA] text-[#6E6A64] hover:text-[#2C2A29] flex items-center justify-center cursor-pointer transition-colors"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
