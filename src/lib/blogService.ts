import { supabase } from "./supabaseClient";
import { blogPosts as fallbackBlogPosts, BlogPost } from "@/data/blogPosts";

export type { BlogPost };

const LOCAL_STORAGE_KEY = "riya_custom_blog_posts";

/**
 * Generate a clean, URL-safe slug from a title string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Calculate human-readable reading time from text content
 */
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

/**
 * Helper to get locally stored custom posts (browser only)
 */
function getLocalCustomPosts(): BlogPost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Could not read local blog posts:", err);
    return [];
  }
}

/**
 * Helper to persist custom posts to localStorage
 */
function saveLocalCustomPosts(posts: BlogPost[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  } catch (err) {
    console.warn("Could not persist local blog posts:", err);
  }
}

/**
 * Fetch all blog posts with hybrid cloud + local persistence.
 * Checks Supabase first; merges with local storage & fallback seed posts.
 */
export async function getBlogPosts(options?: { includeDrafts?: boolean }): Promise<BlogPost[]> {
  const includeDrafts = options?.includeDrafts ?? false;
  let cloudPosts: BlogPost[] = [];
  let fetchedFromCloud = false;

  try {
    let query = supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!includeDrafts) {
      query = query.or("status.eq.published,status.is.null");
    }

    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      cloudPosts = data.map((item: any) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt || "",
        category: item.category || "Crystal Encyclopedia",
        publishDate: item.publish_date || item.publishDate || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        readTime: item.read_time || item.readTime || calculateReadTime(item.content || ""),
        coverImage: item.cover_image || item.coverImage || "/images/products/amethyst-new.jpg",
        author: item.author || {
          name: item.author_name || "Riya Tarot",
          role: item.author_role || "Founder & Spiritual Guide",
          avatar: item.author_avatar || "/images/logo.jpg",
        },
        factSheet: item.fact_sheet || item.factSheet || {
          chakra: item.chakra || "Universal Balance",
          element: item.element || "Cosmic Ether",
          zodiac: item.zodiac || "All Signs",
          hardness: item.hardness || "7.0 (Mohs)",
          origin: item.origin || "Ethically Sourced",
          primaryVibration: item.primary_vibration || "Spiritual Harmony",
        },
        content: item.content || "",
        relatedProductIds: item.related_product_ids || item.relatedProductIds || [],
        seoDescription: item.seo_description || item.seoDescription || item.excerpt || "",
        status: item.status || "published",
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));
      fetchedFromCloud = true;
    }
  } catch (err) {
    console.info("Supabase blog fetch note (using local cache):", err);
  }

  // Retrieve locally saved custom posts
  const localCustom = getLocalCustomPosts();

  // Combine posts ensuring uniqueness by slug
  const postMap = new Map<string, BlogPost>();

  // 1. Seed fallback posts first
  fallbackBlogPosts.forEach((p) => {
    postMap.set(p.slug, { ...p, status: "published" });
  });

  // 2. Local custom posts override or add
  localCustom.forEach((p) => {
    postMap.set(p.slug, p);
  });

  // 3. Supabase cloud posts take highest priority
  if (fetchedFromCloud && cloudPosts.length > 0) {
    cloudPosts.forEach((p) => {
      postMap.set(p.slug, p);
    });
  }

  const allPosts = Array.from(postMap.values());

  // Filter drafts if not requested
  const filtered = includeDrafts
    ? allPosts
    : allPosts.filter((p) => p.status !== "draft");

  return filtered;
}

