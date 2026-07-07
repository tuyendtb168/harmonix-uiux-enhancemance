import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Clock, Unlock, RefreshCw, TrendingUp, AlertCircle, CheckCircle2, Upload } from 'lucide-react'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import type { Vault } from '@/features/vault/components/VaultCard'
import { DepositModal } from '@/features/vault/components/DepositModal'
import { WithdrawModal } from '@/features/vault/components/WithdrawModal'

const MOCK_VAULT: Vault & {
  strategyDetail: string
  allocationBreakdown: { label: string; percent: number; color: string }[]
  riskDetails: { title: string; body: string }[]
  withdrawalTime: string
  audited: boolean
  auditDate: string
  operator: string
  launchDate: string
} = {
  id: 'eth-yield-max',
  name: 'ETH Yield Max',
  asset: 'ETH',
  apy: 18.2,
  tvl: 1200000,
  tvlFormatted: '$1.2M',
  risk: 'medium',
  status: 'active',
  strategy: 'Yield Optimized',
  goal: 'growth',
  minDeposit: 250,
  description: 'Optimized ETH yield combining staking, lending, and liquidity provision for maximum capital efficiency.',
  withdrawalTime: '3–5 days',
  apy30d: 17.9,
  apy90d: 16.4,
  depositorCount: 5100,
  rewards: ['Harmonix'],
  strategyDetail: 'This vault maximizes ETH yield through a combination of liquid staking derivatives, Aave/Compound lending, and Uniswap v3 liquidity positions. The strategy dynamically rebalances allocations to chase highest risk-adjusted returns across protocols.',
  allocationBreakdown: [
    { label: 'Liquid Staking', percent: 40, color: 'bg-primary' },
    { label: 'Lending',        percent: 35, color: 'bg-muted-foreground' },
    { label: 'Liquidity',      percent: 25, color: 'bg-border' },
  ],
  riskDetails: [
    {
      title: 'Smart Contract Risk',
      body: 'Exposure to multiple DeFi protocols increases surface area. All contracts audited.',
    },
    {
      title: 'Slashing Risk',
      body: 'Liquid staking component carries slashing risk, mitigated through diversified validators.',
    },
    {
      title: 'Liquidity Risk',
      body: 'Withdrawal may take 3–5 days as positions are unwound in optimal order.',
    },
  ],
  audited: true,
  auditDate: 'March 2025',
  operator: 'Harmonix',
  launchDate: 'August 2024',
}

// Mock: user has a position + one pending withdrawal
const MOCK_POSITION = {
  value: 8450,
  valueFormatted: '$8,450.00',
  shares: 7.842,
  sharesFormatted: '7.842 ETH',
  pnl: 312,
  pnlFormatted: '$312.00',
  pnlPercent: 3.83,
  depositedAt: 'Mar 15, 2025',
}

const MOCK_PENDING_WITHDRAWAL = {
  amount: 2500,
  amountFormatted: '$2,500.00',
  asset: 'ETH',
  requestedAt: 'Jun 25, 2026',
  estimatedArrival: 'Jun 28–30, 2026',
  daysRemaining: 2,
  txHash: '0xa1b2c3d4e5f6...',
}

const RISK_LABELS = { low: 'Low Risk', medium: 'Medium Risk', high: 'High Risk' }
const RISK_BADGE_VARIANT = { low: 'low' as const, medium: 'medium' as const, high: 'high' as const }

