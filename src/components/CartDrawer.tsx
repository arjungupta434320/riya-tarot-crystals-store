"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  X, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  Truck, 
  Gift, 
  Trash2, 
  ArrowRight, 
  Tag, 
  Check, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { useStore, Product } from "@/store/useStore";
import { cartUpsells, fetchProducts, fallbackProducts } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    updateQuantity,
    removeFromCart,
    activeDrawerTab,
    setDrawerTab,
    wishlist,
    toggleWishlist,
    addToCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    showToast
  } = useStore();

  const [couponInput, setCouponInput] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>(fallbackProducts);
  const [wishlistQuantities, setWishlistQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchProducts().then(setAllProducts);
  }, []);

  // 1. Lock body scroll when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  // 2. Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        toggleCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, toggleCart]);

  // Total quantity and raw subtotal calculated dynamically from paid items in cart
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  );

  // 2-Tier Milestone Thresholds
  const TIER_1_SHIPPING = 999;
  const TIER_2_FREE_GIFT = 1999;
  const FREE_GIFT_VALUE = 699;

  const isTier1Unlocked = rawSubtotal >= TIER_1_SHIPPING;
  const isTier2Unlocked = rawSubtotal >= TIER_2_FREE_GIFT;

  // Milestone Progress Bar Percentage:
  // 0 to ₹999 maps to 0% -> 50%
  // ₹999 to ₹1,999 maps to 50% -> 100%
  let progressPercent = 0;
  if (rawSubtotal <= 0) {
    progressPercent = 0;
  } else if (rawSubtotal <= TIER_1_SHIPPING) {
    progressPercent = Math.min(50, Math.round((rawSubtotal / TIER_1_SHIPPING) * 50));
  } else if (rawSubtotal < TIER_2_FREE_GIFT) {
    const tier2Range = TIER_2_FREE_GIFT - TIER_1_SHIPPING;
    const tier2Current = rawSubtotal - TIER_1_SHIPPING;
    progressPercent = 50 + Math.min(50, Math.round((tier2Current / tier2Range) * 50));
  } else {
    progressPercent = 100;
  }

  // Dynamic Milestone Copy
  let milestoneCopy = "";
  if (rawSubtotal < TIER_1_SHIPPING) {
    milestoneCopy = `Add ₹${(TIER_1_SHIPPING - rawSubtotal).toLocaleString("en-IN")} more for FREE Express Shipping! 🚚`;
  } else if (rawSubtotal < TIER_2_FREE_GIFT) {
    milestoneCopy = `🎉 Free Shipping Unlocked! Add ₹${(TIER_2_FREE_GIFT - rawSubtotal).toLocaleString("en-IN")} more for a FREE Selenite Charger (Worth ₹699) ✨`;
  } else {
    milestoneCopy = "✨ All Sacred Rewards Unlocked! (Free Shipping + Free Selenite Charger)";
  }

  // Coupon Discount Calculation
  let couponDiscount = 0;
  if (appliedCoupon === "DIVINE10" || appliedCoupon === "RIYA10") {
    couponDiscount = Math.round(rawSubtotal * 0.10);
  } else if (appliedCoupon === "LUXURY15" || appliedCoupon === "RIYA15") {
    couponDiscount = Math.round(rawSubtotal * 0.15);
  } else if (appliedCoupon === "DIVINE20" || appliedCoupon === "KUNDALI20") {
    couponDiscount = Math.round(rawSubtotal * 0.20);
  }

  // Total MRP for calculating strikethrough catalog savings
  const totalMrp = cart.reduce(
    (sum, item) => sum + (item.price || item.salePrice || 0) * item.quantity,
    0
  );
  const catalogMrpDiscount = Math.max(0, totalMrp - rawSubtotal);
  const freeGiftSavings = isTier2Unlocked ? FREE_GIFT_VALUE : 0;
  const totalSacredSavings = catalogMrpDiscount + couponDiscount + freeGiftSavings;

  // Shipping Fee Logic (Free above ₹999)
  const shippingFee = isTier1Unlocked || cart.length === 0 ? 0 : 79;
  const grandTotal = Math.max(0, rawSubtotal - couponDiscount + shippingFee);

  // Check if upsell item is already added to cart
  const isCleansingBowlInCart = cart.some(
    (item) => item.id === "upsell-selenite-cleansing-bowl" || item.name.toLowerCase().includes("selenite cleansing bowl")
  );

  const handleApplyCouponCode = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    showToast(res.message, res.success ? "success" : "info");
    if (res.success) setCouponInput("");
  };

  const handleChipCoupon = (code: string) => {
    const res = applyCoupon(code);
    showToast(res.message, res.success ? "success" : "info");
  };

  // 1-Click Upsell Add
  const handleAddCleansingBowlUpsell = () => {
    const upsellItem: Product = {
      id: "upsell-selenite-cleansing-bowl",
      name: "Himalayan Selenite Cleansing Bowl (3-Inch)",
      description: "Handcrafted Moroccan Selenite bowl to cleanse, neutralize, and charge your crystal bracelets and chakra oils overnight.",
      shortIntention: "Overnight Crystal Clearing & Pranic Recharging",
      price: 799,
      salePrice: 299,
      image: "/images/products/selenite-new.jpg",
      category: "Overall wellness",
      subCategory: "Overall wellness",
      badge: "Save 62%",
      chakra: "Crown (Sahasrara)",
      planet: "Moon (Chandra)",
      rating: 4.98,
      reviewCount: 310,
      benefits: ["Cleanses and resets crystal frequencies", "Zero maintenance or water needed"]
    };
    addToCart(upsellItem, 1);
    showToast("✨ Added Himalayan Selenite Cleansing Bowl (Save 62%) to your bag!");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[80] overflow-hidden">
          {/* Backdrop with soft sanctuary tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#2B1B3D]/40 backdrop-blur-xs transition-opacity"
            onClick={toggleCart}
          />

          {/* Luxury Light Theme Slide-Over Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-[#FBF8F3] text-[#2B1B3D] shadow-[0_12px_45px_rgba(43,27,61,0.18)] z-10 flex flex-col border-l border-[#EFE9E2]"
          >
            {/* Header: Title, Tab Switcher & Close Button */}
            <div className="p-4 sm:p-5 border-b border-[#EFE9E2] bg-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setDrawerTab("cart")}
                  className={`font-serif tracking-widest text-xs sm:text-sm uppercase pb-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeDrawerTab === "cart"
                      ? "border-b-2 border-[#7B4FC9] text-[#7B4FC9] font-bold"
                      : "text-[#635572] hover:text-[#2B1B3D]"
                  }`}
                >
                  <ShoppingBag size={14} className={activeDrawerTab === "cart" ? "text-[#7B4FC9]" : "text-[#635572]"} />
                  <span>YOUR BAG ({totalQuantity})</span>
                </button>

                <button
                  onClick={() => setDrawerTab("wishlist")}
                  className={`font-serif tracking-widest text-xs sm:text-sm uppercase pb-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeDrawerTab === "wishlist"
                      ? "border-b-2 border-[#7B4FC9] text-[#7B4FC9] font-bold"
                      : "text-[#635572] hover:text-[#2B1B3D]"
                  }`}
                >
                  <Heart size={14} className={activeDrawerTab === "wishlist" ? "text-[#7B4FC9]" : "text-[#635572]"} />
                  <span>WISHLIST ({wishlist.length})</span>
                </button>
              </div>

              <button
                onClick={toggleCart}
                className="w-8 h-8 rounded-full bg-[#FBF8F3] border border-[#EFE9E2] flex items-center justify-center text-[#635572] hover:text-[#2B1B3D] hover:bg-white hover:border-[#C9A24D]/50 transition-colors cursor-pointer"
                aria-label="Close cart drawer"
              >
                <X size={16} />
              </button>
            </div>

            {/* 1. 2-TIER GAMIFIED MILESTONE PROGRESS BAR (LIGHT SANCTUARY THEME) */}
            {activeDrawerTab === "cart" && (
              <div className="bg-gradient-to-b from-white to-[#FAF6EE] p-4 border-b border-[#EFE9E2] space-y-2.5 flex-shrink-0">
                {/* Dynamic Copy */}
                <div className="flex items-center justify-between text-xs min-h-[20px]">
                  <p className="text-[11px] sm:text-xs font-semibold text-[#2B1B3D] leading-snug">
                    {milestoneCopy}
                  </p>
                </div>

                {/* Progress Bar Track with Milestone Nodes */}
                <div className="relative pt-1 pb-4">
                  {/* Track line */}
                  <div className="w-full h-2.5 bg-[#EFE9E2] rounded-full overflow-hidden border border-[#E2DDD5]">
                    <div
                      className="h-full bg-gradient-to-r from-[#C9A24D] via-[#DFBA67] to-[#7B4FC9] transition-all duration-500 ease-out shadow-[0_0_8px_rgba(201,162,77,0.35)]"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Tier 1 Node at 50% (₹999) */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                    style={{ marginTop: "-2px" }}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-xs ${
                      isTier1Unlocked 
                        ? "bg-[#7B4FC9] border-[#CDB9F5] text-white scale-110 shadow-sm"
                        : "bg-white border-[#D6CEC4] text-[#9588A3]"
                    }`}>
                      <Truck size={11} strokeWidth={isTier1Unlocked ? 2.5 : 2} />
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider mt-1.5 whitespace-nowrap transition-colors ${
                      isTier1Unlocked ? "text-[#7B4FC9]" : "text-[#9588A3]"
                    }`}>
                      ₹999 Free Ship
                    </span>
                  </div>

                  {/* Tier 2 Node at 100% (₹1,999) */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 right-0 flex flex-col items-center pointer-events-none"
                    style={{ marginTop: "-2px" }}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-xs ${
                      isTier2Unlocked 
                        ? "bg-[#10B981] border-[#A7F3D0] text-white scale-110 shadow-sm"
                        : "bg-white border-[#D6CEC4] text-[#9588A3]"
                    }`}>
                      <Gift size={11} strokeWidth={isTier2Unlocked ? 2.5 : 2} />
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider mt-1.5 whitespace-nowrap transition-colors ${
                      isTier2Unlocked ? "text-[#10B981]" : "text-[#9588A3]"
                    }`}>
                      ₹1,999 Free Gift
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Scrollable Body: Cart Items, Free Gift, Upsell & Promo Code */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-3.5">
              {activeDrawerTab === "cart" ? (
                cart.length === 0 ? (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center h-full text-center text-[#635572] gap-4 py-16">
                    <div className="w-16 h-16 rounded-full bg-white border border-[#EFE9E2] flex items-center justify-center text-[#C9A24D] shadow-xs">
                      <ShoppingBag size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#2B1B3D] mb-1">
                        Your Sacred Bag is Empty
                      </h4>
                      <p className="text-xs text-[#635572] max-w-xs leading-relaxed mx-auto">
                        Explore authentic gemstone talismans and consecrated chakra oils to awaken abundance, love, and protection.
                      </p>
                    </div>
                    <Link
                      href="/shop"
                      onClick={toggleCart}
                      className="mt-2 px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-white btn-amethyst shadow-md"
                    >
                      Explore Sacred Collections
                    </Link>
                  </div>
                ) : (
                  <>
                    {/* 2. Paid Cart Items List */}
                    <div className="space-y-3">
                      {cart.map((item) => {
                        const itemKey = item.cartKey || `${item.id}-${item.selectedBeadSize || '8mm'}`;
                        const linePrice = (item.salePrice || item.price) * item.quantity;
                        const originalPrice = (item.price || item.salePrice || 0) * item.quantity;

                        return (
                          <div
                            key={itemKey}
                            className="p-3.5 rounded-2xl bg-white border border-[#EFE9E2] hover:border-[#C9A24D]/60 transition-all flex gap-3.5 items-center group shadow-2xs"
                          >
                            {/* Product Thumbnail */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FBF8F3] rounded-xl overflow-hidden relative flex-shrink-0 border border-[#EFE9E2]">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-grow min-w-0">
                              <h4 className="text-xs sm:text-sm font-serif font-bold text-[#2B1B3D] leading-snug truncate">
                                {item.name}
                              </h4>

                              {/* Subtle Sacred Trust Badge */}
                              <div className="mt-1">
                                <span className="inline-flex items-center gap-1 text-[9px] text-[#7B4FC9] bg-[#F5F0FD] border border-[#7B4FC9]/25 px-2 py-0.5 rounded-full font-medium">
                                  ✨ 108 Mantra Japa + Sacred Thread Included
                                </span>
                              </div>

                              {/* Item Spec Info */}
                              <div className="flex items-center gap-2 mt-1 text-[11px] text-[#635572]">
                                <span className="px-1.5 py-0.5 rounded bg-[#FBF8F3] border border-[#EFE9E2] text-[10px] text-[#2B1B3D] font-medium">
                                  {item.category === "Oils"
                                    ? (item.id === "oil-7-chakra-master-box" ? "7x10ml Master Box" : "15ml Dropper")
                                    : (item.selectedBeadSize || "8mm Beads")}
                                </span>
                                <span className="text-[#8E6D24] italic truncate text-[10px]">
                                  {item.subCategory || "Consecrated"}
                                </span>
                              </div>

                              {/* Stepper & Price */}
                              <div className="flex items-center justify-between mt-2.5">
                                {/* Quantity Stepper */}
                                <div className="flex items-center border border-[#EFE9E2] rounded-lg bg-[#FBF8F3] px-1 py-0.5">
                                  <button
                                    onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                                    className="p-1 text-[#635572] hover:text-[#2B1B3D] transition-colors cursor-pointer"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus size={11} />
                                  </button>
                                  <span className="w-6 text-center text-xs font-bold text-[#2B1B3D]">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                                    className="p-1 text-[#635572] hover:text-[#2B1B3D] transition-colors cursor-pointer"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus size={11} />
                                  </button>
                                </div>

                                {/* Price & Remove */}
                                <div className="flex items-center gap-2.5">
                                  <div className="text-right">
                                    <span className="text-xs sm:text-sm font-bold text-[#2B1B3D] block">
                                      ₹{linePrice.toLocaleString("en-IN")}
                                    </span>
                                    {originalPrice > linePrice && (
                                      <span className="text-[10px] text-[#9588A3] line-through">
                                        ₹{originalPrice.toLocaleString("en-IN")}
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => removeFromCart(itemKey)}
                                    className="text-[#9588A3] hover:text-rose-600 p-1 cursor-pointer transition-colors"
                                    aria-label="Remove item"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* AUTO-INJECTED FREE GIFT CARD (UNLOCKED AT ₹1,999) */}
                      {isTier2Unlocked && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-3.5 rounded-2xl bg-gradient-to-r from-[#F0FDF4] via-white to-[#F5F0FD] border-2 border-[#10B981]/50 shadow-xs flex gap-3.5 items-center relative overflow-hidden"
                        >
                          <div className="w-16 h-16 sm:w-18 sm:h-18 bg-[#FBF8F3] rounded-xl overflow-hidden relative flex-shrink-0 border border-[#10B981]/35">
                            <Image
                              src="/images/products/selenite-new.jpg"
                              alt="Raw Selenite Energy Charging Plate"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-1 left-1 bg-[#10B981] text-white text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full tracking-wider shadow-2xs">
                              FREE
                            </div>
                          </div>

                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[#065F46] bg-[#EDF7ED] px-2 py-0.5 rounded-full border border-[#A5D6A7] flex items-center gap-1">
                                <Gift size={10} /> Auto-Added Free Gift
                              </span>
                            </div>

                            <h4 className="text-xs sm:text-sm font-serif font-bold text-[#2B1B3D] leading-snug truncate">
                              Raw Selenite Energy Charging Plate
                            </h4>

                            <p className="text-[10px] text-[#635572] truncate mt-0.5">
                              Overnight crystal cleansing & lunar frequency charger
                            </p>

                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-xs font-bold text-[#10B981]">FREE</span>
                                <span className="text-[10px] text-[#9588A3] line-through">₹699</span>
                              </div>
                              <span className="text-[10px] font-semibold text-[#10B981] flex items-center gap-1">
                                <CheckCircle2 size={12} /> Unlocked
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* 3. 1-CLICK PRIEST-RECOMMENDED UPSELL WIDGET */}
                    {!isCleansingBowlInCart && (
                      <div className="pt-1">
                        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FFFDF9] via-white to-[#FAF6EE] border-2 border-dashed border-[#C9A24D]/60 hover:border-[#C9A24D] transition-all space-y-2.5 relative shadow-2xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8E6D24] flex items-center gap-1">
                              <Sparkles size={11} className="text-[#C9A24D]" /> Priest-Recommended In-Cart Add-on
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-[#EDF7ED] text-[#2E7D32] border border-[#A5D6A7]">
                              Save 62%
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-14 h-14 rounded-xl overflow-hidden relative flex-shrink-0 bg-[#FBF8F3] border border-[#EFE9E2]">
                                <Image
                                  src="/images/products/selenite-new.jpg"
                                  alt="Himalayan Selenite Cleansing Bowl"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <h5 className="text-xs font-serif font-bold text-[#2B1B3D] truncate">
                                  Himalayan Selenite Cleansing Bowl
                                </h5>
                                <p className="text-[10px] text-[#635572] truncate mt-0.5">
                                  Pure lunar salt to clear & recharge crystals
                                </p>
                                <div className="flex items-baseline gap-1.5 mt-1">
                                  <span className="text-xs font-bold text-[#7B4FC9]">₹299</span>
                                  <span className="text-[10px] text-[#9588A3] line-through">₹799</span>
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={handleAddCleansingBowlUpsell}
                              className="btn-amethyst px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-xs active:scale-95 transition-all flex-shrink-0 cursor-pointer flex items-center gap-1"
                            >
                              <Plus size={13} strokeWidth={2.5} />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 4. PROMO CODE BOX & CLICKABLE CHIPS */}
                    <div className="pt-1">
                      <div className="p-3.5 rounded-2xl bg-white border border-[#EFE9E2] space-y-2.5 shadow-2xs">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#2B1B3D] flex items-center gap-1.5">
                            <Tag size={13} className="text-[#7B4FC9]" />
                            Sacred Coupon Code
                          </span>
                          {appliedCoupon && (
                            <button
                              onClick={removeCoupon}
                              className="text-[10px] text-rose-600 hover:underline cursor-pointer font-semibold"
                            >
                              Remove ({appliedCoupon})
                            </button>
                          )}
                        </div>

                        <form onSubmit={handleApplyCouponCode} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter code (e.g. DIVINE10)"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            className="flex-grow px-3 py-2 text-xs rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] uppercase text-[#2B1B3D] placeholder-[#9588A3] focus:outline-none focus:border-[#7B4FC9]"
                          />
                          <button
                            type="submit"
                            className="btn-amethyst px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white cursor-pointer shadow-xs"
                          >
                            Apply
                          </button>
                        </form>

                        {/* Available coupon chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {[
                            { code: "DIVINE10", label: "10% OFF" },
                            { code: "LUXURY15", label: "15% OFF" },
                            { code: "DIVINE20", label: "20% OFF" },
                          ].map((c) => {
                            const isSelected = appliedCoupon === c.code;
                            return (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => handleChipCoupon(c.code)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                                  isSelected
                                    ? "bg-[#EDF7ED] border-[#A5D6A7] text-[#2E7D32]"
                                    : "bg-[#FBF8F3] border-[#EFE9E2] text-[#635572] hover:border-[#7B4FC9] hover:text-[#2B1B3D]"
                                }`}
                              >
                                {isSelected && <Check size={10} className="text-[#2E7D32]" />}
                                <span>{c.code} ({c.label})</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                )
              ) : (
                /* Wishlist Tab */
                <div className="space-y-3">
                  {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-[#635572] gap-4 py-16">
                      <Heart size={32} strokeWidth={1.5} className="text-[#C9A24D]" />
                      <h4 className="font-serif text-lg font-bold text-[#2B1B3D]">
                        No saved crystals yet
                      </h4>
                      <p className="text-xs text-[#635572] max-w-xs">
                        Tap the heart icon on any gemstone card to save it to your sacred wishlist.
                      </p>
                    </div>
                  ) : (
                    wishlist.map((id) => {
                      const product = allProducts.find((p) => p.id === id) || fallbackProducts.find((p) => p.id === id);
                      if (!product) return null;
                      const qty = wishlistQuantities[product.id] || 1;
                      const price = (product.salePrice || product.price) * qty;

                      return (
                        <div
                          key={product.id}
                          className="p-3.5 rounded-2xl bg-white border border-[#EFE9E2] flex gap-3.5 items-center group transition-all shadow-2xs"
                        >
                          <Link
                            href={`/product?id=${product.id}`}
                            onClick={toggleCart}
                            className="w-16 h-16 bg-[#FBF8F3] rounded-xl overflow-hidden relative flex-shrink-0 border border-[#EFE9E2] cursor-pointer"
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </Link>

                          <div className="flex-grow min-w-0">
                            <Link
                              href={`/product?id=${product.id}`}
                              onClick={toggleCart}
                              className="block"
                            >
                              <h4 className="text-xs sm:text-sm font-serif font-bold text-[#2B1B3D] leading-snug truncate hover:text-[#7B4FC9] transition-colors">
                                {product.name}
                              </h4>
                            </Link>

                            <div className="flex items-center gap-2 mt-1 text-[11px] text-[#635572]">
                              <span className="text-[#8E6D24] italic truncate text-[10px]">
                                {product.chakra || product.category || "Vedic Energized"}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-2.5">
                              <button
                                onClick={() => {
                                  addToCart(product, qty);
                                  showToast(`✨ Moved ${product.name} to sacred bag!`);
                                }}
                                className="btn-amethyst px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                              >
                                <ShoppingBag size={11} />
                                <span>Move to Bag</span>
                              </button>

                              <div className="flex items-center gap-2.5">
                                <span className="text-xs font-bold text-[#2B1B3D]">
                                  ₹{price.toLocaleString("en-IN")}
                                </span>
                                <button
                                  onClick={() => toggleWishlist(product.id)}
                                  className="text-[#9588A3] hover:text-rose-600 p-1 cursor-pointer transition-colors"
                                  aria-label="Remove from wishlist"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* 4. HIGH-CONVERTING CHECKOUT FOOTER (LIGHT THEME) */}
            {activeDrawerTab === "cart" && cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-[#EFE9E2] bg-white space-y-3 flex-shrink-0 shadow-lg">
                {/* Total Sacred Savings Banner */}
                {totalSacredSavings > 0 && (
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#EDF7ED] via-white to-[#F5F0FD] border border-[#A5D6A7] flex items-center justify-between text-xs">
                    <span className="text-[#1B5E20] font-semibold flex items-center gap-1.5 text-[11px]">
                      <Sparkles size={12} className="text-[#C9A24D]" />
                      Total Sacred Savings Included:
                    </span>
                    <span className="font-extrabold text-[#1B5E20] text-xs sm:text-sm">
                      ₹{totalSacredSavings.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {/* Subtotal, Shipping & Total Calculation */}
                <div className="space-y-1.5 text-xs text-[#635572]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#2B1B3D] font-semibold">₹{rawSubtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-[#1B5E20] font-semibold">
                      <span>Promo Discount ({appliedCoupon})</span>
                      <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>Express Pan-India Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="text-[#1B5E20] font-bold">FREE</strong>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#EFE9E2] flex justify-between items-baseline text-sm">
                    <span className="font-serif font-semibold text-[#2B1B3D]">Estimated Total:</span>
                    <span className="text-xl font-bold font-serif text-[#7B4FC9]">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Primary CTA Button: Full-Width Amethyst Gradient */}
                <div className="pt-1">
                  <Link
                    href="/checkout"
                    onClick={toggleCart}
                    className="w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-serif font-bold tracking-widest uppercase text-white btn-amethyst hover:shadow-[0_8px_30px_rgba(123,79,201,0.4)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md text-center"
                  >
                    <Sparkles size={15} className="text-[#C9A24D]" />
                    <span>PROCEED TO SACRED CHECKOUT</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Micro-Trust & Prepaid Nudge Bar */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-[#635572] pt-1">
                  <ShieldCheck size={13} className="text-[#C9A24D]" />
                  <span>🛡️ Extra 5% Off on UPI / Prepaid • 100% Authentically Sourced Stones</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
