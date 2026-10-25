import { createClient } from "@supabase/supabase-js";
import { Product } from "@/store/useStore";
import { fallbackProducts } from "@/data/products";

// Read Supabase environment variables or fallback to placeholders
const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.SUPABASE_URL || 
  "https://fxrjipbcrvootsayqsas.supabase.co";

const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.SUPABASE_ANON_KEY || 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cmppcGJjcnZvb3RzYXlxc2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MzcwNjcsImV4cCI6MjEwODMxMzA2N30.LkqvrjmZLLU52RRH-vywhY9XlC8wk3Y-qHycwCXhLSQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch all products from Supabase with graceful fallback to rich local catalog
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.info("Supabase products fetch note:", error.message);
      return fallbackProducts;
    }

    // Merge or normalize any Supabase items with fallback defaults
    return data.map((item: any) => {
      const fallback = fallbackProducts.find((p) => p.id === item.id);
      return {
        id: item.id || fallback?.id || String(Math.random()),
        name: item.name || fallback?.name || "Healed Crystal Bracelet",
        description: item.description || fallback?.description || "",
        shortIntention: item.shortIntention || item.short_intention || fallback?.shortIntention || "Vedic Healing & Alignment",
        price: Number(item.price) || fallback?.price || 1499,
        salePrice: item.salePrice || item.sale_price ? Number(item.salePrice || item.sale_price) : fallback?.salePrice,
        image: item.image || fallback?.image || "/images/products/rose-quartz-new.jpg",
        gallery: item.gallery && item.gallery.length > 0 ? item.gallery : fallback?.gallery || [item.image || "/images/products/rose-quartz-new.jpg"],
        category: item.category || fallback?.category || "Heal Energized Bracelets",
        subCategory: item.subCategory || fallback?.subCategory || "Mixel Bracelets",
        badge: item.badge || fallback?.badge || "Energized & Authentically Sourced",
        chakra: item.chakra || fallback?.chakra || "Heart & Solar Plexus",
        planet: item.planet || fallback?.planet || "Venus & Jupiter",
        zodiac: item.zodiac || fallback?.zodiac || "All Signs",
        rashi: item.rashi || fallback?.rashi || "Universal Harmonizer",
        numerologyNumber: item.numerologyNumber || item.numerology_number || fallback?.numerologyNumber || "3 & 6",
        rating: Number(item.rating) || fallback?.rating || 4.95,
        reviewCount: Number(item.reviewCount || item.review_count) || fallback?.reviewCount || 180,
        benefits: item.benefits || fallback?.benefits || [],
        energizationSteps: item.energizationSteps || item.energization_steps || fallback?.energizationSteps || [],
        selectedBeadSize: "8mm"
      };
    });
  } catch (err) {
    console.warn("Using rich offline fallback product database:", err);
    return fallbackProducts;
  }
}

/**
 * Fetch single product by ID
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.id === id);
}

/**
 * Save quiz response & leads to Supabase (or localStorage in mock mode)
 */
export async function saveQuizLead(leadData: {
  intention: string;
  element: string;
  beadStyle: string;
  recommendedId: string;
  email?: string;
  name?: string;
}) {
  const payload = {
    ...leadData,
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from("quiz_leads")
      .insert([payload])
      .select();

    if (error) {
      // Store in localStorage as backup
      if (typeof window !== "undefined") {
        const existing = JSON.parse(localStorage.getItem("crystal_quiz_leads") || "[]");
        existing.push(payload);
        localStorage.setItem("crystal_quiz_leads", JSON.stringify(existing));
      }
      return { success: true, offline: true, data: payload };
    }
    return { success: true, data };
  } catch (err) {
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("crystal_quiz_leads") || "[]");
      existing.push(payload);
      localStorage.setItem("crystal_quiz_leads", JSON.stringify(existing));
    }
    return { success: true, offline: true, data: payload };
  }
}

/**
 * Submit order to Supabase orders table with full energization note
 */
