import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart2, ArrowUpRight, ArrowDownRight, TrendingUp,
  Plus, Wallet, Layers, Zap, Star, Bell, Gift, ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell } from 'recharts'
import { Button, ErrorState } from '@/shared/ui'
import { PortfolioChart } from '../components/PortfolioChart'
import { DepositModal } from '@/features/vault/components/DepositModal'
import { WithdrawModal } from '@/features/vault/components/WithdrawModal'
import { usePortfolio } from '../hooks/usePortfolio'
import { cn } from '@/shared/lib/utils'
import type { PortfolioPosition } from '../components/PositionCard'

// ─── CommandBar ───────────────────────────────────────────────────────────────

interface CommandBarProps {
  totalValueFormatted: string
  netDepositedFormatted: string
  totalEarnedFormatted: string
  portfolioApy: number
  pnlPercent: number
  earnings24hFormatted: string
  earnings24hPercent: number
  totalPoints: number
  pointsToday: number
}

function CommandBar({ totalValueFormatted, netDepositedFormatted, totalEarnedFormatted, portfolioApy, pnlPercent, earnings24hFormatted, earnings24hPercent, totalPoints, pointsToday }: CommandBarProps) {
  const isPnlPositive = pnlPercent >= 0
  const PnlIcon = isPnlPositive ? ArrowUpRight : ArrowDownRight

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 sm:p-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-0">

        {/* Left — Total Value */}
        <div className="sm:pr-6 sm:min-w-[180px]">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Total Value</p>
          <p className="text-3xl font-black text-foreground tabular-nums leading-none">{totalValueFormatted}</p>
          <div className="flex items-center gap-1 mt-1.5 text-xs font-semibold text-success">
            <ArrowUpRight className="h-3 w-3" aria-hidden />
            {earnings24hFormatted} ({earnings24hPercent.toFixed(2)}%) 24h
          </div>
        </div>

        {/* Separator */}
        <div className="hidden sm:block self-stretch w-px bg-border/50 mx-2 shrink-0" aria-hidden />
        <div className="block sm:hidden h-px bg-border/50" aria-hidden />

        {/* Right — 4 stats spread evenly */}
        <div className="flex-1 grid grid-cols-2 gap-5 sm:grid-cols-4 sm:pl-6">

          {/* Cost Basis */}
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Cost Basis</p>
            <p className="text-xl font-black text-foreground tabular-nums">{netDepositedFormatted}</p>
          </div>

          {/* Total Earnings (PnL) */}
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Unrealized PnL</p>
            <div className="flex items-baseline gap-2 flex-wrap">
              <p className="text-xl font-black text-success tabular-nums">{totalEarnedFormatted}</p>
              <span className={cn('flex items-center gap-0.5 text-xs font-semibold', isPnlPositive ? 'text-success' : 'text-destructive')}>
                <PnlIcon className="h-3 w-3" aria-hidden />
                {isPnlPositive ? '+' : ''}{pnlPercent.toFixed(2)}% all time
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Since first deposit</p>
          </div>

          {/* Portfolio APY */}
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Portfolio APY</p>
            <p className="text-xl font-black text-primary tabular-nums">{portfolioApy.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-1">Weighted avg</p>
          </div>

          {/* Points — clickable → /rewards */}
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Points</p>
            <Link to="/rewards" className="group block" aria-label="View rewards">
              <p className="text-xl font-black text-foreground tabular-nums group-hover:text-primary transition-colors">
                {totalPoints.toLocaleString()}
              </p>
              <p className="text-xs text-primary mt-1 font-medium">+{pointsToday} today ↗</p>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── NextActionBanner ─────────────────────────────────────────────────────────

interface NextActionBannerProps {
  positions: PortfolioPosition[]
  totalValue: number
  onDeposit: (vaultId: string) => void
}

function NextActionBanner({ positions, totalValue, onDeposit }: NextActionBannerProps) {
  const highApyVault = [...positions].sort((a, b) => b.currentApy - a.currentApy)[0]
  const lowAlloc = positions.find(p => p.sharePercent < 20 && p.currentApy > 10)
  const isSmallPortfolio = totalValue < 10000

  let icon = <Zap className="h-4 w-4 text-primary shrink-0" aria-hidden />
  let headline = 'Earn 2× points this week'
  let body = `Add $500+ to ${highApyVault?.vaultName ?? 'a vault'} before Jun 30`
  let ctaLabel = 'Add Funds'
  let targetVaultId = highApyVault?.vaultId ?? ''

  if (isSmallPortfolio) {
    headline = 'Boost your yield'
    body = `Your portfolio earns more as it grows. Add $${(10000 - totalValue).toLocaleString()} to reach the $10k milestone.`
    ctaLabel = 'Deposit More'
    targetVaultId = highApyVault?.vaultId ?? ''
  } else if (lowAlloc) {
    headline = 'Rebalance opportunity'
    body = `${lowAlloc.vaultName} is your lowest allocation (${lowAlloc.sharePercent}%) but earns ${lowAlloc.currentApy}% APY.`
    ctaLabel = 'Add to Position'
    targetVaultId = lowAlloc.vaultId
    icon = <Star className="h-4 w-4 text-warning shrink-0" aria-hidden />
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3.5">
      <div className="flex items-start gap-3 min-w-0">
        {icon}
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground">{headline}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{body}</p>
        </div>
      </div>
      <Button size="sm" className="shrink-0 h-8 px-3 text-xs gap-1.5" onClick={() => onDeposit(targetVaultId)}>
        {ctaLabel}
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </Button>
    </div>
  )
}

// ─── EarningsBreakdown ────────────────────────────────────────────────────────

const EARNINGS_SLICES = [
  { name: 'Delta Neutral USDC', value: 12_274, pct: 52.3 },
  { name: 'ETH Yield Max',      value: 7_176,  pct: 30.6 },
  { name: 'Stable Plus',        value: 4_000,  pct: 17.1 },
]
const DONUT_COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))']

