# Harmonix V2

# Deposit Page Specification

Version 2.0

---

# Purpose

Deposit is the transaction page.

Deposit answers one question:

"How do I invest safely?"

Users arrive here after deciding on a vault.

They are committed — not evaluating.

The job of Deposit is to complete the transaction with confidence.

---

# Primary Intent

Complete the investment safely.

Give users full visibility before signing.

Confirm completion clearly.

---

# Route

Deposit is a modal flow, not a standalone page.

Triggered from: Vault Card, Vault Detail sidebar.

---

# Modal Flow

```
Step 1: Input
↓
Step 2: Review
↓
Step 3: Wallet Signature
↓
Step 4: Processing
↓
Step 5: Success
```

Progress indicator shows current step at the top of the modal.

---

# Step 1: Input

## Purpose

Let users enter the deposit amount.

---

## Content

Vault name + logo (context reminder)

Amount input field

Asset: USDC / ETH (matches vault)

Wallet balance display: "Available: 10,000 USDC"

Quick select buttons: 25% / 50% / 75% / MAX

Estimated output:

→ Estimated APY: 12.4%

→ Estimated Monthly Earnings: ~$52

---

## Validation

Minimum deposit amount (from vault configuration).

Maximum: wallet balance.

Inline error: "Amount exceeds your balance."

Inline error: "Minimum deposit is 100 USDC."

---

## CTAs

Primary: "Review Deposit" → Step 2

Secondary: "Cancel" → closes modal

---

# Step 2: Review

## Purpose

Give users full visibility before signing.

No surprises after signing.

---

## Content

Summary card:

Action: Deposit

Vault: Delta Neutral USDC

Amount: 5,000 USDC

Estimated APY: 12.4%

Estimated Annual Earnings: ~$620

Gas Fee: ~$0.80

---

## Rules

All values must be accurate.

Gas fee is an estimate — label it as "~".

Never skip the review step.

---

## CTAs

Primary: "Confirm Deposit" → Step 3

Secondary: "← Back" → Step 1

Tertiary: "Cancel" → closes modal

---

# Step 3: Wallet Signature

## Purpose

Request wallet approval.

---

## Content

Icon: wallet

Message: "Check your wallet to confirm the transaction."

Status: "Waiting for wallet confirmation..."

---

## Rules

Do not show a CTA during this step.

If wallet is slow or times out, show retry option.

---

## Error Handling

User rejects in wallet:

"Transaction was rejected. You can try again or cancel."

CTA: "Try Again" / "Cancel"

---

# Step 4: Processing

## Purpose

Communicate that the transaction is submitted and being processed.

---

## Content

Spinner

Message: "Your deposit is being processed."

Sub-message: "This usually takes less than 30 seconds."

Transaction hash link: "View on Explorer →"

---

## Rules

Never leave users on this screen without context.

Explorer link must be available immediately after submission.

---

# Step 5: Success

## Purpose

Confirm completion clearly.

Celebrate the moment.

---

## Content

Success checkmark animation

Headline: "Deposit Complete!"

Summary:

5,000 USDC deposited into Delta Neutral USDC

Your position is now active.

Estimated APY: 12.4%

---

## CTAs

Primary: "View My Portfolio" → /portfolio

Secondary: "Deposit Again" → reset to Step 1

Tertiary: "Close" → closes modal, returns to previous page

---

## Rules

Success screen must feel celebratory but professional.

No confetti or excessive animation.

A clear checkmark + confirmation message is sufficient.

Always show "View Portfolio" as primary next action.

---

# State: Insufficient Balance

If user has no balance:

Disable the input.

Show message: "You don't have any USDC in your connected wallet."

Show CTA: "Bridge USDC" (if bridging is supported) or informational text.

---

# State: Vault at Capacity

If vault is full:

Show message: "This vault has reached its capacity. No new deposits are accepted."

Show CTA: "View Other Vaults" → /earn

---

# State: Vault Paused

If vault is paused:

Show message: "Deposits are temporarily paused for this vault."

Show CTA: "View Other Vaults" → /earn

---

# Loading State

Modal opens immediately.

Vault data loads inline (APY, estimated earnings).

If data is loading, show skeleton for estimated values only.

---

# Accessibility

Focus enters modal on open.

Focus returns to trigger element on close.

Tab key cycles within modal.

Escape key closes modal (only on Step 1 and Step 2).

Step 3+ cannot be closed with Escape to prevent accidental cancellation.

---

# Success Criteria

User completes deposit without confusion.

User understands what will happen next.

User lands on Portfolio after success.

---

# Failure States

User abandons at Review step.

User does not understand gas fee.

User cannot find their balance.

---

# Final Deposit Principle

Deposit is the most important conversion moment in Harmonix.

Every step should reduce anxiety.

Every step should increase confidence.

The goal is not just a completed transaction.

The goal is a user who feels great about investing.
