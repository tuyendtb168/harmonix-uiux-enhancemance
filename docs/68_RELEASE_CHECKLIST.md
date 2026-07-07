# Harmonix V2

# Release Checklist

Version 2.0

---

# Purpose

This document defines the checklist every release must pass before going to production.

The checklist protects users from broken experiences.

It is not bureaucracy.

It is a quality gate.

---

# Checklist Philosophy

A release that passes this checklist can be deployed with confidence.

A release that skips this checklist ships risk.

Every item exists because something broke without it.

---

# Pre-Development Checklist

Before starting any feature:

□ Feature is documented in the relevant spec file (30–38 for pages, 40–50 for components).

□ Domain language follows 07_DOMAIN_LANGUAGE_AND_MODEL.md.

□ Architecture follows 08_FRONTEND_ARCHITECTURE.md.

□ Product decisions are understood (02_PRODUCT_DECISIONS.md).

□ UX laws have been considered (04_UX_LAWS_AND_HEURISTICS.md).

---

# Development Checklist

During development, before submitting for review:

## Code Quality

□ No hardcoded colors, spacing, or typography — all tokens used.

□ No hardcoded domain language — use constants from shared domain.

□ No inline business logic in components.

□ No duplicate API calls across features.

□ No `console.log` statements in production code.

□ No TODO comments left unaddressed.

---

## State Management

□ Global state contains only: wallet, portfolio summary, notifications, theme, rewards counter.

□ Feature state does not leak to other features.

□ Local state not promoted unnecessarily.

---

## Component Rules

□ Each component has one responsibility.

□ Shared UI components are used where appropriate.

□ No new component created when an existing one could be extended.

□ Feature components remain inside feature folder.

---

## API Layer

□ No fetch() calls inside components.

□ All data flows through: Component → Hook → API.

□ Error states handled in every API call.

□ Loading states handled in every async operation.

---

# UX Checklist

Before any page or feature ships:

## Content States

□ Loading state implemented with skeleton.

□ Empty state implemented with context-specific message.

□ Error state implemented with recovery path.

□ Success state implemented with clear confirmation.

---

## User Journey

□ Every CTA is clearly labeled with a verb + noun.

□ Primary action is always visible without scrolling (desktop).

□ Back navigation works correctly.

□ No dead ends — every page has a clear next step.

---

## Domain Language

□ No blockchain jargon in user-facing text (Redeem, Claim, Fulfill, Settlement).

□ All copy follows 24_COPYWRITING_GUIDELINES.md.

□ Error messages follow error catalog in 62_ERROR_HANDLING.md.

---

# Accessibility Checklist

□ All interactive elements are keyboard accessible.

□ Focus indicators are visible on all interactive elements.

□ Modals and drawers have focus trap.

□ Escape key closes modal/drawer.

□ All images have alt text.

□ Icon-only buttons have aria-label.

□ Color is not the only conveyor of meaning.

□ Minimum contrast ratio met (4.5:1 for text).

□ Reduced motion preference respected.

□ Screen reader announces dynamic content (aria-live).

---

# Performance Checklist

□ Charts lazy-load.

□ Heavy tables lazy-load.

□ No chart or table blocks above-fold content.

□ Portfolio summary loads with priority.

□ Page loads with skeleton — no empty flash.

---

# Responsive Design Checklist

□ Desktop (1280px+): full layout verified.

□ Tablet (768px–1279px): layout adapts correctly.

□ Mobile (< 768px): all content accessible.

□ No horizontal scroll on mobile.

□ All touch targets ≥ 44×44px.

□ Modals full-screen on mobile.

---

# Security Checklist

□ No sensitive data logged to console.

□ No wallet private keys or seed phrases handled.

□ All user inputs validated.

□ Network validation active (correct chain).

□ No PII transmitted to analytics.

□ External links open in new tab.

---

# Analytics Checklist

□ New user actions tracked per 61_ANALYTICS_EVENTS.md.

□ No new events tracked that are not documented.

□ Wallet addresses hashed before tracking.

---

# Testing Checklist

□ Unit tests written for new business logic.

□ Integration tests written for new user flows.

□ All existing tests pass.

□ No snapshot tests for business logic.

□ Coverage meets targets (see 67_TESTING_STRATEGY.md).

---

# Final Verification

□ Feature works correctly in Chrome.

□ Feature works correctly in Firefox.

□ Feature works correctly in Safari.

□ Feature works on a real mobile device (or emulator).

□ No JavaScript errors in console on any page.

□ Build succeeds without warnings.

---

# Pre-Deploy Checklist

□ Staging environment tested.

□ Environment variables verified.

□ API endpoints point to correct environment.

□ No debug flags or test mode active.

□ Release notes prepared.

---

# Post-Deploy Checklist

□ Deposit flow verified in production.

□ Withdrawal flow verified in production.

□ Portfolio loads correctly with real wallet.

□ Notification system active.

□ No errors in production monitoring within first 30 minutes.

---

# Rollback Criteria

Initiate rollback immediately if:

Deposit flow fails in production.

Withdrawal flow fails in production.

Portfolio data does not load for any connected wallet.

Error rate exceeds 5% within 30 minutes of deploy.

---

# Final Release Checklist Principle

A checklist is not a burden.

It is the difference between confidence and hope.

Ship with confidence.

Every item checked is one less user affected by a preventable mistake.
