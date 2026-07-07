# Harmonix V2

# Deposit Edge Cases

Version 2.0

---

# Purpose

This document defines how the deposit flow handles situations beyond the happy path.

`33_DEPOSIT.md` covers the standard flow.

This document covers everything that can go wrong — and how to recover gracefully.

---

# Edge Case Philosophy

Every edge case is a moment where user trust is tested.

Handle it well: user stays, confidence increases.

Handle it poorly: user leaves, never returns.

---

# Category 1: Pre-Transaction Errors

These occur before the wallet signature step.

---

## 1.1 Insufficient Balance

**Trigger**: User enters amount > wallet balance.

**Detection**: Real-time validation on input blur.

**UI Response**:

Inline error below input: "Amount exceeds your available balance of 4,200 USDC."

"Review Deposit" button disabled.

Quick select buttons recalculate based on actual balance.

---

## 1.2 Below Minimum Deposit

**Trigger**: User enters amount < vault minimum.

**Detection**: Real-time validation.

**UI Response**:

Inline error: "Minimum deposit for this vault is 100 USDC."

Button disabled until amount meets minimum.

---

## 1.3 Vault at Full Capacity

**Trigger**: User opens Deposit modal for a vault that just reached capacity.

**Detection**: On modal open, fetch current vault capacity.

**UI Response**:

```
This vault has reached its capacity.
No new deposits are currently accepted.

[ View Other Vaults ]
```

Modal input is disabled.

CTA: "View Other Vaults" → /earn

---

## 1.4 Vault Paused

**Trigger**: Vault deposits are paused (maintenance, emergency).

**UI Response**:

```
Deposits temporarily paused.

This vault is undergoing maintenance.
Deposits will resume shortly.

[ View Other Vaults ]   [ Close ]
```

---

## 1.5 Wrong Network

**Trigger**: User connected but on wrong network.

**UI Response**: Network switch prompt before input (see `73_WALLET_CONNECTION_UX.md`).

Deposit modal does not open until network is correct.

---

## 1.6 Wallet Disconnected Mid-Flow

**Trigger**: User disconnects wallet while deposit modal is open (Step 1 or 2).

**Detection**: Listen to wallet disconnect event.

**UI Response**:

Toast: "Wallet disconnected."

Modal closes.

User lands on previous page.

Reconnect prompt shown in navigation.

---

# Category 2: ERC-20 Approval Flow

This is a critical DeFi-specific edge case most users don't expect.

---

## 2.1 First-Time Deposit: Approval Required

**Trigger**: User depositing an ERC-20 token (USDC, etc.) for the first time.

The vault contract must be approved to spend user's tokens.

This requires a separate transaction before the deposit.

---

**Flow Addition** (inserted between Step 2 Review and Step 3 Wallet Signature):

```
Step 2: Review
↓
Step 2.5: Token Approval (only if needed)
↓
Step 3: Wallet Signature (Deposit)
```

---

**Step 2.5: Token Approval UI**:

```
┌────────────────────────────────────────────────┐
│  One-time approval needed                       │
│                                                 │
│  Before your first USDC deposit, you need to   │
│  approve Harmonix to use your USDC.             │
│                                                 │
│  This is a one-time step per asset.             │
│  You won't need to do this again for USDC.      │
│                                                 │
│  Gas Fee: ~$0.30                                │
│                                                 │
│  [ Approve USDC ]                               │
└────────────────────────────────────────────────┘
```

Progress shows: Approve → Deposit (2 steps).

After approval confirmed: automatically proceed to Deposit step.

If user rejects approval:

"Approval cancelled. You need to approve USDC before depositing."

CTAs: "Try Again" / "Cancel"

---

## 2.2 Approval Already Exists

If sufficient allowance already exists: skip Step 2.5 entirely.

User sees standard 5-step flow.

---

## 2.3 Approval Transaction Fails

**UI Response**:

```
Approval failed.

The USDC approval transaction was rejected on-chain.
This is usually caused by network congestion or low gas.

[ Try Again ]   [ Cancel ]
```

---

# Category 3: Wallet Signature Errors

---

## 3.1 User Rejects Signature

**Trigger**: User clicks "Reject" in wallet prompt.

**UI Response**:

```
Transaction cancelled.

You rejected the transaction in your wallet.
Your funds were not moved.

[ Try Again ]   [ Cancel ]
```

---

## 3.2 Wallet Timeout

**Trigger**: Wallet popup not responded to within ~60 seconds.

