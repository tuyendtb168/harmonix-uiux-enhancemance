# Harmonix V2

# Notification Page Specification

Version 2.0

---

# Purpose

Notifications reduce uncertainty.

Notifications answer one question:

"Did anything happen while I was away?"

Notifications are NOT marketing.

Notifications communicate state changes that matter to users.

---

# Primary Intent

Inform users of important events.

Reduce uncertainty about asset status.

Provide direct links to relevant pages.

---

# Structure

Notifications exist in two places:

1. Notification Drawer — accessible from the navigation bar icon.

2. Notification History — a scrollable list inside the drawer or a dedicated section.

Notifications are NOT a standalone page.

They are a global drawer component.

---

# Notification Drawer Layout

```
┌────────────────────────────────────────────────┐
│  Notifications                   [Mark All Read] │
├────────────────────────────────────────────────┤
│                                                │
│  ● Withdrawal Complete                  2h ago │
│    5,000 USDC transferred to your wallet.      │
│    [View Portfolio →]                          │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│  ● Deposit Confirmed                    1d ago │
│    5,000 USDC deposited into Delta Neutral.    │
│    [View Portfolio →]                          │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│    Campaign Started                     2d ago │
│    Summer Yield Campaign is now live.          │
│    [View Rewards →]                            │
│                                                │
├────────────────────────────────────────────────┤
│                   Load More                    │
└────────────────────────────────────────────────┘
```

---

# Notification Item Structure

```
[ Unread Indicator ]  [ Icon ]  [ Title ]        [ Timestamp ]
                               [ Description ]
                               [ CTA (optional) ]
```

---

## Unread Indicator

Blue dot on the left side.

Disappears when notification is read.

---

## Icon

Icon represents notification type:

Deposit: down-arrow or wallet icon

Withdrawal: up-arrow or transfer icon

Reward: star or gift icon

Campaign: megaphone icon

Security: shield icon

Maintenance: wrench icon

---

## Title

Short, direct.

Example: "Withdrawal Complete"

---

## Description

One to two sentences.

Plain language.

---

## Timestamp

Relative time: "2 hours ago", "3 days ago"

Tooltip on hover shows exact date/time.

---

## CTA

Optional.

Only when there is a meaningful next action.

Examples:

"View Portfolio →"

"View Rewards →"

"View Transaction →"

---

# Notification Types

## 1. Deposit Completed

Trigger: Deposit transaction confirmed on-chain.

Title: "Deposit Confirmed"

Description: "{amount} {asset} deposited into {vault name}."

CTA: "View Portfolio →"

Priority: Normal

---

## 2. Withdrawal Completed

Trigger: Funds transferred to user's wallet.

Title: "Withdrawal Complete"

Description: "{amount} {asset} transferred to your wallet."

CTA: "View Portfolio →"

Priority: High

---

## 3. Reward Earned

Trigger: Points credited from campaign or activity.

Title: "Rewards Earned"

Description: "You earned {points} points from {source}."

CTA: "View Rewards →"

Priority: Low

---

## 4. Campaign Started

Trigger: New campaign launches.

Title: "New Campaign Available"

Description: "{campaign name} is now live. {brief description}."

CTA: "View Campaign →"

Priority: Normal

---

## 5. Campaign Ending Soon

Trigger: Campaign ending within 48 hours.

Title: "Campaign Ending Soon"

Description: "{campaign name} ends in {time}."

CTA: "View Campaign →"

Priority: Normal

---

## 6. Security Notice

Trigger: Unusual activity or important security update.

Title: "Security Notice"

Description: Context-specific.

CTA: Context-specific.

Priority: High

---

## 7. Maintenance Notice

Trigger: Scheduled maintenance affecting deposits or withdrawals.

Title: "Scheduled Maintenance"

Description: "{feature} will be unavailable from {time} to {time}."

Priority: High

---

# Notification Badge

The notification icon in the navigation bar shows an unread count badge.

Badge appears when: at least one unread notification exists.

Badge disappears when: all notifications are marked as read.

Maximum display: "9+" for counts above 9.

---

# Mark as Read

Individual: clicking/tapping a notification marks it as read.

Bulk: "Mark All Read" button at the top of the drawer.

---

# Empty State

When no notifications exist:

Icon: bell or inbox

Message: "You're all caught up."

Sub-message: "We'll notify you when something important happens."

---

# Drawer Behavior

Opens: clicking notification icon in navigation.

Closes: clicking outside drawer, pressing Escape, or clicking X.

Scroll: independent scroll within drawer.

Does not block page interaction.

---

# Notification Rules

Never use marketing language.

Every notification explains what happened.

Every notification that requires action provides a CTA.

Notifications must never create panic or urgency.

Maximum notification frequency: not more than one per event type per session unless significant.

---

# Toast Notifications

For immediate feedback (not the drawer):

Deposit submitted: "Deposit submitted. Check your portfolio shortly."

Withdrawal submitted: "Withdrawal requested. Funds will arrive automatically."

Error: "Transaction failed. Please try again."

Toast auto-dismisses after 4 seconds (errors stay until dismissed).

---

# Loading State

Drawer opens immediately with skeleton rows while data loads.

---

# Accessibility

Drawer is announced to screen readers when it opens.

`aria-live="polite"` for new notification arrivals.

Focus trap inside drawer when open.

Escape key always closes drawer.

---

# Success Criteria

User immediately understands what happened.

User can navigate to relevant page in one click.

User never needs to check their wallet to confirm an operation.

---

# Failure States

User is uncertain whether their withdrawal completed.

User discovers completed actions only by visiting Portfolio manually.

User misses a campaign because they were not notified.

---

# Final Notification Principle

Notifications are the application's memory.

They exist so users never have to remember.

Every notification should make users feel:

"The system is watching out for me."

Never:

"I am being marketed to."
