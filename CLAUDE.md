# CLAUDE.md

Harmonix V2 — Institutional Yield Platform on Hyperliquid.
Full specs in `docs/`. This file is the compact ruleset for every coding session.

---

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server (Vite)
npm run build      # production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run test       # Vitest
```

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| Vite | latest | Build tool (SPA, no SSR) |
| TypeScript | 5.x | Type safety |
| TailwindCSS | 4.x | Styling |
| shadcn/ui | latest | Base UI components |
| Lucide React | latest | Icons |
| Recharts | latest | Charts |
| Framer Motion | latest | Animations |
| React Router | v7 | Routing |
| Vercel | — | Deployment |

No Next.js. No SSR. No ISR. Pure client-side SPA.

---

## Architecture

Feature-based. Every feature is self-contained.

```
src/
  app/                    ← router, providers, main.tsx
  features/
    home/
      components/
      hooks/
      pages/
    earn/
      components/
      hooks/
      pages/
      api/
      types/
    vault/                ← vault detail + deposit + withdraw
      components/
      hooks/
      pages/
      api/
      types/
    portfolio/
      components/
      hooks/
      pages/
      api/
      types/
    rewards/
      components/
      hooks/
      pages/
      api/
    notifications/
      components/
      hooks/
      api/
    wallet/
      components/
      hooks/
    settings/
      components/
      pages/
  shared/
    ui/                   ← shadcn/ui components (Button, Card, Modal...)
    layouts/              ← AppLayout, Navbar, Footer
    hooks/                ← useDebounce, useLocalStorage, useIdle...
    lib/                  ← formatters, cn utility
    api/                  ← base API client
    types/                ← global TypeScript types
  assets/
    icons/
    fonts/
public/
```

**Rule:** Never put a feature's component in `shared/`. If it's only used in one feature, it stays in that feature.

---

## Routing

```
/                   → Home
/earn               → Earn (vault marketplace)
/earn/:vaultId      → Vault Detail
/portfolio          → Portfolio
/rewards            → Rewards
/settings           → Settings
/portfolio/analytics → Analytics Dashboard
/earn/compare       → Vault Comparison
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Component files | PascalCase | `VaultCard.tsx` |
| Hook files | camelCase | `usePortfolio.ts` |
| API files | camelCase + `.api` | `portfolio.api.ts` |
| Type files | camelCase + `.types` | `portfolio.types.ts` |
| Util files | camelCase | `formatCurrency.ts` |
| Page files | PascalCase + `Page` | `PortfolioPage.tsx` |
| CSS/style | kebab-case | not used — Tailwind only |

Component names match file names exactly.

---

## TypeScript Rules

- Strict mode on. No `any`.
- Prefer `interface` for object shapes, `type` for unions/primitives.
- All API responses typed. No implicit `any` from fetch.
- Props interface named `[ComponentName]Props`.
- Export types from `types/` barrel files.

```typescript
// Good
interface VaultCardProps {
  vault: Vault
  onDeposit: (vaultId: string) => void
}

// Bad
const VaultCard = (props: any) => { ... }
```

---

## Component Rules

1. **Use shadcn/ui as base** — never build Button, Input, Dialog, Select from scratch.
2. **One responsibility per component** — if a component does two things, split it.
3. **Composition over config** — prefer `<Card><Chart /></Card>` over `<Card showChart />`.
4. **No business logic in UI components** — move to hooks.
5. **Max file size: ~150 lines** — if longer, extract sub-components.
6. **Icons: Lucide only** — `import { ChevronDown } from 'lucide-react'`.

```typescript
// Good — small, focused
export function StatCard({ label, value, change }: StatCardProps) {
  return (
    <Card className="p-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </Card>
  )
}
```

---

## Styling Rules (TailwindCSS)

- **Never hardcode colors** — use semantic tokens: `text-foreground`, `bg-background`, `border-border`.
- **Never hardcode spacing values** — use Tailwind scale: `p-4`, `gap-6`, `mt-8`.
- Use `cn()` from `shared/lib/utils` for conditional classes.
- Dark mode via `dark:` prefix (CSS variables in `globals.css`).
- No inline `style={{}}` except for dynamic values (e.g., chart colors, animation values).

```typescript
// Good
<div className="flex items-center gap-4 p-6 bg-card rounded-lg border border-border">

// Bad
<div style={{ display: 'flex', padding: '24px', background: '#ffffff' }}>
```

### Spacing Scale Reference

| Token | Value | Use |
|-------|-------|-----|
| `p-4` | 16px | Card inner padding |
| `p-6` | 24px | Card comfortable padding |
| `gap-4` | 16px | Between related items |
| `gap-6` | 24px | Between cards |
| `gap-8` | 32px | Between sections |
| `mt-12` | 48px | Section spacing |

---

## Design Token Rules

All semantic color tokens defined in `globals.css` as CSS variables.

