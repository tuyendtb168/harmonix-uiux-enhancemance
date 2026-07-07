# Harmonix V2

# Vault Card Component Specification

Version 2.0

---

# Purpose

Vault Card is the primary discovery unit in Harmonix.

Every vault is represented by a Vault Card on the Earn page.

Vault Card gives users enough information to evaluate a vault without opening it.

---

# Component Location

`features/earn/components/VaultCard`

Not in shared/ui — Vault Card is a feature-specific component.

---

# Philosophy

Vault Card must answer four questions instantly:

What is this vault?

What yield can I earn?

How risky is it?

How do I invest?

---

# Anatomy

```
┌────────────────────────────────────────────────────┐
│  HEADER                                            │
│  [Logo]  Vault Name              [Risk Badge]      │
│          Asset Badge                               │
├────────────────────────────────────────────────────┤
│                                                    │
│  METRICS ROW                                       │
│  APY             TVL             Strategy          │
│  12.4%           $2.1M           Delta Neutral     │
│                                                    │
├────────────────────────────────────────────────────┤
│  POSITION (conditional)                            │
│  Your Position: $5,000    Earnings: +$124 (2.5%)  │
├────────────────────────────────────────────────────┤
│  FOOTER                                            │
│  [Details]                        [Deposit]        │
└────────────────────────────────────────────────────┘
```

---

# Header Section

## Vault Logo

Size: Avatar Medium (32px)

Fallback: First letter of vault name in a colored circle.

---

## Vault Name

Font: Heading M, semibold.

Truncate at 1 line with ellipsis if name is too long.

---

## Asset Badge

Chip/badge showing the deposit asset.

Examples: USDC, ETH, BTC, HYPE

---

## Risk Badge

Position: top-right corner.

Variants:

Low — Green

Medium — Orange

High — Red

---

# Metrics Row

Three key metrics displayed horizontally.

| Metric | Format | Notes |
|--------|--------|-------|
| APY | 12.4% | Always prominent |
| TVL | $2.1M | Formatted shorthand |
| Strategy | One word / short phrase | e.g., "Delta Neutral", "Basis Trade" |

APY is the most prominent metric — larger font weight.

---

# Position Section (Conditional)

Visible only when user is connected AND has a position in this vault.

---

## Content

Your Position: $5,000 USDC

Earnings: +$124.50 (2.5%)

---

## Rules

Positioned above the footer.

Does not replace vault metrics — it appears in addition.

Earnings shown with change indicator (green, up arrow).

---

# Footer Section

Left: "Details" button → Ghost variant → navigates to /earn/:vault

Right: "Deposit" button → Primary variant → opens Deposit modal

---

## Vault States

### Default

Standard display as above.

---

### Hover

Slight elevation increase.

Background shift.

Cursor: pointer.

---

### My Position

Shows position section.

"Deposit" becomes "Deposit More".

"Withdraw" secondary button appears alongside "Deposit More".

---

### Full Capacity

"Deposit" button disabled with tooltip: "This vault is at capacity."

Badge: "Full" shown in header.

---

### Paused

"Deposit" button disabled.

Badge: "Paused" shown in header (orange/gray).

Tooltip: "Deposits temporarily paused."

---

### Loading

Skeleton for logo, name, metrics row, and footer.

---

# Card Dimensions

Min height: auto (content-driven)

Width: follows grid (4 cols desktop, 6 cols tablet, 12 cols mobile)

Padding: spacing-card (24px)

Border radius: radius-lg

---

# Token Usage

Background: `color-surface`

Border: `color-border`

Shadow (default): `shadow-sm`

Shadow (hover): `shadow-md`

Risk badge colors: semantic tokens

APY value: `font-heading-m`, `font-semibold`, `color-text-primary`

Metric label: `font-caption`, `color-text-secondary`

---

# React Props Interface

```tsx
interface VaultCardProps {
  vault: Vault                  // domain object from 07_DOMAIN_LANGUAGE_AND_MODEL.md
  userPosition?: Position       // optional — user's current position
  onDeposit: (vaultId: string) => void
  onViewDetails: (vaultId: string) => void
  onWithdraw?: (vaultId: string) => void
  loading?: boolean
}
```

---

# Accessibility

Card is interactive — keyboard focusable.

"Details" and "Deposit" are full keyboard-accessible buttons.

Risk badge includes screen reader text: "Risk level: Low"

APY includes aria-label: "Annual percentage yield: 12.4%"

---

# Do Not

Do not show portfolio data (position) without user being connected.

Do not truncate APY values.

Do not mix multiple vaults' data in one card.

Do not make the entire card a single clickable link — use explicit buttons.

---

# Final Vault Card Principle

The Vault Card is the first impression of an investment opportunity.

Within 3 seconds, a user should know:

What it is.

What it pays.

Whether it fits their risk tolerance.

How to start.

If any of these four are unclear, the card has failed.
