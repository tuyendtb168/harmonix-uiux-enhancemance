# Harmonix V2

# Contingency & Risk Communication

Version 2.0

---

# Purpose

This document defines how Harmonix communicates risk, disruption, and failure to users.

This is the most emotionally sensitive area of the product.

Bad news delivered poorly destroys trust permanently.

Bad news delivered honestly and calmly can strengthen trust.

---

# Communication Philosophy

## The Three Rules of Risk Communication

**Rule 1: Tell the truth.**

Users can handle bad news. They cannot handle being misled.

If something is wrong, say so directly.

**Rule 2: Context over alarm.**

Every negative event must be explained in context.

"Your position is affected" is not enough.

"Your position is affected because X. Here is what that means for you specifically." is correct.

**Rule 3: Action over anxiety.**

Every communication must answer: "What should I do?"

If the answer is "nothing — we are handling it," say that.

If the answer is "you should withdraw," say that.

Never leave the user in ambiguous uncertainty.

---

# Risk Tier Classification

## Tier 0: Informational

Routine events. No user action needed.

Examples: Vault rebalancing, strategy adjustment, APY update.

Communication: Small in-app notification. No banner.

---

## Tier 1: Advisory

Something changed that users should know about.

No funds at risk. No action required.

Examples: APY drop > 20%, vault approaching capacity, network congestion.

Communication: Notification + optional soft banner on relevant page.

---

## Tier 2: Warning

Situation requires user awareness. Optional action available.

Examples: Vault paused temporarily, withdrawal queue longer than expected, elevated strategy risk.

Communication: Notification + persistent banner on relevant vault/portfolio page.

---

## Tier 3: Critical

Funds may be affected. User attention required.

Examples: Smart contract exploit detected, vault emergency shutdown, operator offline.

Communication: Full-screen alert banner on all pages + immediate notification.

---

# Specific Scenarios

---

## Scenario 1: Vault Strategy Underperforming

**Situation**: Vault APY has dropped significantly below stated range.

**Tier**: 1 (Advisory)

**In-App Banner** (on Vault Detail and Portfolio):

```
Delta Neutral USDC — APY Update

Current APY: 4.2%  (Previously: 12.4%)

Market volatility has temporarily reduced this vault's yield.
Your principal is not affected.

[ See Strategy Details ]
```

**Notification**:

"Delta Neutral USDC APY has decreased to 4.2%. Your principal is safe. Market conditions may improve returns over time."

**Tone**: Calm. Factual. Reassuring.

Do not use words like "crash", "loss", "dangerous."

---

## Scenario 2: Vault Temporarily Paused

**Situation**: Vault has paused new deposits and/or withdrawals for maintenance or rebalancing.

**Tier**: 1–2 depending on duration

**Banner** (on Vault Detail, Portfolio if user has position):

```
Deposits paused — Maintenance in progress

Delta Neutral USDC is temporarily paused for scheduled maintenance.
Existing positions are unaffected.

Expected to resume: ~2 hours

[ View Portfolio ]
```

**Notification**:

"Delta Neutral USDC deposits are temporarily paused for maintenance. Your position is active and earning. Estimated resume: 2 hours."

---

## Scenario 3: Withdrawal Queue Delayed

**Situation**: Withdrawal processing is taking longer than the stated timeline.

**Tier**: 2 (Warning)

**Portfolio Pending Widget** (for affected withdrawal):

```
⏱ Processing — Taking longer than expected

Your withdrawal of 5,000 USDC is still processing.
The queue is busier than usual due to high withdrawal volume.

Estimated additional wait: 1–2 days.
Your funds are safe.

[ Contact Support ]
```

**Notification**:

"Your withdrawal of 5,000 USDC is taking longer than expected. This is due to high queue volume. Your funds are safe — we'll notify you when complete."

---

## Scenario 4: Operator Offline / Degraded

**Situation**: Vault operator service is experiencing downtime or degraded performance.

**Tier**: 2–3 depending on severity

**Banner** (site-wide if severe):

```
⚠ Service Disruption — Harmonix Operations

Some vault operations are temporarily delayed due to a technical issue.
Your funds are safe and positions remain active.

We are actively resolving this.
Status updates: status.harmonix.xyz

[ View Status ]
```

**What to show in Portfolio**:

Positions: Show last known values with timestamp.

Pending withdrawals: Show "Delayed — service disruption" badge.

