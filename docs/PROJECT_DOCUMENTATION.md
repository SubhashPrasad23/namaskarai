# Namaskar AI — Project Documentation

> **Version:** 0.1.0 | **Last Updated:** June 27, 2026 | **Repository:** namaskarai

---

## Table of Contents

1. [Project Overview](#1-project-overview)  
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)  
3. [Project Architecture](#3-project-architecture)  
4. [Database Schema](#4-database-schema)  
5. [Internationalization](#5-internationalization-i18n)  
6. [Pages & Features](#6-pages--features)  
7. [Services & Data Layer](#7-services--data-layer)  
8. [UI Components](#8-ui-components)  
9. [Environment Variables](#9-environment-variables)  
10. [Getting Started](#10-getting-started)  
11. [Future Plans](#11-future-plans)  

---

## 1. Project Overview

**Namaskar AI** is the first Assamese-language AI learning platform. It provides prompt packs, AI tool guides, courses, and step-by-step roadmaps in both English and Assamese.

**Mission:** Make AI education accessible to learners, job seekers, small businesses, and families in Assam.

| Audience | Use Case |
|----------|----------|
| Students & Aspirers | Exam notes, study discipline, AI-assisted learning |
| Career & Job Seekers | CV building, interview prep, skill roadmaps |
| Small Businesses | Sales prompts, WhatsApp templates, marketing AI |
| Parents & Families | Safe AI usage rules, child guidance |

**Production URL:** https://namaskarai.com

---

## 2. Tech Stack & Dependencies

| Category | Library | Version | Purpose |
|----------|---------|---------|---------|
| Framework | Next.js | 16.2.9 | React framework (App Router) |
| Framework | React | 19.2.4 | UI library |

---

## 3. Project Architecture

### Folder Structure

```
namaskarai/
├── docs/                          # Documentation
├── public/                        # Static assets (icons/, images/)
├── src/
│   ├── app/
│   │   ├── (admin)/admin/         # Admin route group
│   │   │   ├── layout.tsx         # Sidebar layout
│   │   │   ├── page.tsx           # Dashboard
│   │   │   ├── courses/page.tsx   # Manage courses
│   │   │   ├── prompts/page.tsx   # Manage prompts
│   │   │   ├── tools/page.tsx     # Tool approvals
│   │   │   └── users/page.tsx     # Waitlist users
│   │   ├── (user)/                # User route group
│   │   │   ├── layout.tsx         # Navbar + Footer + Lenis
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── ai-course/         # Course listing + waitlist
│   │   │   ├── ai-tools/          # Approved tools directory
│   │   │   ├── launch-tool/       # Submit tool for listing
│   │   │   ├── news/              # AI news aggregator
│   │   │   └── prompt-packs/      # Browse prompts
│   │   ├── globals.css
│   │   └── layout.tsx             # Root layout (SEO, providers)
│   ├── components/
│   │   ├── courses/               # Feature: courses
│   │   │   ├── components/
│   │   │   └── service/
│   │   ├── prompts/               # Feature: prompts
│   │   │   ├── components/
│   │   │   └── services/
│   │   ├── layout/                # Navbar, Footer, Jhapi
│   │   └── ui/                    # Badge, Button, Card, SearchInput
│   ├── hooks/useTranslation.ts
│   ├── i18n/                      # Locale system
│   │   ├── index.ts
│   │   ├── LanguageContext.tsx
│   │   └── locales/ (en.json, as.json)
│   └── lib/
│       ├── supabase/client.ts
│       └── utils.ts
├── supabase-schema.sql
├── .env
├── package.json
└── tsconfig.json
```

### Route Groups


---

## 4. Database Schema

The app uses **Supabase** (hosted PostgreSQL). Schema file: `supabase-schema.sql`

### 4.1 `prompt` table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Auto-generated |
| title | TEXT NOT NULL | English title |
| title_as | TEXT | Assamese title |
| category | TEXT | e.g., "Marketing", "Career" |
| prompt | TEXT NOT NULL | English prompt text |
| prompt_as | TEXT | Assamese prompt text |
| tags | JSONB | Array of tags |
| slug | TEXT | URL-friendly slug |
| created_at | TIMESTAMPTZ | Creation timestamp |

Indexes: `idx_prompt_category`, `idx_prompt_slug`

### 4.2 `courses` table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Auto-generated |
| name | TEXT NOT NULL | English name |
| name_as | TEXT | Assamese name |
| description | TEXT | English description |
| description_as | TEXT | Assamese description |
| created_at | TIMESTAMPTZ | Creation timestamp |

### 4.3 `users` table (Waitlist)

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Auto-generated |
| name | TEXT NOT NULL | Full name |
| email | TEXT NOT NULL | Email address |
| age | INTEGER | User age |
| courseName | TEXT NOT NULL | Course they joined |
| created_at | TIMESTAMPTZ | Registration time |

Index: `idx_users_email`

### 4.4 `tool_submissions` table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Auto-generated |
| url | TEXT NOT NULL | Tool website URL |
| package | TEXT NOT NULL | `website-only` / `maximum-exposure` / `custom-launch-plan` |

---

## 5. Internationalization (i18n)

**Supported Locales:** English (`en` — default), Assamese (`as`)

### Architecture

- `src/i18n/index.ts` — Exports `Locale` type, `getTranslation()` function
- `src/i18n/LanguageContext.tsx` — React Context provider for locale state
- `src/i18n/locales/en.json` — English strings
- `src/i18n/locales/as.json` — Assamese strings
- `src/hooks/useTranslation.ts` — Translation hook

### How It Works

1. `LanguageProvider` wraps the app in the root layout
2. Locale is persisted in `localStorage` (key: `namaskarai-locale`)
3. Components use `useLanguage()` or `useTranslation()` hooks
4. Dot-notation keys: `getTranslation(locale, "common.promptPacks")`

### Usage Patterns

```tsx
// Hook-based
const { t, locale } = useTranslation();
const label = t("common.promptPacks");

---

## 6. Pages & Features

### 6.1 User-Facing Pages

**Homepage** (`/`) — `src/app/(user)/page.tsx`
- Client Component with Framer Motion scroll animations
- Sections: Hero, Hero Cards, Stats Bar, 10-Minute AI Start, Pillar Guides, Long-form Guides, What's New in AI, Community Tabs, Latest Videos Carousel, Follow Buttons

**Prompt Packs** (`/prompt-packs`) — `src/app/(user)/prompt-packs/page.tsx`
- Server Component — fetches from Supabase `prompt` table
- Grid display with category badges, tags, glass-morphism cards

**AI Tools** (`/ai-tools`) — `src/app/(user)/ai-tools/page.tsx`
- Client Component — fetches approved tools from `tool_submissions`
- Sortable table (URL, Package, Date), package badges, external links

**AI Course** (`/ai-course`) — `src/app/(user)/ai-course/page.tsx`
- Client Component — fetches from `courses` table
- Course cards, "Join Waitlist" modal, localStorage persistence
- Submits user data to `users` table

**Launch Tool** (`/launch-tool`) — `src/app/(user)/launch-tool/page.tsx`
- Client Component — writes to `tool_submissions`
- 3 pricing packages ($49 / $149 / Custom), URL validation
- Contact page at `/launch-tool/contact`

**News** (`/news`) — `src/app/(user)/news/page.tsx`
- Client Component — GNews API with hardcoded fallback
- Search/filter, time-ago display, source badges

### 6.2 Admin Pages

**Dashboard** (`/admin`) — Summary stats cards (Prompts, Courses, Tools, Pending, Users)

**Manage Prompts** (`/admin/prompts`) — Full CRUD, bilingual fields, auto-slug, tags

**Manage Courses** (`/admin/courses`) — Full CRUD, bilingual name + description

**Tool Approvals** (`/admin/tools`) — Filter by status, Approve/Reject actions

**Waitlist Users** (`/admin/users`) — Read-only table (Name, Email, Age, Course, Date)


// Context-based
const { locale, setLocale, toggleLocale } = useLanguage();

// Inline conditional (most common in this codebase)
const isAs = locale === "as";
<p>{isAs ? "অসমীয়া টেক্সট" : "English text"}</p>
```

### Bilingual DB Columns Convention

- English: `title`, `name`, `description`, `prompt`
- Assamese: `title_as`, `name_as`, `description_as`, `prompt_as`

| release_date | TIMESTAMPTZ | Submission date |
| status | TEXT NOT NULL | `pending` / `approved` / `rejected` |
| created_at | TIMESTAMPTZ | Creation timestamp |

Indexes: `idx_tool_submissions_status`, `idx_tool_submissions_release_date`

### 4.5 Row Level Security (RLS)

All tables have RLS enabled with public access policies:

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| prompt | Public | Public | Public | Public |
| courses | Public | Public | Public | Public |
| users | Public | Public | — | — |
| tool_submissions | Public | Public | Public | — |

> **Note:** Policies are permissive for MVP. Add admin-only restrictions before production.

| Group | Purpose | URL |
|-------|---------|-----|
| `(user)` | Public-facing pages | `/` (no prefix) |
| `(admin)` | Admin panel | `/admin` |

- **User layout:** Navbar + Footer + Lenis smooth scrolling
- **Admin layout:** Sidebar navigation with admin links

| Framework | TypeScript | ^5 | Type safety |
| Styling | Tailwind CSS | ^4 | Utility-first CSS |
| Styling | @tailwindcss/postcss | ^4 | PostCSS integration |
| Animation | Framer Motion | ^12.41.0 | Declarative animations |
| Utility | clsx | ^2.1.1 | Conditional classnames |
| Utility | tailwind-merge | ^3.6.0 | Merge Tailwind classes |
| Backend | @supabase/supabase-js | ^2.108.2 | Supabase client (PostgreSQL) |
| Icons | Lucide React | ^1.21.0 | Icon library |
| Carousel | Embla Carousel React | ^8.6.0 | Slider component |
| UX | Lenis | ^1.3.23 | Smooth scrolling |
| Theming | next-themes | ^0.4.6 | Light/dark theme |
| Linting | ESLint | ^9 | Code linting |
| Linting | eslint-config-next | 16.2.9 | Next.js ESLint rules |
