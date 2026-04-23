# Digital Heroes - Full Stack Training Project Plan

> **Project:** Golf Performance, Charity & Draw Platform
> **Tech Stack:** Next.js 16 + TypeScript + shadcn/ui + Supabase + Stripe + Vercel
> **Target:** Modern, emotion-driven UI (not traditional golf aesthetic)

---

## Executive Summary

Build subscription-driven web app combining golf performance tracking, charity fundraising, and monthly draw-based rewards. Users subscribe → enter golf scores → participate in monthly draws → support chosen charities.

---

## Phase Overview

| Phase | Name | Focus | Skills Used |
|-------|------|-------|-------------|
| 1 | Foundation | Project setup, auth, database schema | `gsd:new-project`, `shadcn`, `supabase` |
| 2 | Core UI Components | Design system, shared components | `shadcn`, `tailwind-design-system`, `ui-ux-pro-max` |
| 3 | User Dashboard | Score entry, profile, charity selection | `frontend-design`, `shadcn`, `supabase` |
| 4 | Subscription & Payments | Stripe integration, billing | `supabase` + Stripe API |
| 5 | Draw Engine | Draw logic, prize pools, winner selection | `executing-plans` |
| 6 | Admin Dashboard | User/draw/charity management | `frontend-design`, `shadcn` |
| 7 | Public Pages | Landing, charity directory, marketing | `ui-ux-pro-max`, `frontend-design` |
| 8 | Testing & Deploy | QA checklist, Vercel deployment | `gsd:verify-work` |

---

## Phase 1: Foundation
**Goal:** Project initialized with auth and database schema ready
**Skills:** `gsd:new-project`, `shadcn`, `supabase`

### Tasks

- [ ] **1.1 Initialize Next.js Project**
  - Run `npx shadcn@latest init --defaults`
  - Configure Tailwind v4, TypeScript, App Router
  - Verify build passes

- [ ] **1.2 Install Core shadcn Components**
  ```bash
  npx shadcn@latest add button card input label tabs dialog select table badge avatar
  npx shadcn@latest add sidebar navigation-menu sheet skeleton
  ```

- [ ] **1.3 Set Up Supabase Project**
  - Create new Supabase project (not personal)
  - Get project URL and anon key
  - Install `@supabase/supabase-js`
  - Create `lib/supabase/client.ts` and `lib/supabase/server.ts`

- [ ] **1.4 Configure Environment Variables**
  ```env
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
  STRIPE_SECRET_KEY=
  STRIPE_WEBHOOK_SECRET=
  ```

- [ ] **1.5 Create Database Schema**
  Tables needed:
  - `profiles` (extends auth.users)
  - `subscriptions` (stripe subscription data)
  - `scores` (golf scores, rolling 5)
  - `charities` (charity directory)
  - `draws` (monthly draws)
  - `draw_entries` (user entries per draw)
  - `winners` (verified winners)
  - `prize_pools` (pool calculations)

- [ ] **1.6 Set Up Authentication**
  - Email/password auth with Supabase
  - Protected route middleware
  - Auth context provider
  - Login/signup pages

- [ ] **1.7 Enable RLS Policies**
  - Users can only read/update own profile
  - Scores: users CRUD own, admin sees all
  - Charities: public read, admin write
  - Draws: public read results, admin manage

---

## Phase 2: Core UI Components
**Goal:** Reusable component library with modern, emotion-driven design
**Skills:** `shadcn`, `tailwind-design-system`, `ui-ux-pro-max`

### Tasks

- [ ] **2.1 Create Design Tokens**
  - Color palette (modern, clean - avoid golf clichés)
  - Typography scale
  - Spacing system
  - Border radius, shadows

- [ ] **2.2 Build Layout Components**
  - `AppShell` - main layout with navigation
  - `PageHeader` - consistent page headers
  - `Container` - max-width wrapper
  - `Sidebar` - dashboard navigation

- [ ] **2.3 Build Form Components**
  - `FormField` - wrapper with label, error, hint
  - `ScoreInput` - specialized 1-45 input
  - `DatePicker` - score date selection
  - `PercentageSlider` - charity contribution

- [ ] **2.4 Build Data Display Components**
  - `ScoreCard` - display single score
  - `ScoreList` - list of 5 scores
  - `CharityCard` - charity preview
  - `DrawCard` - draw info/results
  - `StatCard` - dashboard stats

- [ ] **2.5 Build Feedback Components**
  - `EmptyState` - no scores, no entries
  - `LoadingState` - skeleton screens
  - `ErrorState` - error boundaries
  - `SuccessToast` - action confirmations

