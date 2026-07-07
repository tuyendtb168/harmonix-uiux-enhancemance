# Harmonix V2

# UX Laws & Product Heuristics

Version 2.0

---

# Purpose

This document defines the UX principles that every screen in Harmonix V2 must follow.

These are not theoretical UX concepts.

Each principle has been translated into concrete product decisions.

Whenever implementation becomes uncertain, follow these heuristics before inventing new solutions.

The objective is simple:

Increase confidence.
Reduce cognitive load.
Reduce unnecessary actions.
Increase long-term retention.

---

# UX Principle 1

Recognition over Recall

(Nielsen's Heuristic)

---

Definition

People should recognize information instead of remembering it.

Humans are bad at remembering system state.

Software should remember for them.

---

Current Problem

Withdraw

↓

Processing

↓

User leaves

↓

Three days later

↓

User forgets

↓

Funds remain unclaimed

The current product assumes users remember.

This assumption is incorrect.

---

Product Decision

Never require users to remember protocol state.

The application remembers everything.

---

Implementation

Notification Center

Pending Withdrawal Widget

Recent Activity

Timeline

History

Portfolio Alerts

---

Bad Example

Remember to come back in three days.

---

Good Example

Funds automatically arrive.

Notification confirms completion.

---

Harmonix Rule

Users should never need memory to operate the product.

---

# UX Principle 2

Reduce Cognitive Load

---

Definition

Every additional decision costs mental energy.

More information is not always better.

Users should process information effortlessly.

---

Current Observation

Many DeFi applications expose:

TVL

Liquidity

Allocation

Strategy

Underlying Protocol

Risk

APR

APY

Historical APY

Rewards

Composition

Users stop reading.

---

Product Decision

Prioritize only the information required for the current decision.

---

Example

Home

Show

Portfolio

Earnings

Recommended Vaults

Do NOT show

Strategy Composition

Underlying Protocols

Vault Allocation

---

Vault Detail

Now reveal

Performance

Risk

Strategy

Protocol Allocation

---

Progressive disclosure keeps complexity under control.

---

Harmonix Rule

Only reveal complexity when users ask for it.

---

# UX Principle 3

Hick's Law

---

Definition

The more choices users see,

the slower they decide.

---

Application

Avoid presenting ten vaults equally.

Guide users.

---

Implementation

Recommended Vaults

Featured Strategy

Popular

Highest TVL

Best Stable Yield

---

Users can still explore everything,

but the first decision becomes easier.

---

Harmonix Rule

Curate before listing.

Guide before searching.

---

# UX Principle 4

Jakob's Law

---

Definition

Users spend most of their time using other products.

They expect similar behavior.

---

Research

Spark

Maple

Coinbase

Stripe

Apple Wallet

---

Decision

Reuse familiar interaction patterns.

Navigation

Cards

Portfolio

Notifications

Charts

Withdraw Flow

---

Avoid

Inventing new interaction models.

---

Harmonix Rule

Innovate in infrastructure.

Stay familiar in UX.

---

# UX Principle 5

Progressive Disclosure

---

Definition

Reveal information gradually.

Do not overwhelm users immediately.

---

Example

Home

↓

Vault Card

↓

Vault Detail

↓

Performance

↓

Risk

↓

Underlying Strategy

↓

Technical Details

---

Users control complexity.

Not the application.

---

Harmonix Rule

Never overwhelm first-time users.

---

# UX Principle 6

Goal Gradient Effect

---

Definition

People become more confident when they can see progress.

---

Application

Withdraw Processing

Instead of

Processing...

Use

Requested

↓

Queued

↓

Processing

↓

Transferred

↓

Completed

---

Progress creates trust.

---

Harmonix Rule

Never hide long-running operations.

Visualize them.

---

# UX Principle 7

Peak-End Rule

---

Definition

People remember

the emotional peak

and

the ending.

---

Application

Deposit Success

Withdraw Completed

Reward Claimed

---

These moments deserve:

Celebration

Confirmation

Clear messaging

Next action

---

Poor Ending

Transaction Complete

---

Better Ending

🎉

5,000 USDC has been transferred to your wallet.

Portfolio updated.

---

Harmonix Rule

Always finish important journeys beautifully.

---

# UX Principle 8

Zeigarnik Effect

---

Definition

People naturally remember unfinished tasks.

---

Application

Pending Withdrawals

Pending Deposits

Claimable Rewards

---

Never hide unfinished operations.

Show them.

---

Implementation

Portfolio

Pending Widget

Timeline

Notifications

---

This creates awareness

without anxiety.

---

Harmonix Rule

Incomplete operations should always remain visible.

---

# UX Principle 9

Visibility of System Status

(Nielsen)

---

Definition

Users should always know what the system is doing.

---

Application

Deposit

Withdraw

Claim

Rewards

Loading

Sync

---

Never show

Loading...

alone.

Instead

Submitting transaction...

Waiting for confirmation...

Processing withdrawal...

Funds transferred...

---

Harmonix Rule

Explain the current system state.

---

# UX Principle 10

User Control & Freedom

---

Definition

Users should feel in control.

---

Application

Deposit Preview

Withdraw Preview

Transaction Summary

Cancel before Confirm

---

Do not surprise users.

---

Harmonix Rule

Users should understand consequences before signing.

---

# UX Principle 11

Consistency & Standards

---

Definition

Consistency creates trust.

---

Application

Buttons

Cards

Spacing

Terminology

Charts

Colors

Icons

Modals

---

Never mix terminology.

Always say

Withdraw

instead of

Claim

Redeem

Operator Fulfill

Settlement

---

Translate protocol language into user language.

---

Harmonix Rule

One concept.

One word.

---

# UX Principle 12

Trust Through Transparency

---

Definition

Users trust systems that explain themselves.

---

Application

Strategy

Performance

Fees

Historical APY

Risk

Withdrawal ETA

---

Transparency does not mean exposing everything.

Transparency means exposing the right thing.

---

Harmonix Rule

Answer user questions before they ask.

---

# UX Principle 13

Fitts' Law

---

Definition

Important actions should be easy to reach.

---

Application

Deposit Button

Withdraw Button

Portfolio Navigation

Wallet

Notifications

---

Primary actions should never be hidden.

---

Harmonix Rule

Critical actions deserve prominent placement.

---

# UX Principle 14

Aesthetic-Usability Effect

---

Definition

Beautiful interfaces feel easier to use.

---

Application

Large whitespace

Soft shadows

Rounded corners

Limited colors

Simple typography

Readable numbers

---

Do not confuse decoration with beauty.

Beauty comes from clarity.

---

Harmonix Rule

Minimalism builds confidence.

---

# UX Principle 15

Reduce Friction

(Custom Harmonix Principle)

---

Every interaction should be questioned.

Ask:

Why does this click exist?

If there is no strong answer,

remove it.

---

Example

Old

Withdraw

↓

Redeem

↓

Receive

New

Withdraw

↓

Receive Automatically

---

This single change removes an entire mental burden.

---

Harmonix Rule

Users should complete goals,

not protocol operations.

---

# UX Principle 16

Portfolio First

(Custom Harmonix Principle)

---

Users spend

Minutes

Depositing.

Months

Managing.

Therefore

Portfolio

becomes

the emotional center

of Harmonix.

Everything after deposit should reinforce confidence.

---

Implementation

Portfolio Value

Performance

Yield

Allocation

Pending Withdrawals

Recent Activity

Notifications

---

Harmonix Rule

Optimize the lifetime experience,

not just the onboarding.

---

# UX Principle 17

Confidence Loop

(Custom Harmonix Principle)

---

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

Higher Retention

↓

Confidence

Everything inside Harmonix should strengthen this loop.

Anything that weakens confidence should be reconsidered.

---

# Final UX Manifesto

A successful Harmonix screen is one where users immediately understand:

What I own.

How much I earned.

What is happening.

What I should do next.

What I do NOT need to worry about.

If a design achieves these five outcomes,

it is likely aligned with Harmonix V2.
