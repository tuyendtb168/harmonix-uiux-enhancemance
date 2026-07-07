# Harmonix V2

# Information Architecture

Version 2.0

---

# Purpose

This document defines the structural architecture of the Harmonix application.

Unlike UI specifications, this document focuses on:

- User navigation
- Information hierarchy
- Shared application structure
- Component ownership
- Navigation rules
- State relationships
- Cross-page interactions

Every page should exist for one purpose.

Every component should have one owner.

Every user journey should feel predictable.

---

# Application Structure

The application consists of five primary sections.

```
Home
Earn
Portfolio
Rewards
Settings
```

Everything else is a child flow.

---

# Navigation Philosophy

Navigation should represent user goals.

NOT system modules.

Users think:

"I want to invest."

NOT

"I want to access Vault Module."

Navigation must therefore map directly to user intentions.

---

# Global Navigation

```
-----------------------------------------------------

LOGO

Home

Earn

Portfolio

Rewards

Notifications

Wallet

-----------------------------------------------------
```

Navigation remains visible across the application.

Users should never lose orientation.

---

# Global Layout

Every page shares the same layout.

```
Top Navigation

↓

Page Header

↓

Primary Content

↓

Secondary Content

↓

Footer
```

This layout should never change.

Consistency builds trust.

---

# Primary Navigation Map

```
                    Home
                      │
        ┌─────────────┴─────────────┐
        │                           │
     Earn                      Portfolio
        │                           │
        │                           │
  Vault Detail                 Position Detail
        │                           │
        │                           │
 Deposit Flow                Withdraw Flow
        │                           │
        └─────────────┬─────────────┘
                      │
                Notifications

                      │

                  Rewards
```

Notice:

Rewards is independent.

Notifications are global.

Portfolio connects everything.

---

# Entry Points

There are three possible entry points.

## New User

Landing

↓

Home

↓

Earn

↓

Vault Detail

↓

Deposit

↓

Portfolio

---

## Returning User

Wallet Connect

↓

Portfolio

---

## Whale

Wallet Connect

↓

Portfolio

↓

Manage

---

The application should adapt naturally.

---

# User Journey

Complete lifecycle

```
Discover

↓

Compare

↓

Deposit

↓

Monitor

↓

Earn

↓

Withdraw

↓

Receive Funds

↓

Continue Investing
```

Everything supports this loop.

---

# Home

Purpose

Discovery

Children

None

Allowed Navigation

Earn

Rewards

Portfolio

Settings

Notifications

Wallet

---

Shared Components

Hero

Stats

Recommended Vault

Market Overview

News

Footer

---

State Ownership

Home never owns investment state.

Home only consumes data.

---

# Earn

Purpose

Investment Discovery

Children

Vault Detail

Deposit

Compare

---

Shared Components

Vault Card

Vault Filter

Search

Sorting

Risk Badge

APY Badge

---

State Ownership

Vault data.

Search state.

Filter state.

---

# Vault Detail

Purpose

Investment Decision

Children

Deposit

Withdraw

Performance

Strategy

---

Shared Components

Performance Chart

Allocation

Risk Card

Historical APY

Deposit Button

Withdraw Button

---

State Ownership

Vault information.

---

# Deposit Flow

Purpose

Transaction

Children

Confirmation

Success

---

Flow

```
Deposit

↓

Review

↓

Wallet Signature

↓

Processing

↓

Success

↓

Portfolio
```

---

State Ownership

Temporary transaction state.

Never store globally.

---

# Portfolio

Purpose

Asset Management

Children

Withdraw

Position Detail

Activity

History

---

Shared Components

Portfolio Summary

Allocation Chart

Position Card

Activity Timeline

Pending Withdrawals

Notifications

---

State Ownership

Portfolio data.

Performance.

History.

Rewards summary.

---

Portfolio is the application center.

---

# Withdraw Flow

Purpose

Exit Investment

Children

Processing

History

Notification

---

Flow

```
Withdraw

↓

Review

↓

Confirm

↓

Processing

↓

Auto Transfer

↓

Notification

↓

History Updated

↓

Portfolio Updated
```

---

Notice

No Redeem.

No Manual Claim.

---

State Ownership

Temporary withdraw state.

---

# Rewards

Purpose

Retention

Children

Campaign

History

Leaderboard

---

Shared Components

Reward Card

Campaign Card

History Table

---

Rewards should never own portfolio state.

---

# Notifications

Purpose

Awareness

Global Component

Not a page.

---

Notification Sources

Deposit

Withdraw

Rewards

Campaigns

Security

Maintenance

---

Notification Targets

Portfolio

Withdraw

Reward

Settings

---

Notifications always deep-link.

---

# Wallet

Purpose

Identity

---

Contains

Address

Network

Disconnect

Explorer

Settings

---

Wallet owns

Connection State

Nothing else.

---

# Global Search

Search belongs to Earn only.

Never global.

---

# Global State

Application-wide state

Wallet

User

Portfolio Summary

Notifications

Rewards Counter

Theme

Everything else remains local.

---

# Local State

Vault Filters

Deposit Amount

Withdraw Amount

Charts

Sorting

Search

Selections

Never lift unnecessarily.

---

# Component Hierarchy

```
App

├── Layout

│     ├── Navbar

│     ├── Footer

│     ├── Notification Drawer

│     ├── Wallet

│     └── Page Container

│

├── Pages

│     ├── Home

│     ├── Earn

│     ├── Vault Detail

│     ├── Portfolio

│     ├── Rewards

│

└── Shared Components

      ├── Button

      ├── Card

      ├── Badge

      ├── Modal

      ├── Timeline

      ├── Chart

      ├── Table

      ├── Toast

      ├── Notification

      └── Empty State
```

---

# Data Ownership

Home

↓

Display only

Earn

↓

Vault data

Vault Detail

↓

Vault analytics

Portfolio

↓

User assets

Rewards

↓

Reward data

Notifications

↓

Events

No page should own another page's data.

---

# Cross-page Relationships

Deposit Success

↓

Portfolio Updates

↓

Notification Created

↓

Activity Updated

---

Withdraw Success

↓

Portfolio Updates

↓

History Updates

↓

Notification Created

---

Reward Claimed

↓

Reward Balance Updates

↓

Notification Created

↓

History Updates

---

# Navigation Rules

Never redirect users unexpectedly.

Always preserve browser history.

Back button must always make sense.

Every page must have a clear exit.

Primary CTA must always be visible.

---

# Modal Rules

Only use modal for:

Deposit

Withdraw

Wallet

Settings

Confirmation

Never place long-form information inside modals.

---

# Drawer Rules

Drawers are used for:

Notifications

Wallet

Quick Actions

Everything requiring deep reading should open a page instead.

---

# Information Hierarchy

Every page follows this order.

Primary Action

↓

Critical Metrics

↓

Supporting Information

↓

Historical Information

↓

Technical Details

Never reverse this hierarchy.

---

# Final Architecture Principle

The application should feel like one continuous experience.

Users should never think:

"I entered another module."

They should simply feel:

"I am continuing my investment journey."

Every navigation decision should reinforce that feeling.
