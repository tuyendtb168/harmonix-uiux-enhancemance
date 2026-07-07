import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { Badge, Button, Card, CardContent, CardHeader } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'

export interface PortfolioPosition {
  vaultId: string
  vaultName: string
  asset: string
  tokens: string[]
  risk: 'low' | 'medium' | 'high'
  value: number
  valueFormatted: string
  deposited: number
  depositedFormatted: string
  earned: number
  earnedFormatted: string
  pnlPercent: number
  currentApy: number
  sharePercent: number
  pointsAccrued: number
  pointsPerDay: number
}

const RISK_BADGE: Record<PortfolioPosition['risk'], 'low' | 'medium' | 'high'> = {
  low: 'low', medium: 'medium', high: 'high',
}
const RISK_LABEL = { low: 'Low Risk', medium: 'Medium Risk', high: 'High Risk' }

interface PositionCardProps {
  position: PortfolioPosition
  onDeposit?: (vaultId: string) => void
  onWithdraw?: (vaultId: string) => void
}

export function PositionCard({ position, onDeposit, onWithdraw }: PositionCardProps) {
  const isPositive = position.pnlPercent >= 0

  return (
    <Card variant="interactive" className="flex flex-col gap-0 relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" aria-hidden />

      <CardHeader className="pb-3 gap-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-black text-primary ring-1 ring-primary/20">
              {position.asset.slice(0, 1)}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">{position.vaultName}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{position.asset}</p>
            </div>
          </div>
          <Badge variant={RISK_BADGE[position.risk]} className="shrink-0 text-xs">
            {RISK_LABEL[position.risk]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Value + PnL */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Current Value</p>
            <p className="text-2xl font-black text-foreground tabular-nums">
              {position.valueFormatted}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-0.5">Total Earned</p>
            <p className={cn('text-base font-bold tabular-nums', isPositive ? 'text-success' : 'text-destructive')}>
              {isPositive ? '+' : ''}{position.earnedFormatted}
              <span className="ml-1 text-xs font-medium opacity-70">
                ({isPositive ? '+' : ''}{position.pnlPercent.toFixed(2)}%)
              </span>
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5 sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground">Deposited</p>
            <p className="text-sm font-semibold text-foreground tabular-nums mt-0.5">
              {position.depositedFormatted}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Live APY</p>
            <p className="text-sm font-bold text-primary tabular-nums flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="h-3 w-3" aria-hidden />
              {position.currentApy.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Portfolio %</p>
            <p className="text-sm font-semibold text-foreground tabular-nums mt-0.5">
              {position.sharePercent.toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex gap-2 pt-1 border-t border-border/60">
          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs" asChild>
            <Link to={`/earn/${position.vaultId}`} aria-label={`View ${position.vaultName} details`}>
              Details
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </Button>
          <div className="ml-auto flex gap-2">
            {onDeposit && (
              <Button variant="secondary" size="sm" className="h-8 px-3 text-xs"
                onClick={() => onDeposit(position.vaultId)}>
                Deposit More
              </Button>
            )}
            {onWithdraw && (
              <Button variant="primary" size="sm" className="h-8 px-3 text-xs"
                onClick={() => onWithdraw(position.vaultId)}>
                Withdraw
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
