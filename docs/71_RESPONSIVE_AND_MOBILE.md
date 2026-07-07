# Harmonix V2

# Responsive Design & Mobile UX

Version 2.0

---

# Purpose

This document defines how Harmonix V2 adapts across screen sizes.

It is not a list of breakpoints.

It is a guide for how user experience changes across devices.

---

# Responsive Philosophy

Desktop: Full dashboard experience. Information density is appropriate.

Tablet: Comfortable management. Slightly reduced density.

Mobile: Quick monitoring and action. Essential only.

The product does not become a different product on mobile.

It becomes a focused version of itself.

---

# Breakpoints

| Name | Range | Grid |
|------|-------|------|
| Mobile | < 768px | 4 columns |
| Tablet | 768px – 1279px | 8 columns |
| Desktop | 1280px – 1535px | 12 columns |
| Wide | 1536px+ | 12 columns, max-width 1280px centered |

---

# Navigation: Mobile

Desktop navigation is a horizontal top bar.

Mobile navigation changes to a bottom tab bar.

---

## Mobile Bottom Navigation

```
┌────────────────────────────────────────┐
│                                        │
│            PAGE CONTENT                │
│                                        │
│                                        │
├────────────────────────────────────────┤
│  Home   Earn   Portfolio   Rewards     │
└────────────────────────────────────────┘
```

Tabs: Home, Earn, Portfolio, Rewards.

Notifications: bell icon moves to top-right of page header.

Wallet: accessible via Portfolio page header or settings.

---

## Mobile Top Bar

```
[ Harmonix Logo ]          [ 🔔 ] [ Wallet ]
```

Minimal. Logo left. Actions right.

---

# Layout Adaptations

## Grid Collapse Rules

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Stat Cards (4) | 4 columns | 2×2 | 2×2 |
| Vault Cards | 3 per row | 2 per row | 1 per row |
| Two-col layout | 8+4 split | Stack | Stack |
| Position Cards | 2 per row | 1 per row | 1 per row |
| Campaign Cards | 2 per row | 1 per row | 1 per row |

---

## Two-Column to Single-Column

Pages with sidebar (Portfolio, Vault Detail):

Desktop: Primary (8 cols) + Sidebar (4 cols).

Tablet + Mobile: Single column. Sidebar content moves below main content.

---

# Page-Specific Mobile Adaptations

## Home (Mobile)

Hero text is smaller.

Platform stats: 2×2 grid (not 3-wide).

Recommended vaults: single column.

"How it works" section: hidden on mobile (too long).

---

## Earn (Mobile)

Filter bar scrolls horizontally.

Search stays full width.

Vault cards: single column, full width.

---

## Vault Detail (Mobile)

Sticky "Deposit" button at bottom of screen.

Sidebar (Deposit Card) moves below strategy section.

Performance chart: reduced height (220px).

Technical details section: collapsed by default.

---

## Portfolio (Mobile)

Stat cards: 2×2 grid.

Performance chart: reduced height (220px), time filter scrolls horizontally.

Position cards: single column.

Sidebar (Pending Withdrawals, Rewards): stack below positions.

---

## Deposit Modal (Mobile)

Full-screen modal (not floating).

Keyboard does not push content — form scrolls.

Quick amount buttons (25/50/75/MAX): 2×2 grid.

Footer (Cancel + Confirm): sticky at bottom.

---

## Withdraw Modal (Mobile)

Full-screen modal.

Timeline component: compact variant.

---

## Notification Drawer (Mobile)

Bottom drawer instead of right drawer.

Height: 85vh max.

Swipe down to close.

---

# Touch Interaction Patterns

## Tap Targets

Minimum size: 44×44px for all interactive elements.

Buttons must have adequate padding even if visually smaller.

---

## Swipe Gestures

Notification drawer: swipe down to close.

Bottom sheet: swipe down to dismiss.

Tabs: horizontal swipe between primary sections (optional, not required).

---

## Hover vs Tap

All hover states must have equivalent active/pressed states.

No hover-only information — anything shown on hover must also be shown on tap or always visible.

Tooltips: on mobile, show on tap instead of hover.

---

# Mobile Typography

Body text: minimum 14px (same as desktop).

Captions: minimum 12px.

Values/Numbers: maintain prominence — do not shrink.

No font size differences between desktop and mobile for data.

---

# Mobile Performance

First meaningful paint: < 2 seconds on 4G.

Portfolio summary: loads before charts.

Charts: lazy load.

Vault list: load first 6 vaults, paginate or lazy load the rest.

Images: serve appropriately sized versions.

---

# Mobile-Specific Components

## Bottom Sheet

Used instead of Right Drawer on mobile.

For: Notifications, Wallet panel.

Specs:

Slides up from bottom.

Max height: 85vh.

Drag handle at top.

Swipe down to close.

Backdrop tap to close.

---

## Sticky Bottom CTA

On Vault Detail page (mobile):

Primary deposit button sticks to bottom of viewport while scrolling.

```
┌─────────────────────────────────────┐
│                                     │
│  [Vault content scrolls here]       │
│                                     │
├─────────────────────────────────────┤
│  Current APY: 12.4%   [ Deposit ]   │
└─────────────────────────────────────┘
```

---

## Mobile Table

Tables collapse to card rows on mobile.

Each row becomes:

```
┌──────────────────────────────────────┐
│  Deposited into Delta Neutral USDC   │
│  5,000 USDC              Jan 20      │
│  ● Completed          [View →]       │
└──────────────────────────────────────┘
```

---

# Forms on Mobile

Input fields: 16px font (prevents iOS zoom on focus).

Numeric keyboard: use `inputmode="decimal"` for amount inputs.

Amount input: full width.

Quick select buttons: full width on small screens.

---

# Charts on Mobile

Performance chart:

Height: 220px (reduced from 300px desktop).

Y-axis labels: hidden (tooltips still work on tap).

Time filter tabs: scrollable horizontal.

Donut chart:

Displayed at 200px diameter.

Legend below chart (not beside).

---

# Accessibility on Mobile

All keyboard accessibility rules still apply (external keyboards).

VoiceOver (iOS) and TalkBack (Android) supported.

Focus order follows visual reading order.

Touch targets remain 44px minimum.

---

# Responsive Testing Checklist

Before any release:

□ iPhone SE (375px) — smallest supported viewport

□ iPhone 14 Pro (393px) — most common iPhone

□ iPad (768px) — tablet

□ Desktop (1280px) — standard desktop

□ Wide (1440px) — large monitor

□ No horizontal scroll on any viewport

□ Bottom navigation visible and functional on mobile

□ All modals full-screen on mobile

□ Sticky CTA visible on Vault Detail mobile

□ Charts readable on 375px

□ Deposit/Withdraw flows complete on mobile

---

# Final Responsive Principle

Mobile users are not second-class users.

Many users check their portfolio on mobile daily.

The mobile experience should inspire the same confidence as desktop.

A user checking their portfolio on the subway should feel:

"My money is growing."

"I know exactly what is happening."

The screen size changed.

The feeling should not.
