# Harmonix V2

# Rewards Page Specification

Version 3.0 — Updated to reflect implementation

---

# Purpose

Rewards is the retention center.

Rewards answers one question: "What have I earned beyond yield?"

Rewards is supplementary to the core product. Yield is the product. Rewards reinforce engagement.

---

# Primary Intent

Celebrate participation. Show progress. Motivate continued investment.

---

# Route

`/rewards`

Deep-link to a specific tab: `/rewards?tab=history` | `/rewards?tab=campaigns`

---

# Page Layout

```
┌──────────────────────────────────────────────────────┐
│                   TOP NAVIGATION                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  PAGE HEADER                                         │
│  "Rewards"                                           │
│  "Track your points, rewards, and campaigns          │
│   across Harmonix and our partners."                 │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  SUMMARY CARD (single wide card, 3 sections)         │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  TABS: My Points | History [N] | Campaigns           │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  TAB CONTENT                                         │
│                                                      │
├──────────────────────────────────────────────────────┤
│                   FOOTER                             │
└──────────────────────────────────────────────────────┘
```

---

# Summary Card

Single full-width card divided into 3 sections separated by vertical dividers.

## Section 1: Total Points

- Label: "Total Points"
- Value: total accumulated points (large, prominent)
- Sub-row: "Available to claim" label + points value (green) + "Claim all" button
- No USD estimate shown

## Section 2: Harmonix Points

- Label: "Harmonix Points"
- Value: Harmonix-sourced points only
- Change: "+X,XXX (24h)" in green

## Section 3: Points from Partners

- Label: "Points from Partners"
- Value: total partner-sourced points
- Change: "+X,XXX (24h)" in green
- Partner avatars: stacked circles (up to 4 visible, +N overflow)

## Decorative Element

Gift illustration on far right, visible on xl screens only. Purely decorative, aria-hidden.

---

# Tabs

Three tabs in order:

| Tab | Label | Notification |
|-----|-------|-------------|
| 1 | My Points | — |
| 2 | History | Green badge with count when claimable items exist |
| 3 | Campaigns | — |

The History tab shows a green numeric badge when there are unclaimed (status = "claimable") items in the history. Badge disappears when all items are claimed.

Deep-link support: `?tab=history` or `?tab=campaigns` in the URL opens that tab directly on page load.

---

# Tab 1: My Points

## Section A: Breakdown of your points

Card containing a donut chart and point source breakdown.

### Period Selector

6 filter options (pill buttons, inside the card):

| Option | Description |
|--------|-------------|
| All time | Cumulative total since account creation |
| Last 30 days | Rolling 30-day window |
| This month | Current calendar month |
| Last month | Previous calendar month |
| Last 7 days | Rolling 7-day window |
| This week | Current calendar week |

Each period has its own data set. Switching period updates the chart and table instantly.

### Donut Chart

- Inner label: total points for selected period (abbreviated, e.g. "72K")
- Sub-label: "Total points"
- No fixed width — uses ResponsiveContainer

### Breakdown List

One row per source:

| Column | Content |
|--------|---------|
| Color dot | Matches chart segment |
| Name | Source name (e.g. "Harmonix Points") |
| Points | Absolute value for selected period |
| Percent | % of total for selected period |

### How you earn points

Separate card to the right of the breakdown card (side-by-side on xl screens, stacked below on smaller screens).

Three items:
1. Deposit to Harmonix vaults → Earn Harmonix points
2. Deposit assets (USDC, USDT, HYPE) → Harmonix farms and shares partner points
3. Farm haAssets on Pendle → Earn partner points directly

---

## Section B: Your positions that generate points

Table. Label: "Your positions that generate points".

### Columns

| Column | Description |
|--------|-------------|
| Product | Product name + type (Harmonix Vault / Pendle Farm) with icon |
| Type | "Deposit" |
| Assets | Asset token with color dot |
| Your Balance | Token amount + USD value |
| Points (All time) | Total points earned + source name |
| Vault Share | User's % ownership in the vault |
| Last Updated | Time since last points update, with clock icon |
| Action | "View" button → navigates to History tab |

Removed columns: Pending, APY / Rate, Token Distributed.

### Overflow

Horizontally scrollable on small screens.

---

## Section C: Points from Partners

Label: "Points from Partners".

### Status Filter

Two pill buttons above the cards:

- **Active** (default) — partners currently earning points
- **Inactive** — partners no longer distributing points

Each pill shows a count badge. Default view shows Active only.

### Partner Card Content

| Element | Description |
|---------|-------------|
| Avatar | Colored circle with first letter |
| Name | Partner name |
| Status badge | "Active" (green) or "Inactive" (grey) |
| Points | Total points from this partner |
| Monthly change | "+X.XX% this month" (green) or "No change this month" |
| From vaults | "From N vaults" — hovering shows tooltip with vault names |
| Token badges | Vault asset tokens |
| Points updated | Bottom of card, below divider: "Points updated: X mins ago" |

Removed: USD value (~$XX.XX), "View details" button.

### Layout

Desktop: 4 columns. Tablet: 2 columns. Mobile: 1 column.

---

## Section D: Achievements

Badge grid showing milestones.

