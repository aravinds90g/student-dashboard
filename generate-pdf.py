#!/usr/bin/env python3
"""Generate an assessment PDF for the Student Dashboard project."""

from fpdf import FPDF
import datetime, os

class PDF(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font("Helvetica", "I", 8)
            self.set_text_color(100, 100, 100)
            self.cell(0, 8, "Student Dashboard - Project Report", align="C")
            self.ln(12)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(130, 130, 130)
        self.cell(0, 10, f"Page {self.page_no()}/{{nb}}", align="C")

    def section_title(self, title):
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(255, 106, 0)
        self.cell(0, 10, title)
        self.ln(8)
        self.set_draw_color(255, 106, 0)
        self.set_line_width(0.5)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(6)

    def sub_title(self, title):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(50, 50, 50)
        self.cell(0, 8, title)
        self.ln(7)

    def body_text(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(40, 40, 40)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    def bullet(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(40, 40, 40)
        self.set_x(self.l_margin)
        self.cell(6, 5.5, "-")
        self.multi_cell(0, 5.5, text)
        self.set_x(self.l_margin)

    def tech_item(self, name, desc):
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(40, 40, 40)
        self.cell(40, 6, name)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(0, 6, desc)

    def code_block(self, code):
        self.set_fill_color(245, 245, 245)
        self.set_text_color(30, 30, 30)
        self.set_font("Courier", "", 8)
        lines = code.split("\n")
        for line in lines:
            self.cell(0, 4.5, "  " + line, fill=True)
            self.ln(4.5)
        self.ln(3)


pdf = PDF()
pdf.alias_nb_pages()
pdf.set_auto_page_break(auto=True, margin=20)

# Cover Page
pdf.add_page()
pdf.ln(30)
pdf.set_font("Helvetica", "B", 32)
pdf.set_text_color(255, 106, 0)
pdf.cell(0, 14, "Student Dashboard", align="C")
pdf.ln(14)
pdf.set_font("Helvetica", "", 16)
pdf.set_text_color(80, 80, 80)
pdf.cell(0, 10, "Next-Gen Learning Management Dashboard", align="C")
pdf.ln(20)

pdf.set_draw_color(255, 106, 0)
pdf.set_line_width(0.8)
pdf.line(60, pdf.get_y(), 150, pdf.get_y())
pdf.ln(20)

pdf.set_font("Helvetica", "", 11)
pdf.set_text_color(60, 60, 60)
info_lines = [
    ("Technology Stack", "Next.js 16, React 19, TypeScript, Tailwind CSS v4, Supabase, Framer Motion"),
    ("Architecture", "App Router with Server/Client Component split"),
    ("Database", "Supabase PostgreSQL (5 tables with RLS)"),
    ("UI Framework", "shadcn/ui + Base UI React + Lucide Icons"),
    ("Live URL", "https://dashboard-cyan-alpha-13.vercel.app"),
    ("GitHub Repo", "https://github.com/aravinds90g/student-dashboard"),
    ("Date", datetime.date.today().strftime("%B %d, %Y")),
]
for label, value in info_lines:
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(50, 7, label + ":")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 7, value)
    pdf.ln(7)

# Section 1: Project Overview
pdf.add_page()
pdf.section_title("1. Project Overview")

pdf.body_text(
    "The Student Dashboard is a modern, interactive learning management system designed to "
    "provide students with a comprehensive view of their educational progress. Built with the "
    "latest web technologies, it features a dark-themed, animated interface with real-time "
    "data from a Supabase PostgreSQL database."
)

pdf.sub_title("Key Features")
features = [
    "Interactive bento-grid dashboard with animated tiles and staggered entrance animations",
    "Real-time course progress tracking with visual progress bars and module breakdowns",
    "Assignment management with status tracking (pending, submitted, graded, overdue)",
    "Certificate showcase with credential IDs, grades, and time-spent tracking",
    "Weekly activity charts with bar graph visualization and compute efficiency metrics",
    "Streak tracking with day-of-week indicators and motivational elements",
    "Upcoming class schedule with time, duration, and color-coded categories",
    "Fully responsive layout: desktop sidebar, tablet collapsed nav, mobile bottom bar",
    "Dark theme with orange accent (#FF6A00) and animated mouse-responsive border glow",
]
for f in features:
    pdf.bullet(f)

# Section 2: Technical Architecture
pdf.add_page()
pdf.section_title("2. Technical Architecture")

pdf.sub_title("2.1 Server/Client Component Split")
pdf.body_text(
    "The application follows Next.js App Router conventions with a deliberate separation "
    "between server and client components:"
)

pdf.set_font("Helvetica", "B", 10)
pdf.cell(0, 6, "Server Component (src/app/page.tsx):")
pdf.ln(6)
pdf.body_text(
    "Fetches all dashboard data from 5 Supabase tables in a single Promise.all call. "
    "This keeps data fetching on the server, reduces client bundle size, and eliminates "
    "waterfall requests. On error, it renders an ErrorFallback component instead of crashing."
)

pdf.set_font("Helvetica", "B", 10)
pdf.cell(0, 6, "Client Component (src/components/HomeClient.tsx):")
pdf.ln(6)
pdf.body_text(
    "Receives pre-fetched dashboardData as props and manages client-side tab state. "
    "Serves as the orchestration layer, conditionally rendering the dashboard grid, "
    "courses, assignments, certificates, or settings page based on active tab."
)

pdf.set_font("Helvetica", "B", 10)
pdf.cell(0, 6, "Presentational Components:")
pdf.ln(6)
pdf.body_text(
    "Individual tiles (bento-grid-demo-2.tsx, CourseTile.tsx, ActivityTile.tsx) are "
    "pure presentational client components with staggered Framer Motion entrance "
    "animations triggered by parent container variants."
)

pdf.sub_title("2.2 Data Flow")
pdf.body_text(
    "Data flows unidirectionally from Supabase PostgreSQL through the server component "
    "to client components via props:"
)
pdf.code_block(
    "Supabase (PostgreSQL)\n"
    "  -> Server Component: parallel fetch of 5 tables\n"
    "    -> DashboardData type as props\n"
    "      -> HomeClient (tab router)\n"
    "        -> BentoGridSecondDemo / CoursesPage / etc."
)

pdf.sub_title("2.3 Responsive Design")
pdf.body_text(
    "The layout adapts across three breakpoints using Tailwind CSS responsive utilities:"
)

col_w = [40, 60, 60]
pdf.set_font("Helvetica", "B", 10)
pdf.set_fill_color(255, 106, 0)
pdf.set_text_color(255, 255, 255)
pdf.cell(col_w[0], 7, "Breakpoint", fill=True, align="C")
pdf.cell(col_w[1], 7, "Sidebar", fill=True, align="C")
pdf.cell(col_w[2], 7, "Grid Columns", fill=True, align="C")
pdf.ln()

pdf.set_fill_color(245, 245, 245)
pdf.set_text_color(40, 40, 40)
rows = [
    (">1024px (desktop)", "Full sidebar with icons", "3 columns"),
    ("768-1024px (tablet)", "Collapsed icons only", "2 columns"),
    ("<768px (mobile)", "Bottom navigation bar", "1 column"),
]
for i, (a, b, c) in enumerate(rows):
    fill = i % 2 == 0
    pdf.cell(col_w[0], 6.5, a, fill=fill, align="C")
    pdf.cell(col_w[1], 6.5, b, fill=fill, align="C")
    pdf.cell(col_w[2], 6.5, c, fill=fill, align="C")
    pdf.ln()
pdf.ln(5)

# Section 3: Technology Stack
pdf.add_page()
pdf.section_title("3. Technology Stack")

techs = [
    ("Next.js 16", "App Router framework with React Server Components and Turbopack"),
    ("React 19", "Latest stable React with Server Components and Actions"),
    ("TypeScript 5", "Type-safe development with strict mode and discriminated unions"),
    ("Tailwind CSS v4", "Utility-first CSS with CSS-first configuration and custom dark mode variables"),
    ("Framer Motion 12", "Spring-physics and layout animations, staggered children, gesture interactions"),
    ("Supabase", "PostgreSQL database with Row Level Security for real-time dashboard data"),
    ("shadcn/ui 4", "Reusable UI primitives built on Base UI React with CVA variants"),
    ("Lucide React", "Lightweight tree-shakable icon library with stroke-based design"),
]
for name, desc in techs:
    pdf.tech_item(name, desc)
    pdf.ln(2)

# Section 4: Project Structure
pdf.section_title("4. Project Structure")
pdf.body_text("The project follows a clean src-based directory structure:")

structure = [
    "public/ -- Static images (course backgrounds, SVGs)",
    "scripts/seed.mjs -- Database seed script (creates 5 tables + sample data)",
    "src/app/ -- Next.js App Router pages (layout.tsx, page.tsx, globals.css)",
    "src/components/ -- All React components organized by domain (dashboard, courses, assignments, certificates, settings, ui)",
    "src/components/BorderGlow.tsx -- Animated mouse-responsive border glow effect",
    "src/components/ActivityTile.tsx -- Weekly activity bar chart with compute metrics",
    "src/components/HomeClient.tsx -- Client-side tab router and page orchestrator",
    "src/components/Sidebar.tsx -- Desktop sidebar + mobile bottom navigation",
    "src/data/ -- Static mock data for courses, assignments, and certificates",
    "src/lib/ -- Supabase client factory and cn() utility",
    "src/types/ -- TypeScript interfaces for all data models",
]

for s in structure:
    pdf.bullet(s)

# Section 5: Database Schema
pdf.add_page()
pdf.section_title("5. Database Schema")
pdf.body_text(
    "The application uses 5 PostgreSQL tables, all created automatically by the seed script "
    "with Row Level Security enabled and public SELECT policies for anonymous access."
)

schema_tables = [
    ("courses", "id (uuid PK), title (text), progress (int), icon_name (text), created_at (timestamptz)"),
    ("user_stats", "Single row: name, ahead_percent, learning_hours, completed_courses, certificates, streak_days, etc."),
    ("activities", "id (uuid PK), day (text), hours (int), created_at -- 7 rows, one per day of week"),
    ("achievements", "id (uuid PK), title (text), icon (text) -- e.g. '7-Day Streak', 'Top 10% Learner'"),
    ("upcoming_classes", "id (uuid PK), title (text), time (text), duration (text), color (text)"),
]
for name, schema in schema_tables:
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(255, 106, 0)
    pdf.cell(0, 6, name)
    pdf.ln(6)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(40, 40, 40)
    pdf.multi_cell(0, 5, schema)
    pdf.ln(3)

pdf.body_text(
    "All tables use UUID primary keys with gen_random_uuid() defaults. "
    "RLS policies are created with IF NOT EXISTS guards for idempotent seeding."
)

# Section 6: Component Overview
pdf.add_page()
pdf.section_title("6. Component & Page Overview")

pages = [
    ("Dashboard (Home)", "Bento-grid layout with hero section (greeting, stats, progress), streak tracker with day indicators, mini course tiles with animated progress bars, achievements, weekly activity bar chart, and upcoming classes grid. All tiles use staggered Framer Motion entrance animations."),
    ("Courses", "Overview with 4 stat cards (total, in-progress, completed, hours). Course cards show progress, difficulty badges, instructor. Detail view shows full progress bar, module-by-module breakdown, and deadline date."),
    ("Assignments", "Overview with stat cards by status. Cards show course, description, difficulty, estimated hours, days remaining. Detail view has full description, score visualization (if graded), overdue warning, and submit button."),
    ("Certificates", "Overview with stat cards. Certificate cards show grade badge, instructor, issue date, credential ID. Detail view has grade bar, dates, and time spent."),
    ("Settings", "Profile section with avatar. Notification toggles (email digest, reminders, course updates, reports). Account section with plan, password, 2FA, sessions. Danger zone with account deletion."),
    ("Sidebar", "Desktop: vertical icon bar with tooltip labels, logo, logout, user avatar with online indicator. Active tab has orange glow via layoutId. Mobile: fixed bottom nav bar with 6 tabs."),
    ("BorderGlow", "Reusable animated border glow component responding to mouse proximity. Uses CSS custom properties and conic-gradient masks for a cursor-following highlight effect with configurable colors and intensity."),
]

for name, desc in pages:
    pdf.sub_title(name)
    pdf.body_text(desc)

# Section 7: Setup Instructions
pdf.add_page()
pdf.section_title("7. Setup & Running Instructions")

pdf.sub_title("Prerequisites")
pdf.body_text("Node.js 20+, npm, and a Supabase project (free tier).")

pdf.sub_title("Installation Steps")
steps = [
    "Clone the repository and navigate to the dashboard directory",
    "Run 'npm install' to install all dependencies",
    "Copy .env.example to .env.local and fill in Supabase URL and anon key",
    "Set DB_PASSWORD in .env.local with your Supabase database password",
    "Run 'npm run seed' to create tables and populate sample data",
    "Run 'npm run dev' to start the development server",
    "Open http://localhost:3000 in a browser",
]
for i, step in enumerate(steps, 1):
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(8, 6, f"{i}.")
    pdf.multi_cell(0, 6, step)
    pdf.ln(1)

pdf.sub_title("Environment Variables")
pdf.body_text(
    "NEXT_PUBLIC_SUPABASE_URL: Supabase project URL\n"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY: Public anonymous API key\n"
    "DB_PASSWORD: Supabase database password (used by seed script)\n"
    "DATABASE_URL: Full connection string (alternative to DB_PASSWORD)"
)

pdf.sub_title("Production Build")
pdf.body_text("Run 'npm run build' followed by 'npm start'. Ensure all environment variables are set in the production environment.")

# Section 8: Design Decisions
pdf.add_page()
pdf.section_title("8. Design Decisions & Trade-offs")

decisions = [
    ("Server-side data fetching", "All Supabase queries run in a single server component Promise.all, avoiding client-side data fetching overhead and waterfall requests. Trade-off: data is fetched on every navigation (no client cache) -- a SWR/React Query layer could be added for caching."),
    ("Framer Motion for animations", "Chosen over CSS animations for spring-physics support, layoutId transitions, and staggered children. All animations use transform/opacity only to avoid layout repaints. Trade-off: ~30KB client bundle addition."),
    ("Custom BorderGlow component", "Built with CSS custom properties and conic-gradient masks instead of a library. Provides mouse-responsive edge glow with zero JS animation overhead during idle. Trade-off: CSS complexity and mask-composite browser support."),
    ("Dark mode only", "Deep near-black backgrounds (#000000, #111111) with orange accent for a premium, futuristic feel. Trade-off: no light mode toggle -- adding one means duplicating all CSS variable definitions."),
    ("Static data for sub-pages", "While the dashboard fetches from Supabase, Courses/Assignments/Certificates pages use local TypeScript arrays. This avoids DB dependency for secondary pages while keeping the dashboard real-time. Can be migrated to DB queries."),
    ("Bento grid layout", "CSS Grid with col-span utilities creates the magazine-style layout. Trade-off: tile sizes are fixed at breakpoints -- a fully dynamic layout would need a masonry library."),
]

for i, (title, desc) in enumerate(decisions, 1):
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(255, 106, 0)
    pdf.cell(0, 6, f"{i}. {title}")
    pdf.ln(6)
    pdf.body_text(desc)

# Section 9: Challenges & Solutions
pdf.add_page()
pdf.section_title("9. Challenges & Solutions")

challenges = [
    ("Server/Client Boundary", "Passing Framer Motion animated components from server to client required careful separation. The server component fetches data and passes it as props to a client wrapper, ensuring animations don't break hydration."),
    ("Supabase SSR Setup", "Using @supabase/ssr requires a createServerClient helper with cookie support. The initial implementation used @supabase/supabase-js directly; switching to @supabase/ssr ensured proper cookie-based session handling."),
    ("Staggered Animations", "Coordinating entrance animations across multiple independently-rendered tiles required using Framer Motion's variants with staggerChildren on the grid parent, rather than manual index-based delays scattered across components."),
    ("Responsive Sidebar", "Transitioning from a persistent left sidebar on desktop to a bottom navigation bar on mobile required conditional rendering based on viewport width, combined with AnimatePresence for smooth transitions."),
    ("CSS Border Glow Performance", "The custom border glow uses CSS custom properties and conic-gradient masks. Achieving smooth 60fps mouse tracking while avoiding repaints required isolating all animated properties to compositor-only (opacity and transforms)."),
]

for title, desc in challenges:
    pdf.sub_title(title)
    pdf.body_text(desc)

# Output
output_path = "/mnt/01DCB5F3E4E5D460/Aravind/student-dashboard/dashboard/assessment-report.pdf"
pdf.output(output_path)
print(f"PDF generated successfully: {output_path}")
print(f"Total pages: {pdf.page_no()}")
