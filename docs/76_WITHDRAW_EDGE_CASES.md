# Harmonix V2

# Withdraw Edge Cases

Version 2.0

---

# Purpose

This document defines how the withdrawal flow handles situations beyond the happy path.

`34_WITHDRAW.md` covers the standard flow.

This document covers every scenario that can complicate or interrupt a withdrawal.

Withdrawals carry the highest emotional weight in the product.

A failed or confusing withdrawal destroys trust.

---

# Edge Case Philosophy

Users who withdraw are already in a heightened emotional state.

They want their money.

Every edge case response must communicate:

"Your money is safe."

"Here is exactly what is happening."

"Here is what you need to do (or not do)."

---

# Category 1: Pre-Submission Errors

---

## 1.1 Amount Exceeds Position Value

**Trigger**: User enters withdrawal amount > current position value.

**Detection**: Real-time validation against position value.

**UI Response**:

Inline error: "Amount exceeds your position value of 5,000 USDC."

"MAX" button sets to full position value.

---

## 1.2 Amount Below Minimum Withdrawal

**Trigger**: User enters amount below vault minimum withdrawal.

**UI Response**:

Inline error: "Minimum withdrawal is X USDC."

---

## 1.3 No Active Position

**Trigger**: User somehow accesses withdraw modal with no position.

**Prevention**: Withdraw button should never be accessible without position.

**Fallback UI**:

"You don't have an active position in this vault."

CTA: "View Your Portfolio" → /portfolio

---

## 1.4 Existing Pending Withdrawal (Same Vault)

**Trigger**: User already has a pending withdrawal for the same vault.

**UI Response**:

```
You already have a pending withdrawal

A withdrawal of 3,000 USDC from this vault
is currently processing.

Estimated completion: ~2 days

Would you like to request an additional withdrawal?
Some vaults allow multiple pending withdrawals.

[ View Pending Withdrawal ]   [ Continue Anyway ]
```

If vault does not support multiple withdrawals:

"This vault only allows one withdrawal at a time. Please wait for your current withdrawal to complete."

---

## 1.5 Vault Withdrawal Paused

**Trigger**: Vault withdrawals are temporarily suspended.

**UI Response**:

```
Withdrawals temporarily paused.

This vault's withdrawal processing is paused for maintenance.
Expected to resume: [time estimate or "soon"].

Your position and earnings are safe.
You can submit a withdrawal request once processing resumes.

[ Close ]
```

---

## 1.6 Wrong Network

Same handling as deposit — network switch prompt before modal opens.

---

# Category 2: Wallet Signature Errors

---

## 2.1 User Rejects Signature

**UI Response**:

```
Withdrawal request cancelled.

You rejected the transaction in your wallet.
No withdrawal was submitted.
Your position remains active.

[ Try Again ]   [ Cancel ]
```

Key message: "Your position remains active." Reassures user no funds were lost.

---

## 2.2 Wallet Timeout

**UI Response**:

"Wallet request timed out. Your position was not affected."

CTA: "Try Again"

---

## 2.3 Gas Failure

**UI Response**:

"Unable to estimate fees. Ensure you have enough HYPE for gas."

Show estimated gas range if available.

---

# Category 3: Submission and Processing Errors

---

## 3.1 Transaction Reverted On-Chain

**Trigger**: Withdrawal request transaction submitted but reverted.

**UI Response**:

```
Withdrawal request failed.

Your request could not be submitted.
Your position value was not affected.

Common causes:
• Vault capacity issue
• Network congestion
• Insufficient gas

[ Try Again ]   [ Contact Support ]
```

---

## 3.2 Transaction Submitted But Not Confirmed

**Trigger**: Transaction broadcast but no on-chain confirmation after 5 minutes.

**UI Response**:

```
Submission pending.

Your withdrawal request was sent but hasn't confirmed yet.
This sometimes happens during network congestion.

Transaction: 0x1234...5678
[ View on Explorer ]

[ I'll check back later ]
```

Toast on modal close: "Withdrawal request pending. We'll notify you when it confirms."

Portfolio shows "Withdrawal pending confirmation" status.

---

## 3.3 Withdrawal Stuck in Processing

**Trigger**: Withdrawal has been in "Processing" status for longer than expected (e.g., 2× estimated time).

**Detection**: Backend detects delay, triggers notification.

**UI Response** (in Portfolio pending widget):

Status badge changes: "Processing — Taking longer than expected"

Additional text: "Your withdrawal is taking longer than usual. This does not mean your funds are at risk. Contact support if you have concerns."

CTA: "Contact Support"

