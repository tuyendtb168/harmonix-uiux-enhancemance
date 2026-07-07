# Harmonix V2

# Session & State Management

Version 2.0

---

# Purpose

This document defines how Harmonix V2 manages user session state, idle detection, and data persistence.

A financial application must handle sessions carefully.

Stale data causes wrong decisions.

Abandoned sessions create security risk.

Lost state creates frustration.

---

# Session Architecture

## Session Definition

A session begins when a user connects their wallet.

A session ends when:

- User explicitly disconnects
- Browser tab is closed
- Session times out due to inactivity (configurable)
- Wallet disconnects externally (e.g., user disconnects in wallet extension)

---

## What Constitutes Session State

| State Type | Storage | Scope |
|------------|---------|-------|
| Connected wallet address | In-memory | Session |
| Wallet provider type | In-memory | Session |
| Network chain ID | In-memory | Session |
| Active filters (Earn page) | In-memory | Session |
| Selected time period (charts) | In-memory | Session |
| Notification read state | localStorage | Persistent |
| Watchlist | localStorage (by wallet) | Persistent |
| Onboarding state | localStorage (by wallet) | Persistent |
| Recently viewed vaults | localStorage (by wallet) | Persistent |
| Display preferences | localStorage (by wallet) | Persistent |
| In-progress modal state | In-memory | Session only |

---

# Wallet Session Persistence

## On Page Load

1. Check localStorage for previously connected wallet provider.
2. If found: attempt silent reconnect (no popup).
3. If reconnect succeeds: restore connected state silently.
4. If reconnect fails (user revoked, wallet locked): clear stored provider, show disconnected state.

---

## Reconnect Banner

After silent reconnect check fails:

Show a non-intrusive banner at top of page:

```
Welcome back. Reconnect your wallet to view your portfolio.

[ Reconnect ]   [ ×  ]
```

Not a modal. Not blocking. User can browse unauthenticated.

---

## Silent Reconnect Rules

Only attempt silent reconnect for MetaMask and Coinbase Wallet.

WalletConnect: do NOT silently reconnect — QR code required again.

If silent reconnect takes > 3 seconds: abort and show disconnected state.

---

# Idle Detection

## Purpose

Detect when the user has been inactive to:

1. Pause data polling (save bandwidth, reduce server load).
2. Warn user before session-sensitive operations.
3. Protect against abandoned session on shared devices.

---

## Idle Threshold

| Activity | Idle After |
|----------|-----------|
| Browser tab in foreground | 15 minutes of no interaction |
| Browser tab in background | 5 minutes after tab loses focus |

Interaction events that reset idle timer: mousemove, keydown, touchstart, scroll, click.

---

## Idle State Behavior

When user goes idle (foreground 15 min):

1. **Pause data polling**: Stop fetching portfolio, notifications, vault data.
2. **No UI change** visible to user — silent pause only.
3. Cache remains intact for immediate display on return.

---

## Return from Idle

When user interacts after idle:

1. Resume data polling immediately.
2. Trigger one full data refresh in background.
3. Show stale data from cache until refresh completes.
4. No "session expired" modal — seamless resume.

---

## Background Tab Behavior

When browser tab loses focus:

Reduce polling frequency: portfolio → every 5 minutes (from 30s).

Notifications polling: every 2 minutes (from 15s).

Vault data: pause completely.

When tab regains focus:

Immediately resume normal polling.

Trigger one full refresh.

---

# Data Polling Strategy

## Polling Intervals (Active / Idle / Background)

| Data | Active | Idle | Background Tab |
|------|--------|------|----------------|
| Portfolio summary | 30s | Paused | 5 min |
| Position values | 30s | Paused | 5 min |
| Notifications | 15s | Paused | 2 min |
| Vault list (Earn) | 60s | Paused | Paused |
| Active vault detail | 30s | Paused | Paused |
| Pending withdrawal status | 60s | Paused | 5 min |
| Platform stats (Home) | 120s | Paused | Paused |

---

## Polling vs WebSocket

V2: Long polling for all real-time data.

Future (V3): WebSocket for portfolio values, notifications.

Polling is simpler to implement, easier to debug, sufficient for V2 data freshness requirements.

---

# State Persistence (localStorage)

## Key Structure

All localStorage keys are namespaced:

```
harmonix:[walletAddress]:[key]
```

Example:

```
harmonix:0x1234...5678:watchlist
harmonix:0x1234...5678:onboardingState
harmonix:0x1234...5678:displayPreferences
```

