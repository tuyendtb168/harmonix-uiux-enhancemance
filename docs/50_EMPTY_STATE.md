# Harmonix V2

# Empty State Component Specification

Version 2.0

---

# Purpose

Empty State communicates the absence of content in a way that is helpful, not disappointing.

Every empty state teaches users what to do next.

Empty states are onboarding opportunities.

---

# Component Location

`shared/ui/EmptyState`

---

# Philosophy

"No data" is never an acceptable empty state.

Every empty state answers:

Why is this empty?

What can the user do about it?

---

# Anatomy

```
        ┌─────────────────────────────────────────┐
        │                                         │
        │          [ Illustration or Icon ]        │
        │                                         │
        │          Primary Message                │
        │                                         │
        │          Supporting Message             │
        │                                         │
        │          [ Primary CTA ]                │
        │          [ Secondary CTA (optional) ]   │
        │                                         │
        └─────────────────────────────────────────┘
```

---

# Elements

## Illustration or Icon

Icon: 48px, neutral color.

Illustration: optional, simple line-style.

Context-appropriate.

Never use generic icons for all empty states.

---

## Primary Message

Clear statement of what is missing.

Font: Heading M.

Color: Text Primary.

One sentence.

---

## Supporting Message

Explains what to do.

Font: Body.

Color: Text Secondary.

One to two sentences.

---

## Primary CTA

Direct action to fill the empty state.

Variant: Primary button.

---

## Secondary CTA (Optional)

Alternative or informational action.

Variant: Ghost button or text link.

---

# Empty State Catalog

## 1. No Positions (Portfolio)

Icon: wallet or chart icon

Primary: "You haven't invested in any vaults yet."

Supporting: "Explore available strategies and start earning yield today."

CTA: "Explore Vaults" → /earn

---

## 2. No Activity History (Portfolio)

Icon: activity / history icon

Primary: "No activity yet."

Supporting: "Your deposit and withdrawal history will appear here."

CTA: None (informational only)

---

## 3. No Notifications

Icon: bell icon

Primary: "You're all caught up."

Supporting: "We'll notify you when something important happens."

CTA: None

---

## 4. No Rewards

Icon: star or gift icon

Primary: "No rewards yet."

Supporting: "Start investing to earn HMX points. Join an active campaign to earn more."

CTA: "Explore Campaigns" → /rewards

---

## 5. No Campaigns

Icon: megaphone icon

Primary: "No active campaigns right now."

Supporting: "New campaigns are announced regularly. Check back soon."

CTA: None

---

## 6. No Search Results (Earn)

Icon: search icon

Primary: "No vaults match your filters."

Supporting: "Try adjusting your search or clearing your filters."

CTA: "Clear Filters"

---

## 7. No Reward History

Icon: history icon

Primary: "No reward history yet."

Supporting: "Your earned points will appear here once you start participating."

CTA: None

---

## 8. Wallet Not Connected (Any page requiring auth)

Icon: wallet icon

Primary: "Connect your wallet to continue."

Supporting: "Connect your wallet to view your portfolio, positions, and rewards."

CTA: "Connect Wallet"

---

## 9. No Pending Withdrawals (Portfolio sidebar)

This is a silent empty state — the section is hidden entirely.

Not an empty state component.

When no pending withdrawals: remove the section from view.

---

## 10. Vault at Capacity

Icon: lock or vault icon

Primary: "This vault is currently at capacity."

Supporting: "No new deposits are being accepted. Check back later or explore other vaults."

CTA: "View Other Vaults" → /earn

---

## 11. Vault Paused

Icon: pause icon

Primary: "Deposits are temporarily paused."

Supporting: "This vault is undergoing maintenance. Explore other available vaults."

CTA: "View Other Vaults" → /earn

---

## 12. Data Load Error (Fallback)

Icon: warning icon

Primary: "Unable to load this content."

Supporting: "Please try refreshing the page. If the issue persists, contact support."

CTA: "Refresh"

Secondary CTA: "Contact Support"

---

# Sizes

## Default

Centered vertically in its container.

Padding: spacing-xl (48px) top and bottom.

Used in: full page sections, large card bodies.

---

## Compact

Smaller icon and text.

Padding: spacing-lg (32px) top and bottom.

Used in: small cards, sidebar sections, table empty states.

---

# Placement Rules

Empty state occupies the full area of its container.

Content is always centered horizontally.

On pages: centered vertically in the main content area.

In cards: centered within the card body.

In tables: shown inside the table area, spanning all columns.

---

# Animation

Empty state fades in when content area resolves as empty.

Duration: duration-normal (200ms).

Never animate on first render — only after a data fetch resolves empty.

---

# Token Usage

Icon: 48px, `color-text-muted`

Primary message: `font-heading-m`, `color-text-primary`

Supporting message: `font-body`, `color-text-secondary`

Max width: 360px (prevents overly wide text on large screens)

Padding: `spacing-xl` default, `spacing-lg` compact

---

# React Props Interface

```tsx
interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  primaryAction?: {
    label: string
    onClick?: () => void
    href?: string
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
    href?: string
  }
  size?: 'default' | 'compact'
}
```

---

# Accessibility

Empty states must be announced when they appear dynamically.

Use `aria-live="polite"` on the container that switches from loading → empty.

Primary and secondary CTAs are standard accessible buttons/links.

---

# Do Not

Do not use "No data" as a message.

Do not show an empty state while still loading.

Do not use the same empty state across different contexts.

Do not show an empty state with no guidance.

---

# Final Empty State Principle

An empty state is an opportunity.

The product just told the user something is missing.

The product must also tell them how to fix it.

Every empty state should leave users feeling:

"I know what to do next."

Never:

"I don't know what happened."