- [ ] **2.6 Navigation Components**
  - `MainNav` - marketing site nav
  - `DashboardNav` - user dashboard nav
  - `AdminNav` - admin panel nav
  - `MobileMenu` - responsive hamburger

---

## Phase 3: User Dashboard
**Goal:** Complete user-facing dashboard with score management
**Skills:** `frontend-design`, `shadcn`, `supabase`

### Tasks

- [ ] **3.1 Dashboard Layout**
  - Sidebar navigation
  - Main content area
  - Header with user menu
  - Mobile-responsive

- [ ] **3.2 Score Entry System**
  - Form: date picker + score input (1-45)
  - Validation: unique date constraint
  - Auto-replace oldest when 6th score entered
  - Visual feedback on save

- [ ] **3.3 Score History Display**
  - Reverse chronological order
  - Edit/delete individual scores
  - Empty state for new users
  - Score statistics (average, best)

- [ ] **3.4 Charity Selection**
  - Charity directory browse
  - Search and filter
  - Charity detail modal/page
  - Select and set contribution %
  - Show current selection

- [ ] **3.5 Subscription Status Panel**
  - Current plan display
  - Renewal date
  - Cancel subscription button
  - Upgrade/downgrade options

- [ ] **3.6 Winnings Overview**
  - Total won lifetime
  - Current draw status
  - Pending payments
  - Payment history

- [ ] **3.7 User Settings**
  - Profile edit
  - Password change
  - Notification preferences

---

## Phase 4: Subscription & Payments
**Goal:** Working subscription flow with Stripe
**Skills:** `supabase`, Stripe API

### Tasks

- [ ] **4.1 Stripe Setup**
  - Create Stripe account (new)
  - Configure products: Monthly, Yearly
  - Set up webhook endpoint

- [ ] **4.2 Checkout Flow**
  - Pricing page
  - Stripe Checkout integration
  - Success/cancel pages
  - Handle checkout.session.completed

- [ ] **4.3 Subscription Management**
  - Create customer on signup
  - Manage subscriptions in Supabase
  - Webhook handlers for events
  - Graceful cancellation

- [ ] **4.4 Subscription Guard**
  - Middleware to check subscription
  - Redirect to pricing if expired
  - Show renewal warnings

- [ ] **4.5 Charity Contribution Logic**
  - Calculate % of subscription
  - Store with subscription record
  - Display in dashboard

---

## Phase 5: Draw Engine
**Goal:** Automated monthly draws with prize distribution
**Skills:** `executing-plans`

### Tasks

- [ ] **5.1 Draw Data Model**
  - Draws table: month, year, status, numbers
  - Entries table: user, draw, numbers
  - Pool tracking per tier

- [ ] **5.2 Number Generation**
  - Random draw logic (5 numbers, range TBD)
  - Algorithmic option (weighted by scores)
  - Store drawn numbers

- [ ] **5.3 Entry System**
  - Auto-enter users based on scores
  - Score-to-numbers mapping
  - Entry cutoff dates

- [ ] **5.4 Winner Detection**
  - Match entries against drawn numbers
  - 3, 4, 5 match detection
  - Handle multiple winners
  - Jackpot rollover for no 5-match

- [ ] **5.5 Prize Pool Calculation**
  - Fixed % from subscriptions
  - 40%/35%/25% split
  - Track pool amounts

- [ ] **5.6 Admin Draw Controls**
  - Simulation mode
  - Official run button
  - Publish results
  - View match counts

---

## Phase 6: Admin Dashboard
**Goal:** Complete admin panel for platform management
**Skills:** `frontend-design`, `shadcn`

### Tasks

- [ ] **6.1 Admin Authentication**
  - Role-based access (admin role)
  - Admin layout
  - Protect admin routes

- [ ] **6.2 User Management**
  - User list with search
  - Edit user profiles
  - View/edit user scores
  - Manage subscriptions

- [ ] **6.3 Draw Management**
  - Create new draw
  - Configure draw logic
  - Run simulation
  - Publish official results
  - View draw statistics

- [ ] **6.4 Charity Management**
  - Add/edit charities
  - Upload images
  - Feature/hide charities
  - View charity contributions

- [ ] **6.5 Winner Verification**
  - List pending verifications
  - View uploaded proof
  - Approve/reject with notes
  - Mark payouts complete

- [ ] **6.6 Reports & Analytics**
  - User counts over time
  - Total prize pools
  - Charity totals
  - Draw participation rates

---

## Phase 7: Public Pages
**Goal:** Marketing site with modern, emotion-driven design
**Skills:** `ui-ux-pro-max`, `frontend-design`

### Tasks

- [ ] **7.1 Landing Page**
  - Hero section with CTA
  - How it works (3 steps)
  - Featured charities
  - Recent winners (if public)
  - Subscription pricing
  - Modern animations (not golf clichés)

