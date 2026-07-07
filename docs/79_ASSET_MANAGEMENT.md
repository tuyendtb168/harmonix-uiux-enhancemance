# Harmonix V2

# Asset Management

Version 2.0

---

# Purpose

This document defines the multi-asset UX in Harmonix V2.

As Harmonix expands beyond USDC, users will manage positions across multiple assets and vaults.

This document covers: asset switching, cross-asset portfolio view, asset-specific UI rules.

---

# V2 Asset Scope

**V2 Launch Assets:**

- USDC (primary)

**Planned Expansion:**

- ETH
- BTC (wrapped)
- HYPE (native)
- Additional stablecoins (USDT, DAI)

All multi-asset UI must be designed to accommodate expansion without requiring redesigns.

---

# Asset Display Rules

## Token Representation

Every asset is represented by:

- Token icon (circular, 24px standard, 32px prominent)
- Token symbol (USDC, ETH, BTC)
- Full name on detail views (USD Coin, Ethereum, Bitcoin)
- Network badge if cross-chain (e.g., "on Hyperliquid")

---

## Value Display Rules

All portfolio values display in USD equivalent by default.

Users can toggle to show values in native token.

Setting persists per session (not persisted in localStorage for V2).

---

## Number Formatting

| Asset | Display Format |
|-------|---------------|
| USDC | $5,000.00 or 5,000 USDC |
| ETH | 2.4500 ETH ($8,200) |
| BTC | 0.12500 BTC ($8,750) |
| HYPE | 1,250 HYPE ($620) |

Stablecoins: 2 decimal places.

ETH/BTC: 4 decimal places for token amount.

HYPE: 0 decimal places for display (integer).

---

# Portfolio View — Multi-Asset

## Portfolio Summary (Multi-Asset)

When user has positions in multiple assets:

```
┌─────────────────────────────────────────────────────────────────┐
│  Portfolio                                                       │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│ Total Value  │ Total Earned │ Active       │ 24h Change         │
│ $18,450      │ $1,240       │ 4 Positions  │ +$82 (+0.45%)      │
└──────────────┴──────────────┴──────────────┴────────────────────┘
```

Total Value = sum of all positions across all assets, in USD.

---

## Asset Breakdown Panel

Below the summary stats, an asset allocation breakdown:

```
Asset Breakdown

● USDC    $10,000  (54%)  ████████████████░░░░░░░░░░░░░░
● ETH      $5,400  (29%)  ████████░░░░░░░░░░░░░░░░░░░░░░
● BTC      $3,050  (17%)  █████░░░░░░░░░░░░░░░░░░░░░░░░░

[ View by Asset ]   [ View All Positions ]
```

"View by Asset" filters the positions list by asset.

"View All Positions" shows all positions regardless of asset.

---

## Position List — Asset Filtering

Positions list gains an asset filter tab bar:

```
[ All ] [ USDC ] [ ETH ] [ BTC ] [ HYPE ]
```

Default: All.

Selecting an asset filters to positions in that asset.

Tab shows count badge if user has positions in that asset: "USDC (2)"

---

# Asset Switching in Deposit Modal

When a vault accepts multiple assets (future capability):

---

## Asset Selector (Deposit Step 1)

```
┌────────────────────────────────────────────┐
│  Deposit into Delta Neutral              │
├────────────────────────────────────────────┤
│                                            │
│  Asset                                     │
│  ┌────────────────────────────────────┐    │
│  │  [USDC icon] USDC            ▼     │    │
│  └────────────────────────────────────┘    │
│                                            │
│  Balance: 5,000 USDC                       │
│                                            │
│  Amount                                    │
│  ┌────────────────────────────────────┐    │
│  │  1,000                             │    │
│  └────────────────────────────────────┘    │
│  25%  50%  75%  MAX                        │
│                                            │
└────────────────────────────────────────────┘
```

Asset dropdown shows available assets for this vault.

Balance updates when asset changes.

Amount resets when asset changes.

---

## Asset Selector Dropdown

```
Select asset

● USDC     Balance: 5,000.00   [USDC icon]
○ USDT     Balance: 2,200.00   [USDT icon]
○ DAI      Balance:   800.00   [DAI icon]
```

Sorted by user's balance (highest first).

Assets with zero balance shown at bottom, dimmed.

---

# Vault Cards — Asset Indicator

Each vault card shows the primary deposit asset:

```
┌──────────────────────────────────────┐
│  [USDC] Delta Neutral USDC           │
│                                      │
│  12.4% APY   ● Low Risk              │
│  TVL: $2.4M                          │
└──────────────────────────────────────┘
```

When filtering by asset on Earn page, vault cards for non-matching assets are hidden.

---

# Earn Page — Asset Filter

Asset filter added to Earn page filter bar:

```
[ All Assets ] [ USDC ] [ ETH ] [ BTC ] [ HYPE ]
```

Filters vault list to show only vaults accepting selected asset.

Persists during session.

---

# Cross-Asset Performance Chart

On Portfolio page, performance chart can display:

- Total portfolio value over time (all assets combined, USD)
- Single asset performance (toggle per asset)

Asset toggle:

```
Show: [ Total ] [ USDC ] [ ETH ] [ BTC ]
```

Each asset gets a distinct color (from design token palette).

Multiple asset lines can be shown simultaneously.

---

# Asset-Specific Empty States

When user has no positions in a specific asset:

Filtered to USDC with no USDC positions:

"You don't have any USDC positions yet. Explore USDC vaults."

CTA: "Browse USDC Vaults" → /earn filtered to USDC.

---

# Wallet Balance Display

In Deposit modal and wherever wallet balance is shown:

Show balance for the currently selected asset only.

On asset switch: balance field updates to reflect new asset balance.

If asset balance is zero: show warning: "No [ASSET] in your wallet."

---

# Asset Icons

All asset icons sourced from a centralized icon registry.

Format: SVG, circular crop, 1:1 ratio.

Sizes: 16px, 24px, 32px, 48px.

Fallback: Generic token icon with asset symbol text.

Never use colored letters as a substitute for icons in production UI.

---

# Multi-Asset Considerations for V2

V2 launches with USDC only.

All multi-asset UI components should be built to accept future assets without rework.

Design principle: USDC is the default. Adding ETH should require zero new components, only configuration.

---

## Implementation Pattern

```typescript
interface AssetConfig {
  symbol: string        // 'USDC'
  name: string          // 'USD Coin'
  decimals: number      // 6
  icon: string          // '/icons/usdc.svg'
  coingeckoId: string   // 'usd-coin'
  isStablecoin: boolean // true
  displayDecimals: number // 2
}
```

All monetary displays consume `AssetConfig` from a registry.

Never hardcode "USDC" in display logic — always derive from config.

---

# Final Asset Management Principle

Users think in dollars.

When they deposit ETH, they think: "I put in $5,000."

When they check returns, they think: "I earned $200."

Always provide the USD context.

Asset denomination is secondary.

The product should feel like one portfolio, not multiple separate wallets.
