# 🔮 Dynamic Blog & CMS Setup Guide (Riya Tarot Crystals)

This website features a **No-Code Dynamic Blog & Journal CMS**. You can create, edit, save drafts, and delete articles directly from your live website at `/admin` without touching code or opening Google Antigravity.

---

## ⚡ Quick Start: 3 Steps to Cloud Database Activation

The blog system includes **hybrid persistence**:
1. **Immediate Local Mode:** Out of the box, all posts, edits, and newly published articles save to your browser's persistent storage and work immediately.
2. **Cloud Mode (Supabase):** Once you connect free-tier Supabase, all articles sync globally across all devices and visitors instantly!

---

### Step 1: Create a Free Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New Project** and name it `riya-tarot-crystals`.
3. Set a strong database password and choose your nearest region (e.g., *Mumbai / South Asia* or *Singapore*).
4. Wait ~1 minute for Supabase to finish provisioning.

---

### Step 2: Create the `blog_posts` Database Table

1. In your Supabase project dashboard, click **SQL Editor** on the left navigation bar.
2. Click **New Query**, paste the exact SQL script below, and click **Run**:

```sql
-- 1. Create the blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  category TEXT DEFAULT 'Crystal Encyclopedia',
  publish_date TEXT,
  read_time TEXT,
  cover_image TEXT,
  author JSONB DEFAULT '{"name": "Riya Tarot", "role": "Founder & Spiritual Guide", "avatar": "/images/logo.jpg"}'::jsonb,
  fact_sheet JSONB DEFAULT '{"chakra": "Crown & Heart", "element": "Cosmic Ether", "zodiac": "All Signs", "hardness": "7.0 (Mohs)", "origin": "Ethically Sourced", "primaryVibration": "Universal Balance"}'::jsonb,
  content TEXT NOT NULL,
  related_product_ids JSONB DEFAULT '[]'::jsonb,
  seo_description TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create indexes for high-speed queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 4. Allow public read access to all published posts
CREATE POLICY "Public can read published blog posts"
ON public.blog_posts
FOR SELECT
USING (true);

-- 5. Allow insert/update/delete from the admin dashboard (anon key)
CREATE POLICY "Allow admin operations"
ON public.blog_posts
FOR ALL
USING (true)
WITH CHECK (true);
```

---

### Step 3: Copy Your Supabase API Keys

1. In Supabase, go to **Project Settings** (gear icon at the bottom left) > **API**.
2. Copy:
   - **Project URL** (e.g., `https://abcdefghijklm.supabase.co`)
   - **anon public** API Key (e.g., `eyJhbGciOi...`)

---

### Step 4: Add Environment Variables

#### For Local Testing:
Create or edit `.env.local` in this project's root folder:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
NEXT_PUBLIC_ADMIN_PASSCODE=riya108
```

#### For Your Live Cloudflare Website:
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages** > Click on your project (`riya-tarot-crystals-store`).
3. Click **Settings** > **Environment Variables** (or **Variables and Secrets**).
4. Add the following variables under **Production**:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://your-project-id.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your-anon-public-key-here`
   - `NEXT_PUBLIC_ADMIN_PASSCODE` = `riya108`
5. Click **Save** and trigger a new deployment or push a git commit.

---

## 🖥️ How to Use the Live Admin CMS

### 1. Access the Admin Console
- Visit: `https://your-website.com/admin` (or `http://localhost:3000/admin` locally).
- Enter the Master Passcode: **`riya108`** (or `admin108` / `divine108`).

### 2. Create a New Article
1. In the top navigation tabs, select **Journal & Blog CMS**.
2. Click **+ Create New Post**.
3. Fill in:
   - **Article Title:** (e.g. *Golden Pyrite & Citrine: The Ultimate Wealth Magnet*)
   - **URL Slug:** Auto-generated in real-time or check/uncheck to customize.
   - **Category:** Choose from standard categories (*Crystal Encyclopedia, Chakras, Healing Guides, Cleansing & Charging, Beginner Guides*) or type a custom category.
   - **Cover Image:** Paste an image URL or click one of the 1-click **Sacred Presets** (Amethyst, Rose Quartz, Pyrite, Citrine, Fluorite, Black Tourmaline, Green Jade).
   - **Short Excerpt:** 1-2 sentences for search preview and card summary.
   - **Article Body (Markdown):** Use the built-in toolbar to insert H2, H3, bold, lists, quotes, tables, and tips.
   - **Live Reader Preview:** Observe the real-time preview on the right side as you write!
4. Click **Publish Live Now** to make it immediately visible to website visitors, or **Save Draft** to work on it privately.

### 3. Edit or Delete Articles
- On the CMS list, click **Edit** on any article to open the live editor with its content loaded.
- Click **View** to open the live article in a new tab (`/blog/article?slug=...`).
- Click **Delete** (trash icon) to permanently remove the article.

---

## 🎨 Supported Markdown Formatting in Articles

The built-in `MarkdownRenderer` supports:

| Markdown Syntax | What It Renders |
| :--- | :--- |
| `## Section Title` | Styled H2 with champagne gold diamond accent |
| `### Sub-heading` | Styled H3 in amethyst purple |
| `**bold text**` | Bold text in deep plum |
| `*italic text*` | Elegant italic text |
| `> Sacred Quote` | Serif blockquote with champagne gold border |
| `> [!TIP] Advice` | Sacred Wisdom callout alert box |
| `- List item` | Bullet list with amethyst dots |
| `1. Step one` | Numbered list with circular purple badge |
| `\| Col 1 \| Col 2 \|` | Fully responsive ivory-bordered table |
| `---` | Sacred gold sparkle section divider |
| `[Link](https://...)` | Sacred amethyst underlined link |

---

## 🔒 Security & Peace of Mind
- The `/admin` route is password protected.
- If Supabase is ever temporarily offline or your API quota runs out, the site automatically falls back to local storage and seed articles, ensuring **zero downtime** for your visitors.