function EarningsBreakdown() {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">PnL Breakdown</p>
        <span className="text-xs text-muted-foreground border border-border rounded-md px-2 py-0.5">All time</span>
      </div>

      <div>
        <p className="text-2xl font-black text-success tabular-nums">+$23,450</p>
        <p className="text-xs text-muted-foreground">Total earnings</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="shrink-0">
          <PieChart width={80} height={80} aria-label="Earnings by vault">
            <Pie
              data={EARNINGS_SLICES}
              cx={35} cy={35}
              innerRadius={22} outerRadius={35}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {EARNINGS_SLICES.map((_, i) => (
                <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} style={{ outline: 'none' }} />
              ))}
            </Pie>
          </PieChart>
        </div>

        <ul className="flex-1 space-y-1.5" aria-label="Earnings by vault legend">
          {EARNINGS_SLICES.map((s, i) => (
            <li key={s.name} className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} aria-hidden />
                <span className="text-muted-foreground truncate">{s.name}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="font-semibold text-foreground">+${s.value.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">({s.pct}%)</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2 border-t border-border/40">
        <Link to="/portfolio/analytics" className="text-xs font-medium text-primary hover:underline underline-offset-2">
          View full analytics →
        </Link>
      </div>
    </div>
  )
}

// ─── Recent Activity ──────────────────────────────────────────────────────────

const PORTFOLIO_ACTIVITY = [
  { id: 'p1', type: 'deposit',  action: 'Deposit',         vault: 'Delta Neutral USDC', amount: '+5,000',  unit: 'USDC', timestamp: '2026-06-26 10:32' },
  { id: 'p2', type: 'withdraw', action: 'Withdrawal',      vault: 'ETH Yield Max',      amount: '-1.2',    unit: 'ETH',  timestamp: '2026-06-26 08:14' },
  { id: 'p3', type: 'complete', action: 'Auto Redeem',     vault: 'Stable Plus',        amount: '+2,400',  unit: 'USDC', timestamp: '2026-06-25 22:05' },
  { id: 'p4', type: 'deposit',  action: 'Deposit',         vault: 'ETH Yield Max',      amount: '+1.2',    unit: 'ETH',  timestamp: '2026-06-24 14:20' },
  { id: 'p5', type: 'complete', action: 'Auto Redeem',     vault: 'Delta Neutral USDC', amount: '+12,500', unit: 'USDC', timestamp: '2026-06-23 09:48' },
  { id: 'p6', type: 'withdraw', action: 'Withdrawal',      vault: 'Stable Plus',        amount: '-800',    unit: 'USDC', timestamp: '2026-06-21 17:33' },
]

const ACTION_ICON_STYLE: Record<string, { bg: string; color: string }> = {
  deposit:  { bg: 'bg-success/10',     color: 'text-success' },
  withdraw: { bg: 'bg-destructive/10', color: 'text-destructive' },
  complete: { bg: 'bg-primary/10',     color: 'text-primary' },
}

const AMOUNT_COLOR: Record<string, string> = {
  deposit:  'text-success',
  withdraw: 'text-destructive',
  complete: 'text-success',
}

function ActivityActionIcon({ type }: { type: string }) {
  const style = ACTION_ICON_STYLE[type] ?? { bg: 'bg-muted', color: 'text-muted-foreground' }
  return (
    <div className={cn('h-8 w-8 rounded-lg flex items-center justify-center shrink-0', style.bg)}>
      {type === 'deposit'  && <ArrowDownRight className={cn('h-4 w-4', style.color)} aria-hidden />}
      {type === 'withdraw' && <ArrowUpRight   className={cn('h-4 w-4', style.color)} aria-hidden />}
      {type === 'complete' && <TrendingUp     className={cn('h-4 w-4', style.color)} aria-hidden />}
    </div>
  )
}

function RecentActivity() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Recent Activity</h2>
        <Link to="/portfolio/analytics" className="text-xs font-medium text-primary hover:underline underline-offset-2">
          View all →
        </Link>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full" role="table" aria-label="Recent activity">
          <thead>
            <tr className="border-b border-border/40 bg-muted/20">
              {['', 'Action', 'Vault', 'Amount', 'Unit', 'Timestamp'].map((h, i) => (
                <th
                  key={h || `col-${i}`}
                  className={cn(
                    'py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider',
                    i === 0 ? 'pl-5 pr-2 w-12' : i === 5 ? 'pr-5 pl-3 text-right' : 'px-3 text-left',
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PORTFOLIO_ACTIVITY.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut', delay: index * 0.03 }}
                className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors"
              >
                <td className="py-3 pl-5 pr-2">
                  <ActivityActionIcon type={item.type} />
                </td>
                <td className="py-3 px-3">
                  <p className="text-sm font-semibold text-foreground">{item.action}</p>
                </td>
                <td className="py-3 px-3">
                  <p className="text-sm text-muted-foreground">{item.vault}</p>
                </td>
                <td className="py-3 px-3">
                  <p className={cn('text-sm font-bold tabular-nums', AMOUNT_COLOR[item.type])}>
                    {item.amount}
                  </p>
                </td>
                <td className="py-3 px-3">
                  <TokenBadge token={item.unit} />
                </td>
                <td className="py-3 pl-3 pr-5 text-right">
                  <p className="text-xs text-muted-foreground tabular-nums">{item.timestamp}</p>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <ul className="sm:hidden divide-y divide-border/30" aria-label="Recent activity">
        {PORTFOLIO_ACTIVITY.map(item => (
          <li key={item.id} className="flex items-center gap-3 px-4 py-3.5">
            <ActivityActionIcon type={item.type} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{item.action}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{item.vault}</p>
            </div>
            <div className="text-right shrink-0">
              <p className={cn('text-sm font-bold tabular-nums', AMOUNT_COLOR[item.type])}>
                {item.amount} <span className="font-normal text-xs">{item.unit}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function PortfolioSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="h-7 w-28 rounded-lg bg-muted animate-pulse" />
          <div className="h-4 w-44 rounded bg-muted animate-pulse" />
        </div>
        <div className="h-8 w-24 rounded-lg bg-muted animate-pulse" />
      </div>
      <div className="h-32 rounded-2xl bg-muted animate-pulse" />
      <div className="h-12 rounded-xl bg-muted animate-pulse" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-28 rounded-xl bg-muted animate-pulse" />
        <div className="h-28 rounded-xl bg-muted animate-pulse" />
      </div>
      <div className="space-y-2">
        {[0, 1, 2].map(i => <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />)}
      </div>
    </div>
  )
}

// ─── Position row (desktop table) ────────────────────────────────────────────

const TOKEN_COLORS: Record<string, { bg: string; text: string }> = {
  USDC:   { bg: 'bg-blue-500/15',    text: 'text-blue-400' },
  haUSDC: { bg: 'bg-slate-500/15',   text: 'text-slate-400' },
  ETH:    { bg: 'bg-violet-500/15',  text: 'text-violet-400' },
  WETH:   { bg: 'bg-violet-400/15',  text: 'text-violet-300' },
  USDT:   { bg: 'bg-emerald-500/15', text: 'text-emerald-400' },
}

function TokenBadge({ token }: { token: string }) {
  const colors = TOKEN_COLORS[token] ?? { bg: 'bg-muted', text: 'text-muted-foreground' }
  return (
    <span className={cn('inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wide', colors.bg, colors.text)}>
      {token}
    </span>
  )
}

interface PositionRowProps {
  position: PortfolioPosition
  onDeposit?: (id: string) => void
  onWithdraw?: (id: string) => void
  index: number
}

function PositionRow({ position, onDeposit, onWithdraw, index }: PositionRowProps) {
  const isPositive = position.pnlPercent >= 0

  return (
    <motion.tr
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: 'easeOut', delay: index * 0.04 }}
      className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors"
    >
      <td className="py-3.5 pl-5 pr-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-black text-primary ring-1 ring-primary/20">
            {position.asset.slice(0, 1)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">{position.vaultName}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{position.sharePercent}% of portfolio</p>
          </div>
        </div>
      </td>
      <td className="py-3.5 px-3">
        <div className="flex flex-wrap gap-1">
          {position.tokens.map(t => <TokenBadge key={t} token={t} />)}
        </div>
      </td>
      <td className="py-3.5 px-3 text-right">
        <p className="text-sm font-bold text-foreground tabular-nums">{position.valueFormatted}</p>
        <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">{position.depositedFormatted} in</p>
      </td>
      <td className="py-3.5 px-3 text-right">
        <p className={cn('text-sm font-bold tabular-nums', isPositive ? 'text-success' : 'text-destructive')}>
          {isPositive ? '+' : ''}{position.earnedFormatted}
        </p>
        <p className={cn('text-xs tabular-nums mt-0.5', isPositive ? 'text-success/70' : 'text-destructive/70')}>
          {isPositive ? '+' : ''}{position.pnlPercent.toFixed(2)}%
        </p>
      </td>
      <td className="py-3.5 px-3 text-right hidden md:table-cell">
        <p className="text-sm font-bold text-primary tabular-nums flex items-center justify-end gap-1">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden />
          {position.currentApy.toFixed(1)}%
        </p>
      </td>
      <td className="py-3.5 pl-3 pr-5">
        <div className="flex items-center justify-end gap-1.5">
          {onDeposit && (
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0"
              onClick={() => onDeposit(position.vaultId)}
              aria-label={`Add to ${position.vaultName}`}>
              <Plus className="h-3.5 w-3.5" aria-hidden />
            </Button>
          )}
          {onWithdraw && (
            <Button variant="secondary" size="sm" className="h-7 px-2.5 text-xs"
              onClick={() => onWithdraw(position.vaultId)}>
              Withdraw
            </Button>
          )}
          <Button variant="ghost" size="sm" className="h-7 px-2.5 text-xs" asChild>
            <Link to={`/earn/${position.vaultId}`}>Details</Link>
          </Button>
        </div>
      </td>
    </motion.tr>
  )
}

// ─── Mobile position card ──────────────────────────────────────────────────

function MobilePositionCard({ position, onDeposit, onWithdraw }: Omit<PositionRowProps, 'index'>) {
  const isPositive = position.pnlPercent >= 0

  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-black text-primary ring-1 ring-primary/20">
            {position.asset.slice(0, 1)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">{position.vaultName}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{position.sharePercent}% of portfolio</p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {position.tokens.map(t => <TokenBadge key={t} token={t} />)}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-base font-black text-foreground tabular-nums">{position.valueFormatted}</p>
          <p className={cn('text-xs font-semibold tabular-nums', isPositive ? 'text-success' : 'text-destructive')}>
            {isPositive ? '+' : ''}{position.earnedFormatted} ({isPositive ? '+' : ''}{position.pnlPercent.toFixed(2)}%)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-border/40 pt-2.5 text-xs">
        <div>
          <p className="text-muted-foreground">APY</p>
          <p className="font-bold text-primary">{position.currentApy.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-muted-foreground">Deposited</p>
          <p className="font-medium text-foreground">{position.depositedFormatted}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {onDeposit && (
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" onClick={() => onDeposit(position.vaultId)}>
            <Plus className="h-3.5 w-3.5" aria-hidden />
            Add
          </Button>
        )}
        {onWithdraw && (
          <Button variant="secondary" size="sm" className="h-8 flex-1 text-xs" onClick={() => onWithdraw(position.vaultId)}>
            Withdraw
          </Button>
        )}
        <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
          <Link to={`/earn/${position.vaultId}`}>Details</Link>
        </Button>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function PortfolioPage() {
  const { portfolio, isLoading, error, refetch } = usePortfolio()
  const [depositVaultId, setDepositVaultId] = useState<string | null>(null)
  const [withdrawVaultId, setWithdrawVaultId] = useState<string | null>(null)
  const [showChartAlloc, setShowChartAlloc] = useState(true)

  const depositPosition = portfolio?.positions.find(p => p.vaultId === depositVaultId) ?? null
  const withdrawPosition = portfolio?.positions.find(p => p.vaultId === withdrawVaultId) ?? null

  if (isLoading) return <PortfolioSkeleton />

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <ErrorState message="Could not load your portfolio." onRetry={() => refetch()} />
      </div>
    )
  }

  if (!portfolio || portfolio.positions.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center space-y-4 max-w-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <Wallet className="h-7 w-7 text-muted-foreground" aria-hidden />
            </div>
            <div>
              <p className="font-bold text-foreground">No positions yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Deposit into a vault to start earning yield and points automatically.
              </p>
            </div>
            <Button asChild>
              <Link to="/earn">
                <Layers className="h-4 w-4" aria-hidden />
                Explore Vaults
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <PageHeader />
        <Button variant="ghost" size="sm" asChild>
          <Link to="/portfolio/analytics" className="flex items-center gap-1.5">
            <BarChart2 className="h-4 w-4" aria-hidden />
            Analytics
          </Link>
        </Button>
      </div>

      {/* 1. Command bar */}
      <CommandBar
        totalValueFormatted={portfolio.totalValueFormatted}
        netDepositedFormatted={portfolio.netDepositedFormatted}
        totalEarnedFormatted={portfolio.totalEarnedFormatted}
        portfolioApy={portfolio.portfolioApy}
        pnlPercent={portfolio.pnlPercent}
        earnings24hFormatted={portfolio.earnings24hFormatted}
        earnings24hPercent={portfolio.earnings24hPercent}
        totalPoints={portfolio.totalPoints}
        pointsToday={portfolio.pointsToday}
      />

      {/* 2. Next recommended action */}
      <NextActionBanner
        positions={portfolio.positions}
        totalValue={portfolio.totalValue}
        onDeposit={setDepositVaultId}
      />

      {/* 3. Attention notifications */}
      <div className="space-y-2">
        {/* Withdrawal in progress */}
        <div className="flex items-center gap-4 rounded-2xl border border-warning/20 bg-warning/5 px-5 py-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Bell className="h-5 w-5 text-primary" aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">Withdrawal in progress</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">$12,500.00</span>
              <span>·</span>
              <span>From haUSDC Core</span>
              <span>·</span>
              <span>Est. completion Jun 28, 2026 — 14:30 UTC</span>
            </div>
          </div>
          <Link
            to="/portfolio"
            className="shrink-0 text-sm font-semibold text-foreground hover:text-primary flex items-center gap-1 whitespace-nowrap border border-border rounded-lg px-3 py-1.5 hover:bg-accent transition-colors"
          >
            View details <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        {/* Reward available */}
        <div
          className="flex items-center gap-4 rounded-2xl border border-warning/20 bg-warning/5 px-5 py-4"
          role="alert"
          aria-label="Reward available to claim"
        >
          <div className="h-10 w-10 rounded-full bg-success/10 border border-success/20 flex items-center justify-center shrink-0">
            <Gift className="h-5 w-5 text-success" aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground leading-tight">Reward available to claim</p>
            <p className="text-xs text-muted-foreground mt-0.5">$174.50 USDC in yield bonuses ready</p>
          </div>
          <Link
            to="/rewards?tab=history"
            className="shrink-0 text-sm font-semibold text-foreground hover:text-success flex items-center gap-1 whitespace-nowrap border border-border rounded-lg px-3 py-1.5 hover:bg-accent transition-colors"
          >
            Claim now <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>

      {/* 5. Positions */}
      <div>
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
          Positions ({portfolio.positions.length})
        </h2>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-hidden rounded-xl border border-border/50 bg-card">
          <table className="w-full" role="table" aria-label="Investment positions">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20">
                {['Vault', 'Assets', 'Value', 'Unrealized PnL', 'APY', 'Actions'].map((h, i) => (
                  <th key={h} className={cn(
                    'py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider',
                    i === 0 ? 'pl-5 pr-3 text-left' : i === 5 ? 'pl-3 pr-5 text-right' : 'px-3 text-left',
                    h === 'Value' && 'text-right',
                    h === 'Unrealized PnL' && 'text-right',
                    h === 'APY' && 'hidden md:table-cell text-right',
                  )}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {portfolio.positions.map((position, i) => (
                <PositionRow
                  key={position.vaultId}
                  position={position}
                  onDeposit={setDepositVaultId}
                  onWithdraw={setWithdrawVaultId}
                  index={i}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-3">
          {portfolio.positions.map(position => (
            <MobilePositionCard
              key={position.vaultId}
              position={position}
              onDeposit={setDepositVaultId}
              onWithdraw={setWithdrawVaultId}
            />
          ))}
        </div>
      </div>

      {/* 2+3. Performance chart (2/3) + Allocation (1/3) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Performance & Allocation</h2>
          <button
            onClick={() => setShowChartAlloc(v => !v)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <BarChart2 className="h-3.5 w-3.5" aria-hidden />
            {showChartAlloc ? 'Hide' : 'Show'}
          </button>
        </div>
        {showChartAlloc && (
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="lg:flex-[2] min-w-0">
              <PortfolioChart data={[]} />
            </div>
            <div className="lg:flex-[1] min-w-0">
              <EarningsBreakdown />
            </div>
          </div>
        )}
      </div>

      {/* 6. Yield timeline */}

      {/* 7. Recent activity */}
      <RecentActivity />

      {depositPosition && (
        <DepositModal
          open={!!depositVaultId}
          onClose={() => setDepositVaultId(null)}
          vaultName={depositPosition.vaultName}
          vaultId={depositPosition.vaultId}
          asset={depositPosition.asset}
        />
      )}
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

function PageHeader() {
  return (
    <div>
      <h1 className="text-2xl font-black text-foreground tracking-tight">Portfolio</h1>
      <p className="text-sm text-muted-foreground mt-0.5">Your positions, yield, and points.</p>
    </div>
  )
}
