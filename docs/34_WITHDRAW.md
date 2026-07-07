# Harmonix V2

# Withdraw Page Specification

Version 2.0

---

# Purpose

Withdraw is the exit flow.

Withdraw answers one question:

"How do I get my money back?"

Users arrive here when they want to exit a position.

They may be anxious.

The job of Withdraw is to make the process feel simple, transparent, and trustworthy.

---

# Primary Intent

Exit with full confidence.

Communicate exactly what will happen.

Eliminate the need for any follow-up action.

---

# Route

Withdraw is a modal flow, not a standalone page.

Triggered from: Portfolio page, Vault Detail sidebar (when position exists).

---

# Core Design Decision

There is NO redeem step.

After requesting a withdrawal, funds transfer automatically.

Users do nothing after submitting.

They simply wait.

This is a core product decision documented in 02_PRODUCT_DECISIONS.md (Decision 003).

---

# Modal Flow

```
Step 1: Input
↓
Step 2: Review
↓
Step 3: Wallet Signature
↓
Step 4: Processing (Timeline)
↓
Step 5: Submitted Confirmation
```

After Step 5, the withdrawal continues processing in the background.

Users can close the modal.

Progress is visible in Portfolio.

---

# Step 1: Input

## Purpose

Let users choose the withdrawal amount.

---

## Content

Vault name + logo (context reminder)

Current position value: "Your Position: $5,000 USDC"

Amount input

Quick select: 25% / 50% / 75% / MAX (Full Withdrawal)

Estimated completion time: "~3–5 business days"

Note: "Funds will be automatically transferred to your wallet."

---

## Validation

Minimum withdrawal (from vault configuration).

Maximum: current position value.

Inline error: "Amount exceeds your position."

---

## CTAs

Primary: "Review Withdrawal" → Step 2

Secondary: "Cancel" → closes modal

---

# Step 2: Review

## Purpose

Full transparency before signing.

---

## Content

Summary card:

Action: Withdraw

Vault: Delta Neutral USDC

Amount: 5,000 USDC

Estimated Completion: 3–5 business days

Destination: Your connected wallet (address truncated)

Note: "No additional action required. Funds will arrive automatically."

---

## Rules

Highlight "no additional action required."

This is the key reassurance.

Never omit the estimated completion time.

---

## CTAs

Primary: "Confirm Withdrawal" → Step 3

Secondary: "← Back" → Step 1

Tertiary: "Cancel" → closes modal

---

# Step 3: Wallet Signature

## Purpose

Request wallet approval for the withdrawal request.

---

## Content

Icon: wallet

Message: "Check your wallet to confirm the withdrawal request."

Status: "Waiting for wallet confirmation..."

---

## Error Handling

User rejects:

"Withdrawal request was rejected. You can try again or cancel."

CTA: "Try Again" / "Cancel"

---

# Step 4: Processing (Timeline)

## Purpose

Show progress immediately after submission.

---

## Content

Timeline component:

● Requested          [timestamp]
│
● Queued             [active]
│
○ Processing         [pending]
│
○ Transferred        [pending]
│
○ Completed          [pending]

Transaction hash link: "View on Explorer →"

Message: "Your withdrawal is in the queue. No action needed from you."

---

## Rules

Timeline is the centerpiece of this step.

Never show just "Processing..."

The timeline communicates progress even while the user is watching.

---

# Step 5: Submitted Confirmation

## Purpose

Let users know the request is in the system and they can leave.

---

## Content

Checkmark (submitted, not complete)

Headline: "Withdrawal Requested"

Message:

"Your withdrawal of 5,000 USDC from Delta Neutral USDC has been submitted."

"Funds will be automatically transferred to your wallet in 3–5 business days."

"You'll receive a notification when the transfer is complete."

"No further action is required."

---

## CTAs

Primary: "View Portfolio" → /portfolio

Secondary: "Close" → closes modal

---

## Rules

Use "Requested" not "Completed" at this step.

Funds have not yet arrived.

Accuracy builds trust.

---

# Ongoing: Portfolio Pending Withdrawal Widget

After submission, Portfolio page shows a pending withdrawal widget.

This persists until the transfer completes.

See 35_PORTFOLIO.md for details.

---

# Notification on Completion

When funds are transferred, user receives a notification.

"5,000 USDC has been transferred to your wallet."

See 64_NOTIFICATION_SYSTEM.md.

---

# State: No Position

If user has no position in the vault:

Withdraw option should not be accessible.

Button disabled or hidden.

---

# State: Existing Pending Withdrawal

If user already has a pending withdrawal for this vault:

Show existing pending withdrawal status.

Allow additional withdrawal only if vault supports it.

If not supported: "You already have a pending withdrawal from this vault."

---

# Loading State

Modal opens immediately.

Position data loads inline.

If data is loading, skeleton for amount and position values.

---

# Accessibility

Focus traps inside modal.

Escape key closes modal only on Step 1 and Step 2.

Step 3+ cannot be closed with Escape.

---

# Success Criteria

User understands no further action is required.

User does not contact support asking "where is my money."

User trusts the process and waits calmly.

---

# Failure States

User is confused about the waiting period.

User expects to redeem and cannot find the button.

User does not know when funds will arrive.

---

# Final Withdraw Principle

Withdraw is a trust exercise.

Users are placing trust in Harmonix to return their money.

Every word, every step, every status message should reinforce:

"We have your request."

"We are processing it."

"You will receive your funds."

"You do not need to do anything else."
