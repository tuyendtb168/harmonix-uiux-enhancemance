# Harmonix V2

# Table Component Specification

Version 2.0

---

# Purpose

Table displays structured historical or comparative data.

Tables exist for history and audit.

Not for primary decision-making.

If users need to compare options, use Cards.

If users need to review history, use Table.

---

# Component Location

`shared/ui/Table`
`shared/ui/TableRow`
`shared/ui/TableCell`

---

# Philosophy

Tables answer: "What happened and when?"

They are data-dense by nature.

Harmonix tables prioritize readability over density.

Never sacrifice legibility to show more rows.

---

# When to Use Table

Activity history (Portfolio)

Reward history (Rewards)

Transaction history

Vault performance history (APY by period)

---

# When NOT to Use Table

Comparing vault options (use Cards)

Primary portfolio display (use Stat Cards + Cards)

Single-item display (use a Card)

---

# Table Anatomy

```
┌─────────────────────────────────────────────────────────────────┐
│  SECTION HEADER                              [Filter] [Export]  │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│  Column A    │  Column B    │  Column C    │  Column D          │  ← Header Row
├──────────────┼──────────────┼──────────────┼────────────────────┤
│  Value       │  Value       │  Value       │  [Badge] Value     │  ← Data Row
├──────────────┼──────────────┼──────────────┼────────────────────┤
│  Value       │  Value       │  Value       │  Value             │
├──────────────┼──────────────┼──────────────┼────────────────────┤
│                                                                 │
│                    PAGINATION                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

# Column Header Row

Font: Body Small, Semibold.

Color: Text Secondary.

Background: Surface Elevated (slightly off-white).

Sticky on scroll (when table is long).

Sortable columns show sort icon (▲ / ▼ / ⇅).

---

# Data Rows

Default height: 52px.

Font: Body, Regular.

Color: Text Primary.

Alternating row backgrounds: avoid — use subtle hover instead.

Hover: `color-surface-elevated` background.

---

# Column Types

## Text Column

Standard text.

Left-aligned.

---

## Number / Amount Column

Right-aligned (financial convention).

Formatted: $5,000.00 or $5K.

---

## Date Column

Right-aligned or centered.

Relative format in list: "2 days ago".

Exact format in export: "Jan 20, 2024 14:32".

---

## Status Column

Badge component.

Centered.

---

## Action Column

Right-aligned.

Ghost button or icon button.

Example: "View →" or external link icon.

---

# Activity Table Specification

Used in Portfolio page.

## Columns

| Column | Type | Width |
|--------|------|-------|
| Event | Text + Icon | 40% |
| Amount | Number | 20% |
| Date | Date | 20% |
| Status | Badge | 15% |
| Action | Link | 5% |

---

## Row Content (Activity)

Icon + Event description: "Deposited into Delta Neutral USDC"

Amount: +$5,000 USDC (green) or −$5,000 USDC (red for withdrawals)

Date: "Jan 20, 2024"

Status: Completed / Processing / Failed badge

Action: "View →" (explorer link)

---

# Reward History Table

## Columns

| Column | Type |
|--------|------|
| Event | Text |
| Points | Number |
| Date | Date |
| Source | Text |

---

# Sorting

Clicking a column header toggles: Ascending → Descending → Default.

Sort indicator icons:

⇅ — unsorted

▲ — ascending

▼ — descending

Only one column sorted at a time.

---

# Pagination

Default: 10 rows per page.

Options: 10 / 25 / 50 rows per page.

Show: "Showing 1–10 of 47 results"

Pagination controls: Previous / Next + page numbers.

---

# Empty State

When table has no data:

Show empty state inside table area.

See 50_EMPTY_STATE.md for messages.

---

# Loading State

Show skeleton rows (5–10 rows) while data loads.

Skeleton columns match actual column widths.

---

# Mobile Behavior

Desktop columns collapse to card-style rows on mobile.

Each row becomes a small card:

Primary info (event, amount) is prominent.

Secondary info (date, status) is below.

Action link remains accessible.

---

# Export (Optional)

"Export CSV" action in table header.

Exports all rows, not just current page.

File name: `harmonix-activity-{date}.csv`

---

# Token Usage

Header background: `color-surface-elevated`

Header text: `font-body-sm`, `font-semibold`, `color-text-secondary`

Row text: `font-body`, `color-text-primary`

Row hover: `color-surface-elevated`

Amount positive: `color-success`

Amount negative: `color-danger`

Divider: `color-divider`

Row height: `spacing-table-row` (52px)

---

# React Props Interface

```tsx
interface TableColumn<T> {
  key: keyof T
  label: string
  type: 'text' | 'number' | 'date' | 'status' | 'action'
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  render?: (value: any, row: T) => ReactNode
}

interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
  pagination?: {
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
  }
  sortable?: boolean
  onSort?: (key: string, direction: 'asc' | 'desc') => void
}
```

---

# Accessibility

Table uses `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.

Column headers use `<th scope="col">`.

Sortable headers: `aria-sort="ascending"` / `"descending"` / `"none"`.

Pagination controls are keyboard accessible.

---

# Do Not

Do not use tables for primary navigation or discovery.

Do not make all columns sortable — only meaningful ones.

Do not display more than 8 columns on desktop.

Do not use tables where cards communicate better.

---

# Final Table Principle

Tables are records.

They answer: "What did I do? When? How much?"

A good table answers these questions

without making the user work to find them.

Readability is always the priority.

Density is never the goal.
