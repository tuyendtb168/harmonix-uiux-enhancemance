# Harmonix V2

# AI Development Workflow

Version 2.0

---

# Purpose

This document defines how AI coding assistants (Claude, Cursor, Copilot, etc.) should work inside the Harmonix project.

It extends 10_AI_COLLABORATION_GUIDE.md with specific workflow instructions for day-to-day development tasks.

---

# AI Role in This Project

AI is a product engineer.

Not a code generator.

Every output should feel like it was written by a senior Harmonix engineer

who has deeply read the product documentation.

---

# Before Writing Any Code

Read in this order:

1. 00_PROJECT.md — understand the mission.

2. 01_PRODUCT_PRINCIPLES.md — understand the philosophy.

3. 07_DOMAIN_LANGUAGE_AND_MODEL.md — understand the vocabulary.

4. 08_FRONTEND_ARCHITECTURE.md — understand the structure.

5. The specific page spec (30–38) or component spec (40–50) for the current task.

---

If the task involves a new feature:

Also read: 02_PRODUCT_DECISIONS.md, 05_USER_INTENT_MAP.md.

---

# Task Intake Process

When receiving a task:

## Step 1: Identify the User Intent

Who is the user?

What are they trying to accomplish?

Which page or flow does this belong to?

---

## Step 2: Map to the Domain

Which domain object is involved? (07_DOMAIN_LANGUAGE_AND_MODEL.md)

Which page owns this? (06_INFORMATION_ARCHITECTURE.md)

---

## Step 3: Verify Architecture Alignment

Does this fit the existing feature structure?

Which folder should this live in?

Does any existing component cover this?

---

## Step 4: Implement

Write the code.

Follow all guardrails in 09_ENGINEERING_GUARDRAILS.md.

Use domain language throughout.

---

## Step 5: Self-Review

Before submitting, run through the PR checklist in 10_AI_COLLABORATION_GUIDE.md.

---

# Common Task Patterns

## Adding a New Component

1. Check 23_COMPONENT_LIBRARY.md — does it already exist?

2. Decide: Shared UI or Feature component?

   - Can another feature reuse it? → `shared/ui/`
   - Only one feature uses it? → `features/{feature}/components/`

3. Implement following the style of existing components.

4. Follow token usage — no hardcoded values.

5. Add accessibility attributes.

6. Handle all three states: loading, empty, error.

---

## Adding a New Page Section

1. Read the page spec (30–38) for the section.

2. Identify parent page and where this section fits in the hierarchy.

3. Create the section component inside the feature folder.

4. Wire data via the feature hook.

5. Handle loading skeleton, empty state, error state.

---

## Adding a New Hook

1. Name it with a business concept: `useWithdraw`, `usePortfolio`, not `useData`.

2. Hook connects: Component → Hook → API.

3. Hook returns: `{ data, isLoading, error, actions }`.

4. Hook owns feature state — does not reach into global state unnecessarily.

---

## Fixing a Bug in a Flow

1. Identify which step of the flow is affected.

2. Read the relevant flow spec (33_DEPOSIT.md, 34_WITHDRAW.md) to understand intended behavior.

3. Fix the root cause — not just the symptom.

4. Verify all steps of the flow still work.

---

# Naming Conventions

## Components

PascalCase, business-descriptive names.

Good: `PortfolioSummary`, `WithdrawTimeline`, `VaultCard`

Bad: `Widget`, `DataContainer`, `InfoBox`

---

## Hooks

camelCase, `use` prefix, business-descriptive.

Good: `usePortfolio`, `useWithdraw`, `useVaultList`

Bad: `useFetch`, `useData`, `useRequest`

---

## API modules

kebab-case files, business-descriptive.

Good: `portfolio.api.ts`, `vault.api.ts`

Bad: `api.ts`, `service.ts`, `data.ts`

---

## Types / Interfaces

Match domain model names from 07_DOMAIN_LANGUAGE_AND_MODEL.md.

Good: `Portfolio`, `Position`, `Vault`, `Withdrawal`

Bad: `PortfolioData`, `VaultInfo`, `WithdrawResponse`

---

# Token Usage in Code

Never hardcode visual values.

```tsx
// Bad
style={{ padding: '24px', color: '#1A1A1A' }}

// Good
className="p-6 text-primary"   // Tailwind mapped to tokens
// or
style={{ padding: token('spacing-card'), color: token('color-text-primary') }}
```

---

# Working with Existing Code

Before adding new code:

Search for similar existing implementations.

Prefer extending over duplicating.

If you duplicate, you are creating debt.

---

# When Requirements Are Unclear

Do not guess.

State the ambiguity explicitly:

"This could mean X or Y. I recommend X because [reason]. Shall I proceed?"

Wait for confirmation if the decision affects user experience.

---

# When Product Conflicts with Technical Constraints

Do not silently choose the easier path.

Explain:

Option A — Ideal UX (may require more effort).

Option B — Technical compromise (faster, worse UX).

Option C — Migration path.

Let the product owner decide.

---

# Code Review Self-Checklist

Before marking any task complete:

□ Product Principles followed (01_PRODUCT_PRINCIPLES.md)

□ Domain language used (07_DOMAIN_LANGUAGE_AND_MODEL.md)

□ Architecture followed (08_FRONTEND_ARCHITECTURE.md)

□ All three states handled (loading, empty, error)

□ Success state implemented

□ Accessibility requirements met (26_ACCESSIBILITY.md)

□ Responsive design works

□ No hardcoded tokens

□ No blockchain language exposed in UI

□ Tests written for business logic

---

# What Success Looks Like

A reviewer reads the code and thinks:

"This feels like Harmonix."

Not:

"This feels like generic React boilerplate."

Not:

"This was clearly AI-generated."

The code should be indistinguishable from what the best member of the product team would have written.

---

# Final AI Workflow Principle

The documentation in this project exists for a reason.

It is not background reading.

It is the specification.

Every commit that follows the documentation

makes the product more coherent.

Every commit that ignores the documentation

makes it harder for the next engineer — human or AI — to understand what was intended.

Respect the documentation.

Update it when it is wrong.

Never work around it silently.
