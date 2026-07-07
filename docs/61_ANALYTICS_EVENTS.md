# Harmonix V2

# Analytics Events

Version 2.0

---

# Purpose

This document defines all analytics events tracked in Harmonix V2.

Analytics events are the raw data that feed into Product Metrics.

Every user interaction that matters should generate an event.

Every event must have a clear purpose.

---

# Event Philosophy

Only track what is actionable.

If an event does not inform a product decision, do not track it.

Events are not surveillance.

Events are feedback.

---

# Event Structure

Every event follows this format:

```
{
  event: string,         // event name
  properties: {
    userId?: string,     // wallet address (hashed)
    timestamp: string,   // ISO 8601
    page: string,        // current route
    ...contextProperties
  }
}
```

---

# Event Naming Convention

Format: `noun_verb` (snake_case)

Examples:

`deposit_initiated`

`withdraw_completed`

`vault_viewed`

`wallet_connected`

Never use: camelCase, PascalCase, or spaces.

---

# Authentication Events

## wallet_connected

Trigger: User successfully connects a wallet.

Properties:

wallet_address (hashed)

network

connector_type (e.g., MetaMask, WalletConnect)

---

## wallet_disconnected

Trigger: User disconnects wallet.

Properties:

wallet_address (hashed)

session_duration_seconds

---

# Navigation Events

## page_viewed

Trigger: User views any page.

Properties:

page_name (home, earn, portfolio, rewards, settings)

referrer_page

---

## vault_viewed

Trigger: User opens Vault Detail page.

Properties:

vault_id

vault_name

source (earn_list, home_recommended, search)

---

# Deposit Events

## deposit_modal_opened

Trigger: User opens Deposit modal.

Properties:

vault_id

source (vault_card, vault_detail, portfolio)

---

## deposit_amount_entered

Trigger: User fills in deposit amount and proceeds.

Properties:

vault_id

amount

asset

---

## deposit_review_viewed

Trigger: User reaches Step 2 (Review).

Properties:

vault_id

amount

estimated_apy

---

## deposit_confirmed

Trigger: User clicks "Confirm Deposit" in Step 2.

Properties:

vault_id

amount

asset

estimated_apy

---

## deposit_wallet_signed

Trigger: Wallet signature confirmed.

Properties:

vault_id

amount

tx_hash

---

## deposit_completed

Trigger: Deposit transaction confirmed on-chain.

Properties:

vault_id

amount

asset

tx_hash

time_to_confirm_seconds

---

## deposit_failed

Trigger: Deposit transaction fails.

Properties:

vault_id

amount

error_code

error_message

step (wallet_sign, on_chain)

---

## deposit_abandoned

Trigger: User closes modal before completing.

Properties:

vault_id

amount_entered

last_step (input, review, signing)

---

# Withdrawal Events

## withdraw_modal_opened

Trigger: User opens Withdraw modal.

Properties:

vault_id

source (portfolio, vault_detail)

position_value

---

## withdraw_amount_entered

Trigger: User fills in withdraw amount.

Properties:

vault_id

amount

---

## withdraw_confirmed

Trigger: User confirms withdrawal request.

Properties:

vault_id

amount

asset

---

## withdraw_submitted

Trigger: Withdrawal transaction submitted to chain.

Properties:

vault_id

amount

tx_hash

estimated_completion_days

---

## withdraw_completed

Trigger: Funds transferred to user wallet.

Properties:

vault_id

amount

asset

processing_time_hours

---

## withdraw_failed

Trigger: Withdrawal process fails.

Properties:

vault_id

amount

error_code

step (signing, processing)

---

## withdraw_abandoned

Trigger: User closes modal before completing.

Properties:

vault_id

amount_entered

last_step

---

# Portfolio Events

## portfolio_viewed

Trigger: User views Portfolio page.

Properties:

portfolio_value

position_count

has_pending_withdrawal

---

## position_expanded

Trigger: User expands a position card for details.

Properties:

vault_id

position_value

---

# Vault Discovery Events

## vault_list_filtered

Trigger: User applies a filter on Earn page.

Properties:

filter_type (asset, risk, sort)

filter_value

results_count

---

## vault_searched

Trigger: User types in search field.

Properties:

query

results_count

---

## vault_compared

Trigger: User uses compare functionality (if implemented).

Properties:

vault_ids (array)

---

# Notification Events

## notification_drawer_opened

Trigger: User opens notification drawer.

Properties:

unread_count

---

## notification_read

Trigger: User reads (clicks) a notification.

Properties:

notification_id

notification_type

time_since_created_hours

---

## notification_all_read

Trigger: User clicks "Mark All Read".

Properties:

notifications_marked_count

---

# Rewards Events

## rewards_viewed

Trigger: User views Rewards page.

Properties:

total_points

active_campaigns_count

---

## campaign_viewed

Trigger: User views a specific campaign.

Properties:

campaign_id

campaign_name

is_enrolled

---

## campaign_joined

Trigger: User joins a campaign.

Properties:

campaign_id

campaign_name

---

# Error Events

## error_occurred

Trigger: Any caught error with user impact.

Properties:

error_type

error_message

page

component

---

## transaction_error

Trigger: Transaction-specific errors.

Properties:

transaction_type (deposit, withdraw)

error_code

vault_id

---

# Event Governance

New events must be:

1. Documented in this file before implementation.

2. Reviewed for PII compliance (never track raw wallet addresses — always hash).

3. Connected to at least one product metric in 60_PRODUCT_METRICS.md.

---

# Privacy Rules

Never track: raw wallet addresses, IP addresses, browser fingerprints.

Always hash wallet addresses before logging.

Comply with applicable data privacy requirements.

Users must be informed about analytics tracking (via privacy policy).

---

# Implementation Note

Analytics calls belong in hooks, not components.

```
// Good
const { trackDepositCompleted } = useAnalytics()
trackDepositCompleted({ vault_id, amount, tx_hash })

// Bad — direct tracking inside component
analytics.track('deposit_completed', ...)
```

---

# Final Analytics Principle

Track the journey, not the user.

Every event should answer:

"Did users achieve their goal?"

Not:

"How many times did users click this button?"
