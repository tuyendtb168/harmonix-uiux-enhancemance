import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Info, ChevronRight, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip as ReTooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'
import { usePortfolio } from '@/features/portfolio/hooks/usePortfolio'
import type { PortfolioPosition } from '@/features/portfolio/components/PositionCard'
import { WithdrawModal } from '@/features/vault/components/WithdrawModal'

// ── Data ──────────────────────────────────────────────────────────────────────

const PENDING = [
  { id: 'w1', token: 'USDC', color: '#2775CA', vault: 'Delta Neutral USDC', date: 'Jun 20, 2025', time: '10:30 AM', eta: '2d 14h remaining', amount: '5,000' },
  { id: 'w2', token: 'USDT', color: '#26A17B', vault: 'Harmonix USD',        date: 'Jun 21, 2025', time: '09:15 AM', eta: '1d 22h remaining', amount: '2,000' },
]

type TimeTab = '1D' | '7D' | '30D' | '90D' | 'ALL'
const CHART_DATA: Record<TimeTab, { month: string; portfolioValue: number; netDeposited: number }[]> = {
  '1D': [
    { month: '00:00', portfolioValue: 223_100, netDeposited: 200_000 },
    { month: '08:00', portfolioValue: 223_260, netDeposited: 200_000 },
    { month: '16:00', portfolioValue: 223_400, netDeposited: 200_000 },
    { month: '20:00', portfolioValue: 223_450, netDeposited: 200_000 },
  ],
  '7D': [
    { month: 'Mon', portfolioValue: 222_000, netDeposited: 200_000 },
    { month: 'Wed', portfolioValue: 222_100, netDeposited: 200_000 },
    { month: 'Fri', portfolioValue: 223_200, netDeposited: 200_000 },
    { month: 'Sun', portfolioValue: 223_450, netDeposited: 200_000 },
  ],
  '30D': [
    { month: 'Jun 1',  portfolioValue: 218_400, netDeposited: 200_000 },
    { month: 'Jun 15', portfolioValue: 220_900, netDeposited: 200_000 },
    { month: 'Jun 26', portfolioValue: 223_450, netDeposited: 200_000 },
  ],
  '90D': [
    { month: 'Apr', portfolioValue: 213_100, netDeposited: 200_000 },
    { month: 'May', portfolioValue: 218_400, netDeposited: 200_000 },
    { month: 'Jun', portfolioValue: 223_450, netDeposited: 200_000 },
  ],
  'ALL': [
    { month: 'Jan', portfolioValue: 200_000, netDeposited: 200_000 },
    { month: 'Feb', portfolioValue: 204_200, netDeposited: 200_000 },
    { month: 'Mar', portfolioValue: 208_500, netDeposited: 200_000 },
    { month: 'Apr', portfolioValue: 213_100, netDeposited: 200_000 },
    { month: 'May', portfolioValue: 218_400, netDeposited: 200_000 },
    { month: 'Jun', portfolioValue: 223_450, netDeposited: 200_000 },
  ],
}

const EARNINGS_SLICES = [
  { name: 'Delta Neutral USDC', value: 12_274, pct: 52.3, color: '#c8f731' },
  { name: 'ETH Yield Max',      value: 7_176,  pct: 30.6, color: '#3b82f6' },
  { name: 'Stable Plus',        value: 4_000,  pct: 17.1, color: '#a855f7' },
]

const ACTIVITY = [
  { id: 'p1', type: 'deposit',  action: 'Deposit',     vault: 'Delta Neutral USDC', amount: '+5,000',  unit: 'USDC', timestamp: '2026-06-26 10:32' },
  { id: 'p2', type: 'withdraw', action: 'Withdrawal',  vault: 'ETH Yield Max',      amount: '-1.2',    unit: 'ETH',  timestamp: '2026-06-26 08:14' },
  { id: 'p3', type: 'complete', action: 'Auto Redeem', vault: 'Stable Plus',        amount: '+2,400',  unit: 'USDC', timestamp: '2026-06-25 22:05' },
  { id: 'p4', type: 'deposit',  action: 'Deposit',     vault: 'ETH Yield Max',      amount: '+1.2',    unit: 'ETH',  timestamp: '2026-06-24 14:20' },
  { id: 'p5', type: 'complete', action: 'Auto Redeem', vault: 'Delta Neutral USDC', amount: '+12,500', unit: 'USDC', timestamp: '2026-06-23 09:48' },
]

