# Harmonix V2

# Button Component Specification

Version 2.0

---

# Purpose

Button is the primary interaction trigger in Harmonix.

Every user action begins with a Button.

Buttons communicate what will happen when pressed.

---

# Component Location

`shared/ui/Button`

---

# Philosophy

Buttons should be self-explanatory.

Users should never need to guess what a button does.

One primary action per visual area.

---

# Variants

## Primary

The main action for a section or flow.

Visual: Filled background, brand color.

Usage:

Confirm Deposit

Confirm Withdrawal

Connect Wallet

Explore Vaults

Rules:

Only one Primary button per visual section.

Never use two Primary buttons side by side.

---

## Secondary

An alternative or supporting action.

Visual: Outlined border, transparent background.

Usage:

View Details

Deposit More

Cancel (when cancel is a meaningful choice, not just dismissal)

---

## Ghost

Low-priority or utility action.

Visual: No border, no background. Text only with hover state.

Usage:

View All

Back

Learn More

View on Explorer

---

## Destructive

For irreversible or high-risk actions.

Visual: Red color scheme.

Usage:

Disconnect Wallet

Cancel Withdrawal (when cancellation has consequences)

Rules:

Always requires a confirmation step before execution.

Never appears as a primary action by default.

---

# Sizes

| Size | Height | Font Size | Padding H | Usage |
|------|--------|-----------|-----------|-------|
| Small | 32px | 13px | 12px | Inline actions, table rows |
| Medium | 40px | 14px | 16px | Default — most buttons |
| Large | 48px | 16px | 20px | Hero CTA, modal primary actions |

---

# States

## Default

Standard resting state.

---

## Hover

Slight background darkening or elevation change.

Transition: duration-fast (100ms), ease-standard.

---

## Active / Pressed

Scale down slightly: scale(0.98).

Transition: duration-fast (100ms).

---

## Disabled

Opacity: 40%.

Cursor: not-allowed.

No hover or active state.

Use `disabled` HTML attribute.

---

## Loading

Spinner replaces or precedes label.

Button remains the same size.

Disabled during loading (prevent double submission).

Loading label: e.g., "Depositing..." instead of just spinner.

---

# Icons in Buttons

Leading icon: icon before text (most common).

Trailing icon: icon after text (for navigation: "View Portfolio →").

Icon-only: only when action is universally understood. Requires `aria-label`.

---

# Full Width

Buttons can expand to full container width.

Used in:

Modal footers

Mobile action bars

Form submissions

---

# Copy Guidelines

Verb + noun format: "Confirm Deposit", "View Portfolio", "Join Campaign"

Never use generic labels: "Submit", "OK", "Yes"

Loading state: verb + "-ing": "Depositing...", "Processing..."

See 24_COPYWRITING_GUIDELINES.md for full rules.

---

# Accessibility

Minimum touch target: 44×44px (use padding to expand if needed).

Focus ring: visible, meets 3:1 contrast.

`disabled` attribute on disabled buttons (not just CSS).

`aria-label` for icon-only buttons.

`aria-busy="true"` for loading state.

Keyboard: Enter and Space both activate buttons.

---

# Button Groups

When multiple buttons appear together:

Primary is always rightmost (in LTR layouts).

Cancel / Back is always leftmost.

Never stack more than three buttons horizontally.

---

## Modal Footer Pattern

```
[ Cancel ]                    [ Confirm Action ]
```

---

## Two-Action Pattern

```
[ Secondary Action ]    [ Primary Action ]
```

---

# Token Usage

Background: `color-primary` (Primary variant)

Hover background: `color-primary-hover`

Border: `color-border-interactive` (Secondary variant)

Text: `color-text-on-primary` (Primary), `color-primary` (Secondary/Ghost)

Border radius: `radius-md`

Transition: `duration-fast`, `ease-standard`

Font weight: `font-semibold`

---

# React Props Interface

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  children: ReactNode
}
```

---

# Do Not

Do not create new button variants without updating this document.

Do not hardcode button colors.

Do not place two Primary buttons in the same section.

Do not use disabled buttons without explaining why elsewhere in the UI.

---

# Final Button Principle

A button is a promise.

It tells users what will happen.

Every button label should be so clear

that users never hesitate before pressing it.
