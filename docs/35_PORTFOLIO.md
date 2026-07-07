# Harmonix V2

# Portfolio Page Specification

Version 3.0

---

# Purpose

Portfolio is the heart of Harmonix V2.

Portfolio answers one question:

"How is my money doing?"

Portfolio is where users spend most of their time.

Portfolio is NOT a transaction list.

Portfolio is a financial management center.

---

# Primary Intent

Understand financial status at a glance.

Monitor active positions.

Track pending withdrawals and claimable rewards.

Access all management actions.

---

# Route

`/portfolio`

---

# Page Layout

Single-column layout. No sidebar — every section spans the full content width.

```
┌────────────────────────────────────────────────────────┐
│                    TOP NAVIGATION                       │
├────────────────────────────────────────────────────────┤
│  PAGE HEADER — "Portfolio"              [Analytics →]  │
├────────────────────────────────────────────────────────┤
│  COMMAND BAR (5 metrics)                                │
├────────────────────────────────────────────────────────┤
│  NEXT ACTION BANNER (contextual recommendation)         │
├────────────────────────────────────────────────────────┤
│  ATTENTION NOTIFICATIONS                                │
│  (withdrawal in progress / reward available)            │
├────────────────────────────────────────────────────────┤
│  POSITIONS TABLE                                         │
├──────────────────────────┬─────────────────────────────┤
│  PERFORMANCE CHART (2/3)  │  YIELD EARNED BREAKDOWN     │
│                            │  (1/3, donut chart)         │
├────────────────────────────────────────────────────────┤
│  RECENT ACTIVITY TABLE                                   │
├────────────────────────────────────────────────────────┤
│                   FOOTER                                 │
└────────────────────────────────────────────────────────┘
```

Positions is shown before Performance & Allocation — users check "what do I hold" before "how did it trend."

---

# Terminology

Per the PnL PRD (Phase 1 / MVP), this page never uses the label **"PnL"** or **"Net PnL"** in user-facing copy.

| Internal concept | Label shown to user |
|---|---|
| `totalValue - totalDeposited` | **Yield Earned** |
| `totalDeposited` (Total Deposit − Total Withdraw) | **Net Deposited** |

**Yield Earned** always ships with an info tooltip `(i)`:

> "Yield Earned chỉ được tính toán chính xác khi bạn nắm giữ token trực tiếp trong ví cá nhân. Các hoạt động add LP, PT/YT hoặc Lending bên thứ ba sẽ không được phản ánh ở đây."

This disclaimer must appear both on the Command Bar metric and the Positions table column header. See `docs/proposed_pnl_prd.md` for the full staged rollout (Phase 2 handles transfer in/out, Phase 3 handles third-party LP/PT/YT positions via DeBank/Zapper).

---

# Section 1: Command Bar

## Purpose

Give users their financial snapshot within 5 seconds.

## Layout

Total Value is visually separated (left, larger type) from the other 4 metrics (right, grid, evenly spaced) by a vertical divider on desktop, a horizontal divider on mobile.

## Metrics (5 total)

| Metric | Description |
|--------|-------------|
| Total Value | Total current value of all positions. Subtext shows 24h change (`+$142.35 (0.06%) 24h`). |
| Net Deposited | Total Deposit − Total Withdraw. No trend indicator. |
| Yield Earned | `Total Value − Net Deposited`. Shows dollar amount + all-time % + "Since first deposit" caption. Info tooltip required (see Terminology). |
| Portfolio APY | Weighted average APY across positions. |
| Points | Cumulative points + "+N today" delta. Clicking navigates to `/rewards`. |

## Design Rules

Total Value is the dominant number — largest font size, leftmost position.

All five metrics visible without scrolling on desktop.

Points metric is a clickable link (`<Link to="/rewards">`), not just decorative text — hover state changes text color to primary.

---

# Section 2: Next Action Banner

## Purpose

Surface one contextual, high-value recommendation per visit instead of a generic upsell.

## Logic

Priority order, first match wins:

1. **Small portfolio** (`totalValue < $10,000`) → "Boost your yield" — nudge toward the $10k milestone.
2. **Low allocation, high APY** (a position with `sharePercent < 20%` and `currentApy > 10%`) → "Rebalance opportunity" — suggest adding to that position.
3. **Default** → "Earn 2× points this week" — nudge toward the highest-APY vault.

## Content

Icon (contextual: Zap / Star), headline, one-line body copy, single CTA button that opens the Deposit modal for the targeted vault.

---

# Section 3: Attention Notifications

## Purpose

Surface time-sensitive account events without requiring a trip to `/portfolio/analytics` or `/rewards`.

## Content

Two inline banner types, shown when applicable:

**Withdrawal in progress**
- Icon: Bell (primary color)
- Amount, source vault, estimated completion timestamp
- CTA: "View details →"

**Reward available to claim**
- Icon: Gift (success color)
- Claimable amount description (e.g. "$174.50 USDC in yield bonuses ready")
- CTA: "Claim now →" → `/rewards?tab=history`