Layout: 3 columns on mobile, 6 columns on desktop.

### Badge States

**Unlocked:**
- Colored icon ring (primary tint)
- Green checkmark in corner
- Earned date below title

**Locked:**
- Greyed out (40% opacity)
- Lock icon in corner
- Requirement text below title

### Achievement List

| Achievement | Trigger |
|------------|---------|
| First Deposit | Made first vault deposit |
| Campaign Participant | Joined first campaign |
| $10K Investor | Reached $10K total vault value |
| First Withdrawal | Completed first withdrawal |
| 6-Month Investor | Held position for 6 continuous months |
| $50K Investor | Reached $50K total vault value |

---

## Section E: Footer Note

Bottom of My Points tab. Shows:

- Shield icon + "Points are updated every 10 minutes."
- "Partner points are subject to the distribution rules of each partner."
- "Learn more about points →" link (right-aligned)

---

# Tab 2: History

Label: "Recent activities"

## Filters

Two dropdowns in the top-right corner:

| Filter | Options |
|--------|---------|
| All sources | All sources / Harmonix / Valantis / Kinetiq / Hyperlend / Pendle |
| All types | All types / Deposit / Campaign / Achievement / Referral |

## Table Columns

| Column | Alignment | Description |
|--------|-----------|-------------|
| TIME | Left | Full datetime: "Jun 25, 2026 16:10" |
| SOURCE | Left | Colored avatar + partner name |
| ACTIVITY | Left | Human-readable description of the event |
| POINTS | Right | "+XXX pts" in green |
| STATUS | Right | Status badge |

## Status Badge Styles

| Status | Style |
|--------|-------|
| Claimable | Green outline, green text, green tint bg |
| Claimed | Grey outline, muted text, muted bg |
| Pending | Yellow outline, yellow text, yellow tint bg |

## Event Types

| eventType | Example activity |
|-----------|-----------------|
| points_earned_deposit | "Deposit 5,000 USDC to haUSDC Core" |
| points_earned_campaign | "Strategy yield from haUSDC" |
| campaign_joined | "Joined campaign — Delta Neutral Boost" |
| campaign_completed | "Campaign completed — Early Adopter Bonus" |
| achievement_unlocked | "Achievement unlocked — $10K Investor" |

## Empty State

When no activities match the filter: "No activities match the selected filters."

When no history at all: "Your reward history will appear here once you start earning."

## Deep-link Behavior

Navigating to `/rewards?tab=history` opens the History tab directly. Used by the "Reward available to claim" notifications on Home and Portfolio pages.

---

# Tab 3: Campaigns

## Header Row

Left: "Active Campaigns" heading with Megaphone icon.
Right: "Browse All" / "Show Active Only" toggle button.

## Default View

Shows only campaigns with status = "active". Toggle to "Browse All" shows active + ended.

## Campaign Card Content

| Element | Description |
|---------|-------------|
| Name | Campaign name |
| Description | One sentence summary |
| Multiplier badge | e.g. "2× Points" (hidden when ended) |
| Dates | Start → End date |
| Eligibility | Requirement text |
| Progress bar | Shown only for enrolled campaigns (not ended) |
| Progress label | e.g. "620 / 1,000 pts" |
| CTA | See table below |

## Campaign Card CTA

| State | Display |
|-------|---------|
| Active, Enrolled | Green checkmark + "Enrolled" text |
| Active, Not Enrolled | "Join Campaign" button |
| Ended | "Ended" badge only, no CTA |

## Layout

Desktop: 2 columns. Tablet: 1 column. Mobile: 1 column.

## Empty State

When no active campaigns and showing active only: `<EmptyState context="campaigns" />`

---

# Loading States

| Section | Skeleton |
|---------|---------|
| Summary card | 3 skeleton blocks in horizontal layout |
| Breakdown chart | Circular skeleton + 5 row skeletons |
| Positions table | 4 row skeletons with cell placeholders |
| Partner cards | 4 card skeletons |
| Achievements | 6 circle skeletons |
| History table | 5 row skeletons |
| Campaign cards | 2 card skeletons |

---

# Error State

Full-page `<ErrorState>` with "Could not load your rewards." message and retry button.

---

# Page State: Connected, No Rewards

Summary card shows zero values. Empty states for history and campaigns. "Explore Vaults" CTA on history empty state.

---

# Navigation Cross-links

| Source | Link | Destination |
|--------|------|------------|
| Home — "Reward available to claim" → Claim now | `/rewards?tab=history` | History tab |
| Portfolio — "Reward available to claim" → Claim now | `/rewards?tab=history` | History tab |
| Positions table — "View" button | In-page | History tab |

---

# Success Criteria

User understands their total points split between Harmonix and partners.

User can trace exactly which positions generate which points.

User sees unclaimed rewards as a green badge on the History tab.

User knows how to earn more (How you earn points panel).

Rewards feel like a bonus, not the reason to use Harmonix.

---

# Failure States

Rewards dominate attention over yield.

Page feels like a game instead of a financial product.

Users chase rewards instead of understanding investment value.

---

# Final Rewards Principle

Rewards exist to celebrate and retain. They are a thank-you, not a manipulation mechanism.

Harmonix is a yield platform. Rewards are a complement.