Using wallet address as namespace ensures:

Multiple wallets on same device have separate state.

Unauthenticated state is separate from authenticated state.

---

## Persisted State Schema

```typescript
// Per-wallet persistent state
interface WalletPersistentState {
  watchlist: string[]               // vault IDs
  recentlyViewed: string[]          // vault IDs, max 5
  onboarding: OnboardingState       // see 70_ONBOARDING_FLOW.md
  displayPreferences: {
    theme: 'light' | 'dark' | 'system'
    valueDisplay: 'usd' | 'native'
    compactNumbers: boolean
  }
  notifications: {
    readIds: string[]               // notification IDs marked read
    dismissedBanners: string[]      // banner IDs dismissed
  }
}
```

---

## localStorage Size Management

Max watchlist: 50 vaults (prevents unbounded growth).

Max recentlyViewed: 5 entries.

Max readIds (notifications): 200 entries — prune oldest when exceeded.

Total localStorage usage target: < 50kb per wallet.

---

# In-Progress Flow State

Deposit and Withdraw modal state is intentionally NOT persisted.

If user refreshes mid-flow: they start over.

Reason: Financial flows must be explicit. An auto-resumed half-completed deposit creates confusion and potential double-submission risk.

Exception: If transaction was already submitted on-chain, the result is visible in Portfolio regardless of modal state.

---

# Network State Management

## Online / Offline Detection

```typescript
// Listen for network state changes
window.addEventListener('online', handleOnline)
window.addEventListener('offline', handleOffline)
```

**Offline**: Show global banner "No internet connection. Data may be outdated."

Disable all transaction actions (Deposit, Withdraw, Claim).

Keep displaying cached data.

**Back online**: Remove banner. Trigger immediate full refresh. Re-enable actions.

---

## Stale Data Indicators

When data is older than 2× its TTL (e.g., portfolio data > 60s old):

Show a subtle "Last updated X minutes ago" timestamp.

Not an error. Just a freshness indicator.

When offline: "Data from [time] — offline mode"

---

# Wallet State Changes

## Network Switch (Mid-Session)

If user switches network in their wallet while app is open:

Detect via `chainChanged` event.

If new network is wrong: show network switch banner (same as initial connection flow).

If new network is correct: refresh all data silently.

---

## Account Switch (Mid-Session)

If user switches wallet account:

Detect via `accountsChanged` event.

Clear current user's data from display.

Load new account's data.

Show brief: "Switched to 0xabcd...1234"

---

## Wallet Disconnect (External)

If user disconnects via their wallet extension (not via Harmonix UI):

Detect via `accountsChanged` returning empty array.

Clear session state.

Show disconnected state in navigation.

Show banner: "Wallet disconnected. Reconnect to view your portfolio."

---

# Error Recovery for State

## Corrupted localStorage

If localStorage data fails to parse (corrupted JSON):

Log error silently.

Clear corrupted key.

Use default values.

Never crash the app due to bad localStorage.

```typescript
function safeGetStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : defaultValue
  } catch {
    localStorage.removeItem(key)
    return defaultValue
  }
}
```

---

## API Failure State

If API call fails:

Show stale cached data (if available).

Show subtle error indicator: "Couldn't refresh — showing last known data"

Retry automatically after 30 seconds.

Do not show full-page error for transient API failures.

Full-page error only when no cached data exists AND API has failed 3+ consecutive times.

---

# Session Security

## Read-Only by Default

Wallet connection is read-only.

No funds can move without explicit user signature.

Session state contains no private keys, seed phrases, or signing credentials.

---

## localStorage Security Notes

localStorage is accessible by any same-origin JavaScript.

Never store:

- Private keys
- Seed phrases
- Signed messages
- Session tokens (Harmonix is stateless — no auth tokens needed)

Stored data (watchlist, preferences) is non-sensitive.

---

## XSS Mitigation

All React rendering escapes user-provided content by default.

Never use `dangerouslySetInnerHTML` for user-controlled data.

Vault names and descriptions from API: treated as plain text, not HTML.

---

# Session State Debugging

In development mode only:

Session state inspector panel available at `/debug/session`.

Shows: connected wallet, polling status, localStorage keys, cached data ages.

Never available in production.

---

# Final Session Principle

State management is invisible when done well.

Users should never notice:

- Data refreshing
- Session resuming
- State persisting

They should only notice when state fails:

"Why is my portfolio showing old data?"

"Why did my filters reset?"

Every state decision should be made with that question in mind.

Design the session so users never have to ask it.
