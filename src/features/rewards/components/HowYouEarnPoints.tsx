import { Vault, RefreshCw, TrendingUp } from 'lucide-react'

export function HowYouEarnPoints() {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 space-y-4">
      <p className="text-sm font-semibold text-foreground">How you earn points</p>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted border border-border">
            <Vault className="h-4 w-4 text-muted-foreground" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground leading-snug">Deposit to Harmonix vaults</p>
            <p className="text-xs text-muted-foreground mt-0.5">Earn Harmonix points</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted border border-border">
            <RefreshCw className="h-4 w-4 text-muted-foreground" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground leading-snug">Deposit assets (USDC, USDT, HYPE)</p>
            <p className="text-xs text-muted-foreground mt-0.5">Harmonix farms and shares partner points</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted border border-border">
            <TrendingUp className="h-4 w-4 text-muted-foreground" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground leading-snug">Farm haAssets on Pendle</p>
            <p className="text-xs text-muted-foreground mt-0.5">Earn partner points directly</p>
          </div>
        </div>
      </div>
    </div>
  )
}
