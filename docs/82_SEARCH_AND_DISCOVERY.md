# Harmonix V2

# Search & Discovery

Version 2.0

---

# Purpose

This document defines search and vault discovery in Harmonix V2.

As the vault catalog grows, users need better tools to find the right vault.

Discovery is not just about search — it is about guiding users toward the vault that fits them.

---

# Discovery Philosophy

Most users don't know exactly what they want.

They know what they need: "something safe", "high yield", "ETH exposure".

The discovery system translates those needs into vault recommendations.

A user who finds the right vault faster deposits sooner.

---

# Entry Points

## Earn Page

The primary discovery surface.

All vaults are listed here.

Search, filters, and sorting are available.

---

## Home Page (Recommended Vaults)

A curated selection of 3–4 vaults.

Based on: risk level, user history, TVL, current performance.

Not all vaults — a thoughtful selection.

---

## Vault Comparison

Side-by-side comparison of selected vaults.

See `74_VAULT_COMPARISON.md`.

---

# Search Bar

## Placement

Top of the Earn page.

Full width on mobile.

Persistent — does not collapse.

---

## Behavior

Real-time search — no "submit" required.

Results update as user types (debounced at 300ms).

Searches against: vault name, vault description, asset, strategy type.

---

## Search Result Matching

| Input | Matches |
|-------|---------|
| "delta" | Delta Neutral USDC, Delta BTC |
| "usdc" | All USDC vaults |
| "btc" | BTC Bull Run, Delta BTC |
| "low risk" | All Low Risk vaults |
| "stable" | Stablecoin vaults |
| "yield" | All vaults (broad match — fallback) |

Partial match supported.

Case-insensitive.

---

## No Results State

If search returns no vaults:

```
No vaults found for "xyz"

Try a different search term, or browse all vaults below.

[ Clear Search ]
```

Do not show an empty page — show cleared vault list below.

---

## Search Clearing

"×" button appears inside search field when input is not empty.

Clicking clears search and shows full vault list.

ESC key also clears search.

---

# Filter Bar

Below the search bar.

Persistent horizontal row of filter controls.

---

## Filter Categories

### Risk Level

Multi-select toggle buttons:

```
[ All ] [ Low ] [ Medium ] [ High ]
```

Default: All.

Multiple selections allowed (e.g., Low + Medium).

---

### Asset

Multi-select:

```
[ All ] [ USDC ] [ ETH ] [ BTC ] [ HYPE ]
```

Only shows assets for which vaults currently exist.

---

### Strategy Type

Multi-select:

```
[ All ] [ Delta Neutral ] [ Yield Optimized ] [ Directional ] [ Liquidity Providing ]
```

---

### Status

```
[ Active ] [ Coming Soon ] [ Paused ]
```

Default: Active only.

"Coming Soon" shows vaults in pipeline with countdown or ETA.

---

## Filter Chips

When filters are active, show filter chips below the filter bar:

```
● Low Risk  ×    ● USDC  ×     [ Clear All Filters ]
```

Each chip shows the active filter and has an "×" to remove it.

"Clear All Filters" resets to default state.

Filter count badge on a "Filters" button (mobile):

Mobile: Filters collapse into a "Filters (2)" button that opens a filter drawer.

---

## Filter Persistence

Filters persist within the session.

Navigating to a vault detail and returning keeps filters active.

Filters reset on page reload (not persisted to URL for V2).

---

# Sorting

Sort control to the right of filter bar:

```
Sort by: [ APY ▼ ] [ TVL ] [ Newest ] [ Risk ]
```

Default: APY (highest first).

Options:

| Sort Option | Order |
|-------------|-------|
| APY | Highest first |
| TVL | Highest first |
| Risk | Lowest risk first |
| Newest | Most recently added first |
| Trending | Most deposits in last 7d |

---

# Vault Watchlist / Favorites

Users can save vaults to a watchlist.

---

## Adding to Watchlist

Each vault card has a bookmark/star icon (top-right corner).

Clicking adds to watchlist.

