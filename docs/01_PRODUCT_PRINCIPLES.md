# Harmonix V2

# Product Principles

Version 2.0

---

# Purpose of This Document

This document explains **WHY** every major product decision exists.

It is NOT a UI specification.

It is NOT an implementation guide.

It defines the product philosophy that every engineer, designer and AI coding assistant must follow.

Whenever there is uncertainty, always prioritize the principles in this document over implementation convenience.

---

# Background

Harmonix V1 successfully provides yield infrastructure on Hyperliquid.

However, after reviewing the product together with experienced users and whales, several UX problems became apparent.

The application currently exposes too much protocol complexity while providing insufficient portfolio visibility.

Users understand how to deposit.

Users do NOT always understand what happens after depositing.

This redesign focuses on solving that problem.

---

# How This Redesign Was Created

The redesign is based on three major sources.

## 1. Existing Harmonix Product

The redesign must preserve Harmonix identity.

We are improving Harmonix.

We are NOT replacing Harmonix.

---

## 2. Competitor Research

The product has been deeply compared with:

Spark

Maple Finance

Morpho

Aave

Lido

Ethena

Other institutional DeFi products

The redesign intentionally borrows good ideas while avoiding blindly copying competitors.

---

## 3. User Feedback

One of the largest Harmonix users (whale) provided direct feedback.

The key statement was:

> "A simple mode is good and just a very clear overview of your assets and especially the yield going up."

This feedback became one of the core design principles.

---

# Product Positioning

Understanding positioning is the most important part of this redesign.

Spark and Maple serve different audiences.

Harmonix sits between them.

Therefore Harmonix cannot simply copy either product.

---

# Spark

Spark optimizes for simplicity.

Its primary objective is reducing user anxiety.

Spark assumes users do not care how yield is generated.

Users simply want to:

Deposit

Wait

Earn

Withdraw

Everything else is secondary.

Spark hides protocol complexity aggressively.

Advantages

- Extremely easy
- Beginner friendly
- Fast learning curve

Disadvantages

- Limited transparency
- Less information for advanced users

---

# Maple

Maple optimizes for trust.

Its primary users are institutions and whales.

Maple assumes users care about:

Portfolio allocation

Risk

Historical performance

Underlying strategies

Transparency

Advantages

- High trust
- Institutional feeling
- Strong reporting

Disadvantages

- More complex
- Higher cognitive load

---

# Harmonix Position

Harmonix should combine both worlds.

The product should be:

As simple as Spark.

As trustworthy as Maple.

This is the guiding principle of the redesign.

Whenever a design decision is difficult, ask:

"Does this preserve Spark simplicity while maintaining Maple trust?"

If yes,

it is likely the correct direction.

---

# Product Philosophy

The redesign follows six major philosophies.

---

# Philosophy 1

Hide Complexity

Users invest to earn yield.

Users do NOT invest to understand protocol architecture.

Protocol complexity should remain available but never dominate the interface.

Complexity should appear progressively.

Example

Good

Deposit

↓

Portfolio

↓

Strategy Details (optional)

Bad

Landing page immediately shows:

Vault composition

Protocol routing

Strategy internals

Technical metrics

before users even invest.

---

# Philosophy 2

Portfolio First

This is one of the biggest changes from V1.

Most users spend very little time depositing.

Most users spend most of their lifetime inside Portfolio.

Therefore Portfolio becomes the center of the product.

Investment is only the beginning.

Portfolio management is the real experience.

This affects:

Navigation

Dashboard hierarchy

Notifications

History

Performance charts

Withdraw tracking

---

# Philosophy 3

Reduce Friction

Every click has a cost.

Every confirmation has a cost.

Every unnecessary page has a cost.

The redesign continuously questions every interaction.

Example

Current

Withdraw

↓

Wait

↓

User returns

↓

Redeem

↓

Receive funds

Question:

Why should users redeem?

If technology allows automatic transfer,

remove redeem.

This principle led directly to the new withdraw flow.

---

# Philosophy 4

Trust Through Transparency

Transparency does NOT mean displaying everything.

Transparency means displaying the information users actually need.

Users should never wonder:

Where is my money?

What is happening?

When will it arrive?

Am I earning?

Portfolio visibility should answer these questions immediately.

---

# Philosophy 5

Institutional UX

The application should feel like professional financial software.

It should not resemble:

DEX

Trading terminal

Yield farm

Casino

Meme product

Design characteristics:

Large spacing

Calm typography

Limited colors

Simple charts

Readable numbers

Minimal visual noise

---

# Philosophy 6

Show Progress

People trust visible progress.

Instead of hiding background operations,

visualize them.

Example

Withdraw

Requested

↓

Processing

↓

Completed

↓

Funds Sent

Timeline builds confidence.

---

# Home Philosophy

Home exists for discovery.

Not management.

Home should answer:

What is Harmonix?

Why should I invest?

What opportunities exist today?

It should never become another Portfolio page.

---

# Earn Philosophy

Earn exists for decision making.

Users compare vaults.

Users evaluate APY.

Users evaluate risk.

Users understand strategy.

The objective is helping users choose.

Not managing positions.

---

# Portfolio Philosophy

Portfolio is the heart of Harmonix V2.

Portfolio answers:

How much do I own?

How much did I earn?

Where is my money allocated?

What is processing?

What recently happened?

Users should understand their financial status within five seconds.

---

# Withdraw Philosophy

Withdraw is a trust exercise.

Current flow creates uncertainty.

Request

↓

Wait

↓

Redeem

↓

Receive

Problems

Users forget to redeem.

Support requests increase.

Funds appear "missing."

Users lose confidence.

New philosophy

Request

↓

Processing

↓

Funds automatically transferred

↓

Notification

↓

History updated

Users think:

"I requested a withdrawal."

"Now I simply wait."

"Money arrives."

No additional action.

---

# Notification Philosophy

Notifications reduce uncertainty.

Notifications are NOT marketing.

They communicate state changes.

Examples

Deposit completed

Withdraw completed

Reward claimed

Campaign started

Maintenance

Notifications should always explain:

What happened

Why

Whether action is required

---

# Reward Philosophy

Rewards are retention.

Rewards are not the primary reason users invest.

Therefore rewards should never dominate navigation.

Rewards should reinforce engagement.

Not distract users.

---

# Metrics Philosophy

Metrics should create confidence.

Avoid overwhelming users.

Primary metrics:

Portfolio Value

Total Earnings

Current APY

Pending Withdrawals

Secondary metrics remain accessible but hidden.

---

# Empty States

Every empty state should educate.

Instead of

"No data"

Use

"You haven't deposited into a vault yet."

"Explore available opportunities."

---

# Error Handling

Errors should explain:

What happened.

Why.

What users can do next.

Avoid:

Unknown Error

Something went wrong

Transaction Failed

Without explanation.

---

# AI Coding Rules

Every AI coding assistant must follow these rules.

Never redesign layouts.

Never invent new navigation.

Never change information hierarchy.

Never replace Harmonix branding.

Never introduce unnecessary animations.

Prefer consistency over creativity.

Follow Product Principles before implementation convenience.

---

# Final Principle

If a feature makes the product:

simpler,

clearer,

more trustworthy,

and requires fewer user actions,

it is likely the correct decision.

If a feature increases complexity without increasing user value,

remove it.

Always optimize for long-term user confidence instead of short-term visual impressiveness.
