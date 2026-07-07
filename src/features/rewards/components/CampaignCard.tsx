import { Calendar, CheckCircle2, Zap } from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import type { Campaign } from '../types/rewards.types'

interface CampaignCardProps {
  campaign: Campaign
  onJoin: (id: string) => void
  isJoining: boolean
}

export function CampaignCard({ campaign, onJoin, isJoining }: CampaignCardProps) {
  const isEnrolled = campaign.enrollmentStatus === 'enrolled'
  const isEnded = campaign.status === 'ended'

  return (
    <Card className={cn('flex flex-col', isEnded && 'opacity-70')}>
      <CardContent className="flex flex-col gap-4 p-5 flex-1">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5 flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-snug">{campaign.name}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{campaign.description}</p>
          </div>
          <div className="shrink-0">
            {isEnded ? (
              <Badge variant="default" className="text-xs">Ended</Badge>
            ) : (
              <Badge variant="low" className="flex items-center gap-1 text-xs">
                <Zap className="h-3 w-3" aria-hidden />
                {campaign.multiplier}
              </Badge>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>{campaign.startDate} → {campaign.endDate}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Eligible: </span>
            {campaign.eligibilityRequirement}
          </p>
        </div>

        {/* Progress bar (enrolled only) */}
        {isEnrolled && campaign.progressPercent !== undefined && !isEnded && (
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${campaign.progressPercent}%` }}
                role="progressbar"
                aria-valuenow={campaign.progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Campaign progress"
              />
            </div>
            {campaign.progressLabel && (
              <p className="text-xs text-muted-foreground">{campaign.progressLabel}</p>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        {!isEnded && (
          <div className="pt-1">
            {isEnrolled ? (
              <div className="flex items-center gap-1.5 text-xs font-medium text-success">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                Enrolled
              </div>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                className="w-full"
                onClick={() => onJoin(campaign.id)}
                loading={isJoining}
                aria-label={`Join ${campaign.name}`}
              >
                Join Campaign
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