- [ ] **7.2 Charity Directory**
  - Grid/list view
  - Search and filter
  - Charity cards with images
  - Individual charity pages
  - Events listing

- [ ] **7.3 How It Works Page**
  - Step-by-step explanation
  - Score entry demo
  - Draw mechanics
  - Charity impact visualization

- [ ] **7.4 About Page**
  - Platform mission
  - Impact statistics
  - Contact form

- [ ] **7.5 Authentication Pages**
  - Login page
  - Signup page (with charity selection)
  - Password reset
  - Email verification

---

## Phase 8: Testing & Deployment
**Goal:** Production-ready deployment with all tests passing
**Skills:** `gsd:verify-work`

### Tasks

- [ ] **8.1 Testing Checklist**
  - [ ] User signup & login
  - [ ] Subscription flow (monthly/yearly)
  - [ ] Score entry with 5-score rolling logic
  - [ ] Draw system logic and simulation
  - [ ] Charity selection and contribution calculation
  - [ ] Winner verification flow
  - [ ] User dashboard all modules
  - [ ] Admin panel full control
  - [ ] Data accuracy across modules
  - [ ] Responsive design mobile/desktop
  - [ ] Error handling and edge cases

- [ ] **8.2 Vercel Deployment**
  - Create new Vercel account (not personal)
  - Connect GitHub repo
  - Configure environment variables
  - Deploy and verify

- [ ] **8.3 Documentation**
  - README with setup instructions
  - Test credentials
  - Admin credentials
  - API documentation

---

## Skill Mapping Reference

| Skill | Used In Phases | Purpose |
|-------|---------------|---------|
| `gsd:new-project` | Phase 1 | Initialize project structure |
| `shadcn` | All phases | UI component library |
| `supabase` | Phases 1, 3, 4, 5 | Database, auth, storage |
| `tailwind-design-system` | Phases 2, 3, 6, 7 | Styling and design tokens |
| `ui-ux-pro-max` | Phases 2, 7 | UX patterns and design guidance |
| `frontend-design` | Phases 3, 6, 7 | Frontend implementation |
| `executing-plans` | Phase 5 | Complex draw logic implementation |
| `gsd:verify-work` | Phase 8 | Final verification and QA |
| `writing-plans` | Pre-phase | Task breakdown and planning |

---

## Database Schema Overview

```sql
-- Profiles (extends auth.users)
profiles: id, user_id, full_name, avatar_url, role, created_at

-- Subscriptions
subscriptions: id, user_id, stripe_customer_id, stripe_subscription_id, 
               plan_type, status, current_period_end, charity_id, 
               charity_percentage, created_at

-- Scores (rolling 5)
scores: id, user_id, score_value, score_date, created_at

-- Charities
charities: id, name, description, logo_url, website, events, 
           is_featured, is_active, total_contributions, created_at

-- Draws
draws: id, month, year, draw_numbers, draw_type, status, 
       total_pool, jackpot_rollover, created_at, published_at

-- Draw Entries
draw_entries: id, draw_id, user_id, entry_numbers, matches_count, 
              prize_tier, prize_amount, created_at

-- Winners
winners: id, draw_id, user_id, prize_tier, prize_amount, 
         proof_url, verification_status, paid_at, created_at

-- Prize Pools
prize_pools: id, draw_id, tier_5_amount, tier_4_amount, tier_3_amount,
             tier_5_winners, tier_4_winners, tier_3_winners, created_at
```

---

## Key Requirements Checklist

- [ ] Monthly/Yearly subscription plans
- [ ] Stripe payment integration
- [ ] Last 5 golf scores (1-45 Stableford), auto-replace oldest
- [ ] Monthly draws: 3, 4, 5 number matches
- [ ] Prize pool: 40%/35%/25% split with jackpot rollover
- [ ] Charity selection with minimum 10% contribution
- [ ] Winner verification with proof upload
- [ ] User dashboard with all modules
- [ ] Admin panel with full control
- [ ] Modern UI (not traditional golf aesthetic)
- [ ] Mobile-first responsive design
- [ ] JWT/session auth with HTTPS
- [ ] Email notifications
- [ ] Deployed to new Vercel account
- [ ] New Supabase project

---

## Notes

- **Design:** Avoid golf clichés (fairways, plaid, club imagery). Lead with charitable impact.
- **Security:** RLS policies mandatory on all tables. Never expose service_role key.
- **Performance:** Optimize assets, minimal blocking resources.
- **Scalability:** Multi-country ready, mobile app extensible.

---

*Plan created using writing-plans skill. Ready for execution via gsd:execute-phase or subagent-driven-development.*