// ── Token icon ────────────────────────────────────────────────────────────────

function TokenIcon({ token, color, size = 36 }: { token: string; color: string; size?: number }) {
  return (
    <div
      style={{ width: size, height: size, backgroundColor: color + '22', border: `2px solid ${color}55` }}
      className="rounded-full flex items-center justify-center shrink-0"
    >
      <span style={{ color, fontSize: size * 0.3 }} className="font-black">{token.slice(0, 1)}</span>
    </div>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function H2Navbar() {
  const links = [
    { label: 'Overview' },
    { label: 'Invest', dropdown: true },
    { label: 'Portfolio', active: true },
    { label: 'Rewards' },
    { label: 'Referrals' },
    { label: 'More', dropdown: true },
  ]
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }} className="w-full sticky top-0 z-40">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded" style={{ background: '#1a2e00' }}>
            <span style={{ color: '#c8f731', fontSize: 10 }} className="font-black">HX</span>
          </div>
          <span className="text-sm font-bold tracking-tight" style={{ color: '#0f172a' }}>HARMONIX</span>
        </div>
        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <button
              key={l.label}
              className="flex items-center gap-0.5 px-3 py-1.5 text-sm font-medium rounded transition-colors"
              style={{
                color: l.active ? '#1a2e00' : '#64748b',
                borderBottom: l.active ? '2px solid #84cc16' : '2px solid transparent',
                background: l.active ? '#f0fdf4' : 'transparent',
              }}
            >
              {l.label}
              {l.dropdown && <ChevronDown style={{ width: 12, height: 12 }} />}
            </button>
          ))}
        </nav>
        {/* Wallet */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a' }}>
            <span style={{ fontSize: 14 }}>🪙</span>
            <span className="font-semibold text-xs">12,345 USDC</span>
            <div className="h-4 w-4 rounded-full" style={{ background: '#84cc16' }} />
          </div>
          <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b' }}>
            <span style={{ fontSize: 12 }}>🔗</span>
            <span className="font-mono">0x8a...7f3c</span>
          </div>
        </div>
      </div>
    </header>
  )
}

// ── Portfolio Overview (left panel) ──────────────────────────────────────────

function PortfolioOverview() {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
      <p className="text-sm font-semibold" style={{ color: '#1e293b' }}>Portfolio Overview</p>

      {/* Total Value */}
      <div className="pb-3" style={{ borderBottom: '1px solid #e2e8f0' }}>
        <p className="text-[11px] font-medium mb-1" style={{ color: '#64748b' }}>Total Value</p>
        <p className="text-2xl font-black tabular-nums leading-tight break-all" style={{ color: '#0f172a' }}>$104,582.32</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs font-semibold" style={{ color: '#16a34a' }}>+$142.35</span>
          <span className="text-xs" style={{ color: '#16a34a' }}>(0.06%) 24h</span>
        </div>
      </div>

      {/* Stats list */}
      <div className="flex flex-col gap-2.5">

        {/* Total Earnings */}
        <div className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5" style={{ background: '#f8fafc' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs" style={{ color: '#64748b' }}>
              <span>Total Earnings</span>
              <Info style={{ width: 10, height: 10 }} />
            </div>
          </div>
          <p className="text-base font-black tabular-nums" style={{ color: '#16a34a' }}>$7,541.23</p>
          <p className="text-[11px] font-semibold" style={{ color: '#16a34a' }}>+11.80% all time</p>
        </div>

        {/* Cost Basis */}
        <div className="flex items-center justify-between rounded-lg px-3 py-2.5" style={{ background: '#f8fafc' }}>
          <span className="text-xs" style={{ color: '#64748b' }}>Cost Basis</span>
          <span className="text-sm font-bold tabular-nums" style={{ color: '#0f172a' }}>$200,000</span>
        </div>

        {/* Portfolio APY */}
        <div className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <span className="text-xs" style={{ color: '#64748b' }}>Portfolio APY</span>
          <p className="text-base font-black tabular-nums" style={{ color: '#15803d' }}>13.2%</p>
          <p className="text-[11px]" style={{ color: '#16a34a' }}>Weighted avg</p>
        </div>

        {/* Points */}
        <div className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5" style={{ background: '#f8fafc' }}>
          <span className="text-xs" style={{ color: '#64748b' }}>Points</span>
          <p className="text-base font-black tabular-nums" style={{ color: '#0f172a' }}>284</p>
          <p className="text-[11px] font-semibold" style={{ color: '#84cc16' }}>+12 today ↗</p>
        </div>

        {/* Active Investments */}
        <div className="flex items-center justify-between rounded-lg px-3 py-2.5" style={{ background: '#f8fafc' }}>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 13 }}>💼</span>
            <span className="text-xs" style={{ color: '#475569' }}>Active Positions</span>
          </div>
          <span className="text-sm font-bold" style={{ color: '#0f172a' }}>6</span>
        </div>

        {/* Available Balance */}
        <div className="flex items-center justify-between rounded-lg px-3 py-2.5" style={{ background: '#f8fafc' }}>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 13 }}>💰</span>
            <span className="text-xs" style={{ color: '#475569' }}>Available Balance</span>
          </div>
          <span className="text-xs font-semibold tabular-nums" style={{ color: '#0f172a' }}>$12,345.00</span>
        </div>

      </div>
    </div>
  )
}

