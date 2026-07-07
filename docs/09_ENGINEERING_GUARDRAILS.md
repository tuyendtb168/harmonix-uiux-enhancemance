# Harmonix V2

# Engineering Guardrails

Version 2.0

---

# Purpose

This document defines the non-negotiable engineering rules for Harmonix V2.

Unlike coding conventions, these guardrails exist to preserve the product architecture, domain consistency, and long-term maintainability of the application.

Every engineer and AI coding assistant is expected to follow these rules.

If a proposed implementation violates a guardrail, the implementation should be changed instead of the guardrail.

---

# Core Principle

Optimize for maintainability over speed.

Today's shortcut becomes tomorrow's technical debt.

Small compromises accumulate into architecture drift.

---

# Rule 1

Business First

Never organize code around technical concepts.

Always organize around business features.

✅ Good

features/

portfolio/

earn/

rewards/

❌ Bad

components/

pages/

utils/

services/

mixed together.

---

# Rule 2

Single Source of Truth

Every business object has exactly one owner.

Portfolio owns portfolio data.

Rewards own reward data.

Notifications own notification data.

Do not duplicate ownership.

---

# Rule 3

Never Fetch Inside Components

UI components render data.

Hooks obtain data.

API modules communicate with backend.

Component

↓

Hook

↓

API

↓

Backend

Never skip layers.

---

# Rule 4

Business Hooks Only

Hooks should describe business actions.

✅ usePortfolio()

✅ useWithdraw()

✅ useDeposit()

❌ useFetch()

❌ useData()

❌ useRequest()

Business language improves readability.

---

# Rule 5

Never Duplicate Business Logic

Business rules belong in one place.

Wrong

Portfolio calculates APY.

Vault calculates APY.

Rewards calculates APY.

Correct

Shared business utility.

Everyone consumes it.

---

# Rule 6

One Responsibility Per Component

Every component should answer one question.

PortfolioSummary

↓

Shows portfolio summary.

It should NOT

Open withdraw modal

Render rewards

Render notifications

Render history

Split components aggressively.

---

# Rule 7

Composition Over Configuration

Avoid giant configurable components.

Bad

<BigCard
showChart
showHistory
showRewards
showRisk
/>

Good

<Card>

<Chart/>

<History/>

</Card>

---

# Rule 8

Never Hardcode Domain Language

Status values

Button labels

Notification types

Event names

must come from shared domain constants.

Avoid

"Done"

"Processing..."

"Claim"

Hardcoded across files.

---

# Rule 9

Never Leak Blockchain Language

Protocol terms belong to implementation.

Not UI.

Avoid exposing

Redeem

Claim

Fulfill

Settlement

Mint Shares

Burn Shares

Translate into business language.

---

# Rule 10

Global State Must Stay Small

Only global:

Wallet

Portfolio Summary

Notifications

Theme

Connection

Rewards Counter

Everything else stays local.

---

# Rule 11

Feature State Never Crosses Boundaries

Withdraw Flow

does not modify

Reward State.

Reward

does not control

Portfolio.

Each feature owns itself.

---

# Rule 12

Every Page Has One Purpose

Home

Discover

Earn

Compare

Portfolio

Manage

Rewards

Retain

Never mix responsibilities.

---

# Rule 13

Shared Components Must Stay Dumb

Shared UI never knows business logic.

Button

Card

Modal

Table

Timeline

Chart

are purely presentational.

---

# Rule 14

Business Components Stay Inside Features

VaultCard

PortfolioSummary

WithdrawTimeline

RewardCard

belong to their respective features.

Do not move them into shared unless there is a real reuse case.

---

# Rule 15

No Magic Numbers

Spacing

Colors

Typography

Animation

Breakpoints

Durations

must come from design tokens.

---

# Rule 16

No Inline Business Rules

Avoid

if (apy > 20)

inside components.

Business rules belong to utilities or hooks.

---

# Rule 17

Every API Has One Owner

Portfolio API

↓

Portfolio Feature

Other pages consume Portfolio state.

Do not create duplicate API calls across features.

---

# Rule 18

Navigation Must Follow Information Architecture

Never introduce a new page.

Never change routing.

Never change navigation order.

Without updating

Information Architecture

first.

---

# Rule 19

Never Invent New Terminology

Only use terms defined in

07_DOMAIN_LANGUAGE_AND_MODEL.md

If a new business term is required,

update the domain document first.

---

# Rule 20

User Experience Wins

When engineering convenience conflicts with user experience,

discuss it explicitly.

Do not silently compromise UX.

Example

Auto Withdraw

should not be rejected solely because manual redeem is easier to implement.

---

# Rule 21

Progress Must Be Visible

Long-running operations require progress indicators.

Never leave users staring at

"Loading..."

or

"Processing..."

without context.

---

# Rule 22

No Dead Ends

Every page, modal, and drawer must provide a clear next step.

Users should never ask,

"What do I do now?"

---

# Rule 23

Accessibility Is Required

Keyboard navigation.

Focus states.

Semantic HTML.

ARIA where appropriate.

Reduced motion support.

Accessibility is part of "Done".

---

# Rule 24

Optimize for AI Readability

Prefer:

Small files.

Explicit names.

Business terminology.

Predictable structure.

Avoid:

Generic helpers.

Deep inheritance.

Hidden side effects.

This project is intended to be maintained by both humans and AI.

---

# Rule 25

Architecture Before Code

Before implementing a new feature, verify that it aligns with:

01 Product Principles

02 Product Decisions

05 User Intent Map

06 Information Architecture

07 Domain Language

08 Frontend Architecture

If implementation conflicts with these documents,

update the architecture intentionally instead of creating exceptions.

---

# Final Principle

Good engineering is invisible to users.

Great engineering is invisible to future engineers.

The best implementation is the one that remains understandable one year from now.
