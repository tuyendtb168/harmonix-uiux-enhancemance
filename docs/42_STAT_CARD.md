# Harmonix V2

# Stat Card Component Specification

Version 2.0

---

# Purpose

Stat Card displays a single important metric with its label.

Stat Cards communicate financial status at a glance.

Numbers are the product.

Stat Card makes numbers readable.

---

# Component Location

`shared/ui/StatCard`

---

# Philosophy

One metric per Stat Card.

The value must visually dominate.

The label must be readable but secondary.

Never crowd a Stat Card with extra data.

---

# Anatomy

```
┌──────────────────────────────────────┐
│  Label                               │
│                                      │
│  Value                               │
│                                      │
│  Change Indicator  (optional)        │
│  Sub-label         (optional)        │
└──────────────────────────────────────┘
```

---

# Elements

## Label

Short descriptive text above the value.

Examples: "Portfolio Value", "Current APY", "Total Earnings"

Font: Body Small, Text Secondary color.

---

## Value

The primary number or metric.

Examples: "$128,450", "12.4%", "$4,820"

Font: Display or Heading XL depending on context.

Font weight: Bold or Semibold.

Color: Text Primary.

---

## Change Indicator (Optional)

Shows positive or negative change.

Format: "+$1,240 (2.4%)" or "-$320 (1.1%)"

Positive: Green color + up arrow icon.

Negative: Red color + down arrow icon.

Neutral / No Change: Gray, no arrow.

---

## Sub-label (Optional)

Additional context below the value.

Examples: "This month", "vs. last week", "Weighted average"

Font: Caption, Text Muted color.

---

# Sizes

| Size | Value Font | Usage |
|------|-----------|-------|
| Large | Display (36px+) | Primary portfolio metric |
| Medium | Heading XL (24px) | Standard dashboard metric |
| Small | Heading M (18px) | Secondary metrics, sidebar |

---

# Variants

## Default

White background, subtle border.

Used in: stat rows, dashboard sections.

---

## Elevated

Stronger shadow.

Used in: primary portfolio summary, hero sections.

---

## Minimal

No border, no background.

Used in: inside other cards, inline metrics.

---

# Color Variants for Values

| Context | Color |
|---------|-------|
| Standard value | Text Primary |
| Positive metric (earnings, APY) | Success (Green) |
| Negative metric (loss) | Danger (Red) |
| Pending / Processing | Warning (Orange) |
| Muted / Unknown | Text Muted |

Rules:

Only use semantic colors when the metric has a clear positive/negative meaning.

Portfolio Value is always Text Primary (not green/red — it fluctuates).

Total Earnings is green (always positive).

---

# Loading State

Value replaces with skeleton (right-aligned, matching value width).

Label skeleton (short bar).

Change indicator skeleton (optional).

---

# Animation

When value updates:

Count-up animation from previous value to new value.

Duration: duration-xslow (500ms).

Easing: ease-emphasized.

Only animate if the change is triggered by user action or data refresh.

Never animate on initial load — just show the value.

---

# Usage in Context

## Portfolio Summary (4 Stat Cards)

```
[ Portfolio Value ]  [ Total Earnings ]  [ Current APY ]  [ Pending Withdrawals ]
     $128,450            +$4,820            12.4%              $5,000
```

All four cards equal width.

Portfolio Value uses the Large size.

Others use Medium size.

---

## Vault Detail Key Metrics

```
[ Current APY ]  [ TVL ]  [ Capacity ]  [ Inception ]
    12.4%          $2.1M     78% full     Jan 2024
```

---

## Sidebar Quick Stats

Use Small size.

Minimal variant (no card border).

---

# Token Usage

Label: `font-body-sm`, `color-text-secondary`

Value: `font-display` or `font-heading-xl`, `color-text-primary`

Change positive: `color-success`, `font-body-sm`

Change negative: `color-danger`, `font-body-sm`

Sub-label: `font-caption`, `color-text-muted`

Background: `color-surface` (default) or transparent (minimal)

Border: `color-border` (default) or none (minimal)

Border radius: `radius-lg`

Padding: `spacing-card`

---

# React Props Interface

```tsx
interface StatCardProps {
  label: string
  value: string | number
  formattedValue?: string        // pre-formatted display string
  change?: {
    value: string
    direction: 'up' | 'down' | 'neutral'
  }
  subLabel?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'elevated' | 'minimal'
  valueColor?: 'default' | 'success' | 'danger' | 'warning' | 'muted'
  loading?: boolean
  animate?: boolean
}
```

---

# Accessibility

Value and label must always be readable by screen readers together.

`aria-label` on the card: "{label}: {formattedValue}"

Change indicator includes direction in aria: "up 2.4%" or "down 1.1%"

Do not rely on color alone to communicate positive/negative — use icons.

---

# Do Not

Do not put multiple metrics in one Stat Card.

Do not use Stat Card for non-numeric information.

Do not truncate values — always format for readability ($1.2M not $1,234,567).

Do not animate on every render — only on meaningful value changes.

---

# Final Stat Card Principle

Numbers build confidence.

A clearly displayed number — large, readable, correctly labeled —

is one of the most powerful trust signals in financial software.

Never let a label overshadow its value.

The number is the message.
