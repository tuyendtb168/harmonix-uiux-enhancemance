# Harmonix V2

# Product Decision Log

Version 2.0

---

# Purpose

This document records the reasoning behind every major product decision.

The purpose is to preserve product thinking over time.

Future designers, engineers and AI coding assistants should understand not only WHAT was built, but WHY it was built.

Whenever implementation conflicts with product intent, product intent wins.

---

# Decision Framework

Every product decision should be evaluated against four questions.

1. Does this reduce user friction?

2. Does this increase user trust?

3. Does this simplify decision making?

4. Does this improve long-term retention?

If the answer is "No" for most questions, reconsider the feature.

---

# Decision 001

Home is NOT Portfolio

---

Current Situation

Many DeFi products slowly become portfolio dashboards.

As more features are added, the Home page becomes overloaded.

---

Problem

Users lose orientation.

New users do not know where to start.

Returning users see too much unrelated information.

---

Decision

Home should remain the discovery page.

Portfolio should become the management page.

---

Reason

Users have different intentions.

Home answers:

"What can I invest in?"

Portfolio answers:

"What do I currently own?"

Mixing these purposes creates cognitive overload.

---

Impact

Cleaner navigation.

Better mental model.

Better scalability.

---

Decision

ACCEPTED

---

# Decision 002

Portfolio becomes a primary navigation item

---

Current

Portfolio feels secondary.

Users must navigate through investment pages to understand existing positions.

---

Problem

After investing, Portfolio becomes the page users visit most.

Navigation does not reflect actual user behavior.

---

Decision

Portfolio becomes one of the four primary navigation items.

---

Reason

Investment is a short activity.

Portfolio management is a long activity.

Navigation should reflect time spent.

---

Impact

Higher retention.

Lower confusion.

More engagement.

---

Decision

ACCEPTED

---

# Decision 003

Remove Redeem Step

---

Current Flow

Withdraw

↓

Wait

↓

Redeem

↓

Receive Funds

---

Problem

Users forget.

Support receives questions.

Funds appear stuck.

Users lose confidence.

Some users never return to redeem.

---

Alternative 1

Keep Redeem.

Pros

No smart contract changes.

Lower gas.

Cons

High friction.

Support burden.

Poor UX.

---

Alternative 2

Operator auto-claims.

Pros

One-step experience.

Lower friction.

Cleaner mental model.

Cons

Operator pays additional gas.

Requires contract changes.

---

Decision

Choose Alternative 2.

---

Reason

If technical limitations are acceptable, user experience should always win.

Withdraw should feel complete after one action.

Users think in outcomes.

Not blockchain mechanics.

---

Expected Result

Lower support.

Higher satisfaction.

Fewer forgotten withdrawals.

---

Decision

ACCEPTED

---

# Decision 004

Notifications become first-class citizens

---

Current

History exists.

Notifications do not.

---

Problem

Users only discover completed withdrawals if they manually revisit the application.

---

Decision

Introduce notification center.

---

Reason

Users need confirmation.

Money arriving should never feel invisible.

---

Notification Types

Deposit Completed

Withdraw Completed

Reward Claimed

Campaign Started

Maintenance

Security

---

Decision

ACCEPTED

---

# Decision 005

Pending Withdrawals visible inside Portfolio

---

Current

Withdraw status is disconnected.

---

Problem

Users constantly ask:

Where is my money?

---

Decision

Portfolio always displays pending withdrawals.

---

Reason

Money still belongs to users.

Users should always know where their assets are.

---

Expected UX

Portfolio

↓

Pending Withdrawals

↓

Processing

↓

ETA

↓

Auto Transfer

---

Decision

ACCEPTED

---

# Decision 006

Recommended Vault remains on Home

---

Alternative

Remove recommendations.

---

Reason Against

New users often experience decision paralysis.

Too many choices decrease conversion.

---

Decision

Curate several recommended vaults.

---

Reason

Guide instead of forcing exploration.

Reduce cognitive load.

Increase first deposit rate.

---

Decision

ACCEPTED

---

# Decision 007

Spark is inspiration, not blueprint

---

Observation

Spark has excellent simplicity.

---

Problem

Spark serves different users.

---

Decision

Borrow principles.

Do not copy layouts.

---

Reason

Harmonix offers different products.

Different users.

Different constraints.

---

Decision

ACCEPTED

---

# Decision 008

Maple is inspiration, not blueprint

---

Observation

Maple builds strong institutional trust.

---

Problem

Maple exposes more complexity.

---

Decision

Keep transparency.

Reduce visual complexity.

---

Reason

Harmonix targets users between Spark and Maple.

---

Decision

ACCEPTED

---

# Decision 009

Show fewer numbers

---

Current

Many DeFi dashboards expose dozens of metrics.

---

Problem

Users rarely use them.

They increase anxiety.

---

Decision

Prioritize four metrics.

Portfolio Value

Total Earnings

Current APY

Pending Withdrawals

---

Reason

More information does not always create more confidence.

Relevant information does.

---

Decision

ACCEPTED

---

# Decision 010

Timeline instead of Status Text

---

Current

Status

Processing

---

Problem

Processing provides no context.

---

Decision

Use timeline.

Requested

↓

Queued

↓

Processing

↓

Transferred

---

Reason

People trust visible progress.

---

Decision

ACCEPTED

---

# Decision 011

Reward should not dominate navigation

---

Problem

Many protocols over-promote rewards.

Users begin chasing incentives instead of understanding investments.

---

Decision

Rewards remain important but secondary.

---

Reason

Yield is the core product.

Rewards increase retention.

They are not the product itself.

---

Decision

ACCEPTED

---

# Decision 012

Home uses large whitespace

---

Reason

Financial software should feel calm.

Spacing creates confidence.

Density creates stress.

---

Decision

Large spacing.

Few cards.

Simple hierarchy.

---

Decision

ACCEPTED

---

# Decision 013

Every page has one primary purpose

---

Home

Discover

---

Earn

Compare opportunities

---

Vault Detail

Understand investment

---

Portfolio

Manage investments

---

Rewards

Retention

---

Reason

One page.

One purpose.

Avoid mixed responsibilities.

---

Decision

ACCEPTED

---

# Decision 014

Progressive Disclosure

---

Decision

Never expose advanced information too early.

---

Example

Home

↓

Vault Card

↓

Vault Detail

↓

Strategy

↓

Underlying Protocols

Users choose how deep they want to go.

---

Decision

ACCEPTED

---

# Decision 015

Whale Feedback Drives Direction

---

Direct Feedback

"A simple mode is good and just a very clear overview of your assets and especially the yield going up."

---

Interpretation

Whales do not necessarily want more information.

They want better information.

---

Product Response

Improve Portfolio.

Improve earnings visibility.

Reduce operational friction.

Increase confidence.

---

Decision

ACCEPTED

---

# Future Decision Rules

Every future feature request should answer:

Does this make Harmonix simpler?

Does this improve trust?

Does this reduce clicks?

Does this help users understand their money?

If not,

the feature should be questioned before implementation.

---

# Final Statement

The purpose of Harmonix V2 is not to become the platform with the most features.

The purpose is to become the platform where users feel the most confident managing their assets.

Every product decision should reinforce that mission.
