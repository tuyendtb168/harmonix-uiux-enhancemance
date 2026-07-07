# Harmonix V2

# Timeline Component Specification

Version 2.0

---

# Purpose

Timeline visualizes the progress of a multi-step operation.

Timeline is used for long-running processes where users need visibility.

It replaces static status text with a clear, step-by-step progress view.

---

# Component Location

`shared/ui/Timeline`

`shared/ui/TimelineItem`

---

# Philosophy

People trust progress they can see.

Timeline turns invisible background processing

into a visible, understandable sequence.

Users should never stare at "Processing..." alone.

---

# When to Use Timeline

Withdrawal processing flow

Deposit confirmation sequence

Any operation with 3+ meaningful steps

---

# When NOT to Use Timeline

Completed historical records (use Activity table instead)

Operations with only 1–2 steps

Instantaneous operations

---

# Anatomy

```
        ●  Requested                  Jan 20, 2:14 PM
        │
        ●  Queued                     Jan 20, 2:15 PM
        │
        ◉  Processing                 In progress...
        │
        ○  Transferred                Estimated: ~2 days
        │
        ○  Completed                  Pending
```

---

# Timeline Items

Each step is a `TimelineItem`.

## States

### Completed

Filled circle (●).

Color: Success green.

Timestamp shown on right.

Label: normal weight.

---

### Active

Pulsing or distinctly highlighted circle (◉).

Color: Brand primary blue.

Status text: "In progress..." or contextual message.

Label: semibold.

---

### Pending

Empty circle (○).

Color: Border/Neutral.

Shows estimated time or "Pending" text.

Label: Text Muted.

---

### Failed

X circle (✕).

Color: Danger red.

Error message shown.

Label: danger color.

---

# Connector Line

Vertical line connecting circles.

Color: `color-border` (default).

Segment between completed steps: `color-success` (green).

Segment at active step: gradient from success to neutral.

---

# TimelineItem Content

```
[ Circle ]  Label                   Timestamp / Status
[ Line  ]   Sub-description (optional)
```

---

## Label

Short step name.

Examples: "Requested", "Queued", "Processing", "Transferred", "Completed"

---

## Timestamp (Completed)

Format: "Jan 20, 2:14 PM"

Shown only for completed steps.

---

## Status Text (Active)

Shows current processing status.

Examples: "In progress...", "Waiting for confirmation..."

---

## Estimated Time (Pending)

Shows ETA for pending steps.

Examples: "~2 days", "Est. Jan 22"

---

## Sub-description (Optional)

One line of additional context.

Examples: "Your request is in the processing queue."

---

# Withdraw Timeline Specification

Used in: Withdraw modal (Step 4), Portfolio pending widget.

Steps:

1. Requested — completed immediately when withdrawal is submitted
2. Queued — completed when operator picks up the request
3. Processing — active state during operator execution
4. Transferred — completed when funds leave the contract
5. Completed — completed when funds arrive in wallet

---

# Deposit Timeline Specification

Used in: Deposit modal (Step 4), brief confirmation.

Steps:

1. Submitted — completed when transaction is sent
2. Confirming — active while waiting for on-chain confirmation
3. Active — completed when position is confirmed

---

# Compact Timeline

For use in Portfolio sidebar (Pending Withdrawals widget).

Shows only: Requested → Processing → Completed.

Uses smaller circle size and tighter spacing.

---

# Sizes

| Size | Circle | Spacing | Usage |
|------|--------|---------|-------|
| Default | 16px | spacing-md | Modal timeline |
| Compact | 10px | spacing-sm | Portfolio widget |

---

# Animation

Active step circle: subtle pulse animation.

Duration: 2s loop.

Easing: ease-in-out.

Respects `prefers-reduced-motion`.

When a step transitions from pending to active:

Connector line fills with color.

Circle transitions from empty to active style.

Duration: duration-slow (300ms).

---

# Token Usage

Circle completed: `color-success`

Circle active: `color-primary`

Circle pending: `color-border`

Circle failed: `color-danger`

Connector: `color-border` (pending) / `color-success` (completed)

Label completed: `font-body`, `color-text-primary`

Label active: `font-body`, `font-semibold`, `color-primary`

Label pending: `font-body`, `color-text-muted`

Timestamp: `font-caption`, `color-text-muted`

---

# React Props Interface

```tsx
type TimelineStepStatus = 'completed' | 'active' | 'pending' | 'failed'

interface TimelineStep {
  id: string
  label: string
  status: TimelineStepStatus
  timestamp?: string          // ISO date for completed steps
  statusText?: string         // "In progress...", "Pending"
  estimatedTime?: string      // "~2 days", "Est. Jan 22"
  description?: string        // optional sub-description
}

interface TimelineProps {
  steps: TimelineStep[]
  size?: 'default' | 'compact'
}
```

---

# Accessibility

Timeline uses `<ol>` (ordered list) for semantic structure.

Each `TimelineItem` is `<li>`.

Active step: `aria-current="step"`.

Completed steps: `aria-label="{label} — completed"`.

Pending steps: `aria-label="{label} — pending"`.

Active pulse animation: `aria-label="In progress"`.

Reduced motion: removes pulse, uses static indicator.

---

# Do Not

Do not use timeline for history lists.

Do not invent new step statuses beyond: completed, active, pending, failed.

Do not show more than 6 steps in a timeline.

Do not use timeline for binary (done/not done) operations.

---

# Final Timeline Principle

The timeline says:

"We know where we are."

"We know where we are going."

"You will get there."

That is the entire job.

Three sentences of assurance.

Delivered visually.
