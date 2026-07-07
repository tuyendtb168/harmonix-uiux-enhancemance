# Harmonix V2

# Domain Language & Domain Model

Version 2.0

---

# Purpose

This document establishes the shared vocabulary and domain model for Harmonix V2.

The purpose is to ensure that Product, Design, Engineering, and AI coding assistants all use the same language when referring to the same concept.

A single business concept should have a single canonical name.

Avoid synonyms unless explicitly required for technical implementation.

---

# Core Product Domain

Harmonix is not a trading platform.

Harmonix is not a lending platform.

Harmonix is a Yield Management Platform.

The domain revolves around helping users allocate capital into managed yield strategies, monitor performance, and withdraw assets with confidence.

The core business entities are intentionally simple.

Everything in the product is built around them.

---

# Domain Principles

The domain model follows four principles.

1. Business language over technical language.

2. One concept = One name.

3. User terminology differs from protocol terminology.

4. UI should expose business concepts, not blockchain mechanics.

---

# Vocabulary Mapping

| Technical | Business | User-facing UI |
|------------|----------|----------------|
| Operator Fulfill | Withdrawal Processing | Processing |
| Claim | Receive Funds | Funds Received |
| Redeem | Withdraw Completion | Money Sent |
| Vault Shares | Position | Your Position |
| Strategy Allocation | Portfolio Allocation | Allocation |
| Rewards Distribution | Rewards | Rewards |
| Settlement | Processing | Processing |
| Pending Claim | Pending Withdrawal | Processing |
| Transaction Hash | Explorer Link | View on Explorer |

Whenever possible,

use the User-facing terminology inside the interface.

---

# Core Domain Objects

The product is composed of several primary business objects.

These objects should exist consistently across backend, frontend, APIs, and documentation.

---

# User

Represents a wallet owner using Harmonix.

Purpose

Own assets.

Deposit.

Withdraw.

Receive rewards.

Receive notifications.

Properties

Wallet Address

ENS

Portfolio

Rewards

Activity

Notifications

Relationships

User

↓

owns

↓

Portfolio

↓

contains

↓

Positions

---

# Portfolio

Purpose

Represents the user's entire financial relationship with Harmonix.

Portfolio is NOT a list of transactions.

Portfolio is a financial summary.

Properties

Portfolio Value

Total Deposited

Total Earnings

Current APY

Allocation

Pending Withdrawals

Activity

Rewards Summary

Children

Positions

Pending Withdrawals

Activities

Rewards

Portfolio always belongs to exactly one User.

---

# Position

Purpose

Represents an active investment inside one vault.

Properties

Vault

Asset

Deposited Amount

Current Value

Current Yield

APY

Status

Relationships

Portfolio

↓

contains

↓

Position

Position

↓

belongs to

↓

Vault

---

# Vault

Purpose

Represents one investment opportunity.

A Vault should never contain user information.

Vault is a public product.

Properties

Vault Name

Asset

Strategy

TVL

APY

Risk Level

Performance

Capacity

Allocation

Relationships

Vault

↓

contains

↓

Strategy

Vault

↓

contains many

↓

Positions

---

# Strategy

Purpose

Explains how yield is generated.

Strategies are educational.

They are not investment objects.

Properties

Description

Protocols

Allocation

Risk

Historical Performance

Strategies belong to Vaults.

---

# Deposit

Purpose

Represents an investment action.

Deposit is temporary.

After completion,

its result becomes a Position.

Properties

Amount

Vault

Estimated Shares

Timestamp

Transaction

Status

Lifecycle

Created

↓

Signing

↓

Processing

↓

Completed

↓

Archived

---

# Withdrawal

Purpose

Represents an exit request.

Withdrawal is temporary.

Once completed,

funds leave Harmonix.

Properties

Requested Amount

Vault

Status

ETA

Timeline

Transaction

Lifecycle

Requested

↓

Queued

↓

Processing

↓

