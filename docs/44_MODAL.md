# Harmonix V2

# Modal Component Specification

Version 2.0

---

# Purpose

Modal focuses user attention on a single task or decision.

Modals interrupt the current context intentionally.

They are used only when the task requires full user focus.

---

# Component Location

`shared/ui/Modal`

---

# Philosophy

Use modal sparingly.

A modal is a focused interruption.

Never use a modal for browsing or exploration.

Never place a dashboard inside a modal.

---

# When to Use Modal

Deposit transaction flow

Withdraw transaction flow

Wallet connection

Confirmation dialogs (destructive actions)

Settings quick actions

---

# When NOT to Use Modal

Displaying long-form content

Browsing lists or history

Vault details (use a page)

Portfolio overview

Any content requiring deep reading

---

# Modal Anatomy

```
┌────────────────────────────────────────────────────┐
│  HEADER                                            │
│  [ Title ]                            [ × Close ] │
├────────────────────────────────────────────────────┤
│                                                    │
│  BODY                                              │
│  [ Content ]                                       │
│                                                    │
├────────────────────────────────────────────────────┤
│  FOOTER                                            │
│  [ Cancel / Back ]            [ Primary Action ]   │
└────────────────────────────────────────────────────┘
```

---

# Sizes

| Size | Width | Usage |
|------|-------|-------|
| Small | 400px | Confirmation dialogs |
| Medium | 560px | Transaction flows (Deposit, Withdraw) |
| Large | 720px | Complex forms, wallet connection |

Height is content-driven with a max-height of 90vh.

Content area scrolls independently if needed.

---

# Backdrop

Semi-transparent dark backdrop behind modal.

Clicking backdrop closes modal — except during active transactions (Step 3+).

Backdrop fade duration: duration-normal (200ms).

---

# Animation

Enter:

Backdrop fades in.

Modal scales from 0.96 to 1.0 + fades in.

Duration: duration-slow (300ms), ease-enter.

Exit:

Modal scales from 1.0 to 0.96 + fades out.

Duration: duration-normal (200ms), ease-exit.

---

# Header

Title: Heading M, left-aligned.

Close button: × icon, top-right.

Optional: Step progress indicator (for multi-step flows).

---

# Footer

Always present in transaction modals.

Primary action: right-aligned.

Cancel/Back: left-aligned.

Never center-align footer buttons.

---

# Step Progress (Multi-step Flows)

For Deposit and Withdraw flows, show progress at the top.

```
Step 1 of 5

●────●────○────○────○
Input Review Sign  Process Done
```

Active step is highlighted.

Completed steps are filled.

Future steps are empty.

---

# Close Behavior

## Can Close (Escape key, backdrop click, X button)

Step 1: Input

Step 2: Review

After success (Step 5)

---

## Cannot Close

Step 3: Wallet Signature (in progress)

Step 4: Transaction Processing

These steps require completion or error resolution.

---

# Scroll Behavior

Short content: no scroll.

Long content: modal body scrolls.

Header and footer remain sticky.

---

# Nested Modals

Never allowed.

If a second action is required from within a modal:

Use inline expansion.

Use a toast for confirmation.

Use a new modal only if the first one is first closed.

---

# Focus Management

On open: focus moves to first interactive element inside modal.

On close: focus returns to the trigger button.

Tab key: cycles only within the modal (focus trap).

Shift+Tab: cycles backward.

Escape: closes modal (when closable).

---

# Token Usage

Background: `color-surface`

Border: `color-border`

Shadow: `shadow-xl`

Border radius: `radius-xl`

Padding (header): `spacing-lg` (24px)

Padding (body): `spacing-lg` (24px)

Padding (footer): `spacing-md` (16px) `spacing-lg` (24px horizontal)

Backdrop: `rgba(0, 0, 0, 0.5)` via `opacity-backdrop` token

---

# React Props Interface

```tsx
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean            // default: true
  currentStep?: number          // for multi-step flows
  totalSteps?: number           // for multi-step flows
  footer?: ReactNode
  children: ReactNode
}
```

---

# Accessibility

`role="dialog"`

`aria-modal="true"`

`aria-labelledby` pointing to modal title.

`aria-describedby` pointing to modal description (if present).

Focus trap required.

Backdrop and modal must be announced when opened.

Escape key handled.

Screen reader announces: "Dialog: {title}" on open.

---

# Do Not

Do not open a modal from another modal.

Do not make modals scrollable horizontally.

Do not put navigation links inside a modal.

Do not close a modal mid-transaction without confirming with the user.

---

# Final Modal Principle

Modals borrow the user's attention.

They must return it cleanly.

Every modal should have a clear exit —

either completing the task or explicitly canceling it.

Users should never feel trapped.
