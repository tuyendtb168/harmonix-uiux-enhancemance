# Harmonix V2 — Home Page Specification

Version 5.0 — Updated 2026-06-26

---

## Purpose

Home is the **personal dashboard** for a connected user.

It answers: "What is my money doing right now, and what should I do next?"

Home combines portfolio visibility, curated opportunities, protocol trust signals, actionable alerts, treasury transparency, and community resources — all in one view.

---

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ANNOUNCEMENT BAR (full width, bg-primary)                  │
├──────────────┬──────────────────────────────────────────────┤
│              │  PAGE HEADER (Welcome back + chips + theme)  │
│   SIDEBAR    ├──────────────────────────────────────────────┤
│  (220px,     │  PORTFOLIO OVERVIEW (2-col: value + chart)   │
│   sticky,    ├──────────────────────────────────────────────┤
│   light)     │  RECOMMENDED FOR YOU (2-col vault cards)     │
│              ├──────────────────────────────────────────────┤
│              │  PROTOCOL HEALTH (5-col stat cards)          │
│              ├──────────────────────────────────────────────┤
│              │  ACTION BANNER (2 notification cards)        │
│              ├──────────────────────────────────────────────┤
│              │  TWO-COL: Recent Activity | Earnings+Insights │
│              ├──────────────────────────────────────────────┤
│              │  TREASURY STATS (3-col)                      │
│              ├──────────────────────────────────────────────┤
│              │  COMMUNITY & RESOURCES                       │
│              ├──────────────────────────────────────────────┤
│              │  STICKY BOTTOM CTA                           │
└──────────────┴─────────────────────────────────────────────┘
```

---

## Section 0 — Announcement Bar

Full-width bar above all content.

- Background: `bg-primary` (green)
- Text: `text-primary-foreground`
- Left: announcement copy with emoji
- Right: "Learn more →" link

---

## Section 1 — Page Header

- Left: `h1` "Welcome back 👋" + subtitle
- Right chip row:
  - **Theme toggle** — round button `h-8 w-8`, Moon icon (light mode) / Sun icon (dark mode), toggles via `useTheme()`
  - Points badge (2,450 pts) with Gift icon
  - Network selector (HyperEVM) with chevron
  - Wallet address pill (0x3e...8795, font-mono)

---

## Section 2 — Portfolio Overview (two-column)

Left card (55%):
- "Portfolio Value" label + eye icon
- `$223,450.68` — `text-4xl font-black`
- `+$142.35 (0.06%) today` in `text-success`
- 3-col stats: Net Deposited | Total Earnings | Total PnL (+%)
- Action row: **[View portfolio →] ghost link only** — no Deposit/Withdraw (multi-vault ambiguity)

Right card (45%):
- "Portfolio performance" label + time tabs [1D][7D][30D][90D][ALL]
- Recharts AreaChart — two areas:
  - Portfolio Value (primary stroke, success gradient fill `gradPnlGap`) — rendered first
  - Net Deposited (muted-foreground dashed stroke, `fill="transparent"`) — rendered on top, no fill so PnL band stays visible
- The green shaded zone between the two lines is the visual PnL representation
- Custom tooltip (Recharts `content` prop): shows 3 rows — Portfolio Value / Net Deposited / PnL (computed: portfolioValue − netDeposited, with % of net deposited)
Chart legend row (below chart):
- Green dot · "Portfolio Value" · $223,450.68
- Gray dot · "Net Deposited" · $200,000.00
- Success dot · "PnL" · +$23,450.68 (+11.72%)

---

## Section 3 — Recommended For You

- Heading: "Recommended for you" `text-xl font-bold`
- Subtitle + "View all vaults →" right
- **2-col grid** (`sm:grid-cols-2`)

### Vault card internal layout

```
┌─────────────────────────────────────────┐
│ [Risk badge]                     [↗ link]│
│ [Asset circle] Vault name               │
│               Category                  │
├──────────────────┬──────────────────────┤
│ 18.20%           │ 45% ████ Lending     │
│ APY              │ 35% ███  Funding     │
│                  │ 20% ██   Incentives  │
│ Description text │                      │
├──────────────────┴──────────────────────┤
│ Rewards: [HL][HX][FX]    TVL / Depositors│
├─────────────────────────────────────────┤
│         [Deposit USDC/HYPE]             │
└─────────────────────────────────────────┘
```

**APY + Yield bars** — `grid grid-cols-2`:
- Left col: APY (`text-3xl font-black text-primary`) + label + description below
- Right col: yield breakdown bars (`pr-2` for slight inset) — 3 rows of `pct% | label` + `h-1` progress bar (`bg-muted-foreground/30`)

**Rewards** — inline in bottom stats row, right-aligned:
- `h-5 w-5` circles, `bg-muted border-border` neutral style (placeholder for real partner icons)
- Stacked with `-space-x-1`, tooltip on hover

**Deposit CTA button** — full-width primary, label = `Deposit {token1}/{token2}` per vault

**Per vault data:**
- haUSDC Core: USDC/haUSDC, Rewards: HL+HX, Yield: Lending 45% / Funding 35% / Incentives 20%
- HYPE Yield Vault: HYPE, Rewards: HL+HX+FX, Yield: Funding Rates 50% / Liquidity 30% / Staking 20%

---

## Section 4 — Protocol Health

- 5-col grid (`lg:grid-cols-5`), 2-col on mobile
- Each card has `Info` icon top-right with tooltip explaining the metric
- Metrics: TVL ($148.62M) · Active Depositors (34,251) · Vaults (42) · Audited (7) · Withdraw SLA (≤ 3 days)
- TVL + Depositors cards include MiniSparkline

---

## Section 5 — Action Banner

Two stacked notification cards — **identical structure**, accent color only difference.

### Shared structure
`rounded-2xl border bg-warning/5 border-warning/20 px-5 py-4`

Warm cream/amber tint background — not plain white card. Both cards use the same warm tint.

| Element | Withdrawal | Reward |
|---------|-----------|--------|
| Icon circle | `bg-primary/10 border-primary/20`, Bell | `bg-success/10 border-success/20`, Gift |
| Title | "You have N items needing attention" | "Reward available to claim" |
| Subtitle | type · amount · ETA | "$174.50 USDC in yield bonuses ready" |
| CTA | "View details →" (bordered link) | "Claim now →" (bordered link) → `/rewards?tab=history` |

Both cards: same padding, font sizes, border-radius, CTA style. No chevron navigation.

"Claim now" navigates to `/rewards?tab=history` to open the History tab directly where claimable items are shown.

---

## Section 6 — Two-Column: Activity + Earnings + Insights

Left (55%): Recent Activity — 5 rows, color-coded amounts, "View all →"

Right (45%):
- Earnings Breakdown: `text-2xl text-success` total + donut PieChart + legend
- Insights: 2 rows

---

## Section 7 — Treasury Stats (3-col)

Order: **HYPE bought** → **Net HAR** → **HAR price**

### HYPE bought card
- Value: `1,500 $HYPE` — `text-3xl font-black`
- Progress bar (60 segments): dark → primary → border
- Legend (stacked rows, `space-y-1.5`): `w-14` label + value
  - Amount: 1,500 HYPE
  - Progress: 24%

### Net HAR card
- Value: `15,000,000 $HAR` — `text-3xl font-black`
- Progress bar: primary (bought) → warning (sold) → border
- Legend (stacked rows):
  - Bought: 15,680,000 HAR
  - Sold: 680,000 HAR
  - Progress: 82%

### HAR price card
- Value: `$0.002392` — `text-3xl font-black`
- Full-width "Buy HAR ↗" button (`bg-primary rounded-xl`)
- Metadata: Source — HyperCore | Updated — timestamp

All cards: watermark text (`text-muted-foreground/5`) bottom-right.

---

## Section 8 — Community & Resources

Layout: `lg:grid-cols-[1fr_auto]`

**DefiLlama card** (left, expands):
- Logo + title "DefiLlama" + description
- Status badges: TVL tracked · Rankings live
- External link icon, hover: `border-primary/40 bg-primary/5`
- Links to `https://defillama.com/protocol/harmonix`

