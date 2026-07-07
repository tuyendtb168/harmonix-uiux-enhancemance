# Harmonix V2

Version: 2.0

Status: In Design

Author:
Product Team

---

# Project Vision

Harmonix is building the simplest institutional-grade yield platform on Hyperliquid.

The product should make earning yield feel as simple as depositing money into a savings account while maintaining transparency, trust and professional portfolio management.

Unlike traditional DeFi dashboards, Harmonix should minimize cognitive load and remove unnecessary user actions.

---

# Project Goal

Redesign the entire Harmonix application to improve:

- Simplicity
- Trust
- Portfolio visibility
- User retention
- Withdraw experience
- Product scalability

The redesign should be production-ready instead of just a UI concept.

---

# Success Metrics

Primary Metrics

- Higher Deposit Conversion
- Higher TVL
- Better Retention
- Lower Support Requests
- Fewer Failed User Operations

UX Metrics

- Time to first deposit
- Time to understand portfolio
- Time to understand earnings
- Withdraw completion rate
- User satisfaction

---

# Product Position

Harmonix is NOT:

- Trading Platform
- DEX
- Yield Farm Dashboard

Harmonix IS:

Institutional Yield Management Platform

---

# Product Personality

The product should feel:

- Professional
- Premium
- Calm
- Transparent
- Trustworthy
- Simple

Avoid:

- Gaming UI
- Crypto Casino Feeling
- Visual Noise
- Information Overload

---

# Design Inspiration

Primary Inspirations

Spark

- Extremely simple
- Beginner friendly
- Very clean

Maple

- Institutional feeling
- Transparency
- Trust
- Portfolio management

Secondary Inspirations

Coinbase

Stripe Dashboard

Apple Wallet

Linear

---

# Target Users

There are three primary user groups.

## Beginner

Goal

Earn stable yield.

Needs

- Easy deposit
- Easy withdraw
- No protocol knowledge
- Clean interface

Pain Points

- Too much information
- Fear of making mistakes

---

## Experienced DeFi User

Goal

Optimize capital efficiency.

Needs

- APY
- Allocation
- Strategy transparency
- Historical performance

Pain Points

- Lack of analytics
- Hidden risks

---

## Whale

Goal

Manage large positions.

Needs

- Portfolio overview
- Capital allocation
- Trust
- Withdraw confidence
- Notifications

Pain Points

- Unclear portfolio status
- No visibility after depositing
- No withdraw awareness

---

# Product Principles

Everything in the redesign must follow these principles.

---

## Principle 1

Hide Complexity

Users should not need to understand protocol mechanics before investing.

---

## Principle 2

Portfolio First

Users spend much more time managing investments than making deposits.

Portfolio deserves more attention than deposit flow.

---

## Principle 3

Reduce Friction

Every unnecessary click should be questioned.

Examples

Bad

Withdraw

↓

Wait

↓

Redeem

↓

Receive

Good

Withdraw

↓

Processing

↓

Funds automatically arrive

---

## Principle 4

Transparency

Never hide information.

Instead:

Show the right information at the right time.

---

## Principle 5

Institutional UX

Every screen should feel like financial software instead of crypto software.

---

# Navigation

Top Navigation

Home

Earn

Portfolio

Rewards

Learn

Wallet

Settings

---

# Product Structure

Home

↓

Discover opportunities

↓

Earn

↓

Deposit

↓

Portfolio

↓

Rewards

↓

Withdraw

↓

Portfolio

---

# Major Improvements

Compared to Harmonix V1.

## Home

Current

Mostly informational.

New

Landing + Dashboard hybrid.

---

## Earn

Current

Vault listing.

New

Marketplace.

Clear comparisons.

Better vault cards.

---

## Portfolio

Current

Transaction oriented.

New

Portfolio management center.

Performance first.

---

## Withdraw

Current

Request

↓

Wait

↓

Redeem

↓

Receive

New

Request

↓

Processing

↓

Auto Transfer

