# Harmonix V2

# API Contract Guide

Version 2.0

---

# Purpose

This document defines the contract between the Harmonix frontend and backend API.

It establishes the structure, conventions, and rules that both sides must follow.

A stable API contract reduces integration bugs and makes AI-assisted development predictable.

---

# API Philosophy

APIs are product interfaces.

They exist to serve user flows.

Not the other way around.

Every endpoint should map to a user action or display need.

---

# Base Principles

RESTful conventions.

JSON request and response bodies.

Versioned API: `/api/v1/`

Authentication: wallet signature or JWT (depends on implementation).

All amounts in smallest unit (e.g., USDC with 6 decimals) internally — formatted by frontend.

---

# Response Envelope

All responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": {
    "timestamp": "2024-01-20T14:32:00Z",
    "requestId": "req_abc123"
  }
}
```

Error response:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient balance for this transaction.",
    "details": {}
  },
  "meta": {
    "timestamp": "2024-01-20T14:32:00Z",
    "requestId": "req_abc123"
  }
}
```

---

# Pagination

List endpoints return:

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 47,
      "hasNext": true
    }
  }
}
```

Default page size: 10.

Maximum page size: 100.

---

# Error Codes

| Code | HTTP Status | Meaning |
|------|-------------|---------|
| UNAUTHORIZED | 401 | Wallet not authenticated |
| FORBIDDEN | 403 | Action not permitted |
| NOT_FOUND | 404 | Resource does not exist |
| INSUFFICIENT_BALANCE | 400 | User balance too low |
| VAULT_AT_CAPACITY | 400 | Vault is full |
| VAULT_PAUSED | 400 | Vault deposits paused |
| INVALID_AMOUNT | 400 | Amount out of range |
| NETWORK_ERROR | 503 | Upstream service unavailable |
| RATE_LIMITED | 429 | Too many requests |

---

# Core Endpoints

## Vaults

### GET /api/v1/vaults

Returns all available vaults.

Response data:

```json
{
  "vaults": [
    {
      "id": "delta-neutral-usdc",
      "name": "Delta Neutral USDC",
      "asset": "USDC",
      "apy": 12.4,
      "tvl": 2100000,
      "capacity": 5000000,
      "riskLevel": "low",
      "status": "active",
      "strategy": {
        "name": "Delta Neutral",
        "description": "..."
      },
      "inceptionDate": "2024-01-01"
    }
  ]
}
```

---

### GET /api/v1/vaults/:id

Returns single vault details.

Additional fields vs list:

```json
{
  "allocation": [...],
  "historicalApy": [...],
  "protocols": [...],
  "minDeposit": 100,
  "withdrawalPeriodDays": 3
}
```

---

### GET /api/v1/vaults/:id/performance

Returns historical performance data for charts.

Query params: `?period=7d|30d|90d|all`

Response:

```json
{
  "series": [
    { "date": "2024-01-01", "apy": 12.1, "tvl": 1900000 }
  ]
}
```

---

## Portfolio

### GET /api/v1/portfolio

Returns user's full portfolio. Requires authentication.

```json
{
  "portfolioValue": 12450.00,
  "totalDeposited": 10000.00,
  "totalEarnings": 2450.00,
  "weightedApy": 12.4,
  "positions": [...],
  "pendingWithdrawals": [...],
  "rewardsSummary": {
    "totalPoints": 1250,
    "monthPoints": 340
  }
}
```

---

### GET /api/v1/portfolio/positions

Returns user's active positions.

```json
{
  "positions": [
    {
      "id": "pos_abc",
      "vaultId": "delta-neutral-usdc",
      "vaultName": "Delta Neutral USDC",
      "asset": "USDC",
      "depositedAmount": 5000,
      "currentValue": 5620,
      "earnings": 620,
      "earningsPercent": 12.4,
      "currentApy": 12.4,
      "status": "active",
      "depositedAt": "2024-01-01T10:00:00Z"
    }
  ]
}
```

---

### GET /api/v1/portfolio/activity

Returns activity history. Paginated.

```json
{
  "items": [
    {
      "id": "act_abc",
      "type": "deposit",
      "vaultId": "delta-neutral-usdc",
      "amount": 5000,
      "asset": "USDC",
      "status": "completed",
      "txHash": "0x...",
      "createdAt": "2024-01-20T14:32:00Z"
    }
  ]
}
```

---

## Withdrawals

### POST /api/v1/withdrawals

Initiates a withdrawal.

Request:

```json
{
  "vaultId": "delta-neutral-usdc",
  "amount": 5000,
  "asset": "USDC"
}
```

Response:

```json
{
  "withdrawalId": "wd_abc123",
  "status": "queued",
  "estimatedCompletionDate": "2024-01-23",
  "txHash": "0x..."
}
```

---

### GET /api/v1/withdrawals/:id

Returns withdrawal status.

```json
{
  "id": "wd_abc123",
  "status": "processing",
  "amount": 5000,
  "asset": "USDC",
  "vaultId": "delta-neutral-usdc",
  "timeline": [
    { "step": "requested", "status": "completed", "timestamp": "2024-01-20T14:32:00Z" },
    { "step": "queued", "status": "completed", "timestamp": "2024-01-20T14:35:00Z" },
    { "step": "processing", "status": "active", "timestamp": null },
    { "step": "transferred", "status": "pending", "timestamp": null },
    { "step": "completed", "status": "pending", "timestamp": null }
  ],
  "estimatedCompletionDate": "2024-01-23"
}
```

---

## Notifications

### GET /api/v1/notifications

Returns user's notifications. Paginated.

Query: `?unreadOnly=true`

---

### PATCH /api/v1/notifications/:id/read

Marks a notification as read.

---

### PATCH /api/v1/notifications/read-all

Marks all notifications as read.

---

## Rewards

### GET /api/v1/rewards

Returns user's rewards summary.

---

### GET /api/v1/campaigns

Returns all campaigns (active + ended).

---

# Frontend API Layer

All API calls go through the API module.

Never call `fetch()` directly in components or hooks.

```typescript
// src/shared/api/portfolio.api.ts
export const portfolioApi = {
  getPortfolio: () => apiClient.get<Portfolio>('/portfolio'),
  getPositions: () => apiClient.get<Position[]>('/portfolio/positions'),
  getActivity: (params: PaginationParams) => apiClient.get('/portfolio/activity', { params }),
}
```

---

# Final API Contract Principle

The API contract is a shared agreement.

Frontend and backend must honor it equally.

Breaking changes require versioning.

Never silently change a response shape.

The frontend depends on it.

The user experience depends on it.