**Social icons** (right, compact card):
- 5 icons in `h-9 w-9` rounded circles: X, Telegram, Discord, GitHub, Docs
- All open in new tab
- Neutral style: `border-border bg-background`, hover: `hover:text-foreground hover:border-foreground/30`

---

## Section 9 — Sticky Bottom CTA

`fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border`

Left: gear icon + "Earn more with idle assets" + subtitle
Right: [Deposit USDC] primary button

---

## Sidebar

Always visible on `lg+`. Light theme.

- Logo (H badge + "Harmonix")
- **Total Value Locked** — `$148.62M` + today's change (protocol metric, not personal)
- Main nav: Home / Portfolio / Earn / Rewards / Markets
- Harmonix: Protection Vault / Stake HAR
- Resources: Docs / Blog / Help Center
- Refer & Earn card
- Settings / Log out

Active nav: `bg-primary text-primary-foreground`

---

## Component Map

| Section | File |
|---------|------|
| Full page | `src/features/home/pages/HomePage.tsx` |
| Sidebar | `src/shared/layouts/Sidebar.tsx` |
| AppLayout | `src/shared/layouts/AppLayout.tsx` |
| Theme toggle | `src/shared/context/ThemeContext.tsx` |
| Portfolio data | `src/features/portfolio/hooks/usePortfolio.ts` |

---

## Design Rules

- Section headings: `text-xl font-bold text-foreground`
- Cards: `rounded-2xl border border-border bg-card`
- Notification cards: structurally identical, accent color only difference
- Portfolio value card: "View portfolio →" only — no Deposit/Withdraw
- Yield bars: `bg-muted-foreground/30` — subdued, never primary green
- Rewards circles: neutral `bg-muted` — placeholder for real partner icons
- Protocol Health: `Info` tooltip on every metric card
- Theme toggle: always in PageHeader chip row
- All colors from semantic tokens — no hardcoded hex
