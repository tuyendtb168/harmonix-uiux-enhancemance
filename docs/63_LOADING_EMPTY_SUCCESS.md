# Harmonix V2

# Loading, Empty, and Success States

Version 2.0

---

# Purpose

This document defines the three transitional states every feature must handle:

Loading — content is being fetched.

Empty — content exists but is zero or absent.

Success — an action completed successfully.

These three states are not edge cases.

They are core parts of every user interaction.

---

# State Philosophy

Every feature has exactly three states beyond the default.

Handle all three.

Never ship a feature that only handles the happy path.

---

# Loading States

## Philosophy

Loading should be honest and contextual.

Never block the entire page for a single section loading.

Never show just a spinner without context.

---

## Loading Pattern: Skeleton

Use skeleton loading for any content that has a predictable layout.

Skeletons mirror the shape of the real content.

They appear immediately — no delay.

They disappear as soon as data is available.

---

### Skeleton Variants

| Context | Skeleton Shape |
|---------|---------------|
| Stat Card | Short label bar + larger value bar |
| Vault Card | Logo circle + text lines + footer |
| Portfolio Summary | 4 stat placeholders in a row |
| Chart | Large rectangle area |
| Table Row | Full-width text bars |
| Notification Item | Circle + two text lines |
| Position Card | Multi-line card placeholder |

---

## Loading Pattern: Spinner

Use spinner for:

Button loading state (inline, replacing/preceding label).

Small isolated operations without layout.

Never full-page spinner.

Never spinner for section-level loading (use skeleton instead).

---

## Loading Timing

0ms: show skeleton immediately.

3000ms+: if still loading, show a secondary message: "Taking longer than expected..."

10000ms+: show error state with retry option.

---

## Page-Level Loading Strategy

Navigation loads immediately (static).

Portfolio summary: priority load (data fetch immediately on mount).

Charts: deferred load (lazy, after summary loads).

Activity/history: deferred load.

Sidebar content: deferred load.

No section should block another section from rendering.

---

## Loading Accessibility

All skeleton regions: `aria-busy="true"` + `aria-label="Loading {content name}..."`

When content loads: `aria-busy="false"` + live region announces content.

---

# Empty States

See 50_EMPTY_STATE.md for full empty state catalog and component spec.

---

## Key Rules (Summary)

Never show "No data."

Every empty state explains why and what to do.

Empty state appears only after a data fetch resolves empty — never during loading.

---

## Empty vs Loading

Loading: skeleton visible, content pending.

Empty: content resolved, result is genuinely empty.

Never show an empty state while data is still loading.

---

# Success States

## Philosophy

Success moments deserve recognition.

Not excessive celebration.

Professional confirmation.

Users should feel:

"It worked."

"I know what happened."

"I know what to do next."

---

## Success Pattern: Modal Success Step

Used for: Deposit completion, Withdrawal submission.

Content:

Success checkmark animation (stroke draw).

Headline confirming the action.

Summary of what happened.

Primary next action.

---

### Deposit Success

```
✓ Deposit Complete

5,000 USDC deposited into Delta Neutral USDC.
Your position is now active.

Estimated APY: 12.4%

[ View My Portfolio ]   [ Deposit Again ]
```

---

### Withdrawal Submitted

```
✓ Withdrawal Requested

5,000 USDC withdrawal from Delta Neutral USDC has been submitted.
Funds will be transferred automatically in 3–5 business days.
No further action is required.

[ View Portfolio ]   [ Close ]
```

Note: "Withdrawal Requested" — not "Withdrawal Complete." Accuracy builds trust.

---

## Success Pattern: Toast

Used for: non-transactional confirmations, settings saved, minor actions.

Duration: auto-dismiss after 4 seconds.

```
✓ Settings saved.
```

```
✓ Address copied.
```

```
✓ Notifications marked as read.
```

---

## Success Pattern: Inline Confirmation

Used for: form fields saved inline, preferences updated.

Small checkmark beside the affected element.

Fades out after 2 seconds.

---

## Success Pattern: Portfolio Update

After deposit or withdrawal completion:

Portfolio value updates with count-up animation.

Activity table gains a new row.

Pending Withdrawals section updates.

No modal required — portfolio data speaks for itself.

---

# State Transition Rules

## Loading → Content

Skeleton fades out.

Content fades in.

Duration: duration-normal (200ms).

---

## Loading → Empty

Skeleton fades out.

Empty state fades in.

Duration: duration-normal (200ms).

---

## Loading → Error

Skeleton fades out.

Error state fades in.

See 62_ERROR_HANDLING.md.

---

## Action → Success

Success state appears in modal (transaction flows) or as toast (minor actions).

Underlying data refreshes in the background.

After modal closes, page content reflects the new state.

---

# State Checklist Per Feature

Before shipping any feature, verify:

□ Loading skeleton defined and implemented.

□ Empty state message defined (context-specific).

□ Error state handled with recovery path.

□ Success state shows clear confirmation.

□ State transitions are smooth (no layout jump).

□ Accessibility: aria-busy, aria-live handled.

□ Mobile: all states look correct on small screens.

---

# Final State Principle

Users experience these transitional states constantly.

They are not exceptions.

They are the product.

A feature that handles all three states gracefully

communicates one thing above all else:

We thought about your entire experience.

Not just the happy path.