Notification sent to user.

---

## 3.4 Withdrawal Partially Completed

**Trigger**: Only part of the requested amount is transferred.

**UI Response** (notification):

"Partial withdrawal completed. X USDC of Y USDC requested has been transferred to your wallet. Remaining amount is still processing."

Portfolio updates to show remaining pending amount.

---

# Category 4: Multiple Withdrawals

---

## 4.1 Multiple Withdrawals from Different Vaults

Allowed. Each vault's withdrawal is independent.

Portfolio pending widget shows each separately with its own timeline.

---

## 4.2 Multiple Withdrawals from Same Vault

Behavior depends on vault configuration.

If supported: each is tracked independently with separate timeline.

If not supported: user is informed before submitting (see 1.4 above).

---

# Category 5: Wallet Disconnect During Processing

---

## 5.1 Wallet Disconnects After Submission

**Trigger**: User disconnects wallet after withdrawal request is submitted.

**Outcome**: Withdrawal continues processing on-chain — it does not stop.

**UI Response** (on reconnection):

Portfolio automatically shows pending withdrawal when wallet reconnects.

Notification history includes the withdrawal event.

No funds are lost.

---

## 5.2 User Opens App with Pending Withdrawal on New Device

**Trigger**: User connects wallet from a different device with a pending withdrawal.

**Outcome**: Withdrawal status is server-side — shows correctly regardless of device.

Portfolio pending widget shows correctly.

---

# Category 6: Post-Withdrawal Issues

---

## 6.1 Funds Transferred But Portfolio Still Shows Pending

**Trigger**: Transfer complete but Portfolio hasn't refreshed.

**Detection**: Notification shows "Withdrawal Complete" but Portfolio still shows pending.

**Resolution**: Automatic — Portfolio refreshes within 60 seconds.

If not refreshed: "Refresh" button available in pending widget.

---

## 6.2 User Receives Less Than Expected

**Trigger**: User receives less than the requested withdrawal amount (fees, rounding).

**Expectation Management** (set in Review step):

Show "Estimated received amount" — not exact.

Note: "Actual amount may vary slightly due to fees."

**Post-transfer**: Activity record shows exact amount received.

---

## 6.3 Transfer to Wrong Address

**Trigger**: Funds sent to a different address than connected wallet.

**Prevention**: Always show destination address in Review step.

User confirms they are viewing correct address.

**If this happens**: Contact support — Harmonix cannot reverse on-chain transactions.

---

## 6.4 Withdrawal Cancelled by Protocol

**Trigger**: Rare edge case — operator cancels withdrawal.

**UI Response** (notification):

"Your withdrawal request has been cancelled. Please check the notification for details."

Portfolio shows position restored (if shares were returned).

Detailed explanation provided in notification.

CTA: "Contact Support" + "Re-request Withdrawal"

---

# Category 7: Emergency Scenarios

---

## 7.1 Vault Emergency Pause (All Withdrawals Halted)

**Trigger**: Critical security issue forces vault to pause all operations.

**UI Response**:

Emergency banner on Portfolio and Vault pages:

```
⚠ Vault operations paused

Delta Neutral USDC operations have been temporarily
paused due to a security review.

Your funds are safe. Withdrawals will resume
once the review is complete.

We will notify you with updates.

[ Learn More ]
```

No withdrawal option shown during pause.

Regular status updates via notifications.

---

## 7.2 Network Outage Affecting Operator

**Trigger**: Backend service outage delays withdrawal processing.

**UI Response** (status page / notification):

"Withdrawal processing is delayed due to a temporary service issue. Your funds are safe. Estimated recovery: [time]."

No user action required.

---

# Pending Withdrawal States in Portfolio

| State | Badge | Description |
|-------|-------|-------------|
| Queued | Orange "Queued" | Submitted, waiting for operator |
| Processing | Blue "Processing" | Operator executing |
| Delayed | Yellow "Delayed" | Taking longer than expected |
| Transferred | Green "Transferred" | Funds sent, confirming |
| Completed | Green "Completed" | Funds arrived in wallet |
| Failed | Red "Failed" | Error occurred, action needed |
| Cancelled | Gray "Cancelled" | Cancelled by protocol or user |

---

# Final Withdraw Edge Case Principle

A withdrawal is the ultimate trust test.

Users gave Harmonix their money.

Now they want it back.

Every edge case in the withdrawal flow must communicate:

"Your money is safe."

"We are working on it."

"Here is exactly what is happening."

If Harmonix can deliver that message in every scenario —

even the difficult ones —

users will return.