// ── Notifications panel (Pending Withdrawals + Reward) ───────────────────────

function NotificationsPanel() {
  return (
    <div className="flex flex-col gap-3">
      {/* Pending Withdrawals */}
      <div className="rounded-2xl p-5" style={{ border: '2px dashed #eab308', background: '#fffdf0' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold" style={{ color: '#1e293b' }}>Pending Withdrawals</p>
            <Info style={{ width: 14, height: 14, color: '#94a3b8' }} />
          </div>
          <button className="text-sm font-medium" style={{ color: '#ca8a04' }}>View all (2)</button>
        </div>
        <div className="flex flex-col gap-3">
          {PENDING.map(w => (
            <div key={w.id} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
              <TokenIcon token={w.token} color={w.color} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{w.amount} {w.token}</p>
                <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>
                  from <span className="font-medium" style={{ color: '#475569' }}>{w.vault}</span>
                  {' · '}Initiated {w.date} · {w.time}
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md shrink-0" style={{ background: '#fef3c7', color: '#b45309' }}>Processing</span>
              <div className="text-right shrink-0 ml-2">
                <p className="text-[10px] font-medium uppercase tracking-wide" style={{ color: '#94a3b8' }}>ETA</p>
                <p className="text-sm font-bold" style={{ color: '#ca8a04' }}>{w.eta}</p>
              </div>
              <ChevronRight style={{ width: 16, height: 16, color: '#94a3b8' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Reward available to claim */}
      <div className="flex items-center gap-4 rounded-2xl px-5 py-4"
        style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: '#dcfce7', border: '1px solid #86efac' }}>
          <span style={{ fontSize: 18 }}>🎁</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold" style={{ color: '#14532d' }}>Reward available to claim</p>
          <p className="text-xs mt-0.5" style={{ color: '#16a34a' }}>$174.50 USDC in yield bonuses ready</p>
        </div>
        <Link to="/rewards?tab=history"
          className="shrink-0 flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3 py-1.5 transition-colors"
          style={{ background: '#16a34a', color: '#fff' }}>
          Claim now
          <ChevronRight style={{ width: 14, height: 14 }} />
        </Link>
      </div>
    </div>
  )
}

// ── Positions Table (from Portfolio) ─────────────────────────────────────────

const TOKEN_COLORS: Record<string, { bg: string; text: string }> = {
  USDC:   { bg: '#2775CA22', text: '#2775CA' },
  haUSDC: { bg: '#64748b22', text: '#64748b' },
  ETH:    { bg: '#627EEA22', text: '#627EEA' },
  WETH:   { bg: '#818cf822', text: '#818cf8' },
  USDT:   { bg: '#26A17B22', text: '#26A17B' },
}

function TokenBadge({ token }: { token: string }) {
  const c = TOKEN_COLORS[token] ?? { bg: '#f1f5f9', text: '#64748b' }
  return (
    <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide"
      style={{ background: c.bg, color: c.text }}>{token}</span>
  )
}


function PositionsTable({ positions, onWithdraw }: { positions: PortfolioPosition[]; onWithdraw: (id: string) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-base font-semibold" style={{ color: '#1e293b' }}>Positions ({positions.length})</p>
        <Link to="/portfolio" className="text-sm font-medium" style={{ color: '#3b82f6' }}>View in Portfolio →</Link>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #e2e8f0', background: '#fff' }}>
        <div className="grid text-[11px] font-semibold uppercase tracking-wide px-5 py-2.5"
          style={{ gridTemplateColumns: '2.5fr 1.5fr 2fr 2fr 1fr 1.5fr', color: '#94a3b8', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <span>Vault</span><span>Assets</span><span>Value</span><span>Earnings</span><span>APY</span><span className="text-right">Actions</span>
        </div>
        {positions.map((p, i) => (
          <motion.div key={p.vaultId}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: i * 0.04 }}
            className="grid items-center px-5 py-3 transition-colors hover:bg-slate-50"
            style={{ gridTemplateColumns: '2.5fr 1.5fr 2fr 2fr 1fr 1.5fr', borderBottom: i < positions.length - 1 ? '1px solid #f1f5f9' : 'none' }}
          >
            {/* Vault */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-black"
                style={{ background: '#c8f73122', color: '#4d6b00', border: '1px solid #c8f73155' }}>
                {p.asset.slice(0, 1)}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>{p.vaultName}</p>
                <p className="text-[11px]" style={{ color: '#94a3b8' }}>{p.sharePercent}% of portfolio</p>
              </div>
            </div>

            {/* Assets */}
            <div className="flex flex-wrap gap-1">{p.tokens.map(t => <TokenBadge key={t} token={t} />)}</div>

            {/* Value */}
            <div>
              <p className="text-sm font-bold tabular-nums" style={{ color: '#0f172a' }}>{p.valueFormatted}</p>
              <p className="text-[11px] tabular-nums mt-0.5" style={{ color: '#94a3b8' }}>{p.depositedFormatted} in</p>
            </div>

            {/* Earnings */}
            <div>
              <p className="text-sm font-bold tabular-nums" style={{ color: '#16a34a' }}>+{p.earnedFormatted}</p>
              <p className="text-[11px] font-semibold mt-0.5" style={{ color: '#16a34a' }}>+{p.pnlPercent.toFixed(2)}%</p>
            </div>

            {/* APY */}
            <div className="flex items-center gap-1">
              <TrendingUp style={{ width: 12, height: 12, color: '#4d6b00' }} />
              <span className="text-sm font-bold tabular-nums" style={{ color: '#0f172a' }}>{p.currentApy.toFixed(1)}%</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-1.5">
              <button
                onClick={() => onWithdraw(p.vaultId)}
                className="text-xs font-semibold rounded-lg px-2.5 py-1.5 transition-colors hover:opacity-90"
                style={{ background: '#1a2e00', color: '#c8f731' }}
              >
                Withdraw
              </button>
              <Link to={`/earn/${p.vaultId}`}
                className="text-xs font-medium rounded-lg px-2.5 py-1.5 transition-colors"
                style={{ background: '#f1f5f9', color: '#475569' }}>
                Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Performance Chart ─────────────────────────────────────────────────────────

function PerformanceChart() {
  const [tab, setTab] = React.useState<TimeTab>('ALL')
  const tabs: TimeTab[] = ['1D', '7D', '30D', '90D', 'ALL']
  const chartData = CHART_DATA[tab]
  const last = chartData[chartData.length - 1]
  const pnl = last.portfolioValue - last.netDeposited
  const pnlPct = ((pnl / last.netDeposited) * 100).toFixed(2)

  return (
    <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="text-sm font-semibold" style={{ color: '#1e293b' }}>Portfolio Performance</span>
        <div className="flex items-center gap-1">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
              style={{ background: tab === t ? '#c8f731' : '#f8fafc', color: tab === t ? '#1a2e00' : '#64748b', border: tab === t ? 'none' : '1px solid #e2e8f0' }}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div style={{ height: 150 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="p2grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c8f731" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#c8f731" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
              tickFormatter={(v: number) => `$${Math.round(v / 1000)}K`} domain={[195_000, 230_000]} width={44} />
            <ReTooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const pv = (payload.find(p => p.dataKey === 'portfolioValue')?.value as number) ?? 0
                const nd = (payload.find(p => p.dataKey === 'netDeposited')?.value as number) ?? 0
                const g = pv - nd
                return (
                  <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '8px 12px', fontSize: 12, boxShadow: '0 4px 12px #0001' }}>
                    <div style={{ color: '#64748b' }}>Portfolio <b style={{ color: '#0f172a' }}>${pv.toLocaleString()}</b></div>
                    <div style={{ color: '#64748b' }}>Cost Basis <b style={{ color: '#0f172a' }}>${nd.toLocaleString()}</b></div>
                    <div style={{ color: '#16a34a', fontWeight: 600 }}>PnL +${g.toLocaleString()}</div>
                  </div>
                )
              }}
            />
            <Area type="monotone" dataKey="portfolioValue" stroke="#84cc16" strokeWidth={2} fill="url(#p2grad)" dot={false} />
            <Area type="monotone" dataKey="netDeposited" stroke="#cbd5e1" strokeWidth={1.5} fill="transparent" strokeDasharray="4 2" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-5 mt-3 text-xs flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full inline-block" style={{ background: '#84cc16' }} />
          <span style={{ color: '#64748b' }}>Portfolio</span>
          <span className="font-semibold" style={{ color: '#0f172a' }}>${last.portfolioValue.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full inline-block" style={{ background: '#cbd5e1' }} />
          <span style={{ color: '#64748b' }}>Cost Basis</span>
          <span className="font-semibold" style={{ color: '#0f172a' }}>${last.netDeposited.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full inline-block" style={{ background: '#16a34a' }} />
          <span style={{ color: '#64748b' }}>PnL</span>
          <span className="font-semibold" style={{ color: '#16a34a' }}>+${pnl.toLocaleString()} (+{pnlPct}%)</span>
        </div>
      </div>
    </div>
  )
}

// ── Earnings Breakdown ────────────────────────────────────────────────────────

function EarningsBreakdown() {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-3 h-full" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold" style={{ color: '#1e293b' }}>Earnings breakdown</p>
        <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b' }}>All time</span>
      </div>
      <div>
        <p className="text-2xl font-black tabular-nums" style={{ color: '#16a34a' }}>+$23,450</p>
        <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>Total earnings</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          <PieChart width={80} height={80}>
            <Pie data={EARNINGS_SLICES} cx={35} cy={35} innerRadius={22} outerRadius={35} paddingAngle={2} dataKey="value" strokeWidth={0}>
              {EARNINGS_SLICES.map((s, i) => <Cell key={i} fill={s.color} style={{ outline: 'none' }} />)}
            </Pie>
          </PieChart>
        </div>
        <ul className="flex-1 space-y-1.5">
          {EARNINGS_SLICES.map(s => (
            <li key={s.name} className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ background: s.color }} />
                <span className="truncate" style={{ color: '#64748b' }}>{s.name}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="font-semibold" style={{ color: '#0f172a' }}>+${s.value.toLocaleString()}</span>
                <span style={{ color: '#94a3b8' }} className="ml-1">({s.pct}%)</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-2" style={{ borderTop: '1px solid #f1f5f9' }}>
        <Link to="/portfolio/analytics" className="text-xs font-medium" style={{ color: '#3b82f6' }}>
          View full analytics →
        </Link>
      </div>
    </div>
  )
}

// ── Recent Activity ───────────────────────────────────────────────────────────

const ACTIVITY_STYLE: Record<string, { bg: string; color: string }> = {
  deposit:  { bg: '#dcfce7', color: '#16a34a' },
  withdraw: { bg: '#fee2e2', color: '#dc2626' },
  complete: { bg: '#eff6ff', color: '#2563eb' },
}
const AMOUNT_COLOR: Record<string, string> = {
  deposit: '#16a34a', withdraw: '#dc2626', complete: '#16a34a',
}

function RecentActivity() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-base font-semibold" style={{ color: '#1e293b' }}>Recent Activity</p>
        <Link to="/portfolio/analytics" className="text-sm font-medium" style={{ color: '#3b82f6' }}>View all →</Link>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #e2e8f0', background: '#fff' }}>
        <div className="grid text-[11px] font-semibold uppercase tracking-wide px-5 py-2.5"
          style={{ gridTemplateColumns: '40px 1fr 2fr 1fr 80px 140px', color: '#94a3b8', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <span></span><span>Action</span><span>Vault</span><span>Amount</span><span>Unit</span><span className="text-right">Time</span>
        </div>
        {ACTIVITY.map((item, i) => {
          const s = ACTIVITY_STYLE[item.type] ?? { bg: '#f8fafc', color: '#64748b' }
          return (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: i * 0.03 }}
              className="grid items-center px-5 py-3 hover:bg-slate-50 transition-colors"
              style={{ gridTemplateColumns: '40px 1fr 2fr 1fr 80px 140px', borderBottom: i < ACTIVITY.length - 1 ? '1px solid #f1f5f9' : 'none' }}
            >
              <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                {item.type === 'deposit'  && <ArrowDownRight style={{ width: 14, height: 14, color: s.color }} />}
                {item.type === 'withdraw' && <ArrowUpRight   style={{ width: 14, height: 14, color: s.color }} />}
                {item.type === 'complete' && <TrendingUp     style={{ width: 14, height: 14, color: s.color }} />}
              </div>
              <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>{item.action}</p>
              <p className="text-sm" style={{ color: '#64748b' }}>{item.vault}</p>
              <p className="text-sm font-bold tabular-nums" style={{ color: AMOUNT_COLOR[item.type] }}>{item.amount}</p>
              <TokenBadge token={item.unit} />
              <p className="text-xs tabular-nums text-right" style={{ color: '#94a3b8' }}>{item.timestamp}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ── Bottom Bar ────────────────────────────────────────────────────────────────

function BottomBar() {
  return (
    <div className="flex items-center justify-between px-6 py-3.5" style={{ background: '#fff', borderTop: '1px solid #e2e8f0' }}>
      <p className="text-sm" style={{ color: '#64748b' }}>
        Can't find your transaction?{' '}
        <button className="underline underline-offset-2" style={{ color: '#3b82f6' }}>Check your transaction history</button>
      </p>
      <button className="px-5 py-2 rounded-lg text-sm font-bold transition-opacity hover:opacity-90" style={{ background: '#1a2e00', color: '#c8f731' }}>
        Withdraw Funds
      </button>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function Portfolio2Page() {
  const { portfolio } = usePortfolio()
  const [withdrawVaultId, setWithdrawVaultId] = useState<string | null>(null)
  const withdrawPosition = portfolio?.positions.find(p => p.vaultId === withdrawVaultId) ?? null

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <H2Navbar />

      <div className="flex-1 mx-auto w-full max-w-7xl px-6 py-6">
        <div className="mb-5">
          <h1 className="text-2xl font-black" style={{ color: '#0f172a' }}>My Portfolio</h1>
          <p className="text-sm mt-0.5" style={{ color: '#64748b' }}>Track your positions, earnings, and portfolio performance</p>
        </div>

        <div className="flex gap-5 items-start">
          <div className="w-56 shrink-0 sticky top-[80px] self-start">
            <PortfolioOverview />
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-5">
            <NotificationsPanel />

            {portfolio && portfolio.positions.length > 0 && (
              <PositionsTable positions={portfolio.positions} onWithdraw={setWithdrawVaultId} />
            )}

            <div>
              <p className="text-base font-semibold mb-3" style={{ color: '#1e293b' }}>Performance &amp; Allocation</p>
              <div className="flex gap-5 items-start flex-col lg:flex-row">
                <div className="flex-[3] min-w-0 w-full">
                  <PerformanceChart />
                </div>
                <div className="flex-[2] min-w-0 w-full">
                  <EarningsBreakdown />
                </div>
              </div>
            </div>

            <RecentActivity />
          </div>

        </div>
      </div>

      <BottomBar />

      {withdrawPosition && (
        <WithdrawModal
          open={!!withdrawVaultId}
          onClose={() => setWithdrawVaultId(null)}
          vaultName={withdrawPosition.vaultName}
          vaultId={withdrawPosition.vaultId}
          asset={withdrawPosition.asset}
          positionValue={withdrawPosition.value}
        />
      )}
    </div>
  )
}