↓

Notification

↓

History Updated

---

## Rewards

Current

Information page.

New

Retention center.

Campaigns.

Points.

History.

---

# Technology Stack

Frontend

React 19

Vite

TypeScript

TailwindCSS

shadcn/ui

Framer Motion

Lucide Icons

Recharts

Deployment

Vercel

---

# Project Deliverables

This redesign should include:

Complete Design System

Complete Product Specification

Responsive Prototype

Production-quality React Application

Component Library

Developer Handoff Documentation

---

# Development Roadmap

Each task must be completed before the next in the same sprint.
Cross-sprint: Sprint N must be fully done before Sprint N+1 begins.

---

## Sprint 1 — Foundation & Design System

### 1.1 Project Setup
- [ ] Init Vite + React 19 + TypeScript (`npm create vite@latest`)
- [ ] Configure `tsconfig.json` (strict mode, path aliases `@/` → `src/`)
- [ ] Configure ESLint + Prettier
- [ ] Install and configure TailwindCSS v4
- [ ] Install and configure shadcn/ui (init, set theme)
- [ ] Install dependencies: Framer Motion, Recharts, Lucide React, React Router v7, TanStack Query

### 1.2 Design Tokens
*Depends on: 1.1*
- [ ] Write CSS variables into `src/app/globals.css` (colors, radius, shadows)
- [ ] Configure Tailwind to consume CSS variables as semantic tokens
- [ ] Verify dark mode variables
- [ ] Reference: `docs/21_DESIGN_TOKENS.md`

### 1.3 Shared UI Components
*Depends on: 1.2*
- [ ] `Button` — 4 variants, sizes, states → `docs/40_BUTTON.md`
- [ ] `Card` — 4 variants → `docs/41_CARD.md`
- [ ] `StatCard` — metric display → `docs/42_STAT_CARD.md`
- [ ] `Modal` — sizes, animation, focus trap → `docs/44_MODAL.md`
- [ ] `Drawer` — right + bottom variants → `docs/45_DRAWER.md`
- [ ] `Timeline` — step states → `docs/47_TIMELINE.md`
- [ ] `Table` — activity table, mobile collapse → `docs/49_TABLE.md`
- [ ] `EmptyState` — 12 context variants → `docs/50_EMPTY_STATE.md`
- [ ] `Skeleton` — page-level variants → `docs/63_LOADING_EMPTY_SUCCESS.md`
- [ ] `ErrorState` — inline + full-page → `docs/62_ERROR_HANDLING.md`
- [ ] `Badge` / `StatusBadge` — risk levels, statuses
- [ ] `Tooltip` — with glossary support → `docs/77_HELP_AND_EDUCATION.md`

### 1.4 App Layout & Navigation
*Depends on: 1.3*
- [ ] `AppLayout` — Navbar + page slot + Footer
- [ ] `Navbar` — desktop top bar with wallet button, notification bell
- [ ] `BottomNav` — mobile tab bar (Home, Earn, Portfolio, Rewards)
- [ ] `NotificationDrawer` — right drawer shell (content filled in Sprint 3)
- [ ] `WalletDrawer` — wallet panel shell → `docs/73_WALLET_CONNECTION_UX.md`
- [ ] React Router setup — all routes wired in `src/app/router.tsx`
- [ ] TanStack Query provider in `src/app/main.tsx`
- [ ] Reference: `docs/27_PAGE_TEMPLATE.md`

### 1.5 Home Page
*Depends on: 1.4*
- [ ] Hero section — headline, CTA
- [ ] Platform stats row — TVL, Yield Paid, Vaults
- [ ] Recommended Vaults section (static/mock data)
- [ ] Responsive: mobile layout
- [ ] Reference: `docs/30_HOME.md`

---

## Sprint 2 — Earn & Deposit Flow

### 2.1 Vault Card Component
*Depends on: Sprint 1*
- [ ] `VaultCard` — all states (default, hover, position, loading, paused) → `docs/43_VAULT_CARD.md`
- [ ] Risk badge component
- [ ] APY display with sparkline

