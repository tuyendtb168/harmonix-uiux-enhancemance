# Harmonix V2

# Product Metrics

Version 2.0

---

# Purpose

This document defines the metrics that determine whether Harmonix V2 is succeeding.

Metrics are not vanity numbers.

Metrics measure whether users are achieving their goals and whether the product is delivering value.

---

# Metric Philosophy

Every metric must be:

Actionable — it reveals something we can act on.

Relevant — it directly reflects product health.

Honest — it cannot be inflated by gaming.

---

# Primary Business Metrics

These are the most important indicators of product health.

---

## 1. Total Value Locked (TVL)

Definition: Total assets currently deposited across all vaults.

Why it matters: Directly reflects user trust and product adoption.

Target direction: Growing over time.

Frequency: Real-time dashboard.

---

## 2. Deposit Conversion Rate

Definition: Percentage of users who connect wallet → make at least one deposit.

Formula: (Users who deposited) / (Users who connected wallet) × 100

Why it matters: Measures how effectively Home and Earn convert intent into investment.

Target: >30% of connected wallets deposit within 7 days.

---

## 3. Withdrawal Completion Rate

Definition: Percentage of initiated withdrawals that complete successfully.

Formula: (Completed withdrawals) / (Initiated withdrawals) × 100

Why it matters: Measures trust in the withdrawal process.

Target: >99%

Red flag: Any drop below 95% requires immediate investigation.

---

## 4. User Retention (30-day)

Definition: Percentage of users who return to the app within 30 days of their first deposit.

Why it matters: Retention reflects long-term trust and portfolio engagement.

Target: >60% 30-day retention.

---

## 5. Support Request Rate

Definition: Number of support tickets per 100 active users per month.

Why it matters: High support volume signals UX failures.

Primary categories to track:

"Where is my withdrawal?" — measures withdraw UX clarity.

"Why did my transaction fail?" — measures error handling quality.

"How do I deposit?" — measures onboarding clarity.

Target: Decrease over each sprint.

---

# UX Performance Metrics

These measure the quality of specific product experiences.

---

## 6. Time to First Deposit

Definition: Median time from wallet connection to first successful deposit.

Why it matters: Measures friction in the deposit journey.

Target: < 5 minutes.

---

## 7. Time to Understand Portfolio

Definition: Median time users spend on Portfolio before leaving (proxy for comprehension time).

Why it matters: Portfolio should be understandable within 5 seconds.

If users linger too long, the layout may be confusing.

If users leave too fast, they may not be engaging.

Target: 30–120 second engagement (sweet spot).

---

## 8. Withdraw Abandonment Rate

Definition: Percentage of users who start but do not complete the withdraw flow.

Formula: (Abandoned at any step) / (Opened withdraw modal) × 100

Why it matters: Measures trust and clarity in the withdrawal experience.

Target: < 15% abandonment.

Steps to monitor abandonment by step:

Step 1 → Step 2 (Input → Review)

Step 2 → Step 3 (Review → Confirm)

---

## 9. Deposit Abandonment Rate

Definition: Percentage of users who start but do not complete the deposit flow.

Target: < 20% abandonment.

---

## 10. Notification Open Rate

Definition: Percentage of notifications that are read (clicked).

Why it matters: High open rate means notifications are relevant and useful.

Low open rate means notifications are being ignored (too many, or irrelevant).

Target: > 50% open rate.

---

# Feature Adoption Metrics

---

## 11. Rewards Participation Rate

Definition: Percentage of active depositors who have joined at least one campaign.

Target: > 40% of depositors participate in at least one campaign.

---

## 12. Portfolio Visit Frequency

Definition: Average number of portfolio visits per active user per week.

Why it matters: High frequency means users are engaged and checking progress.

Very high frequency (10+/week) may indicate anxiety (unclear status).

Target: 3–7 visits per week.

---

# Error Metrics

---

## 13. Transaction Failure Rate

Definition: Percentage of submitted transactions (deposit/withdraw) that fail on-chain.

Target: < 2%.

Anything above 5% requires product + engineering investigation.

---

## 14. UI Error Rate

Definition: Percentage of sessions with at least one JavaScript error.

Target: < 1%.

---

# Metric Review Cadence

Weekly: TVL, Deposit Conversion, Support Volume.

Monthly: Retention, Time to First Deposit, Abandonment Rates.

Per Sprint: Error rates, specific UX metrics for features shipped.

---

# Anti-Metrics

These should NOT be used as success indicators.

Page views — easy to inflate, not meaningful.

Total users registered — wallets are free.

Number of notifications sent — more is not better.

Number of features shipped — complexity is not value.

---

# Final Metrics Principle

A product that grows TVL while growing user confidence is succeeding.

A product that grows TVL while also growing support requests is failing silently.

Measure both the outcome and the experience.
