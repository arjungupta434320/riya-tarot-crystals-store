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
  Trash2, 
  ArrowRight, 
  Tag, 
  Check, 
  ShieldCheck 
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
    toggleCheckoutModal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    showToast
  } = useStore();

  const [couponInput, setCouponInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>(fallbackProducts);
  const [wishlistQuantities, setWishlistQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchProducts().then(setAllProducts);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  );

  // Tiered discount logic: Buy 2 get 15% off automatically
  const isTieredQualified = totalQuantity >= 2;
  const tieredDiscount = isTieredQualified ? Math.round(rawSubtotal * 0.15) : 0;

  // Coupon discount logic
  let couponDiscount = 0;
  if (appliedCoupon === "RIYA10") couponDiscount = Math.round(rawSubtotal * 0.10);
  else if (appliedCoupon === "LUXURY15" || appliedCoupon === "RIYA15") couponDiscount = Math.round(rawSubtotal * 0.15);
  else if (appliedCoupon === "DIVINE20" || appliedCoupon === "KUNDALI20") couponDiscount = Math.round(rawSubtotal * 0.20);

  const totalDiscount = tieredDiscount + couponDiscount;

  // Shipping logic: Free above ₹1,499
  const freeShippingThreshold = 1499;
  const isFreeShipping = (rawSubtotal - totalDiscount) >= freeShippingThreshold || rawSubtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping || cart.length === 0 ? 0 : 99;

  const grandTotal = Math.max(0, rawSubtotal - totalDiscount + shippingFee);

  // Free shipping progress
  const progressPercent = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));

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

  const handleAddUpsell = (upsell: Product) => {
    addToCart(upsell, 1, "8mm");
    showToast(`✨ Added ${upsell.name} to complete your set!`);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[80] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#2C2A29]/30 backdrop-blur-sm transition-opacity"
            onClick={toggleCart}
          />

          {/* Responsive Drawer: Bottom-sheet slide-up on mobile, right slide-over on desktop */}
          <motion.div
            initial={isMobile ? { y: "100%" } : { x: "100%" }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: "100%" } : { x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 right-0 max-h-[92dvh] sm:max-h-none sm:top-0 h-full w-full sm:w-[440px] bg-[#FFFFFF] rounded-t-3xl sm:rounded-none shadow-2xl z-10 flex flex-col border-t sm:border-t-0 sm:border-l border-[#EAE5DF]"
          >
            {/* Mobile Drag Indicator */}
            <div className="sm:hidden w-full pt-2.5 pb-1 flex justify-center bg-[#FAF9F6] rounded-t-3xl">
              <div className="w-10 h-1 bg-[#D4AF37]/40 rounded-full" />
            </div>

            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-[#EAE5DF] bg-[#FAF9F6] flex items-center justify-between flex-shrink-0">
              <div className="flex gap-6">
                <button
                  onClick={() => setDrawerTab("cart")}
                  className={`font-serif tracking-wider text-sm pb-1 transition-all cursor-pointer ${
                    activeDrawerTab === "cart"
                      ? "border-b-2 border-[#D4AF37] text-[#2C2A29] font-bold"
                      : "text-[#6E6A64] hover:text-[#2C2A29]"
                  }`}
                >
                  YOUR BAG ({totalQuantity})
                </button>
                <button
                  onClick={() => setDrawerTab("wishlist")}
                  className={`font-serif tracking-wider text-sm pb-1 transition-all cursor-pointer ${
                    activeDrawerTab === "wishlist"
                      ? "border-b-2 border-[#D4AF37] text-[#2C2A29] font-bold"
                      : "text-[#6E6A64] hover:text-[#2C2A29]"
                  }`}
                >
                  WISHLIST ({wishlist.length})
                </button>
              </div>

              <button
                onClick={toggleCart}
                className="w-8 h-8 rounded-full bg-white border border-[#EAE5DF] flex items-center justify-center text-[#6E6A64] hover:text-[#2C2A29] transition-colors"
                aria-label="Close cart"
              >
                <X size={16} />
              </button>
            </div>

            {/* Free Shipping & Tiered Discount Progress Bar */}
            {activeDrawerTab === "cart" && cart.length > 0 && (
              <div className="bg-[#F8F4EC] p-4 border-b border-[#EAE5DF] space-y-2 flex-shrink-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#2C2A29] flex items-center gap-1.5">
                    <Truck size={14} className="text-[#D4AF37]" />
                    {isFreeShipping ? (
                      <span className="text-emerald-800 font-bold">✨ Free Express Shipping Unlocked!</span>
                    ) : (
                      <span>Add ₹{freeShippingThreshold - rawSubtotal} for FREE Shipping</span>
                    )}
                  </span>
                  
                  <span className="text-[11px] font-bold text-[#9A7B2C]">
                    {isTieredQualified ? "15% Duo Discount Active!" : "Buy 2 for 15% Off"}
                  </span>
                </div>

                {/* Progress bar track in Champagne Gold */}
                <div className="w-full h-2 bg-[#EAE5DF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#C59B27] transition-all duration-400 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Body */}
            <div className="flex-grow overflow-y-auto p-5 sm:p-6 space-y-4">
              {activeDrawerTab === "cart" ? (
                cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-[#6E6A64] gap-4 py-16">
                    <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-[#EAE5DF] flex items-center justify-center text-[#D4AF37]">
                      <ShoppingBag size={30} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-[#2C2A29] mb-1">
                        Your Sacred Bag is Empty
                      </h4>
                      <p className="text-xs text-[#6E6A64] max-w-xs leading-relaxed">
                        Explore our authentically sourced healed crystal bracelets to awaken abundance, love, and protection.
                      </p>
                    </div>
                    <button
                      onClick={toggleCart}
                      className="mt-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2C2A29] btn-gold-shimmer"
                    >
                      Explore Collections
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items List */}
                    <div className="space-y-3.5">
                      {cart.map((item) => {
                        const itemKey = item.cartKey || `${item.id}-${item.selectedBeadSize || '8mm'}`;
                        const linePrice = (item.salePrice || item.price) * item.quantity;

                        return (
                          <div
                            key={itemKey}
                            className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] shadow-xs flex gap-3.5 items-center group"
                          >
                            <div className="w-18 h-18 bg-[#FAF9F6] rounded-xl overflow-hidden relative flex-shrink-0 border border-[#EAE5DF]">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>

                            <div className="flex-grow min-w-0">
                              <h4 className="text-xs font-semibold text-[#2C2A29] leading-snug truncate">
                                {item.name}
                              </h4>

                              <div className="flex items-center gap-2 mt-1 text-[11px] text-[#6E6A64]">
                                <span className="px-1.5 py-0.5 rounded bg-[#FAF9F6] border border-[#EAE5DF] font-medium">
                                  {item.category === "Oils" 
                                    ? (item.id === "oil-7-chakra-master-box" ? "7x10ml Master Box" : "15ml Dropper")
                                    : (item.selectedBeadSize || "8mm")}
                                </span>
                                <span className="text-[#9A7B2C] italic truncate">
                                  {item.subCategory || "Energized"}
                                </span>
                              </div>

                              <div className="flex items-center justify-between mt-2.5">
                                <div className="flex items-center border border-[#EAE5DF] rounded-lg bg-[#FAF9F6] px-1.5 py-0.5">
                                  <button
                                    onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                                    className="p-1 text-[#6E6A64] hover:text-[#2C2A29] cursor-pointer"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus size={11} />
                                  </button>
                                  <span className="w-6 text-center text-xs font-bold text-[#2C2A29]">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                                    className="p-1 text-[#6E6A64] hover:text-[#2C2A29] cursor-pointer"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus size={11} />
                                  </button>
                                </div>

                                <div className="flex items-center gap-2.5">
                                  <span className="text-xs font-bold text-[#2C2A29]">
                                    ₹{linePrice.toLocaleString("en-IN")}
                                  </span>
                                  <button
                                    onClick={() => removeFromCart(itemKey)}
                                    className="text-[#6E6A64] hover:text-rose-600 p-1 cursor-pointer transition-colors"
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
                    </div>

                    {/* In-Cart Upsell Strip: "Complete Your Energy Set" */}
                    <div className="pt-2">
                      <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#EAE5DF] space-y-2.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#9A7B2C] flex items-center gap-1">
                          <Sparkles size={11} /> Complete Your Energy Set
                        </span>

                        <div className="space-y-2">
                          {cartUpsells.map((upsell) => (
                            <div
                              key={upsell.id}
                              className="p-2.5 rounded-xl bg-white border border-[#EAE5DF] flex items-center justify-between gap-2.5"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-11 h-11 rounded-lg overflow-hidden relative flex-shrink-0 bg-[#FAF9F6] border border-[#EAE5DF]">
                                  <Image src={upsell.image} alt={upsell.name} fill className="object-cover" />
                                </div>
                                <div className="min-w-0">
                                  <h5 className="text-[11px] font-semibold text-[#2C2A29] truncate">{upsell.name}</h5>
                                  <span className="text-xs font-bold text-[#9A7B2C]">₹{upsell.salePrice}</span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleAddUpsell(upsell)}
                                className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-[#2C2A29] btn-pearl-gold flex-shrink-0 cursor-pointer"
                              >
                                + Add
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Coupon Application Box & Clickable Chips */}
                    <div className="pt-1">
                      <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#2C2A29] flex items-center gap-1">
                            <Tag size={13} className="text-[#D4AF37]" />
                            Promo Code
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
                            placeholder="Enter code (e.g. RIYA15)"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            className="flex-grow px-3 py-2 text-xs rounded-xl bg-[#FAF9F6] border border-[#EAE5DF] uppercase text-[#2C2A29] focus:outline-none focus:border-[#D4AF37]"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#2C2A29] btn-pearl-gold cursor-pointer"
                          >
                            Apply
                          </button>
                        </form>

                        {/* Available coupon chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {["RIYA10", "LUXURY15", "DIVINE20"].map((code) => {
                            const isSelected = appliedCoupon === code;
                            return (
                              <button
                                key={code}
                                type="button"
                                onClick={() => handleChipCoupon(code)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                                  isSelected
                                    ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                                    : "bg-[#FAF9F6] border-[#D4AF37]/40 text-[#6E6A64] hover:border-[#D4AF37]"
                                }`}
                              >
                                {isSelected && <Check size={10} className="text-emerald-600" />}
                                <span>{code}</span>
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
                <div className="space-y-3.5">
                  {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-[#6E6A64] gap-4 py-16">
                      <Heart size={32} strokeWidth={1.5} className="text-[#D4AF37]" />
                      <h4 className="font-serif text-base font-semibold text-[#2C2A29]">
                        No saved crystals yet
                      </h4>
                      <p className="text-xs text-[#6E6A64] max-w-xs">
                        Tap the heart icon on any product card to save it to your wishlist.
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
                          className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] shadow-xs flex gap-3.5 items-center group transition-all"
                        >
                          {/* Image */}
                          <Link
                            href={`/product?id=${product.id}`}
                            onClick={toggleCart}
                            className="w-18 h-18 bg-[#FAF9F6] rounded-xl overflow-hidden relative flex-shrink-0 border border-[#EAE5DF] cursor-pointer"
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </Link>

                          {/* Content */}
                          <div className="flex-grow min-w-0">
                            <Link
                              href={`/product?id=${product.id}`}
                              onClick={toggleCart}
                              className="block"
                            >
                              <h4 className="text-xs font-semibold text-[#2C2A29] leading-snug truncate hover:text-[#7B4FC9] transition-colors">
                                {product.name}
                              </h4>
                            </Link>

                            <div className="flex items-center gap-2 mt-1 text-[11px] text-[#6E6A64]">
                              <span className="px-1.5 py-0.5 rounded bg-[#FAF9F6] border border-[#EAE5DF] font-medium text-[10px]">
                                8mm
                              </span>
                              <span className="text-[#9A7B2C] italic truncate text-[11px] capitalize">
                                {product.category || product.subCategory || "Vedic Energized"}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-2.5">
                              {/* Quantity & Move to bag */}
                              <div className="flex items-center gap-2">
                                <div className="flex items-center border border-[#EAE5DF] rounded-lg bg-[#FAF9F6] px-1.5 py-0.5">
                                  <button
                                    onClick={() => setWishlistQuantities((prev) => ({ ...prev, [product.id]: Math.max(1, qty - 1) }))}
                                    className="p-1 text-[#6E6A64] hover:text-[#2C2A29] cursor-pointer"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus size={11} />
                                  </button>
                                  <span className="w-6 text-center text-xs font-bold text-[#2C2A29]">
                                    {qty}
                                  </span>
                                  <button
                                    onClick={() => setWishlistQuantities((prev) => ({ ...prev, [product.id]: qty + 1 }))}
                                    className="p-1 text-[#6E6A64] hover:text-[#2C2A29] cursor-pointer"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus size={11} />
                                  </button>
                                </div>

                                <button
                                  onClick={() => {
                                    addToCart(product, qty);
                                    showToast(`✨ Moved ${product.name} to sacred bag!`);
                                  }}
                                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-[#7B4FC9] bg-[#F5F0FD] border border-[#7B4FC9]/30 hover:bg-[#7B4FC9] hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                                  title="Add to sacred bag"
                                >
                                  <ShoppingBag size={11} />
                                  <span>Add</span>
                                </button>
                              </div>

                              {/* Price & Delete */}
                              <div className="flex items-center gap-2.5">
                                <span className="text-xs font-bold text-[#2C2A29]">
                                  ₹{price.toLocaleString("en-IN")}
                                </span>
                                <button
                                  onClick={() => toggleWishlist(product.id)}
                                  className="text-[#6E6A64] hover:text-rose-600 p-1 cursor-pointer transition-colors"
                                  aria-label="Remove from wishlist"
                                  title="Remove from wishlist"
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

            {/* Footer Summary & Checkout Button with Safe Area Padding */}
            {activeDrawerTab === "cart" && cart.length > 0 && (
              <div className="p-4 sm:p-6 pb-safe sm:pb-6 border-t border-[#EAE5DF] bg-[#FAF9F6] space-y-3 flex-shrink-0">
                <div className="space-y-1.5 text-xs text-[#6E6A64]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#2C2A29] font-semibold">₹{rawSubtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {tieredDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Buy 2 Tiered Discount (15%)</span>
                      <span>-₹{tieredDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promo Code ({appliedCoupon})</span>
                      <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Insured Delivery</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="text-emerald-700">FREE</strong>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#EAE5DF] flex justify-between text-sm font-semibold text-[#2C2A29]">
                    <span>Final Amount:</span>
                    <span className="text-base font-bold text-[#2C2A29]">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href="/checkout"
                    onClick={toggleCart}
                    className="w-full py-3.5 px-6 rounded-full text-xs font-semibold tracking-wider uppercase text-white btn-amethyst flex items-center justify-center gap-2 cursor-pointer shadow-md text-center"
                  >
                    <Sparkles size={15} className="text-[#C9A24D]" />
                    <span>Proceed to Express Checkout</span>
                    <ArrowRight size={14} />
                  </a>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#6E6A64] pt-0.5">
                  <ShieldCheck size={12} className="text-[#D4AF37]" />
                  <span>256-Bit SSL Encrypted • Lab Certificate Included</span>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
