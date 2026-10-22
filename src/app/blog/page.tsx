"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts, BlogPost } from "@/lib/blogService";
import { 
  Sparkles, 
  Search, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Calendar,
  X,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const defaultCategories = [
  "All Articles",
  "Crystal Encyclopedia",
  "Chakras",
  "Healing Guides",
  "Cleansing & Charging",
  "Beginner Guides",
];

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getBlogPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  // Compute dynamic category list from existing posts
  const categories = useMemo(() => {
    const set = new Set<string>(defaultCategories);
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [posts]);

  // Featured post is the first published post
  const featuredPost = posts[0];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Articles" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        (post.content && post.content.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen py-8 sm:py-14 bg-[#FBF8F3] text-[#2B1B3D]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F0FD] text-[#7B4FC9] text-xs font-bold uppercase tracking-widest mb-3 border border-[#7B4FC9]/25">
            <Sparkles size={13} className="text-[#C9A24D]" />
            <span>The Sacred Crystal Journal & Encyclopedia</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B1B3D] font-bold tracking-tight mb-3">
            Sacred Crystal Library
          </h1>
          <p className="text-xs sm:text-sm text-[#635572] leading-relaxed max-w-xl mx-auto">
            Explore authentic Vedic wisdom, gemstone science, chakra alignments, and practical ritual guides written by Tarot Reader & Crystal Alchemist Riya.
          </p>
        </div>

        {/* Featured Post Card */}
        {selectedCategory === "All Articles" && !searchQuery && featuredPost && !loading && (
          <div className="mb-12">
            <Link
              href={`/blog/article?slug=${featuredPost.slug}`}
              className="group block rounded-3xl bg-white border border-[#EFE9E2] hover:border-[#C9A24D] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="relative aspect-[16/10] lg:w-1/2 w-full bg-[#FAF8F3] overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#7B4FC9] border border-[#7B4FC9]/30 shadow-xs">
                      ★ Featured Master Guide
                    </span>
                  </div>
                </div>

                <div className="lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-[#635572]">
                      <span className="text-[#8E6D24] font-bold uppercase tracking-wider text-[11px]">
                        {featuredPost.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        <span>{featuredPost.readTime}</span>
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B3D] group-hover:text-[#7B4FC9] transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#635572] leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#EFE9E2]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#F5F0FD] border border-[#7B4FC9]/40 flex items-center justify-center text-[#7B4FC9]">
                        <Sparkles size={14} />
                      </div>
                      <span className="text-xs font-semibold text-[#2B1B3D]">
                        {featuredPost.author?.name || "Riya Tarot"}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B4FC9] group-hover:translate-x-1 transition-transform">
                      <span>Read Guide</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Category Filter Chips & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer active:scale-95 ${
                    isSelected
                      ? "bg-[#7B4FC9] text-white border-[#7B4FC9] shadow-xs"
                      : "bg-white text-[#635572] border-[#EFE9E2] hover:border-[#C9A24D]/40"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#635572]" />
            <input
              type="text"
              placeholder="Search crystal guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-full text-xs bg-white border border-[#EFE9E2] text-[#2B1B3D] placeholder-[#9588A3] focus:outline-none focus:border-[#C9A24D] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9588A3] hover:text-[#2B1B3D]"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#C9A24D] animate-spin mb-3" />
            <p className="text-xs text-[#635572]">Unveiling sacred journal archives...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#EFE9E2] p-8 max-w-md mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#F5F0FD] border border-[#7B4FC9]/30 text-[#7B4FC9] flex items-center justify-center mx-auto mb-3">
              <BookOpen size={22} />
            </div>
            <h3 className="font-serif text-base font-bold text-[#2B1B3D] mb-1">
              No Articles Found
            </h3>
            <p className="text-xs text-[#635572] mb-4">
              We couldn't find any guides matching "{searchQuery}". Try selecting another category or clear your search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Articles");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#7B4FC9] bg-[#F5F0FD] border border-[#7B4FC9]/30 hover:bg-[#7B4FC9] hover:text-white transition-all cursor-pointer"
            >
              Clear Filters & Search
            </button>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <Link
                  href={`/blog/article?slug=${post.slug}`}
                  className="group rounded-3xl bg-white border border-[#EFE9E2] hover:border-[#C9A24D] overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full block"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="relative aspect-[16/10] w-full bg-[#FAF8F3] overflow-hidden">
                      <Image
                        src={post.coverImage || "/images/products/amethyst-new.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#7B4FC9] border border-[#7B4FC9]/30 shadow-2xs">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Excerpt */}
                    <div className="p-5 sm:p-6 space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-[#635572]">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          <span>{post.publishDate}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          <span>{post.readTime}</span>
                        </span>
                      </div>

                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#2B1B3D] group-hover:text-[#7B4FC9] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs text-[#635572] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-[#EFE9E2] mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#8E6D24] uppercase tracking-wider">
                      By {post.author?.name || "Riya Tarot"}
                    </span>
                    <span className="text-xs font-bold text-[#7B4FC9] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#FAF0D7] via-[#F5F0FD] to-white border border-[#C9A24D]/40 text-center space-y-4">
          <Sparkles className="w-6 h-6 text-[#C9A24D] mx-auto animate-pulse" />
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1B3D]">
            Not Sure Which Crystal Matches Your Energy?
          </h2>
          <p className="text-xs sm:text-sm text-[#635572] max-w-lg mx-auto leading-relaxed">
            Take our 60-second Vedic Energy Alignment Quiz to receive a personalized crystal curation based on your birth aura and current life intention.
          </p>
          <div className="pt-2">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white btn-amethyst shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <span>Take the Crystal Energy Quiz ✨</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