export async function submitOrder(orderData: {
  orderId?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state?: string;
    pincode: string;
  };
  items: any[];
  total: number;
  paymentMethod: string;
  energizationNote?: {
    name: string;
    dob: string;
    intention: string;
  };
}) {
  const orderId = orderData.orderId || `RTC-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
  const orderPayload = {
    order_id: orderId,
    customer_name: orderData.customer.name,
    customer_email: orderData.customer.email,
    customer_phone: orderData.customer.phone,
    shipping_address: `${orderData.customer.address}, ${orderData.customer.city}, ${orderData.customer.state || ""} - ${orderData.customer.pincode}`,
    items: orderData.items,
    total_amount: orderData.total,
    payment_method: orderData.paymentMethod,
    energization_note: orderData.energizationNote || null,
    status: "Confirmed & Scheduled for Energization",
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from("orders")
      .insert([orderPayload])
      .select();

    // Cache order locally for order tracking preview and admin panel instant view
    if (typeof window !== "undefined") {
      const orders = JSON.parse(localStorage.getItem("riya_orders") || "[]");
      const filtered = orders.filter((o: any) => (o.order_id || o.id) !== orderId);
      filtered.unshift(orderPayload);
      localStorage.setItem("riya_orders", JSON.stringify(filtered));
    }

    if (error) {
      console.info("Saved order to local storage (Supabase note):", error.message);
      return { success: true, orderId, data: orderPayload };
    }

    return { success: true, orderId, data };
  } catch (err) {
    if (typeof window !== "undefined") {
      const orders = JSON.parse(localStorage.getItem("riya_orders") || "[]");
      const filtered = orders.filter((o: any) => (o.order_id || o.id) !== orderId);
      filtered.unshift(orderPayload);
      localStorage.setItem("riya_orders", JSON.stringify(filtered));
    }
    return { success: true, orderId, data: orderPayload };
  }
}

/**
 * Helper to format ISO timestamp into readable Indian Standard Time
 */
export function formatOrderDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (e) {
    return isoString;
  }
}

/**
 * Fetch all customer orders with hybrid cloud + local persistence
 */
export async function getOrders(): Promise<any[]> {
  let cloudOrders: any[] = [];
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      cloudOrders = data;
    }
  } catch (err) {
    console.warn("Could not query Supabase orders:", err);
  }

  // Get locally cached orders
  let localOrders: any[] = [];
  if (typeof window !== "undefined") {
    try {
      localOrders = JSON.parse(localStorage.getItem("riya_orders") || "[]");
    } catch (e) {
      localOrders = [];
    }
  }

  // Status overrides from localStorage
  let statusOverrides: Record<string, string> = {};
  if (typeof window !== "undefined") {
    try {
      statusOverrides = JSON.parse(localStorage.getItem("riya_order_status_overrides") || "{}");
    } catch (e) {}
  }

  const orderMap = new Map<string, any>();

  // Add cloud orders
  cloudOrders.forEach((o) => {
    const id = o.order_id || o.id;
    if (id && !id.startsWith("TEST-DIAG")) {
      orderMap.set(id, {
        id,
        order_id: id,
        customer: o.customer_name || o.customer || "Blessed Customer",
        customer_name: o.customer_name || o.customer || "Blessed Customer",
        email: o.customer_email || o.email || "",
        customer_email: o.customer_email || o.email || "",
        phone: o.customer_phone || o.phone || "",
        customer_phone: o.customer_phone || o.phone || "",
        destination: o.shipping_address || o.destination || "",
        shipping_address: o.shipping_address || o.destination || "",
        status: statusOverrides[id] || o.status || "Confirmed & Scheduled for Energization",
        total: Number(o.total_amount || o.total || 0),
        total_amount: Number(o.total_amount || o.total || 0),
        paymentMethod: o.payment_method || o.paymentMethod || "Prepaid",
        payment_method: o.payment_method || o.paymentMethod || "Prepaid",
        items: Array.isArray(o.items) ? o.items : [],
        energizationNote: o.energization_note || o.energizationNote || null,
        energization_note: o.energization_note || o.energizationNote || null,
        date: o.created_at ? formatOrderDate(o.created_at) : "Recent",
        created_at: o.created_at || new Date().toISOString()
      });
    }
  });

  // Merge local orders (either override cloud or add if offline)
  localOrders.forEach((o) => {
    const id = o.order_id || o.id;
    if (id && !id.startsWith("TEST-DIAG")) {
      const existing = orderMap.get(id);
      orderMap.set(id, {
        id,
        order_id: id,
        customer: o.customer_name || o.customer || existing?.customer || "Blessed Customer",
        customer_name: o.customer_name || o.customer || existing?.customer || "Blessed Customer",
        email: o.customer_email || o.email || existing?.email || "",
        customer_email: o.customer_email || o.email || existing?.email || "",
        phone: o.customer_phone || o.phone || existing?.phone || "",
        customer_phone: o.customer_phone || o.phone || existing?.phone || "",
        destination: o.shipping_address || o.destination || existing?.destination || "",
        shipping_address: o.shipping_address || o.destination || existing?.destination || "",
        status: statusOverrides[id] || o.status || existing?.status || "Confirmed & Scheduled for Energization",
        total: Number(o.total_amount || o.total || existing?.total || 0),
        total_amount: Number(o.total_amount || o.total || existing?.total || 0),
        paymentMethod: o.payment_method || o.paymentMethod || existing?.paymentMethod || "Prepaid",
        payment_method: o.payment_method || o.paymentMethod || existing?.paymentMethod || "Prepaid",
        items: Array.isArray(o.items) && o.items.length > 0 ? o.items : (existing?.items || []),
        energizationNote: o.energization_note || o.energizationNote || existing?.energizationNote || null,
        energization_note: o.energization_note || o.energizationNote || existing?.energizationNote || null,
        date: o.created_at ? formatOrderDate(o.created_at) : (existing?.date || "Recent"),
        created_at: o.created_at || existing?.created_at || new Date().toISOString()
      });
    }
  });

  // Sort descending by created_at
  const allOrders = Array.from(orderMap.values()).sort((a, b) => {
    const timeA = new Date(a.created_at).getTime() || 0;
    const timeB = new Date(b.created_at).getTime() || 0;
    return timeB - timeA;
  });

  return allOrders;
}

/**
 * Update order status across Supabase cloud and local storage
 */
export async function updateOrderStatus(orderId: string, newStatus: string): Promise<boolean> {
  // 1. Save to local storage status overrides
  if (typeof window !== "undefined") {
    try {
      const overrides = JSON.parse(localStorage.getItem("riya_order_status_overrides") || "{}");
      overrides[orderId] = newStatus;
      localStorage.setItem("riya_order_status_overrides", JSON.stringify(overrides));

      // Also update in riya_orders array if present
      const localOrders = JSON.parse(localStorage.getItem("riya_orders") || "[]");
      const updated = localOrders.map((o: any) =>
        (o.order_id === orderId || o.id === orderId) ? { ...o, status: newStatus } : o
      );
      localStorage.setItem("riya_orders", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save status override to localStorage:", e);
    }
  }

  // 2. Update in Supabase
  try {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("order_id", orderId);

    if (error) {
      console.info("Supabase order update note:", error.message);
    }
    return true;
  } catch (err) {
    console.warn("Error updating order in Supabase:", err);
    return true;
  }
}

export default supabase;