### 2.2 Earn Page
*Depends on: 2.1*
- [ ] Vault grid — 3/2/1 col responsive
- [ ] Search bar — real-time filter
- [ ] Filter bar — Risk, Asset, Strategy, Status
- [ ] Sort control — APY, TVL, Newest
- [ ] Watchlist toggle on vault cards → `docs/82_SEARCH_AND_DISCOVERY.md`
- [ ] Recently viewed row
- [ ] Empty + loading states
- [ ] Reference: `docs/31_EARN.md`

### 2.3 Vault Detail Page
*Depends on: 2.2*
- [ ] Key metrics row — APY, TVL, Risk, Min Deposit
- [ ] Performance chart (APY history) → `docs/48_CHART.md`
- [ ] Strategy description section
- [ ] Allocation breakdown (donut chart)
- [ ] Risk section
- [ ] Sticky deposit card sidebar (desktop)
- [ ] Sticky deposit CTA bottom bar (mobile)
- [ ] Reference: `docs/32_VAULT_DETAIL.md`

### 2.4 Deposit Modal Flow
*Depends on: 2.3*
- [ ] Step 1: Amount input + balance + quick select
- [ ] Step 2: Review summary
- [ ] Step 2.5: ERC-20 approval (conditional) → `docs/75_DEPOSIT_EDGE_CASES.md`
- [ ] Step 3: Wallet signature waiting
- [ ] Step 4: Processing / on-chain pending
- [ ] Step 5: Success screen (first deposit variant)
- [ ] All error states + retry flows
- [ ] Reference: `docs/33_DEPOSIT.md`

### 2.5 Vault Comparison
*Depends on: 2.2*
- [ ] Compare toggle on vault cards
- [ ] Sticky comparison bar (Earn page)
- [ ] Comparison view page (`/earn/compare`)
- [ ] Row highlighting (best per metric)
- [ ] Reference: `docs/74_VAULT_COMPARISON.md`

---

## Sprint 3 — Portfolio, Withdraw & Notifications

### 3.1 Portfolio Page
*Depends on: Sprint 2*
- [ ] Summary stats row (Total Value, Earnings, Positions, 24h Change)
- [ ] Performance chart — cumulative return → `docs/48_CHART.md`
- [ ] Position cards list
- [ ] Pending withdrawals sidebar widget
- [ ] Rewards sidebar widget
- [ ] Activity table (recent transactions)
- [ ] Empty state (no positions)
- [ ] Reference: `docs/35_PORTFOLIO.md`

### 3.2 Withdraw Modal Flow
*Depends on: 3.1*
- [ ] Step 1: Amount input + position value
- [ ] Step 2: Review + timeline preview
- [ ] Step 3: Wallet signature
- [ ] Step 4: Processing (submitted state)
- [ ] Step 5: Confirmed — auto-transfer notice
- [ ] Pending withdrawal widget in Portfolio
- [ ] All edge cases → `docs/76_WITHDRAW_EDGE_CASES.md`
- [ ] Reference: `docs/34_WITHDRAW.md`

### 3.3 Notification System
*Depends on: 3.1*
- [ ] `NotificationItem` component — 8 types → `docs/46_NOTIFICATION.md`
- [ ] Notification drawer content (bell icon → open drawer)
- [ ] Read / unread state
- [ ] Polling setup (15s interval)
- [ ] Toast notifications (transaction feedback)
- [ ] Reference: `docs/37_NOTIFICATION.md`, `docs/64_NOTIFICATION_SYSTEM.md`

### 3.4 Wallet Connection UX
*Depends on: 1.4*
- [ ] Wallet selection modal (MetaMask, WalletConnect, Coinbase)
- [ ] Network switch flow (wrong network prompt)
- [ ] Wallet panel content (address, ENS, disconnect)
- [ ] Session persistence (silent reconnect)
- [ ] Error states (rejected, timeout, not found)
- [ ] Reference: `docs/73_WALLET_CONNECTION_UX.md`

