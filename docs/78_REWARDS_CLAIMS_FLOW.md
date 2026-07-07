# Harmonix V2

# Rewards Claims Flow

Version 2.0

---

# Purpose

This document defines the rewards claiming experience in Harmonix V2.

`36_REWARDS.md` covers the Rewards page overview.

This document covers the claims modal flow, multiple reward types, and auto-claim vs. manual claim behavior.

---

# Rewards Philosophy

Claiming rewards should feel like receiving a gift, not completing a task.

The flow should be fast, clear, and celebratory.

Every claim reinforces: "You earned this. Harmonix delivered."

---

# Reward Types

| Type | Description | Claim Method |
|------|-------------|--------------|
| Points | Platform loyalty points | Auto-accumulated, no claim needed |
| HYPE Tokens | Native protocol tokens | Manual claim required |
| USDC Bonus | Direct USDC rewards from campaigns | Manual claim required |
| Vault Yield | Standard vault earnings | Auto-compounded or auto-transferred |
| Campaign Rewards | Special event rewards | Manual or auto depending on campaign |
| Referral Bonus | Earned when referred user deposits | Auto-credited as points |
| Achievement Badges | Non-financial milestones | Auto-awarded, no claim |

---

# Points (Auto-Accumulated)

Points do not require claiming.

They accrue automatically based on:

- Deposit amount and duration
- Campaign participation
- Referrals
- Achievements

Points are visible in the Rewards page at all times.

No user action required.

Points will be convertible to HYPE tokens at a future date (TBD).

---

# Claimable Rewards

HYPE tokens, USDC bonuses, and campaign rewards require an on-chain claim transaction.

These appear in the Rewards page as "Available to Claim."

---

## Claimable Reward Card

```
┌────────────────────────────────────────────┐
│  🔥 Season 1 Campaign Reward               │
│                                            │
│  250 HYPE                                  │
│  Earned: Jan 1 – Jan 31                    │
│  Expires: Mar 31                           │
│                                            │
│  [ Claim Now ]                             │
└────────────────────────────────────────────┘
```

Expiry date shown if reward expires.

No expiry: no date shown.

---

# Claims Modal Flow

## Single Reward Claim

---

### Step 1: Claim Review

```
┌────────────────────────────────────────────┐
│  Claim Reward                    [ × ]     │
├────────────────────────────────────────────┤
│                                            │
│  You're about to claim:                    │
│                                            │
│  250 HYPE                                  │
│  Season 1 Campaign Reward                  │
│                                            │
│  To wallet:                                │
│  0x1234...5678                             │
│                                            │
│  Gas Fee: ~$0.20                           │
│                                            │
│  [ Cancel ]      [ Claim 250 HYPE ]        │
│                                            │
└────────────────────────────────────────────┘
```

---

### Step 2: Wallet Signature

```
┌────────────────────────────────────────────┐
│  Claim Reward                              │
├────────────────────────────────────────────┤
│                                            │
│  Confirm in your wallet                    │
│                                            │
│  [  Waiting for wallet...  ]               │
│         (spinner)                          │
│                                            │
│  Check your wallet extension               │
│  to approve the transaction.               │
│                                            │
└────────────────────────────────────────────┘
```

---

### Step 3: Processing

```
┌────────────────────────────────────────────┐
│  Claiming your reward...                   │
├────────────────────────────────────────────┤
│                                            │
│  [  Processing on-chain  ]                 │
│         (spinner)                          │
│                                            │
│  This usually takes a few seconds.         │
│                                            │
└────────────────────────────────────────────┘
```

---

### Step 4: Success

```
┌────────────────────────────────────────────┐
│  Reward Claimed!                           │
├────────────────────────────────────────────┤
│                                            │
│       🎉                                   │
│                                            │
│  250 HYPE has been sent to your wallet.    │
│                                            │
│  0x1234...5678                             │
│                                            │
│  Transaction: 0xabcd...1234                │
│  [ View on Explorer ]                      │
│                                            │
│  [ View My Rewards ]   [ Close ]           │
│                                            │
└────────────────────────────────────────────┘
```

Success animation: confetti burst or particle animation.

Duration: 1.5 seconds.

---

## Multiple Rewards — Claim All Flow

When user has 2+ claimable rewards, a "Claim All" option appears at the top of the Rewards page.

---

### Claim All Entry Point

```
┌────────────────────────────────────────────────────┐
│  3 rewards available to claim                       │
│  Total: 250 HYPE + 120 USDC + 80 HYPE              │
│                                      [ Claim All ] │
└────────────────────────────────────────────────────┘
```

---

### Claim All — Step 1: Review All

