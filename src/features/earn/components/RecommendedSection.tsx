import { ArrowRight, TrendingUp, Info, Users, ArrowUpRight, Download, Upload, Clock, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge, Button, Tooltip } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import type { Vault } from '@/features/vault/components/VaultCard'

export interface VaultPosition {
  vaultId: string
  value: number
  valueFormatted: string
  pnl: number
  pnlFormatted: string
  pnlPercent: number
}

const RISK_LABELS: Record<Vault['risk'], string> = {
  low: 'Low Risk', medium: 'Med Risk', high: 'High Risk',
}
const RISK_DOT: Record<Vault['risk'], string> = {
  low: 'bg-success', medium: 'bg-warning', high: 'bg-destructive',
}
const REWARD_COLOR: Record<string, string> = {
  Harmonix:    'bg-primary',
  Valantis:    'bg-teal-500',
  Hyperliquid: 'bg-blue-500',
}

function formatDepositors(n?: number): string {
  if (!n) return '—'
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n)
}

function RewardAvatars({ rewards }: { rewards: string[] }) {
  if (!rewards.length) return null
  return (
    <div className="flex items-center gap-1 shrink-0">
      <span className="text-xs text-muted-foreground mr-0.5">Rewards</span>
      <div className="flex items-center -space-x-1">
        {rewards.map((r, i) => (
          <Tooltip key={r} content={r}>
            <div
              className={cn(
                'h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white border border-card ring-1 ring-card',
                REWARD_COLOR[r] ?? 'bg-muted'
              )}
              style={{ zIndex: rewards.length - i }}
            >
              {r.slice(0, 2).toUpperCase()}
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

// ── Featured vault — large spotlight card ────────────────────────────────────

function FeaturedCard({
  vault,
  position,
  onDeposit,
  onWithdraw,
}: {
  vault: Vault
  position?: VaultPosition
  onDeposit: (id: string) => void
  onWithdraw: (id: string) => void
}) {
  const depositLabel = vault.depositTokens
    ? `Deposit ${vault.depositTokens.map((t) => t.label).join('/')}`
    : `Deposit ${vault.asset}`
  const hasPosition = !!position

  return (
    <div className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-border/60 bg-card p-6 gap-5">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden />
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-40 w-56 blur-3xl bg-primary/6 opacity-80"
        aria-hidden
      />
      {/* ArrowUpRight details link */}
      <Link
        to={`/earn/${vault.id}`}
        className="absolute top-3 right-3 p-1.5 rounded-full border border-border bg-card hover:bg-accent transition-colors z-10"
        aria-label={`View ${vault.name} details`}
      >
        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      </Link>

      {/* Identity */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-base font-black text-primary ring-1 ring-primary/20">
            {vault.assetIcon
              ? <img src={vault.assetIcon} alt={vault.asset} className="h-7 w-7" />
              : vault.asset.slice(0, 1)
            }
          </div>
          <div>
            <p className="text-base font-bold text-foreground leading-tight">{vault.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {vault.asset} · {vault.strategy}
            </p>
          </div>
        </div>
        <Badge variant={vault.risk}>
          <span className={cn('h-1.5 w-1.5 rounded-full', RISK_DOT[vault.risk])} aria-hidden />
          {RISK_LABELS[vault.risk]}
        </Badge>
      </div>

      {/* Position indicator — shown when user has a position */}
      {hasPosition && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground font-medium">Your position</span>
            <span className={cn('font-bold tabular-nums', position!.pnl >= 0 ? 'text-success' : 'text-destructive')}>
              {position!.pnl >= 0 ? '+' : ''}{position!.pnlFormatted} ({position!.pnlPercent.toFixed(2)}%)
            </span>
          </div>
          <p className="text-lg font-black text-foreground tabular-nums">{position!.valueFormatted}</p>
        </div>
      )}

      {/* APY hero */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">APY</p>
        <p
          className="text-6xl font-black text-primary tabular-nums leading-none"
          style={{ textShadow: '0 0 40px hsl(74 84% 56% / 0.4)' }}
        >
          {vault.apy.toFixed(1)}%
        </p>
        {vault.apy30d && (
          <p className="text-xs text-muted-foreground mt-1.5 tabular-nums">30d avg {vault.apy30d.toFixed(1)}%</p>
        )}
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Withdrawal</p>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground shrink-0" aria-hidden />
            <p className="text-xs font-semibold text-foreground">{vault.withdrawalTime ?? '2–3 days'}</p>
          </div>
        </div>
        <div className="rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Min Deposit</p>
          <div className="flex items-center gap-1">
            <Wallet className="h-3 w-3 text-muted-foreground shrink-0" aria-hidden />
            <p className="text-xs font-semibold text-foreground">${vault.minDeposit}</p>
          </div>
        </div>
      </div>

      {/* Stats footer */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/60 mt-auto flex-wrap">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden />
            TVL {vault.tvlFormatted}
          </div>
          {vault.depositorCount && (
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" aria-hidden />
              {formatDepositors(vault.depositorCount)} depositors
            </div>
          )}
          {vault.rewards && vault.rewards.length > 0 && (
            <RewardAvatars rewards={vault.rewards} />
          )}
        </div>
        <Button
          size="sm"
          onClick={() => onDeposit(vault.id)}
          disabled={vault.status !== 'active'}
          aria-label={`Deposit into ${vault.name}`}
          className="gap-1.5 shrink-0"
        >
          <Download className="h-3.5 w-3.5" aria-hidden />
          {depositLabel}
        </Button>
        {hasPosition && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onWithdraw(vault.id)}
            aria-label={`Withdraw from ${vault.name}`}
            className="gap-1.5 shrink-0"
          >
            <Upload className="h-3.5 w-3.5" aria-hidden />
            Withdraw
          </Button>
        )}
      </div>
    </div>
  )
}

// ── Compact vault card ────────────────────────────────────────────────────────

function CompactCard({
  vault,
  position,
  onDeposit,
  onWithdraw,
}: {
  vault: Vault
  position?: VaultPosition
  onDeposit: (id: string) => void
  onWithdraw: (id: string) => void
}) {
  const depositLabel = vault.depositTokens
    ? `Deposit ${vault.depositTokens.map((t) => t.label).join('/')}`
    : `Deposit ${vault.asset}`
  const hasPosition = !!position

  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-xl border border-border/60 bg-card p-5 gap-4 transition-shadow hover:shadow-md">
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent group-hover:via-primary/30 transition-all"
        aria-hidden
      />
      <Link
        to={`/earn/${vault.id}`}
        className="absolute top-3 right-3 p-1.5 rounded-full border border-border bg-card hover:bg-accent transition-colors z-10"
        aria-label={`View ${vault.name} details`}
      >
        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      </Link>

      {/* Identity */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-xs font-black text-primary ring-1 ring-primary/20">
            {vault.assetIcon
              ? <img src={vault.assetIcon} alt={vault.asset} className="h-5 w-5" />
              : vault.asset.slice(0, 1)
            }
          </div>
          <div>
            <p className="text-sm font-bold text-foreground leading-tight">{vault.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {vault.asset} · {vault.strategy}
            </p>
          </div>
        </div>
        <Badge variant={vault.risk} className="text-xs shrink-0">
          <span className={cn('h-1.5 w-1.5 rounded-full', RISK_DOT[vault.risk])} aria-hidden />
          {RISK_LABELS[vault.risk]}
        </Badge>
      </div>

      {/* APY only — no TVL here */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">APY</p>
        <p className="text-3xl font-black text-primary tabular-nums leading-none">
          {vault.apy.toFixed(1)}%
        </p>
        {vault.apy30d && (
          <p className="text-[11px] text-muted-foreground mt-1 tabular-nums">30d {vault.apy30d.toFixed(1)}%</p>
        )}
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border/50 bg-muted/30 px-3 py-2">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Withdrawal</p>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground shrink-0" aria-hidden />
            <p className="text-xs font-semibold text-foreground">{vault.withdrawalTime ?? '2–3 days'}</p>
          </div>
        </div>
        <div className="rounded-lg border border-border/50 bg-muted/30 px-3 py-2">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Min Deposit</p>
          <div className="flex items-center gap-1">
            <Wallet className="h-3 w-3 text-muted-foreground shrink-0" aria-hidden />
            <p className="text-xs font-semibold text-foreground">${vault.minDeposit}</p>
          </div>
        </div>
      </div>

      {/* Footer: TVL + depositors + rewards + deposit/withdraw */}
      <div className="pt-3 border-t border-border/60 mt-auto space-y-2.5">
        {hasPosition && (
          <div className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Your position</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-foreground tabular-nums">{position!.valueFormatted}</span>
              <span className={cn('text-[11px] font-semibold tabular-nums', position!.pnl >= 0 ? 'text-success' : 'text-destructive')}>
                {position!.pnl >= 0 ? '+' : ''}{position!.pnlPercent.toFixed(2)}%
              </span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden />
            {vault.tvlFormatted}
          </div>
          {vault.depositorCount && (
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" aria-hidden />
              {formatDepositors(vault.depositorCount)} depositors
            </div>
          )}
          {vault.rewards && vault.rewards.length > 0 && (
            <div className="ml-auto">
              <RewardAvatars rewards={vault.rewards} />
            </div>
          )}
        </div>
        <div className={cn('grid gap-2', hasPosition ? 'grid-cols-2' : 'grid-cols-1')}>
          {hasPosition && (
            <Button
              size="sm"
              variant="secondary"
              className="gap-1"
              onClick={() => onWithdraw(vault.id)}
              aria-label={`Withdraw from ${vault.name}`}
            >
              <Upload className="h-3.5 w-3.5" aria-hidden />
              Withdraw
            </Button>
          )}
          <Button
            size="sm"
            className="gap-1"
            onClick={() => onDeposit(vault.id)}
            disabled={vault.status !== 'active'}
            aria-label={`Deposit into ${vault.name}`}
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            {hasPosition ? 'Add More' : depositLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

interface RecommendedSectionProps {
  vaults: Vault[]
  positions?: VaultPosition[]
  onDeposit: (id: string) => void
  onWithdraw: (id: string) => void
}

export function RecommendedSection({ vaults, positions = [], onDeposit, onWithdraw }: RecommendedSectionProps) {
  if (vaults.length === 0) return null

  const [featured, ...rest] = vaults
  const getPosition = (id: string) => positions.find((p) => p.vaultId === id)

  return (
    <section aria-labelledby="recommended-heading">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2
              id="recommended-heading"
              className="text-lg font-black text-foreground tracking-tight"
            >
              Recommended for you
            </h2>
            <button
              type="button"
              aria-label="How recommendations work"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              <Info className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Opportunities tailored to your portfolio and market conditions.
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild className="shrink-0">
          <Link to="/earn" className="gap-1">
            View all vaults
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>

      {/* 1 large featured (left) + 2 compact stacked (right) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="h-full"
        >
          <FeaturedCard vault={featured} position={getPosition(featured.id)} onDeposit={onDeposit} onWithdraw={onWithdraw} />
        </motion.div>

        <div className="flex flex-col gap-4 lg:col-span-2 lg:grid lg:grid-cols-2">
          {rest.slice(0, 2).map((vault, i) => (
            <motion.div
              key={vault.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut', delay: (i + 1) * 0.06 }}
              className="h-full"
            >
              <CompactCard vault={vault} position={getPosition(vault.id)} onDeposit={onDeposit} onWithdraw={onWithdraw} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
