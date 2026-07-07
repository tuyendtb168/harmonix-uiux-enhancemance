# Harmonix V2

# Chart Component Specification

Version 2.0

---

# Purpose

Chart visualizes data trends over time.

Charts answer one question: "How is this changing?"

Charts do not replace exact numbers.

Charts complement them.

---

# Component Location

`shared/ui/Chart`

Implementation: Recharts (see 00_PROJECT.md tech stack)

---

# Philosophy

Charts communicate trends.

Not exact values.

If a user needs exact values, show a number.

If a user needs to understand direction, show a chart.

Simple.

Minimal.

Readable.

---

# Chart Types

## Line Chart

Purpose: Show change over time.

Usage: Portfolio Value history, APY history.

---

## Area Chart

Purpose: Show cumulative value or volume.

Usage: Portfolio growth (area emphasizes accumulation).

---

## Bar Chart

Purpose: Show discrete values over periods.

Usage: Monthly yield, activity volume.

---

## Donut Chart

Purpose: Show proportional distribution.

Usage: Portfolio allocation, vault strategy allocation.

---

# Chart Variants in Harmonix

## 1. Portfolio Performance Chart

Type: Area chart

Data: Portfolio value over time

Used in: Portfolio page

Time filters: 7D / 30D / 90D / All Time

Optional overlay: Total Deposited (as a line) to show earnings gap

---

## 2. APY History Chart

Type: Line chart

Data: APY percentage over time

Used in: Vault Detail page

Time filters: 7D / 30D / 90D / All Time

---

## 3. Allocation Donut Chart

Type: Donut chart

Data: Capital distribution across strategies or vaults

Used in: Portfolio page (allocation section), Vault Detail

Max segments: 6 (group smaller into "Other")

---

## 4. Rewards Chart (Future)

Type: Bar chart

Data: Points earned per period

Used in: Rewards page

---

# Visual Rules

## Color

Charts must be readable in grayscale.

Use semantic colors where meaningful.

Portfolio value line: Primary color (brand blue).

Total deposited line (if shown): Neutral gray.

Positive area fill: Light green.

Donut segments: Use chart token palette.

---

## Grid

Light, subtle grid lines.

Color: `chart-grid` token.

Never dark or prominent grid lines.

---

## Axes

Y-axis: formatted values ($1K, $10K, $100K) or percentages.

X-axis: dates/times formatted contextually.

7D: "Mon", "Tue", "Wed" ...

30D: "Jan 1", "Jan 7", "Jan 14" ...

90D: "Jan", "Feb", "Mar" ...

Never show raw timestamps on axes.

---

## Tooltips

Show on hover / touch.

Tooltip content:

Date/time

Value (formatted: $12,450 or 12.4%)

Any secondary series value.

Tooltip style: small card, white background, subtle shadow.

---

## Legends

Required when chart has 2+ series.

Position: below chart (not inside chart area).

---

# Responsive Behavior

Charts are fluid — fill container width.

Minimum height: 200px.

Default height: 300px (can vary by context).

On mobile: slightly reduced height (220px).

Y-axis labels: hidden on mobile (tooltips still work).

---

# Loading State

Chart area replaced with skeleton (large rectangle).

Skeleton should match the chart's aspect ratio.

Never show empty axes while loading.

---

# Empty State

When no data is available:

Show empty chart area with message inside:

"No data available for this period."

---

# Performance

Charts lazy load.

Never block above-fold content.

Charts are the most expensive renders — always defer.

Use `React.lazy` or equivalent.

---

# Accessibility

Charts provide a text alternative summary.

Example: "Portfolio grew from $5,000 to $12,450 over the selected period."

Interactive tooltips accessible via keyboard (arrow keys navigate data points).

Charts use `role="img"` with `aria-label` describing the chart.

Donut charts include data in a visually hidden table as fallback.

Colors never carry meaning alone — always paired with labels.

---

# Token Usage

Primary line: `chart-primary-line`

Secondary line: `chart-secondary-line`

Area fill: `chart-positive-fill` (gradient, semi-transparent)

Grid: `chart-grid`

Axis labels: `font-caption`, `color-text-muted`

Tooltip background: `color-surface`

Tooltip border: `color-border`

Donut segments: `chart-segment-1` through `chart-segment-6`

---

# React Props Interface

```tsx
interface LineChartProps {
  data: ChartDataPoint[]
  series: ChartSeries[]
  timeFilter?: '7d' | '30d' | '90d' | 'all'
  onTimeFilterChange?: (filter: string) => void
  height?: number
  loading?: boolean
  emptyMessage?: string
  formatValue?: (value: number) => string
  formatDate?: (date: string) => string
}

interface DonutChartProps {
  data: DonutSegment[]
  loading?: boolean
  emptyMessage?: string
  centerLabel?: string
  centerValue?: string
}
```

---

# Do Not

Do not use charts as the primary source of exact values.

Do not use more than 3 data series in a single line/area chart.

Do not use more than 6 segments in a donut chart.

Do not add decorative colors or gradients beyond the token palette.

Do not add 3D effects.

Do not animate charts continuously — animate only on load or filter change.

---

# Final Chart Principle

A chart should make a trend immediately obvious.

If the user needs to study a chart to understand it,

the chart has failed.

The best chart is the one users glance at

and immediately think:

"My portfolio is growing."

"APY is stable."

"My capital is well distributed."

One clear insight per chart.
