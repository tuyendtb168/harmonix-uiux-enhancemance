# Harmonix V2

# Page Template

Version 2.0

---

# Purpose

This document defines the standard template that every page in Harmonix V2 must follow.

Consistency across pages creates a predictable experience.

Users should never feel disoriented when navigating between pages.

---

# Template Philosophy

Every page answers one primary question.

Every page follows the same structural order.

No page should require users to learn a new layout.

---

# Global Layout

```
┌─────────────────────────────────────────────────────────┐
│                      TOP NAVIGATION                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                   PAGE HEADER                      │  │
│  │  Page Title                      [Primary CTA]    │  │
│  │  Page Subtitle (optional)                         │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                 PRIMARY CONTENT                    │  │
│  │  (Critical metrics, main action area)              │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                SECONDARY CONTENT                   │  │
│  │  (Supporting data, charts, lists)                  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                TERTIARY CONTENT                    │  │
│  │  (History, technical details, footnotes)           │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                        FOOTER                           │
└─────────────────────────────────────────────────────────┘
```

---

# Top Navigation

Always visible.

Never changes between pages.

Contains:

Logo (left)

Primary navigation links (center or left)

Notifications icon (right)

Wallet button (right)

---

Navigation links:

Home

Earn

Portfolio

Rewards

---

Rules

Active page is highlighted.

Notification icon shows unread badge when notifications exist.

Wallet shows connected address (truncated) or "Connect Wallet."

---

# Page Header

Every page has a header section.

---

Structure

```
[ Page Title ]                    [ Primary CTA (optional) ]
[ Page Subtitle (optional) ]
```

---

Rules

Page Title is H1.

Subtitle provides one-sentence context if needed.

Primary CTA in header is only used for pages where the main action is global.

Example: Earn page has "Deposit" on individual vault cards, not in page header.

Portfolio page has no header CTA — actions are inside position cards.

---

# Content Hierarchy

Every page follows this order.

## Level 1 — Primary Action or Critical Summary

The most important information or action.

Visible without scrolling.

Examples:

Portfolio Value (Portfolio)

Recommended Vaults (Home)

Input Amount (Deposit/Withdraw)

---

## Level 2 — Primary Metrics

Key numbers that answer the page's primary question.

Examples:

Total Earnings, Current APY, Allocation (Portfolio)

Vault APY, Risk, TVL (Earn)

---

## Level 3 — Supporting Content

Charts, allocation breakdowns, secondary cards.

Examples:

Performance Chart (Portfolio)

Vault Strategy Summary (Vault Detail)

---

## Level 4 — Historical / List Content

Activity history, transaction lists, older data.

Examples:

Recent Activity (Portfolio)

Vault History (Vault Detail)

Notification History (Notifications)

---

## Level 5 — Technical Details

Protocol information, contract addresses, advanced data.

Progressive disclosure — collapsed by default.

---

# Section Structure

Each section within a page follows a consistent pattern.

```
[ Section Header ]                    [ Optional Action ]

[ Section Content ]
```

---

Rules

Section header uses H2.

Optional action is a Ghost button or text link.

Content inside the section follows the component library.

Section spacing: spacing-section (48px between sections).

---

# Card Grid Layout

Desktop

```
[ Card ]   [ Card ]   [ Card ]
[ Card ]   [ Card ]   [ Card ]
```

12-column grid. Cards typically span 4 or 6 columns.

---

Tablet

2-column or full-width.

---

Mobile

Full-width cards, stacked vertically.

---

# Two-Column Page Layout

For pages with sidebar content (Vault Detail, Portfolio):

```
┌─────────────────────┬──────────────┐
│                     │              │
│  PRIMARY (8 cols)   │  SIDE (4 cols) │
│                     │              │
│  Main content       │  Quick stats │
│  Chart              │  Actions     │
│  Positions          │  Info cards  │
│                     │              │
└─────────────────────┴──────────────┘
```

On tablet: stack vertically. Sidebar moves below primary content.

On mobile: sidebar content collapses or integrates into primary flow.

---

# Modal Inside Page

Modal is used for transactional flows triggered from a page.

Modal does not replace the page.

After modal completes, user returns to the same page.

Page content updates to reflect the completed action.

---

# Empty States

Every page must have a defined empty state.

Empty state appears when:

User has no data for this page.

A list has no results.

A section has no content.

See 50_EMPTY_STATE.md for all empty state specifications.

---

# Loading States

Pages load section by section.

Navigation and page header load immediately.

Primary content loads with skeleton.

Secondary content loads with skeleton.

No full-page spinner.

See 63_LOADING_EMPTY_SUCCESS.md for full loading specifications.

---

# Error States

Page-level errors appear in place of the affected section.

Global errors appear as toast notifications.

Every error provides a recovery path.

See 62_ERROR_HANDLING.md for full error specifications.

---

# Responsive Rules

Desktop (1280px+)

Full layout as defined above.

Tablet (768px–1279px)

Single column.

Sidebar stacks below main content.

Grid collapses to 2 columns.

Mobile (< 768px)

Single column.

Navigation collapses to bottom bar or hamburger menu.

All cards full-width.

---

# Page Checklist

Before considering any page complete:

□ Page title is H1

□ Content follows hierarchy (Level 1 → Level 5)

□ Empty state is defined

□ Loading state uses skeleton

□ Error state is handled

□ Responsive layout works on all breakpoints

□ Primary CTA is always visible

□ Back navigation works

□ All interactive elements are keyboard accessible

□ Page answers its one primary question within 5 seconds

---

# Final Template Principle

Users should never need to relearn the layout when switching pages.

Consistency builds confidence.

Confidence drives retention.

Every page in Harmonix is a continuation of the same experience.

Not the start of a new one.
