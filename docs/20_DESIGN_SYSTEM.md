# Harmonix V2 — Design System

Version 5.0 — Updated 2026-06-26

---

## Purpose

This document defines the visual language of Harmonix.

The objective is not to create beautiful screens.

The objective is to create **trust**.

Every design decision reinforces three qualities:

- Professional
- Calm
- Transparent

Users should feel they are managing wealth, not playing a crypto game.

---

## Brand Personality

Harmonix should feel like:

✓ Modern private banking  
✓ Institutional finance  
✓ Premium SaaS (Stripe, Linear)  
✓ Apple Wallet  

It should NOT feel like:

✗ Trading terminal  
✗ Yield farm  
✗ Meme coin dashboard  
✗ Gaming interface  

---

## Theme

**Default: Light mode.**

- Background: `hsl(0 0% 98%)` — near-white
- Card: `hsl(0 0% 100%)` — pure white
- Foreground: `hsl(220 22% 8%)` — near-black
- Primary: `hsl(142 48% 45%)` — Harmonix green
- Primary foreground: `hsl(0 0% 100%)` — white

Dark mode available via toggle. Light is canonical.

Sidebar is **always light** — same tokens as main content.

### Theme toggle

Round button `h-8 w-8` in PageHeader chip row.
- Light mode → shows Moon icon
- Dark mode → shows Sun icon
- Implemented via `useTheme()` from `ThemeContext`
- Style: `border-border bg-card`, hover: `hover:bg-accent`

---

## Color Tokens

| Token | Light value | Use |
|-------|------------|-----|
| `text-foreground` | Near-black | Primary text, headings, numbers |
| `text-muted-foreground` | Medium gray | Labels, subtitles, metadata |
| `bg-background` | Off-white | Page background |
| `bg-card` | Pure white | All card surfaces |
| `border-border` | Light gray | Card borders, dividers |
| `text-primary` / `bg-primary` | Green `hsl(142 48% 45%)` | Brand accent, active states, CTAs |
| `text-primary-foreground` | White | Text on primary backgrounds |
| `text-success` / `bg-success` | Green | Positive values, gains, low risk |
| `text-destructive` | Red | Errors, losses, high risk |
| `text-warning` / `bg-warning` | Amber | Medium risk, processing, pending |
| `ring-ring` | Green | Focus rings |

**Rules:**
- Never hardcode hex or hsl values in components
- Never use Tailwind raw color classes (`text-green-500`, `bg-gray-100`)
- Use `cn()` from `@/shared/lib/utils` for conditional classes

---

## Layout

### Sidebar layout (desktop lg+)

```
┌─ Sidebar 220px ─┬─ Main content (full width) ───┐
│                 │                               │
│  Logo           │  px-6 py-6                    │
│  TVL summary    │  no max-width cap             │
│  Main nav       │                               │
│  Harmonix nav   │                               │
│  Resources      │                               │
│  Refer & Earn   │                               │
│  Settings/Logout│                               │
└─────────────────┴───────────────────────────────┘
```

- Sidebar: `w-[220px] sticky top-0 h-screen border-r border-border bg-background`
- Main: `flex-1 w-full min-w-0` — no max-width cap
- Mobile: sidebar hidden, top Navbar + BottomNav

### Sidebar metric

Shows **Total Value Locked** (protocol-level, `$148.62M`) — not personal portfolio. Reinforces institutional scale without requiring wallet connection.

### Grid

| Context | Value |
|---------|-------|
| Page padding | `px-6 py-6` |
| Card gap | `gap-4` |
| Section gap | `space-y-8` |
| Vault cards | `sm:grid-cols-2` |
| Protocol health | `lg:grid-cols-5` |
| Treasury | `lg:grid-cols-3` |
| Community | `lg:grid-cols-[1fr_auto]` |

---

## Typography

| Use | Class |
|-----|-------|
| Page title / hero number | `text-4xl font-black` |
| Section heading | `text-xl font-bold` |
| APY / treasury value | `text-3xl font-black` |
| Card subtitle | `text-sm text-muted-foreground` |
| Stat label | `text-xs text-muted-foreground` |
| Body | `text-sm text-foreground` |
| Small body | `text-xs text-muted-foreground` |
| Mono (address) | `font-mono text-xs` |

Numbers dominate labels — always.

---

## Cards

Standard: `rounded-2xl border border-border bg-card`

No shadow. Border creates separation.

Padding: `p-6` main cards, `p-5` compact, `p-4` tight.

---

## Navigation (Sidebar)

Active: `bg-primary text-primary-foreground rounded-lg`

Section labels: `text-[10px] font-bold text-muted-foreground uppercase tracking-widest`

---

## Buttons

| Variant | Use |
|---------|-----|
| `primary` | Main action — green bg, white text |
| `secondary` | Alternative action |
| `ghost` | Utility links (View portfolio →) |
| `destructive` | Dangerous actions only |

One primary per visual section.

**Deposit CTA** on vault cards uses token-specific label: `Deposit USDC/haUSDC`, `Deposit HYPE`.

