# Harmonix V2

# Analytics Dashboard

Version 2.0

---

# Purpose

This document defines the advanced analytics experience for power users.

The standard Portfolio page (35_PORTFOLIO.md) covers everyday portfolio monitoring.

This document covers deeper analytics: historical performance, strategy breakdown, risk metrics, and comparative analysis.

---

# User Segment

Analytics Dashboard is designed for:

- DeFi power users with large positions
- Users managing multiple vaults
- Users who want to understand strategy performance, not just APY
- Institutional or professional depositors

Not the primary surface for new or casual users.

---

# Entry Point

Portfolio page → "Analytics" tab (alongside "Overview").

Route: `/portfolio/analytics`

Accessible only to connected wallet users with at least one position.

---

# Page Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  Portfolio Analytics                                                  │
│                                                                       │
│  [ Overview ]  [ Analytics ]                    Time: [7d][30d][90d][All] │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────┐  ┌─────────────────┐  ┌──────────────────┐  │
│  │  Total Earnings     │  │  Best Period    │  │  Risk-Adj Return │  │
│  │  $1,240.50          │  │  +3.2% (Feb)    │  │  Sharpe: 2.4     │  │
│  └─────────────────────┘  └─────────────────┘  └──────────────────┘  │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  Cumulative Return Chart                                         │ │
│  │  Shows total portfolio value over time                           │ │
│  │  [line chart, 300px height]                                      │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌────────────────────────────┐  ┌────────────────────────────────┐  │
│  │  Returns by Vault          │  │  Asset Allocation Over Time    │  │
│  └────────────────────────────┘  └────────────────────────────────┘  │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  Performance Metrics Table                                       │ │
│  └──────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

---

# Section 1: Summary Metrics

Three stat cards at the top.

---

## Total Earnings

Total yield earned across all vaults, all time (or selected period).

Display: Dollar value, green.

Sub-value: "+X.XX% total return"

---

## Best Period

The calendar month with highest earnings.

Display: "+3.2% in February 2024"

If multiple vaults: shows best-performing vault during that period.

---

## Risk-Adjusted Return (Sharpe Ratio)

Sharpe Ratio for the portfolio over the selected period.

Tooltip: "Sharpe Ratio measures return per unit of risk. Higher is better. A ratio above 1.0 is considered good."

Display: Numeric (2 decimal places).

Color: Green if > 1.0, Yellow if 0.5–1.0, Red if < 0.5.

---

# Section 2: Cumulative Return Chart

Full-width line chart.

---

## Y-Axis

Shows portfolio value in USD.

Shows percentage return as secondary axis (right side).

---

## Time Periods

Selector: 7d / 30d / 90d / 1y / All

Default: 30d.

---

## Chart Features

Hover tooltip: date + portfolio value + % change from start of period.

Reference line: initial investment value (horizontal dashed line).

Area below the line: light tint matching brand color.

If multiple vaults: show total portfolio line only (no per-vault lines — too cluttered).

Per-vault breakdown is in Section 3.

---

## Benchmark Comparison (Optional)

Toggle to overlay a benchmark:

"vs. Holding USDC" — flat line at 0% (shows yield earned above holding stablecoin).

"vs. ETH Price" — shows if vault outperformed simple ETH hold.

Default: off. User can enable.

---

# Section 3: Returns by Vault

Two-column section.

---

## Left: Vault Returns Bar Chart

Horizontal bar chart.

Each bar = one vault.

Bar length = total return (%) for selected period.

Bars sorted by return (highest first).

```
Delta Neutral USDC  ████████████████ +9.3%
ETH Yield Max       ██████████████   +7.8%
BTC Bull Run        ████████         +4.1%
```

Color: green for positive, red for negative (rare but possible).

---

## Right: Vault Performance Table

| Vault | Deposited | Current Value | Return ($) | Return (%) | Since |
|-------|-----------|---------------|------------|------------|-------|
| Delta Neutral USDC | $10,000 | $10,930 | +$930 | +9.3% | Jan 5 |
| ETH Yield Max | $5,000 | $5,390 | +$390 | +7.8% | Jan 12 |

