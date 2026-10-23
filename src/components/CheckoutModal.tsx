"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { submitOrder } from "@/lib/supabaseClient";
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Banknote,
  RotateCcw,
  ChevronDown,
  ShoppingBag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INDIAN_STATES = [
  "Delhi NCR",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "Uttar Pradesh",
  "Telangana",
  "West Bengal",
  "Rajasthan",
  "Punjab",
  "Haryana",
  "Madhya Pradesh",
  "Kerala",
  "Goa",
  "Chandigarh",
  "Other Indian State"
];

export default function CheckoutModal() {
  const { 
    cart, 
    clearCart, 
    isCheckoutModalOpen, 
    toggleCheckoutModal, 
    appliedCoupon,
    showToast 
  } = useStore();

  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("Delhi NCR");

  // Delivery & Payment
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cards" | "netbanking" | "cod">("upi");

  // Validation Touched States for modern feedback
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity, 
    0
  );
  
  // Tiered discount (15% for 2+ items)
  const isTieredQualified = totalQuantity >= 2;
  const tieredDiscount = isTieredQualified ? Math.round(rawSubtotal * 0.15) : 0;

  // Coupon discount
  let couponDiscount = 0;
  if (appliedCoupon === "DIVINE10" || appliedCoupon === "RIYA10") couponDiscount = Math.round(rawSubtotal * 0.10);
  else if (appliedCoupon === "LUXURY15" || appliedCoupon === "RIYA15") couponDiscount = Math.round(rawSubtotal * 0.15);
  else if (appliedCoupon === "DIVINE20" || appliedCoupon === "KUNDALI20") couponDiscount = Math.round(rawSubtotal * 0.20);

  const totalDiscount = tieredDiscount + couponDiscount;

  // Delivery fee (Free above ₹999)
  const isFreeStandard = (rawSubtotal - totalDiscount) >= 999 || rawSubtotal >= 999;
  const deliveryFee = deliveryMethod === "express" ? 99 : (isFreeStandard ? 0 : 79);

  const grandTotal = Math.max(0, rawSubtotal - totalDiscount + deliveryFee);

  // Field validations
  const isPhoneValid = /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""));
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPincodeValid = /^\d{6}$/.test(pincode.trim());
  const isNameValid = fullName.trim().length >= 3;
  const isAddressValid = address.trim().length >= 8;
  const isCityValid = city.trim().length >= 2;

  const isFormValid = isNameValid && isPhoneValid && isEmailValid && isAddressValid && isPincodeValid && isCityValid;

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      fullName: true,
      phone: true,
      email: true,
      address: true,
      pincode: true,
      city: true,
    });

    if (!isFormValid) {
      showToast("Please verify highlighted fields.", "info");
      return;
    }

    setIsSubmitting(true);
    const orderNum = `#RTC-${Math.floor(10000 + Math.random() * 90000)}`;

    const result = await submitOrder({
      customer: {
        name: fullName,
        phone,
        email,
        address: `${address}${landmark ? `, Near: ${landmark}` : ""}`,
        city,
        state: stateName,
        pincode
      },
      items: cart,
      total: grandTotal,
      paymentMethod: paymentMethod.toUpperCase(),
      energizationNote: {
        name: fullName,
        dob: "General Vedic Consecration",
        intention: "General Abundance, Health & Protection"
      }
    });

    setIsSubmitting(false);
    setCreatedOrderId(result.orderId || orderNum);
    setStep("confirmed");
    clearCart();
  };

  const handleClose = () => {
    toggleCheckoutModal(false);
    setTimeout(() => {
      setStep("form");
    }, 400);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#2C2A29]/35 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal Window: Split-Screen Light Theme (Bottom Sheet on Mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 35 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-5xl bg-[#FFFFFF] rounded-t-[28px] sm:rounded-3xl shadow-[0_25px_60px_rgba(212,175,55,0.22)] border-t sm:border border-[#EAE5DF] z-10 max-h-[94dvh] sm:max-h-[92vh] flex flex-col overflow-hidden pb-safe sm:pb-0"
        >
          {/* Mobile Sheet Drag Indicator */}
          <div className="w-12 h-1.5 bg-[#EAE5DF] rounded-full mx-auto mt-3 mb-1 sm:hidden flex-shrink-0" />

          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EAE5DF] bg-[#FAF9F6] flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FFFFFF] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-xs">
                <Sparkles size={17} />
              </div>
              <div>
                <h3 id="checkout-title" className="font-serif text-sm sm:text-base font-semibold text-[#2C2A29]">
                  {step === "form" ? "Luxury Split-Screen Checkout" : "Order Celebration & Confirmation"}
                </h3>
                <span className="text-[10px] sm:text-[11px] text-[#6E6A64]">
                  Riya Tarot Crystals • Certified & Energized Studio
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white border border-[#EAE5DF] flex items-center justify-center text-[#6E6A64] hover:text-[#2C2A29] transition-colors cursor-pointer"
              aria-label="Close checkout"
            >
              <X size={16} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-grow overflow-y-auto">
            {step === "form" ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
                
                {/* =========================================================
                    LEFT COLUMN: PREMIUM FLOATING-LABEL FORM & OPTIONS (7 cols)
                ========================================================= */}
                <div className="lg:col-span-7 p-4 sm:p-7 space-y-5 sm:space-y-6 border-b lg:border-b-0 lg:border-r border-[#EAE5DF]">
                  
                  {/* Mobile-Only Collapsible Order Summary Bar */}
                  <div className="lg:hidden p-3.5 rounded-2xl bg-[#F8F4EC] border border-[#D4AF37]/40">
                    <button
                      type="button"
                      onClick={() => setIsMobileSummaryOpen(!isMobileSummaryOpen)}
                      className="w-full flex items-center justify-between text-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag size={15} className="text-[#D4AF37]" />
                        <span className="font-semibold text-[#2C2A29]">
                          {isMobileSummaryOpen ? "Hide Order Summary" : "Show Order Summary"}
                        </span>
                        <span className="text-[#9A7B2C] font-bold">({totalQuantity} items)</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-[#2C2A29]">
                        <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 text-[#D4AF37] ${isMobileSummaryOpen ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    {isMobileSummaryOpen && (
                      <div className="pt-3 mt-3 border-t border-[#EAE5DF] space-y-2 text-xs">
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {cart.map((item) => (
                            <div key={item.cartKey || item.id} className="flex items-center justify-between gap-2 text-[11px]">
                              <span className="text-[#2C2A29] truncate flex-1">
                                {item.name} × {item.quantity} {item.category === "Oils" ? "(Sacred Oil)" : `(${item.selectedBeadSize || "8mm"})`}
                              </span>
                              <span className="font-bold text-[#2C2A29] flex-shrink-0">₹{((item.salePrice || item.price) * item.quantity).toLocaleString("en-IN")}</span>
                            </div>
                          ))}
                        </div>
                        {totalDiscount > 0 && (
                          <div className="pt-2 border-t border-[#EAE5DF] flex justify-between text-[#6E6A64] text-[11px]">
                            <span>Savings Applied:</span>
                            <span className="text-emerald-700 font-semibold">-₹{totalDiscount.toLocaleString("en-IN")}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Delivery Address Form with Floating Labels */}
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#2C2A29] mb-3 flex items-center gap-2">
                      <span>1. Shipping & Contact Details</span>
                      <span className="text-[10px] font-sans font-normal text-[#6E6A64]">• Insured Pan-India Air Delivery</span>
                    </h4>

                    <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-3">
                      
                      {/* Full Name */}
                      <div className="floating-input-group">
                        <input
                          id="fullName"
                          type="text"
                          required
                          placeholder=" "
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          onBlur={() => markTouched("fullName")}
                          className={touched.fullName && !isNameValid ? "!border-rose-400 !bg-rose-50/40" : touched.fullName && isNameValid ? "!border-emerald-500" : ""}
                        />
                        <label htmlFor="fullName">Full Name (First and Last Name) *</label>
                        {touched.fullName && !isNameValid && (
                          <span className="text-[10px] text-rose-600 block mt-1 pl-2">Please enter your full name (minimum 3 letters).</span>
                        )}
                      </div>

                      {/* Phone & Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="floating-input-group">
                          <input
                            id="phone"
                            type="tel"
                            required
                            placeholder=" "
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={() => markTouched("phone")}
                            className={touched.phone && !isPhoneValid ? "!border-rose-400 !bg-rose-50/40" : touched.phone && isPhoneValid ? "!border-emerald-500" : ""}
                          />
                          <label htmlFor="phone">Mobile Phone (10 digits) *</label>
                          {touched.phone && !isPhoneValid && (
                            <span className="text-[10px] text-rose-600 block mt-1 pl-2">Valid 10-digit mobile number required.</span>
                          )}
                        </div>

                        <div className="floating-input-group">
                          <input
                            id="email"
                            type="email"
                            required
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => markTouched("email")}
                            className={touched.email && !isEmailValid ? "!border-rose-400 !bg-rose-50/40" : touched.email && isEmailValid ? "!border-emerald-500" : ""}
                          />
                          <label htmlFor="email">Email Address (Order & Tracking) *</label>
                          {touched.email && !isEmailValid && (
                            <span className="text-[10px] text-rose-600 block mt-1 pl-2">Please enter a valid email address.</span>
                          )}
                        </div>
                      </div>

                      {/* Street Address */}
                      <div className="floating-input-group">
                        <input
                          id="address"
                          type="text"
                          required
                          placeholder=" "
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          onBlur={() => markTouched("address")}
                          className={touched.address && !isAddressValid ? "!border-rose-400 !bg-rose-50/40" : touched.address && isAddressValid ? "!border-emerald-500" : ""}
                        />
                        <label htmlFor="address">Street Address / House / Flat No. *</label>
                        {touched.address && !isAddressValid && (
                          <span className="text-[10px] text-rose-600 block mt-1 pl-2">Complete street address required for courier delivery.</span>
                        )}
                      </div>

                      {/* Nearest Landmark */}
                      <div className="floating-input-group">
                        <input
                          id="landmark"
                          type="text"
                          placeholder=" "
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                        />
                        <label htmlFor="landmark">Nearest Landmark (Optional)</label>
                      </div>

                      {/* PIN Code, City, State Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="floating-input-group">
                          <input
                            id="pincode"
                            type="text"
                            required
                            maxLength={6}
                            placeholder=" "
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            onBlur={() => markTouched("pincode")}
                            className={touched.pincode && !isPincodeValid ? "!border-rose-400 !bg-rose-50/40" : touched.pincode && isPincodeValid ? "!border-emerald-500" : ""}
                          />
                          <label htmlFor="pincode">PIN / ZIP (6 Digits) *</label>
                        </div>

                        <div className="floating-input-group">
                          <input
                            id="city"
                            type="text"
                            required
                            placeholder=" "
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onBlur={() => markTouched("city")}
                            className={touched.city && !isCityValid ? "!border-rose-400 !bg-rose-50/40" : touched.city && isCityValid ? "!border-emerald-500" : ""}
                          />
                          <label htmlFor="city">City / District *</label>
                        </div>

                        <div className="floating-input-group">
                          <select
                            id="state"
                            value={stateName}
                            onChange={(e) => setStateName(e.target.value)}
                          >
                            {INDIAN_STATES.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="state">State</label>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Delivery Method Selector */}
                  <div className="pt-2">
                    <h4 className="font-serif text-sm font-semibold text-[#2C2A29] mb-2.5">
                      2. Delivery Method
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setDeliveryMethod("standard")}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          deliveryMethod === "standard"
                            ? "bg-[#F8F4EC] border-[#D4AF37] shadow-xs"
                            : "bg-[#FAF9F6] border-[#EAE5DF] hover:border-[#D4AF37]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#2C2A29]">Standard Insured Delivery</span>
                          <span className="text-xs font-bold text-emerald-800">
                            {isFreeStandard ? "FREE" : "₹79"}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6E6A64]">
                          3–5 Business Days • BlueDart / Delhivery Air
                        </p>
                      </div>

                      <div
                        onClick={() => setDeliveryMethod("express")}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          deliveryMethod === "express"
                            ? "bg-[#F8F4EC] border-[#D4AF37] shadow-xs"
                            : "bg-[#FAF9F6] border-[#EAE5DF] hover:border-[#D4AF37]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#2C2A29]">Express Priority Air</span>
                          <span className="text-xs font-bold text-[#9A7B2C]">₹99</span>
                        </div>
                        <p className="text-[11px] text-[#6E6A64]">
                          1–2 Business Days • Fast-Track Dispatch
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selector (Interactive UI Cards) */}
                  <div className="pt-2">
                    <h4 className="font-serif text-sm font-semibold text-[#2C2A29] mb-2.5">
                      3. Select Payment Method
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: "upi", label: "Instant UPI", sub: "GPay, PhonePe, QR", icon: <Smartphone size={16} /> },
                        { id: "cards", label: "Cards", sub: "Visa, Master, RuPay", icon: <CreditCard size={16} /> },
                        { id: "netbanking", label: "NetBanking", sub: "All Indian Banks", icon: <Building2 size={16} /> },
                        { id: "cod", label: "Cash on Delivery", sub: "COD Available", icon: <Banknote size={16} /> },
                      ].map((pm) => {
                        const isSelected = paymentMethod === pm.id;
                        return (
                          <div
                            key={pm.id}
                            onClick={() => setPaymentMethod(pm.id as any)}
                            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                              isSelected
                                ? "bg-[#F8F4EC] border-[#D4AF37] text-[#2C2A29] shadow-xs"
                                : "bg-[#FAF9F6] border-[#EAE5DF] text-[#6E6A64] hover:border-[#D4AF37]/50"
                            }`}
                          >
                            <div className={`p-1.5 rounded-full ${isSelected ? "text-[#9A7B2C]" : "text-[#6E6A64]"}`}>
                              {pm.icon}
                            </div>
                            <span className="text-xs font-bold text-[#2C2A29]">{pm.label}</span>
                            <span className="text-[9px] text-[#6E6A64]">{pm.sub}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* =========================================================
                    RIGHT COLUMN: ITEMIZED ORDER SUMMARY (5 cols)
                ========================================================= */}
                <div className="lg:col-span-5 p-5 sm:p-7 bg-[#FAF9F6] flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <h4 className="font-serif text-sm font-semibold text-[#2C2A29] flex items-center justify-between pb-2 border-b border-[#EAE5DF]">
                      <span>Order Summary</span>
                      <span className="text-xs text-[#6E6A64] font-normal font-sans">
                        {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
                      </span>
                    </h4>

                    {/* Itemized List */}
                    <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                      {cart.map((item) => (
                        <div key={item.cartKey || item.id} className="flex items-center gap-3 text-xs">
                          <div className="w-12 h-12 rounded-xl bg-white border border-[#EAE5DF] overflow-hidden relative flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h5 className="font-semibold text-[#2C2A29] truncate">{item.name}</h5>
                            <span className="text-[10px] text-[#6E6A64]">
                              Qty: {item.quantity} • {item.category === "Oils" ? "Sacred Oil" : (item.selectedBeadSize || "8mm")}
                            </span>
                          </div>
                          <span className="font-bold text-[#2C2A29] flex-shrink-0">
                            ₹{((item.salePrice || item.price) * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Breakdown Calculation */}
                    <div className="pt-3 border-t border-[#EAE5DF] space-y-2 text-xs text-[#6E6A64]">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="text-[#2C2A29] font-semibold">₹{rawSubtotal.toLocaleString("en-IN")}</span>
                      </div>

                      {tieredDiscount > 0 && (
                        <div className="flex justify-between text-emerald-800 font-semibold">
                          <span>Buy 2 Get 15% Off (Auto-Tiered)</span>
                          <span>-₹{tieredDiscount.toLocaleString("en-IN")}</span>
                        </div>
                      )}

                      {couponDiscount > 0 && (
                        <div className="flex justify-between text-emerald-800 font-semibold">
                          <span>Promo Discount ({appliedCoupon})</span>
                          <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Air Delivery Fee</span>
                        <span>
                          {deliveryFee === 0 ? (
                            <strong className="text-emerald-800">FREE</strong>
                          ) : (
                            `₹${deliveryFee}`
                          )}
                        </span>
                      </div>

                      <div className="pt-3 border-t border-[#EAE5DF] flex justify-between text-base font-bold text-[#2C2A29]">
                        <span>Payable Grand Total:</span>
                        <span className="text-xl text-[#2C2A29]">
                          ₹{grandTotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badge & Submit Button */}
                  <div className="space-y-3 pt-4 border-t border-[#EAE5DF]">
                    <button
                      type="submit"
                      form="checkout-form"
                      disabled={isSubmitting || cart.length === 0}
                      className="w-full py-4 px-6 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2C2A29] btn-gold-shimmer flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Consecrating Order...</span>
                      ) : (
                        <>
                          <Sparkles size={16} className="text-[#2C2A29]" />
                          <span>Place Energized Order • ₹{grandTotal.toLocaleString("en-IN")}</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>

                    <div className="p-3 rounded-2xl bg-white border border-[#EAE5DF] flex items-center justify-center gap-2 text-[10px] text-[#6E6A64]">
                      <ShieldCheck size={14} className="text-[#D4AF37]" />
                      <span>SSL 256-Bit Encrypted • Lab Certificate Included in Box</span>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              /* =========================================================
                  ANIMATED ORDER CONFIRMATION CELEBRATION STATE
              ========================================================= */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-14 text-center max-w-lg mx-auto space-y-5"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F8F4EC] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto shadow-[0_8px_25px_rgba(212,175,55,0.25)]">
                  <Sparkles size={32} />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A7B2C] block mb-1">
                    Order Confirmed & Blessed
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2A29]">
                    Thank You, {fullName || "Blessed Wearer"}!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E6A64] mt-1.5 leading-relaxed">
                    Your sacred order has been received. Our master astrologer will consecrate your crystals with 108 Vedic mantras before insured air dispatch.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE5DF] text-xs text-[#2C2A29] space-y-2 text-left">
                  <div className="flex justify-between border-b border-[#EAE5DF] pb-2">
                    <span className="text-[#6E6A64]">Order ID:</span>
                    <strong className="font-mono text-[#9A7B2C]">{createdOrderId}</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#EAE5DF] pb-2">
                    <span className="text-[#6E6A64]">Shipping Destination:</span>
                    <span className="truncate max-w-[200px]">{city}, {stateName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#EAE5DF] pb-2">
                    <span className="text-[#6E6A64]">Payment Method:</span>
                    <span className="font-semibold">{paymentMethod.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6A64]">Estimated Delivery:</span>
                    <strong className="text-emerald-800">3–5 Business Days</strong>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3.5 px-6 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2C2A29] btn-gold-shimmer"
                >
                  Continue Shopping
                </button>
              </motion.div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
