import { CheckCircle2, Lock, Wallet, Star, Clock, TrendingUp, Megaphone } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Skeleton } from '@/shared/ui'
import type { Achievement } from '../types/rewards.types'

const ICON_MAP: Record<Achievement['iconKey'], React.ReactNode> = {
  first_deposit:    <Wallet className="h-5 w-5" aria-hidden />,
  first_withdrawal: <TrendingUp className="h-5 w-5" aria-hidden />,
  six_month:        <Clock className="h-5 w-5" aria-hidden />,
  tvl_10k:          <Star className="h-5 w-5" aria-hidden />,
  tvl_50k:          <Star className="h-5 w-5" aria-hidden />,
  tvl_100k:         <Star className="h-5 w-5" aria-hidden />,
  campaign:         <Megaphone className="h-5 w-5" aria-hidden />,
}

interface AchievementBadgeProps {
  achievement: Achievement
}

function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const isUnlocked = achievement.status === 'unlocked'

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 text-center p-3',
        !isUnlocked && 'opacity-40'
      )}
      aria-label={`${achievement.title}${isUnlocked ? ` — unlocked ${achievement.unlockedAt}` : ' — locked'}`}
    >
      <div className={cn(
        'relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors',
        isUnlocked
          ? 'border-primary/40 bg-primary/10 text-primary'
          : 'border-border bg-muted text-muted-foreground'
      )}>
        {ICON_MAP[achievement.iconKey]}
        {isUnlocked && (
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-success">
            <CheckCircle2 className="h-3 w-3 text-white" aria-hidden />
          </span>
        )}
        {!isUnlocked && (
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-muted border border-border">
            <Lock className="h-2.5 w-2.5 text-muted-foreground" aria-hidden />
          </span>
        )}
      </div>
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-foreground leading-tight">{achievement.title}</p>
        {isUnlocked && achievement.unlockedAt ? (
          <p className="text-[10px] text-muted-foreground">{achievement.unlockedAt}</p>
        ) : (
          <p className="text-[10px] text-muted-foreground line-clamp-2">{achievement.description}</p>
        )}
      </div>
    </div>
  )
}

interface AchievementsSectionProps {
  achievements: Achievement[]
  isLoading: boolean
}

export function AchievementsSection({ achievements, isLoading }: AchievementsSectionProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6" aria-busy="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 p-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    )
  }

  if (!achievements.length) return null

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6" role="list" aria-label="Achievements">
      {achievements.map((a) => (
        <div key={a.id} role="listitem">
          <AchievementBadge achievement={a} />
        </div>
      ))}
    </div>
  )
}
