# Harmonix V2

# Accessibility

Version 2.0

---

# Purpose

This document defines the accessibility requirements for Harmonix V2.

Accessibility is not optional.

Accessibility is part of the definition of done.

Every screen, component, and interaction must meet the standards defined here.

---

# Standard

Harmonix V2 targets WCAG 2.1 Level AA compliance.

This covers:

Perceivable

Operable

Understandable

Robust

---

# Why Accessibility Matters for Harmonix

Financial software that excludes users with disabilities is not professional.

Accessibility improves usability for all users.

Keyboard navigation benefits power users.

High contrast benefits users in bright environments.

Reduced motion benefits users prone to motion sickness.

Clear labels benefit users using translation tools.

---

# Color and Contrast

## Minimum Contrast Ratios

Normal text: 4.5:1

Large text (18px+ or 14px+ bold): 3:1

UI components and graphical elements: 3:1

---

## Rules

Never communicate information using color alone.

Always pair color with:

Icon

Label

Pattern

Example

Bad: Red badge = Failed

Good: Red badge with ✕ icon + "Failed" label

---

## Color Blindness

The color system must remain functional for:

Deuteranopia (red-green)

Protanopia (red)

Tritanopia (blue-yellow)

Charts must use patterns or labels in addition to color.

---

# Typography

Minimum body font size: 14px

Minimum label font size: 12px

Line height: minimum 1.5× font size for body text

Letter spacing: never negative for body text

---

# Focus Management

Every interactive element must have a visible focus indicator.

Focus ring must meet 3:1 contrast against background.

Focus order must follow visual reading order (left to right, top to bottom).

---

## Modal Focus

When a modal opens, focus moves to the modal.

When a modal closes, focus returns to the trigger element.

Tab key cycles only within open modal (focus trap).

---

## Drawer Focus

Same rules as Modal.

Focus traps inside open drawer.

Escape key always closes drawer.

---

# Keyboard Navigation

All functionality must be operable via keyboard.

| Key | Action |
|-----|--------|
| Tab | Move to next interactive element |
| Shift + Tab | Move to previous interactive element |
| Enter | Activate button or link |
| Space | Toggle checkbox, activate button |
| Escape | Close modal, drawer, dropdown |
| Arrow keys | Navigate within dropdown, tabs, timeline |
| Home / End | Jump to first/last item in list |

---

# Screen Reader Support

## Semantic HTML

Use correct HTML elements.

`<button>` for actions

`<a>` for navigation

`<nav>` for navigation regions

`<main>` for primary content

`<header>`, `<footer>` for landmarks

Never use `<div>` or `<span>` as interactive elements without ARIA.

---

## ARIA Usage

Use ARIA only when native HTML is insufficient.

Common patterns:

`aria-label` — for icon-only buttons

`aria-describedby` — for form inputs with helper text

`aria-live` — for dynamic content (notifications, loading states)

`aria-expanded` — for dropdowns and accordions

`aria-current` — for active navigation item

`aria-busy` — for loading regions

---

## Live Regions

Toast notifications: `aria-live="polite"`

Error messages: `aria-live="assertive"`

Loading status: `aria-live="polite"` + `aria-busy="true"`

---

# Form Accessibility

Every input must have an associated label.

Error messages must be programmatically associated with their input using `aria-describedby`.

Required fields must be marked with `aria-required="true"`.

Never rely on placeholder text as a label.

Group related inputs with `<fieldset>` and `<legend>`.

---

# Images and Icons

Decorative icons: `aria-hidden="true"`

Functional icons (icon-only buttons): `aria-label` on the button

Informational images: `alt` text describing the content

Charts: provide a text summary or data table alternative

---

# Interactive Components

## Button

Must have accessible name.

If icon-only: use `aria-label`.

Disabled buttons: use `disabled` attribute (not just styling).

Loading buttons: use `aria-disabled="true"` + `aria-label` with loading context.

---

## Modal

Role: `dialog`

Must have `aria-labelledby` pointing to modal title.

Must have `aria-modal="true"`.

Focus trap required.

---

## Drawer

Same as Modal.

---

## Dropdown

Role: `listbox` or `menu` depending on use.

Items use `role="option"` or `role="menuitem"`.

Keyboard navigation with arrow keys.

---

## Tabs

Tab list: `role="tablist"`

Each tab: `role="tab"` + `aria-selected`

Tab panel: `role="tabpanel"` + `aria-labelledby`

---

## Timeline

Use ordered list `<ol>` for timeline items.

Each step announces its status to screen readers.

---

# Loading States

Never block the page for loading.

Show meaningful loading text for screen readers.

Example:

```html
<span aria-live="polite" aria-label="Loading your portfolio...">
  <Skeleton />
</span>
```

---

# Motion and Animation

Respect `prefers-reduced-motion: reduce`.

All animations must degrade gracefully.

No essential information should be communicated through animation alone.

See 25_MOTION_SYSTEM.md for reduced motion implementation.

---

# Responsive and Touch

Minimum touch target size: 44×44px

Touch targets must have adequate spacing.

All desktop functionality must be accessible on mobile.

---

# Testing Requirements

Before any feature ships:

□ Keyboard navigation works end-to-end

□ Focus indicator visible on all interactive elements

□ Screen reader announces state changes

□ Color contrast passes WCAG AA

□ Works with prefers-reduced-motion enabled

□ All form errors are programmatically announced

□ Modal/drawer focus trap works correctly

---

# Recommended Testing Tools

axe DevTools — automated WCAG checks

VoiceOver (macOS/iOS) — screen reader testing

NVDA (Windows) — screen reader testing

Lighthouse Accessibility Audit — overview check

Colour Contrast Analyser — manual contrast verification

---

# Final Accessibility Principle

Accessibility is not a feature.

It is a quality standard.

A product that excludes users based on ability is not a professional product.

Every interaction in Harmonix should be available to every user.
