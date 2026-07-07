import { Calendar, TrendingUp } from 'lucide-react'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody,
} from '@/shared/ui/modal'
import { Badge } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import type { PartnerPoints, PartnerCampaignEntry } from '../types/rewards.types'

const PARTNER_COLORS: Record<string, string> = {
  valantis:  'bg-emerald-600',
  kinetiq:   'bg-teal-500',
  hyperlend: 'bg-emerald-300',
  pendle:    'bg-green-500',
  aave:      'bg-teal-300',
  others:    'bg-green-200',
}

const STATUS_CONFIG: Record<PartnerCampaignEntry['status'], { label: string; variant: 'low' | 'default' | 'warning' }> = {
  active:    { label: 'Active',    variant: 'low' },
  completed: { label: 'Completed', variant: 'default' },
  upcoming:  { label: 'Upcoming',  variant: 'warning' },
}

interface PartnerHistoryModalProps {
  partner: PartnerPoints | null
  open: boolean
  onClose: () => void
}

export function PartnerHistoryModal({ partner, open, onClose }: PartnerHistoryModalProps) {
  if (!partner) return null

  const avatarColor = PARTNER_COLORS[partner.id] ?? 'bg-muted'
  const totalDistributed = partner.campaignHistory.reduce((s, e) => s + e.pointsDistributed, 0)
  const activeCampaigns = new Set(
    partner.campaignHistory.filter((e) => e.status === 'active').map((e) => e.campaignName)
  ).size
  const totalCampaigns = new Set(partner.campaignHistory.map((e) => e.campaignName)).size

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent size="lg" className="max-h-[85vh] flex flex-col overflow-hidden">
        <DialogHeader className="shrink-0">
          {/* Partner identity */}
          <div className="flex items-center gap-3">
            <div className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold shrink-0',
              avatarColor
            )}>
              {partner.name.charAt(0)}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <DialogTitle>{partner.name}</DialogTitle>
                <Badge
                  variant={partner.status === 'active' ? 'low' : 'default'}
                  className="text-[10px] py-0.5"
                >
                  {partner.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Campaign point distribution history</p>
            </div>
          </div>

          {/* Summary stats */}
          <div className="flex items-center gap-6 mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-success" aria-hidden />
              <span className="text-muted-foreground">Total distributed:</span>
              <span className="font-semibold tabular-nums">{totalDistributed.toLocaleString()} pts</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden />
              <span className="text-muted-foreground">Campaigns:</span>
              <span className="font-semibold">{totalCampaigns}</span>
              {activeCampaigns > 0 && (
                <span className="text-xs text-success font-medium">({activeCampaigns} active)</span>
              )}
            </div>
          </div>
        </DialogHeader>

        <DialogBody className="overflow-y-auto flex-1 pb-6">
          {partner.campaignHistory.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No campaign history available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {['Campaign', 'Vault', 'Points Distributed', 'Date', 'Status'].map((h) => (
                      <th
                        key={h}
                        className="pb-3 text-left text-xs font-medium text-muted-foreground px-3 first:pl-0 last:pr-0 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {partner.campaignHistory.map((entry) => {
                    const cfg = STATUS_CONFIG[entry.status]
                    return (
                      <tr key={entry.id} className="group">
                        <td className="py-3 pl-0 pr-3">
                          <p className="text-sm font-medium text-foreground leading-tight">{entry.campaignName}</p>
                        </td>
                        <td className="px-3 py-3">
                          <span className="text-xs text-muted-foreground">{entry.vaultName}</span>
                        </td>
                        <td className="px-3 py-3">
                          {entry.pointsDistributed > 0 ? (
                            <span className="text-sm font-semibold tabular-nums text-foreground">
                              {entry.pointsDistributed.toLocaleString()} pts
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{entry.date}</span>
                        </td>
                        <td className="pl-3 pr-0 py-3">
                          <Badge variant={cfg.variant} className="text-[10px] py-0.5">
                            {cfg.label}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