export function VaultDetail2Page() {
  const { vaultId: _vaultId } = useParams<{ vaultId: string }>()
  const vault = MOCK_VAULT
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  return (
    <div className="space-y-8 pb-24 sm:pb-0">
      {/* Back nav */}
      <Link
        to="/earn"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded"
        aria-label="Back to vaults"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to Vaults
      </Link>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-72 blur-3xl opacity-20" style={{ background: 'hsl(74 84% 56% / 0.12)' }} aria-hidden />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-xl font-black text-primary ring-1 ring-primary/20">
                {vault.asset.slice(0, 1)}
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl font-black text-foreground tracking-tight">{vault.name}</h1>
                  <Badge variant={RISK_BADGE_VARIANT[vault.risk]}>{RISK_LABELS[vault.risk]}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {vault.asset} · {vault.strategy} · by {vault.operator}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4 sm:gap-y-0">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">APY</p>
                <p className="text-2xl font-black text-primary tabular-nums">{vault.apy.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Withdrawal</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Clock className="h-4 w-4 text-muted-foreground" aria-hidden />
                  <p className="text-sm font-semibold text-foreground">{vault.withdrawalTime}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">TVL</p>
                <p className="text-sm font-semibold text-foreground tabular-nums mt-1">{vault.tvlFormatted}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Min Deposit</p>
                <p className="text-sm font-semibold text-foreground tabular-nums mt-1">${vault.minDeposit} {vault.asset}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {vault.audited && (
                <div className="flex items-center gap-1.5 rounded-full border border-success/20 bg-success/8 px-3 py-1 text-xs font-medium text-success">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                  Audited · {vault.auditDate}
                </div>
              )}
              <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                <Unlock className="h-3.5 w-3.5" aria-hidden />
                Self-custody · No lock-up
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                <RefreshCw className="h-3.5 w-3.5" aria-hidden />
                Auto-compound
              </div>
            </div>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="lg"
                className="gap-2"
                onClick={() => setWithdrawOpen(true)}
              >
                <Upload className="h-4 w-4" aria-hidden />
                Withdraw
              </Button>
              <Button
                size="lg"
                className="min-w-[140px]"
                onClick={() => setDepositOpen(true)}
                disabled={vault.status !== 'active'}
              >
                Add More
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Withdraw in {vault.withdrawalTime}</p>
          </div>
        </div>
      </div>

      {/* Quick facts bar */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground px-1">
        <span>30d APY <span className="font-semibold text-foreground">{vault.apy30d?.toFixed(1)}%</span></span>
        <span>90d APY <span className="font-semibold text-foreground">{vault.apy90d?.toFixed(1)}%</span></span>
        <span>Launched <span className="font-semibold text-foreground">{vault.launchDate}</span></span>
        <span>Operator <span className="font-semibold text-foreground">{vault.operator}</span></span>
        <span>Depositors <span className="font-semibold text-foreground">{vault.depositorCount?.toLocaleString()}</span></span>
      </div>

      {/* Pending withdrawal banner */}
      <div className="rounded-xl border border-warning/30 bg-warning/5 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-warning/15">
            <Clock className="h-4 w-4 text-warning" aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <p className="text-sm font-bold text-foreground">Withdrawal pending</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[11px] font-semibold text-warning">
                <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" aria-hidden />
                Processing
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{MOCK_PENDING_WITHDRAWAL.amountFormatted}</span> requested on {MOCK_PENDING_WITHDRAWAL.requestedAt} · estimated arrival{' '}
              <span className="font-semibold text-foreground">{MOCK_PENDING_WITHDRAWAL.estimatedArrival}</span>
            </p>
            {/* Mini timeline */}
            <div className="mt-3 flex items-center gap-0">
              {[
                { label: 'Requested', done: true },
                { label: 'Processing', done: false, active: true },
                { label: 'Transferred', done: false },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center">
                  {i > 0 && (
                    <div className={cn('h-px w-8 sm:w-16', s.done ? 'bg-success' : s.active ? 'bg-warning/40' : 'bg-border/50')} />
                  )}
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-black',
                      s.done   ? 'border-success bg-success/10 text-success' :
                      s.active ? 'border-warning bg-warning/10 text-warning' :
                                 'border-border bg-muted text-muted-foreground'
                    )}>
                      {s.done ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> :
                       s.active ? <Clock className="h-3 w-3" aria-hidden /> :
                       <span>{i + 1}</span>}
                    </div>
                    <span className={cn('text-[10px] font-medium whitespace-nowrap', s.active ? 'text-warning' : 'text-muted-foreground')}>
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <a
            href={`https://hyperliquid.xyz/tx/${MOCK_PENDING_WITHDRAWAL.txHash}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 shrink-0"
          >
            View tx
          </a>
        </div>
      </div>

      {/* Two-column: main + sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* Your position */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" aria-hidden />
                Your Position
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Value</p>
                  <p className="text-xl font-black text-foreground tabular-nums">{MOCK_POSITION.valueFormatted}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">P&L</p>
                  <p className={cn('text-xl font-black tabular-nums', MOCK_POSITION.pnl >= 0 ? 'text-success' : 'text-destructive')}>
                    +{MOCK_POSITION.pnlFormatted}
                  </p>
                  <p className={cn('text-xs tabular-nums', MOCK_POSITION.pnl >= 0 ? 'text-success' : 'text-destructive')}>
                    +{MOCK_POSITION.pnlPercent.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Shares</p>
                  <p className="text-sm font-semibold text-foreground tabular-nums mt-1">{MOCK_POSITION.sharesFormatted}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Deposited</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{MOCK_POSITION.depositedAt}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-warning/20 bg-warning/5 px-3 py-2.5 text-xs text-muted-foreground">
                <AlertCircle className="h-4 w-4 text-warning shrink-0" aria-hidden />
                <p>
                  <span className="font-semibold text-warning">{MOCK_PENDING_WITHDRAWAL.amountFormatted}</span> is currently queued for withdrawal and will arrive in your wallet by {MOCK_PENDING_WITHDRAWAL.estimatedArrival}.
                </p>
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  variant="secondary"
                  className="gap-1.5"
                  onClick={() => setWithdrawOpen(true)}
                >
                  <Upload className="h-4 w-4" aria-hidden />
                  Withdraw
                </Button>
                <Button
                  className="gap-1.5"
                  onClick={() => setDepositOpen(true)}
                  disabled={vault.status !== 'active'}
                >
                  Add More
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader><CardTitle>About this Vault</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{vault.description}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">{vault.strategyDetail}</p>
            </CardContent>
          </Card>

          {/* Allocation */}
          <Card>
            <CardHeader><CardTitle>Strategy Allocation</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {vault.allocationBreakdown.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-28 shrink-0">
                    <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all', item.color)}
                      style={{ width: `${item.percent}%` }}
                      role="progressbar"
                      aria-valuenow={item.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${item.label}: ${item.percent}%`}
                    />
                  </div>
                  <span className="w-8 text-right text-xs font-medium text-muted-foreground tabular-nums">
                    {item.percent}%
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Risk */}
          <Card>
            <CardHeader><CardTitle>Risk Factors</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-4" role="list">
                {vault.riskDetails.map((r) => (
                  <li key={r.title} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-warning/10">
                      <span className="text-[10px] font-black text-warning">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{r.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{r.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <Card variant="elevated">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-3">
                {[
                  { label: 'Current APY', value: `${vault.apy}%`, highlight: true },
                  { label: 'Your position', value: MOCK_POSITION.valueFormatted, highlight: false },
                  { label: 'Pending withdrawal', value: MOCK_PENDING_WITHDRAWAL.amountFormatted, warning: true },
                  { label: 'Withdrawal Time', value: vault.withdrawalTime },
                  { label: 'TVL', value: vault.tvlFormatted },
                ].map(({ label, value, highlight, warning }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className={cn(
                      'font-semibold',
                      highlight ? 'text-primary' :
                      warning   ? 'text-warning' :
                                  'text-foreground'
                    )}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/60 pt-4 space-y-2">
                <Button
                  variant="secondary"
                  className="w-full gap-2"
                  onClick={() => setWithdrawOpen(true)}
                >
                  <Upload className="h-4 w-4" aria-hidden />
                  Withdraw
                </Button>
                <Button
                  className="w-full"
                  onClick={() => setDepositOpen(true)}
                  disabled={vault.status !== 'active'}
                >
                  Add More
                </Button>
              </div>

              {vault.audited && (
                <div className="flex items-center gap-2 rounded-lg border border-success/15 bg-success/6 px-3 py-2.5">
                  <ShieldCheck className="h-4 w-4 text-success shrink-0" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold text-success">Audited Contract</p>
                    <p className="text-xs text-muted-foreground">{vault.auditDate}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30 border-t border-border/50 bg-background/95 backdrop-blur-md px-4 py-3 sm:hidden">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="flex-1 gap-1.5"
            onClick={() => setWithdrawOpen(true)}
          >
            <Upload className="h-4 w-4" aria-hidden />
            Withdraw
          </Button>
          <Button
            className="flex-1"
            onClick={() => setDepositOpen(true)}
            disabled={vault.status !== 'active'}
          >
            Add More
          </Button>
        </div>
      </div>

      <DepositModal
        open={depositOpen}
        onClose={() => setDepositOpen(false)}
        vaultName={vault.name}
        vaultId={vault.id}
        asset={vault.asset}
        minDeposit={vault.minDeposit}
      />

      <WithdrawModal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        vaultName={vault.name}
        vaultId={vault.id}
        asset={vault.asset}
        positionValue={MOCK_POSITION.value}
        withdrawalDays={vault.withdrawalTime}
      />
    </div>
  )
}
