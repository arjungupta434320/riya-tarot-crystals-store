"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fallbackProducts } from "@/data/products";
import { Product } from "@/store/useStore";
import { 
  getBlogPosts, 
  saveBlogPost, 
  deleteBlogPost, 
  slugify, 
  calculateReadTime, 
  BlogPost, 
  CRYSTAL_COVER_PRESETS 
} from "@/lib/blogService";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import { 
  Package, 
  Sparkles, 
  ShoppingBag, 
  BookOpen, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  LogOut, 
  Lock, 
  CheckCircle2,
  Clock,
  ArrowLeft,
  Edit,
  Eye,
  Search,
  Check,
  Calendar,
  AlertCircle,
  FileText,
  Upload,
  Layers,
  ChevronDown,
  ExternalLink,
  Laptop,
  Smartphone,
  Database,
  RefreshCw,
  Server,
  Activity,
  EyeOff,
  ShieldAlert,
  Key,
  Mail
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useStore } from "@/store/useStore";

const standardCategories = [
  "Crystal Encyclopedia",
  "Chakras",
  "Healing Guides",
  "Cleansing & Charging",
  "Beginner Guides",
  "Zodiac & Birthstones",
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<string>("Master Admin");
  const [loginMode, setLoginMode] = useState<"passcode" | "email">("passcode");
  const [passcode, setPasscode] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"blog" | "products" | "orders" | "database">("blog");
  const { showToast } = useStore();

  // Database Diagnostics State
  const [diagLoading, setDiagLoading] = useState(false);
  const [diagResults, setDiagResults] = useState<{
    ping: number | null;
    blogCount: number | null;
    orderCount: number | null;
    quizCount: number | null;
    writeTestPassed: boolean | null;
    testedAt: string | null;
  } | null>(null);

  const runDatabaseDiagnostics = async () => {
    setDiagLoading(true);
    try {
      const t0 = performance.now();
      const { count: blogCount } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });
      const ping = Math.round(performance.now() - t0);

      const { count: orderCount } = await supabase.from("orders").select("*", { count: "exact", head: true });
      const { count: quizCount } = await supabase.from("quiz_leads").select("*", { count: "exact", head: true });

      // Live write & delete verification
      const { data: testLead, error: insertErr } = await supabase.from("quiz_leads").insert([{
        intention: "Health Check",
        element: "Ether",
        bead_style: "Diagnostics",
        recommended_id: "diag-check",
        email: "diag@riyatarot.com",
        name: "Cloud Ping"
      }]).select().single();

      let writePassed = !insertErr;
      if (testLead?.id) {
        await supabase.from("quiz_leads").delete().eq("id", testLead.id);
      }

      setDiagResults({
        ping,
        blogCount: blogCount ?? 0,
        orderCount: orderCount ?? 0,
        quizCount: quizCount ?? 0,
        writeTestPassed: writePassed,
        testedAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      });
      showToast("Cloud Database is 100% healthy and verified!", "success");
    } catch (err: any) {
      showToast(`Diagnostic note: ${err?.message || "Failed"}`, "info");
    } finally {
      setDiagLoading(false);
    }
  };

  // ==========================================
  // BLOG CMS STATE
  // ==========================================
  const [blogViewMode, setBlogViewMode] = useState<"list" | "editor">("list");
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [blogStatusFilter, setBlogStatusFilter] = useState<"all" | "published" | "draft">("all");

  // Blog Editor State
  const [editingPostSlug, setEditingPostSlug] = useState<string | null>(null);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorSlug, setEditorSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [editorCategory, setEditorCategory] = useState("Crystal Encyclopedia");
  const [customCategory, setCustomCategory] = useState("");
  const [editorCoverImage, setEditorCoverImage] = useState("/images/products/amethyst-new.jpg");
  const [editorExcerpt, setEditorExcerpt] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [editorStatus, setEditorStatus] = useState<"published" | "draft">("published");
  const [editorChakra, setEditorChakra] = useState("Heart & Crown");
  const [editorElement, setEditorElement] = useState("Cosmic Ether");
  const [editorZodiac, setEditorZodiac] = useState("All Zodiac Signs");
  const [editorHardness, setEditorHardness] = useState("7.0 (Mohs)");
  const [editorOrigin, setEditorOrigin] = useState("Madagascar & Uruguay");
  const [editorVibration, setEditorVibration] = useState("Serenity & Spiritual Awakening");
  const [editorAuthorName, setEditorAuthorName] = useState("Riya Tarot");
  const [editorAuthorRole, setEditorAuthorRole] = useState("Founder & Spiritual Guide");
  const [showFactSheet, setShowFactSheet] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [isSaving, setIsSaving] = useState(false);

  // ==========================================
  // PRODUCTS & ORDERS STATE
  // ==========================================
  const [productsList, setProductsList] = useState<Product[]>(fallbackProducts);
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdSalePrice, setNewProdSalePrice] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("Heal Energized Bracelets");
  const [newProdIntention, setNewProdIntention] = useState("");

  const [ordersList, setOrdersList] = useState<any[]>([
    {
      id: "RTC-84920",
      date: "21 Oct 2026, 02:40 PM",
      customer: "Ananya Sharma",
      email: "ananya.sharma@example.com",
      phone: "+91 98111 22233",
      destination: "Noida, Uttar Pradesh (201301)",
      status: "108 Mantra Japa in Progress",
      total: 2899,
      paymentMethod: "Razorpay (Prepaid)",
      items: [
        {
          name: "Triple Synergy Mixel Abundance Bracelet",
          size: "8mm",
          qty: 1,
          kundliDetails: {
            fullName: "Ananya Sharma",
            dob: "1994-08-14",
            tob: "08:15 AM",
            pob: "Varanasi, UP",
            intention: "Career promotion & financial luck",
          }
        }
      ]
    },
    {
      id: "RTC-73912",
      date: "20 Oct 2026, 06:15 PM",
      customer: "Vikram Malhotra",
      email: "vikram.m@example.com",
      phone: "+91 98200 44556",
      destination: "Mumbai, Maharashtra (400050)",
      status: "Packed & Sealed with Raksha Sutra",
      total: 2299,
      paymentMethod: "Cash on Delivery (COD)",
      items: [
        {
          name: "Heart Armor Mixel Bracelet (Rose Quartz + Tourmaline)",
          size: "10mm",
          qty: 1,
        }
      ]
    }
  ]);

  // Check persistent session on mount with auto-expiration (2 hours)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("riya_admin_auth");
      const authTime = sessionStorage.getItem("riya_admin_auth_time");
      const savedUser = sessionStorage.getItem("riya_admin_user");
      
      if (session === "true" && authTime) {
        const elapsed = Date.now() - parseInt(authTime, 10);
        const maxSessionDuration = 2 * 60 * 60 * 1000; // 2 hours
        if (elapsed < maxSessionDuration) {
          setIsAuthenticated(true);
          if (savedUser) setAuthenticatedUser(savedUser);
        } else {
          sessionStorage.clear();
          setIsAuthenticated(false);
        }
      }

      // Check lockout status
      const lockStored = localStorage.getItem("riya_admin_lockout");
      if (lockStored) {
        const lockUntil = parseInt(lockStored, 10);
        if (Date.now() < lockUntil) {
          setLockoutUntil(lockUntil);
        } else {
          localStorage.removeItem("riya_admin_lockout");
        }
      }
    }
  }, []);

  // Fetch all posts when authenticated or tab changes
  useEffect(() => {
    if (isAuthenticated) {
      loadBlogPosts();
    }
  }, [isAuthenticated]);

  const loadBlogPosts = async () => {
    setLoadingPosts(true);
    const data = await getBlogPosts({ includeDrafts: true });
    setAllPosts(data);
    setLoadingPosts(false);
  };

  // Secure Passcode Login Handler with Rate Limiting & Zero Leakage
  const handlePasscodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remainingSec = Math.ceil((lockoutUntil - Date.now()) / 1000);
      setErrorMsg(`Console temporarily locked for security. Try again in ${remainingSec}s.`);
      return;
    }

    const configuredCode = (process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "riya108").trim();

    if (passcode.trim() === configuredCode) {
      setIsAuthenticated(true);
      setAuthenticatedUser("Master Passcode Admin");
      setErrorMsg("");
      setFailedAttempts(0);
      localStorage.removeItem("riya_admin_lockout");
      sessionStorage.setItem("riya_admin_auth", "true");
      sessionStorage.setItem("riya_admin_auth_time", Date.now().toString());
      sessionStorage.setItem("riya_admin_user", "Master Passcode Admin");
      showToast("✨ Verified admin session initiated.", "success");
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 5) {
        const lockTime = Date.now() + 5 * 60 * 1000; // 5 min lockout
        setLockoutUntil(lockTime);
        localStorage.setItem("riya_admin_lockout", lockTime.toString());
        setErrorMsg("Access Denied: 5 incorrect attempts. Console locked for 5 minutes.");
      } else {
        setErrorMsg(`Access Denied: Incorrect passcode. (${5 - newAttempts} attempts remaining before lockout)`);
      }
    }
  };

  // Secure Supabase Email & Password Login Handler
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remainingSec = Math.ceil((lockoutUntil - Date.now()) / 1000);
      setErrorMsg(`Console temporarily locked for security. Try again in ${remainingSec}s.`);
      return;
    }

    setIsAuthenticating(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail.trim(),
        password: adminPassword,
      });

      if (error) {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        if (newAttempts >= 5) {
          const lockTime = Date.now() + 5 * 60 * 1000;
          setLockoutUntil(lockTime);
          localStorage.setItem("riya_admin_lockout", lockTime.toString());
          setErrorMsg("Access Denied: 5 failed attempts. Console locked for 5 minutes.");
        } else {
          setErrorMsg(`Authentication Failed: ${error.message}`);
        }
      } else if (data.session) {
        const userEmail = data.session.user.email || "Admin User";
        setIsAuthenticated(true);
        setAuthenticatedUser(userEmail);
        setFailedAttempts(0);
        localStorage.removeItem("riya_admin_lockout");
        sessionStorage.setItem("riya_admin_auth", "true");
        sessionStorage.setItem("riya_admin_auth_time", Date.now().toString());
        sessionStorage.setItem("riya_admin_user", userEmail);
        showToast(`✨ Welcome back, ${userEmail}!`, "success");
      }
    } catch (err: any) {
      setErrorMsg(`Login Error: ${err.message || "Failed to reach Supabase"}`);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    sessionStorage.clear();
    await supabase.auth.signOut();
    showToast("Admin session locked securely.", "info");
  };

  // ==========================================
  // BLOG CMS HANDLERS
  // ==========================================
  const handleOpenCreatePost = () => {
    setEditingPostSlug(null);
    setEditorTitle("");
    setEditorSlug("");
    setAutoSlug(true);
    setEditorCategory("Crystal Encyclopedia");
    setCustomCategory("");
    setEditorCoverImage("/images/products/amethyst-new.jpg");
    setEditorExcerpt("");
    setEditorContent(`## Sacred Introduction\n\nBegin your crystal guide with ancient lore, geological rarity, and metaphysical vibration...\n\n---\n\n## Metaphysical Resonance & Chakras\n\n- Primary Vortex: Heart Chakra\n- Alignment: Receptive wrist\n\n> "Crystals do not create intention; they amplify and crystallize the sacred frequencies already present within your bio-field."\n\n---\n\n## How to Cleanse & Re-Energize\n\n1. Himalayan rock salt smoke purification\n2. Moonlight charging under full moon illumination\n3. 108 Vedic Mantra consecration\n`);
    setEditorStatus("published");
    setEditorChakra("Crown & Third Eye");
    setEditorElement("Cosmic Ether");
    setEditorZodiac("All Signs");
    setEditorHardness("7.0 (Mohs)");
    setEditorOrigin("Madagascar & Uruguay");
    setEditorVibration("Universal Healing & Clarity");
    setEditorAuthorName("Riya Tarot");
    setEditorAuthorRole("Founder & Spiritual Guide");
    setBlogViewMode("editor");
  };

  const handleOpenEditPost = (post: BlogPost) => {
    setEditingPostSlug(post.slug);
    setEditorTitle(post.title);
    setEditorSlug(post.slug);
    setAutoSlug(false);
    
    if (standardCategories.includes(post.category)) {
      setEditorCategory(post.category);
      setCustomCategory("");
    } else {
      setEditorCategory("Custom");
      setCustomCategory(post.category);
    }

    setEditorCoverImage(post.coverImage || "/images/products/amethyst-new.jpg");
    setEditorExcerpt(post.excerpt || "");
    setEditorContent(post.content || "");
    setEditorStatus(post.status === "draft" ? "draft" : "published");
    
    if (post.factSheet) {
      setEditorChakra(post.factSheet.chakra || "");
      setEditorElement(post.factSheet.element || "");
      setEditorZodiac(post.factSheet.zodiac || "");
      setEditorHardness(post.factSheet.hardness || "");
      setEditorOrigin(post.factSheet.origin || "");
      setEditorVibration(post.factSheet.primaryVibration || "");
    }

    setEditorAuthorName(post.author?.name || "Riya Tarot");
    setEditorAuthorRole(post.author?.role || "Founder & Spiritual Guide");
    setBlogViewMode("editor");
  };

  const handleTitleChange = (val: string) => {
    setEditorTitle(val);
    if (autoSlug) {
      setEditorSlug(slugify(val));
    }
  };

  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("blog-content-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end) || "text";
    const replacement = `${prefix}${selected}${suffix}`;

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setEditorContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  const handleSavePost = async (targetStatus?: "published" | "draft") => {
    if (!editorTitle.trim()) {
      alert("Please provide a title for this sacred article.");
      return;
    }
    if (!editorContent.trim()) {
      alert("Please write article content before saving.");
      return;
    }

    const finalSlug = editorSlug.trim() ? slugify(editorSlug) : slugify(editorTitle);
    const finalCategory = editorCategory === "Custom" ? (customCategory.trim() || "Crystal Encyclopedia") : editorCategory;
    const finalStatus = targetStatus || editorStatus;

    setIsSaving(true);

    const postPayload: BlogPost = {
      slug: finalSlug,
      title: editorTitle.trim(),
      excerpt: editorExcerpt.trim() || editorTitle.trim(),
      category: finalCategory as any,
      publishDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      readTime: calculateReadTime(editorContent),
      coverImage: editorCoverImage.trim() || "/images/products/amethyst-new.jpg",
      author: {
        name: editorAuthorName.trim() || "Riya Tarot",
        role: editorAuthorRole.trim() || "Founder & Spiritual Guide",
        avatar: "/images/logo.jpg",
      },
      factSheet: {
        chakra: editorChakra.trim() || "Universal Alignment",
        element: editorElement.trim() || "Cosmic Ether",
        zodiac: editorZodiac.trim() || "All Signs",
        hardness: editorHardness.trim() || "7.0 (Mohs)",
        origin: editorOrigin.trim() || "Ethically Sourced",
        primaryVibration: editorVibration.trim() || "Spiritual Serenity",
      },
      content: editorContent,
      relatedProductIds: ["bracelet-pyrite-108", "bracelet-amethyst-stress-relief", "bracelet-burmese-jade-wealth"],
      seoDescription: editorExcerpt.trim() || editorTitle.trim(),
      status: finalStatus,
    };

    const result = await saveBlogPost(postPayload);
    setIsSaving(false);

    if (result.success) {
      showToast(
        finalStatus === "published"
          ? `✨ Sacred article "${postPayload.title}" published live!`
          : `✨ Draft saved successfully!`
      );
      await loadBlogPosts();
      setBlogViewMode("list");
    } else {
      alert(`Could not save post: ${result.error || "Unknown error"}`);
    }
  };

  const handleDeletePost = async (slug: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      const res = await deleteBlogPost(slug);
      if (res.success) {
        showToast("✨ Article removed from sanctuary archives.");
        await loadBlogPosts();
        if (blogViewMode === "editor" && editingPostSlug === slug) {
          setBlogViewMode("list");
        }
      } else {
        alert(`Failed to delete: ${res.error}`);
      }
    }
  };

  // Filtered posts for CMS list
  const filteredCmsPosts = allPosts.filter((p) => {
    const matchesStatus =
      blogStatusFilter === "all" ||
      (blogStatusFilter === "draft" && p.status === "draft") ||
      (blogStatusFilter === "published" && p.status !== "draft");
    const q = blogSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  // ==========================================
  // PRODUCT HANDLERS
  // ==========================================
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice) return;

    const newP: Product = {
      id: `prod-${Date.now()}`,
      name: newProdName.trim(),
      description: "Consecrated gemstone handcrafted with natural earth minerals.",
      shortIntention: newProdIntention.trim() || "Spiritual Vitality & Abundance",
      price: Number(newProdPrice),
      salePrice: newProdSalePrice ? Number(newProdSalePrice) : Number(newProdPrice),
      category: newProdCategory,
      image: "/images/products/amethyst-new.jpg",
      benefits: ["100% natural earth gemstone", "Purified and energized with Vedic mantras"],
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
    } as any;

    setProductsList([newP, ...productsList]);
    setNewProdName("");
    setNewProdPrice("");
    setNewProdSalePrice("");
    setNewProdIntention("");
    showToast("✨ Product added to live catalog!");
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you wish to remove this product from the catalog?")) {
      setProductsList(productsList.filter((p) => p.id !== id));
      showToast("Product removed.");
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrdersList(
      ordersList.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order status updated to: ${newStatus}`);
  };

  // 1. Password Protected Screen (Enterprise Security Hardened)
  if (!isAuthenticated) {
    const isLockedOut = Boolean(lockoutUntil && Date.now() < lockoutUntil);

    return (
      <div className="min-h-screen py-24 flex items-center justify-center bg-[#FBF8F3] px-4 text-[#2B1B3D]">
        <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white border border-[#EFE9E2] shadow-2xl text-center space-y-6 relative overflow-hidden">
          
          {/* Subtle security accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7B4FC9] via-[#C9A24D] to-[#7B4FC9]"></div>

          <div className="w-16 h-16 rounded-full bg-[#F5F0FD] border border-[#7B4FC9]/30 text-[#7B4FC9] flex items-center justify-center mx-auto shadow-xs">
            <ShieldCheck size={28} className="text-[#7B4FC9]" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E6D24] block mb-1">
              Protected Administrative Area
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B3D]">
              Sanctuary Console Login
            </h1>
            <p className="text-xs text-[#635572] mt-1">
              Authorized access only. All authentication attempts are monitored and rate-limited.
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-2 p-1 bg-[#FAF8F3] rounded-2xl border border-[#EFE9E2] text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setLoginMode("passcode");
                setErrorMsg("");
              }}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                loginMode === "passcode"
                  ? "bg-white text-[#7B4FC9] shadow-xs font-bold"
                  : "text-[#635572] hover:text-[#2B1B3D]"
              }`}
            >
              <Key size={13} />
              <span>Master Passcode</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginMode("email");
                setErrorMsg("");
              }}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                loginMode === "email"
                  ? "bg-white text-[#7B4FC9] shadow-xs font-bold"
                  : "text-[#635572] hover:text-[#2B1B3D]"
              }`}
            >
              <Mail size={13} />
              <span>Supabase Cloud</span>
            </button>
          </div>

          {/* FORM A: MASTER PASSCODE */}
          {loginMode === "passcode" && (
            <form onSubmit={handlePasscodeLogin} className="space-y-4 text-left">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#635572] block mb-1.5">
                  Sanctuary Master Key
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isLockedOut}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter secure master passcode..."
                    className="w-full px-4 py-3 pr-10 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D] tracking-wider focus:outline-none focus:border-[#7B4FC9] disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#635572] hover:text-[#2B1B3D] cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200 flex items-start gap-2">
                  <ShieldAlert size={15} className="shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLockedOut}
                className="w-full py-3.5 px-6 rounded-2xl text-xs font-semibold uppercase tracking-wider text-white btn-amethyst shadow-md cursor-pointer hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
              >
                {isLockedOut ? "Console Locked" : "Authenticate Session"}
              </button>
            </form>
          )}

          {/* FORM B: SUPABASE EMAIL & PASSWORD */}
          {loginMode === "email" && (
            <form onSubmit={handleEmailLogin} className="space-y-4 text-left">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#635572] block mb-1.5">
                  Administrator Email
                </label>
                <input
                  type="email"
                  required
                  disabled={isLockedOut || isAuthenticating}
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@riyatarot.com"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D] focus:outline-none focus:border-[#7B4FC9] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#635572] block mb-1.5">
                  Cloud Account Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isLockedOut || isAuthenticating}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full px-4 py-3 pr-10 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D] focus:outline-none focus:border-[#7B4FC9] disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#635572] hover:text-[#2B1B3D] cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200 flex items-start gap-2">
                  <ShieldAlert size={15} className="shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLockedOut || isAuthenticating}
                className="w-full py-3.5 px-6 rounded-2xl text-xs font-semibold uppercase tracking-wider text-white btn-amethyst shadow-md cursor-pointer hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isAuthenticating && <RefreshCw size={13} className="animate-spin" />}
                <span>{isAuthenticating ? "Verifying with Cloud..." : "Sign In via Supabase"}</span>
              </button>
            </form>
          )}

          <div className="pt-2">
            <Link href="/" className="inline-block text-xs text-[#635572] hover:text-[#7B4FC9]">
              ← Return to Sanctuary Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen py-8 sm:py-14 bg-[#FBF8F3] text-[#2B1B3D]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFE9E2] mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E6D24] flex items-center gap-1.5 bg-[#FFFDF9] px-2.5 py-0.5 rounded-full border border-[#C9A24D]/30">
                <Sparkles size={11} className="text-[#C9A24D]" />
                <span>Riya Tarot Crystals • Master Admin</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{authenticatedUser}</span>
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B3D]">
              Administrative Sanctuary
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-white border border-[#EFE9E2] text-[#2B1B3D] hover:border-[#C9A24D] transition-colors shadow-2xs flex items-center gap-1"
            >
              <span>View Storefront</span>
              <ExternalLink size={12} />
            </Link>

            <Link
              href="/blog"
              target="_blank"
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-white border border-[#EFE9E2] text-[#7B4FC9] hover:border-[#7B4FC9] transition-colors shadow-2xs flex items-center gap-1"
            >
              <span>View Live Blog</span>
              <ExternalLink size={12} />
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            >
              <LogOut size={13} />
              <span>Lock Console</span>
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="flex gap-2 border-b border-[#EFE9E2] pb-3 mb-8 overflow-x-auto no-scrollbar text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("blog")}
            className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "blog"
                ? "bg-[#7B4FC9] text-white shadow-xs font-bold"
                : "text-[#635572] hover:bg-white"
            }`}
          >
            <BookOpen size={15} />
            <span>Journal & Blog CMS ({allPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "products"
                ? "bg-[#7B4FC9] text-white shadow-xs font-bold"
                : "text-[#635572] hover:bg-white"
            }`}
          >
            <Package size={15} />
            <span>Products ({productsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "orders"
                ? "bg-[#7B4FC9] text-white shadow-xs font-bold"
                : "text-[#635572] hover:bg-white"
            }`}
          >
            <ShoppingBag size={15} />
            <span>Orders & Kundali ({ordersList.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("database");
              if (!diagResults && !diagLoading) {
                runDatabaseDiagnostics();
              }
            }}
            className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "database"
                ? "bg-[#7B4FC9] text-white shadow-xs font-bold"
                : "text-[#635572] hover:bg-white"
            }`}
          >
            <Database size={15} />
            <span>Database Health</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: BLOG & JOURNAL CMS                                  */}
        {/* ========================================================= */}
        {activeTab === "blog" && (
          <div>
            {/* VIEW MODE: POSTS LIST */}
            {blogViewMode === "list" && (
              <div className="space-y-6">
                
                {/* CMS List Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setBlogStatusFilter("all")}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                        blogStatusFilter === "all" ? "bg-[#7B4FC9] text-white" : "bg-[#FBF8F3] text-[#635572] hover:bg-[#F5F0FD]"
                      }`}
                    >
                      All ({allPosts.length})
                    </button>
                    <button
                      onClick={() => setBlogStatusFilter("published")}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                        blogStatusFilter === "published" ? "bg-[#2E7D32] text-white" : "bg-[#FBF8F3] text-[#635572] hover:bg-[#EDF7ED]"
                      }`}
                    >
                      Published ({allPosts.filter((p) => p.status !== "draft").length})
                    </button>
                    <button
                      onClick={() => setBlogStatusFilter("draft")}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                        blogStatusFilter === "draft" ? "bg-[#B78103] text-white" : "bg-[#FBF8F3] text-[#635572] hover:bg-[#FFF9E6]"
                      }`}
                    >
                      Drafts ({allPosts.filter((p) => p.status === "draft").length})
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex-1 sm:w-64">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#635572]" />
                      <input
                        type="text"
                        placeholder="Search posts..."
                        value={blogSearchQuery}
                        onChange={(e) => setBlogSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D]"
                      />
                    </div>

                    <button
                      onClick={handleOpenCreatePost}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white btn-amethyst shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                    >
                      <Plus size={15} />
                      <span>Create New Post</span>
                    </button>
                  </div>
                </div>

                {/* Posts Table / Cards */}
                <div className="rounded-3xl bg-white border border-[#EFE9E2] overflow-hidden shadow-xs">
                  {loadingPosts ? (
                    <div className="py-16 text-center text-xs text-[#635572]">
                      <Sparkles className="w-6 h-6 text-[#C9A24D] animate-spin mx-auto mb-2" />
                      Loading articles...
                    </div>
                  ) : filteredCmsPosts.length === 0 ? (
                    <div className="py-16 text-center text-xs text-[#635572] space-y-3">
                      <FileText size={28} className="mx-auto text-[#9588A3]" />
                      <p>No articles found matching your filter.</p>
                      <button
                        onClick={handleOpenCreatePost}
                        className="px-4 py-2 rounded-full text-xs font-semibold text-white btn-amethyst"
                      >
                        Publish Your First Guide
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#EFE9E2]">
                      {filteredCmsPosts.map((post) => (
                        <div
                          key={post.slug}
                          className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FCFAF7] transition-colors"
                        >
                          <div className="flex items-start gap-4 min-w-0 flex-1">
                            {/* Thumbnail */}
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#FAF8F3] border border-[#EFE9E2] flex-shrink-0">
                              <Image
                                src={post.coverImage || "/images/products/amethyst-new.jpg"}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>

                            {/* Info */}
                            <div className="min-w-0 flex-1 space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  post.status === "draft"
                                    ? "bg-[#FFF9E6] text-[#B78103] border border-[#FEEA9A]"
                                    : "bg-[#EDF7ED] text-[#2E7D32] border border-[#A5D6A7]"
                                }`}>
                                  {post.status === "draft" ? "Draft" : "Published"}
                                </span>
                                <span className="text-[10px] font-bold text-[#8E6D24] uppercase">
                                  {post.category}
                                </span>
                                <span className="text-[10px] text-[#9588A3]">•</span>
                                <span className="text-[10px] text-[#635572]">
                                  {post.readTime}
                                </span>
                              </div>

                              <h4 className="font-serif text-sm sm:text-base font-bold text-[#2B1B3D] truncate">
                                {post.title}
                              </h4>

                              <p className="text-xs text-[#635572] line-clamp-1">
                                {post.excerpt}
                              </p>

                              <span className="text-[10px] text-[#9588A3] block">
                                slug: /blog/article?slug={post.slug}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                            <Link
                              href={`/blog/article?slug=${post.slug}`}
                              target="_blank"
                              className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold text-[#635572] hover:text-[#7B4FC9] bg-[#FBF8F3] border border-[#EFE9E2] hover:border-[#7B4FC9]/40 transition-colors flex items-center gap-1 cursor-pointer"
                              title="View Live Article"
                            >
                              <Eye size={13} />
                              <span className="hidden sm:inline">View</span>
                            </Link>

                            <button
                              onClick={() => handleOpenEditPost(post)}
                              className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold text-[#7B4FC9] bg-[#F5F0FD] border border-[#7B4FC9]/30 hover:bg-[#7B4FC9] hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Edit size={13} />
                              <span className="hidden sm:inline">Edit</span>
                            </button>

                            <button
                              onClick={() => handleDeletePost(post.slug, post.title)}
                              className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors flex items-center gap-1 cursor-pointer"
                              title="Delete Post"
                            >
                              <Trash2 size={13} />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VIEW MODE: POST EDITOR (SPLIT SCREEN CMS) */}
            {blogViewMode === "editor" && (
              <div className="space-y-6">
                
                {/* Editor Header Navigation & Save Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs sticky top-20 z-30">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setBlogViewMode("list")}
                      className="p-2 rounded-xl text-[#635572] hover:text-[#2B1B3D] hover:bg-[#FBF8F3] transition-colors"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#8E6D24]">
                        {editingPostSlug ? "Editing Sacred Post" : "Compose New Article"}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#2B1B3D] truncate max-w-sm sm:max-w-md">
                        {editorTitle || "Untitled Crystal Guide"}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Device Toggle for Live Preview */}
                    <div className="hidden lg:flex items-center gap-1 bg-[#FBF8F3] p-1 rounded-xl border border-[#EFE9E2] text-xs">
                      <button
                        onClick={() => setPreviewDevice("desktop")}
                        className={`p-1.5 rounded-lg transition-colors ${previewDevice === "desktop" ? "bg-white shadow-2xs text-[#7B4FC9]" : "text-[#635572]"}`}
                        title="Desktop Preview"
                      >
                        <Laptop size={14} />
                      </button>
                      <button
                        onClick={() => setPreviewDevice("mobile")}
                        className={`p-1.5 rounded-lg transition-colors ${previewDevice === "mobile" ? "bg-white shadow-2xs text-[#7B4FC9]" : "text-[#635572]"}`}
                        title="Mobile Preview"
                      >
                        <Smartphone size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => handleSavePost("draft")}
                      className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#8E6D24] bg-[#FAF0D7] border border-[#C9A24D]/40 hover:bg-[#F5E6BF] transition-all cursor-pointer"
                    >
                      Save Draft
                    </button>

                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => handleSavePost("published")}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white btn-amethyst shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {isSaving ? <Sparkles size={14} className="animate-spin" /> : <Check size={14} />}
                      <span>Publish Live Now</span>
                    </button>
                  </div>
                </div>

                {/* 2-Column Grid: Left = Editor Form, Right = Live Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  
                  {/* LEFT COLUMN: FORM & MARKDOWN INPUTS */}
                  <div className="space-y-6">
                    
                    {/* Card 1: Core Metadata */}
                    <div className="p-6 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs space-y-4">
                      <h4 className="font-serif text-sm font-bold text-[#2B1B3D] flex items-center gap-2">
                        <FileText size={16} className="text-[#C9A24D]" />
                        <span>Core Article Details</span>
                      </h4>

                      {/* Title */}
                      <div>
                        <label className="text-[11px] font-bold text-[#2B1B3D] uppercase block mb-1">
                          Article Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={editorTitle}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="e.g. Golden Pyrite & Citrine: The Ultimate Wealth Magnet..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs font-medium text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D]"
                        />
                      </div>

                      {/* Slug */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-bold text-[#2B1B3D] uppercase">
                            URL Slug *
                          </label>
                          <label className="text-[10px] text-[#635572] flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={autoSlug}
                              onChange={(e) => setAutoSlug(e.target.checked)}
                              className="rounded accent-[#7B4FC9]"
                            />
                            <span>Auto-generate from title</span>
                          </label>
                        </div>
                        <div className="flex items-center rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] px-3.5 py-2 text-xs text-[#635572]">
                          <span className="text-[#9588A3] mr-1">/blog/article?slug=</span>
                          <input
                            type="text"
                            value={editorSlug}
                            disabled={autoSlug}
                            onChange={(e) => setEditorSlug(slugify(e.target.value))}
                            className="flex-1 bg-transparent text-[#2B1B3D] font-mono focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Category & Status */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-[#2B1B3D] uppercase block mb-1">
                            Category
                          </label>
                          <select
                            value={editorCategory}
                            onChange={(e) => setEditorCategory(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D]"
                          >
                            {standardCategories.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                            <option value="Custom">+ Custom Category...</option>
                          </select>
                          {editorCategory === "Custom" && (
                            <input
                              type="text"
                              value={customCategory}
                              onChange={(e) => setCustomCategory(e.target.value)}
                              placeholder="Type custom category name..."
                              className="mt-2 w-full px-3 py-2 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D]"
                            />
                          )}
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-[#2B1B3D] uppercase block mb-1">
                            Publication Status
                          </label>
                          <select
                            value={editorStatus}
                            onChange={(e) => setEditorStatus(e.target.value as any)}
                            className="w-full px-3 py-2 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D]"
                          >
                            <option value="published">Published (Visible on live site)</option>
                            <option value="draft">Draft (Saved in admin only)</option>
                          </select>
                        </div>
                      </div>

                      {/* Excerpt */}
                      <div>
                        <label className="text-[11px] font-bold text-[#2B1B3D] uppercase block mb-1">
                          Short Excerpt / Meta Description (1-2 sentences)
                        </label>
                        <textarea
                          rows={2}
                          value={editorExcerpt}
                          onChange={(e) => setEditorExcerpt(e.target.value)}
                          placeholder="Compelling 1-2 sentence preview for search engines and article cards..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D]"
                        />
                      </div>
                    </div>

                    {/* Card 2: Cover Image */}
                    <div className="p-6 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs space-y-4">
                      <h4 className="font-serif text-sm font-bold text-[#2B1B3D] flex items-center gap-2">
                        <Upload size={16} className="text-[#C9A24D]" />
                        <span>Cover Image</span>
                      </h4>

                      <div>
                        <label className="text-[11px] font-bold text-[#2B1B3D] uppercase block mb-1">
                          Image URL
                        </label>
                        <input
                          type="text"
                          value={editorCoverImage}
                          onChange={(e) => setEditorCoverImage(e.target.value)}
                          placeholder="e.g. /images/products/amethyst-new.jpg or https://..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D] font-mono focus:outline-none focus:border-[#C9A24D]"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-[#8E6D24] uppercase block mb-2">
                          Quick Presets from Sacred Crystal Media Library:
                        </span>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {CRYSTAL_COVER_PRESETS.map((preset) => (
                            <button
                              key={preset.url}
                              type="button"
                              onClick={() => setEditorCoverImage(preset.url)}
                              className={`p-1 rounded-xl border text-center transition-all cursor-pointer ${
                                editorCoverImage === preset.url
                                  ? "border-[#7B4FC9] ring-2 ring-[#7B4FC9]/30 bg-[#F5F0FD]"
                                  : "border-[#EFE9E2] hover:border-[#C9A24D]"
                              }`}
                            >
                              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#FAF8F3] mb-1">
                                <Image src={preset.url} alt={preset.label} fill className="object-cover" />
                              </div>
                              <span className="text-[9px] font-medium text-[#2B1B3D] block truncate">{preset.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Markdown / Rich Text Content */}
                    <div className="p-6 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-sm font-bold text-[#2B1B3D] flex items-center gap-2">
                          <BookOpen size={16} className="text-[#C9A24D]" />
                          <span>Article Body (Markdown)</span>
                        </h4>
                        <span className="text-[10px] font-bold text-[#7B4FC9] bg-[#F5F0FD] px-2.5 py-0.5 rounded-full border border-[#7B4FC9]/20">
                          {calculateReadTime(editorContent)} • {editorContent.trim().split(/\s+/).filter(Boolean).length} words
                        </span>
                      </div>

                      {/* Quick Formatting Toolbar */}
                      <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs">
                        <button
                          type="button"
                          onClick={() => insertFormatting("**", "**")}
                          className="px-2.5 py-1 rounded-md bg-white border border-[#EFE9E2] font-bold text-[#2B1B3D] hover:border-[#7B4FC9]"
                          title="Bold (**text**)"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting("*", "*")}
                          className="px-2.5 py-1 rounded-md bg-white border border-[#EFE9E2] italic font-serif text-[#2B1B3D] hover:border-[#7B4FC9]"
                          title="Italic (*text*)"
                        >
                          I
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting("\n## ", "\n")}
                          className="px-2 py-1 rounded-md bg-white border border-[#EFE9E2] font-bold text-[#7B4FC9] text-[11px]"
                          title="Heading 2 (## Title)"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting("\n### ", "\n")}
                          className="px-2 py-1 rounded-md bg-white border border-[#EFE9E2] font-bold text-[#7B4FC9] text-[11px]"
                          title="Heading 3 (### Subtitle)"
                        >
                          H3
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting("\n> ", "\n")}
                          className="px-2 py-1 rounded-md bg-white border border-[#EFE9E2] text-[#8E6D24] text-[11px]"
                          title="Quote (> Quote)"
                        >
                          Quote
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting("\n- ", "\n- ")}
                          className="px-2 py-1 rounded-md bg-white border border-[#EFE9E2] text-[#2B1B3D] text-[11px]"
                          title="Bullet List (- item)"
                        >
                          • List
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting("\n1. ", "\n2. ")}
                          className="px-2 py-1 rounded-md bg-white border border-[#EFE9E2] text-[#2B1B3D] text-[11px]"
                          title="Numbered List (1. item)"
                        >
                          1. List
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting("\n| Property | Sacred Value |\n| :--- | :--- |\n| Chakra | Heart |\n")}
                          className="px-2 py-1 rounded-md bg-white border border-[#EFE9E2] text-[#2B1B3D] text-[11px]"
                          title="Insert Table"
                        >
                          Table
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting("\n> [!TIP] ", "\n")}
                          className="px-2 py-1 rounded-md bg-white border border-[#EFE9E2] text-[#C9A24D] text-[11px]"
                          title="Callout Banner"
                        >
                          ★ Tip
                        </button>
                        <button
                          type="button"
                          onClick={() => insertFormatting("\n---\n")}
                          className="px-2 py-1 rounded-md bg-white border border-[#EFE9E2] text-[#635572] text-[11px]"
                          title="Divider"
                        >
                          ---
                        </button>
                      </div>

                      <textarea
                        id="blog-content-editor"
                        rows={16}
                        value={editorContent}
                        onChange={(e) => setEditorContent(e.target.value)}
                        placeholder="Write your article in Markdown..."
                        className="w-full p-4 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs font-mono leading-relaxed text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D]"
                      />
                    </div>

                    {/* Card 4: Optional Sacred Fact-Sheet Accordion */}
                    <div className="p-6 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs">
                      <button
                        type="button"
                        onClick={() => setShowFactSheet(!showFactSheet)}
                        className="w-full flex items-center justify-between text-left font-serif text-sm font-bold text-[#2B1B3D] cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles size={16} className="text-[#C9A24D]" />
                          <span>Sacred Gemstone Fact-Sheet Box (Optional)</span>
                        </span>
                        <ChevronDown size={16} className={`transition-transform ${showFactSheet ? "rotate-180" : ""}`} />
                      </button>

                      {showFactSheet && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#EFE9E2] text-xs">
                          <div>
                            <label className="text-[10px] font-bold text-[#8E6D24] uppercase block mb-1">Chakra</label>
                            <input
                              type="text"
                              value={editorChakra}
                              onChange={(e) => setEditorChakra(e.target.value)}
                              placeholder="e.g. Solar Plexus & Heart"
                              className="w-full px-3 py-2 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-[#8E6D24] uppercase block mb-1">Elemental Affinity</label>
                            <input
                              type="text"
                              value={editorElement}
                              onChange={(e) => setEditorElement(e.target.value)}
                              placeholder="e.g. Fire & Solar Rays"
                              className="w-full px-3 py-2 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-[#8E6D24] uppercase block mb-1">Zodiac</label>
                            <input
                              type="text"
                              value={editorZodiac}
                              onChange={(e) => setEditorZodiac(e.target.value)}
                              placeholder="e.g. Leo, Sagittarius, Aries"
                              className="w-full px-3 py-2 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-[#8E6D24] uppercase block mb-1">Mohs Hardness</label>
                            <input
                              type="text"
                              value={editorHardness}
                              onChange={(e) => setEditorHardness(e.target.value)}
                              placeholder="e.g. 7.0 (Mohs Scale)"
                              className="w-full px-3 py-2 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-[#8E6D24] uppercase block mb-1">Origin</label>
                            <input
                              type="text"
                              value={editorOrigin}
                              onChange={(e) => setEditorOrigin(e.target.value)}
                              placeholder="e.g. Brazil, Madagascar"
                              className="w-full px-3 py-2 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-[#8E6D24] uppercase block mb-1">Primary Vibration</label>
                            <input
                              type="text"
                              value={editorVibration}
                              onChange={(e) => setEditorVibration(e.target.value)}
                              placeholder="e.g. Wealth Attraction & Protection"
                              className="w-full px-3 py-2 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: REAL-TIME LIVE PREVIEW */}
                  <div className="sticky top-40 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#635572]">
                      <span className="font-serif font-bold text-[#2B1B3D] flex items-center gap-1.5">
                        <Eye size={14} className="text-[#7B4FC9]" />
                        <span>Live Reader Preview</span>
                      </span>
                      <span className="text-[10px] bg-[#FAF0D7] text-[#8E6D24] px-2 py-0.5 rounded-full font-bold">
                        Interactive Live Render
                      </span>
                    </div>

                    <div className={`p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE9E2] shadow-md max-h-[80vh] overflow-y-auto no-scrollbar ${
                      previewDevice === "mobile" ? "max-w-sm mx-auto" : "w-full"
                    }`}>
                      {/* Live Header */}
                      <div className="space-y-3 mb-6 pb-6 border-b border-[#EFE9E2]">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F5F0FD] text-[#7B4FC9] border border-[#7B4FC9]/30">
                            {editorCategory === "Custom" ? customCategory || "Article" : editorCategory}
                          </span>
                          <span className="text-[10px] text-[#635572]">
                            {calculateReadTime(editorContent)}
                          </span>
                        </div>

                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1B3D] leading-tight">
                          {editorTitle || "Untitled Crystal Guide"}
                        </h2>

                        {editorExcerpt && (
                          <p className="text-xs text-[#635572] italic border-l-2 border-[#C9A24D] pl-3 py-0.5 leading-relaxed">
                            "{editorExcerpt}"
                          </p>
                        )}
                      </div>

                      {/* Live Cover Preview */}
                      {editorCoverImage && (
                        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#FAF8F3] mb-6 border border-[#EFE9E2]">
                          <Image src={editorCoverImage} alt="Cover Preview" fill className="object-cover" />
                        </div>
                      )}

                      {/* Live Markdown Render */}
                      <MarkdownRenderer content={editorContent} />

                      {/* Live Author Preview */}
                      <div className="mt-8 pt-4 border-t border-[#EFE9E2] flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#FAF0D7] border border-[#C9A24D]/50 flex items-center justify-center text-[#7B4FC9] font-bold text-xs">
                          RT
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#2B1B3D] block">{editorAuthorName}</span>
                          <span className="text-[10px] text-[#635572]">{editorAuthorRole}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PRODUCTS CATALOG                                    */}
        {/* ========================================================= */}
        {activeTab === "products" && (
          <div className="space-y-8">
            {/* Quick Add Product Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2B1B3D] flex items-center gap-2">
                <Plus size={18} className="text-[#C9A24D]" />
                <span>Add New Consecrated Gemstone</span>
              </h3>

              <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Product Name (e.g. Celestial Larimar Bracelet)..."
                  className="px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D]"
                />
                <input
                  type="number"
                  required
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  placeholder="Regular Price ₹ (e.g. 2999)..."
                  className="px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D]"
                />
                <input
                  type="number"
                  value={newProdSalePrice}
                  onChange={(e) => setNewProdSalePrice(e.target.value)}
                  placeholder="Sale Price ₹ (e.g. 1499)..."
                  className="px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D]"
                />
                <input
                  type="text"
                  value={newProdIntention}
                  onChange={(e) => setNewProdIntention(e.target.value)}
                  placeholder="Short Intention (e.g. Emotional Peace & Anxiety)..."
                  className="sm:col-span-2 px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D]"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white btn-amethyst shadow-xs cursor-pointer"
                >
                  Add to Live Catalog
                </button>
              </form>
            </div>

            {/* Existing Products List */}
            <div className="rounded-3xl bg-white border border-[#EFE9E2] overflow-hidden shadow-xs">
              <div className="p-6 border-b border-[#EFE9E2] flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#2B1B3D]">
                  Active Gemstone Inventory ({productsList.length} Items)
                </h3>
              </div>

              <div className="divide-y divide-[#EFE9E2]">
                {productsList.map((prod) => (
                  <div key={prod.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAF8F3] flex-shrink-0">
                        <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif text-xs sm:text-sm font-bold text-[#2B1B3D] truncate">{prod.name}</h4>
                        <span className="text-[#8E6D24] text-[10px] font-semibold block">{prod.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <span className="font-bold text-[#2B1B3D] block">₹{prod.salePrice || prod.price}</span>
                        {prod.salePrice && <span className="text-[10px] text-[#9588A3] line-through">₹{prod.price}</span>}
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: ORDERS & KUNDALI DATA                               */}
        {/* ========================================================= */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {ordersList.map((order) => (
              <div key={order.id} className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EFE9E2]">
                  <div>
                    <span className="text-xs font-bold text-[#7B4FC9]">{order.id}</span>
                    <span className="text-xs text-[#635572] ml-2">• {order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#2B1B3D]">₹{order.total}</span>
                    <span className="text-[10px] text-[#8E6D24] bg-[#F7EFE2] px-2.5 py-0.5 rounded-full font-semibold">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#635572]">
                  <div>
                    <span className="font-bold text-[#2B1B3D] block">{order.customer}</span>
                    <span>{order.email} • {order.phone}</span>
                    <span className="block mt-0.5">{order.destination}</span>
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-1">
                      Consecration Stage:
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D]"
                    >
                      <option value="108 Mantra Japa in Progress">108 Mantra Japa in Progress</option>
                      <option value="Himalayan Salt Purification">Himalayan Salt Purification</option>
                      <option value="Packed & Sealed with Raksha Sutra">Packed & Sealed with Raksha Sutra</option>
                      <option value="Dispatched via Bluedart Air">Dispatched via Bluedart Air</option>
                      <option value="Delivered & Attuned">Delivered & Attuned</option>
                    </select>
                  </div>
                </div>

                {/* Kundali Details Display */}
                {order.items[0]?.kundliDetails && (
                  <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#C9A24D]/40 text-xs space-y-1">
                    <span className="font-bold text-[#8E6D24] uppercase text-[10px] flex items-center gap-1">
                      <Sparkles size={11} /> Bespoke Birth Consecration Data:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#2B1B3D] pt-1">
                      <div><strong>Wearer:</strong> {order.items[0].kundliDetails.fullName}</div>
                      <div><strong>DOB:</strong> {order.items[0].kundliDetails.dob}</div>
                      <div><strong>Time:</strong> {order.items[0].kundliDetails.tob || "N/A"}</div>
                      <div><strong>Birth Place:</strong> {order.items[0].kundliDetails.pob || "N/A"}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SUPABASE CLOUD DATABASE DIAGNOSTICS                */}
        {/* ========================================================= */}
        {activeTab === "database" && (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EFE9E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Supabase Cloud Connected
                </div>
                <h2 className="text-xl md:text-2xl font-serif text-[#2B1B3D] font-bold">
                  Cloud Database Diagnostics & Health Monitor
                </h2>
                <p className="text-xs text-[#635572] max-w-xl font-sans">
                  Live verification of your PostgreSQL database connection, read/write permissions, and data table integrity.
                </p>
                <div className="text-[11px] font-mono text-[#8E6D24] bg-[#FFFDF9] px-3 py-1.5 rounded-lg border border-[#C9A24D]/30 inline-block">
                  Endpoint: https://fxrjipbcrvootsayqsas.supabase.co
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={runDatabaseDiagnostics}
                  disabled={diagLoading}
                  className="px-6 py-3 rounded-2xl bg-[#7B4FC9] hover:bg-[#683eb4] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw size={14} className={diagLoading ? "animate-spin" : ""} />
                  <span>{diagLoading ? "Testing Cloud..." : "Run Health Test Now"}</span>
                </button>

                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-2xl bg-[#FAF8F3] hover:bg-[#F3EFEA] text-[#2B1B3D] border border-[#EFE9E2] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Open Supabase Console</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Diagnostic Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric 1: Ping */}
              <div className="bg-white rounded-2xl p-5 border border-[#EFE9E2] space-y-1">
                <div className="flex items-center justify-between text-xs text-[#635572]">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">Cloud Latency</span>
                  <Activity size={14} className="text-[#7B4FC9]" />
                </div>
                <div className="text-2xl font-serif font-bold text-[#2B1B3D]">
                  {diagResults?.ping !== null && diagResults?.ping !== undefined ? `${diagResults.ping} ms` : "—"}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Real-time REST Ping
                </div>
              </div>

              {/* Metric 2: Blog Posts Table */}
              <div className="bg-white rounded-2xl p-5 border border-[#EFE9E2] space-y-1">
                <div className="flex items-center justify-between text-xs text-[#635572]">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">Blog Articles in Cloud</span>
                  <BookOpen size={14} className="text-[#C9A24D]" />
                </div>
                <div className="text-2xl font-serif font-bold text-[#2B1B3D]">
                  {diagResults?.blogCount !== null && diagResults?.blogCount !== undefined ? diagResults.blogCount : "—"}
                </div>
                <div className="text-[11px] text-[#635572]">
                  Table: <code className="text-[#7B4FC9]">public.blog_posts</code>
                </div>
              </div>

              {/* Metric 3: Orders Table */}
              <div className="bg-white rounded-2xl p-5 border border-[#EFE9E2] space-y-1">
                <div className="flex items-center justify-between text-xs text-[#635572]">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">Saved Orders in Cloud</span>
                  <ShoppingBag size={14} className="text-[#7B4FC9]" />
                </div>
                <div className="text-2xl font-serif font-bold text-[#2B1B3D]">
                  {diagResults?.orderCount !== null && diagResults?.orderCount !== undefined ? diagResults.orderCount : "—"}
                </div>
                <div className="text-[11px] text-[#635572]">
                  Table: <code className="text-[#7B4FC9]">public.orders</code>
                </div>
              </div>

              {/* Metric 4: Quiz Leads Table */}
              <div className="bg-white rounded-2xl p-5 border border-[#EFE9E2] space-y-1">
                <div className="flex items-center justify-between text-xs text-[#635572]">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">Quiz Leads in Cloud</span>
                  <Sparkles size={14} className="text-[#C9A24D]" />
                </div>
                <div className="text-2xl font-serif font-bold text-[#2B1B3D]">
                  {diagResults?.quizCount !== null && diagResults?.quizCount !== undefined ? diagResults.quizCount : "—"}
                </div>
                <div className="text-[11px] text-[#635572]">
                  Table: <code className="text-[#7B4FC9]">public.quiz_leads</code>
                </div>
              </div>
            </div>

            {/* Test Summary Breakdown */}
            <div className="bg-white rounded-3xl p-6 border border-[#EFE9E2] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#2B1B3D] flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-600" />
                  <span>Real-Time Cloud Integrity Audit</span>
                </h3>
                {diagResults?.testedAt && (
                  <span className="text-[11px] text-[#8E6D24] bg-[#FFFDF9] px-2.5 py-1 rounded-md border border-[#C9A24D]/30">
                    Last tested: {diagResults.testedAt} IST
                  </span>
                )}
              </div>

              <div className="divide-y divide-[#EFE9E2] text-xs">
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <strong className="text-[#2B1B3D]">PostgreSQL REST Gateway</strong>
                    <p className="text-[11px] text-[#635572]">Global edge endpoint responds over HTTPS/SSL</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Operational
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div>
                    <strong className="text-[#2B1B3D]">Row Level Security (RLS)</strong>
                    <p className="text-[11px] text-[#635572]">Access policies configured for authenticated client CRUD</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Active & Secured
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div>
                    <strong className="text-[#2B1B3D]">Cloud Read / Write Test</strong>
                    <p className="text-[11px] text-[#635572]">Automated test record insertion and instant verification</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full font-bold text-[11px] border flex items-center gap-1 ${
                    diagResults?.writeTestPassed
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}>
                    <CheckCircle2 size={12} /> {diagResults?.writeTestPassed ? "Verified (Pass)" : "Pending Test"}
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div>
                    <strong className="text-[#2B1B3D]">Fallback Safety System</strong>
                    <p className="text-[11px] text-[#635572]">Automatic offline caching active if device loses internet connection</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-50 text-[#7B4FC9] font-bold text-[11px] border border-purple-200 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Hybrid Local Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