```
┌────────────────────────────────────────────┐
│  Claim All Rewards               [ × ]     │
├────────────────────────────────────────────┤
│                                            │
│  You're claiming:                          │
│                                            │
│  ✓ Season 1 Campaign    250 HYPE           │
│  ✓ Referral Bonus       120 USDC           │
│  ✓ Early Adopter Bonus   80 HYPE           │
│                                            │
│  ─────────────────────────────────────     │
│  Total: 330 HYPE + 120 USDC                │
│                                            │
│  To: 0x1234...5678                         │
│  Gas Fee: ~$0.50                           │
│                                            │
│  Note: This will send 3 transactions.      │
│  You'll sign each one in your wallet.      │
│                                            │
│  [ Cancel ]     [ Claim All ]              │
└────────────────────────────────────────────┘
```

---

### Claim All — Batch Processing

After user signs, process claims sequentially.

Show progress:

```
Claiming your rewards...

✓ Season 1 Campaign — Complete
⏳ Referral Bonus — Processing...
  Early Adopter Bonus — Pending

Transaction 2 of 3
```

If one fails mid-batch:

```
Partial claim completed.

✓ Season 1 Campaign — 250 HYPE claimed
✗ Referral Bonus — Failed
  Early Adopter Bonus — Skipped

The failed reward is still available to claim individually.

[ Try Again ]   [ Close ]
```

---

## Auto-Claim Configuration

Some campaign rewards can be set to auto-claim.

Auto-claim: reward transfers to wallet automatically when earned, without user action.

Manual claim: reward waits in "Available to Claim" until user initiates.

---

### Auto-Claim Setting

Accessible from: Settings → Rewards → Auto-Claim

```
Auto-claim rewards

Automatically claim rewards when they become available.
Gas fees apply for each auto-claim.

USDC Bonuses:       [ Toggle: ON  ]
HYPE Tokens:        [ Toggle: OFF ]
Campaign Rewards:   [ Toggle: OFF ]

Auto-claim uses your wallet's gas balance.
Ensure you maintain sufficient HYPE for fees.
```

---

# Reward Expiry

Some rewards expire if not claimed within a deadline.

---

## Expiry Warning States

**7+ days remaining**: No special warning. Show expiry date quietly.

**3–6 days remaining**: Yellow badge: "Expires in X days"

**1–2 days remaining**: Orange badge: "Expires in X days"

**< 24 hours**: Red badge: "Expires in X hours"

**Expired**: Gray card, disabled "Claim" button: "This reward has expired."

---

## Expiry Notifications

| Trigger | Notification |
|---------|-------------|
| 3 days before expiry | "You have unclaimed rewards expiring in 3 days." |
| 1 day before | "Claim your rewards before they expire tomorrow." |
| Expired | "A reward has expired. Check your Rewards page." |

---

# Claim Error Handling

| Error | Message |
|-------|---------|
| User rejected wallet | "Claim cancelled. Your reward is still available." |
| Gas failure | "Unable to estimate fees. Check your gas balance." |
| Transaction reverted | "Claim failed. Your reward is still available. Try again." |
| Reward already claimed | "This reward has already been claimed." |
| Reward expired | "This reward has expired and is no longer claimable." |
| Network error | "Network error. Please try again." |

All errors preserve the reward in "Available to Claim" state.

No reward is ever lost due to a UI or network error.

---

# Claim History

All claimed rewards appear in Reward History section.

Columns: Date, Type, Amount, Transaction.

Transaction column: truncated tx hash with Explorer link.

Filterable by type (HYPE, USDC, Campaign).

---

# Notifications for Rewards

| Event | Notification |
|-------|-------------|
| Reward available | "You have a new reward to claim: 250 HYPE." |
| Auto-claim success | "250 HYPE has been auto-claimed to your wallet." |
| Claim success | "Your claim of 250 HYPE is complete." |
| Claim failed | "Reward claim failed. Your reward is still available." |
| Reward expiring soon | "Unclaimed reward expires in 3 days." |

---

# Accessibility

Claim modal: standard modal accessibility (see `44_MODAL.md`).

Success animation: respects `prefers-reduced-motion`.

Reduced motion: simple checkmark replaces confetti animation.

All error states announced via `role="alert"`.

---

# Analytics Events

| Event | Trigger |
|-------|---------|
| `reward_claim_started` | User clicks "Claim Now" |
| `reward_claim_all_started` | User clicks "Claim All" |
| `reward_claim_completed` | Claim transaction confirmed |
| `reward_claim_failed` | Claim transaction failed |
| `reward_auto_claim_toggled` | User toggles auto-claim setting |

---

# Final Rewards Claims Principle

Every claim should feel earned.

The user did something — deposited, referred, participated.

Harmonix delivered on the promise.

The claims flow is the handshake that seals that promise.

It should feel satisfying, clear, and trustworthy.

Not like a form.

Not like a chore.

Like a reward.
