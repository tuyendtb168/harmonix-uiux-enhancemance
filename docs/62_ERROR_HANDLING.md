# Harmonix V2

# Error Handling

Version 2.0

---

# Purpose

This document defines how errors are handled, communicated, and recovered from in Harmonix V2.

Errors are inevitable.

How they are handled determines whether users trust the product.

---

# Error Philosophy

Every error must answer three questions:

What happened?

Why?

What should the user do next?

---

Never expose:

Stack traces.

Contract addresses in error messages.

Protocol-level error codes.

Internal system jargon.

---

# Error Categories

## 1. Wallet Errors

Errors related to wallet connection and signing.

---

## 2. Transaction Errors

Errors during deposit or withdrawal.

---

## 3. Network Errors

Errors from blockchain or API connectivity.

---

## 4. Validation Errors

User input that fails validation before submission.

---

## 5. Application Errors

Unexpected frontend failures.

---

## 6. API Errors

Backend or data fetching failures.

---

# Error Severity Levels

| Level | Description | Display Method |
|-------|-------------|----------------|
| Critical | Blocks all functionality | Full-page error state |
| High | Blocks current action | Modal error or inline error in flow |
| Medium | Affects a section | Inline card error or toast |
| Low | Non-blocking informational | Toast (info or warning) |

---

# Error Display Patterns

## Full-Page Error

Used when: Critical failure, cannot load application.

```
[ Warning Icon ]

Something went wrong.

We couldn't load Harmonix. Please try refreshing.

[ Refresh Page ]
[ Contact Support ]
```

---

## Inline Section Error

Used when: A specific section fails to load.

Replaces the section content.

```
[ Warning Icon ]

Couldn't load your portfolio.

Please try again.

[ Retry ]
```

---

## Toast Error

Used when: Action fails but page remains usable.

Red toast, stays until dismissed.

```
Transaction failed — please try again.
```

---

## Modal Inline Error

Used when: Error occurs within a flow step.

Shown inside the modal, above the footer.

```
⚠ Insufficient balance. You have 3,000 USDC available.
```

---

## Form Validation Error

Used when: User input is invalid.

Shown directly below the affected input.

```
[ Input Field ]
⚠ Amount exceeds your available balance of 4,200 USDC.
```

---

# Error Message Catalog

## Wallet Errors

| Error | User Message |
|-------|-------------|
| Wallet not connected | Connect your wallet to continue. |
| Wrong network | Switch to the Hyperliquid network to continue. |
| User rejected signature | Transaction was cancelled. You can try again. |
| Wallet timeout | Wallet response timed out. Please try again. |
| No wallet found | No wallet detected. Install MetaMask or connect via WalletConnect. |

---

## Transaction Errors

| Error | User Message |
|-------|-------------|
| Insufficient balance | Your balance is insufficient for this transaction. |
| Vault at capacity | This vault is currently at capacity. Try another vault. |
| Vault paused | Deposits are temporarily paused for this vault. |
| Transaction reverted | Transaction failed on-chain. Please try again or contact support if this persists. |
| Gas estimation failed | Unable to estimate gas. Check your balance and try again. |
| Slippage too high | Transaction cancelled due to price movement. Try again with a higher slippage tolerance. |

---

## Network / API Errors

| Error | User Message |
|-------|-------------|
| API timeout | Connection timed out. Please check your internet and try again. |
| Data load failure | Couldn't load this information. Please refresh. |
| RPC error | Network error. Please try again. |
| Rate limited | Too many requests. Please wait a moment and try again. |

---

## Validation Errors

| Condition | Message |
|-----------|---------|
| Amount below minimum | Minimum deposit is {min} {asset}. |
| Amount above balance | Amount exceeds your balance of {balance} {asset}. |
| Amount above max | Maximum deposit for this vault is {max} {asset}. |
| Empty input | Please enter an amount. |
| Invalid characters | Please enter a valid number. |

---

# Recovery Paths

Every error must provide at least one recovery option.

| Error Type | Recovery Action |
|-----------|----------------|
| Wallet rejected | "Try Again" button |
| Network error | "Retry" button |
| Validation error | Fix the input — form remains open |
| Full-page error | "Refresh Page" button |
| Vault at capacity | "View Other Vaults" → /earn |
| Unexpected error | "Try Again" + "Contact Support" |

---

# Error Logging

All errors must be logged for engineering review.

Log:

error_type

error_code (internal)

page

component

user context (hashed wallet address only)

timestamp

Never log:

Wallet private keys.

Raw transaction data with sensitive values.

Personally identifiable information.

---

# Error State Components

Error states use the standard component patterns:

Full-page error: custom full-page layout.

Section error: `<ErrorBoundary>` wrapping each section.

Inline error: inline `<ErrorMessage>` component.

Toast error: `<Toast variant="error">`.

Form validation: `<FormError>` below each field.

---

# React Error Boundaries

Wrap each major feature section in an `<ErrorBoundary>`.

Features do not crash each other.

Portfolio error does not break Earn.

Rewards error does not break Portfolio.

---

```tsx
<ErrorBoundary fallback={<SectionError onRetry={refetch} />}>
  <PortfolioSummary />
</ErrorBoundary>
```

---

# Async Error Handling in Hooks

```tsx
const { data, error, isLoading } = usePortfolio()

if (error) {
  return <SectionError message="Couldn't load your portfolio." onRetry={refetch} />
}
```

Never let unhandled promise rejections surface to users.

---

# Final Error Handling Principle

An error is a moment of truth.

Users who experience a clear, helpful error message often trust the product more.

Not less.

Because the product showed honesty.

An error is not a failure.

An unexplained, confusing error is.
