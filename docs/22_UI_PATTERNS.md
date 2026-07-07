# Harmonix V2

# UI Patterns

Version 2.0

---

# Purpose

This document defines reusable interaction and layout patterns for Harmonix V2.

Patterns are not components.

Patterns are compositions of components that solve recurring design problems.

Whenever a recurring problem appears, check this document before inventing a new solution.

---

# Pattern Philosophy

Patterns should be:

Predictable

Reusable

Consistent

User-tested

Never invent a pattern for a one-time problem.

If a pattern appears more than twice, document it here.

---

# Pattern 1

Stat Row

---

Purpose

Display a set of related metrics side by side.

---

Usage

Portfolio Summary

Vault Overview

Market Stats

---

Structure

```
[ Label ]   [ Label ]   [ Label ]
[ Value ]   [ Value ]   [ Value ]
```

---

Rules

Maximum four stats per row.

All values in the same row should share the same context.

Never mix unrelated metrics in one row.

Labels are secondary.

Values are primary.

---

Responsive

Desktop: 4 columns

Tablet: 2 columns

Mobile: 2 columns stacked

---

# Pattern 2

Section Header

---

Purpose

Introduce a content section with a title and optional action.

---

Structure

```
[ Section Title ]          [ Optional Action ]
```

---

Rules

Title is always left-aligned.

Action is always right-aligned.

Never use more than one action per section header.

Action should be a Ghost button or text link.

---

Usage

Portfolio → "Your Positions" with "View All"

Rewards → "Active Campaigns" with "Browse All"

---

# Pattern 3

Empty State

---

Purpose

Guide users when a section has no content.

---

Structure

```
        [ Illustration or Icon ]

        [ Primary Message ]

        [ Supporting Message ]

        [ Primary CTA ]
```

---

Rules

Primary message explains what is missing.

Supporting message suggests what to do.

CTA leads to a relevant action.

Never show generic "No data" messages.

---

Variants

No Investments

No Rewards

No History

No Notifications

No Results (Search)

---

# Pattern 4

Card List

---

Purpose

Display a collection of items as a vertical list of cards.

---

Structure

```
[ Card ]
[ Card ]
[ Card ]
```

---

Rules

Cards in a list should be the same type.

Never mix different card types in one list.

Maximum card width follows grid.

Spacing between cards: spacing-md (16px).

---

# Pattern 5

Two-Column Layout

---

Purpose

Split a page into primary content and supporting sidebar.

---

Structure

```
[ Primary Content (8 cols) ]  [ Sidebar (4 cols) ]
```

---

Usage

Vault Detail

Portfolio

---

Rules

Primary content always left.

Sidebar always right.

On tablet: stack vertically.

Sidebar content should always be secondary.

Never put primary CTA inside sidebar.

---

# Pattern 6

Modal Flow

---

Purpose

Guide users through a multi-step transaction inside a modal.

---

Steps

```
Step 1: Input

↓

Step 2: Review

↓

Step 3: Confirm (Wallet Sign)

↓

Step 4: Processing

↓

Step 5: Success
```

---

Rules

Progress indicator shows current step.

Users can go back from Step 1 and Step 2.

Step 3+ cannot be reversed.

Success step always shows a clear summary and next action.

Never skip the Review step for financial transactions.

---

# Pattern 7

Timeline

---

Purpose

Visualize the progress of a long-running operation.

---

Structure

```
● Requested       [timestamp]
│
● Queued          [timestamp]
│
● Processing      [active]
│
○ Transferred     [pending]
│
○ Completed       [pending]
```

---

Rules

Completed steps use filled circles.

Active step uses a distinct highlight.

Pending steps use empty circles.

Timestamps appear only for completed steps.

Never use timeline for instantaneous operations.

---

# Pattern 8

Notification Item

---

Purpose

Display a single notification entry.

---

Structure

```
[ Icon ] [ Title ]                 [ Time ]
         [ Description ]
         [ CTA (optional) ]
```

---

Rules

Unread notifications have a visual indicator (dot or background).

Read notifications appear muted.

CTA is optional and only appears when action is required.

Never use marketing language.

---

# Pattern 9

Badge + Label

---

Purpose

Communicate status or category of an item.

---

Variants

Status Badge: Pending / Processing / Completed / Failed

Risk Badge: Low / Medium / High

APY Badge: value + % suffix

Asset Badge: USDC / ETH / BTC

---

Rules

Use semantic colors:

Green = Completed / Low Risk

Orange = Processing / Medium Risk

Red = Failed / High Risk

Gray = Pending / Unknown

Never use badges as decoration.

---

# Pattern 10

Confirmation Summary

---

Purpose

Show a clear summary before a user commits to a financial action.

---

Structure

```
Action: Deposit

Amount:         5,000 USDC
Vault:          Delta Neutral USDC
Estimated APY:  12.4%
Gas Fee:        ~$0.80

[ Cancel ]          [ Confirm Deposit ]
```

---

Rules

Always show what is being done.

Always show the amount.

Always show what will happen next.

Cancel is always available.

Confirm button is always Primary.

---

# Pattern 11

Page Header

---

Purpose

Establish context at the top of every page.

---

Structure

```
[ Page Title ]
[ Page Subtitle (optional) ]
```

---

Rules

Title is always H1.

Subtitle provides one-sentence context.

Never put actions inside the page header itself.

Actions belong in the section that needs them.

---

# Pattern 12

Skeleton Loading

---

Purpose

Communicate that content is loading without blocking UX.

---

Rules

Skeleton shapes must mirror the actual content layout.

Never show spinners where skeleton makes more sense.

Skeleton appears immediately on page load.

Replace skeleton with content as soon as data arrives.

Avoid full-page loading spinners.

---

# Pattern 13

Search + Filter Bar

---

Purpose

Allow users to narrow down a list of items.

---

Structure

```
[ Search Input ]   [ Filter: Asset ]   [ Filter: Risk ]   [ Sort ]
```

---

Rules

Search is always leftmost.

Filters follow search.

Sort is always rightmost.

Active filters show a clear visual state.

Filters can be cleared individually or all at once.

---

# Pattern 14

Inline Action

---

Purpose

Allow quick actions without navigating away.

---

Usage

Vault Card → Deposit button

Position Card → Withdraw button

Notification → View Details

---

Rules

Inline actions must be secondary or ghost priority.

Never make an inline action Primary unless it is the only action visible.

---

# Pattern 15

Progress Bar

---

Purpose

Show percentage-based progress or allocation.

---

Usage

Vault Capacity

Allocation Chart

Campaign Progress

---

Rules

Always show a label with the percentage.

Use semantic color when percentage has meaning.

Example: Red when capacity > 90%.

Never use progress bars for non-quantifiable concepts.

---

# Final Pattern Principle

When uncertain whether a pattern is correct,

ask:

"Have users seen this in other financial products?"

If yes, use it.

If no, question it.

Familiar patterns reduce cognitive load.

Innovative patterns increase it.
