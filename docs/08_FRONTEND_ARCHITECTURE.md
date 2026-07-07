# Harmonix V2

# Frontend Architecture

Version 2.0

---

# Purpose

This document defines how the frontend should be structured.

It is not tied to any specific framework.

Whether the application uses React, Next.js, Vue, or another frontend framework, the architectural principles remain the same.

The objective is to build a frontend that is:

- Predictable
- Reusable
- Scalable
- Easy for humans
- Easy for AI coding assistants

---

# Product First

The frontend is organized around the product.

NOT around technology.

Never organize code like

components/

pages/

hooks/

utils/

services/

Instead organize around business features.

Because users think in features.

Not folders.

---

# Recommended Architecture

```

src/

features/
home/
earn/
portfolio/
rewards/
notifications/
wallet/

shared/
ui/
layouts/
hooks/
lib/
api/
types/

app/

```

The application grows by adding features.

Not by adding random folders.

---

# Why Feature-Based?

Example

A Portfolio page contains

Portfolio Summary

Allocation

Activity

Withdraw

Performance

Notifications

These belong together.

Splitting them into unrelated folders destroys business context.

---

# Shared vs Feature Components

A simple rule.

Ask

"Can another feature reasonably reuse this?"

If YES

Move to shared.

If NO

Keep inside the feature.

---

Example

Reusable

Button

Card

Badge

Chart

Modal

Timeline

Toast

Avatar

Spinner

Table

EmptyState

These belong to

shared/ui

---

Feature Components

Portfolio Summary

Vault Card

Withdraw Timeline

Deposit Form

Reward Card

Notification Drawer

Remain inside their feature.

---

# Layout Architecture

There should be only one application layout.

```

<App>

<Navbar />

<Page />

<NotificationDrawer />

<WalletDrawer />

<Footer />

</App>

```

Pages should never render navigation.

Pages render content only.

---

# Route Structure

```

/

Home

/earn

Vault List

/earn/:vault

Vault Detail

/portfolio

Portfolio

/rewards

Rewards

/settings

Settings

```

Avoid deeply nested routes.

Keep URLs meaningful.

---

# State Philosophy

There are only three kinds of state.

Global

Feature

Local

Nothing else.

---

# Global State

Contains

Wallet

Current User

Portfolio Summary

Notifications

Theme

Rewards Counter

Connection Status

This state is shared everywhere.

---

# Feature State

Owned by one feature.

Examples

Vault Filter

Search

Withdraw Flow

Deposit Flow

Charts

Pagination

Sorting

This state never leaks outside the feature.

---

# Local State

Temporary UI state.

Examples

Modal Open

Input Value

Accordion

Hover

Tooltip

Dropdown

Never lift local state unnecessarily.

---

# Data Ownership

Every API response has exactly one owner.

Example

Portfolio API

↓

Portfolio Feature

Home should consume Portfolio Summary,

not own Portfolio data.

---

Bad

Home fetches Portfolio.

Portfolio fetches Portfolio.

Rewards fetches Portfolio.

Three API calls.

---

Good

Portfolio owns Portfolio.

Others consume it.

---

# API Layer

Never call fetch() directly inside components.

Components talk to hooks.

Hooks talk to API.

API talks to backend.

```

Component

↓

Hook

↓

API

↓

Backend

```

---

# Hooks

Hooks represent business actions.

Good

usePortfolio()

useWithdraw()

useDeposit()

useVault()

useRewards()

useNotifications()

Avoid

useFetch()

useRequest()

useData()

Business hooks improve readability.

---

# Component Hierarchy

```

App

↓

Layout

↓

Feature

↓

Section

↓

Card

↓

UI Component

```

Example

Portfolio

↓

Portfolio Summary

↓

Portfolio Card

↓

Metric Row

↓

Text

---

# One Responsibility Rule

Each component should answer one question.

Example

Portfolio Summary

Answers

"How much money do I own?"

It should not also render

Rewards

Notifications

Charts

History

---

# Composition

Prefer composition over configuration.

Bad

<BigCard

showChart

showRewards

showHistory

showRisk

showNotification

/>

Good

<Card>

<Chart />

<Rewards />

</Card>

---

Small components.

Simple composition.

---

# Modal Rules

Modal is for

Confirmation

Transaction

Quick Action

Wallet

Settings

Never place dashboards inside a modal.

---

# Drawer Rules

Drawer is for

Notifications

Wallet

Quick Actions

Never use drawers for long-form content.

---

# Page Rules

Each page owns exactly one purpose.

Home

Discover

Earn

Compare

Portfolio

Manage

Rewards

Retain

Never mix purposes.

---

# Folder Example

Portfolio

```

portfolio/

components/

PortfolioSummary.tsx

PortfolioChart.tsx

PositionCard.tsx

WithdrawTimeline.tsx

ActivityTable.tsx

hooks/

usePortfolio.ts

pages/

PortfolioPage.tsx

api/

portfolio.api.ts

types/

portfolio.ts

constants.ts

```

Everything related stays together.

---

# Shared UI

```

shared/ui/

Button

Input

Card

Badge

Chip

Toast

Avatar

Skeleton

Spinner

Tooltip

Modal

Drawer

Timeline

Chart

Table

Tabs

Dropdown

```

Shared UI should never know business logic.

---

# Design Tokens

The UI should consume tokens.

Never hardcode colors.

Never hardcode spacing.

Never hardcode typography.

Everything comes from

Theme

↓

Tokens

↓

Component

---

# Error Handling

Errors belong to features.

Portfolio handles portfolio errors.

Rewards handles reward errors.

Do not build one global error monster.

---

# Loading

Every feature owns its own loading state.

Portfolio loading

is independent from

Rewards loading.

Avoid blocking the entire application.

---

# Empty States

Every feature owns its empty state.

Portfolio

↓

No investments

Rewards

↓

No rewards

Notifications

↓

Nothing new

Never reuse generic empty messages.

---

# Animations

Animations should communicate state.

Not decorate.

Good

Deposit Success

Withdraw Timeline

Notification Badge

Progress

Bad

Floating cards

Moving backgrounds

Decorative motion

---

# Accessibility

Every interactive component should support

Keyboard

Focus

Screen Readers

Reduced Motion

Touch Devices

Accessibility is not optional.

---

# Performance

Lazy load

Charts

History

Heavy tables

Campaign assets

Do not lazy load

Navigation

Portfolio Summary

Wallet

Critical metrics

---

# Testing Strategy

Business logic

↓

Hooks

Component behavior

↓

Feature tests

Visual regression

↓

UI tests

Avoid testing implementation details.

Test user behavior.

---

# AI Coding Rules

When generating code

Prefer

Small files

Small hooks

Small components

Never

1000-line page files

Massive utility folders

God components

If a component exceeds one responsibility,

split it.

---

# Final Principle

The frontend should reflect the product architecture.

Not the framework.

If a developer can understand the business simply by reading the folder structure,

the architecture has succeeded.
