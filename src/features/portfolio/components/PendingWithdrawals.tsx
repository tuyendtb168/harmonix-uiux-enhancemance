import { Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'

export interface PendingWithdrawal {
  id: string
  vaultName: string
  asset: string
  amountFormatted: string
  estimatedDate: string
  status: 'queued' | 'processing' | 'ready'
}

const STATUS_CONFIG = {
  queued:     { label: 'Queued',     dotClass: 'bg-muted-foreground',      rowClass: '' },
  processing: { label: 'Processing', dotClass: 'bg-warning animate-pulse', rowClass: 'bg-warning/5' },
  ready:      { label: 'Ready',      dotClass: 'bg-success',               rowClass: 'bg-success/5' },
}

interface PendingWithdrawalsProps {
  withdrawals: PendingWithdrawal[]
  isLoading?: boolean
}

export function PendingWithdrawals({ withdrawals, isLoading }: PendingWithdrawalsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader><CardTitle>Pending Withdrawals</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="h-4 w-40 rounded bg-muted animate-pulse" />
              <div className="h-4 w-20 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (!withdrawals.length) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-warning" aria-hidden />
          Pending Withdrawals
          <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-warning/15 px-1.5 text-[11px] font-bold text-warning">
            {withdrawals.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1.5" role="list">
          {withdrawals.map((w) => {
            const cfg = STATUS_CONFIG[w.status]
            return (
              <li
                key={w.id}
                className={cn(
                  'flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors',
                  cfg.rowClass || 'hover:bg-muted/30'
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={cn('h-2 w-2 shrink-0 rounded-full', cfg.dotClass)} aria-hidden />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{w.vaultName}</p>
                    <p className="text-xs text-muted-foreground">{w.estimatedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground tabular-nums">{w.amountFormatted}</p>
                    <p className={cn('text-xs font-medium',
                      w.status === 'ready' ? 'text-success' :
                      w.status === 'processing' ? 'text-warning' : 'text-muted-foreground'
                    )}>{cfg.label}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
