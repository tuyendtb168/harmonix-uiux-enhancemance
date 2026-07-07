# Harmonix V2

# Vault Comparison

Version 2.0

---

# Purpose

This document defines the vault comparison feature in Harmonix V2.

Vault comparison allows users to evaluate multiple vaults side-by-side before deciding where to deposit.

---

# Problem This Solves

Users on the Earn page see multiple vault cards.

Each card shows key metrics, but comparing two vaults requires mental gymnastics:

Read Vault A → remember it → scroll to Vault B → compare in head.

This increases cognitive load and reduces decision confidence.

Vault comparison solves this.

---

# Feature Overview

Users can select up to 3 vaults for simultaneous side-by-side comparison.

A dedicated comparison view renders all selected vaults in aligned columns.

Users can make a deposit directly from the comparison view.

---

# Entry Points

## Entry Point 1: Earn Page Checkboxes

Each vault card on the Earn page gains a "Compare" toggle.

Inactive state: Small "Compare" button in bottom-left of vault card.

Active state: Checkbox checked, card has a highlighted border.

After selecting 2+ vaults: sticky "Compare (2)" button appears at bottom of page.

Clicking "Compare (X)" opens the Comparison View.

---

## Entry Point 2: Vault Detail Page

"Compare with another vault" link at top of page.

Opens Earn page in comparison mode with current vault pre-selected.

---

# Comparison View

## Layout

Full-page view (not a modal).

Route: `/earn/compare?vaults=vault-a,vault-b,vault-c`

Shareable URL — users can share comparisons.

---

## Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  Compare Vaults                                    [ + Add Vault ] │
├──────────────┬──────────────────┬──────────────────┬────────────┤
│              │ Delta Neutral    │ BTC Bull Run     │ ETH Yield  │
│              │ USDC             │ Strategy         │ Max        │
├──────────────┼──────────────────┼──────────────────┼────────────┤
│ APY          │ 12.4%            │ 24.8%            │ 18.2%      │
│ Risk         │ ● Low            │ ● High           │ ● Medium   │
│ TVL          │ $2.4M            │ $890K            │ $1.2M      │
│ Strategy     │ Delta Neutral    │ Directional Long │ Yield Opt. │
│ Asset        │ USDC             │ BTC              │ ETH        │
│ Min Deposit  │ $100             │ $500             │ $250       │
│ Lock-up      │ None             │ None             │ None       │
│ Withdrawal   │ 2–3 days         │ 3–5 days         │ 2–4 days   │
│ Operator     │ Harmonix         │ Harmonix         │ Harmonix   │
│ Since        │ Jan 2024         │ Mar 2024         │ Feb 2024   │
│ 30d Return   │ +3.1%            │ +6.2%            │ +4.5%      │
│ 90d Return   │ +9.3%            │ +18.7%           │ +13.4%     │
│ Max Drawdown │ -0.8%            │ -14.2%           │ -5.6%      │
├──────────────┼──────────────────┼──────────────────┼────────────┤
│              │ [ Deposit ]      │ [ Deposit ]      │ [ Deposit ]│
└──────────────┴──────────────────┴──────────────────┴────────────┘
```

---

## Comparison Rows

### Financial Metrics

| Row | Format |
|-----|--------|
| APY | Percentage, bold, color-coded |
| Risk | Badge (Low / Medium / High) |
| TVL | Dollar value, abbreviated ($2.4M) |
| 30d Return | Percentage, green/red |
| 90d Return | Percentage, green/red |
| Max Drawdown | Percentage, always red |

### Operational Metrics

| Row | Format |
|-----|--------|
| Asset | Token symbol + icon |
| Min Deposit | Dollar value |
| Lock-up | "None" or duration |
| Withdrawal Time | Time range |
| Strategy Type | Short label |
| Operator | Name |
| Active Since | Month + Year |

---

## Row Highlighting

For each financial metric row, the "best" vault is highlighted:

Highest APY → highlight that column value.

Lowest Risk → highlight that column value.

Highest 30d Return → highlight.

Lowest Max Drawdown → highlight.

Highlight: subtle background or bold text + small star icon.

Rule: Only one highlight per row.

Ties: both highlighted.

---

## APY Visualization (Mini Chart)

Below the APY row: a small sparkline chart for each vault.

Shows last 30 days APY trend.

Height: 40px.

No Y-axis — trend only.

Tooltip on hover shows exact value.

---

# Mobile Comparison View

## Layout

Two vaults maximum on mobile (3 vaults is too cramped).

If user selected 3 vaults and opens on mobile: show first two, with a "Swap vault" button to replace one.

Horizontal scroll allowed for 3-vault comparison on mobile (last resort).

---

## Mobile Column Layout

```
┌─────────────────────────────────────────────┐
│  Compare Vaults                              │
├─────────────────┬───────────────────────────┤
│                 │ Delta Neutral  │ BTC Bull  │
│                 │ USDC           │ Run       │
├─────────────────┼────────────────┼───────────┤
│ APY             │ 12.4%          │ 24.8%     │
│ Risk            │ Low            │ High      │
│ ...             │ ...            │ ...       │
├─────────────────┼────────────────┼───────────┤
│                 │ [ Deposit ]    │ [ Deposit]│
└─────────────────┴────────────────┴───────────┘
```

---

# Vault Selection UI (Earn Page)

## Compare Button on Vault Card

Default state:

```
┌──────────────────────────────────┐
│ Delta Neutral USDC               │
│ 12.4% APY  ● Low Risk            │
│ TVL: $2.4M                       │
│                                  │
│ [+ Compare]         [ Deposit ]  │
└──────────────────────────────────┘
```

Selected state:

```
┌──────────────────────────────────┐  ← highlighted border
│ ✓ Delta Neutral USDC             │
│ 12.4% APY  ● Low Risk            │
│ TVL: $2.4M                       │
│                                  │
│ [✓ Added]           [ Deposit ]  │
└──────────────────────────────────┘
```

---

## Sticky Comparison Bar

When 2+ vaults selected, sticky bar appears at bottom of Earn page:

```
┌─────────────────────────────────────────────────────┐
│  [Vault A thumb]  [Vault B thumb]  [+ Add Vault]     │
│                                      [ Compare (2) ] │
└─────────────────────────────────────────────────────┘
```

Vault thumbnails show vault name abbreviated.

"+ Add Vault" allows adding a third vault.

"Compare (2)" navigates to comparison view.

"×" button on each thumbnail removes it from selection.

---

# Adding/Removing Vaults in Comparison View

## "+ Add Vault" button

Opens a vault picker panel (drawer).

Shows all vaults not already in comparison.

User can search by name or filter by risk.

Selecting adds to comparison (replaces one if already at 3).

---

## Removing a Vault

Each vault column has an "×" button in the header.

Clicking removes that vault from comparison.

If only 1 vault remains: show "Add another vault to compare" placeholder column.

---

# Empty State

If user navigates to `/earn/compare` with no vault params:

```
Compare Vaults

Select vaults on the Earn page to compare them side-by-side.

[ Browse Vaults ]
```

---

# Sharing Comparison

Shareable URL: `/earn/compare?vaults=delta-neutral-usdc,btc-bull-run`

Copy URL button at top of comparison view.

Shared link opens comparison view with same vaults pre-loaded.

If a vault in the URL no longer exists: show "Vault no longer available" in that column slot.

---

# "Deposit" from Comparison View

Each vault column has a "Deposit" button in the footer row.

Clicking opens the standard Deposit modal for that vault.

After deposit, user returns to comparison view.

---

# Analytics Events

| Event | Trigger |
|-------|---------|
| `vault_compare_selected` | User clicks "+ Compare" on a vault card |
| `vault_compare_opened` | User opens comparison view |
| `vault_compare_shared` | User copies comparison URL |
| `vault_compare_deposited` | User clicks Deposit from comparison view |

---

# Accessibility

Each comparison cell has a proper header association (rowheader + columnheader).

Screen reader reads: "Delta Neutral USDC — APY — 12.4%"

Color is not the sole indicator for best/highlighted values — also bold or star icon.

All interactive elements keyboard navigable.

---

# Final Vault Comparison Principle

Comparison is not about showing off features.

It is about reducing decision anxiety.

A user who compares two vaults and chooses one is a more confident investor.

A confident investor deposits more.

A confident investor stays longer.

Make comparison easy.

Make the right choice obvious.
