# Riya Tarot Crystals — Luxury Spiritual E-Commerce Platform

> **A $10,000-grade custom e-commerce boutique for high-vibrational, energised crystal bracelets, clusters, and sacred pendants.**

Crafted with an ethereal light luxury aesthetic: warm ivory backgrounds (`#FBF8F3`), pearl white cards, champagne gold accents (`#C9A24D`), amethyst CTAs (`#7B4FC9`), and deep plum typography (`#2B1B3D`) with WCAG AA compliance.

---

## 🌟 Key Features

1. **3D Crystal Prism Hero**: Interactive WebGL crystal prism powered by Three.js with floating dust particles, shimmer typography, and celestial aura.
2. **Interactive 7-Chakra Journey**: Tap any of the 7 subtle energy orbs (Root to Crown) to uncover Sanskrit mantras, affirmations, and instantly filter corresponding crystals.
3. **Multi-Dimensional Catalog Studio**:
   - Filter by Category (Chakra, Mixel, Kundli-based), Chakra, Purpose/Intention, Crystal Family, Bead Size (8mm / 10mm).
   - Real-time search with instant keyword suggestions.
   - Dual-image swap on hover, Quick-View drawer, and animated Add-to-Bag.
4. **Interactive 360° Spin & Zoom Viewer**: Spin crystal bracelets 360° with mouse/touch or examine close-up bead craftsmanship.
5. **Interactive Wrist Size Guide**: Step-by-step visual sizing guide with measurement instructions and a size converter table.
6. **Vedic Kundli Consecration Engine**: For personalized Kundli bracelets, collects Name, Date, Time, and Place of Birth, saving custom birth chart data directly into cart items and orders.
7. **The Spiritual Energy Quiz ("Find Your Bracelet")**:
   - 7-step guided questionnaire with circular SVG progress ring.
   - Dynamic scoring engine (`src/data/quiz-scoring.json`) weighting intentions, astrological elements, and energy signatures.
   - Aura scanner animation and top-3 crystal recommendation reveal.
8. **Crystal Library & Journal**:
   - 6 original 800+ word educational articles with fact sheets, reading-time badges, and inline shoppable crystal cards.
   - JSON-LD Article structured data schema for rich search results.
9. **India-First Seamless Checkout**:
   - Automatic Indian pincode city/state lookup (`src/lib/pincodes.ts`).
   - Integrated Razorpay payment modal with UPI, Cards, Netbanking, plus Cash on Delivery (COD).
   - Live Order Tracking portal with 5-phase spiritual energization timeline.
10. **Administrative Sanctuary**: Lightweight protected dashboard at `/admin` (Passcode: `riya108`) for managing inventory, blog posts, and viewing orders.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + Custom Design Tokens (`src/lib/design-tokens.ts`)
- **Animation Suite**:
  - Lenis Smooth Scroll
  - Framer Motion & GSAP
  - Three.js WebGL (Lazy-loaded hero prism)
  - Custom gem cursor & magnetic hover buttons
- **State Management**: Zustand with persistent local storage
- **Payments**: Razorpay India (Test & Production ready)
- **Deployment**: Zero-config deployable to Vercel or Cloudflare Pages

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18.18+ or Node.js 20+
- npm or yarn

