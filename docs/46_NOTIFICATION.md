# Harmonix V2

# Notification Component Specification

Version 2.0

---

# Purpose

Notification Component renders a single notification item.

It is used inside the Notification Drawer and Notification History.

---

# Component Location

`shared/ui/NotificationItem`

---

# Philosophy

Notifications are communication.

Not decoration.

Every notification tells the user something that matters.

The component must make that information immediately readable.

---

# Anatomy

```
┌────────────────────────────────────────────────────────────┐
│  [●]  [Icon]  Title                              Timestamp │
│              Description                                   │
│              [CTA →]  (optional)                           │
└────────────────────────────────────────────────────────────┘
```

---

# Elements

## Unread Indicator

Small filled circle (6px) on the far left.

Color: Primary (brand blue).

Hidden when notification is read.

---

## Icon

Type-specific icon.

Contained in a small rounded background.

| Type | Icon | Background |
|------|------|------------|
| Deposit | Arrow down | Success light |
| Withdrawal | Arrow up | Info light |
| Reward | Star | Warning light |
| Campaign | Megaphone | Primary light |
| Security | Shield | Danger light |
| Maintenance | Wrench | Neutral light |

Icon size: 16px

Container size: 32px

---

## Title

Short, direct.

Font: Body, semibold.

Color: Text Primary (unread) / Text Secondary (read).

---

## Description

One to two sentences.

Font: Body Small.

Color: Text Secondary.

Max 2 lines with ellipsis if longer (full text on expand or hover).

---

## Timestamp

Relative: "2h ago", "3 days ago", "Just now"

Font: Caption.

Color: Text Muted.

Tooltip on hover: full date + time.

---

## CTA (Optional)

Appears when user action is available.

Style: Ghost button, small size, or text link.

Examples:

"View Portfolio →"

"View Transaction →"

"View Campaign →"

---

# States

## Unread

Background: slightly highlighted (e.g., `color-primary-surface`).

Title: Text Primary weight.

Unread dot visible.

---

## Read

Background: `color-surface` (default).

Title: Text Secondary weight.

Unread dot hidden.

---

## Hover

Background: `color-surface-elevated`.

Cursor: pointer (if notification is clickable).

---

## Loading

Skeleton: icon placeholder, title bar, description bar.

---

# Notification Item Interaction

Clicking anywhere on a notification:

Marks it as read.

Navigates to the relevant deep link (if available).

Clicking CTA:

Marks as read.

Navigates to CTA destination.

---

# Read Behavior

Notifications are marked as read when:

User clicks on the notification.

User clicks "Mark All Read".

User navigates to the deep-linked page from the notification.

---

# Divider

A subtle divider separates notification items.

Color: `color-divider`.

No divider after the last item.

---

# Grouped by Date (Optional)

Notifications can be grouped by day:

```
Today
  [ Notification ]
  [ Notification ]

Yesterday
  [ Notification ]

3 days ago
  [ Notification ]
```

Group header: Caption font, Text Muted color.

---

# Token Usage

Unread dot: `color-primary`

Unread background: `color-primary-surface`

Read background: `color-surface`

Hover background: `color-surface-elevated`

Icon container: type-specific semantic background token

Title (unread): `font-body`, `font-semibold`, `color-text-primary`

Title (read): `font-body`, `color-text-secondary`

Description: `font-body-sm`, `color-text-secondary`

Timestamp: `font-caption`, `color-text-muted`

Padding: `spacing-md` (16px) vertical, `spacing-lg` (24px) horizontal

---

# React Props Interface

```tsx
interface NotificationItemProps {
  id: string
  type: 'deposit' | 'withdrawal' | 'reward' | 'campaign' | 'security' | 'maintenance'
  title: string
  description: string
  timestamp: string           // ISO date string
  read: boolean
  ctaLabel?: string
  ctaHref?: string
  onRead: (id: string) => void
  onClick?: (id: string) => void
}
```

---

# Accessibility

Unread indicator: `aria-label="Unread notification"`

Notification item: `role="article"` or `role="listitem"`

CTA: standard button/link accessibility.

Timestamp tooltip for full date: `title` attribute.

---

# Do Not

Do not use notification items for marketing messages.

Do not truncate titles.

Do not show a CTA for every notification — only when an action is available.

Do not display more than 2 lines of description without expand.

---

# Final Notification Item Principle

A notification is worth reading only if it contains information the user actually needs.

Every notification item must justify its existence.

If there is nothing meaningful to communicate, send no notification.