Filled icon = in watchlist. Empty = not added.

---

## Watchlist View

On Earn page: "Watchlist" tab alongside "All Vaults".

```
[ All Vaults ]  [ Watchlist (3) ]
```

Shows only watchlisted vaults.

If watchlist is empty:

"You haven't saved any vaults yet. Tap the ★ on any vault to add it here."

---

## Watchlist Storage

Stored in localStorage keyed by wallet address.

Persists across sessions for the same wallet.

No server sync in V2.

---

# Recently Viewed Vaults

A horizontal scroll row below the search/filter bar:

```
Recently Viewed

[Delta Neutral USDC]  [BTC Bull Run]  [ETH Yield Max]
```

Shown only if user has viewed at least one vault.

Maximum 5 recently viewed.

Stored in localStorage.

Clicking a card navigates to vault detail.

"×" button on each card removes from recently viewed.

---

# Recommended Vaults (Personalized)

On Earn page, before the vault grid:

A "Recommended for You" section (2–3 vaults).

---

## Recommendation Logic

| Condition | Recommendation |
|-----------|---------------|
| First visit, no connection | Highest TVL + Low Risk |
| Connected, no positions | Low Risk USDC vaults |
| Has USDC positions | Complementary asset vaults (ETH, BTC) |
| High portfolio value | Best Sharpe ratio vaults |
| Has only Low Risk positions | Medium Risk vaults (subtle diversification nudge) |

V2: Logic can be rule-based (no ML needed at launch).

Future: Personalization engine based on on-chain history.

---

## Recommended Section UI

```
Recommended for you

┌─────────────────────┐  ┌─────────────────────┐
│  Delta Neutral USDC │  │  ETH Yield Max      │
│  12.4% APY  ● Low   │  │  18.2% APY  ● Med   │
└─────────────────────┘  └─────────────────────┘
```

Dismissible: "×" hides the section for the session.

---

# Coming Soon Vaults

Vaults not yet live can be shown in the catalog.

---

## Coming Soon Card

```
┌──────────────────────────────────────┐
│  BTC Momentum Strategy        [Soon] │
│                                      │
│  Estimated APY: 20–35%               │
│  Risk: High                          │
│  Launch: Q2 2024                     │
│                                      │
│  [ Notify Me When Live ]             │
└──────────────────────────────────────┘
```

"Notify Me When Live" stores wallet address for launch notification.

Coming Soon vaults are greyed out — no Deposit button.

---

# Search Analytics

Track to improve discovery:

| Event | Data |
|-------|------|
| `vault_search` | Query string, result count |
| `vault_filter_applied` | Filter type, filter value |
| `vault_sort_changed` | Sort option selected |
| `vault_watchlist_added` | Vault ID |
| `vault_watchlist_removed` | Vault ID |
| `vault_recently_viewed` | Vault ID, view count |
| `vault_recommended_clicked` | Vault ID, recommendation reason |

Zero-result searches are especially valuable for product decisions.

---

# Accessibility

Search input: `role="searchbox"`, `aria-label="Search vaults"`.

Filter buttons: `aria-pressed` reflects active state.

Watchlist icon: `aria-label="Add to watchlist"` / `aria-label="Remove from watchlist"`.

Sort dropdown: standard `<select>` or ARIA combobox pattern.

Filter chips: each chip is a button with `aria-label="Remove [filter name] filter"`.

---

# Mobile Search & Discovery

Search bar: full width, prominent.

Filter bar: horizontal scroll — all filters visible via swipe.

"Filters" button opens bottom drawer on mobile.

Watchlist: same tab behavior, full width cards.

Recently Viewed: horizontal scroll row, same as desktop.

---

# Final Discovery Principle

The vault catalog is not a list.

It is a matchmaking system.

Every user has a risk tolerance, an asset preference, and a yield expectation.

The discovery system's job is to surface the right match as fast as possible.

A matched user deposits.

An unmatched user leaves.

Every filter, sort, and recommendation exists to close that gap.
