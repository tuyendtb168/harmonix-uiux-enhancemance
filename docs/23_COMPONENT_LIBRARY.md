# Harmonix V2

# Component Library

Version 2.0

---

# Purpose

This document defines every reusable UI component in Harmonix V2.

Each component has exactly one purpose.

Components are building blocks.

They contain no business logic.

Business logic belongs in hooks and features.

---

# Component Philosophy

Components should be:

Small

Focused

Composable

Accessible

Token-driven

If a component grows beyond one responsibility, split it.

---

# Shared Component List

All components live in `shared/ui/`.

```
Button
Input
Textarea
Select
Checkbox
Toggle
Badge
Chip
Avatar
Spinner
Skeleton
Tooltip
Divider
Card
Modal
Drawer
Toast
Timeline
TimelineItem
Chart
Table
TableRow
TableCell
EmptyState
Tabs
TabItem
Dropdown
DropdownItem
StatCard
ProgressBar
```

---

# Button

Purpose

Trigger an action.

---

Variants

Primary — Main action. One per section.

Secondary — Alternative action.

Ghost — Utility or low-priority action.

Destructive — Irreversible action (e.g., Cancel Withdrawal).

---

Sizes

Small (32px height)

Medium (40px height) — Default

Large (48px height)

---

States

Default

Hover

Active

Disabled

Loading

---

Rules

Never place two Primary buttons in the same visual section.

Loading state replaces label with spinner.

Disabled buttons must have reduced opacity.

All buttons must meet minimum touch target (44px).

---

# Input

Purpose

Accept text or numeric input from users.

---

Variants

Default

With Label

With Helper Text

With Error State

With Prefix (e.g., $)

With Suffix (e.g., USDC)

---

States

Default

Focus

Error

Disabled

---

Rules

Always pair with a label.

Error messages appear below the input.

Never use placeholder as a substitute for a label.

Numeric inputs should right-align values.

---

# Badge

Purpose

Communicate status, category, or value at a glance.

---

Variants

Status: Pending / Processing / Completed / Failed / Cancelled

Risk: Low / Medium / High

Asset: USDC / ETH / BTC / HYPE

APY: value display

---

Colors

Green: Completed, Low Risk

Orange: Processing, Medium Risk

Red: Failed, High Risk

Gray: Pending, Unknown

Blue: Informational

---

Rules

Never use badges as decoration.

Badge text should be a single word or short phrase.

---

# Avatar

Purpose

Represent a wallet address, protocol, or vault visually.

---

Variants

Wallet Avatar — Generated from address

Protocol Logo — External image

Vault Logo — Branded icon

---

Sizes

Small (24px)

Medium (32px)

Large (40px)

---

Rules

Always provide a fallback.

Wallet avatars use deterministic generation from address.

Never show a blank square.

---

# Spinner

Purpose

Indicate a loading operation in progress.

---

Sizes

Small — Inline use

Medium — Button use

Large — Section loading

---

Rules

Use skeleton instead of spinner for layout-level loading.

Spinner is for operations that have no predictable duration.

Always pair with accessible loading text for screen readers.

---

# Skeleton

Purpose

Represent loading content with the shape of the expected layout.

---

Variants

Text skeleton

Card skeleton

Table row skeleton

Chart skeleton

Stat skeleton

---

Rules

Skeleton must match the shape of the real content.

Animate with a subtle shimmer effect.

Remove immediately when content is ready.

---

# Tooltip

Purpose

Provide contextual help on hover or focus.

---

Rules

Tooltip text must be short (under 80 characters).

Never put actionable content inside a tooltip.

Always accessible via keyboard (focus).

Tooltip appears above by default, adjusts to viewport.

---

# Card

Purpose

Group related content into a visual container.

---

Variants

Default Card — General content

Elevated Card — Higher emphasis

Interactive Card — Clickable/hoverable

Status Card — Shows state-related content

---

Rules

Each card answers one question.

Never put unrelated content in a single card.

Interactive cards show hover state.

All cards use consistent border-radius and shadow tokens.

---

# Modal

Purpose

Focus user attention on a critical action or information.

---

Sizes

Small (400px) — Confirmation

Medium (560px) — Transaction flows

Large (720px) — Complex forms

---

Rules

Always include a close button.

Clicking outside closes the modal (except during transactions).

Modal should never contain another modal.

Primary action always bottom-right.

Cancel always bottom-left or bottom-center.

---

# Drawer

Purpose

Slide-in panel for supplementary content.

---

Variants

Right Drawer — Notifications, Wallet

Bottom Drawer — Mobile quick actions

---

Rules

Drawer should not require a CTA to open nested modals.

Always provide a clear close action.

Drawer content should be scannable.

---

# Toast

Purpose

Communicate brief, non-blocking feedback.

---

Variants

Success — Deposit/Withdraw completed

Error — Transaction failed

Info — General message

Warning — Requires attention

---

Rules

Toasts auto-dismiss after 4 seconds.

Error toasts remain until dismissed.

Maximum two toasts visible at once.

Never use toasts as the only notification for critical events.

---

# Timeline / TimelineItem

Purpose

Visualize the progress of a multi-step process.

---

Rules

See Pattern 7 in 22_UI_PATTERNS.md.

Each TimelineItem receives: label, timestamp, status (completed/active/pending).

---

# Chart

Purpose

Visualize data trends over time.

---

Variants

Line Chart — Portfolio growth, APY history

Area Chart — Cumulative yield

Bar Chart — Activity volume

Donut Chart — Allocation

---

Rules

Charts must be readable without color (grayscale check).

Always include a legend when multiple series are shown.

Axes must be labeled.

Tooltips show exact values on hover.

Charts lazy-load.

---

# Table / TableRow / TableCell

Purpose

Display structured historical or comparative data.

---

Rules

Tables are for history, not primary decision-making.

Always include column headers.

Sortable columns show sort direction icon.

Pagination or infinite scroll for long lists.

Mobile: collapse to card-like rows.

---

# EmptyState

Purpose

Guide users when content is not yet available.

---

Structure

```
[ Icon ]
[ Primary Message ]
[ Supporting Message ]
[ CTA ]
```

---

Rules

Never use generic "No data" text.

Each empty state is context-specific.

See 50_EMPTY_STATE.md for all variants.

---

# Tabs / TabItem

Purpose

Switch between related content sections without navigation.

---

Rules

Tabs should have 2–5 items.

Active tab is clearly highlighted.

Tab content must share the same context.

Never use tabs to navigate to different pages.

---

# Dropdown / DropdownItem

Purpose

Present a list of options in a compact format.

---

Rules

Dropdown opens on click.

Closes on selection, outside click, or Escape key.

Maximum 8 items before adding search.

All items are keyboard navigable.

---

# StatCard

Purpose

Display a single important metric with label.

---

Structure

```
[ Label ]
[ Value ]
[ Sub-value or Change (optional) ]
```

---

Rules

One metric per StatCard.

Value is always the visual focus.

Change indicator uses green (positive) or red (negative).

---

# ProgressBar

Purpose

Show percentage-based progress.

---

Rules

Always show numerical label.

Use semantic color when the value has meaning.

Never animate endlessly.

---

# Final Component Principle

Components are tools.

Not art.

Every component exists to solve one communication problem.

If a component is not used in at least two places,

question whether it should be in Shared UI.