---

## Sprint 4 — Rewards, Analytics & Polish

### 4.1 Rewards Page
*Depends on: Sprint 3*
- [ ] Points summary card
- [ ] Active campaigns grid
- [ ] Achievements section
- [ ] Reward history table
- [ ] Claims modal flow → `docs/78_REWARDS_CLAIMS_FLOW.md`
- [ ] Reference: `docs/36_REWARDS.md`

### 4.2 Settings Page
*Depends on: Sprint 3*
- [ ] Account section
- [ ] Notifications preferences
- [ ] Display preferences (theme, value display)
- [ ] Support / Help links
- [ ] Reference: `docs/38_SETTINGS.md`

### 4.3 Analytics Dashboard
*Depends on: 4.1*
- [ ] Portfolio analytics tab (`/portfolio/analytics`)
- [ ] Cumulative return chart with benchmark toggle
- [ ] Returns by vault (bar chart + table)
- [ ] Performance metrics table (Sharpe, Max Drawdown)
- [ ] Earnings by month timeline
- [ ] CSV export
- [ ] Reference: `docs/80_ANALYTICS_DASHBOARD.md`

### 4.4 Onboarding & Education
*Depends on: Sprint 3*
- [ ] First-deposit success screen (enhanced)
- [ ] Portfolio tooltip tour (4 steps)
- [ ] Risk acknowledgment modal (high-risk vaults)
- [ ] Glossary tooltips on all key metrics
- [ ] FAQ accordion (Vault Detail + Settings)
- [ ] Reference: `docs/70_ONBOARDING_FLOW.md`, `docs/77_HELP_AND_EDUCATION.md`

### 4.5 Responsive & Mobile Polish
*Depends on: All pages built*
- [ ] Bottom navigation (mobile)
- [ ] All modals → full-screen on mobile
- [ ] Sticky deposit CTA on Vault Detail (mobile)
- [ ] Charts responsive (reduced height, simplified)
- [ ] Filter bar horizontal scroll (mobile)
- [ ] Test: iPhone SE (375px), iPhone 14 Pro (393px), iPad (768px)
- [ ] Reference: `docs/71_RESPONSIVE_AND_MOBILE.md`

### 4.6 Animation Pass
*Depends on: All pages built*
- [ ] Page transitions (fade)
- [ ] Modal open/close animation (fade + scale)
- [ ] Drawer slide animation
- [ ] Skeleton shimmer
- [ ] Deposit/Withdraw success animation (confetti)
- [ ] Count-up animation on portfolio stats
- [ ] `prefers-reduced-motion` respected everywhere
- [ ] Reference: `docs/25_MOTION_SYSTEM.md`

### 4.7 Testing
*Depends on: All features built*
- [ ] Unit tests — hooks (usePortfolio, useDeposit, useWithdraw)
- [ ] Component tests — StatCard, VaultCard, Modal, Timeline
- [ ] Integration tests — Deposit flow, Withdraw flow
- [ ] E2E — Playwright: deposit happy path, withdraw happy path
- [ ] Accessibility audit (axe-core)
- [ ] Reference: `docs/67_TESTING_STRATEGY.md`

### 4.8 Pre-Launch
*Depends on: 4.7*
- [ ] Performance audit — Lighthouse CI score ≥ 80
- [ ] Bundle size check — initial JS < 150kb gzipped
- [ ] Analytics events wired → `docs/61_ANALYTICS_EVENTS.md`
- [ ] Release checklist complete → `docs/68_RELEASE_CHECKLIST.md`
- [ ] Deploy to Vercel (preview → production)

---

# Definition of Done

The project is complete when:

All pages are implemented.

All interactions work.

Responsive design is complete.

The prototype can be deployed to Vercel.

The prototype is visually consistent.

The prototype can be used directly for frontend implementation.
