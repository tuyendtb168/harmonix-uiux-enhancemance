# Harmonix V2

# Wallet Connection UX

Version 2.0

---

# Purpose

This document defines the wallet connection experience in Harmonix V2.

Wallet connection is the identity layer of the application.

It is not a technical step.

It is the moment a user decides to trust Harmonix with their identity.

---

# Connection Philosophy

Make connection as simple as possible.

Never require more than wallet address to start.

Never store anything beyond the address.

Connection is always reversible.

---

# Wallet Selection Modal

Triggered by:

"Connect Wallet" button in navigation.

Any action that requires authentication (Deposit, Withdraw, Portfolio view).

---

## Modal Layout

```
┌────────────────────────────────────────┐
│  Connect Wallet              [ × ]     │
├────────────────────────────────────────┤
│                                        │
│  Choose how you'd like to connect.     │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  🦊 MetaMask                     │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  🔗 WalletConnect                │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  🟦 Coinbase Wallet              │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  ···  More options               │  │
│  └──────────────────────────────────┘  │
│                                        │
│  By connecting, you agree to our       │
│  Terms of Service and Privacy Policy.  │
│                                        │
└────────────────────────────────────────┘
```

---

# Supported Wallets

## V2 Launch

MetaMask (browser extension + mobile)

WalletConnect v2 (universal)

Coinbase Wallet

---

## Future

Ledger (hardware wallet)

Safe (multisig)

Rabby Wallet

---

# Connection Flow

## Step 1: User clicks "Connect Wallet"

Wallet selection modal opens.

---

## Step 2: User selects wallet

If browser extension detected: proceeds to extension approval.

If WalletConnect: shows QR code.

If mobile deep link: opens wallet app.

---

## Step 3: Wallet approval

User approves connection in their wallet.

This is read-only — no transaction is signed.

---

## Step 4: Network check

After connection, check current network.

If correct network (Hyperliquid): proceed.

If wrong network: show network switch prompt.

---

## Step 5: Connected state

Navigation updates:

Wallet button shows truncated address: `0x1234...5678`

Or ENS name if available: `harmonix.eth`

Notification badge may appear if pending notifications.

---

# Network Switch Flow

If user is on wrong network after connecting:

```
┌────────────────────────────────────────────┐
│  Wrong Network                   [ × ]     │
├────────────────────────────────────────────┤
│                                            │
│  You're connected to Ethereum Mainnet.     │
│                                            │
│  Harmonix runs on Hyperliquid.             │
│  Please switch networks to continue.       │
│                                            │
│  [ Switch to Hyperliquid ]                 │
│                                            │
│  [ Disconnect ]                            │
│                                            │
└────────────────────────────────────────────┘
```

"Switch to Hyperliquid" triggers `wallet_switchEthereumChain` or equivalent.

If network not configured in wallet: trigger `wallet_addEthereumChain`.

---

# Wallet Not Found State

If user clicks "MetaMask" but extension is not installed:

```
MetaMask not found.

Install MetaMask to connect with this option.

[ Install MetaMask ↗ ]   [ Use WalletConnect instead ]
```

Opens installation link in new tab.

Does not close the modal.

---

# Mobile Wallet Connection

## WalletConnect on Mobile

Show QR code for desktop.

On mobile: show "Open in Wallet" button that deep-links to wallet app.

After wallet app approval: app resumes session.

---

## MetaMask Mobile

If user is inside MetaMask mobile browser: auto-detect and connect.

If user is in a regular mobile browser: redirect to MetaMask mobile deep link.

---

# Wallet Panel (Connected State)

Accessible from navigation wallet button.

Opens as a drawer (right on desktop, bottom on mobile).

---

## Wallet Panel Content

```
┌──────────────────────────────────────────┐
│  Your Wallet                   [ × ]     │
├──────────────────────────────────────────┤
│                                          │
│  [Avatar]  0x1234...5678                 │
│            harmonix.eth                  │
│            Hyperliquid Network           │
│                                          │
│  Portfolio Value:  $12,450               │
│                                          │
│  ────────────────────────────────────    │
│                                          │
│  [ Copy Address ]                        │
│  [ View on Explorer ↗ ]                  │
│  [ Settings ]                            │
│                                          │
│  ────────────────────────────────────    │
│                                          │
│  [ Disconnect Wallet ]                   │
│                                          │
└──────────────────────────────────────────┘
```

---

# Disconnect Flow

User clicks "Disconnect Wallet" in wallet panel.

Confirmation dialog:

```
Disconnect wallet?

0x1234...5678 will be disconnected.
Your portfolio data will not be affected.

[ Cancel ]   [ Disconnect ]
```

After disconnect:

Navigation reverts to "Connect Wallet."

Portfolio data clears from view (not deleted).

User lands on Home page.

---

# Session Persistence

On page reload: attempt to reconnect previously connected wallet silently.

Do NOT auto-trigger wallet popup on reload — wait for user click.

Show a subtle banner: "Welcome back. Reconnect to view your portfolio."

On first visit: no reconnect attempt.

---

# ENS Display

If wallet address has an ENS name:

Show ENS name as primary identifier.

Show truncated address as secondary.

Format: `harmonix.eth (0x1234...5678)`

---

# Wallet Avatar

Generated deterministically from wallet address.

Uses a visual hash function (e.g., gradient + geometric pattern).

Displayed in:

Navigation wallet button.

Wallet panel header.

Settings page.

---

# Multiple Wallets

V2 supports one connected wallet at a time.

Switching wallets: disconnect current → connect new.

No multi-wallet management in V2.

---

# Security Rules

Connection is read-only — no permissions granted beyond address.

Never store private keys.

Never store seed phrases.

Never ask for signature at connection time (only at transaction time).

Display security notice in wallet panel:

"Harmonix will never ask for your seed phrase."

---

# Error States

| Error | Message |
|-------|---------|
| User rejected connection | "Connection cancelled. You can try again anytime." |
| Wallet timeout | "Wallet response timed out. Please try again." |
| Network error | "Could not connect. Check your wallet and try again." |
| Already connected | (silent — show connected state directly) |
| Wrong network | "Please switch to Hyperliquid to continue." |

---

# Accessibility

Wallet modal: standard modal accessibility (see `44_MODAL.md`).

Focus moves to modal on open.

Wallet options: keyboard navigable with arrow keys.

"Disconnect" button: clearly labeled, not icon-only.

---

# Final Wallet Connection Principle

Wallet connection is trust.

Users are giving Harmonix permission to see their identity.

Every step should communicate:

"We only see your address."

"We will never take more than you give."

"You can disconnect anytime."

That promise must be kept.
