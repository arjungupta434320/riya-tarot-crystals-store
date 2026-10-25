"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { 
  ALL_INDIAN_STATES, 
  lookupIndianPincode, 
  fetchLivePincodeDetails, 
  STATE_PRIMARY_HUBS 
} from "@/lib/pincodes";
import { submitOrder } from "@/lib/supabaseClient";
import { loadRazorpayScript } from "@/lib/razorpay";
import { fireDivineConfetti } from "@/components/animations/ConfettiCelebration";
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  CreditCard, 
  Building2, 
  Banknote,
  Lock,
  ShoppingBag,
  ChevronDown,
  MessageCircle,
  Truck,
  Check
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, clearCart, appliedCoupon, applyCoupon, showToast } = useStore();

  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("Delhi NCR");

  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  );

  // 10% coupon discount if applied
  let couponDiscount = 0;
  if (appliedCoupon === "DIVINE10" || appliedCoupon === "RIYA10") {
    couponDiscount = Math.round(rawSubtotal * 0.10);
  } else if (appliedCoupon === "LUXURY15" || appliedCoupon === "RIYA15" || appliedCoupon === "DIWALI" || appliedCoupon === "SHUBH15") {
    couponDiscount = Math.round(rawSubtotal * 0.15);
  } else if (appliedCoupon === "DIVINE20" || appliedCoupon === "KUNDALI20" || appliedCoupon === "DIWALI20" || appliedCoupon === "SHUBH20") {
    couponDiscount = Math.round(rawSubtotal * 0.20);
  }

  // Free shipping above ₹999
  const freeShippingThreshold = 999;
  const isFreeStandard = (rawSubtotal - couponDiscount) >= freeShippingThreshold || rawSubtotal >= freeShippingThreshold;
  const deliveryFee = deliveryMethod === "express" ? 99 : (isFreeStandard ? 0 : 79);
  const codFee = paymentMethod === "cod" ? 60 : 0;

  const grandTotal = Math.max(0, rawSubtotal - couponDiscount + deliveryFee + codFee);

  // Intelligent Autofill: Triggers only when the full 6-digit PIN code is entered
  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setPincode(val);

    // Only trigger autofill when the customer finishes entering all 6 digits
    if (val.length === 6) {
      // 1. Immediate offline postal database match
      const offlineMatch = lookupIndianPincode(val);
      if (offlineMatch) {
        setCity(offlineMatch.city.split(" / ")[0]);
        setStateName(offlineMatch.state);
      }

      // 2. Real-time official India Post API verification
      const live = await fetchLivePincodeDetails(val);
      if (live) {
        setCity(live.city);
        setStateName(live.state);
      }
    }
  };

  // State selection handler: autofills primary hub if city not customized
  const handleStateChange = (selectedState: string) => {
    setStateName(selectedState);
    if (!city || city === "New Delhi" || city.includes("/")) {
      const hub = STATE_PRIMARY_HUBS[selectedState];
      if (hub) {
        setCity(hub.split(" / ")[0]);
      }
    }
  };

  // Validations
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

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput.trim());
    showToast(res.message, res.success ? "success" : "info");
    if (res.success) setCouponCodeInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      address: true,
      pincode: true,
      city: true,
    });

    if (cart.length === 0) {
      showToast("Your cart is empty.", "info");
      return;
    }

    if (!isFormValid) {
      showToast("Please complete the required address fields.", "info");
      return;
    }

    const orderNum = `RTC-${Math.floor(10000 + Math.random() * 90000)}`;

    if (paymentMethod === "razorpay") {
      setLoading(true);
      const scriptLoaded = await loadRazorpayScript();

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_RiyaTarotGems";

      if (scriptLoaded && (window as any).Razorpay && process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        // Real Razorpay gateway modal
        const rzp = new (window as any).Razorpay({
          key: razorpayKey,
          amount: grandTotal * 100, // paise
          currency: "INR",
          name: "Riya Tarot Crystals",
          description: "Consecrated Gemstones & Bracelets",
          image: "/images/logo.jpg",
          handler: (response: any) => {
            finalizeOrder(orderNum);
          },
          prefill: {
            name: fullName,
            email,
            contact: phone,
          },
          theme: {
            color: "#7B4FC9",
          },
        });
        rzp.open();
        setLoading(false);
        return;
      } else {
        // Simulated test mode for instant checkout test
        setTimeout(() => {
          finalizeOrder(orderNum);
        }, 1000);
      }
    } else {
      // COD Order
      setLoading(true);
      setTimeout(() => {
        finalizeOrder(orderNum);
      }, 800);
    }
  };

  const finalizeOrder = async (orderNum: string) => {
    setOrderId(orderNum);
    setLoading(true);

    try {
      await submitOrder({
        orderId: orderNum,
        customer: {
          name: fullName,
          email,
          phone,
          address: landmark ? `${address} (Landmark: ${landmark})` : address,
          city,
          state: stateName,
          pincode,
        },
        items: cart,
        total: grandTotal,
        paymentMethod: paymentMethod === "razorpay" ? "Razorpay Online (Prepaid)" : "Cash on Delivery (COD)",
        energizationNote: {
          name: fullName,
          dob: "General Vedic Consecration",
          intention: "General Abundance, Health & Spiritual Harmony",
        },
      });
    } catch (err) {
      console.error("Order submit error:", err);
    } finally {
      setLoading(false);
      setStep("confirmed");
      clearCart();
      fireDivineConfetti();
    }
  };

  // 1. Order Confirmed Celebration Page
  if (step === "confirmed") {
    return (
      <div className="min-h-screen py-16 bg-[#FBF8F3] text-[#2B1B3D] flex items-center justify-center px-4">
        <div className="max-w-xl w-full p-8 sm:p-12 rounded-3xl bg-white border border-[#C9A24D]/40 shadow-[0_20px_50px_rgba(123,79,201,0.18)] text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#F5F0FD] border-2 border-[#7B4FC9]/40 text-[#7B4FC9] flex items-center justify-center mx-auto shadow-md animate-bounce">
            <Sparkles size={34} />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E6D24] block mb-1">
              Order Confirmed & Consecration Initiated
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B3D]">
              Blessings to You, {fullName || "Blessed Wearer"}!
            </h2>
            <p className="text-xs sm:text-sm text-[#635572] mt-2 leading-relaxed">
              Your sacred order is in our studio. Each crystal is being ritually cleansed with holy Himalayan sage and energized with 108 Vedic Beej Mantras prior to insured dispatch.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D] space-y-2 text-left">
            <div className="flex justify-between border-b border-[#EFE9E2] pb-2">
              <span className="text-[#635572]">Order Number:</span>
              <strong className="font-mono text-[#7B4FC9]">#{orderId}</strong>
            </div>
            <div className="flex justify-between border-b border-[#EFE9E2] pb-2">
              <span className="text-[#635572]">Destination:</span>
              <span>{city}, {stateName} ({pincode})</span>
            </div>
            <div className="flex justify-between border-b border-[#EFE9E2] pb-2">
              <span className="text-[#635572]">Payment Selected:</span>
              <span className="font-semibold">{paymentMethod === "razorpay" ? "Razorpay Online (Prepaid)" : "Cash on Delivery (COD)"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#635572]">Total Sacred Amount:</span>
              <strong className="text-base text-[#2B1B3D]">₹{grandTotal.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          {/* Action Buttons: WhatsApp notification & Live Order Tracking */}
          <div className="space-y-2.5 pt-2">
            <a
              href={`https://wa.me/917889001587?text=Namaste%20Riya,%20I%20have%20placed%20order%20%23${orderId}%20for%20consecration%20in%20the%20name%20of%20${encodeURIComponent(fullName)}.%20Please%20confirm%20dispatch.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20BD5A] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle size={16} />
              <span>Confirm Order on WhatsApp (+91 78890 01587)</span>
            </a>

            <Link
              href={`/track?orderId=${orderId}`}
              className="w-full py-3.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2B1B3D] btn-pearl-gold block"
            >
              Track Spiritual Energizing Timeline
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Checkout Form Screen
  return (
    <div className="min-h-screen py-8 sm:py-14 bg-[#FBF8F3] text-[#2B1B3D]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635572] hover:text-[#7B4FC9] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </Link>

          <span className="text-xs font-bold text-[#8E6D24] flex items-center gap-1.5">
            <Lock size={13} className="text-[#C9A24D]" />
            <span>256-Bit SSL Encrypted India Checkout</span>
          </span>
        </div>

        {/* 2-Column Checkout Window */}
        <div className="rounded-3xl bg-white border border-[#EFE9E2] shadow-[0_20px_50px_rgba(43,27,61,0.06)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left: Shipping & Payment (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 border-b lg:border-b-0 lg:border-r border-[#EFE9E2]">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7B4FC9] mb-1">
                <Sparkles size={13} className="text-[#C9A24D]" />
                <span>Express Sacred Checkout</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B3D]">
                Shipping & Consecration Address
              </h2>
              <p className="text-xs text-[#635572] mt-0.5">
                Every bracelet is cleansed and dedicated to your name before insured dispatch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="floating-input-group">
                <input
                  id="checkout_name"
                  name="name"
                  autoComplete="name"
                  type="text"
                  required
                  placeholder=" "
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => markTouched("fullName")}
                />
                <label htmlFor="checkout_name">Full Name of Wearer *</label>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="floating-input-group">
                  <input
                    id="checkout_phone"
                    name="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    type="tel"
                    required
                    maxLength={10}
                    placeholder=" "
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => markTouched("phone")}
                  />
                  <label htmlFor="checkout_phone">10-Digit Mobile (WhatsApp Updates) *</label>
                </div>

                <div className="floating-input-group">
                  <input
                    id="checkout_email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    required
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => markTouched("email")}
                  />
                  <label htmlFor="checkout_email">Email Address *</label>
                </div>
              </div>

              {/* Address */}
              <div className="floating-input-group">
                <input
                  id="checkout_address"
                  name="address"
                  autoComplete="street-address"
                  type="text"
                  required
                  placeholder=" "
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={() => markTouched("address")}
                />
                <label htmlFor="checkout_address">Flat, House No., Building, Street *</label>
              </div>

              {/* Landmark */}
              <div className="floating-input-group">
                <input
                  id="checkout_landmark"
                  name="landmark"
                  autoComplete="address-line2"
                  type="text"
                  placeholder=" "
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
                <label htmlFor="checkout_landmark">Nearest Landmark (Optional)</label>
              </div>

              {/* PIN Code, City, State with Instant Autofill */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="floating-input-group">
                  <input
                    id="checkout_pin"
                    name="postal-code"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    type="text"
                    required
                    maxLength={6}
                    placeholder=" "
                    value={pincode}
                    onChange={handlePincodeChange}
                    onBlur={() => markTouched("pincode")}
                  />
                  <label htmlFor="checkout_pin">PIN Code (Autofill) *</label>
                </div>

                <div className="floating-input-group">
                  <input
                    id="checkout_city"
                    name="city"
                    autoComplete="address-level2"
                    type="text"
                    required
                    placeholder=" "
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onBlur={() => markTouched("city")}
                  />
                  <label htmlFor="checkout_city">City / District *</label>
                </div>

                <div className="floating-input-group">
                  <select
                    id="checkout_state"
                    name="state"
                    autoComplete="address-level1"
                    value={stateName}
                    onChange={(e) => handleStateChange(e.target.value)}
                  >
                    {ALL_INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <label htmlFor="checkout_state">State *</label>
                </div>
              </div>

              {/* Delivery Method Selection */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8E6D24] block mb-2">
                  Select Air Delivery Method
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div
                    onClick={() => setDeliveryMethod("standard")}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      deliveryMethod === "standard"
                        ? "bg-[#F5F0FD] border-[#7B4FC9] shadow-xs"
                        : "bg-white border-[#EFE9E2]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#2B1B3D]">Standard Insured Air</span>
                      <span className="font-bold text-[#2E7D32]">
                        {isFreeStandard ? "FREE" : "₹79"}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#635572]">3–5 Business Days (Bluedart/Delhivery)</span>
                  </div>

                  <div
                    onClick={() => setDeliveryMethod("express")}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      deliveryMethod === "express"
                        ? "bg-[#F5F0FD] border-[#7B4FC9] shadow-xs"
                        : "bg-white border-[#EFE9E2]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#2B1B3D]">Express Priority Air</span>
                      <span className="font-bold text-[#7B4FC9]">₹99</span>
                    </div>
                    <span className="text-[11px] text-[#635572]">1–2 Business Days (High Priority)</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8E6D24] block mb-2">
                  Select Sacred Payment Mode
                </span>
                <div className="space-y-2.5">
                  {/* Razorpay Online */}
                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === "razorpay"
                        ? "bg-[#F5F0FD] border-[#7B4FC9] shadow-xs"
                        : "bg-white border-[#EFE9E2]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment_choice"
                        checked={paymentMethod === "razorpay"}
                        onChange={() => setPaymentMethod("razorpay")}
                        className="text-[#7B4FC9] focus:ring-[#7B4FC9]"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#2B1B3D] block">
                          Razorpay India (UPI QR, GPay, PhonePe, Cards, Netbanking)
                        </span>
                        <span className="text-[11px] text-[#635572]">
                          Instant 256-bit secure gateway • Fast track consecration
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#2E7D32] bg-[#EDF7ED] px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "bg-[#F5F0FD] border-[#7B4FC9] shadow-xs"
                        : "bg-white border-[#EFE9E2]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment_choice"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="text-[#7B4FC9] focus:ring-[#7B4FC9]"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#2B1B3D] block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[11px] text-[#635572]">
                          Pay cash upon home arrival (₹60 courier handling fee)
                        </span>
                      </div>
                    </div>
                    <Banknote size={16} className="text-[#635572]" />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-white btn-amethyst flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60"
                >
                  <Lock size={14} className="text-[#C9A24D]" />
                  <span>
                    {loading
                      ? "Processing Consecration Order..."
                      : `Place Sacred Order • ₹${grandTotal.toLocaleString("en-IN")}`}
                  </span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>

          {/* Right: Order Summary (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-[#FAF8F3] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE9E2] mb-4">
                <h3 className="font-serif text-lg font-bold text-[#2B1B3D]">
                  Order Items ({totalQuantity})
                </h3>
                <span className="text-xs text-[#8E6D24] font-semibold">
                  Authentically Sourced
                </span>
              </div>

              {/* Cart Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto no-scrollbar pr-1">
                {cart.map((item) => (
                  <div
                    key={item.cartKey || item.id}
                    className="p-3 rounded-2xl bg-white border border-[#EFE9E2] flex items-center gap-3 shadow-2xs"
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#FAF8F3] flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-bold text-[#2B1B3D] truncate">{item.name}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-[#635572]">
                        <span>Qty: {item.quantity}</span>
                        <span>•</span>
                        <span>{item.selectedBeadSize || "8mm"}</span>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-[#2B1B3D]">
                      ₹{((item.salePrice || item.price) * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Engine */}
              <div className="mt-4 pt-4 border-t border-[#EFE9E2]">
                <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                    placeholder="Coupon code (e.g. DIVINE10)..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-[#EFE9E2] text-[#2B1B3D] uppercase focus:outline-none focus:border-[#C9A24D]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold uppercase text-[#2B1B3D] btn-pearl-gold cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-[#2E7D32] bg-[#EDF7ED] px-3 py-1.5 rounded-xl border border-[#A5D6A7]">
                    <span>Coupon <strong>{appliedCoupon}</strong> active</span>
                    <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="mt-4 pt-4 border-t border-[#EFE9E2] space-y-2 text-xs text-[#635572]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-[#2B1B3D]">₹{rawSubtotal.toLocaleString("en-IN")}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#2E7D32] font-semibold">
                    <span>Discount:</span>
                    <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Air Shipping:</span>
                  <span className="font-semibold text-[#2B1B3D]">
                    {deliveryFee === 0 ? <strong className="text-[#2E7D32]">FREE</strong> : `₹${deliveryFee}`}
                  </span>
                </div>

                {paymentMethod === "cod" && (
                  <div className="flex justify-between">
                    <span>COD Handling:</span>
                    <span className="font-semibold text-[#2B1B3D]">₹60</span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#EFE9E2] flex justify-between text-sm font-bold text-[#2B1B3D]">
                  <span>Total Payable:</span>
                  <span className="text-base text-[#7B4FC9]">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Trust Seal */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#EFE9E2] flex items-center gap-2.5 text-[11px] text-[#635572]">
              <ShieldCheck size={20} className="text-[#C9A24D] flex-shrink-0" />
              <span>
                100% Guaranteed Natural Gemstones. Sealed with holy Raksha Sutra thread and sacred prasad.
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Mobile Sticky Pay Bar */}
      <div 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#EFE9E2] p-3 px-4 shadow-[0_-8px_30px_rgba(43,27,61,0.12)] flex items-center justify-between gap-3"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 12px)" }}
      >
        <div>
          <span className="text-[10px] text-[#635572] uppercase font-semibold block">Total Due</span>
          <span className="text-lg font-bold text-[#2B1B3D]">₹{grandTotal.toLocaleString("en-IN")}</span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-3 px-5 rounded-full text-xs font-semibold uppercase tracking-wider text-white btn-amethyst flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-60"
        >
          <Lock size={13} className="text-[#C9A24D]" />
          <span>{loading ? "Processing..." : "Place Sacred Order"}</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
