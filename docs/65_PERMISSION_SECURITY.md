# Harmonix V2

# Permission & Security

Version 2.0

---

# Purpose

This document defines the security model, wallet permission handling, and user trust principles for Harmonix V2.

Security is not a feature.

Security is a baseline requirement.

---

# Security Philosophy

Trust is earned, not assumed.

Harmonix should never ask for more permissions than necessary.

Users should always understand what they are signing.

---

# Wallet Connection

## Principles

Connection is read-only by default.

Connecting a wallet does NOT authorize any transactions.

Connecting only reads: address, balance, network.

---

## Connection Flow

1. User clicks "Connect Wallet."

2. Wallet selection modal opens (MetaMask, WalletConnect, etc.).

3. User approves connection in wallet.

4. App reads address and network.

5. No transaction is signed at this step.

---

## Connection Persistence

Session: wallet stays connected for the browser session.

Persistence (optional): store wallet preference in localStorage (address only — never private keys).

On next visit: prompt to reconnect (do not auto-connect without user interaction).

---

# Transaction Signing

## Every Transaction Requires Explicit User Approval

Deposit: requires wallet signature.

Withdrawal: requires wallet signature.

Reward claim: requires wallet signature.

No action is executed without explicit user approval in their wallet.

---

## Signature Display

Before signing, users must see a clear summary:

Action being performed.

Amount involved.

Vault or destination.

No technical contract data in the primary view.

Technical data (contract address, function signature) available in "Advanced" section only.

---

## Double-Confirmation for Destructive Actions

Cancelling a withdrawal: requires confirmation dialog.

Disconnecting wallet: requires confirmation.

These actions require intentional user approval.

---

# Network Validation

Check network on wallet connect.

If user is on wrong network:

Show clear error: "Switch to the Hyperliquid network to continue."

Provide "Switch Network" button that triggers network switch in wallet.

Block all transactions until user is on the correct network.

---

# Input Validation

All user inputs are validated before submission.

Frontend validation: immediate (on input/blur).

Never trust frontend-only validation — backend validates independently.

Validation rules:

Amounts: positive numbers only, within balance, within vault limits.

Addresses: valid format only.

---

# Sensitive Data Handling

## What Harmonix Never Stores

Private keys.

Seed phrases.

Raw transaction signatures.

Personally identifiable information.

---

## What Harmonix Stores

Hashed wallet addresses (for analytics).

Notification records.

User preferences (theme, notification settings).

---

## What is Never Displayed

Private keys.

Seed phrases.

Full transaction signatures.

Internal contract error messages.

---

# Third-Party Integrations

External links (Explorer, Discord, Documentation) open in new tabs.

External links are clearly marked as external.

No user data is passed to third-party services without user consent.

Analytics events are anonymized (hashed wallet addresses).

---

# Content Security

Harmonix will never:

Ask users to share their private key or seed phrase.

Send DMs asking for wallet credentials.

Redirect users to external pages asking for wallet approval without clear context.

This commitment should be visible in the app (Security section in Settings).

---

# Error and Attack Surface Reduction

No raw error messages exposed to users.

Internal API errors are sanitized before display.

Input fields are sanitized to prevent injection.

URL parameters are validated before use.

No sensitive data in URL parameters.

---

# Security Notice Component

Displayed in Settings > Security:

```
Harmonix will never ask for your private key or seed phrase.

If anyone contacts you claiming to be Harmonix support
and asks for wallet credentials, it is a scam.

Report suspicious activity: [Discord link]
```

---

# Permission Model Summary

| Action | Permission Required | User Step |
|--------|-------------------|-----------|
| View vaults | None | None |
| View portfolio | Wallet connection | Connect wallet |
| Deposit | Wallet connection + signature | Sign in wallet |
| Withdraw | Wallet connection + signature | Sign in wallet |
| Claim rewards | Wallet connection + signature | Sign in wallet |
| Change settings | Wallet connection | None additional |

---

# Security Checklist

Before any release:

□ All API endpoints require authentication where applicable.

□ Input validation on all forms (client + server).

□ No sensitive data in console logs or error messages.

□ Wallet connection follows read-only principle.

□ All transactions require explicit wallet signature.

□ Network validation active.

□ External links open in new tab and are labeled.

□ Security notice displayed in Settings.

□ Analytics data anonymized.

□ No PII stored or transmitted.

---

# Final Security Principle

Security is trust infrastructure.

Every security decision should make users feel:

"This product respects my assets and my privacy."

Any decision that trades user security for convenience

is the wrong decision.
