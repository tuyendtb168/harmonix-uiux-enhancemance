# Harmonix V2

# Drawer Component Specification

Version 2.0

---

# Purpose

Drawer provides supplementary content in a slide-in panel.

Drawers do not interrupt the main page.

They overlay it from the side or bottom.

---

# Component Location

`shared/ui/Drawer`

---

# Philosophy

Drawers are for supplementary content that users access frequently.

Not for critical flows or deep reading.

If the content requires full attention, use a Modal or a Page.

---

# When to Use Drawer

Notification center

Wallet panel

Quick settings (display preferences)

---

# When NOT to Use Drawer

Deposit or withdraw flows (use Modal)

Vault details (use a Page)

Full portfolio overview (use a Page)

Long-form content or heavy reading

---

# Drawer Variants

## Right Drawer

Slides in from the right edge.

Most common variant.

Width: 400px desktop, 100% mobile.

Usage: Notifications, Wallet panel.

---

## Bottom Drawer (Mobile)

Slides up from the bottom edge.

Used on mobile only.

Height: auto (content-driven), max 90vh.

Usage: Mobile quick actions, wallet.

---

# Drawer Anatomy

```
┌──────────────────────────────────────────────────────────┐
│                    BACKDROP (semi-transparent)            │
│  ┌────────────────────────────────────────────────────┐  │
│  │  HEADER                                            │  │
│  │  [ Title ]                          [ × Close ]   │  │
│  ├────────────────────────────────────────────────────┤  │
│  │                                                    │  │
│  │  BODY (scrollable)                                 │  │
│  │  [ Content ]                                       │  │
│  │                                                    │  │
│  ├────────────────────────────────────────────────────┤  │
│  │  FOOTER (optional)                                 │  │
│  │  [ Action ]                                        │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

# Header

Title: Heading M, left-aligned.

Close button: × icon, top-right.

Optional: action button (e.g., "Mark All Read").

---

# Body

Independently scrollable.

Header and footer remain sticky.

---

# Footer (Optional)

Low-priority action.

Example: "View All Notifications" or "Disconnect Wallet"

---

# Animation

Enter:

Backdrop fades in.

Drawer slides in from right (translateX: 100% → 0).

Duration: duration-slow (300ms), ease-enter.

Exit:

Drawer slides out to right (translateX: 0 → 100%).

Duration: duration-normal (200ms), ease-exit.

---

# Close Behavior

Close button (×): always available.

Clicking backdrop: closes drawer.

Escape key: closes drawer.

---

# Backdrop

Semi-transparent overlay.

Does not block page scroll.

Clicking backdrop closes drawer.

---

# Scroll Behavior

Drawer body scrolls independently.

Page behind drawer does not scroll when drawer is open.

---

# Focus Management

On open: focus moves to first interactive element inside drawer.

On close: focus returns to the trigger (e.g., notification icon).

Tab: cycles only within open drawer.

Escape: closes drawer.

---

# Notification Drawer Specifics

This is the primary use case for Drawer.

See 37_NOTIFICATION.md for full notification content specification.

---

Notification Drawer extras:

"Mark All Read" button in header.

Unread count in header: "Notifications (3)".

Empty state when no notifications exist.

---

# Wallet Drawer Specifics

Shows:

Connected wallet address.

Network.

Portfolio value (quick summary).

Disconnect button.

Copy address.

View on Explorer.

Settings shortcut.

---

# Token Usage

Background: `color-surface`

Border left: `color-border`

Shadow: `shadow-lg`

Width (desktop): 400px

Transition: `duration-slow`, `ease-enter` (open), `duration-normal`, `ease-exit` (close)

Backdrop: `opacity-backdrop` token

---

# React Props Interface

```tsx
interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  position?: 'right' | 'bottom'
  footer?: ReactNode
  children: ReactNode
}
```

---

# Accessibility

`role="dialog"`

`aria-modal="true"`

`aria-labelledby` pointing to drawer title.

Focus trap required.

Escape key closes drawer.

Screen reader announces drawer open/close.

---

# Do Not

Do not use Drawer for transaction flows.

Do not put complex forms inside a Drawer.

Do not open a Drawer from within a Modal.

Do not make Drawer content require horizontal scrolling.

---

# Final Drawer Principle

Drawers exist for frequent access without full-page context switching.

They should feel like a quick peek.

Users open them, do what they need, and close them.

The page behind should feel like it never left.
