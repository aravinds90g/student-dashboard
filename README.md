# Student Dashboard

A futuristic learning management dashboard with bento-grid layout, interactive animations, and Supabase integration. Built with Next.js 16, React 19, Tailwind CSS v4, Framer Motion, and shadcn/ui.

## Links

| Link | URL |
|------|-----|
| **Live Site** | https://dashboard-cyan-alpha-13.vercel.app |
| **GitHub Repo** | https://github.com/aravinds90g/student-dashboard |
| **Assessment Report PDF** | https://dashboard-cyan-alpha-13.vercel.app/assessment-report.pdf |

## Features

- **Dashboard** — Bento-grid overview with hero stats, streak tracking, weekly activity chart, course progress, achievements, and upcoming classes
- **Courses** — Course catalog with progress tracking, module breakdown, and detail view
- **Assignments** — Assignment tracking with status (pending/submitted/graded/overdue), scores, and deadlines
- **Certificates** — Earned certificates with credential IDs and grades
- **Settings** — Profile, notification preferences, account management
- **Dark Mode** — Full dark theme with orange `#FF6A00` accent and animated border glow effects
- **Responsive** — Desktop sidebar, tablet collapsed icons, mobile bottom navigation bar
- **Animations** — Staggered entrance animations, spring-physics hover states, animated border glow on mouse proximity

## Tech Stack

| Tool | Version |
|------|---------|
| Next.js (App Router) | 16.2.7 |
| React | 19.2.4 |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| Framer Motion | 12.40 |
| Supabase | PostgreSQL |
| shadcn/ui | 4.10 |
| Lucide React | Icons |

## Getting Started

### Prerequisites

- **Node.js 20+** and npm
- **A Supabase project** (free tier works) — [Create one here](https://supabase.com/dashboard)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd student-dashboard/dashboard
npm install
```

### 2. Environment Variables

Copy the example env file:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> **Where to find these:** Supabase Dashboard → Project Settings → API → Project URL & `anon` public key

### 3. Seed the Database

The seed script creates 5 tables (`courses`, `user_stats`, `activities`, `achievements`, `upcoming_classes`) and populates them with sample data.

Set your database password in `.env.local`:

```env
DB_PASSWORD=your-supabase-db-password
```

Then run:

```bash
npm run seed
```

> **Where to find the DB password:** Supabase Dashboard → Project Settings → Database → Database password
>
> Alternatively, set `DATABASE_URL` (full connection string) instead of `DB_PASSWORD`.

### 4. Start Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
dashboard/
├── public/              # Static assets (images, SVGs)
├── scripts/
│   └── seed.mjs         # Database seed script (creates tables + sample data)
├── src/
│   ├── app/
│   │   ├── globals.css  # Tailwind v4 + shadcn theme variables
│   │   ├── layout.tsx   # Root layout (Geist font, dark mode)
│   │   └── page.tsx     # Server component — fetches all Supabase data
│   ├── components/
│   │   ├── dashboard/   # Dashboard-specific (LoadingSkeleton, ErrorFallback, CourseTile)
│   │   ├── courses/     # CoursesPage, CourseCard
│   │   ├── assignments/ # AssignmentsPage, AssignmentCard
│   │   ├── certificates/# CertificatesPage, CertificateCard
│   │   ├── settings/    # SettingsPage
│   │   ├── ui/          # Reusable UI (bento-grid, button)
│   │   ├── BorderGlow.* # Animated border glow effect (TSX + CSS)
│   │   ├── ActivityTile.tsx  # Weekly activity bar chart
│   │   ├── HomeClient.tsx    # Client orchestrator with tab routing
│   │   └── Sidebar.tsx       # Desktop sidebar + mobile bottom nav
│   ├── data/
│   │   ├── courses.ts      # Static course data (local fallback)
│   │   ├── assignments.ts  # Static assignment data
│   │   └── certificates.ts # Static certificate data
│   ├── lib/
│   │   ├── supabase.ts  # Supabase client factory
│   │   └── utils.ts     # cn() helper (clsx + tailwind-merge)
│   └── types/
│       └── index.ts     # TypeScript interfaces for all data models
├── .env.example          # Environment template
├── next.config.ts        # Next.js config (unsplash remote images)
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Architecture

### Server/Client Split

The app uses Next.js App Router's server/client boundary:

- **Server Component** (`src/app/page.tsx`) — Fetches all 5 Supabase tables in a single `Promise.all` call. On error, renders `<ErrorFallback>` instead of crashing.
- **Client Component** (`src/components/HomeClient.tsx`) — Receives pre-fetched `dashboardData` as props, manages tab state, and conditionally renders pages.
- **Pure Presentational** — Individual tiles have staggered Framer Motion entrance animations triggered by parent `variants`.

### Data Flow

```
Supabase (PostgreSQL)
  → Server Component (page.tsx) — parallel fetch of 5 tables
    → DashboardData props → HomeClient
      → BentoGridSecondDemo, CourseTile, ActivityTile, etc.
```

### Responsive Breakpoints

| Breakpoint | Sidebar | Grid |
|------------|---------|------|
| >1024px (desktop) | Full sidebar | 3 columns |
| 768–1024px (tablet) | Collapsed icons | 2 columns |
| <768px (mobile) | Bottom nav bar | 1 column |

## Database Schema

The seed script creates these tables with Row Level Security (RLS) enabled and public read policies:

- **courses** — `id (uuid)`, `title (text)`, `progress (integer)`, `icon_name (text)`, `created_at (timestamptz)`
- **user_stats** — `name`, `ahead_percent`, `learning_hours`, `completed_courses`, `certificates`, `streak_days`, `streak_active_until`, `total_compute_hours`, `efficiency_rate`, `active_modules`, `avg_session_hours`
- **activities** — `day (text)`, `hours (integer)` — one row per day of the week
- **achievements** — `title (text)`, `icon (text)` — emoji-based achievement badges
- **upcoming_classes** — `title`, `time`, `duration`, `color` — today's class schedule

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous API key |
| `DB_PASSWORD` | Seed only | Supabase database password |
| `DATABASE_URL` | Seed only | Full PostgreSQL connection string (overrides DB_PASSWORD) |

## Troubleshooting

- **"Failed to load dashboard data"** — The Supabase tables haven't been seeded yet. Run `npm run seed`.
- **Missing RLS policy error** — The seed script creates public SELECT policies automatically. If you recreate tables manually, ensure RLS policies exist.
- **Next.js version mismatch** — This project uses Next.js 16.2.7. If you're on a different major version, check `node_modules/next/dist/docs/` for breaking changes.
- **Port conflict** — Next.js defaults to port 3000. Use `npm run dev -- -p 3001` for a different port.
