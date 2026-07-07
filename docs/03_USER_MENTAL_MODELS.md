# Harmonix V2

# User Mental Models

Version 2.0

---

# Purpose

This document explains how users think.

It does not describe screens.

It does not describe layouts.

It describes the invisible expectations users have when interacting with Harmonix.

Every UI decision should support these mental models.

When implementation conflicts with user expectations, implementation should change.

---

# The Core Belief

Users do not buy yield.

Users buy confidence.

Yield is only the outcome.

Confidence is the product.

This document exists to maximize confidence.

---

# Mental Model 1

"I just want my money to grow."

This is the most important mental model.

Users do not wake up wanting to interact with DeFi.

Users wake up wanting their assets to become more valuable.

Everything else is a tool.

Therefore every page should reinforce one simple feeling:

"My money is working."

Not

"My protocol is working."

---

Design Implication

Always prioritize:

Portfolio Value

Total Earnings

Yield Growth

Over

Protocol Details

Vault Composition

Technical Architecture

---

# Mental Model 2

"After depositing, I should not need to think."

Deposit is a decision.

Managing investments should feel passive.

Once users trust Harmonix,

they expect the platform to continue working.

Every unnecessary action after deposit reduces that feeling.

Examples

Bad

Deposit

↓

Wait

↓

Return

↓

Redeem

↓

Receive

Good

Deposit

↓

Wait

↓

Money arrives

Users should feel:

"I've already done my part."

---

Design Implication

Reduce follow-up actions whenever possible.

---

# Mental Model 3

"If I cannot see my money, I assume something is wrong."

One of the strongest human biases is:

Invisible = Missing

Whenever users cannot immediately locate their assets,

their confidence decreases.

This is true even when funds are completely safe.

---

Examples

Pending Withdrawal

Bridge

Settlement

Queued Withdraw

Funds in Transit

Technically everything is fine.

Psychologically everything feels broken.

---

Design Implication

Never hide money.

Always show:

Current State

Estimated Completion

Timeline

History

---

# Mental Model 4

"I don't care about blockchain mechanics."

Users think in outcomes.

Developers think in transactions.

This difference creates many UX problems.

Example

Developer language

Redeem

Claim

Operator Fulfill

Settlement

Queued

User language

Withdraw

Money Coming Back

Completed

Available

---

Design Rule

Never expose protocol terminology first.

Translate protocol actions into financial outcomes.

---

# Mental Model 5

"The product should remember things for me."

People forget.

Software should remember.

Examples

Completed Withdrawals

Claimable Rewards

Pending Deposits

Campaigns

Notifications exist because memory is limited.

Do not expect users to remember protocol states.

---

Design Implication

Notification Center

Recent Activity

Portfolio Timeline

History

These are memory systems.

Not features.

---

# Mental Model 6

"Waiting is acceptable if progress is visible."

People tolerate waiting surprisingly well.

People do not tolerate uncertainty.

Example

Airport

Boarding

↓

Security

↓

Gate

↓

Boarding

↓

Flying

The journey is visible.

Now compare

Processing...

This creates anxiety.

---

Design Implication

Replace status text with progress.

Requested

↓

Queued

↓

Processing

↓

Transferred

Progress builds trust.

---

# Mental Model 7

"Large numbers create confidence."

Financial software is emotional.

People enjoy seeing:

Portfolio Value

Today's Earnings

Total Yield

Reward Growth

These numbers reinforce success.

---

Design Implication

Use hierarchy.

Portfolio Value should always dominate.

Not transaction count.

Not vault count.

---

# Mental Model 8

"I should immediately know if something important happened."

Silence creates uncertainty.

Notifications reduce uncertainty.

Examples

Deposit Complete

Withdraw Complete

Reward Ready

Campaign Started

Users should never wonder:

"Did anything happen?"

---

Design Implication

Notification Drawer

In-app Toast

Portfolio Updates

---

# Mental Model 9

"Every page should answer one question."

Home

What can I do?

Earn

Where should I invest?

Vault

Is this a good investment?

Portfolio

How am I doing?

Rewards

What have I earned?

Never mix these questions.

---

# Mental Model 10

"Good financial software feels calm."

People associate calmness with professionalism.

Visual noise creates stress.

Many crypto products confuse activity with quality.

More animations.

More colors.

More widgets.

More charts.

None of these necessarily increase trust.

---

Design Implication

Large spacing.

White backgrounds.

Few accent colors.

Simple typography.

Consistent cards.

---

# Mental Model 11

"I expect software to do the work."

Users already completed the difficult part.

They connected wallets.

Signed transactions.

Deposited assets.

The software should handle everything else.

---

Auto Withdraw

Automatic History

Automatic Portfolio Updates

Automatic Notifications

All reinforce this expectation.

---

# Mental Model 12

"I trust consistency."

Consistency is interpreted as reliability.

Every inconsistency reduces trust.

Examples

Different buttons.

Different card spacing.

Different modal layouts.

Different terminology.

Users rarely notice consistency.

They immediately notice inconsistency.

---

Design Implication

Strict Design System.

Shared Components.

One vocabulary.

---

# Mental Model 13

"I don't measure APY every day."

Whales provided an important insight.

Quote

"I just want to see my assets and the yield going up."

Notice what is missing.

Users did not ask for:

Strategy Allocation

Vault Composition

Protocol Routing

Internal Mechanics

Users asked for:

Assets

Yield

Growth

This is a critical insight.

Growth is emotionally meaningful.

Mechanics are intellectually meaningful.

Growth wins.

---

# Mental Model 14

"My money should feel alive."

This may be the most important emotional goal.

Users enjoy seeing movement.

Portfolio increasing.

Rewards increasing.

Withdraw progressing.

History updating.

The interface should reinforce that assets are active.

Not frozen.

---

# Mental Model 15

"The product should explain itself."

Users should not need documentation.

If documentation is required to understand a screen,

the screen has failed.

Every page should communicate its purpose visually.

---

# Emotional Journey

Before Deposit

Curiosity

↓

After Deposit

Hope

↓

Portfolio

Confidence

↓

Yield Growth

Satisfaction

↓

Withdraw Requested

Expectation

↓

Processing

Patience

↓

Funds Arrive

Relief

↓

Return Later

Trust

Every screen should reinforce this emotional journey.

Never interrupt it unnecessarily.

---

# The Confidence Loop

Confidence

↓

Deposit

↓

Portfolio Growth

↓

Trust

↓

Larger Deposits

↓

More Confidence

The purpose of Harmonix is to strengthen this loop.

Not to maximize interactions.

---

# Anti-Patterns

Never design for:

More clicks

More widgets

More numbers

More protocol details

More confirmations

More pages

These often satisfy builders,

but rarely satisfy users.

---

# Final Principle

Users should leave Harmonix feeling:

"My money is growing."

"I know where everything is."

"I trust the system."

"I don't need to think about it."

If these four feelings are consistently achieved,

the redesign has succeeded.