No new deposit or withdrawal actions while fully offline.

---

## Scenario 5: Smart Contract Exploit Detected

**Situation**: Security exploit discovered affecting a vault or protocol contract.

**Tier**: 3 (Critical) — Highest severity

**Immediate actions**:

1. Vault emergency pause triggered by contract.
2. Full-screen critical banner deployed immediately.
3. Push notifications to all affected users.

---

**Full-Screen Critical Banner**:

```
🔴 Security Alert — Immediate Attention Required

We have detected a security issue affecting [Vault Name].

All operations have been paused as a precautionary measure.

What this means for you:
• No new deposits or withdrawals are currently processed
• Our security team is actively investigating
• You will receive an update within [timeframe]

What you should do:
• No action is required at this time
• Do not attempt to interact with the vault contract directly
• Monitor this page and your notifications for updates

We will provide a full disclosure once the investigation is complete.

[ View Full Incident Report ]   [ Contact Support ]
```

**Tone rules for critical incidents**:

No hedging ("might", "could be", "possibly").

State facts only.

Give an update timeframe.

Provide clear instructions.

Never say "your funds are safe" if this is not confirmed.

If uncertain: "We are assessing the impact and will provide an update by [time]."

---

## Scenario 6: Vault Emergency Shutdown

**Situation**: Vault is permanently closed. Users must withdraw.

**Tier**: 3 (Critical)

**Banner** (on affected vault and Portfolio):

```
⚠ Action Required — Vault Closing

Delta Neutral USDC will close on [date].

Please withdraw your position before [deadline date].

After this date, withdrawals will still be available through
the contract, but in-app support will be limited.

Your current position: 5,000 USDC + earned yield.

[ Withdraw Now ]
```

**Notification**:

"Action needed: Delta Neutral USDC is closing on [date]. Please withdraw your 5,000 USDC position before [deadline]. Tap to start withdrawal."

**Follow-up reminders**: 7 days before, 3 days before, 1 day before deadline.

---

## Scenario 7: Stuck Funds (User Cannot Withdraw)

**Situation**: User's withdrawal is stuck and cannot complete through normal flow.

**Tier**: 3

**Escalation Path**:

1. Normal retry via app.
2. Contact support with transaction ID.
3. Manual operator intervention.
4. Direct contract interaction (last resort — documented).

**UI** (in Portfolio pending widget for stuck withdrawal):

```
Your withdrawal appears stuck.

Transaction: 0x1234...5678
Submitted: 5 days ago

Normal processing time: 2–3 days.
Your funds are safe but require manual review.

[ Contact Support — Reference: WD-8821 ]
```

Auto-generate a support reference code.

Support team can look up the reference and handle immediately.

---

# Status Page Integration

Harmonix should maintain a public status page (status.harmonix.xyz or equivalent).

Displays:

- Overall system status
- Per-vault operational status
- Incident history and post-mortems

All Tier 2+ banners include a link to the status page.

---

# Incident Communication Timeline

| Time | Action |
|------|--------|
| T+0: Issue detected | Pause affected operations |
| T+5 min | Deploy Tier 3 banner |
| T+10 min | Send push notification to affected users |
| T+30 min | Post incident update (even if investigation ongoing) |
| T+2 hr | Detailed status update |
| Resolution | Full incident post-mortem published |

Users should never wait more than 30 minutes without an update.

---

# Language Rules for Risk Communication

**Avoid:**

- "Catastrophic"
- "Crashed"
- "Failed completely"
- "Dangerous"
- "We don't know"
- "Nothing we can do"

**Use instead:**

- "Temporarily paused"
- "Under investigation"
- "Our team is working on this"
- "Your funds remain in the contract"
- "We are assessing the impact"
- "We will provide an update by [time]"

---

# Post-Incident Communication

After every Tier 2+ incident:

Publish a post-mortem to all affected users.

Post-mortem includes:

1. What happened
2. What was affected (be specific — which vaults, which users)
3. What we did
4. What we are doing to prevent recurrence

Do not publish post-mortems without a "what we are doing to prevent recurrence" section.

That section is the most important part.

---

# Final Risk Communication Principle

Users can forgive a vault that underperforms.

Users can forgive a technical issue.

Users cannot forgive silence.

Users cannot forgive being lied to.

The standard is not "no bad events."

The standard is "when bad events happen, users feel informed and respected."

That is the only standard that matters.
