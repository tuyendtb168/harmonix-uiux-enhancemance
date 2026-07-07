# Harmonix V2

# Performance Budget

Version 2.0

---

# Purpose

This document defines the performance targets for Harmonix V2.

Performance is a feature, not an afterthought.

A slow DeFi app signals unreliability.

Users who wait for their portfolio to load feel anxious, not confident.

---

# Core Performance Philosophy

Every millisecond of delay increases user anxiety in financial products.

Users do not separate "slow app" from "slow platform."

If the page loads slowly, users wonder if their money is moving slowly too.

---

# Web Vitals Targets

| Metric | Target | Description |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | When the main content is visible |
| FID / INP (Interaction to Next Paint) | < 200ms | Responsiveness to user input |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability — no content jumping |
| TTFB (Time to First Byte) | < 600ms | Server response time |
| FCP (First Contentful Paint) | < 1.8s | When any content appears |

All targets measured at P75 (75th percentile) on mobile, throttled to 4G.

---

# Page-Specific Targets

## Home Page

| State | Target |
|-------|--------|
| FCP | < 1.5s |
| LCP (hero text) | < 2.0s |
| Platform stats loaded | < 3.0s |
| Vault cards visible | < 3.5s |

Hero text and platform stats are above the fold.

Vault cards can load slightly later (below fold).

---

## Earn Page

| State | Target |
|-------|--------|
| FCP | < 1.5s |
| First 6 vault cards rendered | < 2.5s |
| Filter bar interactive | < 2.0s |
| Full vault list (20+ vaults) | < 4.0s |

First 6 vaults are the priority — the rest can lazy load.

---

## Portfolio Page

| State | Target |
|-------|--------|
| Portfolio summary stats | < 2.5s |
| Position cards | < 3.0s |
| Performance chart | < 3.5s |
| Full page settled | < 4.5s |

Summary stats are the highest priority — user wants to see their total value first.

Chart is secondary.

---

## Deposit / Withdraw Modal

| State | Target |
|-------|--------|
| Modal open animation | < 150ms |
| Wallet balance loaded | < 2.0s |
| Gas estimate loaded | < 3.0s |

Modal must feel instant on open. Content can load within the opened modal.

---

# Bundle Size Targets

| Bundle | Target |
|--------|--------|
| Initial JS bundle (gzipped) | < 150kb |
| Total JS (all chunks, gzipped) | < 500kb |
| Total CSS (gzipped) | < 30kb |
| Largest single chunk | < 100kb |

---

## Code Splitting Strategy

Split by route:

- `Home` — own chunk
- `Earn` — own chunk
- `Portfolio` — own chunk
- `Rewards` — own chunk
- `Vault Detail` — own chunk
- `Settings` — own chunk

Heavy dependencies (Recharts, Framer Motion) — lazy loaded.

Deposit and Withdraw modals — lazy loaded (only loaded when user opens them).

---

## Third-Party Budget

| Dependency | Max Size (gzipped) |
|------------|-------------------|
| React + ReactDOM | ~45kb |
| TailwindCSS (purged) | ~10kb |
| Framer Motion | ~30kb |
| Recharts | ~60kb |
| Wallet connectors | ~50kb |
| All other deps | < 50kb |

Regularly audit bundle with `rollup-plugin-visualizer` or equivalent.

---

# Image & Asset Targets

| Asset Type | Target |
|------------|--------|
| Hero images | < 100kb (WebP) |
| Token icons | < 2kb per icon (SVG) |
| Avatar images | < 5kb |
| Total images per page | < 300kb |

All images: WebP format with JPEG/PNG fallback.

Token icons: SVG preferred (scale-independent, tiny).

Lazy load all images below the fold.

---

# API Response Targets

| Endpoint | Target (P95) |
|----------|-------------|
| `/portfolio/summary` | < 800ms |
| `/vaults/list` | < 1000ms |
| `/vault/:id` | < 600ms |
| `/portfolio/positions` | < 800ms |
| `/rewards/summary` | < 600ms |
| `/notifications` | < 400ms |

If API exceeds target: show skeleton UI, not blank space or spinner-only.

---

# Stale Data TTL

How long cached data is considered fresh before re-fetching:

| Data Type | TTL | Notes |
|-----------|-----|-------|
| Vault list | 60 seconds | APYs change, but slowly |
| Vault detail | 30 seconds | More dynamic metrics |
| Portfolio summary | 30 seconds | User checks this frequently |
| Position data | 30 seconds | Yield accrues every few minutes |
| Notifications | 15 seconds | Time-sensitive |
| Platform stats (Home) | 120 seconds | Less critical freshness |
| Rewards summary | 60 seconds | Less time-sensitive |

---

## Cache Strategy

Use stale-while-revalidate:

1. Show cached data immediately (no loading skeleton if cache exists).
2. Fetch fresh data in background.
3. Update display when fresh data arrives.
4. Avoid visible "flash" on update — reconcile smoothly.

Show last-updated timestamp next to highly time-sensitive data (e.g., portfolio value).

---

# Rendering Strategy

Harmonix V2 is a Vite + React 19 SPA — fully client-side rendered.

There is no SSR or ISR. All rendering happens in the browser.

---

## Client-Side Rendering (All Pages)

Every page renders client-side.

Home page: Renders immediately with skeleton placeholders. Platform stats and vault list fetched after mount.

Earn page: Vault list fetched on mount. First 6 cards shown as soon as data arrives.

Portfolio: Wallet-specific data. Fetched after wallet connection.

Rewards / Settings: Client-side only.

Deposit/Withdraw modals: Client-side only.

---

## SEO Approach

Because the app is a wallet-connected DeFi tool, SEO is not a primary concern.

The Home page marketing content (headline, platform stats) is publicly accessible and indexed via static HTML pre-rendered at build time using Vite's `index.html`.

For deeper SEO needs in the future: consider a separate marketing landing page outside the app.

---

# Font Loading

Use `font-display: swap`.

Preload primary font weights (400, 500, 600).

System font fallback while web font loads — no invisible text (FOIT).

Web font: subset to characters used in product (reduce file size).

---

# Performance Monitoring

## Real User Monitoring (RUM)

Collect Core Web Vitals from real users.

Track by page and by connection type.

Alert if P75 LCP exceeds 3.0s.

---

## Synthetic Monitoring

Run Lighthouse CI on every deployment.

Fail deploy if performance score < 80.

Run from simulated 4G mobile.

---

## Bundle Monitoring

Track bundle size changes on every PR.

Alert if initial bundle increases by > 10kb (gzipped).

---

# Performance Anti-Patterns

Never block page render on API data — show skeletons, load data after.

Never import entire libraries — use named imports (`import { LineChart } from 'recharts'`).

Never load all vault data upfront — paginate or virtualize long lists.

Never use synchronous localStorage access in render paths.

Never run heavy calculations on the main thread — use Web Workers for complex portfolio math.

---

# Perceived Performance

Actual performance is what you measure.

Perceived performance is what users feel.

Techniques to improve perceived performance:

- **Optimistic UI**: Show expected result before API confirms.
- **Skeleton screens**: Better than spinners (users see layout, not emptiness).
- **Progressive loading**: Show summary stats before detailed data.
- **Content prioritization**: Load above-the-fold first, below-fold lazily.
- **Preloading**: Preload vault detail on hover over vault card.

---

# Final Performance Principle

Performance is trust.

A user whose portfolio loads in 1 second trusts the platform more than one that waits 5 seconds.

This is not rational.

It is human.

Design for the human, not the spec.

Hit the budgets.
