import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Badge, Button, Card } from '@/shared/ui'

export type VaultRisk = 'low' | 'medium' | 'high'
export type VaultStatus = 'active' | 'paused' | 'full' | 'coming-soon'
export type VaultGoal = 'stable-income' | 'growth' | 'delta-neutral' | 'high-yield'

export interface Vault {
  id: string
  name: string
  asset: string
  assetIcon?: string
  apy: number
  tvl: number
  tvlFormatted: string
  risk: VaultRisk
  status: VaultStatus
  strategy: string
  goal: VaultGoal
  minDeposit: number
  description: string
  withdrawalTime?: string
  liquidity?: string
  rewards?: string[]
  isRecommended?: boolean
  depositorCount?: number
  isNew?: boolean
  yieldSources?: { label: string; pct: number }[]
  depositTokens?: { label: string; color: string; textColor: string }[]
  apy30d?: number
  apy90d?: number
}

export interface UserPosition {
  value: number
  valueFormatted: string
  pnl: number
  pnlFormatted: string
  pnlPercent: number
}

interface VaultCardProps {
  vault: Vault
  position?: UserPosition
  onDeposit?: (id: string) => void
  className?: string
}

const RISK_CONFIG: Record<VaultRisk, {
  label: string
  dotClass: string
  badgeVariant: 'low' | 'medium' | 'high'
}> = {
  low:    { label: 'Low Risk',  dotClass: 'bg-success',     badgeVariant: 'low' },
  medium: { label: 'Med Risk',  dotClass: 'bg-warning',     badgeVariant: 'medium' },
  high:   { label: 'High Risk', dotClass: 'bg-destructive', badgeVariant: 'high' },
}

const STATUS_CONFIG: Record<VaultStatus, { label: string; disabled: boolean }> = {
  active:        { label: '',            disabled: false },
  paused:        { label: 'Paused',      disabled: true },
  full:          { label: 'Full',        disabled: true },
  'coming-soon': { label: 'Coming Soon', disabled: true },
}

export function VaultCard({ vault, position, onDeposit, className }: VaultCardProps) {
  const risk = RISK_CONFIG[vault.risk]
  const statusCfg = STATUS_CONFIG[vault.status]
  const isDisabled = statusCfg.disabled
  const hasPosition = !!position
  const withdrawalTime = vault.withdrawalTime ?? '2–3 days'

  return (
    <Card
      variant={hasPosition ? 'elevated' : 'interactive'}
      className={cn(
        'flex flex-col h-full relative overflow-hidden',
        isDisabled && 'opacity-60',
        className
      )}
    >
      {/* Top line — primary for active high-yield */}
      {vault.apy >= 20 && !isDisabled && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden />
      )}

      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Header: asset icon + name + status badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-black text-primary ring-1 ring-primary/20">
              {vault.assetIcon
                ? <img src={vault.assetIcon} alt={vault.asset} className="h-6 w-6" />
                : vault.asset.slice(0, 1)
              }
              {vault.status === 'active' && (
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" aria-hidden />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-foreground leading-tight">{vault.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{vault.asset} · {vault.strategy}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {vault.status !== 'active' && (
              <Badge variant="default" className="text-xs">{statusCfg.label}</Badge>
            )}
            <Badge variant={risk.badgeVariant} className="text-xs">
              <span className={cn('h-1.5 w-1.5 rounded-full', risk.dotClass)} aria-hidden />
              {risk.label}
            </Badge>
          </div>
        </div>

        {/* Key metrics row: APY (hero) + secondary metrics */}
        <div className="grid grid-cols-3 gap-3">
          {/* APY — prominent but not casino-scale */}
          <div className="col-span-1">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">APY</p>
            <p className={cn(
              'text-3xl font-black tabular-nums leading-none',
              isDisabled ? 'text-muted-foreground' : 'text-primary'
            )}>
              {vault.apy.toFixed(1)}%
            </p>
            {vault.apy30d && (
              <p className="text-[11px] text-muted-foreground mt-1 tabular-nums">
                30d {vault.apy30d.toFixed(1)}%
              </p>
            )}
          </div>

          {/* Withdrawal time — critical for trust */}
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Withdrawal</p>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3 text-muted-foreground shrink-0" aria-hidden />
              <p className="text-sm font-semibold text-foreground">{withdrawalTime}</p>
            </div>
          </div>

          {/* TVL */}
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">TVL</p>
            <p className="text-sm font-semibold text-foreground tabular-nums mt-1">{vault.tvlFormatted}</p>
            <p className="text-[11px] text-muted-foreground">Min ${vault.minDeposit}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 -mt-1">
          {vault.description}
        </p>

        {/* User position — if deposited */}
        {hasPosition && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5">
            <div className="flex items-center justify-between text-xs mb-0.5">
              <span className="text-muted-foreground font-medium">Your position</span>
              <span className={cn('font-bold tabular-nums', position!.pnl >= 0 ? 'text-success' : 'text-destructive')}>
                {position!.pnl >= 0 ? '+' : ''}{position!.pnlFormatted} ({position!.pnlPercent.toFixed(2)}%)
              </span>
            </div>
            <p className="text-base font-black text-foreground tabular-nums">{position!.valueFormatted}</p>
          </div>
        )}

        {/* Footer: primary deposit CTA + secondary details link */}
        <div className="mt-auto space-y-2 pt-3 border-t border-border/60">
          {!isDisabled && onDeposit ? (
            <Button
              variant="primary"
              className="w-full h-9 text-sm"
              onClick={() => onDeposit(vault.id)}
              aria-label={`Deposit into ${vault.name}`}
            >
              Deposit {vault.asset}
            </Button>
          ) : (
            <Button variant="secondary" className="w-full h-9 text-sm" disabled={isDisabled}>
              {statusCfg.label || 'Unavailable'}
            </Button>
          )}
          <Link
            to={`/earn/${vault.id}`}
            className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
            aria-label={`View ${vault.name} details`}
          >
            View strategy details
            <ArrowRight className="h-3 w-3" aria-hidden />
          </Link>
        </div>
      </div>
    </Card>
  )
}

export function VaultCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col h-full', className)}>
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-muted animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-4 w-36 rounded bg-muted animate-pulse" />
              <div className="h-3 w-24 rounded bg-muted animate-pulse" />
            </div>
          </div>
          <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map(i => (
            <div key={i} className="space-y-1.5">
              <div className="h-2.5 w-8 rounded bg-muted animate-pulse" />
              <div className="h-8 w-16 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded bg-muted animate-pulse" />
          <div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
        </div>
        <div className="mt-auto pt-3 border-t border-border/60 space-y-2">
          <div className="h-9 w-full rounded-lg bg-muted animate-pulse" />
          <div className="h-5 w-32 mx-auto rounded bg-muted animate-pulse" />
        </div>
      </div>
    </Card>
  )
}
