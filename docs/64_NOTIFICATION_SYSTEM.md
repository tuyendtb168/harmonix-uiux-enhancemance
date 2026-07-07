# Harmonix V2

# Notification System

Version 2.0

---

# Purpose

This document defines the technical architecture and behavior of the Harmonix notification system.

The notification system is the application's communication layer.

It ensures users never miss important events.

---

# System Philosophy

Notifications are state changes that matter to users.

Not marketing.

Not engagement tricks.

Every notification must be justified by user value.

---

# Notification Architecture

The notification system has four layers:

1. Event Source — on-chain or off-chain events that trigger notifications.

2. Notification Service — creates and stores notification records.

3. Delivery Layer — delivers notifications to the frontend.

4. Presentation Layer — renders notifications in UI (Drawer + Toast).

---

# Event Sources

## On-Chain Events

Deposit confirmed — transaction confirmed on-chain.

Withdrawal processing — operator picks up withdrawal request.

Withdrawal transferred — funds leave contract to user wallet.

Reward distributed — protocol distributes rewards.

---

## Off-Chain Events

Campaign started — new campaign activates.

Campaign ending soon — campaign ending in < 48 hours.

Maintenance scheduled — planned downtime approaching.

Security notice — important security announcement.

---

# Notification Types

| Type | Source | Priority | Auto-dismiss |
|------|--------|----------|-------------|
| deposit_completed | On-chain | Normal | No |
| withdrawal_completed | On-chain | High | No |
| withdrawal_processing | On-chain | Normal | No |
| reward_earned | On-chain | Low | Yes (7 days) |
| campaign_started | Off-chain | Normal | Yes (7 days) |
| campaign_ending | Off-chain | Normal | Yes (24h after end) |
| security_notice | Off-chain | High | No |
| maintenance | Off-chain | High | Yes (after end) |

---

# Notification Data Model

```typescript
interface Notification {
  id: string
  userId: string                    // hashed wallet address
  type: NotificationType
  title: string
  description: string
  read: boolean
  createdAt: string                 // ISO 8601
  expiresAt?: string                // ISO 8601 (optional)
  priority: 'low' | 'normal' | 'high'
  deepLink?: string                 // route to navigate to
  metadata?: Record<string, any>   // type-specific data
}
```

---

# Notification Triggers (by user action)

## Deposit Flow

1. User initiates deposit → no notification yet.

2. Transaction submitted → Toast: "Deposit submitted. Processing..."

3. Transaction confirmed on-chain → Notification created: "Deposit Confirmed."

4. Portfolio updates automatically.

---

## Withdrawal Flow

1. User initiates withdrawal → no notification yet.

2. Withdrawal submitted → Toast: "Withdrawal requested."

3. Operator picks up → Notification: "Withdrawal Processing."

4. Funds transferred → Notification (High priority): "Withdrawal Complete."

5. Portfolio updates automatically.

---

# Unread Count

Global state: number of unread notifications.

Displayed as badge on notification icon in navigation.

Updates in real time via polling or WebSocket.

Badge resets when user opens notification drawer.

---

# Read State Management

Mark as read on:

User clicks a notification item.

User clicks "Mark All Read."

User navigates to the deep-linked page from a notification.

Do NOT auto-mark as read on drawer open — user must explicitly interact.

---

# Notification Persistence

Notifications are stored server-side per user.

Retention: 90 days.

After 90 days: auto-archived (not deleted, but hidden from main list).

High-priority security notices: retained indefinitely.

---

# Delivery to Frontend

## Polling (V2 Launch)

Poll every 30 seconds for new notifications.

On tab focus: immediate poll.

On deposit/withdrawal action: immediate poll (don't wait for interval).

---

## WebSocket (Future)

Real-time push delivery when WebSocket is available.

Polling serves as fallback.

---

# Frontend State

```typescript
interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  isLoading: boolean
  error: string | null
  lastFetched: string | null
}
```

---

# Toast vs Drawer Notification

| Event | Toast | Drawer |
|-------|-------|--------|
| User submits deposit | Yes (immediate feedback) | No |
| Deposit confirmed | Yes (brief) | Yes (persists) |
| Withdrawal submitted | Yes (immediate feedback) | No |
| Withdrawal completed | Yes (brief) | Yes (persists, high priority) |
| Campaign started | No | Yes |
| Maintenance | Yes (warning) | Yes |
| Security notice | Yes (warning) | Yes |

---

# Notification Copy Standards

See 24_COPYWRITING_GUIDELINES.md for notification copy rules.

Summary:

Factual language only.

No marketing copy.

Always state what happened.

Always state whether action is required.

---

# Notification Deduplication

Never create duplicate notifications for the same event.

If a deposit_completed notification already exists for tx_hash X,

do not create another.

Deduplication key: combination of `type` + `metadata.txHash` (or equivalent unique ID).

---

# Feature: Notification Deep Links

Every notification that relates to a specific resource should deep-link.

| Notification Type | Deep Link |
|------------------|-----------|
| deposit_completed | /portfolio |
| withdrawal_completed | /portfolio |
| withdrawal_processing | /portfolio |
| reward_earned | /rewards |
| campaign_started | /rewards |
| security_notice | /settings |

---

# Notification Hooks

```typescript
// Primary hook — use in Notification Drawer
const {
  notifications,
  unreadCount,
  markAsRead,
  markAllAsRead,
  isLoading
} = useNotifications()

// Global badge — use in Navbar
const { unreadCount } = useNotificationCount()
```

---

# Final Notification System Principle

A notification system earns trust by being useful.

It loses trust by being noisy.

Every notification the system sends should make the user think:

"Good thing it told me."

Never:

"Why is it telling me this?"