---

## Badges (Risk)

| Risk | Color |
|------|-------|
| Low | `bg-success/10 text-success` |
| Medium | `bg-warning/10 text-warning` |
| High | `bg-destructive/10 text-destructive` |

---

## Notification Cards (Paired)

Always come in pairs. Identical structure — only accent color differs.

```
bg-warning/5 border-warning/20 rounded-2xl px-5 py-4
[icon circle h-10 w-10] [text flex-1] [bordered CTA link]
```

Background: warm cream tint `bg-warning/5 border-warning/20` — NOT plain `bg-card`. Applied to both cards for visual consistency.

Icon circle variants:
- Alert: `bg-primary/10 border-primary/20`, icon `text-primary`
- Success: `bg-success/10 border-success/20`, icon `text-success`

CTA link (not Button): `text-sm font-semibold border border-border rounded-lg px-3 py-1.5 hover:bg-accent`

No chevron navigation on notification cards.

---

## Vault Card Layout

Internal grid: `grid grid-cols-2`

Left col: APY hero → APY label → description text  
Right col: yield breakdown bars (`pr-2` inset, `bg-muted-foreground/30` color)

Yield bar style: `h-1 rounded-full bg-muted` track, `bg-muted-foreground/30` fill — subdued, never primary green (avoids competing with Deposit button).

Bottom stats row (after divider):
- Left: TVL · Depositors
- Right: Rewards circles (neutral `bg-muted`, stacked `-space-x-1`, tooltip on hover)

Rewards circles are placeholder style (`bg-muted border-border text-muted-foreground`) — replace with real partner icons when available.

---

## Progress Bars (Treasury)

60 vertical `div` segments, each `flex-1 h-4 rounded-sm`:
- `bg-primary` — bought / filled
- `bg-warning` — sold / ops
- `bg-border` — unfilled

Legend: stacked rows with `space-y-1.5`, label `w-14` fixed width for alignment.

---

## Protocol Health Tooltips

Each of the 5 Protocol Health cards has an `Info` icon (Lucide) top-right.
Uses `<Tooltip content="...">` component pattern (not TooltipTrigger/TooltipContent).

---

## Social / Community Pattern

Social icons: `h-9 w-9 rounded-full border border-border bg-background`  
Hover: `hover:text-foreground hover:border-foreground/30 hover:bg-accent`  
All open `target="_blank" rel="noopener noreferrer"`

External link cards (DefiLlama):  
`border-border bg-card`, hover: `border-primary/40 bg-primary/5`  
Include `ExternalLink` icon right-aligned.

---

## Charts (Recharts)

- Always `ResponsiveContainer` — never fixed width
- Colors from tokens: `hsl(var(--primary))` etc.
- Handle empty data before rendering
- AreaChart: Portfolio value + Net deposited + PnL band
- PieChart/Donut: Earnings breakdown

### PnL band pattern (AreaChart)

To visualize PnL as the gap between two lines without a third line:

1. Render `portfolioValue` Area **first** with success gradient fill (`gradPnlGap`: `hsl(var(--success))` 22% → 3%)
2. Render `netDeposited` Area **on top** with `fill="transparent" fillOpacity={0}` — dashed stroke only, no fill blocking
3. The visible green band between the two lines is the PnL zone

Tooltip: use Recharts `content` prop (custom render function) to show computed PnL row:
- PnL = `portfolioValue − netDeposited`
- PnL % = `(pnl / netDeposited) * 100`
- Display: `+$23,450 (+11.72%)` in `text-success`

Legend row: green dot · "PnL" · `+$X (+Y%)` — always last item, success color.

---

## Animation (Framer Motion)

Standard enter:
```ts
{ initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2, ease: 'easeOut' } }
```

Stagger: `delay: 0.05 * index`

Always `useReducedMotion()` — skip when true.

Skeleton: CSS `animate-pulse`, not Framer Motion.

---

## Sticky Bottom CTA

`fixed bottom-0 left-0 right-0 border-t border-border bg-card z-50`

Left: icon circle + heading + subtitle. Right: primary button.

---

## Announcement Bar

Full-width `bg-primary text-primary-foreground` above page header.

---

## Emotional Goals

1. Confidence — money is safe
2. Clarity — position understood at a glance
3. Progress — earnings visibly growing
4. Control — can act at any time
5. Calm — no urgency, no FOMO

---

## Design Consistency Checklist

- [ ] Numbers dominate labels
- [ ] One primary action per section
- [ ] Skeleton on every loading state
- [ ] Empty states are instructive
- [ ] All colors from semantic tokens
- [ ] Keyboard navigable
- [ ] Reduced motion respected
- [ ] Mobile layout tested
- [ ] Paired notification cards structurally identical
- [ ] Yield bars use subdued `bg-muted-foreground/30`, not primary
- [ ] Rewards circles are neutral (not colored badges)
- [ ] Portfolio value card has no Deposit/Withdraw buttons
- [ ] Theme toggle present in PageHeader