## Rules

Each banner is independent — shown/hidden based on its own condition, not bundled into a single "N items need attention" summary.

---

# Section 4: Positions Table

## Purpose

Show all current investments with the data needed to decide "add more" or "withdraw."

## Section Header

`Positions (N)` — count reflects live position count.

## Columns (desktop table)

| Column | Content |
|---|---|
| Vault | Vault icon + name + `% of portfolio` |
| Assets | Token badges for each underlying deposit token (e.g. `USDC` `haUSDC`) |
| Value | Current value + `{deposited} in` |
| Yield Earned | Dollar amount + all-time %. Column header carries the info tooltip. |
| APY | Current APY, hidden below `md` breakpoint |
| Actions | Add (icon button), Withdraw, Details |

Points and Risk are **not** shown as table columns — points live in the Command Bar / Rewards page; risk classification was removed from this table.

## Mobile

Positions collapse into stacked cards: header row (icon, name, `% of portfolio`, token badges) + value/yield on the right, a 2-column stat row (APY, Deposited), then action buttons.

## Empty State

When user has no positions:

"You haven't invested in any vaults yet."

"Deposit into a vault to start earning yield and points automatically."

CTA: "Explore Vaults" → `/earn`

---

# Section 5: Performance & Allocation

## Purpose

Visualize portfolio growth over time and show where earnings come from.

## Layout

Two cards side by side, ratio **2:1** (`lg:flex-[2]` chart, `lg:flex-[1]` breakdown), stacked vertically below the `lg` breakpoint.

A single Show/Hide toggle (`BarChart2` icon + label) controls both cards together. **Default: shown.**

## Left card — Portfolio Performance chart

Area chart, two series: Portfolio Value (filled) and Net Deposited (dashed reference line).

Time filters: `1D / 7D / 30D / 90D / ALL`.

Tooltip shows Portfolio, Net Deposited, and Yield Earned (label, not "PnL") for the hovered point.

Legend below the chart repeats the same three values for the latest data point.

## Right card — Yield Earned Breakdown

Donut chart with per-vault yield breakdown + legend (name, dollar amount, % share).

Header: "Yield Earned Breakdown" with an "All time" badge.

Footer link: "View full analytics →" → `/portfolio/analytics`.

## Rules

Chart lazy-loads — does not block the Command Bar or Positions table from rendering.

---

# Section 6: Recent Activity

## Purpose

Chronological record of deposit / withdrawal / auto-redeem events.

## Section Header

"Recent Activity" — "View all →" links to `/portfolio/analytics`.

## Format

Full table (not a simple description list), columns:

| Column | Content |
|---|---|
| (icon) | Action-type icon in a colored tile: deposit (success, down-arrow-in), withdrawal (destructive, up-arrow-out), auto redeem (primary, trending-up) |
| Action | `Deposit` / `Withdrawal` / `Auto Redeem` |
| Vault | Vault name |
| Amount | Signed number, colored to match action type |
| Unit | Token badge (reuses the same token badge component as the Positions table) |
| Timestamp | Absolute datetime (`YYYY-MM-DD HH:mm`) |

## Mobile

Collapses to a row list: icon + action/vault on the left, amount + unit + timestamp stacked on the right.

## Display Limit

Show last 6 items by default. "View all" navigates to full history.

## Empty State

"Your activity will appear here after your first deposit."

---

# Page State: Not Connected

Show a connection prompt instead of portfolio data.

Message: "Connect your wallet to view your portfolio."

CTA: "Connect Wallet"

---

# Page State: Connected, No Investments

Header renders normally; body shows a centered empty state (see Section 4 empty state) with "Explore Vaults" CTA.

---

# Page State: Connected, Has Investments

Full portfolio view as specified above.

---

# Loading State

Single skeleton covers the whole page in this order: header bar → command bar block → banner strip → two stat blocks → position row placeholders.

Never render `null` for loading — always show skeleton, matching the real layout.

---

# Real-Time Updates

Total Value and Yield Earned update when:

- A new deposit completes.
- A withdrawal completes.
- Yield accrues (periodic refresh).

---

# Success Criteria

User understands portfolio status within 5 seconds.

User can find any pending withdrawal immediately.

User can deposit more or withdraw from any position in 2 clicks.

User never wonders "where is my money."

User understands that Yield Earned has a scope limitation (via tooltip) rather than assuming it's a complete PnL figure.

---

# Failure States

User asks support: "Where is my money?"

User cannot find their pending withdrawal.

User sees outdated portfolio values.

User cannot take action on a position.

User mistakes "Yield Earned" for a complete PnL number and is surprised by discrepancies from off-platform DeFi activity (mitigated by the disclaimer tooltip — see `docs/proposed_pnl_prd.md`).

---

# Final Portfolio Principle

Portfolio is where Harmonix earns long-term trust.

Every visit should make users feel:

"My money is working."

"I know exactly what is happening."

"I am in control."

The portfolio is not a report.

It is a confidence system.