Transferred

↓

Completed

Important

Withdrawal should never expose protocol steps like "Redeem" or "Claim" to end users.

---

# Pending Withdrawal

Purpose

Represents assets currently leaving Harmonix.

Pending Withdrawals are still part of Portfolio.

Users psychologically still consider them "their money."

Properties

Amount

Vault

ETA

Current Step

Timeline

Notification Status

Pending Withdrawals disappear only after transfer completes.

---

# Reward

Purpose

Represents additional incentives.

Rewards are supplementary.

They are never the primary investment.

Properties

Points

Campaign

Claim Status

History

Source

Rewards belong to Portfolio.

---

# Campaign

Purpose

Represents a time-limited incentive program.

Properties

Name

Description

Start

End

Multiplier

Eligibility

Rewards

Campaigns never modify investment logic.

---

# Notification

Purpose

Communicates important events.

Notifications reduce uncertainty.

Properties

Type

Timestamp

Read

Priority

Deep Link

Possible Types

Deposit Completed

Withdraw Completed

Campaign

Reward

Security

Maintenance

Notifications never contain marketing language.

---

# Activity

Purpose

Chronological record of meaningful user events.

Activity is not blockchain history.

Activity is business history.

Examples

Deposited

Withdraw Requested

Funds Received

Reward Claimed

Campaign Joined

Wallet Connected

---

# Timeline

Purpose

Visual representation of progress.

Timeline is used only for long-running operations.

Examples

Withdraw

Deposit

Migration

Timeline is never used for completed history.

---

# Market Overview

Purpose

Provide ecosystem context.

Not user-specific.

Properties

TVL

Market APY

Trending Vaults

Announcements

---

# Recommended Vault

Purpose

Reduce decision fatigue.

Recommended Vaults are curated.

They are not personalized.

Initially they may be static.

Future versions may become personalized.

---

# Status Model

Only six statuses are allowed.

Pending

Processing

Completed

Failed

Cancelled

Paused

Avoid introducing additional status names.

Consistency improves comprehension.

---

# Ownership Model

Every domain object has exactly one owner.

| Object | Owner |
|---------|-------|
| Portfolio | User |
| Position | Portfolio |
| Vault | Platform |
| Strategy | Vault |
| Deposit | User |
| Withdrawal | User |
| Pending Withdrawal | Portfolio |
| Reward | Portfolio |
| Campaign | Platform |
| Notification | User |
| Activity | Portfolio |

Never duplicate ownership.

---

# Data Lifetime

Permanent

Portfolio

Vault

Strategy

Activity

Temporary

Deposit

Withdrawal

Notification

Transient

Loading

Signing

Confirmation

Understanding data lifetime simplifies frontend state management.

---

# UI Mapping

| Domain Object | Main Screen |
|---------------|-------------|
| Portfolio | Portfolio |
| Vault | Earn |
| Strategy | Vault Detail |
| Deposit | Deposit Flow |
| Withdrawal | Withdraw Flow |
| Pending Withdrawal | Portfolio |
| Reward | Rewards |
| Campaign | Rewards |
| Notification | Notification Drawer |
| Activity | Portfolio |

Every object should have one primary screen.

---

# Naming Rules

Always use business language.

Use:

Portfolio

Position

Vault

Reward

Withdrawal

Notification

Avoid exposing:

Settlement

Operator

Fulfill

Claim

Redeem

Share Mint

Unless inside technical documentation.

---

# Future Expansion

The domain model should remain stable even if new products are introduced.

Future additions may include:

Auto Reinvest

Multi-Asset Portfolio

Institutional Accounts

Yield Analytics

Risk Dashboard

Because the domain model is stable,

new products should extend existing concepts instead of creating parallel ones.

---

# Final Principle

The domain model is the foundation of Harmonix.

Features may change.

UI may evolve.

Technology may be replaced.

The domain language should remain stable.

A consistent language creates a consistent product.