Sortable by each column.

"Since" = deposit date.

---

# Section 4: Asset Allocation Over Time

Stacked area chart.

Shows how the distribution of assets (USDC, ETH, BTC) has changed over time as user deposited/withdrew.

---

## Example

```
100% │ ░░░░░░░░░░░░░░░░░░░░░░░░
 80% │ ░░░░░░░░░░ USDC ░░░░░░░░░░
 60% │ ░░░░░░░░░░░░░░░░░░░░░░░░░░
 40% │ ▓▓▓▓▓▓▓▓▓▓ ETH ▓▓▓▓▓▓▓▓▓▓
 20% │ ████████████ BTC ████████
     └──────────────────────────
     Jan   Feb   Mar   Apr
```

Useful for users managing diversified positions.

For V2 (USDC only): chart shows a flat 100% USDC line — still renders correctly.

---

# Section 5: Performance Metrics Table

Advanced metrics table.

One row per vault, plus a "Portfolio Total" summary row.

---

## Columns

| Column | Description |
|--------|-------------|
| Vault | Vault name + asset icon |
| Avg APY | Average APY during holding period |
| Realized Yield | Actual yield earned (USD) |
| Days Active | How long the position has been active |
| Max Drawdown | Deepest loss during holding period |
| Sharpe | Risk-adjusted return for this vault |
| Volatility | Standard deviation of daily returns |

---

## Table Footer: Portfolio Total Row

Summarizes all vaults:

| Total | — | $1,240 | — | -0.8% (worst vault) | 2.4 | — |

---

# Earnings Timeline

Below the metrics table:

A detailed earnings log by month.

```
Earnings by Month

Feb 2024    +$182.40    (+1.8%)
Jan 2024    +$156.80    (+1.6%)
Dec 2023    +$120.10    (+1.2%)
```

Toggle to show earnings by vault per month (expanded view).

---

# Export

"Export Data" button at top of analytics page.

Exports CSV with:

- Date
- Vault
- Action (Deposit / Yield / Withdrawal)
- Amount (USD and token)
- Running total

Use case: tax reporting, personal accounting.

---

# Empty State

If user has no positions:

```
No analytics data yet.

Once you deposit into a vault and earn yield,
your performance data will appear here.

[ Browse Vaults ]
```

If user has positions but less than 7 days of data:

"Not enough history yet. Check back after your first week."

---

# Loading State

Charts load with skeleton placeholders.

Metrics load with skeleton stat cards.

If API is slow: show "Loading your performance data..." below skeletons.

No blank white space during loading.

---

# Mobile Analytics

Full analytics dashboard is a desktop-first experience.

On mobile:

- Summary stat cards: stacked, full width
- Cumulative Return Chart: 220px height, simplified tooltip
- Returns by Vault: table collapses to card rows (like `49_TABLE.md`)
- Asset Allocation chart: hidden on mobile (too complex at small width)
- Performance metrics table: shows only top 3 columns (Vault, Return %, Avg APY), with "See more" expandable row

---

# Accessibility

All charts must have:

- `aria-label` on the chart container
- Data table alternative (hidden visually, visible to screen readers)
- Color-independent indicators (don't rely only on green/red)

Sharpe ratio tooltip on focus (keyboard users).

---

# Analytics Anti-Patterns

Do not show analytics to users who have never deposited — empty data looks like product failure.

Do not show "Sharpe Ratio" without a tooltip — most users don't know it.

Do not use red color for drawdown without context — users panic. Always pair with "within expected range" or "industry average" context.

Do not show daily data for users with less than 7 days — too noisy, misleading.

---

# Final Analytics Principle

Power users don't just want returns.

They want to understand how those returns were generated.

The analytics dashboard is how Harmonix builds credibility with sophisticated investors.

A user who understands their strategy is a user who recommends it.

Show the work.

Show the risk.

Show the edge.
