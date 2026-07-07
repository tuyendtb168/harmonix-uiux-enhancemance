import { ArrowRight, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge, Button } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'

interface RecommendedVault {
  id: string
  name: string
  asset: string
  apy: string
  risk: 'low' | 'medium' | 'high'
  tvl: string
  description: string
  strategy?: string
}

const RISK_LABELS: Record<RecommendedVault['risk'], string> = {
  low: 'Low Risk', medium: 'Med Risk', high: 'High Risk',
}

const RISK_COLORS: Record<RecommendedVault['risk'], string> = {
  low: 'bg-success', medium: 'bg-warning', high: 'bg-destructive',
}

const MOCK_VAULTS: RecommendedVault[] = [
  {
    id: 'delta-neutral-usdc',
    name: 'Delta Neutral USDC',
    asset: 'USDC',
    apy: '12.4',
    risk: 'low',
    tvl: '$2.4M',
    strategy: 'Delta Neutral',
    description: 'Earn stable yield from funding rates with minimal directional risk. Capital protected through continuous hedging.',
  },
  {
    id: 'eth-yield-max',
    name: 'ETH Yield Max',
    asset: 'ETH',
    apy: '18.2',
    risk: 'medium',
    tvl: '$1.2M',
    strategy: 'Yield Optimized',
    description: 'Optimized ETH yield strategy combining staking rewards, lending rates, and liquidity provision.',
  },
  {
    id: 'btc-bull-run',
    name: 'BTC Bull Run',
    asset: 'BTC',
    apy: '24.8',
    risk: 'high',
    tvl: '$890K',
    strategy: 'Directional',
    description: 'Directional BTC strategy designed to capture upside momentum using leverage and options.',
  },
]

interface RecommendedVaultsSectionProps {
  vaults?: RecommendedVault[]
}

export function RecommendedVaultsSection({ vaults = MOCK_VAULTS }: RecommendedVaultsSectionProps) {
  const [featured, ...rest] = vaults

  return (
    <section aria-labelledby="recommended-vaults-heading" className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 id="recommended-vaults-heading" className="text-lg font-bold text-foreground">
            Top Vaults
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Curated strategies for every risk profile
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/earn" className="gap-1.5">
            View all
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
        {/* Featured vault — larger spotlight card */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Link
              to={`/earn/${featured.id}`}
              className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl block h-full"
              aria-label={`${featured.name} — ${featured.apy}% APY, ${RISK_LABELS[featured.risk]}`}
            >
              <div className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-200 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/5 p-6 gap-5">
                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden />
                {/* Background glow */}
                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-40 w-56 blur-3xl bg-primary/6 opacity-80" aria-hidden />

                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-base font-black text-primary ring-1 ring-primary/20">
                      {featured.asset.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-base font-bold text-foreground leading-tight">{featured.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{featured.asset} · {featured.strategy}</p>
                    </div>
                  </div>
                  <Badge variant={featured.risk}>
                    <span className={cn('h-1.5 w-1.5 rounded-full', RISK_COLORS[featured.risk])} aria-hidden />
                    {RISK_LABELS[featured.risk]}
                  </Badge>
                </div>

                {/* APY hero */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">APY</p>
                  <p
                    className="text-6xl font-black text-primary tabular-nums leading-none"
                    style={{ textShadow: '0 0 40px hsl(74 84% 56% / 0.4)' }}
                  >
                    {featured.apy}%
                  </p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{featured.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border/60 mt-auto">
                  <div>
                    <p className="text-xs text-muted-foreground">TVL</p>
                    <p className="text-sm font-semibold text-foreground tabular-nums">{featured.tvl}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    <TrendingUp className="h-4 w-4" aria-hidden />
                    Deposit now
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Remaining vaults — compact cards */}
        <div className="flex flex-col gap-4 lg:col-span-2 lg:grid lg:grid-cols-2">
          {rest.map((vault, i) => (
            <motion.div
              key={vault.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: (i + 1) * 0.06 }}
            >
              <Link
                to={`/earn/${vault.id}`}
                className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl block h-full"
                aria-label={`${vault.name} — ${vault.apy}% APY, ${RISK_LABELS[vault.risk]}`}
              >
                <div className="relative flex flex-col h-full overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-200 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-black/20 p-5 gap-4">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent group-hover:via-primary/30 transition-all" aria-hidden />

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-xs font-black text-primary ring-1 ring-primary/20">
                        {vault.asset.slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground leading-tight">{vault.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{vault.asset} · {vault.strategy}</p>
                      </div>
                    </div>
                    <Badge variant={vault.risk} className="text-xs shrink-0">
                      <span className={cn('h-1.5 w-1.5 rounded-full', RISK_COLORS[vault.risk])} aria-hidden />
                      {RISK_LABELS[vault.risk]}
                    </Badge>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">APY</p>
                      <p className="text-3xl font-black text-primary tabular-nums leading-none">
                        {vault.apy}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">TVL</p>
                      <p className="text-sm font-semibold text-foreground tabular-nums">{vault.tvl}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/60">
                    <p className="text-xs text-muted-foreground line-clamp-1">{vault.description}</p>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-2" aria-hidden />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
