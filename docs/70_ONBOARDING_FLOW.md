# Harmonix V2

# Onboarding Flow

Version 2.0

---

# Purpose

This document defines the first-time user experience in Harmonix V2.

Onboarding is not a tutorial.

Onboarding is the moment when a stranger becomes an investor.

Every step should reduce anxiety and build confidence.

---

# Onboarding Philosophy

Users arrive with three questions:

"Can I trust this?"

"Is this right for me?"

"How do I start?"

Onboarding answers all three — in that order.

---

# User Entry Points

## Entry Point 1: Direct URL

User navigates to harmonix.xyz for the first time.

No wallet connected.

---

## Entry Point 2: Referral Link

User arrives from a shared vault link or campaign link.

Deep-linked to a specific vault or campaign.

---

## Entry Point 3: Social / Campaign

User arrives from Twitter, Discord, or campaign page.

May already know what Harmonix is.

Wants to invest quickly.

---

# First Visit: Not Connected

## What the User Sees

Home page with Hero section.

No personal data.

No portfolio.

Platform stats to establish credibility.

Recommended vaults.

---

## Emotional State

Curious.

Slightly skeptical.

Looking for a reason to trust.

---

## Key Design Principles

No forced modal on arrival.

No "Sign Up" requirement.

No email gate.

User controls the pace.

---

# Onboarding Steps

## Step 0: Discovery (Passive)

User reads Home page.

Sees: Headline, Platform Stats (TVL, Yield Paid, Vaults), Recommended Vaults.

No action required.

Goal: Answer "Can I trust this?"

---

## Step 1: Wallet Connection

Triggered when user clicks:

"Connect Wallet" in navigation.

"Deposit" on any vault card.

"Explore Vaults" → browses → clicks "Deposit".

---

### Wallet Connection Modal

See `73_WALLET_CONNECTION_UX.md` for full spec.

Brief: User selects wallet → approves connection → address visible in nav.

---

## Step 2: First Vault Selection

After connecting, user is on Earn page or Vault Detail.

---

### For Beginners

If user has never deposited before:

Show a subtle "First time?" guidance banner on Earn page.

Banner content:

"New to Harmonix? Start with our recommended vaults — they're designed for stability."

CTA: "Show Recommended" (filters to Low Risk vaults)

---

### Risk Acknowledgment (High Risk Vaults Only)

If user selects a High Risk vault for their first deposit:

Show a one-time acknowledgment step inside the Deposit modal before Step 1 (Input).

---

#### Risk Acknowledgment Screen

```
⚠ Before you deposit

This is a High Risk vault.

What this means:
• Higher APY potential
• Higher chance of capital loss
• Strategy uses leverage

I understand the risks and want to continue.

[ Take me to Low Risk vaults ]   [ I understand, continue ]
```

Rules:

Only shown for High Risk vaults.

Only shown once per user (stored in localStorage).

User must actively click "I understand" — no auto-dismissal.

---

## Step 3: First Deposit

User completes deposit flow.

See `33_DEPOSIT.md` for full flow spec.

After success:

Show enhanced first-deposit success screen.

---

### First Deposit Success Screen

Differs from standard deposit success for first-time depositors.

```
🎉 Welcome to Harmonix

You've made your first deposit.

5,000 USDC is now working in Delta Neutral USDC.
Estimated APY: 12.4%

Here's what happens next:
→ Your position is now active
→ Yield accrues automatically
→ You'll receive a notification when your first earnings are visible
→ No action needed — just watch your portfolio grow

[ View My Portfolio ]
```

---

## Step 4: Portfolio Introduction

User lands on Portfolio after first deposit.

If this is their first visit to Portfolio:

Show a one-time contextual tooltip tour.

---

### Portfolio Tooltip Tour

Step 1: Point to Portfolio Value

"This is your total portfolio value. It grows as yield accrues."

Step 2: Point to Total Earnings

"This shows how much you've earned so far."

Step 3: Point to Active Positions

"Your investments live here. Click any position to manage it."

Step 4: Point to Notifications icon

"We'll notify you when something important happens."

Done: "You're all set. Happy earning!"

---

### Tooltip Tour Rules

Maximum 4 steps.

User can dismiss at any time with "Skip tour".

Never shown again after completion or dismissal.

Stored in localStorage.

Does not block or overlay the content — uses pointer tooltips only.

---

# Returning User Experience

## Returning User: Has Investments

Skip all onboarding.

Land directly on Portfolio (if wallet was previously connected).

No tour.

No banners.

---

## Returning User: Disconnected Wallet

Show Home page normally.

Subtle banner: "Welcome back. Reconnect your wallet to view your portfolio."

CTA: "Reconnect Wallet"

Not a modal — just a top banner.

---

# Progressive Trust Building

Onboarding is not a single moment.

Trust is built across the first week.

---

## Day 0: First deposit

Welcome message + portfolio intro tour.

---

## Day 1: First earnings visible

Notification: "Your first yield is accruing. Check your portfolio to see your earnings grow."

---

## Day 3: Engagement nudge (if no return visit)

Notification: "Your 5,000 USDC has earned $4.10 so far. See your progress in Portfolio."

---

## Day 7: Retention milestone

Notification: "One week with Harmonix. Your position has earned $14.20."

---

# Onboarding for Referred Users

If user arrives via referral link:

Connect referral tracking via URL parameter.

Show standard Home or vault page.

After deposit: show referral success message.

```
✓ Deposit Complete

You and [referrer ENS/address] both earned bonus points.
Your 5,000 USDC is now active.

[ View My Portfolio ]
```

---

# Onboarding State Storage

Stored in localStorage (not server-side for V2):

```typescript
interface OnboardingState {
  hasConnectedWallet: boolean
  hasCompletedFirstDeposit: boolean
  hasSeenPortfolioTour: boolean
  hasAcknowledgedHighRisk: boolean
  firstDepositDate: string | null
}
```

---

# Empty State During Onboarding

While user is connected but has no investments:

Portfolio shows empty state (see `50_EMPTY_STATE.md`).

Home shows full hero + recommended vaults.

Earn shows full vault list.

No "you have nothing" messaging — frame positively:

"Ready to start earning? Choose a vault below."

---

# Onboarding Anti-Patterns

Never force email signup before wallet connection.

Never show a "complete your profile" checklist on first visit.

Never require KYC before exploration.

Never use countdown timers to create urgency.

Never show onboarding pop-ups on every visit.

---

# Success Criteria

User understands what Harmonix does within 30 seconds.

User makes first deposit within 10 minutes of connecting wallet.

User returns to Portfolio within 24 hours.

---

# Final Onboarding Principle

The best onboarding is invisible.

Users should feel like they made their own decision.

Not like they were guided through a process.

Every step should feel natural.

Every next action should be obvious.

If a user finishes onboarding and thinks "that was easy,"

the onboarding has succeeded.
