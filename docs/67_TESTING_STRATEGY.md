# Harmonix V2

# Testing Strategy

Version 2.0

---

# Purpose

This document defines the testing approach for Harmonix V2.

Tests exist to protect user experience.

Not to achieve coverage numbers.

---

# Testing Philosophy

Test user behavior.

Not implementation details.

A test that breaks when you rename a variable is a bad test.

A test that catches a broken deposit flow is a good test.

---

# Testing Pyramid

```
         ┌─────────────┐
         │  E2E Tests  │  (few, critical paths)
         ├─────────────┤
         │ Integration │  (feature-level behavior)
         ├─────────────┤
         │  Unit Tests │  (business logic, hooks)
         └─────────────┘
```

Most tests at the bottom.

Few tests at the top.

---

# Unit Tests

## What to Test

Business logic utilities.

Hooks (data transformations, state logic).

Number formatting functions.

APY calculations.

Amount validation.

Status mapping.

---

## What NOT to Test

Component rendering details.

CSS classes.

Internal hook implementation.

---

## Tools

Vitest (fast, Vite-native).

React Testing Library for hook tests.

---

## Example: Hook Test

```typescript
describe('usePortfolio', () => {
  it('calculates weighted APY correctly', () => {
    const positions = [
      { currentValue: 5000, apy: 12.0 },
      { currentValue: 5000, apy: 14.0 },
    ]
    expect(calculateWeightedApy(positions)).toBe(13.0)
  })

  it('returns zero weighted APY when no positions', () => {
    expect(calculateWeightedApy([])).toBe(0)
  })
})
```

---

## Example: Utility Test

```typescript
describe('formatCurrency', () => {
  it('formats thousands with K shorthand', () => {
    expect(formatCurrency(5000)).toBe('$5K')
  })

  it('formats millions with M shorthand', () => {
    expect(formatCurrency(2100000)).toBe('$2.1M')
  })

  it('formats small amounts with 2 decimal places', () => {
    expect(formatCurrency(0.82)).toBe('$0.82')
  })
})
```

---

# Integration Tests

## What to Test

Feature-level user flows.

Component behavior (what users see and interact with).

Data flow from hook to component.

---

## Scope

Deposit flow: input → review → success.

Withdraw flow: input → review → submitted.

Portfolio rendering: with data, empty, loading.

Notification drawer: open, read, close.

---

## Tools

React Testing Library.

Mock Service Worker (MSW) for API mocking.

---

## Example: Deposit Flow Test

```typescript
describe('Deposit Flow', () => {
  it('completes deposit when user fills amount and confirms', async () => {
    render(<DepositModal vaultId="delta-neutral-usdc" />)

    await userEvent.type(screen.getByLabelText('Amount'), '5000')
    await userEvent.click(screen.getByText('Review Deposit'))

    expect(screen.getByText('Confirm Deposit')).toBeInTheDocument()
    expect(screen.getByText('5,000 USDC')).toBeInTheDocument()

    await userEvent.click(screen.getByText('Confirm Deposit'))

    // wallet signing step
    expect(screen.getByText(/waiting for wallet/i)).toBeInTheDocument()
  })

  it('shows error when amount exceeds balance', async () => {
    render(<DepositModal vaultId="delta-neutral-usdc" maxBalance={100} />)

    await userEvent.type(screen.getByLabelText('Amount'), '5000')

    expect(screen.getByText(/exceeds your balance/i)).toBeInTheDocument()
    expect(screen.getByText('Review Deposit')).toBeDisabled()
  })
})
```

---

# E2E Tests

## What to Test

Critical user journeys only.

Deposit flow (happy path).

Withdrawal flow (happy path).

Portfolio loads correctly with connected wallet.

Notification drawer opens and marks as read.

---

## Tools

Playwright.

---

## Critical Paths (Must Always Pass)

1. Connect wallet → navigate to Earn → open Vault Detail → open Deposit modal → complete deposit → land on Portfolio.

2. Navigate to Portfolio → open Withdraw modal → confirm withdrawal → see pending in Portfolio.

3. Open notification drawer → view notification → navigate via deep link.

---

## E2E Environment

Use a test wallet with test funds on a staging/testnet environment.

Never run E2E tests against production.

---

# Visual Regression Tests

## What to Test

Key page screenshots.

Component states (loading, empty, error, filled).

---

## Tools

Playwright screenshots.

Chromatic (optional, for Storybook-based visual testing).

---

## Pages to Capture

Home (connected + not connected)

Earn (with vault list)

Vault Detail

Portfolio (with positions + empty)

Rewards

---

# Testing Rules

## Rule 1: Test Business Behavior

```
// Bad — tests implementation
expect(component.state.isLoading).toBe(false)

// Good — tests behavior
expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
```

---

## Rule 2: Use Meaningful Test Data

```
// Bad
amount: 1

// Good
amount: 5000  // realistic user deposit
```

---

## Rule 3: Test All Three States

Every feature test must cover:

Loading state.

Empty state.

Filled state.

---

## Rule 4: No Snapshot Tests for Business Logic

Snapshot tests for UI are fragile.

Use behavior assertions instead.

---

## Rule 5: Test Error Cases

Every form test includes:

Valid input → success.

Invalid input → error message shown.

API failure → error state shown.

---

# CI Integration

All tests run on:

Pull requests (required to pass before merge).

Main branch pushes.

---

Test command: `npm run test`

E2E command: `npm run test:e2e`

Coverage report: `npm run test:coverage`

---

# Coverage Targets

Business logic utilities: > 90%

Hooks: > 80%

Component behavior: > 70%

Overall: > 75%

Coverage is a signal.

Not a guarantee.

---

# Final Testing Principle

Tests exist to give teams confidence to ship.

A test suite that takes 20 minutes and has 95% coverage

but misses the deposit flow

is worse than a 15-minute suite with 70% coverage

that catches every broken user journey.

Ship confidence, not numbers.
