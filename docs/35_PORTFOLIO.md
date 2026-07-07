# Harmonix V2

# Portfolio Page Specification

Version 2.0

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

Track pending withdrawals.

Access all management actions.

---

# Route

`/portfolio`

---

# Page Layout

```
┌────────────────────────────────────────────────────────┐
│                    TOP NAVIGATION                       │
├────────────────────────────────────────────────────────┤
│                                                        │
│  PAGE HEADER                                           │
│  "Your Portfolio"                                      │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  PORTFOLIO SUMMARY (4 key metrics)                     │
│                                                        │
├──────────────────────────┬─────────────────────────────┤
│                          │                             │
│  PRIMARY (8 cols)        │  SIDEBAR (4 cols)           │
│                          │                             │
│  PERFORMANCE CHART       │  QUICK STATS CARD           │
│                          │                             │
├──────────────────────────┤  PENDING WITHDRAWALS        │
│                          │  (if any)                   │
│  ACTIVE POSITIONS        │                             │
│                          │  REWARDS SUMMARY            │
├──────────────────────────┤                             │
│                          │                             │
│  RECENT ACTIVITY         │                             │
│                          │                             │
├──────────────────────────┴─────────────────────────────┤
│                   FOOTER                               │
└────────────────────────────────────────────────────────┘
```

---

# Section 1: Portfolio Summary

## Purpose

Give users their financial snapshot within 5 seconds.

---

## Metrics (4 stat cards)

| Metric | Description |
|--------|-------------|
| Portfolio Value | Total current value of all positions |
| Total Earnings | Cumulative yield earned |
| Current APY | Weighted average APY across positions |
| Pending Withdrawals | Total amount in withdrawal processing |

---

## Design Rules

Portfolio Value is the dominant number — largest font size.

All four metrics visible without scrolling.

Use count-up animation when values load.

Values update in real time if possible.

---

# Section 2: Performance Chart

## Purpose

Visualize portfolio growth over time.

---

## Chart Type

Line chart (area fill).

---

## Time Filters

7D / 30D / 90D / All Time

---

## Data Series

Portfolio Value over time.

Optional overlay: Total Deposited (to show earnings gap).

---

## Rules

Chart is the main visual anchoring the page.

Lazy loads — does not block summary metrics.

Empty state when user has no history yet.

---

# Section 3: Active Positions

## Purpose

Show all current investments.

---

## Section Header

"Your Positions"

Action: None (all positions always visible)

---

## Position Card Content

For each active position:

Vault Name + logo

Asset type

Your Value (current)

Total Deposited

Earnings (value + %)

Current APY

---

## Position Card Actions

Primary: "Withdraw" → opens Withdraw modal

Secondary: "Deposit More" → opens Deposit modal

Tertiary: "View Vault" → navigates to /earn/:vault

---

## Position Card States

Active — standard display

Processing — deposit or withdraw in progress (show mini timeline)

---

## Empty State

When user has no positions:

"You haven't invested in any vaults yet."

"Explore available vaults to start earning yield."

CTA: "Explore Vaults" → /earn

---

# Section 4: Recent Activity

## Purpose

Chronological record of important events.

---

## Section Header

"Recent Activity"

Action: "View All" → expands or navigates to full history

---

## Activity Item Content

Icon (deposit / withdraw / reward)

Description: "Deposited 5,000 USDC into Delta Neutral USDC"

Timestamp: relative ("2 days ago") or absolute

Status badge

---

## Activity Types

Deposited

Withdrawal Requested

Withdrawal Completed

Reward Claimed

Campaign Joined

---

## Display Limit

Show last 5 items by default.

"View All" expands or shows paginated full history.

---

## Empty State

"Your activity will appear here after your first deposit."

---

# Sidebar: Quick Stats

## Content

Number of Active Positions

Highest APY Position (vault name + APY)

Best Performing Position (vault name + earnings %)

---

# Sidebar: Pending Withdrawals

Visible only when pending withdrawals exist.

---

## Purpose

Always show users where their money is.

Never let pending funds feel "missing."

---

## Content

For each pending withdrawal:

Vault Name

Amount

Current Status (badge)

Timeline mini-component:

● Requested
│
● Processing
│
○ Transferred

Estimated Completion: "~2 days remaining"

---

## Rules

This section is never hidden, even when Portfolio shows other content.

Pending withdrawals are part of the user's total assets.

---

## Empty State

When no pending withdrawals: this section is hidden entirely.

---

# Sidebar: Rewards Summary

## Content

Total Points (cumulative)

Points from Harmonix + Points from Partners (split display)

CTA: "View Rewards" → /rewards

---

## Rules

Compact display — not the full rewards page.

Rewards are secondary to portfolio.

---

## Reward Available to Claim Banner

When the user has claimable rewards, a notification banner appears in the portfolio page:

- Icon: Gift (success color)
- Title: "Reward available to claim"
- Subtitle: Amount ready (e.g. "$174.50 USDC in yield bonuses ready")
- CTA: "Claim now →" → `/rewards?tab=history`

"Claim now" navigates to `/rewards?tab=history` to open the History tab directly where claimable items are shown with their Claimable status badges.

---

# Allocation Section (Optional)

A donut chart showing capital allocation across vaults.

---

## Content

Donut chart with vault breakdown.

Legend showing vault name + % + value.

---

## Rules

Only visible when user has 2+ positions.

Hidden for single-position portfolios.

---

# Page State: Not Connected

Show a connection prompt instead of portfolio data.

Message: "Connect your wallet to view your portfolio."

CTA: "Connect Wallet"

---

# Page State: Connected, No Investments

Show empty states for all sections.

Prominent CTA: "Explore Vaults" → /earn

Portfolio summary shows all zeros.

---

# Page State: Connected, Has Investments

Full portfolio view as specified above.

---

# Loading State

Portfolio summary: skeleton (4 stat placeholders) — loads first.

Chart: skeleton (large area).

Positions: skeleton (2–3 card placeholders).

Activity: skeleton (5 row placeholders).

Sidebar: skeleton.

Portfolio summary should feel near-instant (priority load).

---

# Real-Time Updates

Portfolio Value updates when:

New deposit completes.

Withdrawal completes.

Yield accrues (periodic refresh).

Use subtle animation for value changes (count-up).

---

# Success Criteria

User understands portfolio status within 5 seconds.

User can find any pending withdrawal immediately.

User can deposit more or withdraw from any position in 2 clicks.

User never wonders "where is my money."

---

# Failure States

User asks support: "Where is my money?"

User cannot find their pending withdrawal.

User sees outdated portfolio values.

User cannot take action on a position.

---

# Final Portfolio Principle

Portfolio is where Harmonix earns long-term trust.

Every visit should make users feel:

"My money is working."

"I know exactly what is happening."

"I am in control."

The portfolio is not a report.

It is a confidence system.
