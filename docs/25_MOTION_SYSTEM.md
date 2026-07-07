# Harmonix V2

# Motion System

Version 2.0

---

# Purpose

This document defines how motion and animation work inside Harmonix V2.

Motion is not decoration.

Motion communicates state.

Every animation should help users understand what is happening.

If an animation does not serve a function, it should be removed.

---

# Motion Philosophy

One rule governs all motion decisions:

Motion explains.

Motion does not impress.

---

The correct question before adding any animation:

"Does this motion help the user understand something better?"

If no, remove it.

---

# Motion Principles

## Principle 1: Purposeful

Every animation exists for a reason.

Loading indicates waiting.

Progress indicates advancement.

Success indicates completion.

Error indicates something wrong.

---

## Principle 2: Calm

Motion should never feel urgent.

Harmonix is a financial product.

Calm motion creates calm users.

No bounces.

No overshoot.

No rapid flashes.

---

## Principle 3: Subtle

Users should feel motion without noticing it.

If a user comments on an animation, it is too prominent.

Good motion is invisible.

---

## Principle 4: Consistent

Every similar operation should animate the same way.

Deposit success and Withdraw success share the same pattern.

Consistency builds trust.

---

## Principle 5: Respectful

Always respect reduced motion preferences.

Users who prefer no motion should experience a fully functional product.

---

# Duration Tokens

| Token | Duration | Usage |
|-------|----------|-------|
| duration-fast | 100ms | Hover states, button presses |
| duration-normal | 200ms | Dropdowns, tooltips, badges |
| duration-slow | 300ms | Modals, drawers, page transitions |
| duration-xslow | 500ms | Success celebrations, onboarding |

Never exceed 500ms for UI transitions.

Long animations create frustration.

---

# Easing Tokens

| Token | Curve | Usage |
|-------|-------|-------|
| ease-standard | cubic-bezier(0.4, 0, 0.2, 1) | Most transitions |
| ease-enter | cubic-bezier(0, 0, 0.2, 1) | Elements entering the screen |
| ease-exit | cubic-bezier(0.4, 0, 1, 1) | Elements leaving the screen |
| ease-emphasized | cubic-bezier(0.2, 0, 0, 1) | Important state changes |

Never use linear easing for UI transitions.

Never use bouncy easing (spring physics) in financial interfaces.

---

# Animation Catalog

## Hover State

Duration: duration-fast (100ms)

Easing: ease-standard

Effect: Subtle elevation increase or background color shift

Used on: Cards, buttons, list items

---

## Button Press

Duration: duration-fast (100ms)

Easing: ease-standard

Effect: Slight scale down (scale 0.98)

Used on: All interactive buttons

---

## Dropdown Open

Duration: duration-normal (200ms)

Easing: ease-enter

Effect: Fade in + translate Y (−4px to 0)

Used on: Dropdown menus, select options

---

## Tooltip

Duration: duration-normal (200ms)

Easing: ease-enter

Effect: Fade in

Used on: All tooltip components

---

## Modal Enter

Duration: duration-slow (300ms)

Easing: ease-enter

Effect: Fade in + scale (0.96 to 1.0)

Backdrop: Fade in separately at duration-normal

---

## Modal Exit

Duration: duration-normal (200ms)

Easing: ease-exit

Effect: Fade out + scale (1.0 to 0.96)

---

## Drawer Slide In

Duration: duration-slow (300ms)

Easing: ease-enter

Effect: Translate X from 100% to 0 (right drawer)

---

## Drawer Slide Out

Duration: duration-normal (200ms)

Easing: ease-exit

Effect: Translate X from 0 to 100%

---

## Toast Entry

Duration: duration-slow (300ms)

Easing: ease-enter

Effect: Translate Y (20px to 0) + Fade in

---

## Toast Exit

Duration: duration-normal (200ms)

Easing: ease-exit

Effect: Fade out + translate Y (0 to −10px)

---

## Page Transition

Duration: duration-slow (300ms)

Easing: ease-standard

Effect: Fade in only

Never use slide transitions between pages.

Slides imply hierarchy that may not exist.

---

## Skeleton Loading

Duration: 1500ms loop

Easing: ease-standard

Effect: Shimmer gradient moving left to right

---

## Number Change (Portfolio Value)

Duration: duration-xslow (500ms)

Easing: ease-emphasized

Effect: Count up animation from previous value to new value

Used on: Portfolio Value, Total Earnings

---

## Success Confirmation

Duration: duration-xslow (500ms)

Easing: ease-emphasized

Effect:

1. Checkmark draws in (stroke animation)

2. Background circle scales in

3. Success message fades in

Used on: Deposit success, Withdraw submitted

---

## Timeline Step Transition

Duration: duration-slow (300ms)

Easing: ease-standard

Effect: Step indicator transitions from pending to active (color + scale)

Used on: Withdraw Timeline, Deposit Progress

---

## Notification Badge

Duration: duration-normal (200ms)

Easing: ease-enter

Effect: Scale from 0 to 1 when new notification arrives

---

# Reduced Motion

When `prefers-reduced-motion: reduce` is active:

Remove all transitions and animations.

Replace count-up animations with instant value display.

Replace skeleton shimmer with static gray.

Replace slide/scale transitions with instant opacity change (fade only, if any).

All functionality must remain accessible.

---

# What to Avoid

No floating cards or elements.

No continuous looping decorative animations.

No animated backgrounds.

No parallax effects.

No spinning logos.

No particle effects.

These feel like gaming interfaces, not financial products.

---

# Framer Motion Implementation Notes

Use `AnimatePresence` for mount/unmount animations.

Use `layout` prop for size transitions.

Use `variants` for consistent animation patterns across components.

Never define animation values inline — use tokens.

---

# Final Motion Principle

The best motion in Harmonix is motion users never consciously notice.

They simply feel that the product responds smoothly and confidently.

That feeling builds trust.

Trust drives retention.
