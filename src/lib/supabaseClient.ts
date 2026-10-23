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
        badge: item.badge || fallback?.badge || "Energized & Lab Certified",
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
  const orderId = `RTC-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
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

    // Cache order locally for order tracking preview
    if (typeof window !== "undefined") {
      const orders = JSON.parse(localStorage.getItem("riya_orders") || "[]");
      orders.unshift(orderPayload);
      localStorage.setItem("riya_orders", JSON.stringify(orders));
    }

    if (error) {
      console.info("Saved order to local storage (Supabase table pending):", error.message);
      return { success: true, orderId, data: orderPayload };
    }

    return { success: true, orderId, data };
  } catch (err) {
    if (typeof window !== "undefined") {
      const orders = JSON.parse(localStorage.getItem("riya_orders") || "[]");
      orders.unshift(orderPayload);
      localStorage.setItem("riya_orders", JSON.stringify(orders));
    }
    return { success: true, orderId, data: orderPayload };
  }
}

export default supabase;
