# Harmonix V2

# Earn Page Specification

Version 2.0

---

# Purpose

Earn is the vault marketplace.

Earn answers one question:

"Which vault is right for me?"

Earn is where users compare investment opportunities and make a decision.

Earn is NOT a portfolio management page.

Earn is NOT where users track their investments.

---

# Primary Intent

Compare vaults.

Evaluate risk and APY.

Select and deposit.

---

# Page Layout

```
┌─────────────────────────────────────────────────────┐
│                  TOP NAVIGATION                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  PAGE HEADER                                        │
│  "Available Vaults"          [Total TVL stat]       │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  SEARCH + FILTER BAR                                │
│  [Search] [Asset Filter] [Risk Filter] [Sort]       │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  FEATURED / RECOMMENDED (optional banner)           │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  VAULT GRID                                         │
│  [ VaultCard ] [ VaultCard ] [ VaultCard ]          │
│  [ VaultCard ] [ VaultCard ] [ VaultCard ]          │
│                                                     │
├─────────────────────────────────────────────────────┤
│                   FOOTER                            │
└─────────────────────────────────────────────────────┘
```

---

# Section 1: Page Header

Title: "Available Vaults"

Subtitle: "Choose a yield strategy that fits your goals."

Right side: Platform stat — Total TVL or number of active vaults.

---

# Section 2: Search + Filter Bar

## Components

Search input: "Search vaults..."

Asset filter: All / USDC / ETH / BTC / HYPE

Risk filter: All / Low / Medium / High

Sort dropdown: Highest APY / Highest TVL / Newest / Alphabetical

---

## Rules

Search filters in real time (no submit needed).

Active filters show a clear visual indicator.

Each filter can be cleared independently.

"Clear All" button appears when any filter is active.

Filter state is preserved during the session (not persisted).

---

# Section 3: Featured Vault (Optional)

A single highlighted vault or campaign banner.

Used to promote a new vault launch or special campaign.

---

## Design Rules

Only one featured section at a time.

Not a permanent section — appears contextually.

Dismissible.

---

# Section 4: Vault Grid

## Layout

Desktop: 3 columns

Tablet: 2 columns

Mobile: 1 column (full width)

---

## Vault Card Content

Each vault card displays:

Vault Name

Asset type and logo

Current APY (prominent)

Risk Level badge

TVL

Strategy summary (one line)

---

## Vault Card Actions

Primary CTA: "Deposit" → opens deposit modal

Secondary CTA: "Details" → navigates to /earn/:vault

---

## Vault Card States

Default

Hover (elevated)

My Position (shows user's current position if invested)

Full Capacity (deposit disabled, shows warning)

Paused (deposit disabled, shows paused badge)

---

## Sorting Default

Default sort: Highest APY

---

## Empty Search State

"No vaults match your filters."

CTA: "Clear Filters"

---

# Vault Card: My Position Indicator

When user is connected and has an active position in this vault:

Show a subtle indicator on the card: "Your Position: $5,000"

Do not replace the vault information with portfolio data.

Vault card remains a discovery card — position data is secondary.

---

# Filters Specification

## Asset Filter Options

All

USDC

ETH

BTC

HYPE

Additional assets added as vaults grow.

---

## Risk Filter Options

All

Low — Conservative strategies, lower APY range

Medium — Balanced strategies

High — Aggressive strategies, higher APY range

---

## Sort Options

Highest APY (default)

Highest TVL

Newest

Alphabetical (A→Z)

---

# Page State: Not Connected

Vault grid is visible and browsable.

Deposit button opens wallet connection flow instead of deposit modal.

---

# Page State: Connected, No Positions

Full vault grid visible.

Vault cards show no position data.

---

# Page State: Connected, Has Positions

Vault cards with existing positions show "Your Position" indicator.

---

# Loading State

Filter bar loads immediately.

Vault cards load with skeleton (6 card placeholders on desktop).

---

# Empty State: No Vaults

When no vaults exist or all are filtered out:

Primary: "No vaults match your search."

CTA: "Clear Filters"

If genuinely no vaults exist: "No vaults are currently available. Check back soon."

---

# Navigation from Earn

| Destination | Trigger |
|-------------|---------|
| /earn/:vault | "Details" on vault card |
| Deposit Modal | "Deposit" on vault card |
| /portfolio | After successful deposit |

---

# Success Criteria

User can find the right vault within 30 seconds.

User understands APY, risk, and strategy without clicking into details.

User reaches deposit in two clicks.

---

# Failure States

User experiences decision paralysis from too many options.

User cannot distinguish between vaults.

User cannot find the deposit action.

---

# Final Earn Principle

Earn should reduce the distance between curiosity and commitment.

The best vault page makes choosing feel easy.

Not because it hides options.

But because it guides users toward the right ones.