**UI Response**:

```
Wallet not responding.

The wallet request timed out.
Please check your wallet and try again.

[ Try Again ]   [ Cancel ]
```

---

## 3.3 Wallet Locked

**Trigger**: Wallet is locked when user tries to sign.

**Detection**: Error code from wallet provider.

**UI Response**:

"Your wallet is locked. Unlock it and try again."

CTA: "Try Again"

---

## 3.4 Gas Estimation Failure

**Trigger**: Cannot estimate gas for the transaction.

**UI Response**:

```
Unable to estimate fees.

Check that you have enough ETH/HYPE for gas fees
and try again.

[ Try Again ]   [ Cancel ]
```

Note: Show estimated gas range if available even when exact estimation fails.

---

## 3.5 Insufficient Gas

**Trigger**: User has USDC but insufficient native token for gas.

**Detection**: Compare native balance against estimated gas.

**UI Response** (show in Review step before confirmation):

```
⚠ Low gas balance

You may not have enough HYPE to cover transaction fees.
Estimated fee: ~$0.80

Consider adding HYPE to your wallet before proceeding.

[ Proceed Anyway ]   [ Cancel ]
```

---

# Category 4: On-Chain Transaction Errors

---

## 4.1 Transaction Reverted

**Trigger**: Transaction submitted but reverted on-chain.

**UI Response**:

```
Transaction failed.

Your deposit was not processed.
Your wallet balance was not affected.

This can happen due to:
• Network congestion
• Vault capacity reached
• Slippage

[ Try Again ]   [ Contact Support ]
```

---

## 4.2 Transaction Stuck / Pending Too Long

**Trigger**: Transaction submitted but not confirmed after 5 minutes.

**UI Response** (replaces Processing spinner after timeout):

```
Taking longer than expected.

Your transaction is still pending on-chain.
This sometimes happens during network congestion.

Your transaction ID: 0x1234...5678
[ View on Explorer ]

[ I'll check back later ]
```

Toast shown when modal is closed: "Your deposit is still processing. We'll notify you when it confirms."

---

## 4.3 Transaction Confirmed But Position Not Updated

**Trigger**: On-chain confirmation received but portfolio API doesn't show new position within 30 seconds.

**UI Response**:

Show success screen normally.

Below the summary:

"If your position doesn't appear in Portfolio within a few minutes, please refresh."

Portfolio shows a "Syncing..." indicator for 60 seconds after deposit.

---

# Category 5: Session / Network Issues

---

## 5.1 Internet Disconnected Mid-Flow

**Trigger**: User loses internet during deposit.

**Detection**: `navigator.onLine` event + API call failure.

**UI Response**:

Banner at top of modal: "No internet connection. Please reconnect to continue."

Step does not advance.

On reconnection: resume from current step.

---

## 5.2 App Refreshed Mid-Flow

**Trigger**: User refreshes page during deposit.

**Outcome**: Flow is lost.

If transaction was already submitted: user sees Portfolio updating (on-chain happened).

If transaction was NOT yet submitted: no harm done — user starts over.

**No state persistence for in-progress deposit flows** — flows are transient.

---

# Category 6: Post-Deposit Issues

---

## 6.1 Deposit Confirmed But No Notification

If notification fails to arrive within 30 minutes:

Not a user-visible issue — position is still active.

Portfolio shows position correctly.

Notification system retries in background.

---

## 6.2 Duplicate Deposit Attempt

**Trigger**: User submits deposit twice (double-click or reopens modal quickly).

**Prevention**: Disable "Confirm Deposit" button immediately after first click.

Show loading state.

If second attempt detected: show "A deposit is already processing."

---

# Error Message Summary

| Scenario | Message |
|----------|---------|
| Insufficient balance | "Amount exceeds your balance of X USDC." |
| Below minimum | "Minimum deposit is X USDC." |
| Vault full | "This vault is at capacity." |
| Vault paused | "Deposits temporarily paused." |
| User rejected | "Transaction cancelled. Your funds were not moved." |
| Gas failure | "Unable to estimate fees. Check your gas balance." |
| Tx reverted | "Transaction failed. Your balance was not affected." |
| Tx pending too long | "Transaction pending. Check Explorer for status." |
| Approval rejected | "Approval cancelled. Required before depositing." |

---

# Final Edge Case Principle

Edge cases are not failures.

They are moments when the product proves it was built by people who thought about users.

Every handled edge case says:

"We knew this could happen."

"We prepared for it."

"You are not alone."
