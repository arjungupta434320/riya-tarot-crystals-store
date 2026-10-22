"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts, BlogPost } from "@/lib/blogService";
import { fallbackProducts } from "@/data/products";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Check, 
  ShoppingBag, 
  BookOpen,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Heart
} from "lucide-react";
import { useStore } from "@/store/useStore";

function ArticleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("slug");
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<BlogPost[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const { showToast } = useStore();

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getBlogPostBySlug(slug).then((found) => {
      setPost(found);
      setLoading(false);
    });

    getBlogPosts().then((all) => {
      setRelatedArticles(all.filter((p) => p.slug !== slug).slice(0, 3));
    });
  }, [slug]);

  const handleShare = async () => {
    if (!post) return;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: url,
        });
        return;
      } catch {}
    }

    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    showToast("✨ Sacred article link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (!post) return;
    const text = encodeURIComponent(`*${post.title}*\n\n${post.excerpt}\n\nRead the full guide on Riya Tarot Crystals:\n${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] py-24 flex flex-col items-center justify-center text-center bg-[#FBF8F3]">
        <Sparkles className="w-8 h-8 text-[#C9A24D] animate-spin mb-4" />
        <p className="font-serif text-lg text-[#2B1B3D]">Invoking crystal lore & wisdom...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] py-24 flex flex-col items-center justify-center text-center bg-[#FBF8F3] px-4">
        <div className="w-16 h-16 rounded-full bg-[#F5F0FD] border border-[#7B4FC9]/30 flex items-center justify-center text-[#7B4FC9] mb-4">
          <BookOpen size={28} />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B3D] mb-2">
          Article Shifted into the Ether
        </h1>
        <p className="text-xs sm:text-sm text-[#635572] max-w-md mx-auto mb-6">
          The journal entry you are looking for may have been archived or moved. Explore our sacred crystal archives below.
        </p>
        <Link
          href="/blog"
          className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white btn-amethyst shadow-md"
        >
          ← Return to Crystal Journal
        </Link>
      </div>
    );
  }

  const relatedProducts = fallbackProducts.filter((p) =>
    (post.relatedProductIds || []).includes(p.id)
  );

  return (
    <article className="min-h-screen py-8 sm:py-14 bg-[#FBF8F3] text-[#2B1B3D]">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635572] hover:text-[#7B4FC9] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Journal Library</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors flex items-center gap-1 cursor-pointer"
              title="Share on WhatsApp"
            >
              <MessageCircle size={13} />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#EFE9E2] text-[#2B1B3D] hover:border-[#C9A24D] transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              {copiedLink ? <Check size={13} className="text-[#2E7D32]" /> : <Share2 size={13} />}
              <span>{copiedLink ? "Link Copied" : "Share"}</span>
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#F5F0FD] text-[#7B4FC9] border border-[#7B4FC9]/30">
              {post.category}
            </span>
            <span className="text-xs text-[#635572] flex items-center gap-1">
              <Calendar size={13} />
              <span>{post.publishDate}</span>
            </span>
            <span className="text-xs text-[#635572] flex items-center gap-1">
              <Clock size={13} />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#2B1B3D] font-bold leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-lg text-[#635572] leading-relaxed font-serif italic border-l-2 border-[#C9A24D] pl-4 py-1">
            "{post.excerpt}"
          </p>

          {/* Author Card */}
          <div className="flex items-center gap-3 pt-3 border-t border-[#EFE9E2]">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-white border border-[#C9A24D]/50 flex-shrink-0 shadow-2xs">
              <Image
                src={post.author?.avatar || "/images/logo.jpg"}
                alt={post.author?.name || "Riya Tarot"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xs sm:text-sm font-bold text-[#2B1B3D]">
                  {post.author?.name || "Riya Tarot"}
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#FAF0D7] text-[#8E6D24] text-[9px] font-bold uppercase tracking-wider border border-[#C9A24D]/30">
                  Verified Alchemist
                </span>
              </div>
              <span className="text-[11px] text-[#635572] block">
                {post.author?.role || "Founder & Spiritual Guide, Riya Tarot Crystals"}
              </span>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[#FAF8F3] mb-10 border border-[#EFE9E2] shadow-sm">
          <Image
            src={post.coverImage || "/images/products/amethyst-new.jpg"}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
            <ShieldCheck size={12} className="text-[#C9A24D]" />
            <span>Vedic Certified Knowledge</span>
          </div>
        </div>

        {/* Sacred Gemstone Fact-Sheet (if present) */}
        {post.factSheet && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#C9A24D]/40 mb-10 shadow-2xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#EFE9E2]">
              <Sparkles size={18} className="text-[#C9A24D]" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#2B1B3D] uppercase tracking-wider">
                Sacred Gemstone Fact-Sheet
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              {post.factSheet.chakra && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-0.5">Primary Chakra</span>
                  <span className="font-semibold text-[#2B1B3D]">{post.factSheet.chakra}</span>
                </div>
              )}
              {post.factSheet.element && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-0.5">Elemental Affinity</span>
                  <span className="font-semibold text-[#2B1B3D]">{post.factSheet.element}</span>
                </div>
              )}
              {post.factSheet.zodiac && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-0.5">Astrological Zodiac</span>
                  <span className="font-semibold text-[#2B1B3D]">{post.factSheet.zodiac}</span>
                </div>
              )}
              {post.factSheet.hardness && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-0.5">Mohs Hardness</span>
                  <span className="font-semibold text-[#2B1B3D]">{post.factSheet.hardness}</span>
                </div>
              )}
              {post.factSheet.origin && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-0.5">Geological Origin</span>
                  <span className="font-semibold text-[#2B1B3D]">{post.factSheet.origin}</span>
                </div>
              )}
              {post.factSheet.primaryVibration && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-0.5">Primary Frequency</span>
                  <span className="font-semibold text-[#7B4FC9]">{post.factSheet.primaryVibration}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Article Body Content Rendered with Markdown Engine */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE9E2] shadow-xs mb-12">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Featured Healed Crystals in this Article */}
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
                <Link
                  key={p.id}
                  href={`/product?id=${p.id}`}
                  className="p-4 rounded-2xl bg-white border border-[#EFE9E2] hover:border-[#C9A24D] flex items-center gap-3.5 shadow-2xs hover:shadow-md transition-all group"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#FAF8F3] flex-shrink-0">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-[#7B4FC9] uppercase block">{p.badge || "Energized"}</span>
                    <h5 className="font-serif text-xs font-bold text-[#2B1B3D] truncate group-hover:text-[#7B4FC9] transition-colors">{p.name}</h5>
                    <span className="text-xs font-bold text-[#2B1B3D] mt-0.5 block">₹{(p.salePrice || p.price).toLocaleString("en-IN")}</span>
                  </div>
                  <ArrowRight size={16} className="text-[#C9A24D] group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share & Alignment Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#FAF0D7] to-[#F5F0FD] border border-[#C9A24D]/40 text-center space-y-4 my-12">
          <Sparkles className="w-6 h-6 text-[#C9A24D] mx-auto animate-pulse" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1B3D]">
            Resonating with this Sacred Knowledge?
          </h3>
          <p className="text-xs sm:text-sm text-[#635572] max-w-lg mx-auto leading-relaxed">
            Share this guide with a loved one who is seeking emotional healing, mental stillness, or spiritual elevation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleWhatsAppShare}
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle size={14} />
              <span>Share on WhatsApp</span>
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2B1B3D] bg-white border border-[#EFE9E2] hover:border-[#C9A24D] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 size={14} />
              <span>Copy Guide Link</span>
            </button>
          </div>
        </div>

        {/* Related Articles Carousel / Grid */}
        {relatedArticles.length > 0 && (
          <div className="pt-8 border-t border-[#EFE9E2]">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1B3D] mb-6 flex items-center justify-between">
              <span>Continue Exploring Sacred Wisdom</span>
              <Link href="/blog" className="text-xs font-semibold text-[#7B4FC9] hover:underline">
                View All Guides →
              </Link>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/article?slug=${rel.slug}`}
                  className="group rounded-2xl bg-white border border-[#EFE9E2] hover:border-[#C9A24D] overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] w-full bg-[#FAF8F3] overflow-hidden">
                    <Image
                      src={rel.coverImage}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-white/95 text-[#7B4FC9] border border-[#7B4FC9]/30">
                        {rel.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-[#635572]">{rel.readTime}</span>
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-[#2B1B3D] group-hover:text-[#7B4FC9] transition-colors line-clamp-2 leading-snug mt-1">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="text-[11px] font-semibold text-[#8E6D24] inline-flex items-center gap-1 mt-2">
                      <span>Read Sacred Lore</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}

export default function ArticlePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 flex flex-col items-center justify-center text-[#635572]">
          <Sparkles className="w-8 h-8 text-[#C9A24D] animate-spin mb-4" />
          <p className="font-serif text-lg text-[#2B1B3D]">Invoking crystal lore...</p>
        </div>
      }
    >
      <ArticleContent />
    </Suspense>
  );
}
