# Harmonix V2

# Vault Detail Page Specification

Version 2.0

---

# Purpose

Vault Detail is the investment decision page.

Vault Detail answers one question:

"Should I trust this vault with my money?"

Users arrive here after selecting a vault from Earn.

They are evaluating — not yet committed.

---

# Primary Intent

Build confidence before investing.

Provide enough transparency to make an informed decision.

Guide toward a deposit.

---

# Route

`/earn/:vaultId`

Example: `/earn/delta-neutral-usdc`

---

# Page Layout

```
┌──────────────────────────────────────────────────────┐
│                   TOP NAVIGATION                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ← Back to Vaults                                   │
│                                                      │
│  VAULT HEADER                                        │
│  [Logo] Vault Name    Asset    Risk Badge            │
│  Strategy summary (one line)                         │
│                                                      │
├─────────────────────────────┬────────────────────────┤
│                             │                        │
│  PRIMARY CONTENT (8 cols)   │  SIDEBAR (4 cols)      │
│                             │                        │
│  ┌─────────────────────┐   │  ┌──────────────────┐  │
│  │  KEY METRICS (4)    │   │  │  DEPOSIT CARD    │  │
│  └─────────────────────┘   │  │                  │  │
│                             │  │  Current APY     │  │
│  ┌─────────────────────┐   │  │  Your Balance    │  │
│  │  PERFORMANCE CHART  │   │  │  [Deposit Btn]   │  │
│  └─────────────────────┘   │  └──────────────────┘  │
│                             │                        │
│  ┌─────────────────────┐   │  ┌──────────────────┐  │
│  │  STRATEGY           │   │  │  YOUR POSITION   │  │
│  └─────────────────────┘   │  │  (if invested)   │  │
│                             │  └──────────────────┘  │
│  ┌─────────────────────┐   │                        │
│  │  ALLOCATION         │   │                        │
│  └─────────────────────┘   │                        │
│                             │                        │
│  ┌─────────────────────┐   │                        │
│  │  RISK INFO          │   │                        │
│  └─────────────────────┘   │                        │
│                             │                        │
│  ┌─────────────────────┐   │                        │
│  │  HISTORY (APY)      │   │                        │
│  └─────────────────────┘   │                        │
│                             │                        │
│  ┌─────────────────────┐   │                        │
│  │  TECHNICAL DETAILS  │   │                        │
│  │  (collapsed)        │   │                        │
│  └─────────────────────┘   │                        │
│                             │                        │
└─────────────────────────────┴────────────────────────┘
```

---

# Vault Header

## Content

Vault logo / icon

Vault name (H1)

Asset badge (USDC / ETH / etc.)

Risk level badge (Low / Medium / High)

One-line strategy summary

---

# Section 1: Key Metrics (4 stats)

| Metric | Description |
|--------|-------------|
| Current APY | Live annual percentage yield |
| Total Value Locked | Total assets in this vault |
| Capacity | Remaining deposit capacity |
| Inception Date | When the vault launched |

---

# Section 2: Performance Chart

## Purpose

Show historical APY and portfolio growth over time.

---

## Chart Type

Line chart.

---

## Time Filters

7D / 30D / 90D / All Time

---

## Data Series

APY over time

Optional: TVL over time (secondary axis)

---

## Rules

Chart is the main visual of the page.

Must be readable without color.

Tooltips show exact values on hover.

Lazy loads — does not block above-fold content.

---

# Section 3: Strategy

## Purpose

Explain how yield is generated.

---

## Content

Strategy name

Strategy description (2–4 sentences)

Protocols used (list with logos)

How risk is managed

---

## Rules

Plain language only.

No blockchain jargon in the main description.

Technical protocol names are acceptable here (context is appropriate).

---

# Section 4: Allocation

## Purpose

Show how capital is distributed across strategies or protocols.

---

## Content

Donut chart + legend

Each slice labeled with protocol name and percentage

---

## Rules

Maximum 6 allocation segments (group smaller into "Other").

Legend always visible alongside chart.

---

# Section 5: Risk Information

## Purpose

Communicate risk honestly and clearly.

---

## Content

Risk level (badge + description)

Risk factors (bulleted list)

What could cause loss

How the strategy manages risk

---

## Rules

Never downplay risk.

Never hide risk behind technical language.

Users should feel informed, not alarmed.

---

# Section 6: Historical APY Table

## Purpose

Show APY performance over historical periods.

---

## Content

| Period | APY |
|--------|-----|
| 7 Days | 12.4% |
| 30 Days | 11.8% |
| 90 Days | 12.1% |
| All Time | 11.6% |

---

## Rules

Simple table — no complex charts here.

Periods should be consistent across all vaults.

---

# Section 7: Technical Details (Collapsed)

## Purpose

Provide advanced information for experienced users without overwhelming others.

---

## Content (collapsed by default)

Smart contract address (with explorer link)

Underlying protocol addresses

Vault type (ERC-4626 etc.)

Supported assets

Minimum deposit

Withdrawal processing time

---

## Rules

Collapsed by default using accordion.

Label: "Technical Details"

Never appears in the primary view.

---

# Sidebar: Deposit Card

Always sticky on desktop while scrolling.

---

## Content (Not Invested)

Current APY: 12.4%

Your Wallet Balance: X USDC

Minimum Deposit: 100 USDC

Primary CTA: "Deposit" → opens Deposit Modal

---

## Content (Has Position)

Current APY: 12.4%

Your Position: $5,000

Total Earned: $124.50

Primary CTA: "Deposit More"

Secondary CTA: "Withdraw" → opens Withdraw Modal

---

## Rules

Deposit CTA is always visible.

Never hide the deposit action behind a scroll.

Sidebar stacks below main content on mobile.

---

# Sidebar: Your Position Card (Conditional)

Visible only when user has an active position.

---

## Content

Current Value

Total Deposited

Total Earned

Current APY

---

# Navigation from Vault Detail

| Destination | Trigger |
|-------------|---------|
| /earn | "← Back to Vaults" |
| Deposit Modal | "Deposit" button |
| Withdraw Modal | "Withdraw" button |

---

# State: Not Connected

Show all vault information.

Deposit button opens wallet connection flow.

Sidebar shows "Connect Wallet to Deposit."

---

# State: Connected, Not Invested

Show all vault information.

Sidebar shows deposit card with wallet balance.

---

# State: Connected, Invested

Show all vault information.

Sidebar shows both deposit card and position card.

---

# Loading State

Vault header loads immediately (static).

Key metrics: skeleton (4 stat placeholders).

Chart: skeleton (large area).

Strategy/Risk: skeleton (text lines).

Sidebar: skeleton.

---

# Success Criteria

User understands the strategy within 60 seconds.

User feels confident enough to deposit.

User can find the deposit action without scrolling on desktop.

---

# Failure States

User leaves because strategy is unclear.

User cannot find the deposit button.

User feels uncertain about risk.

---

# Final Vault Detail Principle

Information builds confidence.

But too much information destroys it.

Vault Detail shows exactly what users need to make a decision.

Nothing more.

Nothing less.
