"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useStore, Product, KundliDetails } from "@/store/useStore";
import { fetchProducts, fallbackProducts } from "@/data/products";
import { 
  Star, 
  Heart, 
  Share2, 
  Plus, 
  Minus, 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  Moon, 
  Check, 
  Lock, 
  ShoppingBag,
  Compass,
  Ruler,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Flame,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Image360Viewer } from "@/components/shop/Image360Viewer";
import { SizeGuideModal } from "@/components/shop/SizeGuideModal";

function ProductContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { addToCart, wishlist, toggleWishlist, toggleCart, showToast } = useStore();
  
  // Synchronous fallback ensures zero flash/delay
  const initialFound = fallbackProducts.find((p) => p.id === id) || fallbackProducts[0];
  const [product, setProduct] = useState<Product | null>(initialFound);
  const [allProducts, setAllProducts] = useState<Product[]>(fallbackProducts);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedBeadSize, setSelectedBeadSize] = useState<"8mm" | "10mm">("8mm");
  const [selectedWristSize, setSelectedWristSize] = useState<string>('Standard Elastic (6.5" - 7.5")');
  const [activeTab, setActiveTab] = useState<"about" | "wearCare" | "energizing">("about");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [showStickyAdd, setShowStickyAdd] = useState(false);

  // Kundli customization form
  const [kundliName, setKundliName] = useState("");
  const [kundliDob, setKundliDob] = useState("");
  const [kundliTob, setKundliTob] = useState("");
  const [kundliPob, setKundliPob] = useState("");
  const [kundliIntention, setKundliIntention] = useState("");

  // Customer Reviews
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const sampleReviews = [
    {
      id: "rev-1",
      name: "Pooja Verma",
      city: "Mumbai",
      rating: 5,
      date: "14 Oct 2026",
      text: "The energy of this bracelet is palpable immediately upon unboxing! Riya's energized packaging with the sacred thread made it feel like a temple prasad. Wore it to my quarterly board presentation and felt an immense calm.",
      verified: true,
    },
    {
      id: "rev-2",
      name: "Aman Singhania",
      city: "Bengaluru",
      rating: 5,
      date: "08 Oct 2026",
      text: "Genuine Grade-A stones. You can test the weight and cold temperature of natural crystals. Pyrite beads have brilliant brassy luster. Highly recommend opting for 10mm if you like heavy presence.",
      verified: true,
    },
    {
      id: "rev-3",
      name: "Dr. Radhika Nair",
      city: "New Delhi",
      rating: 5,
      date: "29 Sep 2026",
      text: "I provided my birth details for the Kundali consecration. The bracelet arrived charged and aligned. Sleeping with it on my bedside table has completely cured my late-night anxiety cycles.",
      verified: true,
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyAdd(window.scrollY > 450);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    fetchProducts().then((products) => {
      setAllProducts(products);
      const found = products.find((p) => p.id === id) || products[0];
      if (found) {
        setProduct(found);
      }
    });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen py-32 flex flex-col items-center justify-center text-[#635572]">
        <Sparkles className="w-8 h-8 text-[#C9A24D] animate-spin mb-4" />
        <p className="font-serif text-lg text-[#2B1B3D]">Invoking crystal energy...</p>
      </div>
    );
  }

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const isKundaliProduct =
    product.subCategory === "Kundali Bracelets" ||
    product.name.toLowerCase().includes("kundali") ||
    product.name.toLowerCase().includes("shani") ||
    product.name.toLowerCase().includes("surya");

  // Price adjustment for 10mm beads
  const basePrice = product.salePrice || product.price;
  const beadPriceModifier = selectedBeadSize === "10mm" ? 300 : 0;
  const currentPrice = basePrice + beadPriceModifier;
  const originalPrice = (product.price || basePrice) + beadPriceModifier;
  const discount = originalPrice > currentPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    let customKundli: KundliDetails | undefined = undefined;
    if (isKundaliProduct && kundliName.trim()) {
      customKundli = {
        fullName: kundliName.trim(),
        dob: kundliDob,
        tob: kundliTob,
        pob: kundliPob,
        intention: kundliIntention,
      };
    }

    addToCart(product, quantity, selectedBeadSize, selectedWristSize, customKundli);
    setJustAdded(true);
    showToast(`✨ Added ${product.name} to your sacred bag!`);
    setTimeout(() => {
      setJustAdded(false);
      toggleCart();
    }, 700);
  };

  const handleBuyNow = () => {
    let customKundli: KundliDetails | undefined = undefined;
    if (isKundaliProduct && kundliName.trim()) {
      customKundli = {
        fullName: kundliName.trim(),
        dob: kundliDob,
        tob: kundliTob,
        pob: kundliPob,
        intention: kundliIntention,
      };
    }
    addToCart(product, quantity, selectedBeadSize, selectedWristSize, customKundli);
    router.push("/checkout");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortIntention,
          url: window.location.href,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("✨ Sacred link copied to clipboard!");
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    setReviewSubmitted(true);
    showToast("✨ Thank you for sharing your divine experience!");
  };

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="relative pt-4 sm:pt-8 pb-24 bg-[#FBF8F3] text-[#2B1B3D] overflow-x-hidden">
      
      {/* Divine Celestial Ambient Aura */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#CDB9F5]/30 via-[#F4C6D0]/20 to-[#C9A24D]/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* Container */}
      <div className="container mx-auto px-4 sm:px-6 relative">
        
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-[11px] sm:text-xs text-[#635572] mb-6 overflow-x-auto no-scrollbar"
        >
          <Link href="/" className="hover:text-[#7B4FC9] transition-colors whitespace-nowrap">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#7B4FC9] transition-colors whitespace-nowrap">{product.category}</Link>
          <span>/</span>
          <span className="text-[#7B4FC9] font-semibold whitespace-nowrap truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </motion.div>

        {/* Product Showcase: 2 Columns */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 mb-16">
          
          {/* Left Column: 360 Spin & Image Showcase with Entrance Aura */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 flex flex-col gap-4 relative"
          >
            {/* Shimmering Sacred Consecration Seal */}
            <div className="absolute -top-3 -right-2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#7B4FC9] to-[#5E37A1] text-white text-[10px] font-bold uppercase tracking-wider shadow-md border border-[#C9A24D]/60 animate-bounce">
              <Sparkles size={11} className="text-[#C9A24D]" />
              <span>108 Vedic Mantras Charged</span>
            </div>

            <Image360Viewer images={galleryImages} productName={product.name} />
          </motion.div>

          {/* Right Column: Details & Customization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 flex flex-col justify-start space-y-5"
          >
            
            {/* Header / Badges */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#F5F0FD] text-[#7B4FC9] border border-[#7B4FC9]/30">
                    {product.badge || "Vedic Energized"}
                  </span>
                  {discount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#EDF7ED] text-[#2E7D32] border border-[#A5D6A7]">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2 rounded-full border transition-colors cursor-pointer ${
                      wishlist.includes(product.id)
                        ? "bg-[#FDF2F4] text-[#B83D60] border-[#F4C6D0]"
                        : "bg-white text-[#635572] border-[#EFE9E2] hover:text-[#7B4FC9]"
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart size={16} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-white border border-[#EFE9E2] text-[#635572] hover:text-[#7B4FC9] transition-colors cursor-pointer"
                    aria-label="Share"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2B1B3D] font-bold leading-tight">
                {product.name}
              </h1>

              {/* Rating & Intention */}
              <div className="flex items-center gap-3 mt-2 text-xs">
                <div className="flex items-center gap-1 font-bold text-[#2B1B3D]">
                  <Star size={13} className="fill-[#C9A24D] text-[#C9A24D]" />
                  <span>{product.rating || 4.9}</span>
                  <span className="text-[#635572] font-normal">({product.reviewCount || 340} reviews)</span>
                </div>
                <span className="text-[#EFE9E2]">|</span>
                <span className="text-[#8E6D24] font-semibold uppercase tracking-wider text-[11px]">
                  {product.chakra || "All Chakras"}
                </span>
              </div>

              <p className="mt-2 text-xs sm:text-sm text-[#635572] italic leading-relaxed">
                "{product.shortIntention}"
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white border border-[#EFE9E2] flex items-baseline justify-between shadow-2xs">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2B1B3D]">
                  ₹{currentPrice.toLocaleString("en-IN")}
                </span>
                {originalPrice > currentPrice && (
                  <span className="text-xs sm:text-sm text-[#9588A3] line-through">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-[10px] text-[#2E7D32] font-bold bg-[#EDF7ED] px-2 py-0.5 rounded-full">
                  Save ₹{(originalPrice - currentPrice).toLocaleString("en-IN")}
                </span>
              </div>
              <span className="text-[11px] text-[#635572]">All taxes & GST included</span>
            </div>

            {/* Bead Size Selector (for Bracelets) */}
            {product.category === "Heal Energized Bracelets" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#2B1B3D] uppercase tracking-wider text-[11px]">
                    Select Gemstone Bead Diameter
                  </span>
                  <span className="text-[#7B4FC9] font-bold">{selectedBeadSize} Spheres</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedBeadSize("8mm")}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedBeadSize === "8mm"
                        ? "bg-[#F5F0FD] border-[#7B4FC9] shadow-xs"
                        : "bg-white border-[#EFE9E2] hover:border-[#C9A24D]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-[#2B1B3D]">8mm Classical</span>
                      <span className="text-[10px] text-[#8E6D24] font-semibold">Standard</span>
                    </div>
                    <p className="text-[11px] text-[#635572]">Delicate & comfortable for daily wear / stacking</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedBeadSize("10mm")}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedBeadSize === "10mm"
                        ? "bg-[#F5F0FD] border-[#7B4FC9] shadow-xs"
                        : "bg-white border-[#EFE9E2] hover:border-[#C9A24D]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-[#2B1B3D]">10mm Sovereign (+₹300)</span>
                      <span className="text-[10px] text-[#7B4FC9] font-semibold">Heavy Weight</span>
                    </div>
                    <p className="text-[11px] text-[#635572]">Bold luxury mass, strong planetary resonance</p>
                  </button>
                </div>
              </div>
            )}

            {/* Wrist Size Selector with Guide */}
            {product.category === "Heal Energized Bracelets" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#2B1B3D] uppercase tracking-wider text-[11px]">
                    Wrist Size
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#7B4FC9] hover:underline flex items-center gap-1 font-semibold text-[11px] cursor-pointer"
                  >
                    <Ruler size={13} />
                    <span>Size Guide Modal</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    'Small (6.0" - 6.5")',
                    'Standard Elastic (6.5" - 7.5")',
                    'Large (7.5" - 8.5")',
                  ].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedWristSize(size)}
                      className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer text-[11px] ${
                        selectedWristSize === size
                          ? "bg-[#7B4FC9] text-white border-[#7B4FC9] font-bold shadow-xs"
                          : "bg-white text-[#635572] border-[#EFE9E2] hover:border-[#C9A24D]/40"
                      }`}
                    >
                      {size.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bespoke Kundali Customization Form */}
            {isKundaliProduct && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-[#C9A24D]/40 space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#C9A24D]" />
                  <h4 className="font-serif text-sm font-bold text-[#2B1B3D] uppercase tracking-wider">
                    Bespoke Kundali & Birth Consecration
                  </h4>
                </div>
                <p className="text-[11px] text-[#635572]">
                  This bracelet will be ritually consecrated with a personalized Vedic Sankalpa in your name and birth planetary chart:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <label className="text-[10px] font-semibold text-[#635572] uppercase block mb-1">
                      Full Name of Wearer *
                    </label>
                    <input
                      type="text"
                      value={kundliName}
                      onChange={(e) => setKundliName(e.target.value)}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#EFE9E2] text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-[#635572] uppercase block mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={kundliDob}
                      onChange={(e) => setKundliDob(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#EFE9E2] text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-[#635572] uppercase block mb-1">
                      Time of Birth (Optional)
                    </label>
                    <input
                      type="time"
                      value={kundliTob}
                      onChange={(e) => setKundliTob(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#EFE9E2] text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-[#635572] uppercase block mb-1">
                      Place of Birth (City, State)
                    </label>
                    <input
                      type="text"
                      value={kundliPob}
                      onChange={(e) => setKundliPob(e.target.value)}
                      placeholder="e.g. Pune, Maharashtra"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#EFE9E2] text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center rounded-full bg-white border border-[#EFE9E2] p-1 shadow-2xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#635572] hover:bg-[#FBF8F3] transition-colors cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-9 text-center font-bold text-xs text-[#2B1B3D]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#635572] hover:bg-[#FBF8F3] transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={justAdded}
                  className={`flex-1 py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all ${
                    justAdded ? "bg-[#EDF7ED] text-[#2E7D32] border border-[#A5D6A7]" : "btn-amethyst"
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check size={16} />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>

              {/* Buy Now & WhatsApp */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2B1B3D] btn-gold-shimmer cursor-pointer shadow-sm text-center"
                >
                  Buy Now (Instant Checkout)
                </button>

                <a
                  href={`https://wa.me/917889001587?text=Hello%20Riya,%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}.%20Can%20you%20guide%20me%20on%20its%20astrological%20alignment?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2B1B3D] bg-white border border-[#25D366]/50 hover:bg-[#25D366]/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs text-center"
                >
                  <MessageCircle size={15} className="text-[#25D366]" />
                  <span>Ask Riya on WhatsApp</span>
                </a>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Informational Tabs: About, Wear & Care, Energizing */}
        <div className="mb-16">
          <div className="flex border-b border-[#EFE9E2] mb-6 justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab("about")}
              className={`pb-3 relative transition-colors cursor-pointer ${
                activeTab === "about" ? "text-[#7B4FC9] font-bold" : "text-[#635572] hover:text-[#2B1B3D]"
              }`}
            >
              Crystal Properties
              {activeTab === "about" && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7B4FC9]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("wearCare")}
              className={`pb-3 relative transition-colors cursor-pointer ${
                activeTab === "wearCare" ? "text-[#7B4FC9] font-bold" : "text-[#635572] hover:text-[#2B1B3D]"
              }`}
            >
              How to Wear & Care
              {activeTab === "wearCare" && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7B4FC9]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("energizing")}
              className={`pb-3 relative transition-colors cursor-pointer ${
                activeTab === "energizing" ? "text-[#7B4FC9] font-bold" : "text-[#635572] hover:text-[#2B1B3D]"
              }`}
            >
              Our Energizing Ritual
              {activeTab === "energizing" && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7B4FC9]" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs max-w-4xl mx-auto">
            {activeTab === "about" && (
              <div className="space-y-6 text-xs sm:text-sm text-[#635572] leading-relaxed">
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-[#2B1B3D] font-semibold mb-2">
                    Spiritual Origin & Gemological Description
                  </h3>
                  <p>{product.description}</p>
                </div>

                {/* Astrological & Metaphysical Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2]">
                    <span className="text-[10px] uppercase font-bold text-[#8E6D24] block">Chakra</span>
                    <span className="font-semibold text-xs text-[#2B1B3D]">{product.chakra || "Universal"}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2]">
                    <span className="text-[10px] uppercase font-bold text-[#8E6D24] block">Planet</span>
                    <span className="font-semibold text-xs text-[#2B1B3D]">{product.planet || "Navagraha"}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2]">
                    <span className="text-[10px] uppercase font-bold text-[#8E6D24] block">Rashi / Zodiac</span>
                    <span className="font-semibold text-xs text-[#2B1B3D]">{product.rashi || product.zodiac || "Universal"}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2]">
                    <span className="text-[10px] uppercase font-bold text-[#8E6D24] block">Hardness (Mohs)</span>
                    <span className="font-semibold text-xs text-[#2B1B3D]">{product.hardness || "7.0 (Natural Quartz)"}</span>
                  </div>
                </div>

                {/* Authentic Benefits List */}
                {product.benefits && product.benefits.length > 0 && (
                  <div>
                    <h4 className="font-serif text-sm text-[#2B1B3D] font-semibold mb-2.5">
                      Consecrated Spiritual Benefits
                    </h4>
                    <ul className="space-y-2">
                      {product.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                          <CheckCircle2 size={16} className="text-[#C9A24D] mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "wearCare" && (
              <div className="space-y-6 text-xs sm:text-sm text-[#635572] leading-relaxed">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#F5F0FD] border border-[#7B4FC9]/30">
                    <span className="font-bold text-[#7B4FC9] text-xs uppercase tracking-wider block mb-1">
                      Left Wrist: Receptive Energy
                    </span>
                    <p className="text-xs leading-relaxed">
                      Wear on your left wrist when you wish to internalize healing, dissolve stress, invite love, and absorb the calming vibrations into your personal aura.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FDF2F4] border border-[#F4C6D0]">
                    <span className="font-bold text-[#B83D60] text-xs uppercase tracking-wider block mb-1">
                      Right Wrist: Projective Energy
                    </span>
                    <p className="text-xs leading-relaxed">
                      Wear on your right wrist for outward manifestation, closing high-value sales deals, public speaking confidence, and psychic defense against evil eye.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "energizing" && (
              <div className="space-y-6 text-xs sm:text-sm text-[#635572] leading-relaxed">
                <p>
                  At Riya Tarot Crystals, we never ship raw, un-energized stones straight out of warehouse boxes. Every bracelet undergoes a 4-stage Vedic consecration before it reaches your hands:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2]">
                    <span className="font-bold text-[#8E6D24] block mb-1">1. Purification</span>
                    <p className="text-[11px]">Himalayan rock salt and running pure water cleanse prior handling.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2]">
                    <span className="font-bold text-[#8E6D24] block mb-1">2. Cosmic Charge</span>
                    <p className="text-[11px]">Placed under peak Surya or Full Moon light for vibrational activation.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2]">
                    <span className="font-bold text-[#7B4FC9] block mb-1">3. 108 Mantra Japa</span>
                    <p className="text-[11px]">Consecrated by certified Vedic priests with deity Beej Mantras.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2]">
                    <span className="font-bold text-[#8E6D24] block mb-1">4. Sacred Packaging</span>
                    <p className="text-[11px]">Sealed airtight with holy Raksha Sutra thread and vibhuti.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8E6D24] tracking-widest block mb-1">
                Verified Soul Experiences
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#2B1B3D] font-bold">
                Customer Energy Reviews
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-bold text-[#2B1B3D]">
              <Star size={16} className="fill-[#C9A24D] text-[#C9A24D]" />
              <span>4.96 / 5.0 Rating</span>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4 mb-8">
            {sampleReviews.map((rev) => (
              <div key={rev.id} className="p-5 sm:p-6 rounded-2xl bg-white border border-[#EFE9E2] shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-[#2B1B3D]">{rev.name}</span>
                    <span className="text-[10px] text-[#635572]">• {rev.city}</span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#2E7D32] bg-[#EDF7ED] px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={10} /> Verified Buyer
                    </span>
                  </div>
                  <span className="text-[10px] text-[#9588A3]">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 mb-2 text-[#C9A24D]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#635572] leading-relaxed">
                  "{rev.text}"
                </p>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <div className="p-6 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs">
            <h4 className="font-serif text-base font-semibold text-[#2B1B3D] mb-3">
              Share Your Crystal Experience
            </h4>
            {reviewSubmitted ? (
              <div className="p-4 rounded-2xl bg-[#EDF7ED] border border-[#A5D6A7] text-xs text-[#2E7D32] flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span>Thank you! Your verified review has been submitted for our sanctuary wall.</span>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Your Name (e.g. Meera S.)..."
                    className="px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D]"
                  />
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D]"
                  >
                    <option value={5}>★★★★★ (5 Stars - Life Changing Energy)</option>
                    <option value={4}>★★★★☆ (4 Stars - Beautiful Quality)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Satisfied)</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe the shifts you experienced in mood, calm, or synchronicities..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D]"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-white btn-amethyst cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mb-14">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1B3D] text-center mb-6">
              Complementary Synergy Crystals
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/product?id=${rel.id}`}
                  className="group rounded-2xl bg-white border border-[#EFE9E2] hover:border-[#C9A24D]/50 p-3 sm:p-4 shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FBF8F3] mb-2.5">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h5 className="font-serif text-xs font-semibold text-[#2B1B3D] line-clamp-1 group-hover:text-[#7B4FC9]">
                      {rel.name}
                    </h5>
                    <span className="text-xs font-bold text-[#7B4FC9] block mt-1">
                      ₹{(rel.salePrice || rel.price).toLocaleString("en-IN")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Mobile Sticky Dual Conversion Bar */}
      <AnimatePresence>
        {showStickyAdd && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#EFE9E2] p-2.5 px-3 shadow-[0_-8px_30px_rgba(43,27,61,0.12)]"
            style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 10px)" }}
          >
            <div className="flex items-center gap-2">
              <div className="min-w-0 flex-1">
                <span className="text-[11px] text-[#635572] font-medium line-clamp-1 truncate">{product.name}</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-[#2B1B3D]">
                    ₹{currentPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-[#8E6D24] font-semibold uppercase">
                    • {selectedBeadSize}
                  </span>
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={justAdded}
                  className="py-2.5 px-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#7B4FC9] bg-[#F5F0FD] border border-[#7B4FC9]/30 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                  aria-label="Add to Bag"
                >
                  <ShoppingBag size={14} />
                  <span>{justAdded ? "Added" : "Add"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-white btn-amethyst shadow-md active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Buy Now</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-32 text-center text-xs text-[#635572]">Loading gemstone sanctuary...</div>}>
      <ProductContent />
    </Suspense>
  );
}