### 2. Installation
```bash
git clone https://github.com/your-username/riya-tarot-crystals.git
cd riya-tarot-crystals
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local` and add your Razorpay keys:
```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_secret_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your sanctuary.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 📂 Project Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts, Lenis, Cursor, Preloader, Nav & Cart
│   ├── page.tsx                # Homepage (Hero 3D, Chakra Explorer, Bestsellers, Energizing Timeline)
│   ├── shop/page.tsx           # Multi-dimensional filter catalog
│   ├── product/page.tsx        # 360° viewer, size guide, Kundli consecration form
│   ├── quiz/page.tsx           # Spiritual quiz engine
│   ├── blog/                   # Blog index & dynamic [slug] reader with JSON-LD
│   ├── checkout/page.tsx       # Pincode autofill, Razorpay checkout & WhatsApp hook
│   ├── track/page.tsx          # 5-phase spiritual energizing order tracker
│   ├── admin/page.tsx          # Protected admin dashboard (Passcode: riya108)
│   └── about/page.tsx          # Founder spiritual journey & sacred process
├── components/
│   ├── 3d/                     # Three.js WebGL Hero Crystal Canvas
│   ├── animations/             # SmoothScroll, CustomCursor, Preloader, Magnetic, TiltCard
│   ├── home/                   # ChakraExplorer, Testimonials, Energizing Process
│   ├── quiz/                   # QuizEngine & Aura scanner
│   ├── shop/                   # Image360Viewer, SizeGuideModal, QuickView
│   └── ui/                     # Button, Badge, Card, Modal, Drawer, CrystalDivider
├── data/
│   ├── products.ts             # Crystal products catalog
│   ├── blogPosts.ts            # Seeded 800+ word crystal encyclopedia articles
│   └── quiz-scoring.json       # Configurable scoring matrix for the quiz
├── lib/
│   ├── design-tokens.ts        # Typography, colors, shadows, and spacing tokens
│   ├── razorpay.ts             # Razorpay payment script loader & checkout trigger
│   └── pincodes.ts             # Indian pincode autofill directory
└── store/
    └── cartStore.ts            # Zustand cart with localStorage persistence & Kundli fields
```

---

## 💎 How to Edit Products & Articles

### Adding or Editing Products
Edit `src/data/products.ts` directly, or manage through the `/admin` portal:
```typescript
{
  id: "amethyst-divine-clarity",
  name: "Amethyst Crown Chakra Healed Bracelet",
  slug: "amethyst-divine-clarity",
  price: 1899,
  originalPrice: 2499,
  category: "chakra-bracelets",
  chakra: "Crown Chakra",
  purpose: "calm",
  beadSizes: ["8mm", "10mm"],
  isEnergized: true,
  isBestseller: true,
  rating: 4.95,
  reviewCount: 124,
  description: "Natural Brazilian Amethyst cleansed in Ganga Jal and consecrated under the full moon...",
  images: [
    "/images/products/amethyst-1.webp",
    "/images/products/amethyst-2.webp"
  ]
}
```

### Adding New Blog Articles
Add a new post object to `src/data/blogPosts.ts`. The post will automatically generate its static route `/blog/[slug]`, table of contents, and JSON-LD schema:
```typescript
{
  slug: "citrine-wealth-abundance-guide",
  title: "Citrine: The Merchant's Stone of Abundance & Solar Radiance",
  excerpt: "Discover the golden crystal that never needs cleansing...",
  category: "Healing Guides",
  readTime: "7 min read",
  author: { name: "Riya Sharma", role: "Vedic Crystal Healer" },
  factSheet: {
    chakra: "Solar Plexus (Manipura)",
    element: "Fire",
    zodiac: "Leo, Aries, Sagittarius",
    hardness: "7 Mohs",
    origin: "Brazil, Madagascar"
  },
  content: `## The Solar Magnet...`
}
```

---

## 🌐 Deploy to Vercel or Cloudflare

### Deploy to Cloudflare Pages (Production Store)
- **Live URL**: [https://riya-tarot-crystals-store.pages.dev](https://riya-tarot-crystals-store.pages.dev)
- **Repository**: [https://github.com/arjungupta434320/riya-tarot-crystals-store](https://github.com/arjungupta434320/riya-tarot-crystals-store)
- **Framework Preset**: None (Static)
- **Build Command**: `npm run build`
- **Output Directory**: `out`

### Deploy to Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import the repository. Next.js App Router will be auto-detected.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
5. Click **Deploy**.

---

## 📜 Spiritual Disclaimer
All crystal metaphysical and astrological descriptions are rooted in sacred Vedic traditions and spiritual folklore. Crystals are meant to serve as energetic anchors for mindfulness, meditation, and intention-setting, and are not intended as substitutes for professional medical diagnosis or treatment.