| Semantic Token | Use |
|----------------|-----|
| `text-foreground` | Primary text |
| `text-muted-foreground` | Secondary/label text |
| `bg-background` | Page background |
| `bg-card` | Card background |
| `border-border` | Default borders |
| `text-success` / `bg-success` | Positive values, gains |
| `text-destructive` | Errors, negative values |
| `text-warning` | Processing, pending states |
| `ring-ring` | Focus rings |

Never use raw color values (`text-green-500`, `bg-gray-100`) in components.

---

## Hooks Pattern

```typescript
// Every data hook follows this shape
export function usePortfolio() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['portfolio'],
    queryFn: portfolioApi.getSummary,
    staleTime: 30_000,
  })

  return { portfolio: data, isLoading, error, refetch }
}
```

- Hooks are named after business actions: `usePortfolio`, `useDeposit`, `useVault`.
- Never call `fetch()` directly in components.
- Use TanStack Query (React Query) for server state.
- Use `useState` / `useReducer` for local UI state only.

---

## Three-State Pattern (Required for Every Feature)

Every data-dependent component must handle all three states:

```typescript
function PositionList() {
  const { positions, isLoading, error } = usePortfolio()

  if (isLoading) return <PositionListSkeleton />
  if (error) return <ErrorState message="Could not load positions." onRetry={refetch} />
  if (!positions.length) return <EmptyState context="positions" />

  return <div>{positions.map(p => <PositionCard key={p.id} position={p} />)}</div>
}
```

Never render `null` for loading — always show skeleton.
Skeleton must match the layout of the real content.

---

## Animation Rules (Framer Motion)

```typescript
// Standard enter animation
const fadeInUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: 'easeOut' }
}

// Always respect reduced motion
import { useReducedMotion } from 'framer-motion'
const shouldReduce = useReducedMotion()
```

- Duration tokens: `fast: 150ms`, `base: 200ms`, `slow: 300ms`, `slower: 500ms`.
- Never use animations just for decoration.
- Modal: fade + scale from 0.97. Drawer: slide from right/bottom.
- Skeleton shimmer: CSS animation, not Framer Motion.

---

## Chart Rules (Recharts)

- All charts use `ResponsiveContainer` — never fixed width.
- Colors from design tokens, not hardcoded hex.
- Always handle empty data state before rendering.
- Tooltips styled to match design system.
- See `docs/48_CHART.md` for full spec.

---

## Error Handling

```typescript
// API errors — show inline, not full page crash
try {
  await depositApi.submit(params)
} catch (error) {
  setError(parseApiError(error)) // show in UI
}

// Use ErrorBoundary at feature level, not global
<ErrorBoundary fallback={<FeatureError />}>
  <PortfolioSummary />
</ErrorBoundary>
```

- Never show raw error messages to users.
- Always provide a retry action on error states.
- See `docs/62_ERROR_HANDLING.md` for error message catalog.

---

## Accessibility (Required)

- Every interactive element: keyboard accessible.
- Focus visible on all focusable elements (ring style from design token).
- Icons that convey meaning: `aria-label` required.
- Modals: focus trap + restore on close.
- Loading states: `aria-busy="true"` on container.
- Color is never the sole indicator of meaning.
- Respect `prefers-reduced-motion`.

---

## Key DON'Ts

- No `any` in TypeScript
- No hardcoded hex colors
- No hardcoded pixel values in Tailwind (use scale)
- No `fetch()` in components — use hooks
- No 1000-line files — split at 150 lines
- No SSR, ISR, or server components — pure client SPA
- No multiple Primary buttons in one view
- No empty loading states — always use skeleton
- No modal for full-page content
- No decorative animations

---

## Key Reference Docs

| Topic | Doc |
|-------|-----|
| Design system | `docs/20_DESIGN_SYSTEM.md` |
| Design tokens | `docs/21_DESIGN_TOKENS.md` |
| Component library | `docs/23_COMPONENT_LIBRARY.md` |
| Motion system | `docs/25_MOTION_SYSTEM.md` |
| Accessibility | `docs/26_ACCESSIBILITY.md` |
| Page template | `docs/27_PAGE_TEMPLATE.md` |
| Home page spec | `docs/30_HOME.md` |
| Earn page spec | `docs/31_EARN.md` |
| Vault detail spec | `docs/32_VAULT_DETAIL.md` |
| Deposit flow | `docs/33_DEPOSIT.md` |
| Withdraw flow | `docs/34_WITHDRAW.md` |
| Portfolio spec | `docs/35_PORTFOLIO.md` |
| Error handling | `docs/62_ERROR_HANDLING.md` |
| Loading/empty/success | `docs/63_LOADING_EMPTY_SUCCESS.md` |
| API contracts | `docs/66_API_CONTRACT_GUIDE.md` |
| Testing strategy | `docs/67_TESTING_STRATEGY.md` |
| Performance budget | `docs/81_PERFORMANCE_BUDGET.md` |
