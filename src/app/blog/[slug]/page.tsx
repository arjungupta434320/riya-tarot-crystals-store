import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, BlogPost } from "@/data/blogPosts";
import { fallbackProducts } from "@/data/products";
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  ShoppingBag, 
  ShieldCheck,
  BookOpen,
  ArrowRight
} from "lucide-react";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found | Riya Tarot Crystals" };

  return {
    title: `${post.title} | Riya Tarot Crystal Journal`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedProducts = fallbackProducts.filter((p) =>
    (post.relatedProductIds || []).includes(p.id)
  );

  const relatedArticles = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // JSON-LD Article Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `https://thevedicstudio.com${post.coverImage}`,
    datePublished: post.publishDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Riya Tarot Crystals",
      logo: {
        "@type": "ImageObject",
        url: "https://thevedicstudio.com/images/logo.jpg",
      },
    },
  };

  return (
    <article className="min-h-screen py-8 sm:py-14 bg-[#FBF8F3] text-[#2B1B3D]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635572] hover:text-[#7B4FC9] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Crystal Library</span>
          </Link>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E6D24] bg-[#F7EFE2] px-3 py-1 rounded-full border border-[#C9A24D]/30">
            {post.category}
          </span>
        </div>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#2B1B3D] font-bold leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#635572] pt-1 border-b border-[#EFE9E2] pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F5F0FD] border border-[#7B4FC9]/30 flex items-center justify-center text-[#7B4FC9] font-bold text-xs">
                RT
              </div>
              <span className="font-semibold text-[#2B1B3D]">{post.author.name}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar size={13} />
              <span>{post.publishDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock size={13} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[#FAF8F3] mb-10 border border-[#EFE9E2] shadow-xs">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        {/* Crystal Fact-Sheet Card */}
        {post.factSheet && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#C9A24D]/40 mb-10 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#EFE9E2]">
              <Sparkles size={18} className="text-[#C9A24D]" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#2B1B3D] uppercase tracking-wider">
                Sacred Gemstone Fact-Sheet
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-0.5">Primary Chakra</span>
                <span className="font-semibold text-[#2B1B3D]">{post.factSheet.chakra || "Universal Balance"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-0.5">Elemental Affinity</span>
                <span className="font-semibold text-[#2B1B3D]">{post.factSheet.element || "Cosmic Ether"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-0.5">Astrological Zodiac</span>
                <span className="font-semibold text-[#2B1B3D]">{post.factSheet.zodiac || "All Signs"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-0.5">Mohs Hardness</span>
                <span className="font-semibold text-[#2B1B3D]">{post.factSheet.hardness || "7.0 (Mohs)"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-0.5">Geological Origin</span>
                <span className="font-semibold text-[#2B1B3D]">{post.factSheet.origin || "Ethically Sourced"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-0.5">Primary Frequency</span>
                <span className="font-semibold text-[#7B4FC9]">{post.factSheet.primaryVibration || "Harmonizing"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Collapsible Mobile Table of Contents */}
        <details className="mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-[#EFE9E2] shadow-xs cursor-pointer group">
          <summary className="font-serif text-sm font-bold text-[#2B1B3D] flex items-center justify-between list-none">
            <span className="flex items-center gap-2">
              <BookOpen size={16} className="text-[#C9A24D]" />
              <span>Sacred Guide Chapters & Index</span>
            </span>
            <span className="text-[11px] text-[#7B4FC9] group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="pt-3 border-t border-[#EFE9E2] mt-3 space-y-1.5 text-xs text-[#635572]">
            <p className="font-medium">1. Astrological & Energetic Origins</p>
            <p className="font-medium">2. Metaphysical & Chakra Healing Powers</p>
            <p className="font-medium">3. Sacred Consecration & Lunar Charging Rituals</p>
            <p className="font-medium">4. How to Wear & Maintain Gemstone Frequency</p>
          </div>
        </details>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE9E2] shadow-xs mb-12">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Shoppable Crystal Embeds */}
        {relatedProducts.length > 0 && (
          <div className="my-12 p-6 sm:p-8 rounded-3xl bg-[#F5F0FD] border border-[#7B4FC9]/30">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag size={18} className="text-[#7B4FC9]" />
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#2B1B3D] uppercase tracking-wider">
                Consecrated Crystals Featured in this Article
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-white border border-[#EFE9E2] flex items-center gap-3.5 shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#FAF8F3] flex-shrink-0">
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-xs font-bold text-[#2B1B3D] truncate">{p.name}</h5>
                    <span className="text-xs font-bold text-[#7B4FC9] block mt-0.5">
                      ₹{(p.salePrice || p.price).toLocaleString("en-IN")}
                    </span>
                    <Link
                      href={`/product?id=${p.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8E6D24] hover:underline pt-1"
                    >
                      <span>Inspect & Shop</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Box */}
        <div className="my-10 p-6 rounded-3xl bg-white border border-[#EFE9E2] flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-[#FAF8F3] border border-[#C9A24D]/50 flex items-center justify-center text-[#7B4FC9] font-serif font-bold text-lg flex-shrink-0">
            RT
          </div>
          <div>
            <h4 className="font-serif text-base font-bold text-[#2B1B3D]">
              Written by {post.author.name}
            </h4>
            <span className="text-[11px] uppercase tracking-wider text-[#8E6D24] font-semibold block mb-2">
              {post.author.role}
            </span>
            <p className="text-xs text-[#635572] leading-relaxed">
              Riya is a certified Vedic astrologer, professional tarot reader, and consecrated crystal alchemist based in India. She curates ethically sourced earth minerals and oversees the 108 mantra consecration of every bracelet.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="pt-8 border-t border-[#EFE9E2]">
          <h4 className="font-serif text-xl font-bold text-[#2B1B3D] mb-6">
            Continue Reading in the Crystal Library
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group p-4 rounded-2xl bg-white border border-[#EFE9E2] hover:border-[#C9A24D]/50 transition-all shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-1">
                    {rel.category}
                  </span>
                  <h5 className="font-serif text-xs sm:text-sm font-semibold text-[#2B1B3D] group-hover:text-[#7B4FC9] line-clamp-2">
                    {rel.title}
                  </h5>
                </div>
                <span className="text-[11px] text-[#7B4FC9] font-bold inline-flex items-center gap-1 pt-3">
                  <span>Read Article</span>
                  <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}
