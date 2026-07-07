# Harmonix V2

# Settings Page Specification

Version 2.0

---

# Purpose

Settings is the control center.

Settings answers one question:

"How do I configure my experience?"

Settings is a utility page.

It should never compete with Portfolio or Earn for user attention.

---

# Primary Intent

Manage account preferences.

Manage wallet connection.

Manage notification preferences.

Access security and support.

---

# Route

`/settings`

---

# Page Layout

```
┌──────────────────────────────────────────────────────┐
│                   TOP NAVIGATION                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  PAGE HEADER                                         │
│  "Settings"                                          │
│                                                      │
├────────────────────┬─────────────────────────────────┤
│                    │                                 │
│  SETTINGS NAV      │  SETTINGS CONTENT               │
│  (left sidebar)    │                                 │
│                    │                                 │
│  Account           │  [Selected section content]     │
│  Notifications     │                                 │
│  Display           │                                 │
│  Security          │                                 │
│  Support           │                                 │
│                    │                                 │
└────────────────────┴─────────────────────────────────┘
```

---

# Settings Sections

## 1. Account

## 2. Notifications

## 3. Display

## 4. Security

## 5. Support

---

# Section 1: Account

## Content

Connected Wallet

Address (truncated): 0x1234...5678

Network: Hyperliquid

ENS Name (if available): harmonix.eth

---

Actions:

Disconnect Wallet

Copy Address

View on Explorer

---

## Wallet Connection Status

Connected: show address, network, ENS.

Not Connected: show "Connect Wallet" CTA.

---

## Rules

Wallet disconnect requires a confirmation step.

"Are you sure you want to disconnect your wallet?"

CTA: "Disconnect" / "Cancel"

---

# Section 2: Notifications

## Purpose

Control what notifications the user receives.

---

## Toggles

| Notification Type | Default |
|------------------|---------|
| Deposit Confirmed | ON |
| Withdrawal Completed | ON |
| Rewards Earned | ON |
| Campaigns | ON |
| Security Notices | ON (cannot disable) |
| Maintenance Notices | ON (cannot disable) |

---

## Delivery Channels (Future)

In-app notifications (always available).

Email notifications (future — requires email connection).

Push notifications (future — requires browser permission).

---

## Rules

Security and Maintenance notifications cannot be disabled.

These are critical operational communications.

---

# Section 3: Display

## Purpose

Control visual preferences.

---

## Options

Theme:

Light (default)

Dark (future)

System (future)

---

Currency Display:

USD (default)

ETH

---

Number Format:

Standard (1,234.56)

Compact (1.2K)

---

Language: English (V2 launch)

Additional languages in future versions.

---

## Rules

Theme changes apply immediately without page reload.

Currency display affects all monetary values across the application.

---

# Section 4: Security

## Purpose

Provide security-related information and controls.

---

## Content

Connected Wallet: address + network

Session Information: last connected timestamp

---

## Actions

Disconnect All Sessions (if multi-session supported)

Export Activity History (CSV download)

---

## Security Notice

Display a brief reminder:

"Harmonix will never ask for your private key or seed phrase."

"Never share your wallet credentials with anyone."

---

# Section 5: Support

## Purpose

Connect users with help resources.

---

## Content

Documentation link: opens external docs.

Community: Discord link.

Report Issue: opens feedback form or external link.

FAQ: accordion with common questions.

---

## FAQ Topics

How long does withdrawal take?

Why is my deposit still processing?

How are rewards calculated?

What happens if I don't claim rewards?

How do I disconnect my wallet?

---

## Rules

FAQs should reduce support tickets.

All links open in new tab.

---

# Page State: Not Connected

Show a connection prompt at the top.

Account section shows "Connect Wallet."

All other sections still accessible (notifications, display, support).

---

# Mobile Layout

Left sidebar collapses into a top tab bar or dropdown selector.

Content fills full width.

---

# Loading State

Settings load immediately — no async data except wallet info.

Wallet section loads with skeleton if wallet data is fetching.

---

# Success Criteria

User can find any setting within 10 seconds.

User can disconnect wallet safely.

User understands notification controls.

---

# Failure States

User cannot find how to disconnect wallet.

User does not understand notification toggles.

User cannot find support.

---

# Final Settings Principle

Settings should be functional.

Not beautiful.

Not prominent.

Users should visit Settings rarely and find exactly what they need quickly.

The most important setting is often the one they need in a moment of uncertainty.

Make every setting findable in under 10 seconds.
