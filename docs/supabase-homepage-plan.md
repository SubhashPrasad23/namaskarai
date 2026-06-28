# Supabase Data Plan — Homepage

## What exists currently (hardcoded in `page.tsx`)

Looking at the actual codebase, these sections exist on the homepage:
1. Hero section (heading, tagline, CTA buttons)
2. Hero cards (Prompt Packs, Business AI, Career AI, Student Tools)
3. Stats bar (25K+, 500+, 98%, 50K+)
4. Today's 10-Minute AI Start (steps + categories)
5. Pillar Guides (3 guides)
6. Long-form guides (6 items)
7. What's New in AI (3 news articles)
8. Join Our Community (tabs with social cards)
9. Latest Videos (7 video reels)
10. Follow buttons (Facebook, Instagram)

---

## ✅ Fetch from Supabase

### 1. `news_articles` — "What's New in AI" section

**Reason:** News is time-sensitive. New articles appear weekly. Admin needs to add/remove without deploying code.

```sql
CREATE TABLE news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  image_url TEXT,
  tag TEXT DEFAULT 'Industry News',
  read_time TEXT DEFAULT '2 min read',
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  slug TEXT UNIQUE NOT NULL,
  source_url TEXT,
  is_homepage BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. `homepage_videos` — "Latest Videos" carousel

**Reason:** New reels are posted 2-3x per week. The carousel needs fresh content without deploys.

```sql
CREATE TABLE homepage_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thumbnail_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  platform TEXT DEFAULT 'facebook' CHECK (platform IN ('facebook', 'instagram')),
  duration TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. `homepage_stats` — Stats bar

**Reason:** Numbers grow over time (learners, packs count). Updated monthly by admin.

```sql
CREATE TABLE homepage_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  order_index INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data:
INSERT INTO homepage_stats (key, value, label, icon_name, order_index) VALUES
('learners', '25K+', 'Learners in Assam', 'Users', 1),
('packs', '500+', 'Prompt Packs', 'Package', 2),
('satisfaction', '98%', 'User Satisfaction', 'Star', 3),
('tasks', '50K+', 'Tasks Simplified', 'TrendingUp', 4);
```

---

## ❌ Keep Hardcoded (No Supabase)

| Section | Why hardcoded |
|---------|---------------|
| Hero heading/tagline | Brand copy, SEO critical, changes once a year |
| Hero cards (4 items) | Core product categories, tied to routes |
| 10-Minute steps (1,2,3) | Onboarding flow, never changes |
| Category cards | Linked to internal routes, rarely changes |
| Pillar Guides (3) | SEO pages, titles must be in source code for SSG |
| Long-form guides (6) | SEO links, tied to routes |
| Community tabs content | Social platform info, changes very rarely |
| Navigation / Footer | Site structure, requires code changes anyway |

---

## Fetching Strategy

```typescript
// In a server component or data-fetching layer:

// News — revalidate every 1 hour
const news = await supabase
  .from('news_articles')
  .select('*')
  .eq('is_homepage', true)
  .order('published_date', { ascending: false })
  .limit(3);

// Videos — revalidate every 1 hour  
const videos = await supabase
  .from('homepage_videos')
  .select('*')
  .eq('is_active', true)
  .order('order_index', { ascending: true });

// Stats — revalidate every 24 hours
const stats = await supabase
  .from('homepage_stats')
  .select('*')
  .order('order_index', { ascending: true });
```

---

## Summary

| Table | Update frequency | Items shown | Revalidate |
|-------|-----------------|-------------|------------|
| `news_articles` | 2-3x per week | 3 on homepage | 1 hour |
| `homepage_videos` | 2-3x per week | 5-7 in carousel | 1 hour |
| `homepage_stats` | Monthly | 4 always | 24 hours |

**Total tables needed: 3** — Keep it simple. Only fetch what actually changes.
