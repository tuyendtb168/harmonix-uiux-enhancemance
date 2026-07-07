import { motion } from 'framer-motion'
import { Star, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/shared/lib/utils'
import { Badge, Button } from '@/shared/ui'
import type { Vault } from '@/features/vault/components/VaultCard'

const RISK_CONFIG = {
  low:    { label: 'Low Risk',  badgeVariant: 'low'    as const },
  medium: { label: 'Med Risk',  badgeVariant: 'medium' as const },
  high:   { label: 'High Risk', badgeVariant: 'high'   as const },
}

const GOAL_LABEL: Record<string, string> = {
  'stable-income': 'Stable Income',
  'growth':        'Growth',
  'delta-neutral': 'Delta Neutral',
  'high-yield':    'High Yield',
}

const BEST_FOR: Record<string, string[]> = {
  'stable-income': ['Passive earning', 'Capital preservation', 'New depositors'],
  'growth':        ['Medium-term holders', 'ETH bulls', 'Yield hunters'],
  'delta-neutral': ['Market-neutral exposure', 'Risk-managed yield'],
  'high-yield':    ['Risk-tolerant investors', 'Momentum traders'],
}

interface RecommendedCardProps {
  vault: Vault
  onDeposit: (id: string) => void
}

export function RecommendedCard({ vault, onDeposit }: RecommendedCardProps) {
  const risk = RISK_CONFIG[vault.risk]
  const bestFor = BEST_FOR[vault.goal] ?? []
  const withdrawalTime = vault.withdrawalTime ?? '2–3 days'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-card">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden />
        {/* Background glow */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-48 w-72 blur-3xl opacity-20"
          style={{ background: 'hsl(74 84% 56% / 0.15)' }}
          aria-hidden
        />

        <div className="relative p-6 sm:p-8">
          {/* Recommended label */}
          <div className="flex items-center gap-1.5 mb-5">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Recommended For You
            </span>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: identity + metrics */}
            <div className="space-y-5 flex-1">
              {/* Identity */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-xl font-black text-primary ring-1 ring-primary/20">
                  {vault.assetIcon
                    ? <img src={vault.assetIcon} alt={vault.asset} className="h-7 w-7" />
                    : vault.asset.slice(0, 1)
                  }
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-black text-foreground tracking-tight">{vault.name}</h2>
                    <Badge variant={risk.badgeVariant}>{risk.label}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {vault.asset} · {GOAL_LABEL[vault.goal]} · {vault.strategy}
                  </p>
                </div>
              </div>

              {/* Key metrics — APY first, then risk context */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">APY</p>
                  <p className="text-3xl font-black text-primary tabular-nums leading-none">
                    {vault.apy.toFixed(1)}%
                  </p>
                  {vault.apy30d && (
                    <p className="text-xs text-muted-foreground mt-1">30d {vault.apy30d.toFixed(1)}%</p>
                  )}
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Risk</p>
                  <p className="text-sm font-semibold text-foreground mt-2">{risk.label}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Liquidity</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" aria-hidden />
                    <p className="text-sm font-semibold text-foreground">{withdrawalTime}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">TVL</p>
                  <p className="text-sm font-semibold text-foreground tabular-nums mt-2">{vault.tvlFormatted}</p>
                </div>
              </div>

              {/* Best for + rewards */}
              <div className="flex flex-wrap gap-6">
                {bestFor.length > 0 && (
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Best for
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {bestFor.map((label) => (
                        <span
                          key={label}
                          className="rounded-full bg-primary/8 border border-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {vault.rewards && vault.rewards.length > 0 && (
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Rewards
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {vault.rewards.map((r) => (
                        <span
                          key={r}
                          className="rounded-full bg-muted/60 border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 shrink-0">
              <Button
                size="lg"
                className="min-w-[140px]"
                onClick={() => onDeposit(vault.id)}
                disabled={vault.status !== 'active'}
              >
                Deposit {vault.asset}
              </Button>
              <Link
                to={`/earn/${vault.id}`}
                className={cn(
                  'flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded'
                )}
                aria-label={`View ${vault.name} strategy details`}
              >
                View details
                <ArrowRight className="h-3 w-3" aria-hidden />
              </Link>
              <p className="text-xs text-muted-foreground hidden lg:block text-right">
                Min ${vault.minDeposit} · {vault.asset}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
