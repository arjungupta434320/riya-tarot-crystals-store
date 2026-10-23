"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore, Product } from "@/store/useStore";
import { 
  X, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Plus, 
  Minus, 
  Check, 
  Sun,
  Compass,
  ShoppingBag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, wishlist, toggleWishlist, showToast } = useStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedBeadSize, setSelectedBeadSize] = useState<'8mm' | '10mm'>('8mm');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const currentImage = selectedImage || quickViewProduct.image;
  const isWishlisted = wishlist.includes(quickViewProduct.id);
  const price = quickViewProduct.salePrice || quickViewProduct.price;
  const originalPrice = quickViewProduct.price;
  const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedBeadSize);
    setIsAdded(true);
    showToast(`✨ Added ${quantity} × ${quickViewProduct.name} to your bag!`);
    setTimeout(() => {
      setIsAdded(false);
      closeQuickView();
    }, 800);
  };

  const galleryList = quickViewProduct.gallery && quickViewProduct.gallery.length > 0
    ? quickViewProduct.gallery
    : [quickViewProduct.image];

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#2C2A29]/35 backdrop-blur-sm"
          onClick={closeQuickView}
        />

        {/* Modal Window: Native Bottom Sheet on Mobile, Centered Modal on Tablet/Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-t-[28px] sm:rounded-3xl shadow-[0_20px_50px_rgba(212,175,55,0.2)] border-t sm:border border-[#EAE5DF] z-10 max-h-[90dvh] sm:max-h-[90vh] flex flex-col md:flex-row overflow-hidden pb-safe sm:pb-0"
        >
          {/* Mobile Sheet Drag Pill Handle */}
          <div className="w-12 h-1.5 bg-[#EAE5DF] rounded-full mx-auto mt-3 mb-1 sm:hidden flex-shrink-0" />

          {/* Close Button */}
          <button
            onClick={closeQuickView}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#EAE5DF] flex items-center justify-center text-[#6E6A64] hover:text-[#2C2A29] transition-colors"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* Left: Image & Gallery */}
          <div className="w-full md:w-1/2 p-5 sm:p-7 bg-[#FAF9F6] border-b md:border-b-0 md:border-r border-[#EAE5DF] flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Top Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FFFFFF] text-[#9A7B2C] border border-[#D4AF37]/40 shadow-xs">
                  <Sparkles size={11} className="text-[#D4AF37]" />
                  {quickViewProduct.badge || "Energized & Authentically Sourced"}
                </span>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-2 rounded-full border transition-colors ${
                    isWishlisted 
                      ? "bg-[#F4E1D2] text-[#9A7B2C] border-[#D4AF37]" 
                      : "bg-white text-[#6E6A64] border-[#EAE5DF] hover:text-[#9A7B2C]"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Main Image */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#EAE5DF] shadow-inner">
                <Image
                  src={currentImage}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Gallery Thumbnails */}
              {galleryList.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {galleryList.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-14 h-14 rounded-xl overflow-hidden relative border-2 flex-shrink-0 transition-all ${
                        currentImage === img ? "border-[#D4AF37] shadow-xs" : "border-[#EAE5DF] opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Certification Assurance Pill */}
            <div className="mt-4 p-3 rounded-2xl bg-white border border-[#EAE5DF] flex items-center gap-2.5 text-[11px] text-[#6E6A64]">
              <ShieldCheck size={16} className="text-[#D4AF37] flex-shrink-0" />
              <span>
                <strong>Authenticity Verified:</strong> 100% natural earth-mined stone accompanied by official gemological laboratory certificate.
              </span>
            </div>
          </div>

          {/* Right: Product Details, Metaphysical Specs & Add to Bag */}
          <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto space-y-4">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#6E6A64] mb-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#9A7B2C]">
                  {quickViewProduct.subCategory || quickViewProduct.category}
                </span>

                <div className="flex items-center gap-1 text-[#2C2A29] font-bold">
                  <Star size={13} className="fill-[#D4AF37] text-[#D4AF37]" />
                  <span>{quickViewProduct.rating || 4.9}</span>
                  <span className="text-[#6E6A64] font-normal">({quickViewProduct.reviewCount || 180} reviews)</span>
                </div>
              </div>

              <h2 id="quickview-title" className="font-serif text-lg sm:text-xl font-semibold text-[#2C2A29] leading-snug">
                {quickViewProduct.name}
              </h2>

              <p className="text-xs text-[#6E6A64] italic mt-1">
                "{quickViewProduct.shortIntention}"
              </p>

              {/* Explicit 8mm Craftsmanship Callout */}
              <div className="p-3 rounded-2xl bg-[#F8F4EC] border border-[#D4AF37]/40 text-xs text-[#2C2A29] leading-relaxed mt-2.5">
                <div className="flex items-center gap-1.5 font-bold text-[#9A7B2C] text-[11px] uppercase tracking-wider mb-0.5">
                  <Sparkles size={13} className="text-[#D4AF37]" />
                  <span>Handcrafted with Authentic 8mm Gemstone Beads</span>
                </div>
                <p className="text-[#6E6A64] text-[11px] leading-relaxed">
                  {quickViewProduct.description}
                </p>
              </div>

              {/* Pricing Row */}
              <div className="flex items-baseline gap-2.5 mt-3 pb-3 border-b border-[#EAE5DF]">
                <span className="text-xl sm:text-2xl font-bold text-[#2C2A29]">
                  ₹{price.toLocaleString("en-IN")}
                </span>
                {originalPrice > price && (
                  <span className="text-sm text-[#6E6A64] line-through">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Metaphysical Alignment Tag Grid */}
              <div className="grid grid-cols-2 gap-2 my-3 text-[11px]">
                <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE5DF]">
                  <span className="text-[9px] uppercase font-bold text-[#9A7B2C] block">Chakra Meridian:</span>
                  <span className="font-semibold text-[#2C2A29] truncate block">{quickViewProduct.chakra || "Anahata Heart"}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE5DF]">
                  <span className="text-[9px] uppercase font-bold text-[#9A7B2C] block">Ruling Planet / Rashi:</span>
                  <span className="font-semibold text-[#2C2A29] truncate block">{quickViewProduct.planet || "Venus / Shukra"}</span>
                </div>
              </div>

              {/* Metaphysical Benefits List */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#9A7B2C] block">
                  Metaphysical Benefits:
                </span>
                <ul className="space-y-1 text-xs text-[#6E6A64]">
                  {quickViewProduct.benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Sparkles size={12} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bead Size Selector: Only 8mm and 10mm (Custom Fit Removed) */}
              <div className="pt-3 border-t border-[#EAE5DF] mt-3">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#6E6A64]">Bead Dimension:</span>
                  <span className="text-[#2C2A29] font-bold">
                    {selectedBeadSize} {selectedBeadSize === "8mm" ? "(Handcrafted 8mm Standard)" : "(Bold Presence)"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {(["8mm", "10mm"] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedBeadSize(size)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                        selectedBeadSize === size
                          ? "bg-[#F8F4EC] border-[#D4AF37] text-[#2C2A29] shadow-xs font-bold"
                          : "bg-[#FAF9F6] border-[#EAE5DF] text-[#6E6A64] hover:border-[#D4AF37]/50"
                      }`}
                    >
                      {size} {size === "8mm" ? "• Standard Craft" : "• Statement"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Controls: Quantity & Add to Cart */}
            <div className="pt-3 border-t border-[#EAE5DF] space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#EAE5DF] rounded-full bg-[#FAF9F6] px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-[#6E6A64] hover:text-[#2C2A29] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#2C2A29]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-[#6E6A64] hover:text-[#2C2A29] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="flex-grow py-3 px-5 rounded-full text-xs font-semibold tracking-wider uppercase text-white btn-amethyst flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {isAdded ? (
                    <>
                      <Check size={14} className="text-white" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} className="text-white" />
                      <span>Add to Bag • ₹{(price * quantity).toLocaleString("en-IN")}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <Link
                  href={`/product?id=${quickViewProduct.id}`}
                  onClick={closeQuickView}
                  className="text-[#7B4FC9] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>View Full Details & 360° Spin</span>
                  <span>→</span>
                </Link>
                <span className="text-[#635572]">
                  ✨ Free Shipping Above ₹999
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