/**
 * Fetch a single blog post by its unique slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const cleanSlug = slug.trim().toLowerCase();

  // Try Supabase first
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", cleanSlug)
      .maybeSingle();

    if (!error && data) {
      return {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt || "",
        category: data.category || "Crystal Encyclopedia",
        publishDate: data.publish_date || data.publishDate || "Today",
        readTime: data.read_time || data.readTime || calculateReadTime(data.content || ""),
        coverImage: data.cover_image || data.coverImage || "/images/products/amethyst-new.jpg",
        author: data.author || {
          name: data.author_name || "Riya Tarot",
          role: data.author_role || "Founder & Spiritual Guide",
          avatar: data.author_avatar || "/images/logo.jpg",
        },
        factSheet: data.fact_sheet || data.factSheet || {
          chakra: "Universal Balance",
          element: "Cosmic Ether",
          zodiac: "All Signs",
          hardness: "7.0 (Mohs)",
          origin: "Ethically Sourced",
          primaryVibration: "Spiritual Harmony",
        },
        content: data.content || "",
        relatedProductIds: data.related_product_ids || data.relatedProductIds || [],
        seoDescription: data.seo_description || data.seoDescription || data.excerpt || "",
        status: data.status || "published",
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    }
  } catch (err) {
    console.info("Supabase single post note:", err);
  }

  // Check local custom posts
  const localCustom = getLocalCustomPosts();
  const localMatch = localCustom.find((p) => p.slug === cleanSlug);
  if (localMatch) return localMatch;

  // Check fallback seed posts
  const fallbackMatch = fallbackBlogPosts.find((p) => p.slug === cleanSlug);
  if (fallbackMatch) return { ...fallbackMatch, status: "published" };

  return null;
}

/**
 * Save (create or update) a blog post both in local cache and Supabase cloud
 */
export async function saveBlogPost(post: BlogPost): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Ensure basic required fields
    const sanitizedPost: BlogPost = {
      ...post,
      slug: post.slug ? slugify(post.slug) : slugify(post.title),
      readTime: post.readTime || calculateReadTime(post.content),
      publishDate: post.publishDate || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: post.status || "published",
      updated_at: new Date().toISOString(),
    };

    // 2. Save locally for instant offline/browser availability
    const local = getLocalCustomPosts();
    const existingIndex = local.findIndex((p) => p.slug === sanitizedPost.slug);
    if (existingIndex >= 0) {
      local[existingIndex] = sanitizedPost;
    } else {
      local.unshift(sanitizedPost);
    }
    saveLocalCustomPosts(local);

    // 3. Try saving to Supabase
    try {
      const payload = {
        slug: sanitizedPost.slug,
        title: sanitizedPost.title,
        excerpt: sanitizedPost.excerpt,
        category: sanitizedPost.category,
        publish_date: sanitizedPost.publishDate,
        read_time: sanitizedPost.readTime,
        cover_image: sanitizedPost.coverImage,
        author: sanitizedPost.author,
        fact_sheet: sanitizedPost.factSheet,
        content: sanitizedPost.content,
        related_product_ids: sanitizedPost.relatedProductIds || [],
        seo_description: sanitizedPost.seoDescription || sanitizedPost.excerpt,
        status: sanitizedPost.status,
        updated_at: sanitizedPost.updated_at,
      };

      const { error } = await supabase
        .from("blog_posts")
        .upsert(payload, { onConflict: "slug" });

      if (error) {
        console.warn("Supabase upsert warning (saved locally):", error.message);
      }
    } catch (cloudErr: any) {
      console.warn("Supabase not configured or offline; post safely preserved in local storage:", cloudErr?.message || cloudErr);
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save blog post" };
  }
}

/**
 * Delete a blog post by slug from local cache and Supabase
 */
export async function deleteBlogPost(slug: string): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Remove from local storage
    const local = getLocalCustomPosts().filter((p) => p.slug !== slug);
    saveLocalCustomPosts(local);

    // 2. Try removing from Supabase
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("slug", slug);

      if (error) {
        console.warn("Supabase delete warning:", error.message);
      }
    } catch (cloudErr) {
      console.warn("Supabase delete note:", cloudErr);
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete blog post" };
  }
}

/**
 * Preset high-resolution crystal photos available in the media library for quick post creation
 */
export const CRYSTAL_COVER_PRESETS = [
  { label: "Uruguayan Amethyst", url: "/images/products/amethyst-new.jpg" },
  { label: "Madagascar Rose Quartz", url: "/images/products/rose-quartz-new.jpg" },
  { label: "Golden Pyrite Cluster", url: "/images/products/pyrite.jpg" },
  { label: "Golden Citrine Abundance", url: "/images/products/citrine.jpg" },
  { label: "Rainbow Fluorite", url: "/images/products/fluorite.jpg" },
  { label: "Sacred Rudraksha & Gemstone", url: "/images/products/rudraksha-gem.jpg" },
  { label: "Black Tourmaline Nazar Shield", url: "/images/products/tourmaline.jpg" },
  { label: "Golden Tiger Eye Courage", url: "/images/products/tiger-eye.jpg" },
  { label: "Burmese Green Jade", url: "/images/products/jade.jpg" },
];
