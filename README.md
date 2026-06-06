# Student Dashboard — Next-Gen Learning Platform

A futuristic, highly animated education dashboard built with Next.js 16 (App Router), Supabase, Tailwind CSS, and Framer Motion.

## Architecture

### Server/Client Component Split

The application follows a deliberate server/client boundary:

- **Server Component** (`src/app/page.tsx`): Fetches all dashboard data from Supabase in a single async `Promise.all` call. This keeps data fetching on the server, reducing client bundle size and eliminating waterfall requests. On error, it renders an `<ErrorFallback>` component instead of crashing.
- **Client Component** (`src/components/HomeClient.tsx`): Receives the pre-fetched `dashboardData` as props and manages client-side state (active tab). This is the orchestration layer — it renders the sidebar and conditionally shows the dashboard grid, courses, assignments, certificates, or settings page.
- **Bento tiles** (`bento-grid-demo-2.tsx`, `CourseTile.tsx`, `ActivityTile.tsx`): Pure presentational client components with staggered Framer Motion entrance animations.

This split ensures that data fetching, SEO, and initial HTML are handled server-side, while interactivity (animations, tab switching, hover effects) runs client-side.

### Data Flow

```
Supabase (PostgreSQL)
  → Server Component (page.tsx) fetches 5 tables in parallel
    → DashboardData type passed as props to HomeClient
      → Distributed to BentoGridSecondDemo, CourseTile, ActivityTile, etc.
```

### Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 16 (App Router)** | Framework with RSC support |
| **Supabase** | PostgreSQL database + SDK |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Spring-physics animations, layout animations |
| **Lucide React** | Icon library |

### Key Design Decisions

1. **Bento Grid Layout**: Uses CSS Grid (`grid-cols-1 md:grid-cols-3`) for a responsive magazine-style layout that adapts from single column on mobile to three columns on desktop.
2. **Zero Layout Shifts**: All animations use `transform` (scale, translateY) and `opacity` only — no animating `width`, `height`, `margin`, or `padding` that would trigger browser repaints.
3. **Spring Physics**: Hover states and sidebar tab switching use Framer Motion's spring physics (`stiffness: 300-350, damping: 20-25`) for natural, non-linear motion.
4. **Supabase SSR**: Uses `@supabase/ssr` for secure server-side data fetching with environment variables.
5. **Dark Mode Only**: Deep near-black backgrounds (`#000000`, `#111111`) with orange `#FF6A00` accent and glowing gradients throughout.

### Responsive Behavior

| Breakpoint | Sidebar | Grid |
|------------|---------|------|
| >1024px (desktop) | Full sidebar with labels | 3 columns |
| 768-1024px (tablet) | Collapsed to icons only | 2 columns |
| <768px (mobile) | Bottom navigation bar | 1 column |

### Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in your Supabase credentials
3. Run `npm install`
4. Run `npm run seed` to populate the database with sample data
5. Run `npm run dev`
6. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Schema

**courses** — `id (uuid)`, `title (text)`, `progress (integer)`, `icon_name (text)`, `created_at (timestamptz)`

See `scripts/seed.mjs` for the full schema including `user_stats`, `activities`, `achievements`, and `upcoming_classes` tables.

### Challenges Faced

1. **Server/Client Boundary**: Passing Framer Motion animated components from server to client required careful separation — the data fetching server component passes data as props to a client wrapper, ensuring animations don't break hydration.
2. **Supabase SSR Setup**: Using `@supabase/ssr` requires the `createServerClient` helper with cookies support. The initial implementation used `@supabase/supabase-js` directly; switching to `@supabase/ssr` ensured proper cookie-based session handling.
3. **Staggered Animations**: Coordinating entrance animations across multiple independently-rendered tiles required using Framer Motion's `variants` with `staggerChildren` on the grid parent, rather than manual index-based delays.
4. **Responsive Sidebar**: Transitioning from a persistent left sidebar on desktop to a bottom navigation bar on mobile required conditional rendering based on viewport width, combined with Framer Motion `AnimatePresence` for smooth transitions.
