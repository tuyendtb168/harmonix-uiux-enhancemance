# Harmonix V2

# Card Component Specification

Version 2.0

---

# Purpose

Card is the primary content container in Harmonix.

Cards group related information.

Every card answers one question.

---

# Component Location

`shared/ui/Card`

---

# Philosophy

Cards are containers.

Not decorations.

A card should have one clear purpose.

If a card contains unrelated content, split it.

---

# Card Variants

## Default Card

Standard content grouping.

White background.

Subtle border.

Small shadow.

Usage:

Stat groups

Summary sections

Information panels

---

## Elevated Card

Draws more visual attention.

Stronger shadow.

Usage:

Portfolio Summary

Featured sections

Primary information cards

---

## Interactive Card

Clickable or hoverable.

Shows cursor pointer.

Hover: slight elevation increase + background shift.

Active: scale(0.99).

Usage:

Vault Cards

Campaign Cards

Position Cards

---

## Status Card

Contains state-specific visual treatment.

Border color reflects status:

Blue — Informational

Green — Success / Completed

Orange — Processing / Warning

Red — Error / Failed

Gray — Neutral / Pending

Usage:

Pending Withdrawal

Notification items

Alert cards

---

# Card Anatomy

```
┌──────────────────────────────────────────────────┐
│  CARD HEADER (optional)                          │
│  [ Title ]                    [ Action / Badge ] │
├──────────────────────────────────────────────────┤
│                                                  │
│  CARD BODY                                       │
│  [ Primary Content ]                             │
│                                                  │
├──────────────────────────────────────────────────┤
│  CARD FOOTER (optional)                          │
│  [ Secondary Info ]           [ CTA ]            │
└──────────────────────────────────────────────────┘
```

---

# Sizes

| Padding | Usage |
|---------|-------|
| Small (16px) | Compact cards, list items |
| Medium (24px) | Default — most cards |
| Large (32px) | Feature cards, portfolio summary |

---

# States

## Default

Standard resting state.

---

## Hover (Interactive only)

Shadow increases.

Background shifts slightly.

Transition: duration-fast (100ms), ease-standard.

---

## Active / Pressed (Interactive only)

Scale: 0.99.

---

## Loading

Card body replaced with skeleton content.

Card header and footer remain as skeleton too if async.

---

## Error

Card shows error state instead of content.

See 62_ERROR_HANDLING.md.

---

# Card Header

Optional.

Contains:

Title (left-aligned, Heading M)

Optional action (right-aligned, Ghost button or text link)

Optional badge (right-aligned)

---

# Card Footer

Optional.

Contains:

Secondary information (left-aligned)

CTA or navigation link (right-aligned)

Divider separates footer from body.

---

# Nesting Rules

Cards should not be nested more than one level deep.

Bad:

Card > Card > Card

Good:

Card > List Items (not cards)

Card > Stat Rows (not cards)

---

# Divider Usage

Dividers can separate sections inside a card.

Use sparingly.

Maximum two dividers per card.

Never use dividers as decoration.

---

# Token Usage

Background: `color-surface`

Border: `color-border`

Shadow (Default): `shadow-sm`

Shadow (Elevated): `shadow-md`

Shadow (Interactive hover): `shadow-lg`

Border radius: `radius-lg`

Padding: `spacing-card` (24px default)

---

# React Props Interface

```tsx
interface CardProps {
  variant?: 'default' | 'elevated' | 'interactive' | 'status'
  status?: 'info' | 'success' | 'warning' | 'error' | 'neutral'
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  loading?: boolean
  className?: string
  children: ReactNode
}
```

---

# Composition Pattern

Cards use slots for header, body, and footer.

```tsx
<Card variant="elevated">
  <Card.Header title="Your Portfolio" action={<Button variant="ghost">View All</Button>} />
  <Card.Body>
    {/* content */}
  </Card.Body>
  <Card.Footer>
    {/* footer */}
  </Card.Footer>
</Card>
```

Or simple children composition:

```tsx
<Card>
  <PortfolioSummaryContent />
</Card>
```

---

# Accessibility

Interactive cards must be keyboard focusable.

Interactive cards need `role="button"` or use `<button>` wrapper.

`aria-label` for cards that contain no visible title.

Focus ring visible on interactive cards.

---

# Do Not

Do not put navigation inside a card that already has an onClick.

Do not use cards for table rows (use TableRow instead).

Do not mix multiple unrelated topics in one card.

Do not hardcode card dimensions.

---

# Final Card Principle

Cards create visual structure.

But structure exists to serve content.

If the card does not make the content easier to understand,

remove the card.
